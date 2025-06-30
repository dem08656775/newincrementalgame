function Timedata(){

	this.calctickspeed = function(data){                                                                                                      

	  let amult = new Decimal(1)
      if(data.activechallengebonuses.includes(6)){
        if(data.player.rankchallengebonuses.includes(10)){
          amult = amult.mul(data.player.acceleratorsBought[0].pow_base(2))
        }else{
          amult = amult.mul(data.player.acceleratorsBought[0].add(1))
        }
      }

	  let acnum = data.player.accelerators[0].mul(new Decimal(1.5).pow(data.player.setchip[10]))

      if(data.player.rankchallengebonuses.includes(13)){
        for(let i=1;i<8;i++){
          acnum = acnum.mul(data.player.accelerators[i].add(1))
        }
      }


      //this.player.tickspeed = 10
      let tsp = 1000
      if(data.player.onpchallenge&&data.player.pchallenges.includes(1)) tsp =10000
      tsp += 500 * data.player.accelevelused
      tsp -= data.player.setchip[9]*50
      tsp -= data.player.levelitems[1]*data.player.challengebonuses.length * (1+data.player.setchip[27]*0.5)
      for(let i=0;i<8;i++){
        tsp -= data.player.timecrystal[i]
      }
      if(tsp<1) tsp = 1
      tsp /= acnum.add(10).mul(amult).log10()

  	  return tsp
	}

	this.campaigns = [

		"新年キャンペーン",
		"バレンタインキャンペーン",
		"ひなまつりキャンペーン",
		"ゴールデンウィークキャンペーン",
		"七夕キャンペーン",
		"周年キャンペーン",
		"シルバーウィークキャンペーン",
		"クリスマスキャンペーン",
		"新年キャンペーン2025",
		"ゴールデンウィークキャンペーン2",
		"七夕キャンペーン2",
		"クリスマスキャンペーン2",

		

	]

	this.campaignnames = [

		"newyear",
		"vt",
		"hina",
		"gw",
		"tanabata",
		"aniv",
		"sw",
		"xmas",
		"newyear2025",
		"gw2",
		"tanabata2",
		"xmas2"

	]

	this.campaigneffects = [

		"発生器の倍率が+4倍",
		"発生器の倍率が+4倍",
		"発生器の倍率が+4倍",
		"発生器の倍率が+4倍",
		"発生器の倍率が+4倍",
		"発生器の倍率が+8倍",
		"発生器の倍率が+4倍",
		"発生器の倍率が+4倍",
		"挑戦4と5を含む挑戦中、発生器の倍率が+40倍",
		"金片の入手数が+4個",
		"天上ポイントが獲得鋳片に影響",
		"輝き系の入手時、50%の確率で入手数+1"

	]

	this.campaigncosts = [
		1,
		1,
		1,
		1,
		1,
		2,
		1,
		1,
		3,
		2,
		4,
		2
	]



}