import { strongsoftcap } from "./lib/softCap.js";
import Decimal from "../break_eternity.esm.js";

export const calcincrementmult = (self, i, to) => {
  let mult = self.incrementalmults[i];
  if (!(self.player.onchallenge && self.player.challenges.includes(4))) {
    mult = mult.mul(new Decimal(10).pow((i + 1) * (i - to)));
  }

  let lv = new Decimal(
    self.player.level
      .pow(1 + 0.5 * self.player.setchip[19])
      .add(2)
      .log2()
  );

  let rk = self.player.rank.add(2).div(262142).log2();
  rk +=
    new Decimal(self.player.rank.add(2).log2()).log2() *
    self.player.setchip[23];
  mult = mult.mul(new Decimal(lv.pow((i - to) * (1 + Math.max(rk, 0) * 0.05))));

  if (
    self.player.onpchallenge &&
    self.player.pchallenges.includes(3) &&
    mult.gt("1e-100")
  ) {
    let b = Math.floor(mult.log10() / 6);
    mult = new Decimal(10).pow(b * 6);
  }
  return mult;
};

export const calcbasicincrementmult = (self, i) => {
  let mult = new Decimal(self.commonmult);

  if (!(self.player.onchallenge && self.player.challenges.includes(2))) {
    let mm = new Decimal(1);
    mm = mm.mul(self.player.generatorsBought[i]);
    if (self.activechallengebonuses.includes(11)) {
      mm = mm.mul(new Decimal(mm.add(2).log2()));
    }

    if (i < self.highest && mm.greaterThanOrEqualTo(1)) {
      mult = mult.mul(mm);
    } else {
      if (
        self.activechallengebonuses.includes(2) &&
        mm.greaterThanOrEqualTo(1)
      ) {
        mult = mult.mul(mm);
      }
    }
  }

  if (i == 0 && self.activechallengebonuses.includes(7)) {
    if (self.player.rankchallengebonuses.includes(7)) {
      mult = mult.mul(
        strongsoftcap(self.player.maxlevelgained, new Decimal(100000))
      );
    } else {
      mult = mult.mul(self.player.maxlevelgained.min(100000));
    }
  }
  if (!(self.player.onpchallenge && self.player.pchallenges.includes(8))) {
    if (self.player.darkgenerators[i].greaterThanOrEqualTo(1)) {
      mult = mult.mul(
        new Decimal(i + 2 + self.player.darkgenerators[i].log10()).pow(
          1 + self.player.setchip[i + 32] * 0.25
        )
      );
    }
  }

  mult = mult.mul(1 + self.player.setchip[i + 1] * 0.5);

  if (self.player.onpchallenge && self.player.pchallenges.includes(2)) {
    self.incrementalmults[2] = new Decimal(0);
    self.incrementalmults[5] = new Decimal(0);
  }

  self.incrementalmults[i] = mult;
};
