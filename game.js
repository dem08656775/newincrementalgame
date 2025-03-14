const version = 2;
const trophynum = 12;
const setchipkind = 10;
const setchipnum = 100;
const ringmissionnum = 15;


const initialData = () => {
  return {
    money: new Decimal(1),
    level: new Decimal(0),
    levelresettime: new Decimal(0),
    maxlevelgained: new Decimal(1),
    token: 0,
    shine: 0,
    brightness: 0,
    flicker: 0,

    shineloader:new Array(8).fill(null).map(() => 0),
    brightloader:new Array(8).fill(null).map(() => 0),

    residue:0,

    rank:new Decimal(0),
    rankresettime: new Decimal(0),

    crown:new Decimal(0),
    crownresettime: new Decimal(0),

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
      new Decimal('1e443'),
      new Decimal('1e612')
    ],

    darklevel:new Decimal(0),

    lightmoney:new Decimal(0),

    lightgenerators: new Array(8).fill(null).map(() => new Decimal(0)),
    lightgeneratorsBought: new Array(8).fill(null).map(() => new Decimal(0)),
    lightgeneratorsCost: [
      new Decimal('1e200'),
      new Decimal('1e216'),
      new Decimal('1e281'),
      new Decimal('1e456'),
      new Decimal('1e825'),
      new Decimal('1e1496'),
      new Decimal('1e2601'),
      new Decimal('1e4296')
    ],

    tickspeed: 1000,
    accelevel: 0,
    accelevelused:0,
    timecrystal:new Array(8).fill(null).map(() => 0),
    saveversion: version,

    currenttab: 'basic',
    tweeting:['money'],

    onchallenge:false,
    challenges:[],
    challengecleared:[],
    challengebonuses:[],

    challengeweight:new Array(20).fill(null).map(() => 0),
    challengeweightvalue:new Array(20).fill(null).map(() => 0),

    onpchallenge: false,
    pchallenges:[],
    pchallengecleared:new Array(1024).fill(null).map(() => 0),
    prchallengecleared:new Array(1024).fill(null).map(() => 0),

    boughttype:[false,false,false,false,false,false],
    setmodes: new Array(8).fill(null).map((_, i) => i),
    setchallengebonusesfst:[],
    setchallengebonusessnd:[],
    setrankchallengebonusesfst:[],
    setrankchallengebonusessnd:[],

    rankchallengecleared:[],
    rankchallengebonuses:[],

    trophies: new Array(trophynum).fill(null).map(() => false),
    smalltrophies: new Array(100).fill(null).map(() => false),
    smalltrophies2nd: new Array(100).fill(null).map(() => false),

    levelitems:[0,0,0,0,0],
    levelitembought: 0,

    remember: 0,
    rememberspent: 0,
    rememberforgot: 0,

    chip: new Array(setchipkind).fill(0).map(() => 0),
    setchip: new Array(setchipnum).fill(0).map(() => 0),
    disabledchip: new Array(setchipnum).fill(0).map(() => false),
    spendchip:new Array(setchipkind).fill(0).map(() => 0),

    statue: new Array(setchipkind).fill(0).map(() => 0),
    polishedstatue: new Array(setchipkind).fill(0).map(() => 0),



    setchiptypefst:　new Array(100).fill(setchipnum).map(() => 0),

    worldpipe:new Array(10).fill(null).map(() => 0),
    rings:{
      setrings: [],
      ringsexp: new Array(13).fill(null).map(() => 0),
      onmission: false,
      missionid:0,
      missionstate:{
        turn:0,
        activering:0,
        skilllog:[],
        flowerpoint:0,
        snowpoint:0,
        moonpoint:0,
        flowermultiplier:1,
        snowmultiplier:1,
        moonmultiplier:1,
        tps:[],
        fieldeffect:[],
      },
      clearedmission:[],
      auto:{
        doauto:false,
        automissionid:0,
      },
      outsideauto:{
        autospendshine:false,
        autospendshinenumber:0,
        autospendbright:false,
        autospendbrightnumber:0,
        autodarklevelreset:false,
        autodarklevelresetborder:2,
        autodochallenge:false
      }
    　
    }

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
      ringdata: new Ringdata(),
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

      automissiontimerid:0,
      autoshinetimerid:0,
      autobrighttimerid:0,
      autochallengetimerid:0,

      multbyac:new Decimal(1),

      shinepersent:0,
      brightpersent:0,
      flickerpersent:0,

      memory:0,

      trophynumber: new Array(10).fill(null).map(() => false),
      smalltrophy:0,
      eachpipedsmalltrophy:new Array(10).fill(null).map(() => 0),
      pipedsmalltrophy:0,
      worldopened:new Array(10).fill(null).map(() => false),



      chipused:new Array(setchipkind).fill(null).map(() => 0),

      pchallengestage:0,

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
      if(this.player.tweeting.includes('lightmoney')){
        tweetText += '天上ポイント:' + this.player.lightmoney +
        '(' + this.player.lightmoney.toExponential().replace('+', '%2B') + ')%0A';
      }

      if(this.player.tweeting.includes('level')){
        tweetText += '段位:' + this.player.level + '%0A';
      }
      if(this.player.tweeting.includes('darklevel')){
        tweetText += '裏段位:' + this.player.darklevel + '%0A';
      }
      if(this.player.tweeting.includes('achieved')){
        tweetText += '挑戦達成:' + this.player.challengecleared.length + '%0A';
      }
      if(this.player.tweeting.includes('rankachieved')){
        tweetText += '上位挑戦達成:' + this.player.rankchallengecleared.length + '%0A';
      }
      if(this.player.tweeting.includes('pachieved')){
        tweetText += '完全挑戦段階:' + this.pchallengestage + '%0A';
      }
      if(this.player.tweeting.includes('rank')){
        tweetText += '階位:' + this.player.rank + '%0A';
      }
      if(this.player.tweeting.includes('levelitemboughttime')){
        tweetText += '段位効力購入:' + this.player.levelitembought+ '%0A';
      }
      if(this.player.tweeting.includes('crown')){
        tweetText += '冠位:' + this.player.crown + '%0A';
      }
      if(this.player.tweeting.includes('crownresettime')){
        tweetText += '冠位リセット:' + this.player.crownresettime +　'%0A';
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

    exportsave(){
      this.exported = btoa(JSON.stringify(this.players))
    },
    exportsavefile(){
      let result = btoa(JSON.stringify(this.players))
      const file = new Blob([result], {type: 'text/plain'})
      const a = document.createElement('a')
      a.href = URL.createObjectURL(file)
      a.download = `newincremantal_savedata${new Date()}.txt`
      a.click()
    },
    importsave(){
      let input = window.prompt("データを入力","")
      if(input.length<=50){
        console.log("returned")
        return
      }
      let k = atob(input).charAt(0)
      console.log(k)
      if(k=='{') return
      localStorage.setItem("playerStoredb",input)
      this.dataload()
      this.load(0)
    },
    save() {

      this.players[this.world] = this.player

      localStorage.setItem("playerStoredb", btoa(JSON.stringify(this.players)));

      console.log("save succeeded"+Date.now())
    },
    dataload(){
      if(!localStorage.getItem("playerStoredb")) return
      console.log(atob(localStorage.getItem("playerStoredb")))
      this.players = JSON.parse(atob(localStorage.getItem("playerStoredb")))

      for(let i=0;i<10;i++){

        const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray

        saveData = deepmerge(initialData(),this.players[i],{
          arraymerge:overwriteMerge,
          isMergeableObject: isPlainObject
        })

        while(saveData.trophies.length<trophynum){
          saveData.trophies.push(false)
        }


        while(saveData.boughttype.length<6){
          saveData.boughttype.push(false)
        }

        while(saveData.chip.length<setchipkind){
          saveData.chip.push(0)
        }

        while(saveData.statue.length<setchipkind){
          saveData.statue.push(0)
        }

        while(saveData.rings.ringsexp.length < 13){
          saveData.rings.ringsexp.push(0)
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
          levelresettime: new Decimal(saveData.levelresettime ?? 0),
          maxlevelgained: new Decimal(saveData.maxlevelgained ?? 1),


          rank: new Decimal(saveData.rank ?? 0),
          rankresettime: new Decimal(saveData.rankresettime ?? 0),

          crown: new Decimal(saveData.crown ?? 0),
          crownresettime: new Decimal(saveData.crownresettime ?? 0),

          generators: saveData.generators.map(v => new Decimal(v)),
          generatorsBought: saveData.generatorsBought.map(v => new Decimal(v)),
          generatorsCost: saveData.generatorsCost.map(v => new Decimal(v)),

          accelerators: saveData.accelerators.map(v => new Decimal(v)),
          acceleratorsBought: saveData.acceleratorsBought.map(v => new Decimal(v)),
          acceleratorsCost: saveData.acceleratorsCost.map(v => new Decimal(v)),

          darkmoney: new Decimal(saveData.darkmoney),

          darkgenerators: saveData.darkgenerators.map(v => new Decimal(v)),
          darkgeneratorsBought: saveData.darkgeneratorsBought.map(v => new Decimal(v)),
          darkgeneratorsCost: saveData.darkgeneratorsCost.map(v => new Decimal(v)),

          lightmoney: new Decimal(saveData.lightmoney ?? 0),

          lightgenerators: saveData.lightgenerators.map(v => new Decimal(v)),
          lightgeneratorsBought: saveData.lightgeneratorsBought.map(v => new Decimal(v)),
          lightgeneratorsCost: saveData.lightgeneratorsCost.map(v => new Decimal(v)),

          darklevel: new Decimal(saveData.darklevel),


      };

      const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray

      this.player = deepmerge(saveData,this.player,{
        arraymerge:overwriteMerge,
        isMergeableObject:isPlainObject
      })
      console.log(this.player.levelresettime)
      console.log(typeof(this.player.levelresettime))
      this.player.levelresettime.greaterThan(1)

      this.player.currenttab = 'basic'
      if(!this.player.onchallenge || this.player.challengebonuses.includes(4))this.activechallengebonuses = this.player.challengebonuses

      this.checktrophies()
      this.checkmemories()
      this.checkworlds()
      this.countsmalltrophies()
      this.calccommonmult()
      this.findhighestgenerator()

      this.checkpipedsmalltrophies()

      this.countpchallengecleared()

      this.calcgncost()
      this.calcaccost()
      this.calcdgcost()
      this.calclgcost()
      this.checkusedchips()

      if(this.player.rings.auto.doauto){
        this.automissiontimerid = setInterval(this.autoplaymission,1000)
      }else{
        clearInterval(this.automissiontimerid)
        this.automissiontimerid = 0
      }
      if(this.player.rings.outsideauto.autospendshine){
        this.autoshinetimerid = setInterval(this.autoshine,1000)
      }else{
        clearInterval(this.autoshinetimerid)
        this.autoshinetimerid = 0
      }
      if(this.player.rings.outsideauto.autospendbright){
        this.autobrighttimerid = setInterval(this.autobright,1000)
      }else{
        clearInterval(this.autobrighttimerid)
        this.autobrighttimerid = 0
      }
      if(this.player.rings.outsideauto.autodochallenge){
        this.autochallengetimerid = setInterval(this.autochallenge,1000)
      }else{
        clearInterval(this.autochallengetimerid)
        this.autochallengetimerid = 0
      }



    },

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

    calcgncost(){
      for(let i=0;i<8;i++){
        let p = i === 0 ?
        this.player.generatorsBought[0] :
        this.player.generatorsBought[i].add(i + 1).mul(i + 1)
        if(this.player.onchallenge && this.player.challenges.includes(1) && this.player.generatorsBought[i].gt(0)){
          p = p.mul(2)
        }
        p = p.sub(this.eachpipedsmalltrophy[0]*0.2)

        this.player.generatorsCost[i] = new Decimal(10).pow(p)

      }
    },

    calcaccost(){
      for(let i=0;i<8;i++){
        let p = this.player.acceleratorsBought[i].add(1)
        p = p.mul(p.add(1)).div(2)
        p = p.mul(i === 0 ? 1:new Decimal(10).mul(new Decimal(2).pow(i-1)))
        p = p.sub(this.eachpipedsmalltrophy[3]*0.2*(i+1))
        this.player.acceleratorsCost[i] = p.pow_base(10)
      }
    },
    calcdgcost(){
      for(let i=0;i<8;i++){
        let p = 100 + (i==0?0:(i+1)*(i+1)*(i+1))
        let q = this.player.darkgeneratorsBought[i].mul(i+1).mul(i+1)
        q = q.add(p)
        q = q.sub(this.eachpipedsmalltrophy[8]*0.02*(i+1)*(i+1))
        this.player.darkgeneratorsCost[i] = new Decimal(10).pow(q)
      }
    },

    calclgcost(){
      for(let i=0;i<8;i++){
        let p = 200 + (i==0?0:(i+1)*(i+1)*(i+1)*(i+1))
        let q = this.player.lightgeneratorsBought[i].mul(i+1).mul(i+1).mul(i+1)
        q = q.add(p)
        this.player.lightgeneratorsCost[i] = new Decimal(10).pow(q)
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

      if(this.player.onpchallenge&&this.player.pchallenges.includes(0)){
        mult = mult.div(100)
      }

      let x1 = 0.25
      let x2 = 12

      if(this.player.onpchallenge && this.player.pchallenges.includes(7)){
        x1 = 1.0/81
        x2 = 27
      }

      mult = mult.mul(1+this.smalltrophy*0.01+this.memory*x1)

      if(this.player.rankchallengebonuses.includes(11)){
        mult = mult.mul(new Decimal(2).pow(new Decimal(this.memory).div(x2)))
      }

      mult = mult.mul(1+Math.sqrt(this.pipedsmalltrophy))

      if(this.player.onchallenge && this.player.rankchallengebonuses.includes(4)){
        mult = mult.mul(1+this.player.challenges.length*0.25)
      }
      if(!(this.player.onpchallenge && this.player.pchallenges.includes(8))){
        if(this.player.darkmoney.greaterThanOrEqualTo(1)){
          mult = mult.mul(new Decimal(this.player.darkmoney.add(10).log10()).pow(1+this.player.setchip[40]*0.1))
        }
      }

      mult = mult.mul(this.multbyac)
      if(this.multbyac.gt(1)) mult = mult.mul(this.multbyac)

      mult = mult.mul(1+this.player.setchip[0]*0.1)

      for(let i=0;i<setchipkind;i++){
        mult = mult.mul(1+this.player.statue[i]*0.01)
      }

      camp = this.player.accelevelused

      let d = new Date()
      //if(d.getMonth()==4&&3<=d.getDate()&&d.getDate()<=7)camp = camp + 1//ゴールデンウィークキャンペーン
      if(d.getMonth()==0&&d.getDate()<=7){
        camp = camp + 1
        if(this.player.onchallenge && this.player.challenges.includes(3) && this.player.challenges.includes(4)){
         camp = camp + 10
        }
      }//新年キャンペーン
      //if(d.getMonth()==1&&8<=d.getDate()&&d.getDate()<=14)camp = camp + 1//バレンタインキャンペーン
      //if((d.getMonth()==1&&25<=d.getDate()) || ((d.getMonth()==2&&d.getDate()<=3)))camp = camp + 1//桃の節句キャンペーン
      if((d.getMonth()==6&&29<=d.getDate()) || ((d.getMonth()==7&&d.getDate()<=31)))camp = camp + 2//1(2)(3)周年キャンペーン
      //if(d.getMonth()==8&&15<=d.getDate()&&d.getDate()<=21)camp = camp + 1

      if(camp>20)camp=20
      mult = mult.mul(1 + 4 * camp)

      if(this.player.rings.outsideauto.autodochallenge){
        mult = mult.mul(0.001)
      }



      this.commonmult = mult
    },

    calcincrementmult(i,to){
      let mult = this.incrementalmults[i]
      if(!(this.player.onchallenge && this.player.challenges.includes(4))){
        mult = mult.mul(new Decimal(10).pow((i + 1) * (i - to)))
      }

      let lv = new Decimal(this.player.level.pow(1+0.5*this.player.setchip[19]).add(2).log2())


      let rk = this.player.rank.add(2).div(262142).log2()
      rk += new Decimal(this.player.rank.add(2).log2()).log2()*this.player.setchip[23]
      mult = mult.mul(new Decimal(lv.pow((i - to) * (1 + Math.max(rk,0) * 0.05))))

      if(this.player.onpchallenge && this.player.pchallenges.includes(3) && mult.gt("1e-100")){
        let b = Math.floor(mult.log10()/6)
        mult = new Decimal(10).pow(b*6)
      }


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
      if(!(this.player.onpchallenge && this.player.pchallenges.includes(8))){
        if(this.player.darkgenerators[i].greaterThanOrEqualTo(1)){
          mult = mult.mul(new Decimal(i+2+this.player.darkgenerators[i].log10()).pow(1+this.player.setchip[i+32]*0.25))
        }
      }



      mult = mult.mul(1+this.player.setchip[i+1]*0.5)

      if(this.player.onpchallenge && this.player.pchallenges.includes(2)){
        this.incrementalmults[2] = new Decimal(0)
        this.incrementalmults[5] = new Decimal(0)
      }

      this.incrementalmults[i] = mult

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
        mult = mult.mul(1+this.eachpipedsmalltrophy[1]*0.2)
        this.player.accelerators[i - 1] = this.player.accelerators[i - 1].add(this.player.accelerators[i].mul(mult).mul(mu))

      }
    },

    updatedarkgenerators(mu){
      let darkmult = this.player.darklevel.add(1)
      darkmult = this.softCap(darkmult,new Decimal(1e3))
      if(this.player.lightmoney.greaterThanOrEqualTo(1)){
        darkmult = darkmult.mul(this.player.lightmoney.log10()+1)
      }
      let dgtocalc = Array.from(this.player.darkgenerators)
      for(let i = 0; i < 8; i++){
        dgtocalc[i] = dgtocalc[i].mul(this.player.lightgenerators[i].add(1))
      }
      this.player.darkmoney = this.player.darkmoney.add(dgtocalc[0].mul(mu).mul(darkmult).mul(1+this.player.setchip[41]*0.25).mul(1+this.eachpipedsmalltrophy[5]*0.2))
      for (let i = 1; i < 8; i++) {
        this.player.darkgenerators[i - 1] = this.player.darkgenerators[i - 1].add(dgtocalc[i].mul(mu).mul(darkmult).mul(1+this.player.setchip[41+i]*0.25).mul(1+this.eachpipedsmalltrophy[5]*0.2))
      }
    },
    updatelightgenerators(mu){

      this.player.lightmoney = this.player.lightmoney.add(this.player.lightgenerators[0].mul(mu))
      for (let i = 1; i < 8; i++) {
        this.player.lightgenerators[i - 1] = this.player.lightgenerators[i - 1].add(this.player.lightgenerators[i])
      }
    },

    spendshine(num){
      if(this.player.shine<num)return;
      if(this.player.onpchallenge && this.player.pchallenges.includes(6))return
      this.player.shine -= num
      let val = new Decimal(11+this.player.setchip[31]).pow(new Decimal(num).log10())
      this.updategenerators(new Decimal(val))
      this.updateaccelerators(new Decimal(val))
      if(this.player.trophies[9]){
        this.player.residue += Math.floor(num * (1 + this.pchallengestage) / 1000000)
      }
    },
    spendbrightness(num){
      if(this.player.brightness<num)return;
      if(this.player.onpchallenge && this.player.pchallenges.includes(6))return
      this.player.brightness -= num
      let val = new Decimal(11+this.player.setchip[50]).pow(new Decimal(num*100).log10())
      let vald = new Decimal(10+this.player.setchip[51]*0.25).pow(new Decimal(num).log10())
      this.updategenerators(new Decimal(val))
      this.updateaccelerators(new Decimal(val))
      this.updatedarkgenerators(new Decimal(vald))
    },
    spendflicker(num){
      if(this.player.flicker<num)return;
      this.player.flicker -= num
      let val = new Decimal(11+this.player.setchip[50]).pow(new Decimal(num*10000).log10())
      let vald = new Decimal(10+this.player.setchip[51]*0.25).pow(new Decimal(num).log10())
      this.updategenerators(new Decimal(val))
      this.updateaccelerators(new Decimal(val))
      this.updatedarkgenerators(new Decimal(vald))
      this.updatelightgenerators(new Decimal(vald))
    },
    buytype(num){
      if(this.player.shine<this.shinedata.shineshopcost[num] || this.player.boughttype[num]) return;
      if(confirm("本当に型を購入しますか？")){
        this.player.shine -= this.shinedata.shineshopcost[num]
        this.player.boughttype[num] = true
      }
    },
    calctoken(){

      let spent = 0;
      for(let i of this.player.challengebonuses){
        spent += this.challengedata.rewardcost[i]
      }
      let t = this.player.challengecleared.length
      if(this.player.onpchallenge){
        t = Math.max(t,this.player.pchallengecleared[this.getpchallengeid(this.player.pchallenges)])
      }
      this.player.token = t - spent

      let rspent = 0;
      for(let i of this.player.rankchallengebonuses){
        rspent += this.challengedata.rewardcost[i]
      }
      let rt = this.player.rankchallengecleared.length
      if(this.player.onpchallenge){
        rt = Math.max(rt,this.player.prchallengecleared[this.getpchallengeid(this.player.pchallenges)])
      }
      this.player.ranktoken = rt - rspent

    },
    countpchallengecleared(){

      let cnt = 0;
      for(let i=0;i<1024;i++){
        cnt += this.player.pchallengecleared[i]
        cnt += this.player.prchallengecleared[i]
      }

      cnt /= 510;
      this.pchallengestage = Math.floor(cnt);

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

      this.calcgncost()
      this.calcaccost()
      this.calcdgcost()
      this.calclgcost()

      this.updategenerators(new Decimal(1))
      this.updateaccelerators(new Decimal(1))

      this.calctoken()

      let rememberlevel = Math.floor((this.checkremembers()+16)/16)

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
      this.shinepersent += 0.01 * this.eachpipedsmalltrophy[6]
      this.shinepersent += 0.001 * Math.floor(Math.pow(this.player.residue,1/3))
      for(let i=0;i<setchipkind;i++){
        this.shinepersent += 0.01 * this.player.polishedstatue[i]
      }

      let shineget = 0

      let spint = Math.floor(this.shinepersent)
      let spdec = this.shinepersent - spint

      shineget += spint

      if(Math.random()<spdec){
        shineget += 1
      }

      /*let d = new Date()
      if(d.getMonth()==11&&22<=d.getDate()&&d.getDate()<=28){
        if(Math.random()<=0.5){
          shineget = shineget + 1//クリスマスキャンペーン
        }
      } */

      if(this.player.rankchallengebonuses.includes(2)) shineget *= 2
      shineget *= this.player.accelevelused+1

      let maxshine = this.shinedata.getmaxshine(this.player.challengecleared.length,rememberlevel,this.player.polishedstatue)

      this.player.shine = Math.min(this.player.shine + shineget , maxshine)

      this.brightpersent = this.shinedata.getbp(this.player.rankchallengecleared.length)
      this.brightpersent += 0.001 * this.player.setchip[49]
      this.brightpersent += 0.001 * this.eachpipedsmalltrophy[9] * 0.5

      let brightget = 0;

      if(Math.random()<this.brightpersent){
        brightget += 1
      }

      brightget *= this.player.accelevelused+1

      let maxbright = this.shinedata.getmaxbr(this.player.rankchallengecleared.length) * rememberlevel
      this.player.brightness = Math.min(this.player.brightness + brightget , maxbright);

      this.flickerpersent = this.shinedata.getfp(this.pchallengestage)

      let flickerget = 0;

      if(Math.random()<this.flickerpersent){
        flickerget += 1
      }

      flickerget *= this.player.accelevelused+1

      let maxflicker = this.shinedata.getmaxfl(this.pchallengestage)
      this.player.flicker = Math.min(this.player.flicker + flickerget , maxflicker);






      let autorankshine = Math.max(0,1000 - this.checkremembers()*10)

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


      if((this.player.rings.outsideauto.autodochallenge || !this.player.onchallenge ) && this.activechallengebonuses.includes(14) && this.autolevel){
        if(this.player.money.greaterThanOrEqualTo(this.resetLevelborder()) && this.player.level.lt(this.autolevelstopnumber)){
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
      let tsp = 1000
      if(this.player.onpchallenge&&this.player.pchallenges.includes(1)) tsp =10000
      tsp += 500 * this.player.accelevelused
      tsp -= this.player.setchip[9]*50
      tsp -= this.player.levelitems[1]*this.player.challengebonuses.length * (1+this.player.setchip[27]*0.5)
      for(let i=0;i<8;i++){
        tsp -= this.player.timecrystal[i]
      }
      if(tsp<1) tsp = 1
      this.player.tickspeed = tsp / acnum.add(10).mul(amult).log10()

      if(this.player.rankchallengebonuses.includes(9)){
        this.multbyac = new Decimal(50).div(this.player.tickspeed)
        this.player.tickspeed = 50
      }else{
        this.multbyac = new Decimal(1)
      }
      if(this.player.accelevelused == this.player.accelevel && this.player.tickspeed<=10) this.player.accelevel = this.player.accelevel + 1




      setTimeout(this.update, Math.max(this.player.tickspeed-(this.diff+diffm)/2,1));
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
    configpchallenge(index){
      if(this.player.onpchallenge) return;
      if(!this.player.pchallenges.includes(index)){
        this.player.pchallenges.push(index)
      }else{
        this.player.pchallenges.splice(this.player.pchallenges.indexOf(index),1)
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
        this.calcgncost()
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
    buylightgenerator(index){
      if (this.player.money.greaterThanOrEqualTo(this.player.lightgeneratorsCost[index])) {
        this.player.money = this.player.money.sub(this.player.lightgeneratorsCost[index])
        this.player.lightgenerators[index] = this.player.lightgenerators[index].add(1)
        this.player.lightgeneratorsBought[index] = this.player.lightgeneratorsBought[index].add(1)
        this.calclgcost()
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
    autoshine(){
      this.spendshine(this.player.rings.outsideauto.autospendshinenumber)
    },
    autobright(){
      this.spendbrightness(this.player.rings.outsideauto.autospendbrightnumber)
    },
    autochallenge(){
      if(this.player.challengecleared.length==255)return;
      if(this.player.challengecleared.includes(this.getchallengeid(this.player.challenges)) || this.player.challenges.length==0){
        this.showunclearedchallenges()
      }
      if(!this.player.onchallenge){
        this.startChallenge()
      }
    },
    toggleringautobuyer(index){
      if(index==0){
        this.player.rings.outsideauto.autospendshine = !this.player.rings.outsideauto.autospendshine
        if(this.player.rings.outsideauto.autospendshine){
          this.autoshinetimerid = setInterval(this.autoshine,1000)
        }else{
          clearInterval(this.autoshinetimerid)
          this.autoshinetimerid = 0
        }
      }
      if(index==1){
        this.player.rings.outsideauto.autospendbright= !this.player.rings.outsideauto.autospendbright
        if(this.player.rings.outsideauto.autospendbright){
          this.autobrighttimerid = setInterval(this.autobright,1000)
        }else{
          clearInterval(this.autobrighttimerid)
          this.autobrighttimerid = 0
        }
      }
      if(index==2){
        this.player.rings.outsideauto.autodochallenge= !this.player.rings.outsideauto.autodochallenge
        if(this.player.rings.outsideauto.autodochallenge){
          this.autochallengetimerid = setInterval(this.autochallenge,1000)
        }else{
          clearInterval(this.autochallengetimerid)
          this.autochallengetimerid = 0
        }
      }
    },
    configringautobuyer(index){
      let input = window.prompt("消費量を設定:最大1000","")
      input = parseInt(input)
      if(isNaN(input)) return
      if(input<0||input>1000) return
      if(index==0){
        this.player.rings.outsideauto.autospendshinenumber = input
      }
      if(index==1){
        this.player.rings.outsideauto.autospendbrightnumber= input
      }
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
    setrankbonusetype(index){
      if(confirm("現在の上位効力を登録します。よろしいですか？")){
        let ans = []
        for(let i=0;i<15;i++){
          if(this.player.rankchallengebonuses.includes(i)){
            ans.push(i)
          }
        }
        if(index==1){
          this.player.setrankchallengebonusesfst = ans
        }
        if(index==2){
          this.player.setrankchallengebonusessnd = ans
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
    changerankbonusetype(index){
      for(let i=0;i<15;i++){
        if(this.player.rankchallengebonuses.includes(i)){
          this.buyrankRewards(i)
        }
      }
      if(index==1){
        for(let i=0;i<15;i++){
          if(this.player.setrankchallengebonusesfst.includes(i)){
            this.buyrankRewards(i)
          }
        }
      }
      if(index==2){
        for(let i=0;i<15;i++){
          if(this.player.setrankchallengebonusessnd.includes(i)){
            this.buyrankRewards(i)
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
    clearsetchip(){
      for(let i=0;i<100;i++){
        this.chipset(i,0)
      }
    },
    setchiptype(){
      if(confirm('現在の鋳片型を登録します。よろしいですか？')){
        for(let i=0;i<100;i++){
          this.player.setchiptypefst[i] = this.player.setchip[i]
        }
      }
    },
    changechiptype(){
      this.clearsetchip()
      for(let i=0;i<100;i++){
        this.chipset(i,this.player.setchiptypefst[i])
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

      if(this.player.onpchallenge && this.player.pchallenges.includes(4)){

      }
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

      if(this.player.onpchallenge && this.player.pchallenges.includes(4)){
        gainlevel = new Decimal(gainlevel.log2()).max(1)
      }

      gainlevel = gainlevel.round().max(1)

      gainlevel = gainlevel.mul(new Decimal(this.eachpipedsmalltrophy[2]/5.0).pow_base(2))
      if(this.activechallengebonuses.includes(12)) gainlevel = gainlevel.mul(new Decimal(2))
      return gainlevel;
    },

    calcchipretrytime(){

      let retry = 0
      for(let i=0;i<9;i++){
        if(this.player.spendchip[i]>0){
          retry += 1 + Math.log(this.player.spendchip[i]) / Math.log(10-i)
        }
      }
      retry = Math.floor(retry)
      return retry

    },

    configspendchip(i){
      let maxspend = this.player.statue[i] * this.player.statue[i]
      let input = window.prompt("消費数を設定:設定可能最大数:" + maxspend.toString(),"")
      input = parseInt(input)
      if(isNaN(input)) return
      if(input<0 || input> maxspend) return
      this.player.spendchip[i] = input
    },

    haveenoughchip(){
      return this.player.chip.every((x,i) => x>=this.player.spendchip[i])
    },

    calcgainchip(){
      let bonus = new Decimal(10).pow(this.eachpipedsmalltrophy[7]*0.4)
      let clevel = this.chipdata.getcl(this.player.money.mul(bonus))
      return this.chipdata.getchipid(clevel,1 + (this.haveenoughchip()?this.calcchipretrytime():0))
    },

    resetDarklevel(){
      let dv = 18 - this.player.crown.add(2).log2()
      dv = Math.max(dv,1)
      let gaindarklevel = new Decimal(this.player.darkmoney.log10()).div(dv).pow_base(2).round()
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
          new Decimal('1e443'),
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
      let rst = this.player.rankresettime.add(1)
      if(this.player.onpchallenge && this.player.pchallenges.includes(4)){
        rst = rst.pow(0.1).round()
      }
      let gainlevelreset =  rst.mul(1+this.player.setchip[20]).mul(new Decimal(exit?0:this.activechallengebonuses.includes(8)?2:1))


      if (force || confirm('昇段リセットして、段位' + gainlevel + 'を得ますか？')) {

        let disa = this.player.onpchallenge && this.player.pchallenges.includes(9) && (!exit)
        if(this.player.onchallenge) {
          this.player.onchallenge = false;
          if(this.player.challenges.length >= 6){
            this.player.trophies[3] = true;
          }
          let id = this.calcchallengeid()
          if(!this.player.challengecleared.includes(id)){
            this.player.challengecleared.push(this.calcchallengeid())
            disa = false
          }
          this.activechallengebonuses = this.player.challengebonuses;
        }

        if(disa){

          let randomint = Math.floor(Math.random() * 100)
          this.chipset(randomint,0)
          this.player.disabledchip[randomint] = true
        }

        if(this.player.money.greaterThan(1e80)){
          let gainchip = this.calcgainchip()
          console.log(gainchip)
          if(gainchip!=-1 && this.player.chip[gainchip]<10000000){
            let hit = 0
            for(let i=0;i<this.chipused[gainchip];i++){
              let chipdoubleprob = 0.01
              if(Math.random()<chipdoubleprob)hit++;
            }
            hit = Math.min(hit,10)
            let chipgetnum = Math.floor(Math.pow(2,hit))
            chipgetnum = Math.min(chipgetnum,10000000-this.player.chip[gainchip])
            this.player.chip[gainchip] = this.player.chip[gainchip]+chipgetnum
            /*let d = new Date()
            if(d.getMonth()==4&&3<=d.getDate()&&d.getDate()<=7){
              if(gainchip==2)this.player.chip[gainchip] = this.player.chip[gainchip]+4
            }ゴールデンウィークキャンペーン*/
          }
          if(this.haveenoughchip()){
            for(let i=0;i<10;i++){
              this.player.chip[i] -= this.player.spendchip[i]
            }
          }
        }





        this.player.money = new Decimal(1)
        this.player.level = this.player.level.add(exit?new Decimal(0):gainlevel)
        this.player.levelresettime = this.player.levelresettime.add(gainlevelreset)
        this.player.maxlevelgained = this.player.maxlevelgained.max(exit?new Decimal(0):gainlevel)
        if(this.player.accelevel>0){
          for(let i=0;i<8;i++){
          let crystalnum = Math.floor(this.player.accelerators[i].log10()) - 10
          if(crystalnum<0) crystalnum = 0
          if(crystalnum>100) crystalnum = 100
          this.player.timecrystal[i] = Math.max(this.player.timecrystal[i],crystalnum)
          }

        }


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
      let dv = 36-0.25*this.checkremembers()-1.2*this.player.levelitems[4]*(1+0.2*this.player.setchip[29])
      dv = Math.max(dv,6)
      dv = dv-this.player.crown.add(2).log2()*0.1
      dv = Math.max(dv,3)
      let gainrank = new Decimal(this.player.money.log10()).div(dv).pow_base(2).round()
      if(this.player.onpchallenge && this.player.pchallenges.includes(5)){
        gainrank = new Decimal(gainrank.log10()).max(1)
      }
      if(this.player.rankchallengebonuses.includes(12)){
        gainrank = gainrank.mul(3)
      }
      gainrank = gainrank.mul(1+this.player.setchip[22]*0.5)
      gainrank = gainrank.mul(1+this.eachpipedsmalltrophy[4]*0.2)
      return gainrank
    },
    resetLevelborder(){
      let p = (this.player.onchallenge && this.player.challenges.includes(0))?24:18
      return new Decimal(10).pow(p)
    },
    resetRankborder(){
      let p = (this.player.onchallenge && this.player.challenges.includes(0))?96:72
      let q = this.checkremembers()
      if(this.player.onpchallenge&&this.player.pchallenges.includes(7)){
        q = Math.pow(q,0.5)
      }
      p -= Math.min(q/2.0,36)
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
        this.player.rankresettime = this.player.rankresettime.add((this.player.rankchallengebonuses.includes(8)?new Decimal(3):new Decimal(1)).mul(this.player.setchip[24]+1).mul(this.player.crownresettime.add(1)))

        this.player.levelitems = [0,0,0,0,0]

        this.activechallengebonuses = this.player.challengebonuses

        if(this.activechallengebonuses.includes(0))this.player.money = new Decimal(10001)
        if(this.activechallengebonuses.includes(1))this.player.accelerators[0] = new Decimal(10)
        if(this.player.rankchallengebonuses.includes(0))this.player.money = this.player.money.add(new Decimal("1e9"))
        if(this.player.rankchallengebonuses.includes(1))this.player.accelerators[0] = this.player.accelerators[0].add(256)

      }
    },
    calcgaincrown(){
      let dv = 72
      return new Decimal(2).pow(this.player.money.log10()/dv).round()
    },
    resetCrownborder(){
      return new Decimal("1e216")
    },
    resetCrown(force){
      if(this.player.onchallenge){
        alert('現在挑戦中のため、昇冠リセットができません。')
        //あとで消す
        return;
      }
      if(this.player.onchallenge && this.player.challenges.includes(0)){
        if(this.player.money.lt(this.resetCrownborder())){
          alert('現在挑戦1が適用されているため、まだ昇冠リセットができません。')
          return;
        }
      }

      let gaincrown = this.calcgaincrown()
      if(force || confirm('昇冠リセットして、冠位' + gaincrown + 'を得ますか？')){

        this.player.money = new Decimal(1)
        this.player.level = new Decimal(0)
        this.player.levelresettime = new Decimal(0)

        this.player.rank =  new Decimal(0)
        this.player.rankresettime = new Decimal(0)

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

        if(!force){
          this.player.crown = this.player.crown.add(gaincrown)
          this.player.crownresettime = this.player.crownresettime.add(1)
        }

        this.player.tickspeed = 1000

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
    getpchallengeid(arr){
      let challengeid = 0;
      for(let i=9;i>=0;i--){
        challengeid *= 2
        if(arr.includes(i)){
          challengeid += 1
        }
      }
      return challengeid;
    },
    configchallengeweightkind(i){
      this.player.challengeweight[i] = this.calcchallengeid()
    },
    configchallengeweightvalue(i){
      let input = window.prompt("重みを設定","")
      input = parseInt(input)
      if(isNaN(input)) return
      this.player.challengeweightvalue[i] = input
    },
    showunclearedchallenges(){
      if(this.player.challengecleared.length == 255) return;
      if(this.player.onchallenge) return;
      let challengeid = this.calcchallengeid();

      let challengeweightpairs = []
      for(let i=1;i<=255;i++){
        let ans = 0;
        for(let j=0;j<20;j++){

          if((i|this.player.challengeweight[j]) == i){

            ans += this.player.challengeweightvalue[j]
          }
        }
        challengeweightpairs.push({
          id:i,
          weight:ans
        })
      }

      challengeweightpairs.sort((a, b) => a.weight - b.weight)

      console.log(challengeweightpairs)

      do{
        if(challengeid == 0) {
          challengeid = challengeweightpairs[0].id
        }else {
          let idx = challengeweightpairs.findIndex((e) => e.id == challengeid) + 1
          if(idx==255) idx = 0
          challengeid = challengeweightpairs[idx].id
        }
      }while(this.player.challengecleared.includes(challengeid));

      this.player.challenges = this.calcchallengesarray(challengeid)
    },
    showunclearedrankchallenges(){
      if(this.player.rankchallengecleared.length == 255) return;
      if(this.player.onchallenge) return;
      let challengeid = this.calcchallengeid();

      let challengeweightpairs = []
      for(let i=1;i<=255;i++){
        let ans = 0;
        for(let j=0;j<20;j++){

          if((i|this.player.challengeweight[j]) == i){

            ans += this.player.challengeweightvalue[j]
          }
        }
        challengeweightpairs.push({
          id:i,
          weight:ans
        })
      }

      challengeweightpairs.sort((a, b) => a.weight - b.weight)

      do{
        if(challengeid == 0) {
          challengeid = challengeweightpairs[0].id
        }else {
          let idx = challengeweightpairs.findIndex((e) => e.id == challengeid) + 1
          if(idx==255) idx = 0
          challengeid = challengeweightpairs[idx].id
        }
      }while(this.player.rankchallengecleared.includes(challengeid));

      this.player.challenges = this.calcchallengesarray(challengeid)
    },
    calcchallengesarray(challengeid){
      let ans = [];
      for(let i=7;i>=0;i--){
        if(challengeid%2 == 1)ans.push(i)
        challengeid = challengeid >>> 1
      }
      ans.sort()
      return ans
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

      if (this.player.rings.outsideauto.autodochallenge || confirm(conf)) {
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
    startpChallenge(){

      if(!(this.player.challengecleared.length>=255 && this.player.rankchallengecleared.length>=255)){
        alert("まだ挑戦や階位挑戦を完了していないので、完全挑戦を開始できません。")
        return;
      }

      if(this.player.onchallenge){
        alert("現在挑戦中のため、完全挑戦を開始できません。")
        return;
      }

      for(let i=0;i<10;i++){
        if(this.player.statue[i]<this.player.pchallenges.length-i){
          alert("像の作成数が不足しているため、完全挑戦を開始できません。")
          return;
        }
      }


      let conf = '完全挑戦を開始しますか？現在のポイントや発生器、段位や段位リセット、階位などは失われます。'

      if (confirm(conf)) {

        this.resetCrown(true);
        this.player.onpchallenge = true;
        this.player.challengecleared = []
        this.player.challengebonuses = []
        this.player.rankchallengecleared = []
        this.player.rankchallengebonuses = []

      }
    },


    exitChallenge(){
      if (confirm('挑戦を諦めますか？現在のポイントや発生器、時間加速器を引き継いだまま、通常の状態に入ります。')) {
        this.player.onchallenge = false;
        this.activechallengebonuses = this.player.challengebonuses;
        this.calcgncost()
      }
    },

    exitpChallenge(){

      if (confirm('完全挑戦を中断しますか？現在のポイントや発生器、時間加速器を引き継いだまま、通常の状態に入ります。')) {
        if(this.player.onchallenge)this.exitChallenge()
        this.player.onpchallenge = false;
        this.player.pchallengecleared[this.getpchallengeid(this.player.pchallenges)] = Math.max(this.player.pchallengecleared[this.getpchallengeid(this.player.pchallenges)],this.player.challengecleared.length)
        this.player.prchallengecleared[this.getpchallengeid(this.player.pchallenges)] = Math.max(this.player.prchallengecleared[this.getpchallengeid(this.player.pchallenges)],this.player.rankchallengecleared.length)
        this.player.challengecleared = this.challengedata.challengeids
        this.player.rankchallengecleared = this.challengedata.challengeids
        for(let i=0;i<setchipnum;i++){
          this.player.disabledchip[i] = false
        }
        this.countpchallengecleared()



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
        let rg = this.players[i].rings
        let r = this.checkremembers()
        let rd = this.players[i].residue
        let dl = this.players[i].darklevel
        let st = this.players[i].statue
        this.players[i] = initialData()
        this.players[i].remember = u
        this.players[i].rings = rg
        this.players[i].residue = rd
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
        if(r>=57) this.players[i].chip[0] = 1;
        if(r>=58) this.players[i].chip[0] = 15;
        if(r>=59) this.players[i].chip[0] = 55;
        if(r>=60) this.players[i].chip[0] = 120;
        if(r>=61) this.players[i].chip[1] = 1;
        if(r>=62) this.players[i].chip[1] = 15;
        if(r>=63) this.players[i].chip[1] = 55;
        if(r>=64) this.players[i].chip[1] = 120;
        if(r>=65) this.players[i].chip[2] = 1;
        if(r>=66) this.players[i].chip[2] = 15;
        if(r>=67) this.players[i].chip[2] = 55;
        if(r>=68) this.players[i].chip[2] = 120;
        if(r>=69) this.players[i].chip[3] = 1;
        if(r>=70) this.players[i].chip[3] = 15;
        if(r>=71) this.players[i].chip[3] = 55;
        if(r>=72) this.players[i].chip[3] = 120;

        if(r>=73) this.players[i].darklevel = new Decimal(100);
        if(r>=74) this.players[i].brightness = 30000;
        if(r>=75) this.players[i].darklevel = new Decimal(500);
        if(r>=76) this.players[i].shine = 10000000;
        if(r>=77) this.players[i].darklevel = new Decimal(2000);
        if(r>=78) this.players[i].chip[0] += st[0] * 1000
        if(r>=79) this.players[i].chip[1] += st[1] * 1000
        if(r>=80) this.players[i].chip[2] += st[2] * 1000
        if(r>=81) this.players[i].chip[3] += st[3] * 1000






        this.players[i].token = this.players[i].challengecleared.length

        this.checkpipedsmalltrophies()

      }
    },

    calcmaxpipe(){
      if(this.player.trophies[9]) return 3
      if(this.player.trophies[7]) return 2
      return 1

    },

    openpipe(i){

      console.log("a")

      let maxpipe = this.calcmaxpipe()

      if(this.player.worldpipe[i]>=maxpipe)return

      let havepipe = Math.floor((this.smalltrophy-72)/3)
      for(let j=0;j<10;j++){
        havepipe -= this.player.worldpipe[j]
      }



      if(havepipe>0&&this.player.worldpipe[i]<maxpipe)this.player.worldpipe[i] = this.player.worldpipe[i]+1

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
      if(this.player.crownresettime.greaterThan(0))this.player.trophies[7] = true;
      if(this.player.lightgenerators[0].greaterThan(0))this.player.trophies[8] = true;
      if(this.player.flicker>0)this.player.trophies[9] = true;


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
      if(this.player.chip[0]>0)this.player.smalltrophies[85] = true
      if(this.player.chip[0]>=210)this.player.smalltrophies[86] = true
      if(this.player.chip[0]>=1275)this.player.smalltrophies[87] = true
      if(this.player.chip[1]>0)this.player.smalltrophies[88] = true
      if(this.player.chip[1]>=210)this.player.smalltrophies[89] = true
      if(this.player.chip[1]>=1275)this.player.smalltrophies[90] = true
      if(this.player.chip[2]>0)this.player.smalltrophies[91] = true
      if(this.player.chip[2]>=210)this.player.smalltrophies[92] = true
      if(this.player.chip[2]>=1275)this.player.smalltrophies[93] = true
      if(this.player.chip[3]>0)this.player.smalltrophies[94] = true
      if(this.player.chip[3]>=210)this.player.smalltrophies[95] = true
      if(this.player.chip[3]>=1275)this.player.smalltrophies[96] = true
      if(this.player.darklevel.greaterThan(0))this.player.smalltrophies[97] = true
      if(this.player.darklevel.greaterThan('1e3'))this.player.smalltrophies[98] = true
      if(this.player.darklevel.greaterThan('1e10'))this.player.smalltrophies[99] = true

      if(this.player.crownresettime.gt(0)){

        if(this.player.crownresettime.gt(0))this.player.smalltrophies2nd[0] = true
        if(this.player.crownresettime.greaterThanOrEqualTo(5))this.player.smalltrophies2nd[1] = true
        if(this.player.crownresettime.greaterThanOrEqualTo(20))this.player.smalltrophies2nd[2] = true
        if(this.player.crownresettime.greaterThanOrEqualTo(100))this.player.smalltrophies2nd[3] = true
        if(this.player.accelevel>=1)this.player.smalltrophies2nd[4] = true
        if(this.player.accelevel>=3)this.player.smalltrophies2nd[5] = true
        if(this.player.accelevel>=6)this.player.smalltrophies2nd[6] = true
        if(this.player.accelevel>=10)this.player.smalltrophies2nd[7] = true
        if(this.player.rank.gt('1e8'))this.player.smalltrophies2nd[8] = true
        if(this.player.rank.gt('1e10'))this.player.smalltrophies2nd[9] = true
        if(this.player.rank.gt('1e12'))this.player.smalltrophies2nd[10] = true
        if(this.player.lightgenerators[0].greaterThanOrEqualTo(1))this.player.smalltrophies2nd[11] = true
        if(this.player.lightgenerators[1].greaterThanOrEqualTo(1))this.player.smalltrophies2nd[12] = true
        if(this.player.lightgenerators[2].greaterThanOrEqualTo(1))this.player.smalltrophies2nd[13] = true
        if(this.player.lightgenerators[3].greaterThanOrEqualTo(1))this.player.smalltrophies2nd[14] = true
        if(this.player.lightgenerators[4].greaterThanOrEqualTo(1))this.player.smalltrophies2nd[15] = true
        if(this.player.lightgenerators[5].greaterThanOrEqualTo(1))this.player.smalltrophies2nd[16] = true
        if(this.player.lightgenerators[6].greaterThanOrEqualTo(1))this.player.smalltrophies2nd[17] = true
        if(this.player.lightgenerators[7].greaterThanOrEqualTo(1))this.player.smalltrophies2nd[18] = true
        if(this.player.chip[4]>0)this.player.smalltrophies2nd[19] = true
        if(this.player.chip[4]>=210)this.player.smalltrophies2nd[20] = true
        if(this.player.chip[4]>=1275)this.player.smalltrophies2nd[21] = true
        if(this.player.statue[0]>=10)this.player.smalltrophies2nd[22] = true
        if(this.player.statue[1]>=10)this.player.smalltrophies2nd[23] = true
        if(this.player.statue[2]>=10)this.player.smalltrophies2nd[24] = true
        if(this.player.statue[3]>=10)this.player.smalltrophies2nd[25] = true
        if(this.player.crown.greaterThanOrEqualTo(100))this.player.smalltrophies2nd[26] = true
        if(this.player.crown.greaterThanOrEqualTo(10000))this.player.smalltrophies2nd[27] = true
        if(this.player.crown.greaterThanOrEqualTo("1e8"))this.player.smalltrophies2nd[28] = true
        if(this.player.lightmoney.greaterThanOrEqualTo(1))this.player.smalltrophies2nd[29] = true
        if(this.player.lightmoney.greaterThanOrEqualTo("1e9"))this.player.smalltrophies2nd[30] = true
        if(this.player.lightmoney.greaterThanOrEqualTo("1e18"))this.player.smalltrophies2nd[31] = true
        if(this.player.lightmoney.greaterThanOrEqualTo("1e36"))this.player.smalltrophies2nd[32] = true
        if(this.player.flicker>=10)this.player.smalltrophies2nd[33] = true
        if(this.player.flicker>=100)this.player.smalltrophies2nd[34] = true
        if(this.player.flicker>=1000)this.player.smalltrophies2nd[35] = true
        if(this.player.flicker>=10000)this.player.smalltrophies2nd[36] = true
        if(this.player.flicker>=100000)this.player.smalltrophies2nd[37] = true
        if(this.player.flicker>=1000000)this.player.smalltrophies2nd[38] = true
        if(this.player.chip[5]>0)this.player.smalltrophies2nd[39] = true
        if(this.player.chip[5]>=210)this.player.smalltrophies2nd[40] = true
        if(this.player.chip[5]>=1275)this.player.smalltrophies2nd[41] = true
        if(this.player.chip[6]>0)this.player.smalltrophies2nd[42] = true
        if(this.player.chip[6]>=210)this.player.smalltrophies2nd[43] = true
        if(this.player.chip[6]>=1275)this.player.smalltrophies2nd[44] = true
        if(this.player.statue[4]>=10)this.player.smalltrophies2nd[45] = true
        if(this.player.statue[5]>=10)this.player.smalltrophies2nd[46] = true
        if(this.player.statue[6]>=10)this.player.smalltrophies2nd[47] = true
        if(this.player.statue[0]>=64)this.player.smalltrophies2nd[48] = true
        if(this.player.statue[1]>=64)this.player.smalltrophies2nd[49] = true
        if(this.player.statue[2]>=64)this.player.smalltrophies2nd[50] = true
        if(this.player.statue[3]>=64)this.player.smalltrophies2nd[51] = true
        if(this.player.statue[4]>=64)this.player.smalltrophies2nd[52] = true
        if(this.player.statue[5]>=64)this.player.smalltrophies2nd[53] = true
        if(this.player.statue[6]>=64)this.player.smalltrophies2nd[54] = true
        




      }



    },

    chipset(i,j){
      if(this.player.disabledchip[i]) return
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

    calcstatuecost(i){
      return (this.player.statue[i]+1)*10000
    },

    buildstatue(i){
      let cost = this.calcstatuecost(i)
      if(this.player.chip[i] < cost) return
      this.player.chip[i] -= cost
      this.player.statue[i] += 1
    },

    calcpolishcost(i){
      return (this.player.polishedstatue[i]+1) * 1000000
    },

    polishstatue(i){
      let cost = this.calcpolishcost(i)
      if(this.player.polishedstatue[i] >= this.player.statue[i] || this.player.shine < cost)return;
      this.player.shine -= cost
      this.player.polishedstatue[i] += 1
    },

    isavailablering(i){
      if(i==0||i==1||i==2) return true
      if(this.world>=3) return false
      if(i==this.world+3) {
        if(this.player.rings.clearedmission.includes(4)) return true
      }
      return false
    },

    configsetrings(i){
      if(this.player.rings.onmission)return
      if(!this.isavailablering(i))return
      if(this.player.rings.setrings.includes(i)){
        this.player.rings.setrings.splice(this.player.rings.setrings.indexOf(i),1)
      }else{
        this.player.rings.setrings.push(i)
      }
    },

    sleep(ms){
      var startMsec = new Date();
      while (new Date() - startMsec < ms);
    },

    configautomission(){
      this.player.rings.auto.doauto = !this.player.rings.auto.doauto
      if(this.player.rings.auto.doauto){
        this.automissiontimerid = setInterval(this.autoplaymission,1000)
      }else{
        clearInterval(this.automissiontimerid)
        this.automissiontimerid = 0
      }
    },

    autoplaymission(){
      if(this.player.rings.missionstate.turn>=this.ringdata.missioninfo[this.player.rings.missionid].turn)this.endmission()
      if(this.player.rings.onmission){
        this.useskill(0)
      }else {
        this.startmission(this.player.rings.missionid)
      }
    },

    isavailablemission(i){
      return this.ringdata.missioninfo[i].preventchallenge.every((v) => this.player.rings.clearedmission.includes(v))
    },

    startmission(i){
      if(this.player.rings.setrings.length<this.ringdata.missioninfo[i].setsizemin || this.ringdata.missioninfo[i].setsizemax<this.player.rings.setrings.length)return
      if(this.player.rings.onmission)return
      this.player.rings.onmission = true
      this.player.rings.missionid = i
      this.player.rings.missionstate.turn = 0
      this.player.rings.missionstate.activering = 0
      this.player.rings.missionstate.flowerpoint = 0
      this.player.rings.missionstate.snowpoint = 0
      this.player.rings.missionstate.moonpoint = 0
      this.player.rings.missionstate.flowermultiplier = 1
      this.player.rings.missionstate.snowmultiplier = 1
      this.player.rings.missionstate.moonmultiplier = 1
      this.player.rings.missionstate.skilllog = []
      this.player.rings.missionstate.tps = []
      for(let r of this.player.rings.setrings){
        let lv = this.ringdata.getlevel(this.player.rings,r)
        this.player.rings.missionstate.tps.push(this.ringdata.getstatus(r,6,lv))//6:tp status id
      }
      this.player.rings.missionstate.fieldeffect = []
      console.log("Starting mission" + i)
      for(let e of this.ringdata.missioninfo[i].passivefunction){
        this.player.rings.missionstate.fieldeffect.push([e,-1])
      }



    },

    useskill(i){

      let ringid = this.player.rings.setrings[this.player.rings.missionstate.activering]
      let sk = this.ringdata.skills[this.ringdata.availableskills(this.player.rings,ringid)[i]]
      if(sk.tp>this.player.rings.missionstate.tps[this.player.rings.missionstate.activering]) return
      sk.effect(this.player.rings)
      this.player.rings.missionstate.tps[this.player.rings.missionstate.activering] -= sk.tp
      this.player.rings.missionstate.skilllog.push([this.player.rings.setrings[this.player.rings.missionstate.activering],i])

      this.player.rings.missionstate.activering++;
      if(this.player.rings.missionstate.activering==this.player.rings.setrings.length){
        this.player.rings.missionstate.activering = 0;
        this.player.rings.missionstate.turn++;
        for(let e of this.player.rings.missionstate.fieldeffect){
          let eff = this.ringdata.fieldeffects.find((elem) => elem.id == e[0])
          if(eff.timing=="turnend"){
            eff.effect(this.player.rings.missionstate,e[1])
          }
        }
        //this.player.rings.missionstate.fieldeffect.forEach((item, i) => {
          //if(item[1]>=1)item[1]--;
        //});
        //this.player.rings.missionstate.fieldeffect = this.player.rings.missionstate.fieldeffect.filter((e) => e[1]!=0)

      }

    },

    endmission(){
      let win = this.ringpointsum() >= this.ringdata.missioninfo[this.player.rings.missionid].goal
      if((!win) && this.player.rings.missionstate.turn < this.ringdata.missioninfo[this.player.rings.missionid].turn){
        if(!window.confirm("撤退します。よろしいですか？"))return
      }
      this.player.rings.onmission = false
      if(win){
        for(i in this.player.rings.setrings){
          r = this.player.rings.setrings[i]
          this.player.rings.ringsexp[r] += Math.floor(this.ringdata.missioninfo[this.player.rings.missionid].exp * (this.player.rings.setrings.length-i) / (this.player.rings.setrings.length * (this.player.rings.setrings.length+1) / 2))
          this.player.rings.ringsexp[r] = Math.min(this.player.rings.ringsexp[r],this.ringdata.leveltable[this.ringdata.levelcap()-1])
        }
        if(!this.player.rings.clearedmission.includes(this.player.rings.missionid)){
          this.player.rings.clearedmission.push(this.player.rings.missionid)
        }
      }
    },

    ringpointsum(){
      return this.player.rings.missionstate.flowerpoint + this.player.rings.missionstate.snowpoint + this.player.rings.missionstate.moonpoint
    },

    worktime(val){
      if(0<=val&&val<=this.player.accelevel){
        this.player.accelevelused = val
      }
    },

    counttrophies(index){
      let cnt = 0
      for(let i=0;i<trophynum;i++){
        if(this.players[index].trophies[i])cnt++;
      }
      this.trophynumber[index] = cnt

    },
    checkpipedsmalltrophies(){
      let sum = 0
      for(i=0;i<10;i++){
        let cnt = 0
        if(this.players[i].worldpipe[this.world]>=1){
          for(let j=0;j<100;j++){
            if(this.players[i].smalltrophies[j])cnt++;
          }
          for(let j=0;j<100;j++){
            if(this.players[i].smalltrophies2nd[j])cnt++;
          }
          cnt -= 75
          cnt *= this.players[i].worldpipe[this.world]
          if(this.players[i].remember>=10){
            cnt = Math.floor(cnt * (0.1 + this.players[i].remember / 10))
          }
          this.eachpipedsmalltrophy[i] = cnt;
          sum += cnt
        }else{
          this.eachpipedsmalltrophy[i] = 0;
        }
      }
      this.pipedsmalltrophy = sum
    },
    countsmalltrophies(index){
      let cnt = 0;
      for(let i=0;i<100;i++){
        if(this.player.smalltrophies[i])cnt++;
      }
      for(let i=0;i<100;i++){
        if(this.player.smalltrophies2nd[i])cnt++;
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

      this.worldopened[0] = true
      if(new Decimal(this.players[0].crownresettime).gt(0)){
        for(let i=1;i<10;i++){
          this.worldopened[i] = true
        }
      }

      if(this.players[0].challengecleared.includes(238))this.worldopened[1] = true
      if(this.players[0].challengecleared.length>=100)this.worldopened[2] = true
      if(this.players[0].rankchallengecleared.length>=16)this.worldopened[3] = true
      if(this.players[0].levelitembought>=12500)this.worldopened[4] = true
      if(new Decimal(this.players[0].darkmoney).greaterThanOrEqualTo('1e8'))this.worldopened[5] = true
      if(new Decimal(this.players[0].rank).greaterThanOrEqualTo(262142))this.worldopened[6] = true
      if(this.players[0].rankchallengecleared.includes(238))this.worldopened[7] = true
      if(this.players[0].challengecleared.length>=200)this.worldopened[8] = true
      if(this.players[0].rankchallengecleared.length>=200)this.worldopened[9] = true

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
