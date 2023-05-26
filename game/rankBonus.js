export const changerankbonusetype = (self, index) => {
  for (let i = 0; i < 15; i++) {
    if (self.player.rankchallengebonuses.includes(i)) {
      self.buyrankRewards(i);
    }
  }
  if (index == 1) {
    for (let i = 0; i < 15; i++) {
      if (self.player.setrankchallengebonusesfst.includes(i)) {
        self.buyrankRewards(i);
      }
    }
  }
  if (index == 2) {
    for (let i = 0; i < 15; i++) {
      if (self.player.setrankchallengebonusessnd.includes(i)) {
        self.buyrankRewards(i);
      }
    }
  }
};

export const setrankbonusetype = (self, index) => {
  if (confirm("現在の上位効力を登録します。よろしいですか？")) {
    let ans = [];
    for (let i = 0; i < 15; i++) {
      if (self.player.rankchallengebonuses.includes(i)) {
        ans.push(i);
      }
    }
    if (index == 1) {
      self.player.setrankchallengebonusesfst = ans;
    }
    if (index == 2) {
      self.player.setrankchallengebonusessnd = ans;
    }
  }
};
