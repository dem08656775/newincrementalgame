export const buytype = (self, num) => {
    if (
      self.player.shine < self.shinedata.shineshopcost[num] ||
      self.player.boughttype[num]
    )
      return;
    self.player.shine -= self.shinedata.shineshopcost[num];
    self.player.boughttype[num] = true;
  };