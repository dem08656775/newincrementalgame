import Decimal from "../break_eternity.esm.js";
import { calcchallengeid } from "./challenge.js";

export const resetRankborder = (self) => {
  let p =
    self.player.onchallenge && self.player.challenges.includes(0) ? 96 : 72;
  let q = self.checkremembers();
  if (self.player.onpchallenge && self.player.pchallenges.includes(7)) {
    q = Math.pow(q, 0.5);
  }
  p -= Math.min(q / 2.0, 36);
  return new Decimal(10).pow(p);
};
export const resetRank = (self, force) => {
  if (self.player.onchallenge && self.player.challenges.includes(0)) {
    if (self.player.money.lt(resetRankborder(self))) {
      alert("現在挑戦1が適用されているため、まだ昇階リセットができません。");
      return;
    }
  }

  let gainrank = calcgainrank(self);
  if (force || confirm("昇階リセットして、階位" + gainrank + "を得ますか？")) {
    if (self.player.onchallenge) {
      self.player.onchallenge = false;
      self.activechallengebonuses = self.player.challengebonuses;
      if (
        self.player.challengecleared.length >= 128 &&
        !self.player.rankchallengecleared.includes(calcchallengeid(self))
      ) {
        self.player.rankchallengecleared.push(calcchallengeid(self));
      }
    }

    self.player.money = new Decimal(1);
    self.player.level = new Decimal(0);
    self.player.levelresettime = new Decimal(0);

    (self.player.generators = new Array(8)
      .fill(null)
      .map(() => new Decimal(0))),
      (self.player.generatorsBought = new Array(8)
        .fill(null)
        .map(() => new Decimal(0))),
      (self.player.generatorsCost = [
        new Decimal(1),
        new Decimal("1e4"),
        new Decimal("1e9"),
        new Decimal("1e16"),
        new Decimal("1e25"),
        new Decimal("1e36"),
        new Decimal("1e49"),
        new Decimal("1e64"),
      ]),
      (self.player.accelerators = new Array(8)
        .fill(null)
        .map(() => new Decimal(0))),
      (self.player.acceleratorsBought = new Array(8)
        .fill(null)
        .map(() => new Decimal(0))),
      (self.player.acceleratorsCost = [
        new Decimal(10),
        new Decimal("1e10"),
        new Decimal("1e20"),
        new Decimal("1e40"),
        new Decimal("1e80"),
        new Decimal("1e160"),
        new Decimal("1e320"),
        new Decimal("1e640"),
      ]),
      (self.player.tickspeed = 1000);

    self.player.rank = self.player.rank.add(gainrank);
    self.player.rankresettime = self.player.rankresettime.add(
      (self.player.rankchallengebonuses.includes(8)
        ? new Decimal(3)
        : new Decimal(1)
      )
        .mul(self.player.setchip[24] + 1)
        .mul(self.player.crownresettime.add(1))
    );

    self.player.levelitems = [0, 0, 0, 0, 0];

    self.activechallengebonuses = self.player.challengebonuses;

    if (self.activechallengebonuses.includes(0))
      self.player.money = new Decimal(10001);
    if (self.activechallengebonuses.includes(1))
      self.player.accelerators[0] = new Decimal(10);
    if (self.player.rankchallengebonuses.includes(0))
      self.player.money = self.player.money.add(new Decimal("1e9"));
    if (self.player.rankchallengebonuses.includes(1))
      self.player.accelerators[0] = self.player.accelerators[0].add(256);
  }
};

export const calcGainRank = (self) => {

  let dv =
    36 -
    0.25 * checkremembers(self) -
    1.2 * self.player.levelitems[4] * (1 + 0.2 * self.player.setchip[29]);
  dv = Math.max(dv, 6);
  dv = dv - self.player.crown.add(2).log2() * 0.1;
  dv = Math.max(dv, 3);
  let gainrank = new Decimal(self.player.money.log10())
    .div(dv)
    .pow_base(2)
    .round();
  if (self.player.onpchallenge && self.player.pchallenges.includes(5)) {
    gainrank = new Decimal(gainrank.log10()).max(1);
  }
  if (self.player.rankchallengebonuses.includes(12)) {
    gainrank = gainrank.mul(3);
  }
  gainrank = gainrank.mul(1 + self.player.setchip[22] * 0.5);
  gainrank = gainrank.mul(1 + self.eachpipedsmalltrophy[4] * 0.2);
  return gainrank;
};
