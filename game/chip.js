import Decimal from "../break_eternity.esm.js";

export const chipset = (self, i, j) => {
  if (self.player.disabledchip[i]) return;
  if (self.player.setchip[i] == j) return;
  if (self.player.chip[j - 1] <= self.chipused[j - 1]) return;
  let oldchip = self.player.setchip[i] - 1;
  if (oldchip != -1)
    self.player.chip[oldchip] =
      self.player.chip[oldchip] + self.chipused[oldchip];
  self.player.setchip[i] = j;
  if (j != 0)
    self.player.chip[j - 1] =
      self.player.chip[j - 1] - (self.chipused[j - 1] + 1);
  checkUsedChips(self);
};

export const checkUsedChips = (self) => {
  self.chipused.fill(0);
  for (let v of self.player.setchip) {
    if (v != 0) self.chipused[v - 1] = self.chipused[v - 1] + 1;
  }
};

export const clearSetChip = (self) => {
  for (let i = 0; i < 100; i++) {
    chipset(self, i, 0);
  }
};

export const setChipType = (self) => {
  if (confirm("現在の鋳片型を登録します。よろしいですか？")) {
    for (let i = 0; i < 100; i++) {
      self.player.setchiptypefst[i] = self.player.setchip[i];
    }
  }
};

export const changeChipType = (self) => {
  self.clearsetchip();
  for (let i = 0; i < 100; i++) {
    chipset(self, i, self.player.setchiptypefst[i]);
  }
};

export const calcGainChip = (self) => {
  let bonus = new Decimal(10).pow(self.eachpipedsmalltrophy[7] * 0.4);
  let clevel = self.chipdata.getcl(self.player.money.mul(bonus));
  return self.chipdata.getchipid(clevel);
};
