export const setModeType = (self) => {
  if (confirm("現在のモードを登録します。よろしいですか？")) {
    for (let i = 0; i < 8; i++) {
      self.player.setmodes[i] = self.player.generatorsMode[i];
    }
  }
};

export const changeModeType = (self) => {
  if (self.player.onchallenge && self.player.challenges.includes(3)) return;
  for (let i = 0; i < 8; i++) {
    while (self.player.setmodes[i] !== self.player.generatorsMode[i]) {
      self.changeMode(i);
    }
  }
};

export const changeMode = (self, index) => {
    if (self.player.onchallenge && self.player.challenges.includes(3)) return;
    self.player.generatorsMode[index] += 1;
    if (self.player.generatorsMode[index] > index) {
      self.player.generatorsMode[index] = 0;
    }
  };