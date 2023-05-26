export const buildstatue = (self, i) => {
  let cost = calcstatuecost(self, i);
  if (self.player.chip[i] < cost) return;
  self.player.chip[i] -= cost;
  self.player.statue[i] += 1;
};

export const calcstatuecost = (self, i) => {
  return (self.player.statue[i] + 1) * 10000;
};
