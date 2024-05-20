function Ringdata(){

  this.statusdatatype = [
    [17,10,10,5,1,1,12],//51
    [9,15,9,2,6,2,12],//53
    [8,8,13,3,3,7,12],//55
    [12,12,7,4,4,1,15],//49
    [10,6,10,5,2,5,15],//50
    [5,8,8,3,6,6,15],//51
  ]

  this.statustable = function(fst){
    let ret = [fst]

    for(let i=1;i<98;i++){
      ret[i] = ret[i-1]*1.05+fst*0.1
    }
    for(let i=0;i<99;i++){
      ret[i] = Math.floor(ret[i]*fst*0.1)
    }
    return ret

  }

  this.getstatus = function(ringid,statusid,level){
    return this.statustable(this.statusdatatype[ringid][statusid])[level-1]
  }

  this.shortgetstatus = function(rings,statusid){
    state = rings.missionstate
    ringid = rings.setrings[state.activering]
    level = this.getlevel(rings,ringid)
    return this.getstatus(ringid,statusid,level)
  }

  this.leveltable = [
    0, 14, 67, 189, 417, 796, 1385, 2256, 3495, 5194,
    7449, 10367, 14064, 18673, 24338, 31213, 39456, 49232, 60719, 74105,
    89597, 107407, 127757, 150872, 176987, 206352, 239230, 275897, 316633, 361726,
    411470, 466173, 526159, 591762, 663324, 741194, 825727, 917289, 1016263, 1123042,
    1238030, 1361637, 1494279, 1636380, 1788381, 1950737, 2123911, 2308375, 2504604, 2713085,
    2934314, 3168807, 3417087, 3679688, 3957145, 4250004, 4558822, 4884172, 5226639, 5586815,
    5965299, 6362697, 6779625, 7216713, 7674605, 8153958, 8655429, 9179685, 9727401, 10299267,
    10895987, 11518275, 12166853, 12842447, 13545792, 14277637, 15038744, 15829888, 16651852, 17505424,
    18391398, 19310581, 20263796, 21251876, 22275666, 23336015, 24433777, 25569820, 26745022, 27960279,
    29216495, 30514581, 31855451, 33240033, 34669264, 36144098, 37665500, 39234441, 40851900, Infinity
  ],
  /*:generation
  new Array(99).fill(null).map((n,i) => Math.sin(i)*5 + i*10)
  .map((sum = 0, n => sum += n))
  .map((sum = 0, n => sum += n))
  .map((sum = 0, n => sum += n))
  .map((v) => Math.floor(v))
  */

  this.levelcap = function(rings){
    return 30
  }

  this.getlevel = function(rings,id){
    let exp = rings.ringsexp[id]
    let lv = 0
    for(let i=0;i<this.leveltable.length;i++){
      if(exp>=this.leveltable[i]){
        lv = i
      }
    }
    lv += 1
    return Math.min(lv,this.levelcap(rings))
  },

  this.levelskills = [
    {
      1:0,
      5:1,
      8:4,
      12:7,
      17:10,
      23:13,
    },
    {
      1:0,
      5:2,
      8:5,
      12:8,
      17:11,
      23:14,
    },
    {
      1:0,
      5:3,
      8:6,
      12:9,
      17:12,
      23:15,
    },
    {
      1:0,
      4:1,
      6:2,
      8:4,
      10:5,
      12:7,
      14:8
    },
    {
      1:0,
      4:1,
      6:3,
      8:4,
      10:6,
      12:7,
      14:9
    },
    {
      1:0,
      4:2,
      6:3,
      8:5,
      10:6,
      12:8,
      14:9
    },

  ]

  this.missioninfo = [
    {
      //id:0
      name:"試練1",
      turn:5,
      goal:500,
      exp:12,
      setsizemin:1,
      setsizemax:3,
      passivefunction:[],
      preventchallenge:[]
    },
    {
      //id:1
      name:"試練2",
      turn:10,
      goal:1500,
      exp:30,
      setsizemin:1,
      setsizemax:3,
      passivefunction:[],
      preventchallenge:[0]
    },
    {
      //id:2
      name:"試練3",
      turn:15,
      goal:3000,
      exp:48,
      setsizemin:1,
      setsizemax:3,
      passivefunction:[],
      preventchallenge:[1]
    },
    {
      //id:3
      name:"試練4",
      turn:20,
      goal:6000,
      exp:90,
      setsizemin:1,
      setsizemax:3,
      passivefunction:[],
      preventchallenge:[2]
    },
    {
      //id:4
      name:"試練5",
      turn:20,
      goal:12000,
      exp:120,
      setsizemin:1,
      setsizemax:3,
      passivefunction:[],
      preventchallenge:[3],
    },
    {
      //id:5
      name:"花試練1",
      turn:10,
      goal:7000,
      exp:80,
      setsizemin:1,
      setsizemax:1,
      passivefunction:[1],
      preventchallenge:[4]
    },
    {
      //id:6
      name:"雪試練1",
      turn:10,
      goal:7000,
      exp:80,
      setsizemin:1,
      setsizemax:1,
      passivefunction:[2],
      preventchallenge:[4],
    },
    {
      //id:7
      name:"月試練1",
      turn:10,
      goal:7000,
      exp:80,
      setsizemin:1,
      setsizemax:1,
      passivefunction:[3],
      preventchallenge:[4]
    },
    {
      //id:8
      name:"花試練2",
      turn:20,
      goal:23000,
      exp:200,
      setsizemin:1,
      setsizemax:1,
      passivefunction:[1],
      preventchallenge:[5]
    },
    {
      //id:9
      name:"雪試練2",
      turn:20,
      goal:23000,
      exp:200,
      setsizemin:1,
      setsizemax:1,
      passivefunction:[2],
      preventchallenge:[6],
    },
    {
      //id:10
      name:"月試練2",
      turn:20,
      goal:23000,
      exp:200,
      setsizemin:1,
      setsizemax:1,
      passivefunction:[3],
      preventchallenge:[7]
    },
    {
      //id:11
      name:"試練6",
      turn:20,
      goal:65000,
      exp:360,
      setsizemin:1,
      setsizemax:3,
      passivefunction:[],
      preventchallenge:[8,9,10],
    },
    {
      //id:12
      name:"試練7",
      turn:20,
      goal:140000,
      exp:480,
      setsizemin:1,
      setsizemax:3,
      passivefunction:[],
      preventchallenge:[11],
    },
    {
      //id:13
      name:"試練8",
      turn:30,
      goal:350000,
      exp:1920,
      setsizemin:1,
      setsizemax:3,
      passivefunction:[],
      preventchallenge:[12],
    },
  ]

  this.availableskills = function(rings,r){
    let ret = []
    let level = this.getlevel(rings,r)
    for(let i in this.levelskills[r]){
      if(i<=level){
        ret.push(this.levelskills[r][i])
      }
    }
    return ret
  }

  this.affect = function (st,pr,vl){
    v = {
      state:st,
      prop:pr,
      value:vl
    }
    for(e of state.fieldeffect){
      if(e[0].timing == "skilluse"){
        eff = this.fieldeffects.find((elem) => elem.id ==e[0])
        eff.effect(v)
      }
    }
    v.state[v.prop] += v.value
  }

  this.affectfield = function(st,i,vl){
    v = {
      state:st,
      value:vl
    }
    v.state.fieldeffect.push([i,vl])
  }

  this.fieldeffects =[
    {
      id:1,
      timing:"skilluse",
      effect:(v) =>{
        if(v.prop=='flowerpoint')v.value = Math.floor(v.value * 1.5)
      },
      description:"花の評価上昇量1.5倍"
    },
    {
      id:2,
      timing:"skilluse",
      effect:(v) =>{
        if(v.prop=='snowpoint')v.value = Math.floor(v.value * 1.5)
      },
      description:"雪の評価上昇量1.5倍"
    },
    {
      id:3,
      timing:"skilluse",
      effect:(v) =>{
        if(v.prop=='moonpoint')v.value = Math.floor(v.value * 1.5)
      },
      description:"月の評価上昇量1.5倍"
    },
    {
      id:4,
      timing:"turnend",
      effect:(v,val) =>{
        console.log("boot")
        v.flowerpoint += val
      },
      description:"花の評価上昇"
    },
    {
      id:5,
      timing:"turnend",
      effect:(v,val) =>{
        v.snowpoint += val
      },
      description:"雪の評価上昇"
    },
    {
      id:6,
      timing:"turnend",
      effect:(v,val) =>{
        v.moonpoint += val
      },
      description:"月の評価上昇"
    },
  ]

  this.skills =[
    {
      name:"通常",
      tp:0,
      effect:(rings) => {
        state = rings.missionstate
        ringid = rings.setrings[state.activering]
        level = this.getlevel(rings,ringid)
        this.affect(state,'flowerpoint',Math.floor(state.flowermultiplier * this.getstatus(ringid,0,level)))
        this.affect(state,'snowpoint',Math.floor(state.snowmultiplier * this.getstatus(ringid,1,level)))
        this.affect(state,'moonpoint',Math.floor(state.moonmultiplier * this.getstatus(ringid,2,level)))

      },
    },
    {
      name:"花増幅",
      tp:8,
      effect:(rings) => {
        state = rings.missionstate
        ringid = rings.setrings[state.activering]
        level = this.getlevel(rings,ringid)
        this.affect(state,'flowermultiplier',this.getstatus(ringid,3,level) * 0.01)
      }
    },
    {
      name:"雪増幅",
      tp:8,
      effect:(rings) => {
        state = rings.missionstate
        ringid = rings.setrings[state.activering]
        level = this.getlevel(rings,ringid)
        this.affect(state,'snowmultiplier',this.getstatus(ringid,4,level) * 0.01)
      }
    },
    {
      name:"月増幅",
      tp:8,
      effect:(rings) => {
        state = rings.missionstate
        ringid = rings.setrings[state.activering]
        level = this.getlevel(rings,ringid)
        this.affect(state,'moonmultiplier',this.getstatus(ringid,5,level) * 0.01)
      }
    },
    //id:4
    {
      name:"花昇華",
      tp:15,
      effect:(rings) => {
        state = rings.missionstate
        ringid = rings.setrings[state.activering]
        level = this.getlevel(rings,ringid)
        this.affect(state,'flowerpoint',Math.floor(state.flowermultiplier * this.getstatus(ringid,0,level)*5))
      }
    },
    {
      name:"雪昇華",
      tp:15,
      effect:(rings) => {
        state = rings.missionstate
        ringid = rings.setrings[state.activering]
        level = this.getlevel(rings,ringid)
        this.affect(state,'snowpoint',Math.floor(state.snowmultiplier * this.getstatus(ringid,1,level)*5))
      }
    },
    {
      name:"月昇華",
      tp:15,
      effect:(rings) => {
        state = rings.missionstate
        ringid = rings.setrings[state.activering]
        level = this.getlevel(rings,ringid)
        this.affect(state,'moonpoint',Math.floor(state.moonmultiplier * this.getstatus(ringid,2,level)*5))
      }
    },
    //id:7
    {
      name:"花爆発",
      tp:20,
      effect:(rings) => {
        state = rings.missionstate
        ringid = rings.setrings[state.activering]
        level = this.getlevel(rings,ringid)
        this.affect(state,'flowerpoint',Math.floor(state.flowermultiplier * this.getstatus(ringid,0,level)*12))
        this.affect(state,'flowermultiplier',Math.max(-0.20,0.50-state.flowermultiplier))
      }
    },
    {
      name:"雪爆発",
      tp:20,
      effect:(rings) => {
        state = rings.missionstate
        ringid = rings.setrings[state.activering]
        level = this.getlevel(rings,ringid)
        this.affect(state,'snowpoint',Math.floor(state.snowmultiplier * this.getstatus(ringid,1,level)*12))
        this.affect(state,'snowmultiplier',Math.max(-0.20,0.50-state.snowmultiplier))
      }
    },
    {
      name:"月爆発",
      tp:20,
      effect:(rings) => {
        state = rings.missionstate
        ringid = rings.setrings[state.activering]
        level = this.getlevel(rings,ringid)
        this.affect(state,'moonpoint',Math.floor(state.moonmultiplier * this.getstatus(ringid,2,level)*12))
        this.affect(state,'moonmultiplier',Math.max(-0.20,0.50-state.moonmultiplier))
      }
    },
    //id:10
    {
      name:"花拡散",
      tp:20,
      effect:(rings) => {
        state = rings.missionstate
        ringid = rings.setrings[state.activering]
        level = this.getlevel(rings,ringid)
        this.affect(state,'flowermultiplier',-0.20)
        this.affect(state,'snowmultiplier',0.10)
        this.affect(state,'moonmultiplier',0.10)
      }
    },
    {
      name:"雪拡散",
      tp:20,
      effect:(rings) => {
        state = rings.missionstate
        ringid = rings.setrings[state.activering]
        level = this.getlevel(rings,ringid)
        this.affect(state,'snowmultiplier',-0.20)
        this.affect(state,'flowermultiplier',0.10)
        this.affect(state,'moonmultiplier',0.10)
      }
    },
    {
      name:"月拡散",
      tp:20,
      effect:(rings) => {
        state = rings.missionstate
        ringid = rings.setrings[state.activering]
        level = this.getlevel(rings,ringid)
        this.affect(state,'moonmultiplier',-0.20)
        this.affect(state,'flowermultiplier',0.10)
        this.affect(state,'snowmultiplier',0.10)
      }
    },
    //id:13
    {
      name:"花充満",
      tp:45,
      effect:(rings) => {
        this.affectfield(state,4,Math.floor(state.flowermultiplier * this.getstatus(ringid,0,level)))
      }
    },
    {
      name:"雪充満",
      tp:45,
      effect:(rings) => {
        this.affectfield(state,5,Math.floor(state.snowmultiplier * this.getstatus(ringid,1,level)))
      }
    },
    {
      name:"月充満",
      tp:45,
      effect:(rings) => {
        this.affectfield(state,6,Math.floor(state.moonmultiplier * this.getstatus(ringid,2,level)))
      }
    },
  ]

}
