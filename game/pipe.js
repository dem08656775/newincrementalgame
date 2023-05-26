export const calcmaxpipe = (self) => {
  if (self.player.trophies[9]) return 3;
  if (self.player.trophies[7]) return 2;
  return 1;
};

export const openpipe = (self, id) => {
  console.log("a");

  const maxpipe = calcmaxpipe(self);

  if (self.player.worldpipe[id] >= maxpipe) return;

  let havepipe = Math.floor((self.smalltrophy - 72) / 3);
  for (let j = 0; j < 10; j++) {
    havepipe -= self.player.worldpipe[j];
  }

  if (havepipe > 0 && self.player.worldpipe[id] < maxpipe)
    self.player.worldpipe[id] = self.player.worldpipe[id] + 1;
};
