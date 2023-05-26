import Decimal from "../break_eternity.esm.js";
import { softCap } from "./lib/softCap.js";

export const updateDarkGenerators = (self, mu) => {
  let darkmult = self.player.darklevel.add(1);
  darkmult = softCap(darkmult, new Decimal(1e3));
  if (self.player.lightmoney.greaterThanOrEqualTo(1)) {
    darkmult = darkmult.mul(self.player.lightmoney.log10() + 1);
  }
  let dgtocalc = Array.from(self.player.darkgenerators);
  for (let i = 0; i < 8; i++) {
    dgtocalc[i] = dgtocalc[i].mul(self.player.lightgenerators[i].add(1));
  }
  self.player.darkmoney = self.player.darkmoney.add(
    dgtocalc[0]
      .mul(mu)
      .mul(darkmult)
      .mul(1 + self.player.setchip[41] * 0.25)
      .mul(1 + self.eachpipedsmalltrophy[5] * 0.2)
  );
  for (let i = 1; i < 8; i++) {
    self.player.darkgenerators[i - 1] = self.player.darkgenerators[i - 1].add(
      dgtocalc[i]
        .mul(mu)
        .mul(darkmult)
        .mul(1 + self.player.setchip[41 + i] * 0.25)
        .mul(1 + self.eachpipedsmalltrophy[5] * 0.2)
    );
  }
};

export const buyDarkGenerator = (self, index) => {
  if (
    self.player.money.greaterThanOrEqualTo(
      self.player.darkgeneratorsCost[index]
    )
  ) {
    self.player.money = self.player.money.sub(
      self.player.darkgeneratorsCost[index]
    );
    self.player.darkgenerators[index] =
      self.player.darkgenerators[index].add(1);
    self.player.darkgeneratorsBought[index] =
      self.player.darkgeneratorsBought[index].add(1);
    calcdgcost(self);
  }
};

export const calcdgcost = (self) => {
  for (let i = 0; i < 8; i++) {
    let p = 100 + (i == 0 ? 0 : (i + 1) * (i + 1) * (i + 1));
    let q = self.player.darkgeneratorsBought[i].mul(i + 1).mul(i + 1);
    q = q.add(p);
    q = q.sub(self.eachpipedsmalltrophy[8] * 0.02 * (i + 1) * (i + 1));
    self.player.darkgeneratorsCost[i] = new Decimal(10).pow(q);
  }
};
