import Decimal from "../break_eternity.esm.js";

export const calclgcost = (self) => {
  for (let i = 0; i < 8; i++) {
    let p = 200 + (i == 0 ? 0 : (i + 1) * (i + 1) * (i + 1) * (i + 1));
    let q = self.player.lightgeneratorsBought[i]
      .mul(i + 1)
      .mul(i + 1)
      .mul(i + 1);
    q = q.add(p);
    self.player.lightgeneratorsCost[i] = new Decimal(10).pow(q);
  }
};

export const buyLightGenerator = (self, index) => {
  if (
    self.player.money.greaterThanOrEqualTo(
      self.player.lightgeneratorsCost[index]
    )
  ) {
    self.player.money = self.player.money.sub(
      self.player.lightgeneratorsCost[index]
    );
    self.player.lightgenerators[index] =
      self.player.lightgenerators[index].add(1);
    self.player.lightgeneratorsBought[index] =
      self.player.lightgeneratorsBought[index].add(1);
    calclgcost(self);
  }
};

export const updatelightgenerators = (self, mu) => {
    self.player.lightmoney = self.player.lightmoney.add(
      self.player.lightgenerators[0].mul(mu)
    );
    for (let i = 1; i < 8; i++) {
      self.player.lightgenerators[i - 1] = self.player.lightgenerators[i - 1].add(
        self.player.lightgenerators[i]
      );
    }
  };