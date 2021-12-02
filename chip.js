function Chipdata(){



  this.getcl = function(mny){
    if(mny.greaterThanOrEqualTo("1e200")) return 9
    if(mny.greaterThanOrEqualTo("1e190")) return 8
    if(mny.greaterThanOrEqualTo("1e180")) return 7
    if(mny.greaterThanOrEqualTo("1e170")) return 6
    if(mny.greaterThanOrEqualTo("1e160")) return 5
    if(mny.greaterThanOrEqualTo("1e150")) return 4
    if(mny.greaterThanOrEqualTo("1e140")) return 3
    if(mny.greaterThanOrEqualTo("1e130")) return 2
    if(mny.greaterThanOrEqualTo("1e120")) return 1
    return 0
  }

  this.ptable = [
    [1.01,1.01,1.01,1.01,1.01],
    [0.85,1.01,1.01,1.01,1.01],
    [0.65,1.01,1.01,1.01,1.01],
    [0.40,1.01,1.01,1.01,1.01],
    [0.20,0.95,1.01,1.01,1.01],
    [0.05,0.80,1.01,1.01,1.01],
    [0.00,0.65,1.01,1.01,1.01],
    [0.00,0.45,0.95,1.01,1.01],
    [0.00,0.25,0.85,1.01,1.01],
    [0.00,0.15,0.60,1.01,1.01]
  ]

  this.getchipid = function(lv){
    let d =Math.random()
    for(let i=0;i<5;i++){
      if(this.ptable[lv][i]>d){
        return i-1
      }
    }
  }

  this.chipname = [
    "銅片",
    "銀片",
    "金片"
  ]





}
