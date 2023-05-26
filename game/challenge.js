import { calcgncost } from "./generator";

export const startChallenge = (self) => {
  let challengeid = calcchallengeid(self);

  if (challengeid == 0) {
    alert("挑戦が一つも選択されていません。");
    return;
  }

  let conf =
    "挑戦を開始しますか？現在のポイントや発生器、時間加速器は失われます。";

  if (self.player.challengecleared.includes(challengeid)) {
    if (self.player.challengecleared.length < 128) {
      alert("すでに達成した挑戦です。");
      return;
    }
    conf =
      "すでに達成した挑戦です。勲章は得られませんが、それでもよろしいですか？";
    if (self.player.rankchallengecleared.includes(challengeid)) {
      conf =
        "すでに階位挑戦としても達成した挑戦です。勲章や大勲章は得られませんが、それでもよろしいですか？";
    }
  }

  if (confirm(conf)) {
    if (!self.player.challengebonuses.includes(4))
      self.activechallengebonuses = [];
    self.resetLevel(true, true);
    self.player.onchallenge = true;
    if (self.player.challenges.includes(3)) {
      for (let i = 0; i < 8; i++) {
        self.player.generatorsMode[i] = 0;
      }
    }
  }
};

export const exitChallenge = (self) => {
  if (
    confirm(
      "挑戦を諦めますか？現在のポイントや発生器、時間加速器を引き継いだまま、通常の状態に入ります。"
    )
  ) {
    self.player.onchallenge = false;
    self.activechallengebonuses = self.player.challengebonuses;
    calcgncost(self);
  }
};

export const showunclearedchallenges = (self) => {
  if (self.player.challengecleared.length == 255) return;
  if (self.player.onchallenge) return;
  let challengeid = calcchallengeid(self);

  do {
    if (challengeid == 0) {
      challengeid = 128;
    } else {
      let idx = self.challengedata.challengeids.indexOf(challengeid) + 1;
      if (idx == 255) idx = 0;
      challengeid = self.challengedata.challengeids[idx];
    }
  } while (self.player.challengecleared.includes(challengeid));

  let cls = [];
  for (let i = 7; i >= 0; i--) {
    if (challengeid % 2 == 1) cls.push(i);
    challengeid = challengeid >>> 1;
  }
  self.player.challenges = cls;
};

export const getchallengeid = (arr) => {
  let challengeid = 0;
  for (let i = 0; i < 8; i++) {
    challengeid *= 2;
    if (arr.includes(i)) {
      challengeid += 1;
    }
  }
  return challengeid;
};

export const calcchallengeid = (self) => {
  let challengeid = 0;
  for (let i = 0; i < 8; i++) {
    challengeid *= 2;
    if (self.player.challenges.includes(i)) {
      challengeid += 1;
    }
  }
  return challengeid;
};

export const configchallenge = (self, index) => {
  if (self.player.onchallenge) return;
  if (!self.player.challenges.includes(index)) {
    self.player.challenges.push(index);
  } else {
    self.player.challenges.splice(self.player.challenges.indexOf(index), 1);
  }
};