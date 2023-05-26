import Decimal from "../break_eternity.esm.js";
import { calcchallengeid } from "./challenge.js";
import { calcGainChip } from "./chip.js";

export const resetLevel = (self, force, exit) => {
  if (self.player.onchallenge && self.player.challenges.includes(0)) {
    if (self.player.money.lt(new Decimal("1e24"))) {
      alert("現在挑戦1が適用されているため、まだ昇段リセットができません。");
      return;
    }
  }

  let dividing = 19 - self.player.rank.add(2).log2();
  if (dividing < 1) dividing = 1;
  let gainlevel = calcgainlevel(self);
  let rst = self.player.rankresettime.add(1);
  if (self.player.onpchallenge && self.player.pchallenges.includes(4)) {
    rst = rst.pow(0.1).round();
  }
  let gainlevelreset = rst
    .mul(1 + self.player.setchip[20])
    .mul(
      new Decimal(exit ? 0 : self.activechallengebonuses.includes(8) ? 2 : 1)
    );

  if (force || confirm("昇段リセットして、段位" + gainlevel + "を得ますか？")) {
    let disa =
      self.player.onpchallenge && self.player.pchallenges.includes(9) && !exit;
    if (self.player.onchallenge) {
      self.player.onchallenge = false;
      if (self.player.challenges.length >= 6) {
        self.player.trophies[3] = true;
      }
      let id = calcchallengeid(self);
      if (!self.player.challengecleared.includes(id)) {
        self.player.challengecleared.push(calcchallengeid(self));
        disa = false;
      }
      self.activechallengebonuses = self.player.challengebonuses;
    }

    if (disa) {
      let randomint = Math.floor(Math.random() * 100);
      self.chipset(randomint, 0);
      self.player.disabledchip[randomint] = true;
    }

    if (self.player.money.greaterThan(1e80)) {
      let gainchip = calcGainChip(self);
      console.log(gainchip);
      if (gainchip != -1 && self.player.chip[gainchip] < 1000000) {
        self.player.chip[gainchip] = self.player.chip[gainchip] + 1;
        let d = new Date();
        if (d.getMonth() == 4 && 3 <= d.getDate() && d.getDate() <= 7) {
          if (gainchip == 2)
            self.player.chip[gainchip] = self.player.chip[gainchip] + 4;
        } //ゴールデンウィークキャンペーン
      }
    }

    self.player.money = new Decimal(1);
    self.player.level = self.player.level.add(
      exit ? new Decimal(0) : gainlevel
    );
    self.player.levelresettime = self.player.levelresettime.add(gainlevelreset);
    self.player.maxlevelgained = self.player.maxlevelgained.max(
      exit ? new Decimal(0) : gainlevel
    );

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
      ]);

    self.player.tickspeed = 1000;

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

export const calcGainLevel = (self) => {
  if (self.player.onpchallenge && self.player.pchallenges.includes(4)) {
  }
  let dividing = 19 - self.player.rank.add(2).log2();
  if (dividing < 1) dividing = 1;
  let mny = self.player.money.log10() - 17;
  mny = new Decimal(mny).pow(self.player.setchip[18]);
  let gainlevel = new Decimal(self.player.money.mul(mny).log10())
    .div(dividing)
    .pow_base(2);

  let glmin = new Decimal(18).div(dividing).pow_base(2);
  let glmax = self.player.maxlevelgained.div(2);

  if (!glmin.add(0.1).greaterThanOrEqualTo(glmax)) {
    if (gainlevel.lt(glmax)) {
      let persent = new Decimal(1).sub(
        gainlevel.sub(glmin).div(glmax.sub(glmin))
      );

      persent = persent.pow(
        1 + self.player.levelitems[0] * (1 + self.player.setchip[26] * 2)
      );
      persent = new Decimal(1).sub(persent);
      if (persent.lt("1e-5")) {
        gainlevel = gainlevel.mul(
          1 + self.player.levelitems[0] * (1 + self.player.setchip[26] * 2)
        );
      } else {
        gainlevel = glmax.sub(glmin).mul(persent).add(glmin);
      }
    }
  }

  if (self.player.onpchallenge && self.player.pchallenges.includes(4)) {
    gainlevel = new Decimal(gainlevel.log2()).max(1);
  }

  gainlevel = gainlevel.round().max(1);

  gainlevel = gainlevel.mul(1 + self.eachpipedsmalltrophy[2] * 0.2);
  if (self.activechallengebonuses.includes(12))
    gainlevel = gainlevel.mul(new Decimal(2));
  return gainlevel;
};
