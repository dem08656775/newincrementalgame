import { trophynum } from "./params.js";
import { checkremembers } from "./remember.js";

export const confchecktrophies = (self) => {
  self.trophycheck = !self.trophycheck;
};

export const checktrophies = (self) => {
  if (self.player.levelresettime.greaterThan(0)) self.player.trophies[0] = true;
  if (self.player.rankresettime.greaterThan(0)) self.player.trophies[1] = true;
  if (self.player.shine > 0) self.player.trophies[2] = true;
  if (
    self.player.challengecleared.includes(238) ||
    self.player.challengecleared.length >= 100
  )
    self.player.trophies[3] = true;
  if (self.player.darkgenerators[0].greaterThan(0))
    self.player.trophies[4] = true;
  if (self.player.brightness > 0) self.player.trophies[5] = true;
  if (self.player.remember > 0) self.player.trophies[6] = true;
  if (self.world == 0) {
    if (checkremembers(self) > 0) self.player.trophies[6] = true;
  }
  if (self.player.crownresettime.greaterThan(0)) self.player.trophies[7] = true;
  if (self.player.lightgenerators[0].greaterThan(0))
    self.player.trophies[8] = true;
  if (self.player.flicker > 0) self.player.trophies[9] = true;

  if (self.player.money.greaterThan(0)) self.player.smalltrophies[0] = true;
  if (self.player.money.greaterThan(777)) self.player.smalltrophies[1] = true;
  if (self.player.money.greaterThan(7777777))
    self.player.smalltrophies[2] = true;
  if (self.player.money.greaterThan("1e19"))
    self.player.smalltrophies[3] = true;
  if (self.player.money.greaterThan("1e36"))
    self.player.smalltrophies[4] = true;
  if (self.player.money.greaterThan("1e77"))
    self.player.smalltrophies[5] = true;
  if (self.player.money.greaterThan("1e81"))
    self.player.smalltrophies[6] = true;
  if (self.player.money.greaterThan("1e303"))
    self.player.smalltrophies[7] = true;
  if (self.player.generatorsBought[0].greaterThan(0))
    self.player.smalltrophies[8] = true;
  if (self.player.generatorsBought[1].greaterThan(0))
    self.player.smalltrophies[9] = true;
  if (self.player.generatorsBought[2].greaterThan(0))
    self.player.smalltrophies[10] = true;
  if (self.player.generatorsBought[3].greaterThan(0))
    self.player.smalltrophies[11] = true;
  if (self.player.generatorsBought[4].greaterThan(0))
    self.player.smalltrophies[12] = true;
  if (self.player.generatorsBought[5].greaterThan(0))
    self.player.smalltrophies[13] = true;
  if (self.player.generatorsBought[6].greaterThan(0))
    self.player.smalltrophies[14] = true;
  if (self.player.generatorsBought[7].greaterThan(0))
    self.player.smalltrophies[15] = true;
  if (self.player.acceleratorsBought[0].greaterThan(0))
    self.player.smalltrophies[16] = true;
  if (self.player.acceleratorsBought[1].greaterThan(0))
    self.player.smalltrophies[17] = true;
  if (self.player.acceleratorsBought[2].greaterThan(0))
    self.player.smalltrophies[18] = true;
  if (self.player.acceleratorsBought[3].greaterThan(0))
    self.player.smalltrophies[19] = true;
  if (self.player.acceleratorsBought[4].greaterThan(0))
    self.player.smalltrophies[20] = true;
  if (self.player.acceleratorsBought[5].greaterThan(0))
    self.player.smalltrophies[21] = true;
  if (self.player.acceleratorsBought[6].greaterThan(0))
    self.player.smalltrophies[22] = true;
  if (self.player.acceleratorsBought[7].greaterThan(0))
    self.player.smalltrophies[23] = true;
  if (self.player.levelresettime.greaterThan(200))
    self.player.smalltrophies[24] = true;
  if (self.player.levelresettime.greaterThan(999))
    self.player.smalltrophies[25] = true;
  if (self.player.challengecleared.includes(128))
    self.player.smalltrophies[26] = true;
  if (self.player.challengecleared.includes(64))
    self.player.smalltrophies[27] = true;
  if (self.player.challengecleared.includes(32))
    self.player.smalltrophies[28] = true;
  if (self.player.challengecleared.includes(16))
    self.player.smalltrophies[29] = true;
  if (self.player.challengecleared.includes(8))
    self.player.smalltrophies[30] = true;
  if (self.player.challengecleared.includes(4))
    self.player.smalltrophies[31] = true;
  if (self.player.challengecleared.includes(2))
    self.player.smalltrophies[32] = true;
  if (self.player.challengecleared.includes(1))
    self.player.smalltrophies[33] = true;
  if (self.player.challengecleared.length >= 32)
    self.player.smalltrophies[34] = true;
  if (self.player.challengecleared.length >= 64)
    self.player.smalltrophies[35] = true;
  if (self.player.challengecleared.length >= 96)
    self.player.smalltrophies[36] = true;
  if (self.player.challengecleared.length >= 128)
    self.player.smalltrophies[37] = true;
  if (self.player.challengecleared.length >= 160)
    self.player.smalltrophies[38] = true;
  if (self.player.challengecleared.length >= 192)
    self.player.smalltrophies[39] = true;
  if (self.player.challengecleared.length >= 224)
    self.player.smalltrophies[40] = true;
  if (self.player.challengecleared.length >= 255)
    self.player.smalltrophies[41] = true;
  if (self.player.rankresettime.greaterThan(1))
    self.player.smalltrophies[42] = true;
  if (self.player.rankresettime.greaterThan(4))
    self.player.smalltrophies[43] = true;
  if (self.player.rankresettime.greaterThan(9))
    self.player.smalltrophies[44] = true;
  if (self.player.rankresettime.greaterThan(99))
    self.player.smalltrophies[45] = true;
  if (self.player.rankresettime.greaterThan(999))
    self.player.smalltrophies[46] = true;
  if (self.player.levelitembought >= 4) self.player.smalltrophies[47] = true;
  if (self.player.levelitembought >= 108) self.player.smalltrophies[48] = true;
  if (self.player.levelitembought >= 256) self.player.smalltrophies[49] = true;
  if (self.player.levelitembought >= 1728) self.player.smalltrophies[50] = true;
  if (self.player.levelitembought >= 12500)
    self.player.smalltrophies[51] = true;
  if (self.player.shine >= 100) self.player.smalltrophies[52] = true;
  if (self.player.shine >= 1000) self.player.smalltrophies[53] = true;
  if (self.player.shine >= 10000) self.player.smalltrophies[54] = true;
  if (self.player.shine >= 100000) self.player.smalltrophies[55] = true;
  if (self.player.shine >= 1000000) self.player.smalltrophies[56] = true;
  if (self.player.shine >= 10000000) self.player.smalltrophies[57] = true;
  if (self.exported.length >= 2) self.player.smalltrophies[58] = true;
  if (self.player.tweeting.length >= 2) self.player.smalltrophies[59] = true;
  if (self.player.darkgenerators[0].greaterThanOrEqualTo(1))
    self.player.smalltrophies[60] = true;
  if (self.player.darkgenerators[1].greaterThanOrEqualTo(1))
    self.player.smalltrophies[61] = true;
  if (self.player.darkgenerators[2].greaterThanOrEqualTo(1))
    self.player.smalltrophies[62] = true;
  if (self.player.darkgenerators[3].greaterThanOrEqualTo(1))
    self.player.smalltrophies[63] = true;
  if (self.player.darkgenerators[4].greaterThanOrEqualTo(1))
    self.player.smalltrophies[64] = true;
  if (self.player.darkgenerators[5].greaterThanOrEqualTo(1))
    self.player.smalltrophies[65] = true;
  if (self.player.darkgenerators[6].greaterThanOrEqualTo(1))
    self.player.smalltrophies[66] = true;
  if (self.player.darkgenerators[7].greaterThanOrEqualTo(1))
    self.player.smalltrophies[67] = true;
  if (self.player.rankchallengecleared.length >= 32)
    self.player.smalltrophies[68] = true;
  if (self.player.rankchallengecleared.length >= 64)
    self.player.smalltrophies[69] = true;
  if (self.player.rankchallengecleared.length >= 96)
    self.player.smalltrophies[70] = true;
  if (self.player.rankchallengecleared.length >= 128)
    self.player.smalltrophies[71] = true;
  if (self.player.rankchallengecleared.length >= 160)
    self.player.smalltrophies[72] = true;
  if (self.player.rankchallengecleared.length >= 192)
    self.player.smalltrophies[73] = true;
  if (self.player.rankchallengecleared.length >= 224)
    self.player.smalltrophies[74] = true;
  if (self.player.rankchallengecleared.length >= 255)
    self.player.smalltrophies[75] = true;
  if (self.player.brightness >= 10) self.player.smalltrophies[76] = true;
  if (self.player.brightness >= 100) self.player.smalltrophies[77] = true;
  if (self.player.brightness >= 1000) self.player.smalltrophies[78] = true;
  if (self.player.brightness >= 10000) self.player.smalltrophies[79] = true;
  if (self.player.darkmoney.greaterThanOrEqualTo(1))
    self.player.smalltrophies[80] = true;
  if (self.player.darkmoney.greaterThanOrEqualTo(777))
    self.player.smalltrophies[81] = true;
  if (self.player.darkmoney.greaterThanOrEqualTo(7777777))
    self.player.smalltrophies[82] = true;
  if (self.player.darkmoney.greaterThanOrEqualTo("1e18"))
    self.player.smalltrophies[83] = true;
  if (self.player.darkmoney.greaterThanOrEqualTo("1e72"))
    self.player.smalltrophies[84] = true;
  if (self.player.chip[0] > 0) self.player.smalltrophies[85] = true;
  if (self.player.chip[0] >= 210) self.player.smalltrophies[86] = true;
  if (self.player.chip[0] >= 1275) self.player.smalltrophies[87] = true;
  if (self.player.chip[1] > 0) self.player.smalltrophies[88] = true;
  if (self.player.chip[1] >= 210) self.player.smalltrophies[89] = true;
  if (self.player.chip[1] >= 1275) self.player.smalltrophies[90] = true;
  if (self.player.chip[2] > 0) self.player.smalltrophies[91] = true;
  if (self.player.chip[2] >= 210) self.player.smalltrophies[92] = true;
  if (self.player.chip[2] >= 1275) self.player.smalltrophies[93] = true;
  if (self.player.chip[3] > 0) self.player.smalltrophies[94] = true;
  if (self.player.chip[3] >= 210) self.player.smalltrophies[95] = true;
  if (self.player.chip[3] >= 1275) self.player.smalltrophies[96] = true;
  if (self.player.darklevel.greaterThan(0))
    self.player.smalltrophies[97] = true;
  if (self.player.darklevel.greaterThan("1e3"))
    self.player.smalltrophies[98] = true;
  if (self.player.darklevel.greaterThan("1e10"))
    self.player.smalltrophies[99] = true;

  if (self.player.crownresettime.gt(0)) {
    if (self.player.crownresettime.gt(0))
      self.player.smalltrophies2nd[0] = true;
    if (self.player.crownresettime.greaterThanOrEqualTo(5))
      self.player.smalltrophies2nd[1] = true;
    if (self.player.crownresettime.greaterThanOrEqualTo(20))
      self.player.smalltrophies2nd[2] = true;
    if (self.player.crownresettime.greaterThanOrEqualTo(100))
      self.player.smalltrophies2nd[3] = true;
    if (self.player.accelevel >= 1) self.player.smalltrophies2nd[4] = true;
    if (self.player.accelevel >= 3) self.player.smalltrophies2nd[5] = true;
    if (self.player.accelevel >= 6) self.player.smalltrophies2nd[6] = true;
    if (self.player.accelevel >= 10) self.player.smalltrophies2nd[7] = true;
    if (self.player.rank.gt("1e8")) self.player.smalltrophies2nd[8] = true;
    if (self.player.rank.gt("1e10")) self.player.smalltrophies2nd[9] = true;
    if (self.player.rank.gt("1e12")) self.player.smalltrophies2nd[10] = true;
    if (self.player.lightgenerators[0].greaterThanOrEqualTo(1))
      self.player.smalltrophies2nd[11] = true;
    if (self.player.lightgenerators[1].greaterThanOrEqualTo(1))
      self.player.smalltrophies2nd[12] = true;
    if (self.player.lightgenerators[2].greaterThanOrEqualTo(1))
      self.player.smalltrophies2nd[13] = true;
    if (self.player.lightgenerators[3].greaterThanOrEqualTo(1))
      self.player.smalltrophies2nd[14] = true;
    if (self.player.lightgenerators[4].greaterThanOrEqualTo(1))
      self.player.smalltrophies2nd[15] = true;
    if (self.player.lightgenerators[5].greaterThanOrEqualTo(1))
      self.player.smalltrophies2nd[16] = true;
    if (self.player.lightgenerators[6].greaterThanOrEqualTo(1))
      self.player.smalltrophies2nd[17] = true;
    if (self.player.lightgenerators[7].greaterThanOrEqualTo(1))
      self.player.smalltrophies2nd[18] = true;
    if (self.player.chip[4] > 0) self.player.smalltrophies2nd[19] = true;
    if (self.player.chip[4] >= 210) self.player.smalltrophies2nd[20] = true;
    if (self.player.chip[4] >= 1275) self.player.smalltrophies2nd[21] = true;
    if (self.player.statue[0] >= 10) self.player.smalltrophies2nd[22] = true;
    if (self.player.statue[1] >= 10) self.player.smalltrophies2nd[23] = true;
    if (self.player.statue[2] >= 10) self.player.smalltrophies2nd[24] = true;
    if (self.player.statue[3] >= 10) self.player.smalltrophies2nd[25] = true;
    if (self.player.crown.greaterThanOrEqualTo(100))
      self.player.smalltrophies2nd[26] = true;
    if (self.player.crown.greaterThanOrEqualTo(10000))
      self.player.smalltrophies2nd[27] = true;
    if (self.player.crown.greaterThanOrEqualTo("1e8"))
      self.player.smalltrophies2nd[28] = true;
    if (self.player.lightmoney.greaterThanOrEqualTo(1))
      self.player.smalltrophies2nd[29] = true;
    if (self.player.lightmoney.greaterThanOrEqualTo("1e9"))
      self.player.smalltrophies2nd[30] = true;
    if (self.player.lightmoney.greaterThanOrEqualTo("1e18"))
      self.player.smalltrophies2nd[31] = true;
    if (self.player.lightmoney.greaterThanOrEqualTo("1e36"))
      self.player.smalltrophies2nd[32] = true;
    if (self.player.flicker >= 10) self.player.smalltrophies2nd[33] = true;
    if (self.player.flicker >= 100) self.player.smalltrophies2nd[34] = true;
    if (self.player.flicker >= 1000) self.player.smalltrophies2nd[35] = true;
    if (self.player.flicker >= 10000) self.player.smalltrophies2nd[36] = true;
    if (self.player.flicker >= 100000) self.player.smalltrophies2nd[37] = true;
    if (self.player.flicker >= 1000000) self.player.smalltrophies2nd[38] = true;
    if (self.player.chip[5] > 0) self.player.smalltrophies2nd[39] = true;
    if (self.player.chip[5] >= 210) self.player.smalltrophies2nd[40] = true;
    if (self.player.chip[5] >= 1275) self.player.smalltrophies2nd[41] = true;
    if (self.player.chip[6] > 0) self.player.smalltrophies2nd[42] = true;
    if (self.player.chip[6] >= 210) self.player.smalltrophies2nd[43] = true;
    if (self.player.chip[6] >= 1275) self.player.smalltrophies2nd[44] = true;
    if (self.player.statue[4] >= 10) self.player.smalltrophies2nd[45] = true;
    if (self.player.statue[5] >= 10) self.player.smalltrophies2nd[46] = true;
    if (self.player.statue[6] >= 10) self.player.smalltrophies2nd[47] = true;
    if (self.player.statue[0] >= 64) self.player.smalltrophies2nd[48] = true;
    if (self.player.statue[1] >= 64) self.player.smalltrophies2nd[49] = true;
    if (self.player.statue[2] >= 64) self.player.smalltrophies2nd[50] = true;
    if (self.player.statue[3] >= 64) self.player.smalltrophies2nd[51] = true;
    if (self.player.statue[4] >= 64) self.player.smalltrophies2nd[52] = true;
    if (self.player.statue[5] >= 64) self.player.smalltrophies2nd[53] = true;
    if (self.player.statue[6] >= 64) self.player.smalltrophies2nd[54] = true;
  }
};

export const counttrophies = (self, index) => {
  let cnt = 0;
  for (let i = 0; i < trophynum; i++) {
    if (self.players[index].trophies[i]) cnt++;
  }
  self.trophynumber[index] = cnt;
};

export const gettrophyname = (self, i) => {
  return self.player.trophies[i] ? self.trophydata.contents[i] : "???";
};