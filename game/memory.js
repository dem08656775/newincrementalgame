export const checkmemories = (self) => {
    let cnt = 0;

    for (let i = 0; i < 10; i++) {
      self.counttrophies(i);
      if (self.world == i) continue;
      cnt += self.trophynumber[i];
    }
    self.memory = cnt;
}