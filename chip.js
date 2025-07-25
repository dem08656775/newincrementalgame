function Chipdata(){

  this.calcchipretrytime = function(data){
    let retry = 0
    for(let i=0;i<9;i++){
      if(data.player.spendchip[i]>0){
        retry += 1 + Math.log(data.player.spendchip[i]) / Math.log(10-i)
      }
    }
    retry = Math.floor(retry)
    return retry
  }

  this.calcgainchip = function(data){
    let bonus = new Decimal(10).pow(data.eachpipedsmalltrophy[7]*0.4)
    if(data.player.activatedcampaigns.includes("tanabata2")){
      bonus = bonus.mul(data.player.lightmoney.add(1))
    }
    console.log("bonus"+bonus)
    let clevel = this.getcl(data.player.money.mul(bonus))
    return this.getchipid(clevel,1 + (this.haveenoughchip(data)?this.calcchipretrytime(data):0))
  }

  this.haveenoughchip = function(data){
      return data.player.chip.every((x,i) => x>=data.player.spendchip[i])
  }

  this.calcchipgetnum = function(data,kind){

    let hit = 0
    for(let i=0;i<data.chipused[kind];i++){
      let chipdoubleprob = 0.01 * (1 + 0.1 * data.eachpipedsmalltrophy[11])
      if(Math.random()<chipdoubleprob)hit++;
    }
    hit = Math.min(hit,10)
    let chipgetnum = Math.floor(Math.pow(2,hit))

    //ゴールデンウィークキャンペーン
    if(data.player.activatedcampaigns.includes("gw2")){
      if(kind == 2)chipgetnum = chipgetnum + 4
    }

    chipgetnum = Math.min(chipgetnum,10000000-data.player.chip[kind])

    return chipgetnum

  }

  this.getcl = function(mny){
    if(mny.greaterThanOrEqualTo("1e350")) return 22
    if(mny.greaterThanOrEqualTo("1e325")) return 21
    if(mny.greaterThanOrEqualTo("1e300")) return 20
    if(mny.greaterThanOrEqualTo("1e275")) return 19
    if(mny.greaterThanOrEqualTo("1e250")) return 18
    if(mny.greaterThanOrEqualTo("1e240")) return 17
    if(mny.greaterThanOrEqualTo("1e230")) return 16
    if(mny.greaterThanOrEqualTo("1e220")) return 15
    if(mny.greaterThanOrEqualTo("1e210")) return 14
    if(mny.greaterThanOrEqualTo("1e200")) return 13
    if(mny.greaterThanOrEqualTo("1e190")) return 12
    if(mny.greaterThanOrEqualTo("1e180")) return 11
    if(mny.greaterThanOrEqualTo("1e170")) return 10
    if(mny.greaterThanOrEqualTo("1e160")) return 9
    if(mny.greaterThanOrEqualTo("1e150")) return 8
    if(mny.greaterThanOrEqualTo("1e140")) return 7
    if(mny.greaterThanOrEqualTo("1e130")) return 6
    if(mny.greaterThanOrEqualTo("1e120")) return 5
    if(mny.greaterThanOrEqualTo("1e110")) return 4
    if(mny.greaterThanOrEqualTo("1e100")) return 3
    if(mny.greaterThanOrEqualTo("1e90")) return 2
    if(mny.greaterThanOrEqualTo("1e80")) return 1
    return 0
  }

  this.ptable = [
    [1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01],

    [0.85,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01],
    [0.65,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01],
    [0.40,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01],
    [0.30,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01],

    [0.20,0.95,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01],
    [0.05,0.80,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01],
    [0.00,0.65,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01],
    [0.00,0.55,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01],

    [0.00,0.45,0.95,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01],
    [0.00,0.25,0.85,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01],
    [0.00,0.15,0.60,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01],
    [0.00,0.10,0.40,1.01,1.01,1.01,1.01,1.01,1.01,1.01,1.01],

    [0.00,0.00,0.20,0.95,1.01,1.01,1.01,1.01,1.01,1.01,1.01],
    [0.00,0.00,0.15,0.85,1.01,1.01,1.01,1.01,1.01,1.01,1.01],
    [0.00,0.00,0.10,0.70,1.01,1.01,1.01,1.01,1.01,1.01,1.01],
    [0.00,0.00,0.05,0.60,1.01,1.01,1.01,1.01,1.01,1.01,1.01],
    [0.00,0.00,0.00,0.50,1.01,1.01,1.01,1.01,1.01,1.01,1.01],

    [0.00,0.00,0.00,0.40,0.95,1.01,1.01,1.01,1.01,1.01,1.01],
    [0.00,0.00,0.00,0.30,0.95,1.01,1.01,1.01,1.01,1.01,1.01],

    [0.00,0.00,0.00,0.20,0.95,0.99,1.01,1.01,1.01,1.01,1.01],
    [0.00,0.00,0.00,0.20,0.93,0.98,1.01,1.01,1.01,1.01,1.01],

    [0.00,0.00,0.00,0.20,0.90,0.97,0.995,1.01,1.01,1.01,1.01],



  ]

  this.getchipid = function(lv,time){
    let d = Math.random()
    let table = this.ptable[lv].map((x) => Math.pow(x,time))
    console.log(table)
    for(let i=0;i<=10;i++){
      if(table[i]>d){
        return i-1
      }
    }
  }

  this.chipname = [
    "銅",
    "銀",
    "金",
    "白金",
    "紫鋼",
    "朱鋼",
    "蒼鋼",
    "翠鋼",
    "聖銀",
    "覇金",
  ]

  this.chipbonusname =[
    "発生器効率",
    "発生器1効率",
    "発生器2効率",
    "発生器3効率",
    "発生器4効率",
    "発生器5効率",
    "発生器6効率",
    "発生器7効率",
    "発生器8効率",
    "間隙",
    "時間加速器1効率",
    "時間加速器2効率",
    "時間加速器3効率",
    "時間加速器4効率",
    "時間加速器5効率",
    "時間加速器6効率",
    "時間加速器7効率",
    "時間加速器8効率",
    "段位入手量",
    "段位効率",
    "段位リセット入手量",
    "段位リセット効率(工事中)",
    "階位入手量",
    "階位効率",
    "階位リセット入手量",
    "階位リセット効率(工事中)",
    "段位効力1効率",
    "段位効力2効率",
    "段位効力3効率",
    "段位効力5効率",
    "輝き入手割合",
    "輝き使用効率",
    "裏発生器1強化",
    "裏発生器2強化",
    "裏発生器3強化",
    "裏発生器4強化",
    "裏発生器5強化",
    "裏発生器6強化",
    "裏発生器7強化",
    "裏発生器8強化",
    "裏ポイント強化",
    "裏発生器1生産強化",
    "裏発生器2生産強化",
    "裏発生器3生産強化",
    "裏発生器4生産強化",
    "裏発生器5生産強化",
    "裏発生器6生産強化",
    "裏発生器7生産強化",
    "裏発生器8生産強化",
    "煌き入手割合",
    "煌き使用効率",
    "煌き使用効率裏(工事中)",






  ]





}
