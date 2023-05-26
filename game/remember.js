export const checkremembers = (self) => {
  let cnt = 0;
  for (let i = self.world + 1; i < 10; i++) {
    cnt += self.players[i].remember;
  }
  return cnt;
};
