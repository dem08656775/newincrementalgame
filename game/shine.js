import Decimal from "../break_eternity.esm.js";

export const spendshine = (self, num) => {
  if (self.player.shine < num) return;
  if (self.player.onpchallenge && self.player.pchallenges.includes(6)) return;
  self.player.shine -= num;
  let val = new Decimal(11 + self.player.setchip[31]).pow(
    new Decimal(num).log10()
  );
  self.updategenerators(new Decimal(val));
  self.updateaccelerators(new Decimal(val));
};
