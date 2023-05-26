import { resetCrown } from "./crown";

export const configpchallenge = (self, index) => {
  if (self.player.onpchallenge) return;
  if (!self.player.pchallenges.includes(index)) {
    self.player.pchallenges.push(index);
  } else {
    self.player.pchallenges.splice(self.player.pchallenges.indexOf(index), 1);
  }
};

export const countpchallengecleared = (self) => {
  let cnt = 0;
  for (let i = 0; i < 1024; i++) {
    cnt += self.player.pchallengecleared[i];
    cnt += self.player.prchallengecleared[i];
  }

  cnt /= 510;
  self.pchallengestage = Math.floor(cnt);
};

export const startpChallenge = (self) => {
  if (
    !(
      self.player.challengecleared.length >= 255 &&
      self.player.rankchallengecleared.length >= 255
    )
  ) {
    alert("まだ挑戦や階位挑戦を完了していないので、完全挑戦を開始できません。");
    return;
  }

  if (self.player.onchallenge) {
    alert("現在挑戦中のため、完全挑戦を開始できません。");
    return;
  }

  for (let i = 0; i < 10; i++) {
    if (self.player.statue[i] < self.player.pchallenges.length - i) {
      alert("像の作成数が不足しているため、完全挑戦を開始できません。");
      return;
    }
  }

  let conf =
    "完全挑戦を開始しますか？現在のポイントや発生器、段位や段位リセット、階位などは失われます。";

  if (confirm(conf)) {
    resetCrown(self, true);
    self.player.onpchallenge = true;
    self.player.challengecleared = [];
    self.player.challengebonuses = [];
    self.player.rankchallengecleared = [];
    self.player.rankchallengebonuses = [];
  }
};

export const exitpChallenge = (self) => {
  if (
    confirm(
      "完全挑戦を中断しますか？現在のポイントや発生器、時間加速器を引き継いだまま、通常の状態に入ります。"
    )
  ) {
    if (self.player.onchallenge) self.exitChallenge();
    self.player.onpchallenge = false;
    self.player.pchallengecleared[
      getpchallengeid(self.player.pchallenges)
    ] = Math.max(
      self.player.pchallengecleared[
        getpchallengeid(self.player.pchallenges)
      ],
      self.player.challengecleared.length
    );
    self.player.prchallengecleared[
      getpchallengeid(self.player.pchallenges)
    ] = Math.max(
      self.player.prchallengecleared[
        getpchallengeid(self.player.pchallenges)
      ],
      self.player.rankchallengecleared.length
    );
    self.player.challengecleared = self.challengedata.challengeids;
    self.player.rankchallengecleared = self.challengedata.challengeids;
    for (let i = 0; i < setchipnum; i++) {
      self.player.disabledchip[i] = false;
    }
    countpchallengecleared(self);
  }
};

export const getpchallengeid = (arr) => {
  let challengeid = 0;
  for (let i = 9; i >= 0; i--) {
    challengeid *= 2;
    if (arr.includes(i)) {
      challengeid += 1;
    }
  }
  return challengeid;
};
