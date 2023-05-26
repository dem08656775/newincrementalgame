import { Challengedata } from "../challenge.js";
import { Chipdata } from "../chip.js";
import { Levelshopdata } from "../rank.js";
import { Rememberdata } from "../remember.js";
import { Shinedata } from "../shine.js";
import { Trophydata } from "../trophy.js";
import { setchipkind, setchipnum, trophynum, version } from "./params.js";
import Decimal from "../break_eternity.esm.js";
export const initialPlayerData = () => {
  return {
    money: new Decimal(1),
    level: new Decimal(0),
    levelresettime: new Decimal(0),
    maxlevelgained: new Decimal(1),
    token: 0,
    shine: 0,
    brightness: 0,
    flicker: 0,

    shineloader: new Array(8).fill(null).map(() => 0),
    brightloader: new Array(8).fill(null).map(() => 0),

    rank: new Decimal(0),
    rankresettime: new Decimal(0),

    crown: new Decimal(0),
    crownresettime: new Decimal(0),

    ranktoken: 0,

    generators: new Array(8).fill(null).map(() => new Decimal(0)),
    generatorsBought: new Array(8).fill(null).map(() => new Decimal(0)),
    generatorsCost: [
      new Decimal(1),
      new Decimal("1e4"),
      new Decimal("1e9"),
      new Decimal("1e16"),
      new Decimal("1e25"),
      new Decimal("1e36"),
      new Decimal("1e49"),
      new Decimal("1e64"),
    ],
    generatorsMode: new Array(8).fill(null).map((_, i) => i),

    accelerators: new Array(8).fill(null).map(() => new Decimal(0)),
    acceleratorsBought: new Array(8).fill(null).map(() => new Decimal(0)),
    acceleratorsCost: [
      new Decimal(10),
      new Decimal("1e10"),
      new Decimal("1e20"),
      new Decimal("1e40"),
      new Decimal("1e80"),
      new Decimal("1e160"),
      new Decimal("1e320"),
      new Decimal("1e640"),
    ],

    darkmoney: new Decimal(0),

    darkgenerators: new Array(8).fill(null).map(() => new Decimal(0)),
    darkgeneratorsBought: new Array(8).fill(null).map(() => new Decimal(0)),
    darkgeneratorsCost: [
      new Decimal("1e100"),
      new Decimal("1e108"),
      new Decimal("1e127"),
      new Decimal("1e164"),
      new Decimal("1e225"),
      new Decimal("1e316"),
      new Decimal("1e443"),
      new Decimal("1e612"),
    ],

    darklevel: new Decimal(0),

    lightmoney: new Decimal(0),

    lightgenerators: new Array(8).fill(null).map(() => new Decimal(0)),
    lightgeneratorsBought: new Array(8).fill(null).map(() => new Decimal(0)),
    lightgeneratorsCost: [
      new Decimal("1e200"),
      new Decimal("1e216"),
      new Decimal("1e281"),
      new Decimal("1e456"),
      new Decimal("1e825"),
      new Decimal("1e1496"),
      new Decimal("1e2601"),
      new Decimal("1e4296"),
    ],

    tickspeed: 1000,
    accelevel: 0,
    accelevelused: 0,
    saveversion: version,

    currenttab: "basic",
    tweeting: ["money"],

    onchallenge: false,
    challenges: [],
    challengecleared: [],
    challengebonuses: [],

    challengeweight: new Array(20).fill(null).map(() => 0),

    onpchallenge: false,
    pchallenges: [],
    pchallengecleared: new Array(1024).fill(null).map(() => 0),
    prchallengecleared: new Array(1024).fill(null).map(() => 0),

    boughttype: [false, false, false, false, false, false],
    setmodes: new Array(8).fill(null).map((_, i) => i),
    setchallengebonusesfst: [],
    setchallengebonusessnd: [],
    setrankchallengebonusesfst: [],
    setrankchallengebonusessnd: [],

    rankchallengecleared: [],
    rankchallengebonuses: [],

    trophies: new Array(trophynum).fill(null).map(() => false),
    smalltrophies: new Array(100).fill(null).map(() => false),
    smalltrophies2nd: new Array(100).fill(null).map(() => false),

    levelitems: [0, 0, 0, 0, 0],
    levelitembought: 0,

    remember: 0,
    rememberspent: 0,

    chip: new Array(setchipkind).fill(0).map(() => 0),
    setchip: new Array(setchipnum).fill(0).map(() => 0),
    disabledchip: new Array(setchipnum).fill(0).map(() => false),
    spendchip: new Array(setchipkind).fill(0).map(() => 0),

    statue: new Array(setchipkind).fill(0).map(() => 0),

    setchiptypefst: new Array(100).fill(setchipnum).map(() => 0),

    worldpipe: new Array(10).fill(null).map(() => 0),
  };
};

export const initialData = {
  player: initialPlayerData(),
  players: new Array(10).fill(null).map(() => initialPlayerData()),
  highest: 0,
  commonmult: new Decimal(0),
  incrementalmults: new Array(8).fill(null).map(() => new Decimal(1)),
  showmult: true,
  trophycheck: true,
  challengedata: new Challengedata(),
  levelshopdata: new Levelshopdata(),
  shinedata: new Shinedata(),
  trophydata: new Trophydata(),
  rememberdata: new Rememberdata(),
  chipdata: new Chipdata(),
  exported: "",
  activechallengebonuses: [],
  genautobuy: false,
  accautobuy: false,
  autolevel: false,
  autolevelnumber: new Decimal(2),
  autoranknumber: new Decimal(4),
  autolevelstopnumber: new Decimal("1e100"),
  litemautobuy: false,
  autorank: false,
  multbyac: new Decimal(1),
  shinepersent: 0,
  brightpersent: 0,
  flickerpersent: 0,
  memory: 0,
  trophynumber: new Array(10).fill(null).map(() => false),
  smalltrophy: 0,
  eachpipedsmalltrophy: new Array(10).fill(null).map(() => 0),
  pipedsmalltrophy: 0,
  worldopened: new Array(10).fill(null).map(() => false),
  chipused: new Array(setchipkind).fill(null).map(() => 0),
  pchallengestage: 0,
  world: 0,
  time: 0,
  diff: 0,
};

export const resetData = (self, force) => {
  if (
    force ||
    confirm(
      "これはソフトリセットではありません。\nすべてが無になり何も得られませんが、本当によろしいですか？"
    )
  ) {
    self.player = initialData();
    for (let i = 0; i < 10; i++) {
      self.players[i] = initialData();
    }
  }
};
