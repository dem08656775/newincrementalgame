import Decimal from "../break_eternity.esm.js";
import { checkremembers } from "./remember.js";
import { checkpipedsmalltrophies } from "./smalltrophy.js";

export const checkworlds = (self) => {
  self.worldopened[0] = true;
  if (new Decimal(self.players[0].crownresettime).gt(0)) {
    for (let i = 1; i < 10; i++) {
      self.worldopened[i] = true;
    }
  }

  if (self.players[0].challengecleared.includes(238))
    self.worldopened[1] = true;
  if (self.players[0].challengecleared.length >= 100)
    self.worldopened[2] = true;
  if (self.players[0].rankchallengecleared.length >= 16)
    self.worldopened[3] = true;
  if (self.players[0].levelitembought >= 12500) self.worldopened[4] = true;
  if (new Decimal(self.players[0].darkmoney).greaterThanOrEqualTo("1e8"))
    self.worldopened[5] = true;
  if (new Decimal(self.players[0].rank).greaterThanOrEqualTo(262142))
    self.worldopened[6] = true;
  if (self.players[0].rankchallengecleared.includes(238))
    self.worldopened[7] = true;
  if (self.players[0].challengecleared.length >= 200)
    self.worldopened[8] = true;
  if (self.players[0].rankchallengecleared.length >= 200)
    self.worldopened[9] = true;
  return self;
};

export const shrinkworld = (self, i) => {
  if (4 > self.trophynumber[i]) {
    alert("実績が4つ未満なので、世界を収縮できません。");
    return;
  }
  if (self.players[i].remember >= self.trophynumber[i]) {
    alert("実績が思い出より多くありません。");
    return;
  }
  if (
    confirm(
      "世界" +
        (i + 1) +
        "を収縮させ、記憶を思い出に変化させますか？収縮した世界は最初からになります。"
    )
  ) {
    let u = self.trophynumber[i];
    let r = checkremembers(self);
    self.players[i] = initialData();
    self.players[i].remember = u;
    if (r >= 1) self.players[i].levelresettime = new Decimal(1);
    if (r >= 2) self.players[i].levelresettime = new Decimal(2);
    if (r >= 3) self.players[i].levelresettime = new Decimal(3);
    if (r >= 4) self.players[i].levelresettime = new Decimal(5);
    if (r >= 5) self.players[i].levelresettime = new Decimal(8);
    if (r >= 6) self.players[i].levelresettime = new Decimal(13);
    if (r >= 7) self.players[i].levelresettime = new Decimal(21);
    if (r >= 8) self.players[i].levelresettime = new Decimal(34);
    if (r >= 9) self.players[i].rankresettime = new Decimal(1);
    if (r >= 10) self.players[i].rankresettime = new Decimal(2);
    if (r >= 11) self.players[i].rankresettime = new Decimal(3);
    if (r >= 12) self.players[i].rankresettime = new Decimal(5);
    if (r >= 13) self.players[i].rankresettime = new Decimal(8);
    if (r >= 14) self.players[i].rankresettime = new Decimal(13);
    if (r >= 15) self.players[i].rankresettime = new Decimal(21);
    if (r >= 16) self.players[i].rankresettime = new Decimal(34);
    if (r >= 17) {
      for (let j = 0; j < self.rememberdata.givenchalenges[0].length; j++) {
        self.players[i].challengecleared.push(
          self.getchallengeid(self.rememberdata.givenchalenges[0][j])
        );
      }
    }
    if (r >= 18) {
      for (let j = 0; j < self.rememberdata.givenchalenges[1].length; j++) {
        self.players[i].challengecleared.push(
          self.getchallengeid(self.rememberdata.givenchalenges[1][j])
        );
      }
    }
    if (r >= 19) {
      for (let j = 0; j < self.rememberdata.givenchalenges[2].length; j++) {
        self.players[i].challengecleared.push(
          self.getchallengeid(self.rememberdata.givenchalenges[2][j])
        );
      }
    }
    if (r >= 20) {
      for (let j = 0; j < self.rememberdata.givenchalenges[3].length; j++) {
        self.players[i].challengecleared.push(
          self.getchallengeid(self.rememberdata.givenchalenges[3][j])
        );
      }
    }
    if (r >= 21) {
      for (let j = 0; j < self.rememberdata.givenchalenges[4].length; j++) {
        self.players[i].challengecleared.push(
          self.getchallengeid(self.rememberdata.givenchalenges[4][j])
        );
      }
    }
    if (r >= 22) {
      for (let j = 0; j < self.rememberdata.givenchalenges[5].length; j++) {
        self.players[i].challengecleared.push(
          self.getchallengeid(self.rememberdata.givenchalenges[5][j])
        );
      }
    }
    if (r >= 23) {
      for (let j = 0; j < self.rememberdata.givenchalenges[6].length; j++) {
        self.players[i].challengecleared.push(
          self.getchallengeid(self.rememberdata.givenchalenges[6][j])
        );
      }
    }
    if (r >= 24) {
      for (let j = 0; j < self.rememberdata.givenchalenges[7].length; j++) {
        self.players[i].challengecleared.push(
          self.getchallengeid(self.rememberdata.givenchalenges[7][j])
        );
      }
    }
    if (r >= 25) self.players[i].rank = new Decimal(64);
    if (r >= 26) self.players[i].levelitembought = 108;
    if (r >= 27) self.players[i].rank = new Decimal(128);
    if (r >= 28) self.players[i].levelitembought = 256;
    if (r >= 29) self.players[i].rank = new Decimal(256);
    if (r >= 30) self.players[i].levelitembought = 800;
    if (r >= 31) self.players[i].rank = new Decimal(512);
    if (r >= 32) self.players[i].levelitembought = 1728;
    if (r >= 33) self.players[i].maxlevelgained = new Decimal(1000);
    if (r >= 34) {
      for (let j = 0; j < self.rememberdata.givenchalenges[8].length; j++) {
        self.players[i].challengecleared.push(
          self.getchallengeid(self.rememberdata.givenchalenges[8][j])
        );
      }
    }
    if (r >= 35) self.players[i].maxlevelgained = new Decimal(3000);
    if (r >= 36) {
      for (let j = 0; j < self.rememberdata.givenchalenges[9].length; j++) {
        self.players[i].challengecleared.push(
          self.getchallengeid(self.rememberdata.givenchalenges[9][j])
        );
      }
    }
    if (r >= 37) self.players[i].maxlevelgained = new Decimal(10000);
    if (r >= 38) {
      for (let j = 0; j < self.rememberdata.givenchalenges[10].length; j++) {
        self.players[i].challengecleared.push(
          self.getchallengeid(self.rememberdata.givenchalenges[10][j])
        );
      }
    }
    if (r >= 39) self.players[i].maxlevelgained = new Decimal(30000);
    if (r >= 40) {
      for (let j = 0; j < self.rememberdata.givenchalenges[11].length; j++) {
        self.players[i].challengecleared.push(
          self.getchallengeid(self.rememberdata.givenchalenges[11][j])
        );
      }
    }
    if (r >= 41) self.players[i].levelresettime = new Decimal(1000);
    if (r >= 42) self.players[i].rankresettime = new Decimal(300);
    if (r >= 43) self.players[i].rank = new Decimal(4096);
    if (r >= 44) self.players[i].shine = 100000;
    if (r >= 45) self.players[i].maxlevelgained = new Decimal(100000);
    if (r >= 46) self.players[i].levelitembought = 6400;
    if (r >= 47) {
      for (let j = 0; j < self.rememberdata.givenchalenges[12].length; j++) {
        self.players[i].challengecleared.push(
          self.getchallengeid(self.rememberdata.givenchalenges[12][j])
        );
      }
    }
    if (r >= 48) {
      for (let j = 0; j < self.rememberdata.givenchalenges[13].length; j++) {
        self.players[i].challengecleared.push(
          self.getchallengeid(self.rememberdata.givenchalenges[13][j])
        );
      }
    }
    if (r >= 49) {
      for (let j = 0; j < self.rememberdata.givenchalenges[14].length; j++) {
        self.players[i].challengecleared.push(
          self.getchallengeid(self.rememberdata.givenchalenges[14][j])
        );
      }
    }
    if (r >= 50) {
      for (let j = 0; j < self.rememberdata.givenchalenges[15].length; j++) {
        self.players[i].challengecleared.push(
          self.getchallengeid(self.rememberdata.givenchalenges[15][j])
        );
      }
    }
    if (r >= 51) {
      for (let j = 0; j < self.rememberdata.givenchalenges[16].length; j++) {
        self.players[i].challengecleared.push(
          self.getchallengeid(self.rememberdata.givenchalenges[16][j])
        );
      }
    }
    if (r >= 52) {
      for (let j = 0; j < self.rememberdata.givenchalenges[17].length; j++) {
        self.players[i].challengecleared.push(
          self.getchallengeid(self.rememberdata.givenchalenges[17][j])
        );
      }
    }
    if (r >= 53) {
      for (let j = 0; j < self.rememberdata.givenchalenges[0].length; j++) {
        self.players[i].rankchallengecleared.push(
          self.getchallengeid(self.rememberdata.givenchalenges[0][j])
        );
      }
    }
    if (r >= 54) {
      for (let j = 0; j < self.rememberdata.givenchalenges[1].length; j++) {
        self.players[i].rankchallengecleared.push(
          self.getchallengeid(self.rememberdata.givenchalenges[1][j])
        );
      }
    }
    if (r >= 55) {
      for (let j = 0; j < self.rememberdata.givenchalenges[2].length; j++) {
        self.players[i].rankchallengecleared.push(
          self.getchallengeid(self.rememberdata.givenchalenges[2][j])
        );
      }
    }
    if (r >= 56) {
      for (let j = 0; j < self.rememberdata.givenchalenges[3].length; j++) {
        self.players[i].rankchallengecleared.push(
          self.getchallengeid(self.rememberdata.givenchalenges[3][j])
        );
      }
    }
    if (r >= 57) self.players[i].chip[0] = 1;
    if (r >= 58) self.players[i].chip[0] = 15;
    if (r >= 59) self.players[i].chip[0] = 55;
    if (r >= 60) self.players[i].chip[0] = 120;
    if (r >= 61) self.players[i].chip[1] = 1;
    if (r >= 62) self.players[i].chip[1] = 15;
    if (r >= 63) self.players[i].chip[1] = 55;
    if (r >= 64) self.players[i].chip[1] = 120;
    if (r >= 65) self.players[i].chip[2] = 1;
    if (r >= 66) self.players[i].chip[2] = 15;
    if (r >= 67) self.players[i].chip[2] = 55;
    if (r >= 68) self.players[i].chip[2] = 120;
    if (r >= 69) self.players[i].chip[3] = 1;
    if (r >= 70) self.players[i].chip[3] = 15;
    if (r >= 71) self.players[i].chip[3] = 55;
    if (r >= 72) self.players[i].chip[3] = 120;

    self.players[i].token = self.players[i].challengecleared.length;

    checkpipedsmalltrophies(self);
  }
};

export const moveworld = (self, i) => {
  if (self.world == i || !self.worldopened[i]) return;
  self.load(i);
  self.world = i;
};
