const version = 2;

const initialData = () => {
  return {
    money: new Decimal(1),
    level: new Decimal(0),
    levelresettime: new Decimal(0),
    maxlevelgained: new Decimal(1),
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
        maxlevelgained: new Decimal(1),
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
      challengedata: new Challengedata(),
      exported: "",
      genautobuy:false,
      accautobuy:false,
      autolevel:false

    }
  },
  computed: {
    tweetLink() {
      let tweetText = "";
      if(this.player.tweeting.includes('money')){
        tweetText += 'ポイント:' + this.player.money +
        '(' + this.player.money.toExponential().replace('+', '%2B') + ')%0A';
      }
      if(this.player.tweeting.includes('level')){
        tweetText += '段位:' + this.player.level + '%0A';
      }
      if(this.player.tweeting.includes('achieved')){
        tweetText += '挑戦達成:' + this.player.challengecleared.length + '%0A';
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

      if(!(this.player.onchallenge && this.player.challenges.includes(2))){
        let mm = this.player.generatorsBought[i]
        if(this.player.challengebonuses.includes(11)){
          mm = mm.mul(new Decimal(mm.add(2).log2()).round())
        }
        if(i<highest && this.player.generatorsBought[i].greaterThan(0)){
          mult = mult.mul(mm)
        }else{
          if(this.player.challengebonuses.includes(2) && this.player.generatorsBought[i].greaterThan(0)){
            mult = mult.mul(mm)
          }
        }
      }

      if(this.player.challengebonuses.includes(3)){
        mult = mult.mul(new Decimal(2))
      }

      if(i==0&&this.player.challengebonuses.includes(7)){
        mult = mult.mul(this.player.maxlevelgained)
      }


      return mult;

    },
    update() {
      for (let i = 0; i < 8; i++) {
        if(!this.player.challengebonuses.includes(13)){
          let to = this.player.generatorsMode[i];
          let mult = this.calcincrementmult(i,to)
          if (to === 0) {
            this.player.money = this.player.money.add(this.player.generators[i].mul(mult))
          } else {
            this.player.generators[to - 1] = this.player.generators[to - 1].add(this.player.generators[i].mul(mult))
          }
        }else{
          if(this.player.onchallenge&&this.player.challenges.includes(3)){
            let mult = this.calcincrementmult(i,0)
            mult = mult.mul(i+1)
            this.player.money = this.player.money.add(this.player.generators[i].mul(mult))
          }else{
            for(let to = 0; to <= i; to++){
            let mult = this.calcincrementmult(i,to)
              if (to === 0) {
                this.player.money = this.player.money.add(this.player.generators[i].mul(mult))
              } else {
                this.player.generators[to - 1] = this.player.generators[to - 1].add(this.player.generators[i].mul(mult))
              }
            }
          }
        }
      }
      let amult = new Decimal(1)
      if(this.player.challengebonuses.includes(6))amult = amult.mul(this.player.acceleratorsBought[0].max(1))

      for (let i = 1; i < 2; i++) {
        if(this.player.challengebonuses.includes(10)){
          this.player.accelerators[i - 1] = this.player.accelerators[i - 1].add(this.player.accelerators[i].mul(this.player.acceleratorsBought[i]))
        }else{
          this.player.accelerators[i - 1] = this.player.accelerators[i - 1].add(this.player.accelerators[i])
        }
      }
      if(!this.player.onchallenge && this.autolevel){
        if(this.player.money.greaterThanOrEqualTo('1e18')){
          this.resetLevel(true,false)
        }
      }
      if(this.player.challengebonuses.includes(9)&&this.accautobuy){
        for(let i=1;i>=0;i--){
          this.buyAccelerator(i)
        }
      }
      if(this.player.challengebonuses.includes(5)&&this.genautobuy){
        for(let i=7;i>=0;i--){
          this.buyGenerator(i)
        }
      }

      this.player.tickspeed = 1000 / this.player.accelerators[0].add(10).mul(amult).log10()

      setTimeout(this.update, this.player.tickspeed);
    },
    exportsave(){
      this.exported = btoa(JSON.stringify(this.player))
    },
    importsave(){
      let input = window.prompt("データを入力","")
      input = atob(input)
      localStorage.setItem("playerStored",input)
      this.load()
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
          maxlevelgained: new Decimal(saveData.maxlevelgained ?? 1),
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
    toggleautobuyer(index){
      if(index==0)this.genautobuy = !this.genautobuy
      if(index==1)this.accautobuy = !this.accautobuy
      if(index==2)this.autolevel = !this.autolevel
    },
    buyRewards(index){
      if(this.player.challengebonuses.includes(index)){
        if(this.player.challengebonuses.includes(4)){
          this.player.challengebonuses.splice(this.player.challengebonuses.indexOf(index),1)
          this.player.token += this.challengedata.rewardcost[index]
        }
      }else{
        if(this.player.token<this.challengedata.rewardcost[index]){
          return;
        }
        this.player.challengebonuses.push(index)
        this.player.token -= this.challengedata.rewardcost[index]
      }
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
    resetLevel(force,exit) {
      if(this.player.onchallenge && this.player.challenges.includes(0)){
        if(this.player.money.lt(new Decimal('1e24'))){
          alert('現在挑戦1が適用されているため、まだ昇段リセットができません。')
          return;
        }
      }
      let gainlevel = new Decimal(this.player.money.log10()).div(18).pow_base(2).round()
      if(this.player.challengebonuses.includes(12)) gainlevel = gainlevel.mul(new Decimal(2))
      if (force || confirm('昇段リセットして、段位' + gainlevel + 'を得ますか？')) {
        if(this.player.onchallenge) {
          this.player.token = this.player.token + 1
          this.player.challengecleared.push(this.calcchallengeid())
        }
        let nextlevel = this.player.level.add(exit?new Decimal(0):gainlevel)
        let nextlevelresettime = this.player.levelresettime.add(new Decimal(exit?0:this.player.challengebonuses.includes(8)?2:1))
        let nextmaxlevelgained = this.player.maxlevelgained.max(exit?new Decimal(0):gainlevel)
        let tkn = this.player.token
        let cls = this.player.challenges
        let clcleared = this.player.challengecleared
        let clbonuses = this.player.challengebonuses
        this.resetData(true);
        this.player.level = nextlevel
        this.player.levelresettime = nextlevelresettime
        this.player.maxlevelgained = nextmaxlevelgained
        this.player.token = tkn
        this.player.challenges = cls
        this.player.challengecleared = clcleared
        this.player.challengebonuses = clbonuses

        if(this.player.challengebonuses.includes(0))this.player.money = new Decimal(10001)
        if(this.player.challengebonuses.includes(1))this.player.accelerators[0] = new Decimal(10)

      }
    },
    calcchallengeid(){
      let challengeid = 0;
      for(let i=0;i<8;i++){
        challengeid *= 2
        if(this.player.challenges.includes(i)){
          challengeid += 1
        }
      }
      return challengeid;
    },
    showunclearedchallenges(){
      if(this.player.challengecleared.length == 255) return;
      if(this.player.onchallenge) return;
      let challengeid = this.calcchallengeid();

      do{
        if(challengeid == 0) {
          challengeid = 128
        }else {
          let idx = this.challengedata.challengeids.indexOf(challengeid) + 1
          if(idx==255) idx = 0
          challengeid = this.challengedata.challengeids[idx]
        }
      }while(this.player.challengecleared.includes(challengeid));

      let cls = [];
      for(let i=7;i>=0;i--){
        if(challengeid%2 == 1)cls.push(i)
        challengeid = challengeid >>> 1

      }
      this.player.challenges = cls;
    },
    startChallenge(){
      let challengeid = this.calcchallengeid();

      if(challengeid == 0){
        alert("挑戦が一つも選択されていません。")
        return;
      }
      if(this.player.challengecleared.includes(challengeid)){
        alert("すでに達成した挑戦です。")
        return;
      }

      if (confirm('挑戦を開始しますか？現在のポイントや発生器、時間加速器は失われます。')) {
        this.resetLevel(true,true);
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
    maxlevelgained: new Decimal(saveData.maxlevelgained ?? 0),
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
