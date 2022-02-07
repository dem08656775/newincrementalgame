const version = 2;
const setchipnum = 100;

const initialData = () => {
  return {
    money: new Decimal(1),
    level: new Decimal(0),
    levelresettime: new Decimal(0),
    maxlevelgained: new Decimal(1),
    token: 0,
    shine: 0,
    brightness: 0,

    rank:new Decimal(0),
    rankresettime: new Decimal(0),

    ranktoken:0,

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

    accelerators: new Array(8).fill(null).map(() => new Decimal(0)),
    acceleratorsBought: new Array(8).fill(null).map(() => new Decimal(0)),
    acceleratorsCost: [
      new Decimal(10),
      new Decimal('1e10'),
      new Decimal('1e20'),
      new Decimal('1e40'),
      new Decimal('1e80'),
      new Decimal('1e160'),
      new Decimal('1e320'),
      new Decimal('1e640'),
    ],

    darkmoney:new Decimal(0),

    darkgenerators: new Array(8).fill(null).map(() => new Decimal(0)),
    darkgeneratorsBought: new Array(8).fill(null).map(() => new Decimal(0)),
    darkgeneratorsCost: [
      new Decimal('1e100'),
      new Decimal('1e108'),
      new Decimal('1e127'),
      new Decimal('1e164'),
      new Decimal('1e225'),
      new Decimal('1e316'),
      new Decimal('1e423'),
      new Decimal('1e612')
    ],

    darklevel:new Decimal(0),

    tickspeed: 1000,
    saveversion: version,

    currenttab: 'basic',
    tweeting:['money'],
    onchallenge:false,
    challenges:[],
    challengecleared:[],
    challengebonuses:[],

    boughttype:[false,false,false],
    setmodes: new Array(8).fill(null).map((_, i) => i),
    setchallengebonusesfst:[],
    setchallengebonusessnd:[],

    rankchallengecleared:[],
    rankchallengebonuses:[],

    trophies: new Array(8).fill(null).map(() => false),
    smalltrophies: new Array(100).fill(null).map(() => false),

    levelitems:[0,0,0,0,0],
    levelitembought: 0,

    remember: 0,
    rememberspent: 0,

    chip:[0,0,0,0],
    setchip: new Array(100).fill(setchipnum).map(() => 0),

  }
}

Vue.createApp({
  data() {
    return {
      player: initialData(),

      players: new Array(10).fill(null).map(() => initialData()),

      highest:0,
      commonmult: new Decimal(0),
      incrementalmults: new Array(8).fill(null).map(() => new Decimal(1)),
      showmult:true,
      trophycheck:true,

      challengedata: new Challengedata(),
      levelshopdata: new Levelshopdata(),
      shinedata: new Shinedata(),
      trophydata: new Trophydata(),
      rememberdata: new Rememberdata(),
      chipdata: new Chipdata(),
      exported: "",
      activechallengebonuses:[],
      genautobuy:false,
      accautobuy:false,
      autolevel:false,
      autolevelnumber:new Decimal(2),
      autoranknumber:new Decimal(4),
      autolevelstopnumber: new Decimal("1e100"),
      litemautobuy:false,
      autorank:false,

      multbyac:new Decimal(1),

      shinepersent:0,
      brightpersent:0,
      memory:0,
      trophynumber: new Array(10).fill(null).map(() => false),
      smalltrophy:0,
      worldopened:new Array(10).fill(null).map(() => false),

      chipused:[0,0,0,0],

      world:0,

      time:0,
      diff:0,


    }
  },
  computed: {
    tweetLink() {
      let tweetText = "";
      if(this.player.tweeting.includes('world')){
        tweetText += '在住世界:' + (this.world+1) + '%0A';
      }
      if(this.player.tweeting.includes('memory')){
        tweetText += '記憶:' + this.memory + '%0A';
      }
      if(this.player.tweeting.includes('remember')){
        tweetText += '思い出:' + this.checkremembers() + '%0A';
      }
      if(this.player.tweeting.includes('money')){
        tweetText += 'ポイント:' + this.player.money +
        '(' + this.player.money.toExponential().replace('+', '%2B') + ')%0A';
      }
      if(this.player.tweeting.includes('darkmoney')){
        tweetText += '裏ポイント:' + this.player.darkmoney +
        '(' + this.player.darkmoney.toExponential().replace('+', '%2B') + ')%0A';
      }

      if(this.player.tweeting.includes('level')){
        tweetText += '段位:' + this.player.level + '%0A';
      }
      if(this.player.tweeting.includes('achieved')){
        tweetText += '挑戦達成:' + this.player.challengecleared.length + '%0A';
      }
      if(this.player.tweeting.includes('rankachieved')){
        tweetText += '上位挑戦達成:' + this.player.rankchallengecleared.length + '%0A';
      }
      if(this.player.tweeting.includes('rank')){
        tweetText += '階位:' + this.player.rank + '%0A';
      }
      if(this.player.tweeting.includes('levelitemboughttime')){
        tweetText += '段位効力購入:' + this.player.levelitembought+ '%0A';
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

    configshowmult(){
      this.showmult = !this.showmult
    },
    softCap(num,cap){
      if(num.lessThanOrEqualTo(cap)) return num;
      let capped = num.div(cap)
      capped = new Decimal(capped.log2()).add(1)
      return cap.mul(capped).min(num)
    },
    strongsoftcap(num,cap){
      if(num.lessThanOrEqualTo(cap)) return num;
      let capped = num.div(cap)
      capped = new Decimal(capped.log2()).add(1)
      capped = new Decimal(capped.log2()).add(1)
      return cap.mul(capped).min(num)
    },

    calcaccost(){
      for(let i=0;i<8;i++){
        let p = this.player.acceleratorsBought[i].add(1)
        p = p.mul(p.add(1)).div(2)
        p = p.mul(i === 0 ? 1:new Decimal(10).mul(new Decimal(2).pow(i-1)))
        this.player.acceleratorsCost[i] = p.pow_base(10)
      }
    },
    calcdgcost(){
      for(let i=0;i<8;i++){
        let p = 100 + (i==0?0:(i+1)*(i+1)*(i+1))
        let q = this.player.darkgeneratorsBought[i].mul(i+1).mul(i+1)
        q = q.add(p)
        this.player.darkgeneratorsCost[i] = new Decimal(10).pow(q)
      }
    },

    calccommonmult(){
      let mult = new Decimal(1);
      if(!(this.player.onchallenge && this.player.challenges.includes(7))){
        let cap = new Decimal(100).mul(this.player.levelitems[2]*(1+this.player.setchip[28]*0.3)+1)
        mult = mult.mul(this.softCap(this.player.levelresettime.add(1),cap))
      }

      if(this.activechallengebonuses.includes(3)){
        mult = mult.mul(new Decimal(2))
      }

      if(this.player.rankchallengebonuses.includes(3)){
        mult = mult.mul(new Decimal(3))
      }

      mult = mult.mul(1+this.smalltrophy*0.01+this.memory*0.25)

      if(this.player.rankchallengebonuses.includes(11)){
        mult = mult.mul(new Decimal(2).pow(new Decimal(this.memory).div(12)))
      }

      if(this.player.onchallenge && this.player.rankchallengebonuses.includes(4)){
        mult = mult.mul(1+this.player.challenges.length*0.25)
      }

      if(this.player.darkmoney.greaterThanOrEqualTo(1)){
        mult = mult.mul(new Decimal(this.player.darkmoney.add(10).log10()).pow(1+this.player.setchip[40]*0.1))
      }

      mult = mult.mul(this.multbyac)
      if(this.multbyac.gt(1)) mult = mult.mul(this.multbyac)

      mult = mult.mul(1+this.player.setchip[0]*0.05)

      let d = new Date()
      if(d.getMonth()==0&&d.getDate()<=7)mult = mult.mul(5)//新年キャンペーン
      if(d.getMonth()==1&&8<=d.getDate()&&d.getDate()<=14)mult = mult.mul(5)//バレンタインキャンペーン

      this.commonmult = mult
    },

    calcincrementmult(i,to){
      let mult = this.incrementalmults[i]
      if(!(this.player.onchallenge && this.player.challenges.includes(4))){
        mult = mult.mul(new Decimal(10).pow((i + 1) * (i - to)))
      }

      let lv = this.player.level.pow(1+0.5*this.player.setchip[19])

      mult = mult.mul(new Decimal(lv.add(2).log2()).pow(i - to))

      return mult
    },

    calcbasicincrementmult(i){
      let mult = new Decimal(this.commonmult);

      if(!(this.player.onchallenge && this.player.challenges.includes(2))){
        let mm = new Decimal(1)
        mm = mm.mul(this.player.generatorsBought[i])
        if(this.activechallengebonuses.includes(11)){
          mm = mm.mul(new Decimal(mm.add(2).log2()))
        }

        if(i<this.highest && mm.greaterThanOrEqualTo(1)){
          mult = mult.mul(mm)
        }else{
          if(this.activechallengebonuses.includes(2) && mm.greaterThanOrEqualTo(1)){
            mult = mult.mul(mm)
          }
        }
      }

      if(i==0&&this.activechallengebonuses.includes(7)){
        if(this.player.rankchallengebonuses.includes(7)){
          mult = mult.mul(this.strongsoftcap(this.player.maxlevelgained,new Decimal(100000)))
        }else {
          mult = mult.mul(this.player.maxlevelgained.min(100000))
        }
      }

      if(this.player.darkgenerators[i].greaterThanOrEqualTo(1)){
        mult = mult.mul(new Decimal(i+2+this.player.darkgenerators[i].log10()).pow(1+this.player.setchip[i+32]*0.25))
      }

      this.incrementalmults[i] = mult

      mult = mult.mul(1+this.player.setchip[i+1]*0.2)

    },


    updategenerators(mu){
      for (let i = 0; i < 8; i++) {
        if(!this.activechallengebonuses.includes(13)){
          let to = this.player.generatorsMode[i];
          let mult = mu.mul(this.calcincrementmult(i,to))
          if (to === 0) {
            this.player.money = this.player.money.add(this.player.generators[i].mul(mult))
          } else {
            this.player.generators[to - 1] = this.player.generators[to - 1].add(this.player.generators[i].mul(mult))
          }
        }else{
          if(this.player.onchallenge&&this.player.challenges.includes(3)){
            let mult = mu.mul(this.calcincrementmult(i,0))
            mult = mult.mul(i+1)
            this.player.money = this.player.money.add(this.player.generators[i].mul(mult))
          }else{
            for(let to = 0; to <= i; to++){
            let mult = mu.mul(this.calcincrementmult(i,to))
              if (to === 0) {
                this.player.money = this.player.money.add(this.player.generators[i].mul(mult))
              } else {
                this.player.generators[to - 1] = this.player.generators[to - 1].add(this.player.generators[i].mul(mult))
              }
            }
          }
        }
      }
    },



    updateaccelerators(mu){
      for (let i = 1; i < 8; i++) {
        let mult = new Decimal(1)
        if(i==1&&this.activechallengebonuses.includes(10)){
          mult = this.player.rankchallengebonuses.includes(10)?mult.add(this.player.acceleratorsBought[i].pow_base(2)):mult.add(this.player.acceleratorsBought[i])
        }else if(i!=1&&this.player.rankchallengebonuses.includes(6)){
          mult = this.player.rankchallengebonuses.includes(10)?mult.add(this.player.acceleratorsBought[i].pow_base(2)):mult.add(this.player.acceleratorsBought[i])
        }
        mult = mult.mul(new Decimal(1.5).pow(this.player.setchip[i+10]))
        this.player.accelerators[i - 1] = this.player.accelerators[i - 1].add(this.player.accelerators[i].mul(mult).mul(mu))

      }
    },

    updatedarkgenerators(mu){
      let darkmult = this.player.darklevel.add(1)
      darkmult = this.softCap(darkmult,new Decimal(1e10))
      this.player.darkmoney = this.player.darkmoney.add(this.player.darkgenerators[0].mul(mu).mul(darkmult).mul(1+this.player.setchip[41]*0.25))
      for (let i = 1; i < 8; i++) {
        this.player.darkgenerators[i - 1] = this.player.darkgenerators[i - 1].add(this.player.darkgenerators[i].mul(mu).mul(darkmult).mul(1+this.player.setchip[41+i]*0.25))
      }
    },

    spendshine(num){
      if(this.player.shine<num)return;
      this.player.shine -= num
      let val = new Decimal(11).pow(new Decimal(num).log10())
      this.updategenerators(new Decimal(val))
      this.updateaccelerators(new Decimal(val))
    },
    spendbrightness(num){
      if(this.player.brightness<num)return;
      this.player.brightness -= num
      let val = new Decimal(11).pow(new Decimal(num*100).log10())
      this.updategenerators(new Decimal(val))
      this.updateaccelerators(new Decimal(val))
      this.updatedarkgenerators(new Decimal(num))
    },

    buytype(num){
      if(this.player.shine<this.shinedata.shineshopcost[num] || this.player.boughttype[num]) return;
      this.player.shine -= this.shinedata.shineshopcost[num]
      this.player.boughttype[num] = true
    },
    calctoken(){
      let spent = 0;
      for(let i of this.player.rankchallengebonuses){
        spent += this.challengedata.rewardcost[i]
      }
      this.player.ranktoken = this.player.rankchallengecleared.length - spent
    },
    findhighestgenerator(){
      this.highest = 0;
      for(let j=0;j<8;j++){
        if(this.player.generators[j].greaterThan(0)){
          this.highest = j;
        }
      }
    },
    update() {

      let diffm = this.diff
      this.diff = Date.now()-this.time-this.player.tickspeed

      this.time = Date.now()
      this.activechallengebonuses = (this.player.challengebonuses.includes(4) || !this.player.onchallenge)?this.player.challengebonuses:[]

      if(this.trophycheck)this.checktrophies()
      this.checkmemories()
      this.checkworlds()
      this.countsmalltrophies()
      this.calccommonmult()
      this.findhighestgenerator()
      for(let i=0;i<8;i++){
        this.calcbasicincrementmult(i)
      }

      this.updategenerators(new Decimal(1))
      this.updateaccelerators(new Decimal(1))

      this.calctoken()

      let amult = new Decimal(1)
      if(this.activechallengebonuses.includes(6)){
        if(this.player.rankchallengebonuses.includes(10)){
          amult = amult.mul(this.player.acceleratorsBought[0].pow_base(2))
        }else{
          amult = amult.mul(this.player.acceleratorsBought[0].add(1))
        }
      }

      this.shinepersent = this.shinedata.getp(this.player.challengecleared.length)
      this.shinepersent += 0.02 * this.player.setchip[30]

      if(this.player.shine<this.shinedata.getmaxshine(this.player.challengecleared.length) && Math.random()<this.shinepersent){
        this.player.shine += this.player.rankchallengebonuses.includes(2)?2:1
      }

      this.brightpersent = this.shinedata.getbp(this.player.rankchallengecleared.length)
      this.brightpersent += 0.001 * this.player.setchip[49]

      if(this.player.brightness<this.shinedata.getmaxbr(this.player.rankchallengecleared.length) && Math.random()<this.brightpersent){
        this.player.brightness += 1
      }

      let autorankshine = 1000 - this.checkremembers()*10

      if(!this.player.onchallenge && this.player.rankchallengebonuses.includes(14) && this.autorank){
        if(this.player.shine>=autorankshine && this.player.money.greaterThanOrEqualTo(this.resetRankborder())){
          if(this.calcgainrank().greaterThanOrEqualTo(this.autoranknumber)){
            this.resetRank(true)
            this.player.shine -= autorankshine
          }
        }
      }



      if(this.player.rankchallengebonuses.includes(5)&&this.litemautobuy){
        for(let i=0;i<5;i++){
          this.buylevelitems(i)
        }
      }


      if(!this.player.onchallenge && this.activechallengebonuses.includes(14) && this.autolevel){
        if(this.player.money.greaterThanOrEqualTo('1e18') && this.player.level.lt(this.autolevelstopnumber)){
          if(this.calcgainlevel().greaterThanOrEqualTo(this.autolevelnumber)){
              this.resetLevel(true,false)
          }
        }
      }

      if(this.activechallengebonuses.includes(5)&&this.genautobuy){
        for(let i=7;i>=0;i--){
          this.buyGenerator(i)
        }
      }

      if(this.activechallengebonuses.includes(9)&&this.accautobuy){
        let ha = this.player.levelitems[3] + 1
        for(let i=ha;i>=0;i--){
          this.buyAccelerator(i)
        }
      }

      let acnum = this.player.accelerators[0].mul(new Decimal(1.5).pow(this.player.setchip[10]))

      if(this.player.rankchallengebonuses.includes(13)){
        for(let i=1;i<8;i++){
          acnum = acnum.mul(this.player.accelerators[i].add(1))
        }
      }


      //this.player.tickspeed = 10
      this.player.tickspeed = (1000-this.player.setchip[9]*50-this.player.levelitems[1]*this.player.challengebonuses.length * (1+this.player.setchip[27]*0.5)) / acnum.add(10).mul(amult).log10()

      if(this.player.rankchallengebonuses.includes(9)){
        this.multbyac = new Decimal(50).div(this.player.tickspeed)
        this.player.tickspeed = 50
      }else{
        this.multbyac = new Decimal(1)
      }


      setTimeout(this.update, Math.max(this.player.tickspeed-(this.diff+diffm)/2,1));
    },
    exportsave(){
      this.exported = btoa(JSON.stringify(this.players))
    },
    importsave(){
      let input = window.prompt("データを入力","")
      let k = atob(input).charAt(0)
      console.log(k)
      if(k=='{') return
      localStorage.setItem("playerStoredb",input)
      this.dataload()
      this.load(0)
    },
    save() {

      console.log(JSON.stringify(this.players))

      this.players[this.world] = this.player

      localStorage.setItem("playerStored", JSON.stringify(this.player));
      localStorage.setItem("playerStoredb", btoa(JSON.stringify(this.players)));
    },
    dataload(){
      if(!localStorage.getItem("playerStored")) return
      let saveData = JSON.parse(localStorage.getItem("playerStored"));
      if(saveData.saveversion === 1){
        saveData = readOldFormat(saveData)
      }
      if (localStorage.getItem("playerStoredb")) {
        this.players = JSON.parse(atob(localStorage.getItem("playerStoredb")))
      }else{
        this.players[0] = saveData;
      }
      for(let i=0;i<10;i++){
        saveData = this.players[i]
        while(saveData.accelerators.length<8)saveData.accelerators.push('0')
        while(saveData.acceleratorsBought.length<8)saveData.acceleratorsBought.push('0')
        saveData.acceleratorsBought = saveData.acceleratorsBought.map(v => new Decimal(v))
        while(saveData.acceleratorsCost.length<8)saveData.acceleratorsCost.push('0')
        if(saveData.levelitems.length<5){
          while(saveData.levelitems.length<5){
            saveData.levelitems.push(0)
          }
          saveData.levelitems[3] = saveData.levelitems[1]
          saveData.levelitems[2] = saveData.levelitems[0]
          saveData.levelitems[1] = 0
          saveData.levelitems[0] = 0
        }
        if(saveData.trophies.length<8){
          while(saveData.trophies.length<8){
            saveData.trophies.push(false)
          }
        }
        if(!('levelitembought' in saveData)){
          saveData.levelitembought = 0
        }
        if(!('ranktoken' in saveData)){
          saveData.ranktoken = saveData.rankchallengecleared.length
        }
        if(!('rankchallengebonuses' in saveData)){
          saveData.rankchallengebonuses = []
        }
        if(!('boughttype' in saveData)){
          saveData.boughttype = [false,false,false]
        }
        if(!('setmodes' in saveData)){
          saveData.setmodes = new Array(8).fill(null).map((_, i) => i)
        }
        if(!('setchallengebonusesfst' in saveData)){
          saveData.setchallengebonusesfst = []
        }
        if(!('setchallengebonusessnd' in saveData)){
          saveData.setchallengebonusessnd = []
        }
        if(!('brightness' in saveData)){
          saveData.brightness = 0
        }
        if(!('darkmoney' in saveData)){
          saveData.darkmoney = new Decimal(0)
        }
        if(!('darkgenerators' in saveData)){
          saveData.darkgenerators = new Array(8).fill(null).map(() => new Decimal(0))
        }
        if(!('darkgeneratorsBought' in saveData)){
          saveData.darkgeneratorsBought = new Array(8).fill(null).map(() => new Decimal(0))
        }
        if(!('darkgeneratorsCost' in saveData)){
          saveData.darkgeneratorsCost = [
            new Decimal('1e100'),
            new Decimal('1e108'),
            new Decimal('1e127'),
            new Decimal('1e164'),
            new Decimal('1e225'),
            new Decimal('1e316'),
            new Decimal('1e423'),
            new Decimal('1e612'),
          ]
        }


        if(!('remember' in saveData)){
          saveData.remember = 0
        }
        if(!('rememberspent' in saveData)){
          saveData.rememberspent = 0
        }
        if(!('smalltrophies' in saveData)){
          saveData.smalltrophies = new Array(100).fill(null).map(() => false)
        }
        if(!('chip' in saveData)){
          saveData.chip = [0,0,0,0]
        }
        if(!('setchip' in saveData)){
          saveData.setchip = new Array(setchipnum).fill(null).map(() => 0)
        }
        if(!('darklevel' in saveData)){
          saveData.darklevel = new Decimal(0)
        }


        this.players[i] = saveData
      }

    },
    load(world) {

      saveData = this.players[world]
      this.world = world
      console.log(saveData)
      this.player = {
          money: new Decimal(saveData.money),
          level: new Decimal(saveData.level),
          levelresettime: new Decimal(saveData.levelresettime),
          maxlevelgained: new Decimal(saveData.maxlevelgained ?? 1),
          token: saveData.token ?? 0,
          shine: saveData.shine ?? 0,
          brightness: saveData.brightness ?? 0,

          rank: new Decimal(saveData.rank ?? 0),
          rankresettime: new Decimal(saveData.rankresettime ?? 0),
          ranktoken: new Decimal(saveData.ranktoken ?? 0),

          generators: saveData.generators.map(v => new Decimal(v)),
          generatorsBought: saveData.generatorsBought.map(v => new Decimal(v)),
          generatorsCost: saveData.generatorsCost.map(v => new Decimal(v)),
          generatorsMode: saveData.generatorsMode.map(v => parseInt(v)),

          accelerators: saveData.accelerators.map(v => new Decimal(v)),
          acceleratorsBought: saveData.acceleratorsBought.map(v => new Decimal(v)),
          acceleratorsCost: saveData.acceleratorsCost.map(v => new Decimal(v)),

          darkmoney: new Decimal(saveData.darkmoney),

          darkgenerators: saveData.darkgenerators.map(v => new Decimal(v)),
          darkgeneratorsBought: saveData.darkgeneratorsBought.map(v => new Decimal(v)),
          darkgeneratorsCost: saveData.darkgeneratorsCost.map(v => new Decimal(v)),

          darklevel: new Decimal(saveData.darklevel),

          tickspeed: parseFloat(saveData.tickspeed),
          saveversion: parseInt(saveData.saveversion),

          currenttab: 'basic',

          tweeting: saveData.tweeting ?? ['money'],

          onchallenge: saveData.onchallenge ?? false,
          challenges: saveData.challenges ?? [],
          challengecleared: saveData.challengecleared ?? [],
          challengebonuses: saveData.challengebonuses ?? [],

          rankchallengecleared: saveData.rankchallengecleared ?? [],
          rankchallengebonuses: saveData.rankchallengebonuses ?? [],

          boughttype: saveData.boughttype ?? [false,false,false],
          setmodes: saveData.setmodes ?? new Array(8).fill(null).map((_, i) => i),
          setchallengebonusesfst:saveData.setchallengebonusesfst ?? [],
          setchallengebonusessnd:saveData.setchallengebonusessnd ?? [],

          trophies: saveData.trophies ?? new Array(8).fill(null).map(() => false),
          smalltrophies: saveData.smalltrophies ?? new Array(100).fill(null).map(() => false),

          levelitems: saveData.levelitems ?? [0,0,0,0,0],
          levelitembought :saveData.levelitembought ?? 0,

          remember: saveData.remember ?? 0,
          rememberspent: saveData.rememberspent ?? 0,

          chip:saveData.chip ?? [0,0,0,0],
          setchip:saveData.setchip ?? new Array(setchipnum).fill(null).map(() => 0)
        };
        if(!this.player.onchallenge || this.player.challengebonuses.includes(4))this.activechallengebonuses = this.player.challengebonuses
      this.calcaccost()
      this.calcdgcost()
      this.checkusedchips()
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
        if(index==3||index==7){
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
      if(index>=1 && this.player.levelresettime.lessThanOrEqualTo(0)) return;

      if (this.player.money.greaterThanOrEqualTo(this.player.acceleratorsCost[index])) {
        this.player.money = this.player.money.sub(this.player.acceleratorsCost[index])
        this.player.accelerators[index] = this.player.accelerators[index].add(1)
        this.player.acceleratorsBought[index] = this.player.acceleratorsBought[index].add(1)
        this.calcaccost()
      }
    },
    buydarkgenerator(index){
      if (this.player.money.greaterThanOrEqualTo(this.player.darkgeneratorsCost[index])) {
        this.player.money = this.player.money.sub(this.player.darkgeneratorsCost[index])
        this.player.darkgenerators[index] = this.player.darkgenerators[index].add(1)
        this.player.darkgeneratorsBought[index] = this.player.darkgeneratorsBought[index].add(1)
        this.calcdgcost()
      }
    },
    configautobuyer(index){
      if(index==0){
        let input = window.prompt("リセット時入手段位を設定","")
        input = new Decimal(input)
        this.autolevelnumber = input
      }else if(index==1){
        let input = window.prompt("昇段停止段位を設定","")
        input = new Decimal(input)
        this.autolevelstopnumber = input
      }else if(index==2){
        let input = window.prompt("リセット時入手階位を設定","")
        input = new Decimal(input)
        this.autoranknumber = input
      }
    },
    toggleautobuyer(index){
      if(index==0)this.genautobuy = !this.genautobuy
      if(index==1)this.accautobuy = !this.accautobuy
      if(index==2)this.autolevel = !this.autolevel
      if(index==3)this.litemautobuy = !this.litemautobuy
      if(index==5)this.autorank = !this.autorank
    },
    setbonusetype(index){
      if(confirm("現在の効力を登録します。よろしいですか？")){
        let ans = []
        for(let i=0;i<15;i++){
          if(this.player.challengebonuses.includes(i)){
            ans.push(i)
          }
        }
        if(index==1){
          this.player.setchallengebonusesfst = ans
        }
        if(index==2){
          this.player.setchallengebonusessnd = ans
        }
      }

    },
    changebonusetype(index){
      for(let i=0;i<15;i++){
        if(this.player.challengebonuses.includes(i)){
          this.buyRewards(i)
        }
      }
      if(index==1){
        for(let i=0;i<15;i++){
          if(this.player.setchallengebonusesfst.includes(i)){
            this.buyRewards(i)
          }
        }
      }
      if(index==2){
        for(let i=0;i<15;i++){
          if(this.player.setchallengebonusessnd.includes(i)){
            this.buyRewards(i)
          }
        }
      }

    },
    buyRewards(index){
      if(this.player.challengebonuses.includes(index)){
        this.player.challengebonuses.splice(this.player.challengebonuses.indexOf(index),1)
        this.player.token += this.challengedata.rewardcost[index]
      }else{
        if(this.player.token<this.challengedata.rewardcost[index]){
          return;
        }
        this.player.challengebonuses.push(index)
        this.player.token -= this.challengedata.rewardcost[index]
      }
    },
    buyrankRewards(index){
      if(this.player.rankchallengebonuses.includes(index)){
        this.player.rankchallengebonuses.splice(this.player.rankchallengebonuses.indexOf(index),1)
        this.player.ranktoken += this.challengedata.rewardcost[index]
      }else{
        if(this.player.ranktoken<this.challengedata.rewardcost[index]){
          return;
        }
        this.player.rankchallengebonuses.push(index)
        this.player.ranktoken -= this.challengedata.rewardcost[index]
      }
    },
    calclevelitemcost(index){
      let d = index+1
      let cost = this.levelshopdata.itemcost[index].pow(this.player.levelitems[index]+1)
      let dec = 0;
      for(let i=1;i<=5;i++){
        if(4*i*i*d*d*d<=this.player.levelitembought)dec = i;
      }
      cost = cost.div(new Decimal(10).pow(dec)).max(1)
      return cost
    },
    buylevelitems(index){
      let cost = this.calclevelitemcost(index)
      if(this.player.level.lessThan(cost) || this.player.levelitems[index]>=5){
        return;
      }
      this.player.level = this.player.level.sub(cost);
      this.player.levelitems[index] = this.player.levelitems[index]+1;
      if(this.player.levelitembought<100000)this.player.levelitembought = this.player.levelitembought+1;
    },
    setmodetype(){
      if(confirm('現在のモードを登録します。よろしいですか？')){
        for(let i=0;i<8;i++){
          this.player.setmodes[i] = this.player.generatorsMode[i]
        }
      }
    },
    changemodetype(){
      if(this.player.onchallenge && this.player.challenges.includes(3)) return;
      for(let i=0;i<8;i++){
        while(this.player.setmodes[i] != this.player.generatorsMode[i]){
          this.changeMode(i)
        }
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
        for(let i=0;i<10;i++){
          this.players[i] = initialData()
        }
      }
    },
    calcgainlevel(){
      let dividing = 19-this.player.rank.add(2).log2()
      if(dividing<1) dividing = 1
      let mny = this.player.money.log10()-17
      mny = new Decimal(mny).pow(this.player.setchip[18])
      let gainlevel = new Decimal(this.player.money.mul(mny).log10()).div(dividing).pow_base(2)

      let glmin = new Decimal(18).div(dividing).pow_base(2)
      let glmax = this.player.maxlevelgained.div(2)

      if(!glmin.add(0.1).greaterThanOrEqualTo(glmax)) {
        if(gainlevel.lt(glmax)){
          let persent = new Decimal(1).sub(gainlevel.sub(glmin).div(glmax.sub(glmin)))

          persent = persent.pow(1+this.player.levelitems[0]*(1+this.player.setchip[26]*2))
          persent = new Decimal(1).sub(persent)
          if(persent.lt("1e-5")){
            gainlevel = gainlevel.mul(1+this.player.levelitems[0]*(1+this.player.setchip[26]*2))
          }else{
            gainlevel = glmax.sub(glmin).mul(persent).add(glmin)
          }
        }

      }

      gainlevel = gainlevel.round()


      if(this.activechallengebonuses.includes(12)) gainlevel = gainlevel.mul(new Decimal(2))
      return gainlevel;
    },

    calcgainchip(){
      let level = this.chipdata.getcl(this.player.money)
      return this.chipdata.getchipid(level)
    },

    resetDarklevel(){
      let gaindarklevel = new Decimal(this.player.darkmoney.log10()).div(18).pow_base(2).round()
      if(confirm('裏昇段リセットして、裏段位' + gaindarklevel + 'を得ますか？')){
        this.player.darkmoney = new Decimal(0)
        this.player.darkgenerators = new Array(8).fill(null).map(() => new Decimal(0)),
        this.player.darkgeneratorsBought = new Array(8).fill(null).map(() => new Decimal(0)),
        this.player.darkgeneratorsCost = [
          new Decimal('1e100'),
          new Decimal('1e108'),
          new Decimal('1e127'),
          new Decimal('1e164'),
          new Decimal('1e225'),
          new Decimal('1e316'),
          new Decimal('1e423'),
          new Decimal('1e612')
        ],
        this.player.darklevel = this.player.darklevel.add(gaindarklevel)
      }
    },



    resetLevel(force,exit) {
      if(this.player.onchallenge && this.player.challenges.includes(0)){
        if(this.player.money.lt(new Decimal('1e24'))){
          alert('現在挑戦1が適用されているため、まだ昇段リセットができません。')
          return;
        }
      }

      let dividing = 19-this.player.rank.add(2).log2()
      if(dividing<1) dividing = 1
      let gainlevel = this.calcgainlevel()
      let gainlevelreset =  this.player.rankresettime.add(1).mul(1+this.player.setchip[20]).mul(new Decimal(exit?0:this.activechallengebonuses.includes(8)?2:1))

      if (force || confirm('昇段リセットして、段位' + gainlevel + 'を得ますか？')) {
        if(this.player.onchallenge) {
          this.player.onchallenge = false;
          if(this.player.challenges.length >= 6){
            this.player.trophies[3] = true;
          }
          let id = this.calcchallengeid()
          if(!this.player.challengecleared.includes(id)){
            this.player.token = this.player.token + 1
            this.player.challengecleared.push(this.calcchallengeid())
          }
          this.activechallengebonuses = this.player.challengebonuses;
        }

        if(this.player.money.greaterThan(1e80)){
          let gainchip = this.calcgainchip()
          console.log(gainchip)
          if(gainchip!=-1 && this.player.chip[gainchip]<100000){
            this.player.chip[gainchip] = this.player.chip[gainchip]+1
          }
        }


        this.player.money = new Decimal(1)
        this.player.level = this.player.level.add(exit?new Decimal(0):gainlevel)
        this.player.levelresettime = this.player.levelresettime.add(gainlevelreset)
        this.player.maxlevelgained = this.player.maxlevelgained.max(exit?new Decimal(0):gainlevel)

        this.player.generators = new Array(8).fill(null).map(() => new Decimal(0)),
        this.player.generatorsBought = new Array(8).fill(null).map(() => new Decimal(0)),
        this.player.generatorsCost = [
          new Decimal(1),
          new Decimal('1e4'),
          new Decimal('1e9'),
          new Decimal('1e16'),
          new Decimal('1e25'),
          new Decimal('1e36'),
          new Decimal('1e49'),
          new Decimal('1e64')
        ],


        this.player.accelerators = new Array(8).fill(null).map(() => new Decimal(0)),
        this.player.acceleratorsBought = new Array(8).fill(null).map(() => new Decimal(0)),
        this.player.acceleratorsCost = [
          new Decimal(10),
          new Decimal('1e10'),
          new Decimal('1e20'),
          new Decimal('1e40'),
          new Decimal('1e80'),
          new Decimal('1e160'),
          new Decimal('1e320'),
          new Decimal('1e640'),
        ]

        this.player.tickspeed = 1000

        if(this.activechallengebonuses.includes(0))this.player.money = new Decimal(10001)
        if(this.activechallengebonuses.includes(1))this.player.accelerators[0] = new Decimal(10)
        if(this.player.rankchallengebonuses.includes(0))this.player.money = this.player.money.add(new Decimal("1e9"))
        if(this.player.rankchallengebonuses.includes(1))this.player.accelerators[0] = this.player.accelerators[0].add(256)



      }
    },
    calcgainrank(){
      let gainrank = new Decimal(this.player.money.log10()).div(36-0.25*this.checkremembers()-1.2*this.player.levelitems[4]).pow_base(2).round()
      if(this.player.rankchallengebonuses.includes(12)){
        gainrank = gainrank.mul(3)
      }
      return gainrank
    },
    resetRankborder(){
      let p = (this.player.onchallenge && this.player.challenges.includes(0))?96:72
      p -= this.checkremembers()/2.0
      return new Decimal(10).pow(p)
    },
    resetRank(force){

      if(this.player.onchallenge && this.player.challenges.includes(0)){
        if(this.player.money.lt(this.resetRankborder())){
          alert('現在挑戦1が適用されているため、まだ昇階リセットができません。')
          return;
        }
      }

      let gainrank = this.calcgainrank()
      if(force || confirm('昇階リセットして、階位' + gainrank + 'を得ますか？')){

        if(this.player.onchallenge) {
          this.player.onchallenge = false;
          this.activechallengebonuses = this.player.challengebonuses;
          if(this.player.challengecleared.length>=128 && !this.player.rankchallengecleared.includes(this.calcchallengeid())){
            this.player.rankchallengecleared.push(this.calcchallengeid())
          }
        }

        this.player.money = new Decimal(1)
        this.player.level = new Decimal(0)
        this.player.levelresettime = new Decimal(0)

        this.player.generators = new Array(8).fill(null).map(() => new Decimal(0)),
        this.player.generatorsBought = new Array(8).fill(null).map(() => new Decimal(0)),
        this.player.generatorsCost = [
          new Decimal(1),
          new Decimal('1e4'),
          new Decimal('1e9'),
          new Decimal('1e16'),
          new Decimal('1e25'),
          new Decimal('1e36'),
          new Decimal('1e49'),
          new Decimal('1e64')
        ],


        this.player.accelerators = new Array(8).fill(null).map(() => new Decimal(0)),
        this.player.acceleratorsBought = new Array(8).fill(null).map(() => new Decimal(0)),
        this.player.acceleratorsCost = [
          new Decimal(10),
          new Decimal('1e10'),
          new Decimal('1e20'),
          new Decimal('1e40'),
          new Decimal('1e80'),
          new Decimal('1e160'),
          new Decimal('1e320'),
          new Decimal('1e640'),
        ],

        this.player.tickspeed = 1000

        this.player.rank = this.player.rank.add(gainrank)
        this.player.rankresettime = this.player.rankresettime.add((this.player.rankchallengebonuses.includes(8)?new Decimal(3):new Decimal(1)).mul(this.player.setchip[24]+1))

        this.player.levelitems = [0,0,0,0,0]

        this.activechallengebonuses = this.player.challengebonuses

        if(this.activechallengebonuses.includes(0))this.player.money = new Decimal(10001)
        if(this.activechallengebonuses.includes(1))this.player.accelerators[0] = new Decimal(10)
        if(this.player.rankchallengebonuses.includes(0))this.player.money = this.player.money.add(new Decimal("1e9"))
        if(this.player.rankchallengebonuses.includes(1))this.player.accelerators[0] = this.player.accelerators[0].add(256)

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
    getchallengeid(arr){
      let challengeid = 0;
      for(let i=0;i<8;i++){
        challengeid *= 2
        if(arr.includes(i)){
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

      let conf = '挑戦を開始しますか？現在のポイントや発生器、時間加速器は失われます。'

      if(this.player.challengecleared.includes(challengeid)){
        if(this.player.challengecleared.length<128){
          alert("すでに達成した挑戦です。")
          return;
        }
        conf = 'すでに達成した挑戦です。勲章は得られませんが、それでもよろしいですか？'
        if(this.player.rankchallengecleared.includes(challengeid)){
          conf = 'すでに階位挑戦としても達成した挑戦です。勲章や大勲章は得られませんが、それでもよろしいですか？'
        }
      }

      if (confirm(conf)) {
        if(!this.player.challengebonuses.includes(4))this.activechallengebonuses = [];
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
        this.activechallengebonuses = this.player.challengebonuses;
        if(this.player.challenges.includes(1)){
          for(let i=0;i<8;i++){
            this.player.generatorsCost[i] = i === 0 ?
            new Decimal(10).pow(this.player.generatorsBought[0]) :
            new Decimal(10).pow(this.player.generatorsBought[i].add(i + 1).mul(i + 1))
          }
        }
      }
    },
    gettrophyname(i){
      return this.player.trophies[i]?this.trophydata.contents[i]:"???"
    },
    moveworld(i){
      if(world==i || !this.worldopened[i]) return
      this.load(i)
      this.world = i
    },
    shrinkworld(i){
      if(4>this.trophynumber[i]){
        alert("実績が4つ未満なので、世界を収縮できません。")
        return
      }
      if(this.players[i].remember>=this.trophynumber[i]){
        alert("実績が思い出より多くありません。")
        return
      }
      if(confirm("世界"+(i+1)+"を収縮させ、記憶を思い出に変化させますか？収縮した世界は最初からになります。")){
        let u = this.trophynumber[i]
        let r = this.checkremembers()
        this.players[i] = initialData()
        this.players[i].remember = u
        if(r>=1) this.players[i].levelresettime=new Decimal(1)
        if(r>=2) this.players[i].levelresettime=new Decimal(2)
        if(r>=3) this.players[i].levelresettime=new Decimal(3)
        if(r>=4) this.players[i].levelresettime=new Decimal(5)
        if(r>=5) this.players[i].levelresettime=new Decimal(8)
        if(r>=6) this.players[i].levelresettime=new Decimal(13)
        if(r>=7) this.players[i].levelresettime=new Decimal(21)
        if(r>=8) this.players[i].levelresettime=new Decimal(34)
        if(r>=9) this.players[i].rankresettime=new Decimal(1)
        if(r>=10) this.players[i].rankresettime=new Decimal(2)
        if(r>=11) this.players[i].rankresettime=new Decimal(3)
        if(r>=12) this.players[i].rankresettime=new Decimal(5)
        if(r>=13) this.players[i].rankresettime=new Decimal(8)
        if(r>=14) this.players[i].rankresettime=new Decimal(13)
        if(r>=15) this.players[i].rankresettime=new Decimal(21)
        if(r>=16) this.players[i].rankresettime=new Decimal(34)
        if(r>=17){
          for(let j=0;j<this.rememberdata.givenchalenges[0].length;j++){
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[0][j]))
          }
        }
        if(r>=18){
          for(let j=0;j<this.rememberdata.givenchalenges[1].length;j++){
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[1][j]))
          }
        }
        if(r>=19){
          for(let j=0;j<this.rememberdata.givenchalenges[2].length;j++){
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[2][j]))
          }
        }
        if(r>=20){
          for(let j=0;j<this.rememberdata.givenchalenges[3].length;j++){
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[3][j]))
          }
        }
        if(r>=21){
          for(let j=0;j<this.rememberdata.givenchalenges[4].length;j++){
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[4][j]))
          }
        }
        if(r>=22){
          for(let j=0;j<this.rememberdata.givenchalenges[5].length;j++){
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[5][j]))
          }
        }
        if(r>=23){
          for(let j=0;j<this.rememberdata.givenchalenges[6].length;j++){
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[6][j]))
          }
        }
        if(r>=24){
          for(let j=0;j<this.rememberdata.givenchalenges[7].length;j++){
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[7][j]))
          }
        }
        if(r>=25) this.players[i].rank=new Decimal(64)
        if(r>=26) this.players[i].levelitembought=108
        if(r>=27) this.players[i].rank=new Decimal(128)
        if(r>=28) this.players[i].levelitembought=256
        if(r>=29) this.players[i].rank=new Decimal(256)
        if(r>=30) this.players[i].levelitembought=800
        if(r>=31) this.players[i].rank=new Decimal(512)
        if(r>=32) this.players[i].levelitembought=1728
        if(r>=33) this.players[i].maxlevelgained=new Decimal(1000)
        if(r>=34){
          for(let j=0;j<this.rememberdata.givenchalenges[8].length;j++){
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[8][j]))
          }
        }
        if(r>=35) this.players[i].maxlevelgained=new Decimal(3000)
        if(r>=36){
          for(let j=0;j<this.rememberdata.givenchalenges[9].length;j++){
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[9][j]))
          }
        }
        if(r>=37) this.players[i].maxlevelgained=new Decimal(10000)
        if(r>=38){
          for(let j=0;j<this.rememberdata.givenchalenges[10].length;j++){
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[10][j]))
          }
        }
        if(r>=39) this.players[i].maxlevelgained=new Decimal(30000)
        if(r>=40){
          for(let j=0;j<this.rememberdata.givenchalenges[11].length;j++){
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[11][j]))
          }
        }
        if(r>=41) this.players[i].levelresettime=new Decimal(1000)
        if(r>=42) this.players[i].rankresettime=new Decimal(300)
        if(r>=43) this.players[i].rank=new Decimal(4096)
        if(r>=44) this.players[i].shine=100000
        if(r>=45) this.players[i].maxlevelgained=new Decimal(100000)
        if(r>=46) this.players[i].levelitembought=6400
        if(r>=47){
          for(let j=0;j<this.rememberdata.givenchalenges[12].length;j++){
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[12][j]))
          }
        }
        if(r>=48){
          for(let j=0;j<this.rememberdata.givenchalenges[13].length;j++){
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[13][j]))
          }
        }
        if(r>=49){
          for(let j=0;j<this.rememberdata.givenchalenges[14].length;j++){
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[14][j]))
          }
        }
        if(r>=50){
          for(let j=0;j<this.rememberdata.givenchalenges[15].length;j++){
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[15][j]))
          }
        }
        if(r>=51){
          for(let j=0;j<this.rememberdata.givenchalenges[16].length;j++){
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[16][j]))
          }
        }
        if(r>=52){
          for(let j=0;j<this.rememberdata.givenchalenges[17].length;j++){
            this.players[i].challengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[17][j]))
          }
        }
        if(r>=53){
          for(let j=0;j<this.rememberdata.givenchalenges[0].length;j++){
            this.players[i].rankchallengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[0][j]))
          }
        }
        if(r>=54){
          for(let j=0;j<this.rememberdata.givenchalenges[1].length;j++){
            this.players[i].rankchallengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[1][j]))
          }
        }
        if(r>=55){
          for(let j=0;j<this.rememberdata.givenchalenges[2].length;j++){
            this.players[i].rankchallengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[2][j]))
          }
        }
        if(r>=56){
          for(let j=0;j<this.rememberdata.givenchalenges[3].length;j++){
            this.players[i].rankchallengecleared.push(this.getchallengeid(this.rememberdata.givenchalenges[3][j]))
          }
        }


        this.players[i].token = this.players[i].challengecleared.length



      }
    },
    confchecktrophies(){
      this.trophycheck = !this.trophycheck
    },

    checktrophies(){
      if(this.player.levelresettime.greaterThan(0))this.player.trophies[0] = true;
      if(this.player.rankresettime.greaterThan(0))this.player.trophies[1] = true;
      if(this.player.shine>0)this.player.trophies[2] = true;
      if(this.player.challengecleared.includes(238) || this.player.challengecleared.length>=100)this.player.trophies[3] = true;
      if(this.player.darkgenerators[0].greaterThan(0))this.player.trophies[4] = true;
      if(this.player.brightness>0)this.player.trophies[5] = true;
      if(this.player.remember>0)this.player.trophies[6] = true;
      if(this.world==0){
        if(this.checkremembers()>0)this.player.trophies[6] = true;
      }
      if(this.player.money.greaterThan(0))this.player.smalltrophies[0] = true
      if(this.player.money.greaterThan(777))this.player.smalltrophies[1] = true
      if(this.player.money.greaterThan(7777777))this.player.smalltrophies[2] = true
      if(this.player.money.greaterThan("1e19"))this.player.smalltrophies[3] = true
      if(this.player.money.greaterThan("1e36"))this.player.smalltrophies[4] = true
      if(this.player.money.greaterThan("1e77"))this.player.smalltrophies[5] = true
      if(this.player.money.greaterThan("1e81"))this.player.smalltrophies[6] = true
      if(this.player.money.greaterThan("1e303"))this.player.smalltrophies[7] = true
      if(this.player.generatorsBought[0].greaterThan(0))this.player.smalltrophies[8] = true
      if(this.player.generatorsBought[1].greaterThan(0))this.player.smalltrophies[9] = true
      if(this.player.generatorsBought[2].greaterThan(0))this.player.smalltrophies[10] = true
      if(this.player.generatorsBought[3].greaterThan(0))this.player.smalltrophies[11] = true
      if(this.player.generatorsBought[4].greaterThan(0))this.player.smalltrophies[12] = true
      if(this.player.generatorsBought[5].greaterThan(0))this.player.smalltrophies[13] = true
      if(this.player.generatorsBought[6].greaterThan(0))this.player.smalltrophies[14] = true
      if(this.player.generatorsBought[7].greaterThan(0))this.player.smalltrophies[15] = true
      if(this.player.acceleratorsBought[0].greaterThan(0))this.player.smalltrophies[16] = true
      if(this.player.acceleratorsBought[1].greaterThan(0))this.player.smalltrophies[17] = true
      if(this.player.acceleratorsBought[2].greaterThan(0))this.player.smalltrophies[18] = true
      if(this.player.acceleratorsBought[3].greaterThan(0))this.player.smalltrophies[19] = true
      if(this.player.acceleratorsBought[4].greaterThan(0))this.player.smalltrophies[20] = true
      if(this.player.acceleratorsBought[5].greaterThan(0))this.player.smalltrophies[21] = true
      if(this.player.acceleratorsBought[6].greaterThan(0))this.player.smalltrophies[22] = true
      if(this.player.acceleratorsBought[7].greaterThan(0))this.player.smalltrophies[23] = true
      if(this.player.levelresettime.greaterThan(200))this.player.smalltrophies[24] = true
      if(this.player.levelresettime.greaterThan(999))this.player.smalltrophies[25] = true
      if(this.player.challengecleared.includes(128))this.player.smalltrophies[26] = true
      if(this.player.challengecleared.includes(64))this.player.smalltrophies[27] = true
      if(this.player.challengecleared.includes(32))this.player.smalltrophies[28] = true
      if(this.player.challengecleared.includes(16))this.player.smalltrophies[29] = true
      if(this.player.challengecleared.includes(8))this.player.smalltrophies[30] = true
      if(this.player.challengecleared.includes(4))this.player.smalltrophies[31] = true
      if(this.player.challengecleared.includes(2))this.player.smalltrophies[32] = true
      if(this.player.challengecleared.includes(1))this.player.smalltrophies[33] = true
      if(this.player.challengecleared.length>=32)this.player.smalltrophies[34] = true
      if(this.player.challengecleared.length>=64)this.player.smalltrophies[35] = true
      if(this.player.challengecleared.length>=96)this.player.smalltrophies[36] = true
      if(this.player.challengecleared.length>=128)this.player.smalltrophies[37] = true
      if(this.player.challengecleared.length>=160)this.player.smalltrophies[38] = true
      if(this.player.challengecleared.length>=192)this.player.smalltrophies[39] = true
      if(this.player.challengecleared.length>=224)this.player.smalltrophies[40] = true
      if(this.player.challengecleared.length>=255)this.player.smalltrophies[41] = true
      if(this.player.rankresettime.greaterThan(1))this.player.smalltrophies[42] = true
      if(this.player.rankresettime.greaterThan(4))this.player.smalltrophies[43] = true
      if(this.player.rankresettime.greaterThan(9))this.player.smalltrophies[44] = true
      if(this.player.rankresettime.greaterThan(99))this.player.smalltrophies[45] = true
      if(this.player.rankresettime.greaterThan(999))this.player.smalltrophies[46] = true
      if(this.player.levelitembought>=4)this.player.smalltrophies[47] = true
      if(this.player.levelitembought>=108)this.player.smalltrophies[48] = true
      if(this.player.levelitembought>=256)this.player.smalltrophies[49] = true
      if(this.player.levelitembought>=1728)this.player.smalltrophies[50] = true
      if(this.player.levelitembought>=12500)this.player.smalltrophies[51] = true
      if(this.player.shine>=100)this.player.smalltrophies[52] = true
      if(this.player.shine>=1000)this.player.smalltrophies[53] = true
      if(this.player.shine>=10000)this.player.smalltrophies[54] = true
      if(this.player.shine>=100000)this.player.smalltrophies[55] = true
      if(this.player.shine>=1000000)this.player.smalltrophies[56] = true
      if(this.player.shine>=10000000)this.player.smalltrophies[57] = true
      if(this.exported.length>=2)this.player.smalltrophies[58] = true
      if(this.player.tweeting.length>=2)this.player.smalltrophies[59] = true
      if(this.player.darkgenerators[0].greaterThanOrEqualTo(1))this.player.smalltrophies[60] = true
      if(this.player.darkgenerators[1].greaterThanOrEqualTo(1))this.player.smalltrophies[61] = true
      if(this.player.darkgenerators[2].greaterThanOrEqualTo(1))this.player.smalltrophies[62] = true
      if(this.player.darkgenerators[3].greaterThanOrEqualTo(1))this.player.smalltrophies[63] = true
      if(this.player.darkgenerators[4].greaterThanOrEqualTo(1))this.player.smalltrophies[64] = true
      if(this.player.darkgenerators[5].greaterThanOrEqualTo(1))this.player.smalltrophies[65] = true
      if(this.player.darkgenerators[6].greaterThanOrEqualTo(1))this.player.smalltrophies[66] = true
      if(this.player.darkgenerators[7].greaterThanOrEqualTo(1))this.player.smalltrophies[67] = true
      if(this.player.rankchallengecleared.length>=32)this.player.smalltrophies[68] = true
      if(this.player.rankchallengecleared.length>=64)this.player.smalltrophies[69] = true
      if(this.player.rankchallengecleared.length>=96)this.player.smalltrophies[70] = true
      if(this.player.rankchallengecleared.length>=128)this.player.smalltrophies[71] = true
      if(this.player.rankchallengecleared.length>=160)this.player.smalltrophies[72] = true
      if(this.player.rankchallengecleared.length>=192)this.player.smalltrophies[73] = true
      if(this.player.rankchallengecleared.length>=224)this.player.smalltrophies[74] = true
      if(this.player.rankchallengecleared.length>=255)this.player.smalltrophies[75] = true
      if(this.player.brightness>=10)this.player.smalltrophies[76] = true
      if(this.player.brightness>=100)this.player.smalltrophies[77] = true
      if(this.player.brightness>=1000)this.player.smalltrophies[78] = true
      if(this.player.brightness>=10000)this.player.smalltrophies[79] = true
      if(this.player.darkmoney.greaterThanOrEqualTo(1))this.player.smalltrophies[80] = true
      if(this.player.darkmoney.greaterThanOrEqualTo(777))this.player.smalltrophies[81] = true
      if(this.player.darkmoney.greaterThanOrEqualTo(7777777))this.player.smalltrophies[82] = true
      if(this.player.darkmoney.greaterThanOrEqualTo("1e18"))this.player.smalltrophies[83] = true
      if(this.player.darkmoney.greaterThanOrEqualTo("1e72"))this.player.smalltrophies[84] = true


    },

    chipset(i,j){
      if(this.player.setchip[i] == j) return
      if(this.player.chip[j-1]<=this.chipused[j-1]) return
      let oldchip = this.player.setchip[i]-1
      if(oldchip!=-1)this.player.chip[oldchip] = this.player.chip[oldchip]+this.chipused[oldchip]
      this.player.setchip[i] = j
      if(j!=0)this.player.chip[j-1] = this.player.chip[j-1] - (this.chipused[j-1]+1)
      this.checkusedchips()
    },

    checkusedchips(){
      this.chipused.fill(0)
      for(let v of this.player.setchip){
        if(v!=0)this.chipused[v-1] = this.chipused[v-1]+1
      }
    },

    counttrophies(index){
      let cnt = 0
      for(let i=0;i<8;i++){
        if(this.players[index].trophies[i])cnt++;
      }
      this.trophynumber[index] = cnt

    },
    countsmalltrophies(index){
      let cnt = 0;
      for(let i=0;i<100;i++){
        if(this.player.smalltrophies[i])cnt++;
      }
      this.smalltrophy = cnt
    },
    checkmemories(){
      let cnt = 0;

      for(let i=0;i<10;i++){
        this.counttrophies(i)
        if(this.world==i) continue
        cnt += this.trophynumber[i]
      }
      this.memory = cnt
    },
    checkremembers(){
      let cnt = 0;
      for(let i=this.world+1;i<10;i++){
        cnt += this.players[i].remember
      }
      return cnt
    },
    checkworlds(){

      this.worldopened[0] = true;
      if(this.players[0].challengecleared.includes(238))this.worldopened[1] = true
      if(this.players[0].challengecleared.length>=100)this.worldopened[2] = true
      if(this.players[0].rankchallengecleared.length>=16)this.worldopened[3] = true
      if(this.players[0].levelitembought>=12500)this.worldopened[4] = true
      if(new Decimal(this.players[0].darkmoney).greaterThanOrEqualTo('1e8'))this.worldopened[5] = true
      if(new Decimal(this.players[0].rank).greaterThanOrEqualTo(262142))this.worldopened[6] = true
      if(this.players[0].rankchallengecleared.includes(238))this.worldopened[7] = true
      if(this.players[0].challengecleared.length>=200)this.worldopened[8] = true

    },

    toFormated(dec,exp){
      if(dec.lessThanOrEqualTo(new Decimal(10).pow(exp))) return dec.toNumber()
      else return dec.toExponential(3)
    }

  },

  mounted() {
    this.dataload();
    this.load(0);

    this.checkmemories();
    this.checkworlds();
    this.checkusedchips();

    this.time = Date.now()


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
    challengebonuses: saveData.challengebonuses ?? [],

    rankchallengecleared: saveData.rankchallengecleared ?? [],

    trophies: new Array(8).fill(null).map(() => false),

    levelitems: saveData.levelitems ?? [0,0],
  }
}
