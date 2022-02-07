function Chipdata(){



  this.getcl = function(mny){
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
    [1.01,1.01,1.01,1.01,1.01],
    [0.85,1.01,1.01,1.01,1.01],
    [0.65,1.01,1.01,1.01,1.01],
    [0.40,1.01,1.01,1.01,1.01],
    [0.30,1.01,1.01,1.01,1.01],
    [0.20,0.95,1.01,1.01,1.01],
    [0.05,0.80,1.01,1.01,1.01],
    [0.00,0.65,1.01,1.01,1.01],
    [0.00,0.55,1.01,1.01,1.01],
    [0.00,0.45,0.95,1.01,1.01],
    [0.00,0.25,0.85,1.01,1.01],
    [0.00,0.15,0.60,1.01,1.01],
    [0.00,0.10,0.40,1.01,1.01],
    [0.00,0.00,0.20,0.95,1.01],
  ]

  this.getchipid = function(lv){
    let d = Math.random()
    for(let i=0;i<5;i++){
      if(this.ptable[lv][i]>d){
        return i-1
      }
    }
  }

  this.chipname = [
    "銅片",
    "銀片",
    "金片",
    "白金片"
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
    "段位リセット入手量(工事中)",
    "段位リセット効率(工事中)",
    "階位入手量(工事中)",
    "階位効率(工事中)",
    "階位リセット入手量",
    "階位リセット効率(工事中)",
    "段位効力1効率",
    "段位効力2効率",
    "段位効力3効率",
    "段位効力5効率(工事中)",
    "輝き入手割合",
    "輝き使用効率(工事中)",
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
    "煌き使用効率(工事中)",
    "煌き使用効率裏(工事中)",





  ]





}
