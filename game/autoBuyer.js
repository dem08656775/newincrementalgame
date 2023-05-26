import Decimal from "../break_eternity.esm.js";

export const configautobuyer = (self, index) => {
  if (index == 0) {
    let input = window.prompt("リセット時入手段位を設定", "");
    input = new Decimal(input);
    self.autolevelnumber = input;
  } else if (index == 1) {
    let input = window.prompt("昇段停止段位を設定", "");
    input = new Decimal(input);
    self.autolevelstopnumber = input;
  } else if (index == 2) {
    let input = window.prompt("リセット時入手階位を設定", "");
    input = new Decimal(input);
    self.autoranknumber = input;
  }
};

export const toggleautobuyer = (self, index) => {
  if (index == 0) self.genautobuy = !self.genautobuy;
  if (index == 1) self.accautobuy = !self.accautobuy;
  if (index == 2) self.autolevel = !self.autolevel;
  if (index == 3) self.litemautobuy = !self.litemautobuy;
  if (index == 5) self.autorank = !self.autorank;
};
