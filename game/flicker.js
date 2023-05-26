import Decimal from "../break_eternity.esm.js";

export const spendflicker = (self, num) => {
  if (self.player.flicker < num) return;
  self.player.flicker -= num;
  let val = new Decimal(11 + self.player.setchip[50]).pow(
    new Decimal(num * 10000).log10()
  );
  let vald = new Decimal(10 + self.player.setchip[51] * 0.25).pow(
    new Decimal(num).log10()
  );
  self.updategenerators(new Decimal(val));
  self.updateaccelerators(new Decimal(val));
  self.updatedarkgenerators(new Decimal(vald));
  self.updatelightgenerators(new Decimal(vald));
};
