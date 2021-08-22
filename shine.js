function Shinedata(){

   this.getp = function(clear){
     if(clear>=32*8) return 0.10
     if(clear>=32*7) return 0.08
     if(clear>=32*6) return 0.06
     if(clear>=32*5) return 0.04
     if(clear>=32*4) return 0.03
     if(clear>=32*3) return 0.02
     if(clear>=32*2) return 0.01
     return 0

   }

   this.getmaxshine = function(clear){
     if(clear>=32*8) return 1000000
     if(clear>=32*7) return 300000
     if(clear>=32*6) return 100000
     if(clear>=32*5) return 70000
     if(clear>=32*4) return 40000
     if(clear>=32*3) return 20000
     if(clear>=32*2) return 10000
     return 0
   }

}
