import Decimal from "../break_eternity.esm.js";

export const resetCrown = (self, force) => {
  if (self.player.onchallenge) {
    alert("現在挑戦中のため、昇冠リセットができません。");
    //あとで消す
    return;
  }
  if (self.player.onchallenge && self.player.challenges.includes(0)) {
    if (self.player.money.lt(self.resetCrownborder())) {
      alert("現在挑戦1が適用されているため、まだ昇冠リセットができません。");
      return;
    }
  }

  let gaincrown = calcgaincrown(self);
  if (force || confirm("昇冠リセットして、冠位" + gaincrown + "を得ますか？")) {
    self.player.money = new Decimal(1);
    self.player.level = new Decimal(0);
    self.player.levelresettime = new Decimal(0);

    self.player.rank = new Decimal(0);
    self.player.rankresettime = new Decimal(0);

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

    if (!force) {
      self.player.crown = self.player.crown.add(gaincrown);
      self.player.crownresettime = self.player.crownresettime.add(1);
    }

    self.player.tickspeed = 1000;

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

export const calcgaincrown = (self) => {
  let dv = 72;
  return new Decimal(2).pow(self.player.money.log10() / dv).round();
};

export const resetCrownborder = () => {
  return new Decimal("1e216");
};
