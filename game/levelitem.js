import Decimal from "../break_eternity.esm.js";

export const calclevelitemcost = (self, index) => {
  let d = index + 1;
  let cost = self.levelshopdata.itemcost[index].pow(
    self.player.levelitems[index] + 1
  );
  let dec = 0;
  for (let i = 1; i <= 5; i++) {
    if (4 * i * i * d * d * d <= self.player.levelitembought) dec = i;
  }
  cost = cost.div(new Decimal(10).pow(dec)).max(1);
  return cost;
};

export const buylevelitems = (self, index) => {
  let cost = calclevelitemcost(self, index);
  if (self.player.level.lessThan(cost) || self.player.levelitems[index] >= 5) {
    return;
  }
  self.player.level = self.player.level.sub(cost);
  self.player.levelitems[index] = self.player.levelitems[index] + 1;
  if (self.player.levelitembought < 100000)
    self.player.levelitembought = self.player.levelitembought + 1;
};
