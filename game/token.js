export const buyRewards = (self, index) => {
    if (self.player.challengebonuses.includes(index)) {
      self.player.challengebonuses.splice(
        self.player.challengebonuses.indexOf(index),
        1
      );
      self.player.token += self.challengedata.rewardcost[index];
    } else {
      if (self.player.token < self.challengedata.rewardcost[index]) {
        return;
      }
      self.player.challengebonuses.push(index);
      self.player.token -= self.challengedata.rewardcost[index];
    }
  };