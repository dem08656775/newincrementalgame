function Shinedata(){

   this.getp = function(clear){
     if(clear>=32*8-1) return 0.20
     if(clear>=32*7) return 0.16
     if(clear>=32*6) return 0.13
     if(clear>=32*5) return 0.10
     if(clear>=32*4) return 0.07
     if(clear>=32*3) return 0.04
     if(clear>=32*2) return 0.02
     return 0

   }

   this.getbp = function(clear){
     if(clear>=32*8-1) return 0.010
     if(clear>=32*7) return 0.008
     if(clear>=32*6) return 0.006
     if(clear>=32*5) return 0.005
     if(clear>=32*4) return 0.004
     if(clear>=32*3) return 0.003
     if(clear>=32*2) return 0.002
     if(clear>=32*1) return 0.001
     return 0
   }

   this.getfp = function(stage){
     return 1/1000000 * stage
   }

   this.getmaxshine = function(clear,remlv,pst){
    let value = 0;
    if(clear>=32*8-1) value =  10000000
    else if(clear>=32*7) value = 3000000
    else if(clear>=32*6) value = 1000000
    else if(clear>=32*5) value = 700000
    else if(clear>=32*4) value = 400000
    else if(clear>=32*3) value = 200000
    else if(clear>=32*2) value = 100000
    else value = 0
    value *= remlv

    let statuemul = 0;
    for(let i=0;i<10;i++){
     statuemul += pst[i]
    }
    value += (value/10) * statuemul

    return Math.floor(value)
   }

   this.getmaxbr = function(clear,memlv,pst){
     let value = 0;
     if(clear>=32*8-1) value =  10000
     else if(clear>=32*7) value = 6000
     else if(clear>=32*6) value = 3500
     else if(clear>=32*5) value = 2000
     else if(clear>=32*4) value = 1200
     else if(clear>=32*3) value = 700
     else if(clear>=32*2) value = 300
     else if(clear>=32) value = 100
     else value = 0
     value *= memlv

     let statuemul = 0;
     for(let i=0;i<10;i++){
      statuemul += Math.floor(pst[i]/10)
     }
     value += (value/10) * statuemul

     return Math.floor(value)
   }

   this.getmaxfl = function(stage){
     return stage * stage * 2
     //max:2097152
   }

   this.shineshopcost = [
     50000,
     100000,
     100000,
     300000,
     300000,
     5000000,
   ]

   this.rankrewardtext = [
     "モード型登録",
     "効力型登録1",
     "効力型登録2",
     "上位効力型登録1",
     "上位効力型登録2",
     "鋳片型効力",
   ]

}
