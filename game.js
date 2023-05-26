import Decimal from "./break_eternity.esm.js";
import { updateCommonMult } from "./game/commonmult.js";
import {
  buyGenerator,
  calcgncost,
  findhighestgenerator,
  updateGenerators,
} from "./game/generator.js";
import {
  calcbasicincrementmult,
  calcincrementmult,
} from "./game/incrementmult.js";
import { initialData, resetData } from "./game/initialData.js";
import { checkmemories } from "./game/memory.js";
import { openpipe } from "./game/pipe.js";
import {
  checkpipedsmalltrophies,
  countsmalltrophies,
} from "./game/smalltrophy.js";
import { checkworlds, shrinkworld } from "./game/world.js";
import { configtweet, tweetLink } from "./game/tweet.js";
import { exportsave, exportsavefile, importsave, save } from "./game/file.js";
import {
  configpchallenge,
  countpchallengecleared,
  exitpChallenge,
  getpchallengeid,
  startpChallenge,
} from "./game/pchallenge.js";
import {
  calcchallengeid,
  configchallenge,
  exitChallenge,
  getchallengeid,
  showunclearedchallenges,
} from "./game/challenge.js";
import { buyrankRewards, calctoken } from "./game/rankToken.js";
import {
  buyAccelerator,
  calcaccost,
  updateAccelerators,
  worktime,
} from "./game/accelerator.js";
import {
  buyDarkGenerator,
  calcdgcost,
  updateDarkGenerators,
} from "./game/darkGenerator.js";
import {
  buyLightGenerator,
  updatelightgenerators,
} from "./game/lightGenerator.js";
import { calcGainLevel } from "./game/level.js";
import { calcgaincrown, resetCrown, resetCrownborder } from "./game/crown.js";
import { calcGainRank, resetRank, resetRankborder } from "./game/rank.js";
import {
  calcgainchip,
  changechiptype,
  checkusedchips,
  chipset,
  clearsetchip,
  setchiptype,
} from "./game/chip.js";
import {
  checktrophies,
  confchecktrophies,
  counttrophies,
  gettrophyname,
} from "./game/trophy.js";
import { buyRewards } from "./game/token.js";
import { calclevelitemcost } from "./game/levelitem.js";
import { configautobuyer, toggleautobuyer } from "./game/autoBuyer.js";
import { changebonusetype, setbonusetype } from "./game/bonus.js";
import { changerankbonusetype, setrankbonusetype } from "./game/rankBonus.js";
import { spendbrightness } from "./game/brightness.js";
import { spendshine } from "./game/shine.js";
import { spendflicker } from "./game/flicker.js";
import { changeMode, changeModeType, setModeType } from "./game/mode.js";
import { dataload, load } from "./game/load.js";
import { update } from "./game/update.js";
import { checkremembers } from "./game/remember.js";
import { buytype } from "./buyType.js";
import { calcstatuecost } from "./game/statue.js";

Vue.createApp({
  data() {
    return initialData;
  },
  computed: {
    tweetLink() {
      return tweetLink(this);
    },
  },
  methods: {
    exportsave() {
      return exportsave(this);
    },
    exportsavefile() {
      return exportsavefile(this);
    },
    importsave() {
      return importsave(this);
    },
    save() {
      return save(this);
    },
    dataload() {
      dataload(this);
    },
    load(world) {
      load(this, world);
    },
    configshowmult() {
      this.showmult = !this.showmult;
    },
    calcgncost() {
      calcgncost(this);
    },

    calcaccost() {
      calcaccost(this);
    },
    calcdgcost() {
      calcdgcost(this);
    },

    calccommonmult() {
      updateCommonMult(this);
    },

    calcincrementmult(i, to) {
      return calcincrementmult(this, i, to);
    },
    calcbasicincrementmult(i) {
      return calcbasicincrementmult(this, i);
    },

    updategenerators(mu) {
      return updateGenerators(this, mu);
    },

    updateaccelerators(mu) {
      return updateAccelerators(this, mu);
    },

    updatedarkgenerators(mu) {
      return updateDarkGenerators(this, mu);
    },
    updatelightgenerators(mu) {
      return updatelightgenerators(this, mu);
    },

    spendshine(num) {
      return spendshine(this, num);
    },
    spendbrightness(num) {
      return spendbrightness(this, num);
    },
    spendflicker(num) {
      return spendflicker(this, num);
    },
    buytype(num) {
      return buytype(this, num);
    },
    calctoken() {
      return calctoken(this);
    },
    countpchallengecleared() {
      return countpchallengecleared(this);
    },
    findhighestgenerator() {
      return findhighestgenerator(this);
    },
    update() {
      return update(this);
    },
    changeTab(tabname) {
      this.player.currenttab = tabname;
    },
    configtweet(content) {
      return configtweet(this, content);
    },
    configchallenge(index) {
      return configchallenge(this, index);
    },
    configpchallenge(index) {
      return configpchallenge(this, index);
    },
    buyGenerator(index) {
      return buyGenerator(this, index);
    },
    buyAccelerator(index) {
      return buyAccelerator(this, index);
    },
    buydarkgenerator(index) {
      return buyDarkGenerator(this, index);
    },
    buylightgenerator(index) {
      return buyLightGenerator(this, index);
    },
    configautobuyer(index) {
      return configautobuyer(this, index);
    },
    toggleautobuyer(index) {
      return toggleautobuyer(this, index);
    },
    setbonusetype(index) {
      return setbonusetype(this, index);
    },
    setrankbonusetype(index) {
      return setrankbonusetype(this, index);
    },
    changebonusetype(index) {
      return changebonusetype(this, index);
    },
    changerankbonusetype(index) {
      return changerankbonusetype(this, index);
    },
    buyRewards(index) {
      return buyRewards(this, index);
    },
    buyrankRewards(index) {
      return buyrankRewards(this, index);
    },
    calclevelitemcost(index) {
      return calclevelitemcost(this, index);
    },
    buylevelitems(index) {
      return buylevelitems(this, index);
    },
    setmodetype() {
      return setModeType(this);
    },
    changemodetype() {
      return changeModeType(this);
    },
    clearsetchip() {
      return clearsetchip(this);
    },
    setchiptype() {
      return setchiptype(this);
    },
    changechiptype() {
      return changechiptype(this);
    },
    changeMode(index) {
      return changeMode(this, index);
    },
    resetData(force) {
      return resetData(this, force);
    },
    calcgainlevel() {
      return calcGainLevel(this);
    },
    calcgainchip() {
      return calcgainchip(this);
    },
    resetDarklevel() {
      return resetDarklevel(this);
    },
    resetLevel(force, exit) {
      return resetLevel(this, force, exit);
    },
    calcgainrank() {
      return calcGainRank(this);
    },
    resetRankborder() {
      return resetRankborder(this);
    },
    resetRank(force) {
      return resetRank(this, force);
    },
    calcgaincrown() {
      return calcgaincrown(this);
    },
    resetCrownborder() {
      return resetCrownborder(this);
    },
    resetCrown(force) {
      return resetCrown(this, force);
    },
    calcchallengeid() {
      return calcchallengeid(this);
    },
    getchallengeid(arr) {
      return getchallengeid(arr);
    },
    getpchallengeid(arr) {
      return getpchallengeid(arr);
    },
    showunclearedchallenges() {
      return showunclearedchallenges(this);
    },
    startChallenge() {
      return startChallenge(this);
    },
    startpChallenge() {
      return startpChallenge(this);
    },
    exitChallenge() {
      return exitChallenge(this);
    },
    exitpChallenge() {
      return exitpChallenge(this);
    },
    gettrophyname(i) {
      return gettrophyname(this, i);
    },
    moveworld() {
      return moveworld(this, i);
    },
    shrinkworld(i) {
      return shrinkworld(this, i);
    },
    calcmaxpipe() {
      return calcmaxpipe(this);
    },
    openpipe(i) {
      return openpipe(this, i);
    },
    confchecktrophies() {
      return confchecktrophies(this);
    },
    checktrophies() {
      return checktrophies(this);
    },
    chipset(i, j) {
      return chipset(this, i, j);
    },
    checkusedchips() {
      return checkusedchips(this);
    },
    calcstatuecost(i) {
      return calcstatuecost(this, i);
    },
    buildstatue(i) {
      return buildstatue(this, i);
    },
    worktime(val) {
      return worktime(this, val);
    },
    counttrophies(index) {
      return counttrophies(this, index);
    },
    checkpipedsmalltrophies() {
      return checkpipedsmalltrophies(this);
    },
    countsmalltrophies(index) {
      return countsmalltrophies(this, index);
    },
    checkmemories() {
      return checkmemories(this);
    },
    checkremembers() {
      return checkremembers(this);
    },
    checkworlds() {
      return checkworlds(this);
    },

    toFormated(dec, exp) {
      if (dec.lessThanOrEqualTo(new Decimal(10).pow(exp)))
        return dec.toNumber();
      else return dec.toExponential(3);
    },
  },

  mounted() {
    this.dataload();
    this.load(0);

    this.checkmemories();
    this.checkworlds();
    checkusedchips(this);

    this.time = Date.now();

    setTimeout(this.update, this.player.tickspeed);
    setInterval(this.save, 2000);
  },
}).mount("#app");
