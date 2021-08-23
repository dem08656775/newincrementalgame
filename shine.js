function Shinedata(){

   this.getp = function(clear){
     if(clear>=32*8) return 0.20
     if(clear>=32*7) return 0.16
     if(clear>=32*6) return 0.13
     if(clear>=32*5) return 0.10
     if(clear>=32*4) return 0.07
     if(clear>=32*3) return 0.04
     if(clear>=32*2) return 0.02
     return 0

   }

   this.getmaxshine = function(clear){
     if(clear>=32*8) return 10000000
     if(clear>=32*7) return 3000000
     if(clear>=32*6) return 1000000
     if(clear>=32*5) return 700000
     if(clear>=32*4) return 400000
     if(clear>=32*3) return 200000
     if(clear>=32*2) return 100000
     return 0
   }

}
