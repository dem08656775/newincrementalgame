import Decimal from "../break_eternity.esm.js";
import { calcincrementmult } from "./incrementmult.js";

export const updateGenerators = (self, mu) => {
  for (let i = 0; i < 8; i++) {
    if (!self.activechallengebonuses.includes(13)) {
      let to = self.player.generatorsMode[i];
      let mult = mu.mul(calcincrementmult(self, i, to));
      if (to === 0) {
        self.player.money = self.player.money.add(
          self.player.generators[i].mul(mult)
        );
      } else {
        self.player.generators[to - 1] = self.player.generators[to - 1].add(
          self.player.generators[i].mul(mult)
        );
      }
    } else {
      if (self.player.onchallenge && self.player.challenges.includes(3)) {
        let mult = mu.mul(calcincrementmult(self, i, 0));
        mult = mult.mul(i + 1);
        self.player.money = self.player.money.add(
          self.player.generators[i].mul(mult)
        );
      } else {
        for (let to = 0; to <= i; to++) {
          let mult = mu.mul(calcincrementmult(self, i, to));
          if (to === 0) {
            self.player.money = self.player.money.add(
              self.player.generators[i].mul(mult)
            );
          } else {
            self.player.generators[to - 1] = self.player.generators[to - 1].add(
              self.player.generators[i].mul(mult)
            );
          }
        }
      }
    }
  }
};

export const buyGenerator = (self, index) => {
  if (self.player.onchallenge && self.player.challenges.includes(6)) {
    if (index == 3 || index == 7) {
      return;
    }
  }
  if (
    self.player.money.greaterThanOrEqualTo(self.player.generatorsCost[index])
  ) {
    self.player.money = self.player.money.sub(
      self.player.generatorsCost[index]
    );
    self.player.generators[index] = self.player.generators[index].add(1);
    self.player.generatorsBought[index] =
      self.player.generatorsBought[index].add(1);
    calcgncost(self);
  }
};

export const calcgncost = (self) => {
  for (let i = 0; i < 8; i++) {
    let p =
      i === 0
        ? self.player.generatorsBought[0]
        : self.player.generatorsBought[i].add(i + 1).mul(i + 1);
    if (
      self.player.onchallenge &&
      self.player.challenges.includes(1) &&
      self.player.generatorsBought[i].gt(0)
    ) {
      p = p.mul(2);
    }
    p = p.sub(self.eachpipedsmalltrophy[0] * 0.2);

    self.player.generatorsCost[i] = new Decimal(10).pow(p);
  }
};

export const findhighestgenerator = (self) => {
  self.highest = 0;
  for (let j = 0; j < 8; j++) {
    if (self.player.generators[j].greaterThan(0)) {
      self.highest = j;
    }
  }
};
