import Decimal from "../break_eternity.esm.js";

export const spendbrightness = (self, num) => {
  if (self.player.brightness < num) return;
  if (self.player.onpchallenge && self.player.pchallenges.includes(6)) return;
  self.player.brightness -= num;
  let val = new Decimal(11 + self.player.setchip[50]).pow(
    new Decimal(num * 100).log10()
  );
  let vald = new Decimal(10 + self.player.setchip[51] * 0.25).pow(
    new Decimal(num).log10()
  );
  self.updategenerators(new Decimal(val));
  self.updateaccelerators(new Decimal(val));
  self.updatedarkgenerators(new Decimal(vald));
};
