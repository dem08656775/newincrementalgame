export const buildstatue = (self, i) => {
    let cost = self.calcstatuecost(i);
    if (self.player.chip[i] < cost) return;
    self.player.chip[i] -= cost;
    self.player.statue[i] += 1;
  };
  