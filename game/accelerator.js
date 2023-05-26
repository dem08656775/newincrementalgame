import Decimal from "../break_eternity.esm.js";

export const updateAccelerators = (self, mu) => {
  for (let i = 1; i < 8; i++) {
    let mult = new Decimal(1);
    if (i == 1 && self.activechallengebonuses.includes(10)) {
      mult = self.player.rankchallengebonuses.includes(10)
        ? mult.add(self.player.acceleratorsBought[i].pow_base(2))
        : mult.add(self.player.acceleratorsBought[i]);
    } else if (i != 1 && self.player.rankchallengebonuses.includes(6)) {
      mult = self.player.rankchallengebonuses.includes(10)
        ? mult.add(self.player.acceleratorsBought[i].pow_base(2))
        : mult.add(self.player.acceleratorsBought[i]);
    }
    mult = mult.mul(new Decimal(1.5).pow(self.player.setchip[i + 10]));
    mult = mult.mul(1 + self.eachpipedsmalltrophy[1] * 0.2);
    self.player.accelerators[i - 1] = self.player.accelerators[i - 1].add(
      self.player.accelerators[i].mul(mult).mul(mu)
    );
  }
};

export const buyAccelerator = (self, index) => {
  if (self.player.onchallenge && self.player.challenges.includes(5)) return;
  if (index >= 1 && self.player.levelresettime.lessThanOrEqualTo(0)) return;

  if (
    self.player.money.greaterThanOrEqualTo(self.player.acceleratorsCost[index])
  ) {
    self.player.money = self.player.money.sub(
      self.player.acceleratorsCost[index]
    );
    self.player.accelerators[index] = self.player.accelerators[index].add(1);
    self.player.acceleratorsBought[index] =
      self.player.acceleratorsBought[index].add(1);
    calcaccost(self);
  }
};

export const calcaccost = (self) => {
  for (let i = 0; i < 8; i++) {
    let p = self.player.acceleratorsBought[i].add(1);
    p = p.mul(p.add(1)).div(2);
    p = p.mul(i === 0 ? 1 : new Decimal(10).mul(new Decimal(2).pow(i - 1)));
    p = p.sub(self.eachpipedsmalltrophy[3] * 0.2 * (i + 1));
    self.player.acceleratorsCost[i] = p.pow_base(10);
  }
};

export const worktime = (self, val) => {
  if (0 <= val && val <= self.player.accelevel) {
    self.player.accelevelused = val;
  }
};
