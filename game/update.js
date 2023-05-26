import Decimal from "../break_eternity.esm.js";
import { calcaccost, updateAccelerators } from "./accelerator.js";
import { calccommonmult } from "./commonmult.js";
import { calcdgcost } from "./darkGenerator.js";
import { calcgncost, findhighestgenerator, updateGenerators } from "./generator.js";
import { calcbasicincrementmult } from "./incrementmult.js";
import { buylevelitems } from "./levelitem.js";
import { checkmemories } from "./memory.js";
import { resetRank, resetRankborder } from "./rank.js";
import { calctoken } from "./rankToken.js";
import { checkremembers } from "./remember.js";
import { countsmalltrophies } from "./smalltrophy.js";
import { checktrophies } from "./trophy.js";
import { checkworlds } from "./world.js";

export const update = (self) => {
  let diffm = self.diff;
  self.diff = Date.now() - self.time - self.player.tickspeed;

  self.time = Date.now();
  self.activechallengebonuses =
    self.player.challengebonuses.includes(4) || !self.player.onchallenge
      ? self.player.challengebonuses
      : [];

  if (self.trophycheck) {
    checktrophies(self);
  }
  checkmemories(self);
  checkworlds(self);
  countsmalltrophies(self);
  calccommonmult(self);
  findhighestgenerator(self);
  for (let i = 0; i < 8; i++) {
    calcbasicincrementmult(self, i);
  }

  calcgncost(self);
  calcaccost(self);
  calcdgcost(self);
  updateGenerators(self, new Decimal(1));
  updateAccelerators(self, new Decimal(1));
  calctoken(self);

  let rememberlevel = Math.floor((checkremembers(self) + 16) / 16);

  let amult = new Decimal(1);
  if (self.activechallengebonuses.includes(6)) {
    if (self.player.rankchallengebonuses.includes(10)) {
      amult = amult.mul(self.player.acceleratorsBought[0].pow_base(2));
    } else {
      amult = amult.mul(self.player.acceleratorsBought[0].add(1));
    }
  }

  self.shinepersent = self.shinedata.getp(self.player.challengecleared.length);
  self.shinepersent += 0.02 * self.player.setchip[30];
  self.shinepersent += 0.01 * self.eachpipedsmalltrophy[6] * 0.5;

  if (
    self.player.shine <
      self.shinedata.getmaxshine(self.player.challengecleared.length) *
        rememberlevel &&
    Math.random() < self.shinepersent
  ) {
    let shineget = 1;
    if (self.player.rankchallengebonuses.includes(2)) shineget = 2;
    let d = new Date();
    if (d.getMonth() == 11 && 22 <= d.getDate() && d.getDate() <= 28) {
      if (Math.random() <= 0.5) {
        shineget = shineget + 1; //クリスマスキャンペーン
      }
    }
    self.player.shine += shineget;
  }

  self.brightpersent = self.shinedata.getbp(
    self.player.rankchallengecleared.length
  );
  self.brightpersent += 0.001 * self.player.setchip[49];
  self.brightpersent += 0.001 * self.eachpipedsmalltrophy[9] * 0.2;

  if (
    self.player.brightness <
      self.shinedata.getmaxbr(self.player.rankchallengecleared.length) *
        rememberlevel &&
    Math.random() < self.brightpersent
  ) {
    let brightget = 1;
    let d = new Date();
    if (d.getMonth() == 11 && 22 <= d.getDate() && d.getDate() <= 28) {
      if (Math.random() <= 0.5) {
        brightget = brightget + 1; //クリスマスキャンペーン
      }
    }
    self.player.brightness += brightget;
  }

  self.flickerpersent = self.shinedata.getfp(self.pchallengestage);

  if (
    self.player.flicker < self.shinedata.getmaxfl(self.pchallengestage) &&
    Math.random() < self.flickerpersent
  ) {
    let flickerget = 1;
    let d = new Date();
    if (d.getMonth() == 11 && 22 <= d.getDate() && d.getDate() <= 28) {
      if (Math.random() <= 0.5) {
        flickerget = flickerget + 1; //クリスマスキャンペーン
      }
    }
    self.player.flicker += flickerget;
  }

  let autorankshine = Math.max(0, 1000 - checkremembers(self) * 10);

  if (
    !self.player.onchallenge &&
    self.player.rankchallengebonuses.includes(14) &&
    self.autorank
  ) {
    if (
      self.player.shine >= autorankshine &&
      self.player.money.greaterThanOrEqualTo(resetRankborder(self))
    ) {
      if (calcgainrank(self).greaterThanOrEqualTo(self.autoranknumber)) {
        resetRank(self, true);
        self.player.shine -= autorankshine;
      }
    }
  }

  if (self.player.rankchallengebonuses.includes(5) && self.litemautobuy) {
    for (let i = 0; i < 5; i++) {
      buylevelitems(self, i);
    }
  }

  if (
    !self.player.onchallenge &&
    self.activechallengebonuses.includes(14) &&
    self.autolevel
  ) {
    if (
      self.player.money.greaterThanOrEqualTo("1e18") &&
      self.player.level.lt(self.autolevelstopnumber)
    ) {
      if (calcgainlevel(self).greaterThanOrEqualTo(self.autolevelnumber)) {
        resetLevel(self, true, false);
      }
    }
  }

  if (self.activechallengebonuses.includes(5) && self.genautobuy) {
    for (let i = 7; i >= 0; i--) {
      buyGenerator(self, i);
    }
  }

  if (self.activechallengebonuses.includes(9) && self.accautobuy) {
    let ha = self.player.levelitems[3] + 1;
    for (let i = ha; i >= 0; i--) {
      buyAccelerator(self, i);
    }
  }

  let acnum = self.player.accelerators[0].mul(
    new Decimal(1.5).pow(self.player.setchip[10])
  );

  if (self.player.rankchallengebonuses.includes(13)) {
    for (let i = 1; i < 8; i++) {
      acnum = acnum.mul(self.player.accelerators[i].add(1));
    }
  }

  //self.player.tickspeed = 10
  let tsp = 1000;
  if (self.player.onpchallenge && self.player.pchallenges.includes(1))
    tsp = 10000;
  tsp += 500 * self.player.accelevelused;
  self.player.tickspeed =
    (tsp -
      self.player.setchip[9] * 50 -
      self.player.levelitems[1] *
        self.player.challengebonuses.length *
        (1 + self.player.setchip[27] * 0.5)) /
    acnum.add(10).mul(amult).log10();

  if (self.player.rankchallengebonuses.includes(9)) {
    self.multbyac = new Decimal(50).div(self.player.tickspeed);
    self.player.tickspeed = 50;
  } else {
    self.multbyac = new Decimal(1);
  }
  if (
    self.player.accelevelused == self.player.accelevel &&
    self.player.tickspeed <= 10
  )
    self.player.accelevel = self.player.accelevel + 1;

  setTimeout(
    self.update,
    Math.max(self.player.tickspeed - (self.diff + diffm) / 2, 1)
  );
};
