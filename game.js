const tweetbutton = document.getElementById("tweet");
console.log(tweetbutton);
var val = 0;
var version = 1;
var tickspeed = 1000;

var firstplayer = {
  money: new Decimal(1),
  generator1: new Decimal(0),
  generator1bought: new Decimal(0),
  generator1cost: new Decimal(1),
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
  //generator4cost: 工事中,
  generator5: new Decimal(0),
  generator5bought: new Decimal(0),
  //generator5cost: 工事中,
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

  tickspeed: 1000,

  saveversion: version

}

var player = $.extend(true,{},firstplayer)

function update(){
  player.money = player.money.add(player.generator1)
  if(player.generator2mode == 0)player.money = player.money.add(player.generator2.mul(1e2))
  if(player.generator2mode == 1)player.generator1 = player.generator1.add(player.generator2)
  if(player.generator3mode == 0)player.money = player.money.add(player.generator3.mul(1e6))
  if(player.generator3mode == 1)player.generator1 = player.generator1.add(player.generator3.mul(1e3))
  if(player.generator3mode == 2)player.generator2 = player.generator2.add(player.generator3)
  player.generator3 = player.generator3.add(player.generator4)
  player.generator4 = player.generator4.add(player.generator5)
  player.generator5 = player.generator5.add(player.generator6)
  player.generator6 = player.generator6.add(player.generator7)
  player.generator7 = player.generator7.add(player.generator8)
  tickspeed = 1000 / player.accelerator1.add(10).log10()
  console.log(tickspeed)
  updatetext()
  setTimeout(update, tickspeed)
}

function updatetext(){
  $("#coinamount").text('ポイント: '+ player.money.toExponential(3))
  $("#tickspeed").text('間隙: ' + Math.round(tickspeed) + '毛秒')
  $("#generator1").text('発生器1: ' + player.generator1)
  $("#generator2").text('発生器2: ' + player.generator2)
  $("#generator3").text('発生器3: ' + player.generator3)
  $("#accelerator1").text('時間加速器1: ' + player.accelerator1)
  $("#button1").text('購入　コスト: ' + player.generator1cost.toExponential(1))
  $("#button2").text('購入　コスト: ' + player.generator2cost.toExponential(1))
  $("#button3").text('購入　コスト: ' + player.generator3cost.toExponential(1))
  $("#abutton1").text('購入　コスト: ' + player.accelerator1cost.toExponential(1))
  $("#generator2mode").text('モード: '+player.generator2mode)
  $("#generator3mode").text('モード: '+player.generator3mode)

  for (let i = 1; i <= 8; i++){
    let obj = "#button" + i;
    let cost = "player.generator" + i + "cost";
    if (player.money.lt(eval(cost)) || typeof(eval(cost)) == "undefined"){
      // 買えない
      $(obj).css("background-color", "#B3E5FC");
    }else{
      // 買える
      $(obj).css("background-color", "#03A9F4");
    }
  }

  for (let i = 1; i <= 1; i++){
    let obj = "#abutton" + i;
    let cost = "player.accelerator" + i + "cost";
    if (player.money.lt(eval(cost)) || typeof(eval(cost)) == "undefined"){
      // 買えない
      $(obj).css("background-color", "#CFD8DC");
    }else{
      // 買える
      $(obj).css("background-color", "#37474F");
    }
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
  player.generator1 = new Decimal(player.generator1)
  player.generator1bought = new Decimal(player.generator1bought)
  player.generator1cost = new Decimal(player.generator1cost)
  player.generator2 = new Decimal(player.generator2)
  player.generator2bought =  new Decimal(player.generator2bought)
  player.generator2cost = new Decimal(player.generator2cost)
  player.generator2mode = parseInt(player.generator2mode)
  player.generator3 = new Decimal(player.generator3)
  player.generator3bought =  new Decimal(player.generator3bought)
  player.generator3cost = new Decimal(player.generator3cost)
  player.generator4 = new Decimal(player.generator4)
  player.generator5 = new Decimal(player.generator5)
  player.generator6 = new Decimal(player.generator6)
  player.generator7 = new Decimal(player.generator7)
  player.generator8 = new Decimal(player.generator8)
  player.accelerator1 = new Decimal(player.accelerator1)
  player.accelerator1bought = new Decimal(player.accelerator1bought)
  player.accelerator1cost = new Decimal(10).pow(player.accelerator1bought.add(1).mul(player.accelerator1bought.add(2)).div(2))
  player.saveversion = version
}

load()

$("#button1").on('click',function(){
  if(player.money.greaterThanOrEqualTo(player.generator1cost)){
    player.money = player.money.sub(player.generator1cost)
    player.generator1 = player.generator1.add(1)
    player.generator1bought = player.generator1bought.add(1)
    player.generator1cost = player.generator1cost.mul(10)
    updatetext()
  }
})

$("#button2").on('click',function(){
  if(player.money.greaterThanOrEqualTo(player.generator2cost)){
    player.money = player.money.sub(player.generator2cost)
    player.generator2 = player.generator2.add(1)
    player.generator2bought = player.generator2bought.add(1)
    player.generator2cost = player.generator2cost.mul(100)
    updatetext()
  }
})

$("#button3").on('click',function(){
  if(player.money.greaterThanOrEqualTo(player.generator3cost)){
    player.money = player.money.sub(player.generator3cost)
    player.generator3 = player.generator3.add(1)
    player.generator3bought = player.generator3bought.add(1)
    player.generator3cost = player.generator3cost.mul(1000)
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




$("#resetbutton").on('click',function(){
  if(confirm('リセット？')){
    player = $.extend(true,{},firstplayer)
    updatetext()
  }
})

setTimeout(update, tickspeed)

setInterval(save,2000)
