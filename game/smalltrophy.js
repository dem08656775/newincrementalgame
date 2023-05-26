export const checkpipedsmalltrophies = (self) => {
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    let cnt = 0;
    if (self.players[i].worldpipe[self.world] >= 1) {
      for (let j = 0; j < 100; j++) {
        if (self.players[i].smalltrophies[j]) cnt++;
      }
      for (let j = 0; j < 100; j++) {
        if (self.players[i].smalltrophies2nd[j]) cnt++;
      }
      cnt -= 75;
      cnt *= self.players[i].worldpipe[self.world];
      self.eachpipedsmalltrophy[i] = cnt;
      sum += cnt;
    } else {
      self.eachpipedsmalltrophy[i] = 0;
    }
  }
  self.pipedsmalltrophy = sum;
};
export const countsmalltrophies = (self, index) => {
  let cnt = 0;
  for (let i = 0; i < 100; i++) {
    if (self.player.smalltrophies[i]) cnt++;
  }
  for (let i = 0; i < 100; i++) {
    if (self.player.smalltrophies2nd[i]) cnt++;
  }
  self.smalltrophy = cnt;
};
