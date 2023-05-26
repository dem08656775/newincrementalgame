import Decimal from "../break_eternity.esm.js";

export const resetDarklevel = (self) => {
  let dv = 18 - self.player.crown.add(2).log2();
  dv = Math.max(dv, 1);
  let gaindarklevel = new Decimal(self.player.darkmoney.log10())
    .div(dv)
    .pow_base(2)
    .round();
  if (confirm("裏昇段リセットして、裏段位" + gaindarklevel + "を得ますか？")) {
    self.player.darkmoney = new Decimal(0);
    (self.player.darkgenerators = new Array(8)
      .fill(null)
      .map(() => new Decimal(0))),
      (self.player.darkgeneratorsBought = new Array(8)
        .fill(null)
        .map(() => new Decimal(0))),
      (self.player.darkgeneratorsCost = [
        new Decimal("1e100"),
        new Decimal("1e108"),
        new Decimal("1e127"),
        new Decimal("1e164"),
        new Decimal("1e225"),
        new Decimal("1e316"),
        new Decimal("1e443"),
        new Decimal("1e612"),
      ]),
      (self.player.darklevel = self.player.darklevel.add(gaindarklevel));
  }
};
