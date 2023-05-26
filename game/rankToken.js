export const calctoken = (self) => {
  let spent = 0;
  for (let i of self.player.challengebonuses) {
    spent += self.challengedata.rewardcost[i];
  }
  let t = self.player.challengecleared.length;
  if (self.player.onpchallenge) {
    t = Math.max(
      t,
      self.player.pchallengecleared[
        self.getpchallengeid(self.player.pchallenges)
      ]
    );
  }
  self.player.token = t - spent;

  let rspent = 0;
  for (let i of self.player.rankchallengebonuses) {
    rspent += self.challengedata.rewardcost[i];
  }
  let rt = self.player.rankchallengecleared.length;
  if (self.player.onpchallenge) {
    rt = Math.max(
      rt,
      self.player.prchallengecleared[
        self.getpchallengeid(self.player.pchallenges)
      ]
    );
  }
  self.player.ranktoken = rt - rspent;
};

export const buyrankRewards = (self, index) => {
  if (self.player.rankchallengebonuses.includes(index)) {
    self.player.rankchallengebonuses.splice(
      self.player.rankchallengebonuses.indexOf(index),
      1
    );
    self.player.ranktoken += self.challengedata.rewardcost[index];
  } else {
    if (self.player.ranktoken < self.challengedata.rewardcost[index]) {
      return;
    }
    self.player.rankchallengebonuses.push(index);
    self.player.ranktoken -= self.challengedata.rewardcost[index];
  }
};
