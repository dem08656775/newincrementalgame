import Decimal from "../break_eternity.esm.js";
import { updateAccelerators } from "./accelerator.js";
import { updateDarkGenerators } from "./darkGenerator.js";
import { updateGenerators } from "./generator.js";

export const spendBrightness = (self, num) => {
  if (self.player.brightness < num) return;
  if (self.player.onpchallenge && self.player.pchallenges.includes(6)) return;
  self.player.brightness -= num;
  let val = new Decimal(11 + self.player.setchip[50]).pow(
    new Decimal(num * 100).log10()
  );
  let vald = new Decimal(10 + self.player.setchip[51] * 0.25).pow(
    new Decimal(num).log10()
  );
  updateGenerators(self, new Decimal(val));
  updateAccelerators(self, new Decimal(val));
  updateDarkGenerators(self, new Decimal(vald));
};
