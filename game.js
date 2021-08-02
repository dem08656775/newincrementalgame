const tweetbutton = document.getElementById("tweet");
console.log(tweetbutton);
var val = 0;
var version = 1;
var tickspeed = 1000;

var firstplayer = {
  money: new Decimal(1),
  level: new Decimal(0),
  levelresettime: new Decimal(0),
  generator1: new Decimal(0),
  generator1bought: new Decimal(0),
  generator1cost: new Decimal(1),
  generator1mode: 0,
  generator2: new Decimal(0),
  generator2bought: new Decimal(0),
  generator2cost: new Decimal('1e4'),
  generator2mode: 1,
  generator3: new Decimal(0),
  generator3bought: new Decimal(0),
  generator3cost: new Decimal('1e9'),
  generator3mode: 2,
  generator4: new Decimal(0),
  generator4bought: new Decimal(0),
  generator4cost: new Decimal('1e16'),
  generator4mode: 3,
  generator5: new Decimal(0),
  generator5bought: new Decimal(0),
  generator5cost: new Decimal('1e25'),
  generator5mode:4,
  generator6: new Decimal(0),
  generator6bought: new Decimal(0),
  //generator6cost: 工事中,
  generator7: new Decimal(0),
  generator7bought: new Decimal(0),
  //generator7cost: 工事中,
  generator8: new Decimal(0),
  generator8bought: new Decimal(0),
  //generator8cost: 工事中,

  accelerator1: new Decimal(0),
  accelerator1bought: new Decimal(0),
  accelerator1cost: new Decimal(10),
  accelerator2: new Decimal(0),
  accelerator2bought: new Decimal(0),
  accelerator2cost: new Decimal('1e10'),

  tickspeed: 1000,

  saveversion: version

}

var player = $.extend(true,{},firstplayer)

function update(){

  for(let i=1;i<=5;i++){
    let to = eval("player.generator"+i+"mode");
    let mult = new Decimal(10).pow(i*(i-to-1));
    mult = mult.mul(player.levelresettime.add(1))
    mult = mult.mul(player.level.pow(i-to-1))
    if(eval("player.generator"+i).greaterThan(eval("player.generator"+i+"bought"))){
      mult = mult.mul(eval("player.generator"+i+"bought"))
    }

    if(to==0) player.money = player.money.add(eval("player.generator"+i).mul(mult))
    else player["generator"+to] = eval("player.generator"+to).add(eval("player.generator"+i).mul(mult))
  }

  player.generator5 = player.generator5.add(player.generator6)
  player.generator6 = player.generator6.add(player.generator7)
  player.generator7 = player.generator7.add(player.generator8)
  player.accelerator1 = player.accelerator1.add(player.accelerator2)
  tickspeed = 1000 / player.accelerator1.add(10).log10()
  updatetext()
  setTimeout(update, tickspeed)
}

function updatetext(){
  $("#coinamount").text('ポイント: '+ player.money.toExponential(3))
  $("#tickspeed").text('間隙: ' + Math.round(tickspeed) + '毛秒')

  for(let i=1;i<=5;i++){
    let objg = "#generator" + i;
    $(objg).text('発生器'+i+': '+eval("player.generator"+i).toExponential(3))
    let objb = "#button" + i;
    $(objb).text('購入　コスト: '+eval("player.generator"+i+"cost").toExponential(1))
    let objgb = "#generator" + i + "bought"
    $(objgb).text('購入数: '+eval("player.generator"+i+"bought"))
    if(i!=1){
      let objm = "#generator" + i + "mode";
      $(objm).text('モード: '+eval("player.generator"+i+"mode"))
    }
  }



  $("#accelerator1").text('時間加速器1: ' + player.accelerator1)
  $("#abutton1").text('購入　コスト: ' + player.accelerator1cost.toExponential(1))
  $("#accelerator2").text('時間加速器2: ' + player.accelerator2)
  $("#abutton2").text('購入　コスト: ' + player.accelerator2cost.toExponential(1))


  for (let i = 1; i <= 8; i++){
    let obj = "#button" + i;
    let cost = "player.generator" + i + "cost";
    if (player.money.lt(eval(cost)) || typeof(eval(cost)) == "undefined"){
      // 買えない
      $(obj).css("background-color", '#B0B0B0');
    }else{
      // 買える
      $(obj).css("background-color", '#FFFFFF');
    }
  }

  for (let i = 1; i <= 2; i++){
    let obj = "#abutton" + i;
    let cost = "player.accelerator" + i + "cost";
    if (player.money.lt(eval(cost)) || typeof(eval(cost)) == "undefined"){
      // 買えない
      $(obj).css("background-color", "#808080");
    }else{
      // 買える
      $(obj).css("background-color", "#000000");
    }
  }

  if(player.money.greaterThanOrEqualTo('1e18')){
    $("#levelreset").css('display','block')
  }else{
    $("#levelreset").css('display','none')
  }

  if(player.levelresettime.notEquals(0)){
    $(".levelrcontents").css('display','block')
    $("#level").text('段位: '+player.level+'　'+'段位リセット: '+player.levelresettime+'回')
  }else{
    $(".levelrcontents").css('display','none')
  }


  if (!tweetbutton.firstChild){
    const anchor = document.createElement('a');
    anchor.className = 'twitter-hashtag-button';
    anchor.innerText = 'Tweet #新しい放置ゲーム';
    tweetbutton.appendChild(anchor);
  }
  tweetbutton.firstChild.setAttribute('href','https://twitter.com/intent/tweet?text=ポイント:'+player.money+'%0Adem08656775.github.io/newincrementalgame%0A&hashtags=新しい放置ゲーム');
}

function calcbought(){
  var v = player.generator1cost.toNumber()
  player.generator1bought = new Decimal(0)
  while(v>1){
    v /= 10;
    player.generator1bought = player.generator1bought.add(1)
  }
}

function save(){
  console.log(JSON.stringify(player))
  localStorage.setItem("playerStored", JSON.stringify(player));
}

function load() {
	$.extend(true, player, JSON.parse(localStorage.getItem("playerStored")));
  player.money = new Decimal(player.money)
  player.level = new Decimal(player.level)
  player.levelresettime = new Decimal(player.levelresettime)
  for(let i=1;i<=5;i++){
    let pj = "player.generator"
    player["generator"+i] = new Decimal(eval(pj+i))
    player["generator"+i+"bought"] = new Decimal(eval(pj+i+"bought"))
    player["generator"+i+"mode"] = parseInt(eval(pj+i+"mode"))
    let v = eval(pj+i+"bought")
    if(i == 1) player["generator"+i+"cost"] = new Decimal(10).pow(v)
    else player["generator"+i+"cost"] = new Decimal(10).pow(v.mul(i).add(i*i))
  }

  player.generator6 = new Decimal(player.generator6)
  player.generator7 = new Decimal(player.generator7)
  player.generator8 = new Decimal(player.generator8)
  player.accelerator1 = new Decimal(player.accelerator1)
  player.accelerator1bought = new Decimal(player.accelerator1bought)
  player.accelerator1cost = new Decimal(10).pow(player.accelerator1bought.add(1).mul(player.accelerator1bought.add(2)).div(2))
  player.accelerator2 = new Decimal(player.accelerator2)
  player.accelerator2bought = new Decimal(player.accelerator2bought)
  player.accelerator2cost = new Decimal('1e10').pow(player.accelerator2bought.add(1).mul(player.accelerator2bought.add(2)).div(2))
  player.saveversion = version
  calcbought()


}

load()

$("#levelreset").on('click',function(){
  let gainlevel = new Decimal(player.money.log10()).div(18).pow_base(2).round()
  if(confirm('段位リセットして、段位' + gainlevel + 'を得ますか？')){
    let nextlevel = player.level.add(gainlevel)
    let nextlevelresettime = player.levelresettime.add(new Decimal(1))
    player = $.extend(true,{},firstplayer)
    player.level = nextlevel
    player.levelresettime = nextlevelresettime
    updatetext()
  }
})

$("#button1").on('click',function(){
  if(player.money.greaterThanOrEqualTo(player.generator1cost)){
    player.money = player.money.sub(player.generator1cost)
    player.generator1 = player.generator1.add(1)
    player.generator1bought = player.generator1bought.add(1)
    player.generator1cost = new Decimal(10).pow(player.generator1bought)
    updatetext()
  }
})

$("#button2").on('click',function(){
  if(player.money.greaterThanOrEqualTo(player.generator2cost)){
    player.money = player.money.sub(player.generator2cost)
    player.generator2 = player.generator2.add(1)
    player.generator2bought = player.generator2bought.add(1)
    player.generator2cost = new Decimal(10).pow(player.generator2bought.add(2).mul(2))
    updatetext()
  }
})

$("#button3").on('click',function(){
  if(player.money.greaterThanOrEqualTo(player.generator3cost)){
    player.money = player.money.sub(player.generator3cost)
    player.generator3 = player.generator3.add(1)
    player.generator3bought = player.generator3bought.add(1)
    player.generator3cost = new Decimal(10).pow(player.generator3bought.add(3).mul(3))
    updatetext()
  }
})

$("#button4").on('click',function(){
  if(player.money.greaterThanOrEqualTo(player.generator4cost)){
    player.money = player.money.sub(player.generator4cost)
    player.generator4 = player.generator4.add(1)
    player.generator4bought = player.generator4bought.add(1)
    player.generator4cost = new Decimal(10).pow(player.generator4bought.add(4).mul(4))
    updatetext()
  }
})

$("#button5").on('click',function(){
  if(player.money.greaterThanOrEqualTo(player.generator5cost)){
    player.money = player.money.sub(player.generator5cost)
    player.generator5 = player.generator5.add(1)
    player.generator5bought = player.generator5bought.add(1)
    player.generator5cost = new Decimal(10).pow(player.generator5bought.add(5).mul(5))
    updatetext()
  }
})

$("#abutton1").on('click',function(){
  if(player.money.greaterThanOrEqualTo(player.accelerator1cost)){
    player.money = player.money.sub(player.accelerator1cost)
    player.accelerator1 = player.accelerator1.add(1)
    player.accelerator1bought = player.accelerator1bought.add(1)
    player.accelerator1cost = player.accelerator1cost.mul(player.accelerator1bought.add(1).pow_base(10))
    updatetext()
  }
})

$("#abutton2").on('click',function(){
  if(player.money.greaterThanOrEqualTo(player.accelerator2cost)){
    player.money = player.money.sub(player.accelerator2cost)
    player.accelerator2 = player.accelerator2.add(1)
    player.accelerator2bought = player.accelerator2bought.add(1)
    player.accelerator2cost = new Decimal('1e10').pow(player.accelerator2bought.add(1).mul(player.accelerator2bought.add(2)).div(2))
    updatetext()
  }
})

$("#modebutton2").on('click',function(){
  player.generator2mode += 1
  if(player.generator2mode == 2) player.generator2mode = 0
  updatetext()
})

$("#modebutton3").on('click',function(){
  player.generator3mode += 1
  if(player.generator3mode == 3) player.generator3mode = 0
  updatetext()
})

$("#modebutton4").on('click',function(){
  player.generator4mode += 1
  if(player.generator4mode == 4) player.generator4mode = 0
  updatetext()
})

$("#modebutton5").on('click',function(){
  player.generator5mode += 1
  if(player.generator5mode == 5) player.generator5mode = 0
  updatetext()
})




$("#resetbutton").on('click',function(){
  if(confirm('リセット？')){
    player = $.extend(true,{},firstplayer)
    updatetext()
  }
})

setTimeout(update, tickspeed)

setInterval(save,2000)
