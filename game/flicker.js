import Decimal from "../break_eternity.esm.js";
import { updateAccelerators } from "./accelerator.js";
import { updateDarkGenerators } from "./darkGenerator.js";
import { updateGenerators } from "./generator.js";
import { updatelightgenerators } from "./lightGenerator.js";

export const spendflicker = (self, num) => {
  if (self.player.flicker < num) return;
  self.player.flicker -= num;
  let val = new Decimal(11 + self.player.setchip[50]).pow(
    new Decimal(num * 10000).log10()
  );
  let vald = new Decimal(10 + self.player.setchip[51] * 0.25).pow(
    new Decimal(num).log10()
  );
  updateGenerators(self, new Decimal(val));
  updateaccelerators(self, new Decimal(val));
  updatedarkgenerators(self, new Decimal(vald));
  updatelightgenerators(self, new Decimal(vald));
};
