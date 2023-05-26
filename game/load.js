import { checkpipedsmalltrophies, countsmalltrophies } from "./smalltrophy.js";
import Decimal from "../break_eternity.esm.js";
import { setchipkind, setchipnum, trophynum } from "./params.js";
import { calclgcost } from "./lightGenerator.js";
import { checkusedchips } from "./chip.js";
import { calcdgcost } from "./darkGenerator.js";
import { calcaccost } from "./accelerator.js";
import { calcgncost, findhighestgenerator } from "./generator.js";
import { calccommonmult } from "./commonmult.js";
import { checkworlds } from "./world.js";
import { checkmemories } from "./memory.js";
import { checktrophies } from "./trophy.js";
import { countpchallengecleared } from "./pchallenge.js";

export const dataload = (self) => {
  if (!localStorage.getItem("playerStored")) return;
  let saveData = JSON.parse(localStorage.getItem("playerStored"));
  if (saveData.saveversion === 1) {
    saveData = readOldFormat(saveData);
  }
  if (localStorage.getItem("playerStoredb")) {
    self.players = JSON.parse(atob(localStorage.getItem("playerStoredb")));
  } else {
    self.players[0] = saveData;
  }
  for (let i = 0; i < 10; i++) {
    saveData = self.players[i];
    while (saveData.accelerators.length < 8) saveData.accelerators.push("0");
    while (saveData.acceleratorsBought.length < 8)
      saveData.acceleratorsBought.push("0");
    saveData.acceleratorsBought = saveData.acceleratorsBought.map(
      (v) => new Decimal(v)
    );
    while (saveData.acceleratorsCost.length < 8)
      saveData.acceleratorsCost.push("0");
    if (saveData.levelitems.length < 5) {
      while (saveData.levelitems.length < 5) {
        saveData.levelitems.push(0);
      }
      saveData.levelitems[3] = saveData.levelitems[1];
      saveData.levelitems[2] = saveData.levelitems[0];
      saveData.levelitems[1] = 0;
      saveData.levelitems[0] = 0;
    }
    while (saveData.trophies.length < trophynum) {
      saveData.trophies.push(false);
    }

    if (!("levelitembought" in saveData)) {
      saveData.levelitembought = 0;
    }
    if (!("ranktoken" in saveData)) {
      saveData.ranktoken = saveData.rankchallengecleared.length;
    }
    if (!("rankchallengebonuses" in saveData)) {
      saveData.rankchallengebonuses = [];
    }
    if (!("boughttype" in saveData)) {
      saveData.boughttype = [false, false, false, false, false, false];
    }
    while (saveData.boughttype.length < 6) {
      saveData.boughttype.push(false);
    }
    if (!("setmodes" in saveData)) {
      saveData.setmodes = new Array(8).fill(null).map((_, i) => i);
    }
    if (!("setchallengebonusesfst" in saveData)) {
      saveData.setchallengebonusesfst = [];
    }
    if (!("setchallengebonusessnd" in saveData)) {
      saveData.setchallengebonusessnd = [];
    }
    if (!("setrankchallengebonusesfst" in saveData)) {
      saveData.setrankchallengebonusesfst = [];
    }
    if (!("setrankchallengebonusessnd" in saveData)) {
      saveData.setrankchallengebonusessnd = [];
    }
    if (!("brightness" in saveData)) {
      saveData.brightness = 0;
    }
    if (!("darkmoney" in saveData)) {
      saveData.darkmoney = new Decimal(0);
    }
    if (!("darkgenerators" in saveData)) {
      saveData.darkgenerators = new Array(8)
        .fill(null)
        .map(() => new Decimal(0));
    }
    if (!("darkgeneratorsBought" in saveData)) {
      saveData.darkgeneratorsBought = new Array(8)
        .fill(null)
        .map(() => new Decimal(0));
    }
    if (!("darkgeneratorsCost" in saveData)) {
      saveData.darkgeneratorsCost = [
        new Decimal("1e100"),
        new Decimal("1e108"),
        new Decimal("1e127"),
        new Decimal("1e164"),
        new Decimal("1e225"),
        new Decimal("1e316"),
        new Decimal("1e443"),
        new Decimal("1e612"),
      ];
    }

    if (!("remember" in saveData)) {
      saveData.remember = 0;
    }
    if (!("rememberspent" in saveData)) {
      saveData.rememberspent = 0;
    }
    if (!("smalltrophies" in saveData)) {
      saveData.smalltrophies = new Array(100).fill(null).map(() => false);
    }
    if (!("smalltrophies2nd" in saveData)) {
      saveData.smalltrophies2nd = new Array(100).fill(null).map(() => false);
    }
    if (!("chip" in saveData)) {
      saveData.chip = new Array(setchipkind).fill(null).map(() => 0);
    }
    while (saveData.chip.length < setchipkind) {
      saveData.chip.push(0);
    }
    if (!("statue" in saveData)) {
      saveData.statue = new Array(setchipkind).fill(null).map(() => 0);
    }
    while (saveData.statue.length < setchipkind) {
      saveData.statue.push(0);
    }
    if (!("setchip" in saveData)) {
      saveData.setchip = new Array(setchipnum).fill(null).map(() => 0);
    }
    if (!("disabledchip" in saveData)) {
      saveData.disabledchip = new Array(setchipnum).fill(null).map(() => false);
    }
    if (!("darklevel" in saveData)) {
      saveData.darklevel = new Decimal(0);
    }
    if (!("worldpipe" in saveData)) {
      saveData.worldpipe = new Array(10).fill(null).map(() => 0);
    }
    if (!("accelevel" in saveData)) {
      saveData.accelevel = 0;
    }
    if (!("accelevelused" in saveData)) {
      saveData.accelevelused = 0;
    }
    if (!("crown" in saveData)) {
      saveData.crown = new Decimal(0);
    }
    if (!("crownresettime" in saveData)) {
      saveData.crownresettime = new Decimal(0);
    }
    if (!("lightmoney" in saveData)) {
      saveData.lightmoney = new Decimal(0);
    }
    if (!("lightgenerators" in saveData)) {
      saveData.lightgenerators = new Array(8)
        .fill(null)
        .map(() => new Decimal(0));
    }
    if (!("lightgeneratorsBought" in saveData)) {
      saveData.lightgeneratorsBought = new Array(8)
        .fill(null)
        .map(() => new Decimal(0));
    }
    if (!("lightgeneratorsCost" in saveData)) {
      saveData.lightgeneratorsCost = [
        new Decimal("1e200"),
        new Decimal("1e216"),
        new Decimal("1e281"),
        new Decimal("1e456"),
        new Decimal("1e825"),
        new Decimal("1e1496"),
        new Decimal("1e2601"),
        new Decimal("1e4296"),
      ];
    }
    if (!("setchiptypefst" in saveData)) {
      saveData.setchiptypefst = new Array(100).fill(setchipnum).map(() => 0);
    }
    if (!("onpchallenge" in saveData)) {
      saveData.onpchallenge = false;
    }
    if (!("pchallenges" in saveData)) {
      saveData.pchallenges = [];
    }
    if (!("pchallengecleared" in saveData)) {
      saveData.pchallengecleared = new Array(1024).fill(null).map(() => 0);
    }
    if (!("prchallengecleared" in saveData)) {
      saveData.prchallengecleared = new Array(1024).fill(null).map(() => 0);
    }
    if (!("flicker" in saveData)) {
      saveData.flicker = 0;
    }
    if (!("shineloader" in saveData)) {
      saveData.shineloader = new Array(8).fill(null).map(() => 0);
    }
    if (!("brightloader" in saveData)) {
      saveData.brightloader = new Array(8).fill(null).map(() => 0);
    }
    if (!("challengeweight" in saveData)) {
      saveData.challengeweight = new Array(20).fill(null).map(() => 0);
    }
    if (!("spendchip" in saveData)) {
      saveData.spendchip = new Array(setchipkind).fill(null).map(() => 0);
    }

    self.players[i] = saveData;
  }
};

export const load = (self, world) => {
  const saveData = self.players[world];
  self.world = world;
  console.log(saveData);
  self.player = {
    money: new Decimal(saveData.money),
    level: new Decimal(saveData.level),
    levelresettime: new Decimal(saveData.levelresettime),
    maxlevelgained: new Decimal(saveData.maxlevelgained ?? 1),
    token: saveData.token ?? 0,
    shine: saveData.shine ?? 0,
    brightness: saveData.brightness ?? 0,
    flicker: saveData.flicker ?? 0,
    shineloader: saveData.shineloader ?? new Array(8).fill(null).map(() => 0),
    brightloader: saveData.brightloader ?? new Array(8).fill(null).map(() => 0),

    rank: new Decimal(saveData.rank ?? 0),
    rankresettime: new Decimal(saveData.rankresettime ?? 0),
    ranktoken: saveData.ranktoken ?? 0,

    crown: new Decimal(saveData.crown ?? 0),
    crownresettime: new Decimal(saveData.crownresettime ?? 0),

    generators: saveData.generators.map((v) => new Decimal(v)),
    generatorsBought: saveData.generatorsBought.map((v) => new Decimal(v)),
    generatorsCost: saveData.generatorsCost.map((v) => new Decimal(v)),
    generatorsMode: saveData.generatorsMode.map((v) => parseInt(v)),

    accelerators: saveData.accelerators.map((v) => new Decimal(v)),
    acceleratorsBought: saveData.acceleratorsBought.map((v) => new Decimal(v)),
    acceleratorsCost: saveData.acceleratorsCost.map((v) => new Decimal(v)),

    darkmoney: new Decimal(saveData.darkmoney),

    darkgenerators: saveData.darkgenerators.map((v) => new Decimal(v)),
    darkgeneratorsBought: saveData.darkgeneratorsBought.map(
      (v) => new Decimal(v)
    ),
    darkgeneratorsCost: saveData.darkgeneratorsCost.map((v) => new Decimal(v)),

    lightmoney: new Decimal(saveData.lightmoney ?? 0),

    lightgenerators: saveData.lightgenerators.map((v) => new Decimal(v)),
    lightgeneratorsBought: saveData.lightgeneratorsBought.map(
      (v) => new Decimal(v)
    ),
    lightgeneratorsCost: saveData.lightgeneratorsCost.map(
      (v) => new Decimal(v)
    ),

    darklevel: new Decimal(saveData.darklevel),

    tickspeed: parseFloat(saveData.tickspeed),
    accelevel: saveData.accelevel ?? 0,
    accelevelused: saveData.accelevelused ?? 0,

    saveversion: parseInt(saveData.saveversion),

    currenttab: "basic",

    tweeting: saveData.tweeting ?? ["money"],

    onchallenge: saveData.onchallenge ?? false,
    challenges: saveData.challenges ?? [],
    challengecleared: saveData.challengecleared ?? [],
    challengebonuses: saveData.challengebonuses ?? [],
    challengeweight: new Array(20).fill(null).map(() => 0),
    onpchallenge: saveData.onpchallenge ?? false,
    pchallenges: saveData.pchallenges ?? [],
    pchallengecleared:
      saveData.pchallengecleared ?? new Array(1024).fill(null).map(() => 0),
    prchallengecleared:
      saveData.prchallengecleared ?? new Array(1024).fill(null).map(() => 0),
    rankchallengecleared: saveData.rankchallengecleared ?? [],
    rankchallengebonuses: saveData.rankchallengebonuses ?? [],
    boughttype: saveData.boughttype ?? [
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    setmodes: saveData.setmodes ?? new Array(8).fill(null).map((_, i) => i),
    setchallengebonusesfst: saveData.setchallengebonusesfst ?? [],
    setchallengebonusessnd: saveData.setchallengebonusessnd ?? [],
    setrankchallengebonusesfst: saveData.setrankchallengebonusesfst ?? [],
    setrankchallengebonusessnd: saveData.setrankchallengebonusessnd ?? [],
    trophies:
      saveData.trophies ?? new Array(trophynum).fill(null).map(() => false),
    smalltrophies:
      saveData.smalltrophies ?? new Array(100).fill(null).map(() => false),
    smalltrophies2nd:
      saveData.smalltrophies2nd ?? new Array(100).fill(null).map(() => false),
    levelitems: saveData.levelitems ?? [0, 0, 0, 0, 0],
    levelitembought: saveData.levelitembought ?? 0,
    remember: saveData.remember ?? 0,
    rememberspent: saveData.rememberspent ?? 0,
    chip: saveData.chip ?? new Array(setchipkind).fill(null).map(() => 0),
    setchip: saveData.setchip ?? new Array(setchipnum).fill(null).map(() => 0),
    disabledchip:
      saveData.disabledchip ??
      new Array(setchipnum).fill(null).map(() => false),
    spendchip: new Array(setchipkind).fill(null).map(() => 0),

    statue: saveData.statue ?? new Array(setchipkind).fill(null).map(() => 0),

    setchiptypefst:
      saveData.setchiptypefst ?? new Array(setchipnum).fill(null).map(() => 0),

    worldpipe: saveData.worldpipe ?? new Array(10).fill(null).map(() => 0),
  };
  if (!self.player.onchallenge || self.player.challengebonuses.includes(4))
    self.activechallengebonuses = self.player.challengebonuses;
  calcgncost(self);
  calcaccost(self);
  calcdgcost(self);
  calclgcost(self);
  checkusedchips(self);

  checktrophies(self);
  checkmemories(self);
  checkworlds(self);
  countsmalltrophies(self);
  calccommonmult(self);
  findhighestgenerator(self);
  checkpipedsmalltrophies(self);

  countpchallengecleared(self);
};

const readOldFormat = (saveData) => {
  return {
    money: new Decimal(saveData.money),
    level: new Decimal(saveData.level),
    levelresettime: new Decimal(saveData.levelresettime),
    maxlevelgained: new Decimal(saveData.maxlevelgained ?? 0),
    token: saveData.token ?? 0,
    shine: saveData.shine ?? 0,

    rank: new Decimal(saveData.rank ?? 0),
    rankresettime: new Decimal(saveData.rank ?? 0),

    generators: [
      new Decimal(saveData.generator1 ?? 0),
      new Decimal(saveData.generator2 ?? 0),
      new Decimal(saveData.generator3 ?? 0),
      new Decimal(saveData.generator4 ?? 0),
      new Decimal(saveData.generator5 ?? 0),
      new Decimal(saveData.generator6 ?? 0),
      new Decimal(saveData.generator7 ?? 0),
      new Decimal(saveData.generator8 ?? 0),
    ],
    generatorsBought: [
      new Decimal(saveData.generator1bought ?? 0),
      new Decimal(saveData.generator2bought ?? 0),
      new Decimal(saveData.generator3bought ?? 0),
      new Decimal(saveData.generator4bought ?? 0),
      new Decimal(saveData.generator5bought ?? 0),
      new Decimal(saveData.generator6bought ?? 0),
      new Decimal(saveData.generator7bought ?? 0),
      new Decimal(saveData.generator8bought ?? 0),
    ],
    generatorsCost: [
      new Decimal(saveData.generator1cost ?? "1"),
      new Decimal(saveData.generator2cost ?? "1e4"),
      new Decimal(saveData.generator3cost ?? "1e9"),
      new Decimal(saveData.generator4cost ?? "1e16"),
      new Decimal(saveData.generator5cost ?? "1e25"),
      new Decimal(saveData.generator6cost ?? "1e36"),
      new Decimal(saveData.generator7cost ?? "1e49"),
      new Decimal(saveData.generator8cost ?? "1e64"),
    ],
    generatorsMode: [
      parseInt(saveData.generator1mode ?? 0),
      parseInt(saveData.generator2mode ?? 1),
      parseInt(saveData.generator3mode ?? 2),
      parseInt(saveData.generator4mode ?? 3),
      parseInt(saveData.generator5mode ?? 4),
      parseInt(saveData.generator6mode ?? 5),
      parseInt(saveData.generator7mode ?? 6),
      parseInt(saveData.generator8mode ?? 7),
    ],

    accelerators: [
      new Decimal(saveData.accelerator1 ?? 0),
      new Decimal(saveData.accelerator2 ?? 0),
    ],
    acceleratorsBought: [
      new Decimal(saveData.accelerator1bought ?? 0),
      new Decimal(saveData.accelerator2bought ?? 0),
    ],
    acceleratorsCost: [
      new Decimal(saveData.accelerator1cost ?? 10),
      new Decimal(saveData.accelerator2cost ?? "1e10"),
    ],
    tickspeed: parseFloat(saveData.tickspeed ?? 1000),
    saveversion: version,

    currenttab: saveData.currenttab ?? "basic",

    tweeting: saveData.tweeting ?? ["money"],

    onchallenge: saveData.onchallenge ?? false,
    challenges: saveData.challenges ?? [],
    challengecleared: saveData.challengecleared ?? [],
    challengebonuses: saveData.challengebonuses ?? [],

    rankchallengecleared: saveData.rankchallengecleared ?? [],

    trophies: new Array(8).fill(null).map(() => false),

    levelitems: saveData.levelitems ?? [0, 0],
  };
};
