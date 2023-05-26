import { buyRewards } from "./token";

export const setbonusetype = (self, index) => {
  if (confirm("現在の効力を登録します。よろしいですか？")) {
    let ans = [];
    for (let i = 0; i < 15; i++) {
      if (self.player.challengebonuses.includes(i)) {
        ans.push(i);
      }
    }
    if (index == 1) {
      self.player.setchallengebonusesfst = ans;
    }
    if (index == 2) {
      self.player.setchallengebonusessnd = ans;
    }
  }
};

export const changebonusetype = (self, index) => {
  for (let i = 0; i < 15; i++) {
    if (self.player.challengebonuses.includes(i)) {
      buyRewards(self, i);
    }
  }
  if (index == 1) {
    for (let i = 0; i < 15; i++) {
      if (self.player.setchallengebonusesfst.includes(i)) {
        buyRewards(self, i);
      }
    }
  }
  if (index == 2) {
    for (let i = 0; i < 15; i++) {
      if (self.player.setchallengebonusessnd.includes(i)) {
        buyRewards(self, i);
      }
    }
  }
};
