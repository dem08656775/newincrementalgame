const version = 2;

const initialData = () => {
  return {
    money: new Decimal(1),
    level: new Decimal(0),
    levelresettime: new Decimal(0),
    token: 0,

    generators: new Array(8).fill(null).map(() => new Decimal(0)),
    generatorsBought: new Array(8).fill(null).map(() => new Decimal(0)),
    generatorsCost: [
      new Decimal(1),
      new Decimal('1e4'),
      new Decimal('1e9'),
      new Decimal('1e16'),
      new Decimal('1e25'),
      new Decimal('1e36'),
      new Decimal('1e49'),
      new Decimal('1e64')
    ],
    generatorsMode: new Array(8).fill(null).map((_, i) => i),

    accelerators: [new Decimal(0), new Decimal(0)],
    acceleratorsBought: [new Decimal(0), new Decimal(0)],
    acceleratorsCost: [new Decimal(10), new Decimal('1e10')],

    tickspeed: 1000,
    saveversion: version,

    currenttab: 'basic',
    tweeting:['money'],
    onchallenge:false,
    challenges:[],
    challengecleared:[],
    challengebonuses:[]
  }
}

Vue.createApp({
  data() {
    return {
      player: {
        money: new Decimal(1),
        level: new Decimal(0),
        levelresettime: new Decimal(0),
        token:0,

        generators: new Array(8).fill(null).map(() => new Decimal(0)),
        generatorsBought: new Array(8).fill(null).map(() => new Decimal(0)),
        generatorsCost: [
          new Decimal(1),
          new Decimal('1e4'),
          new Decimal('1e9'),
          new Decimal('1e16'),
          new Decimal('1e25'),
          new Decimal('1e36'),
          new Decimal('1e49'),
          new Decimal('1e64')
        ],
        generatorsMode: new Array(8).fill(null).map((_, i) => i),

        accelerators: [new Decimal(0), new Decimal(0)],
        acceleratorsBought: [new Decimal(0), new Decimal(0)],
        acceleratorsCost: [new Decimal(10), new Decimal('1e10')],

        tickspeed: 1000,
        saveversion: version,

        currenttab: 'basic',

        tweeting:['money'],

        onchallenge: false,
        challenges: [],
        challengecleared: [],
        challengebonuses:[]
      },
      challengedata: new Challengedata()
    }
  },
  computed: {
    tweetLink() {
      let tweetText = "";
      if(this.player.tweeting.includes('money')){
        tweetText += 'ポイント: ' + this.player.money +
        '(' + this.player.money.toExponential().replace('+', '%2B') + ')%0A';
      }
      if(this.player.tweeting.includes('level')){
        tweetText += '段位: ' + this.player.level + '%0A';
      }
      if(this.player.tweeting.includes('achieved')){
        tweetText += '挑戦達成: ' + this.player.challengecleared.length + '%0A';
      }
      let tweetUrl = 'dem08656775.github.io/newincrementalgame';
      let tweetHashtag = '新しい放置ゲーム';

      let attribute = 'https://twitter.com/intent/tweet?'
        + 'text=' + tweetText
        + '&url=' + tweetUrl
        + '&hashtags=' + tweetHashtag

      return attribute
    }
  },
  methods: {
    softCap(num,cap){
      if(num.lessThanOrEqualTo(cap)) return num;
      let capped = num.div(cap)
      capped = new Decimal(capped.log2()).add(1)
      return cap.mul(capped)
    },

    calcincrementmult(i,to){
      let mult = new Decimal(1);
      if(!(this.player.onchallenge && this.player.challenges.includes(4))){
        mult = mult.mul(new Decimal(10).pow((i + 1) * (i - to)))
      }
      if(!(this.player.onchallenge && this.player.challenges.includes(7))){
        mult = mult.mul(this.softCap(this.player.levelresettime.add(1),new Decimal(100)))
      }
      mult = mult.mul(new Decimal(this.player.level.add(2).log2()).pow(i - to))
      let highest = 0;
      for(let j=0;j<8;j++){
        if(this.player.generators[j].greaterThan(0)){
          highest = j;
        }
      }
      i<highest && this.player.generatorsBought[i].greaterThan(0)

      if(!(this.player.onchallenge && this.player.challenges.includes(2))){
        if(i<highest && this.player.generatorsBought[i].greaterThan(0)){
          mult = mult.mul(this.player.generatorsBought[i])
        }else if(!this.player.onchallenge){
          if(this.player.challengebonuses.includes(2)){
            mult = mult.mul(this.player.generatorsBought[i])
          }
        }
      }

      if(!this.player.onchallenge){
        if(this.player.challengebonuses.includes(3)){
          mult = mult.mul(new Decimal(2))
        }
      }

      return mult;

    },
    update() {
      for (let i = 0; i < 8; i++) {
        let to = this.player.generatorsMode[i];
        let mult = this.calcincrementmult(i,to)
        if (to === 0) {
          this.player.money = this.player.money.add(this.player.generators[i].mul(mult))
        } else {
          this.player.generators[to - 1] = this.player.generators[to - 1].add(this.player.generators[i].mul(mult))
        }
      }
      this.player.tickspeed = 1000 / this.player.accelerators[0].add(10).log10()
      for (let i = 1; i < 2; i++) {
        this.player.accelerators[i - 1] = this.player.accelerators[i - 1].add(this.player.accelerators[i])
      }
      setTimeout(this.update, this.player.tickspeed);
    },
    save() {
      console.log(JSON.stringify(this.player))
      localStorage.setItem("playerStored", JSON.stringify(this.player));
    },
    load() {
      if (!localStorage.getItem("playerStored")) return
      let saveData = JSON.parse(localStorage.getItem("playerStored"));
      this.player = parseInt(saveData.saveversion) === version ?
        {
          money: new Decimal(saveData.money),
          level: new Decimal(saveData.level),
          levelresettime: new Decimal(saveData.levelresettime),
          token: saveData.token ?? 0,

          generators: saveData.generators.map(v => new Decimal(v)),
          generatorsBought: saveData.generatorsBought.map(v => new Decimal(v)),
          generatorsCost: saveData.generatorsCost.map(v => new Decimal(v)),
          generatorsMode: saveData.generatorsMode.map(v => parseInt(v)),

          accelerators: saveData.accelerators.map(v => new Decimal(v)),
          acceleratorsBought: saveData.acceleratorsBought.map(v => new Decimal(v)),
          acceleratorsCost: saveData.acceleratorsCost.map(v => new Decimal(v)),

          tickspeed: parseFloat(saveData.tickspeed),
          saveversion: parseInt(saveData.saveversion),

          currenttab: saveData.currenttab ?? 'basic',

          tweeting: saveData.tweeting ?? ['money'],

          onchallenge: saveData.onchallenge ?? false,
          challenges: saveData.challenges ?? [],
          challengecleared: saveData.challengecleared ?? [],
          challengebonuses: saveData.challengebonuses ?? [],
        } :
        readOldFormat(saveData);
    },
    changeTab(tabname){
      this.player.currenttab = tabname;
    },
    configtweet(content){
      if(!this.player.tweeting.includes(content)){
        this.player.tweeting.push(content)
      }else{
        this.player.tweeting.splice(this.player.tweeting.indexOf(content),1)
      }
    },
    configchallenge(index){
      if(this.player.onchallenge) return;
      if(!this.player.challenges.includes(index)){
        this.player.challenges.push(index)
      }else{
        this.player.challenges.splice(this.player.challenges.indexOf(index),1)
      }
    },
    buyGenerator(index) {
      if(this.player.onchallenge && this.player.challenges.includes(6)){
        if(index>2){
          return;
        }
      }
      if (this.player.money.greaterThanOrEqualTo(this.player.generatorsCost[index])) {
        this.player.money = this.player.money.sub(this.player.generatorsCost[index])
        this.player.generators[index] = this.player.generators[index].add(1)
        this.player.generatorsBought[index] = this.player.generatorsBought[index].add(1)
        this.player.generatorsCost[index] = index === 0 ?
          new Decimal(10).pow(this.player.generatorsBought[0]) :
          new Decimal(10).pow(this.player.generatorsBought[index].add(index + 1).mul(index + 1))
        if(this.player.onchallenge && this.player.challenges.includes(1)){
          this.player.generatorsCost[index] = this.player.generatorsCost[index].pow(2)
        }
      }
    },
    buyAccelerator(index) {
      if(this.player.onchallenge && this.player.challenges.includes(5)) return;
      if (this.player.money.greaterThanOrEqualTo(this.player.acceleratorsCost[index])) {
        this.player.money = this.player.money.sub(this.player.acceleratorsCost[index])
        this.player.accelerators[index] = this.player.accelerators[index].add(1)
        this.player.acceleratorsBought[index] = this.player.acceleratorsBought[index].add(1)
        this.player.acceleratorsCost[index] = index === 0 ?
          this.player.acceleratorsCost[0] = this.player.acceleratorsCost[0].mul(
            this.player.acceleratorsBought[0].add(1).pow_base(10)
          ) :
          new Decimal('1e10')
            .pow(
              this.player.acceleratorsBought[index]
                .add(1)
                .mul(this.player.acceleratorsBought[index].add(index + 1)).div(index + 1)
            )
      }
    },
    buyRewards(index){
      if(index>3||this.player.challengebonuses.includes(index)||this.player.token<this.challengedata.rewardcost[index]){
        return;
      }
      this.player.challengebonuses.push(index)
      this.player.token -= this.challengedata.rewardcost[index]
    },
    changeMode(index) {
      if(this.player.onchallenge && this.player.challenges.includes(3)) return;
      this.player.generatorsMode[index] += 1;
      if (this.player.generatorsMode[index] > index) {
        this.player.generatorsMode[index] = 0;
      }
    },
    resetData(force) {
      if (force || confirm('これはソフトリセットではありません。\nすべてが無になり何も得られませんが、本当によろしいですか？')) {
        this.player = initialData()
      }
    },
    resetLevel(force) {
      if(this.player.onchallenge && this.player.challenges.includes(0)){
        if(this.player.money.lt(new Decimal('1e24'))){
          alert('現在挑戦1が適用されているため、まだ昇段リセットができません。')
          return;
        }
      }
      let gainlevel = new Decimal(this.player.money.log10()).div(18).pow_base(2).round()
      if (force || confirm('昇段リセットして、段位' + gainlevel + 'を得ますか？')) {
        if(this.player.onchallenge) {
          this.player.token = this.player.token + 1
          let challengeid = 0;
          for(let i=0;i<8;i++){
            challengeid *= 2
            if(this.player.challenges.includes(i)){
              challengeid += 1
            }
          }
          this.player.challengecleared.push(challengeid)
        }
        let nextlevel = this.player.level.add(force?new Decimal(0):gainlevel)
        let nextlevelresettime = this.player.levelresettime.add(force?new Decimal(0):new Decimal(1))
        let tkn = this.player.token
        let cls = this.player.challenges
        let clcleared = this.player.challengecleared
        let clbonuses = this.player.challengebonuses
        this.resetData(true);
        this.player.level = nextlevel
        this.player.levelresettime = nextlevelresettime
        this.player.token = tkn
        this.player.challenges = cls
        this.player.challengecleared = clcleared
        this.player.challengebonuses = clbonuses
        if(!force){
          if(this.player.challengebonuses.includes(0))this.player.money = new Decimal(10001)
          if(this.player.challengebonuses.includes(1))this.player.accelerators[0] = new Decimal(10)
        }
      }
    },
    startChallenge(){
      let challengeid = 0;
      for(let i=0;i<8;i++){
        challengeid *= 2
        if(this.player.challenges.includes(i)){
          challengeid += 1
        }

      }
      if(challengeid == 0){
        alert("挑戦が一つも選択されていません。")
        return;
      }
      if(this.player.challengecleared.includes(challengeid)){
        alert("すでに達成した挑戦です。")
        return;
      }

      if (confirm('挑戦を開始しますか？現在のポイントや発生器、時間加速器は失われます。')) {
        this.resetLevel(true);
        this.player.onchallenge = true;
        if(this.player.challenges.includes(3)){
          for(let i=0;i<8;i++){
            this.player.generatorsMode[i] = 0

          }
        }
      }
    },
    exitChallenge(){
      if (confirm('挑戦を諦めますか？現在のポイントや発生器、時間加速器を引き継いだまま、通常の状態に入ります。')) {
        this.player.onchallenge = false;
        if(this.player.challenges.includes(1)){
          for(let i=0;i<8;i++){
            this.player.generatorsCost[i] = i === 0 ?
            new Decimal(10).pow(this.player.generatorsBought[0]) :
            new Decimal(10).pow(this.player.generatorsBought[i].add(i + 1).mul(i + 1))
          }
        }
      }
    }
  },
  mounted() {
    this.load();

    setTimeout(this.update, this.player.tickspeed);
    setInterval(this.save, 2000);
  },
}).mount('#app');

function readOldFormat(saveData) {
  return {
    money: new Decimal(saveData.money),
    level: new Decimal(saveData.level),
    levelresettime: new Decimal(saveData.levelresettime),
    token: saveData.token ?? 0,

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
      new Decimal(saveData.generator1cost ?? '1'),
      new Decimal(saveData.generator2cost ?? '1e4'),
      new Decimal(saveData.generator3cost ?? '1e9'),
      new Decimal(saveData.generator4cost ?? '1e16'),
      new Decimal(saveData.generator5cost ?? '1e25'),
      new Decimal(saveData.generator6cost ?? '1e36'),
      new Decimal(saveData.generator7cost ?? '1e49'),
      new Decimal(saveData.generator8cost ?? '1e64'),
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
      new Decimal(saveData.accelerator2cost ?? '1e10'),
    ],
    tickspeed: parseFloat(saveData.tickspeed ?? 1000),
    saveversion: version,

    currenttab:(saveData.currenttab ?? 'basic'),

    tweeting:(saveData.tweeting ?? ['money']),

    onchallenge: saveData.onchallenge ?? false,
    challenges: saveData.challenges ?? [],
    challengecleared: saveData.challengecleared ?? [],
    challengebonuses: saveData.challengebonuses ?? []
  }
}
