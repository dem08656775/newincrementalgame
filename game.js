const tweetbutton = document.getElementById("tweet");
console.log(tweetbutton);
var val = 0;
var version = 1;

var firstplayer = {
  money: new Decimal(1),
  generator1: new Decimal(0),
  generator1bought: new Decimal(0),
  generator1cost: new Decimal(1),
  generator2: new Decimal(0),
  generator2bought: new Decimal(0),
  generator2cost: new Decimal('1e4'),
  generator3: new Decimal(0),
  generator3bought: new Decimal(0),
  generator3cost: new Decimal('1e9'),
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

  saveversion: version

}
var player = $.extend(true,{},firstplayer)

function update(){
  player.money = player.money.add(player.generator1)
  player.generator1 = player.generator1.add(player.generator2)
  player.generator2 = player.generator2.add(player.generator3)
  player.generator3 = player.generator3.add(player.generator4)
  player.generator4 = player.generator4.add(player.generator5)
  player.generator5 = player.generator5.add(player.generator6)
  player.generator6 = player.generator6.add(player.generator7)
  player.generator7 = player.generator7.add(player.generator8)
  updatetext()
  setTimeout(update, 1000)
}

function updatetext(){
  $("#coinamount").text('ポイント: '+ player.money.toExponential(3))
  $("#generator1").text('発生器1: ' + player.generator1)
  $("#generator2").text('発生器2: ' + player.generator2)
  $("#generator3").text('発生器3: ' + player.generator3)
  $("#button1").text('購入　コスト: ' + player.generator1cost.toExponential(1))
  $("#button2").text('購入　コスト: ' + player.generator2cost.toExponential(1))
  $("#button3").text('購入　コスト: ' + player.generator3cost.toExponential(1))
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
  player.generator3 = new Decimal(player.generator3)
  player.generator3bought =  new Decimal(player.generator3bought)
  player.generator3cost = new Decimal(player.generator3cost)
  player.generator4 = new Decimal(player.generator4)
  player.generator5 = new Decimal(player.generator5)
  player.generator6 = new Decimal(player.generator6)
  player.generator7 = new Decimal(player.generator7)
  player.generator8 = new Decimal(player.generator8)
  if(player.saveversion<1){
    calcbought()
  }
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


$("#resetbutton").on('click',function(){
  if(confirm('リセット？')){
    player = $.extend(true,{},firstplayer)
    updatetext()
  }
})

setTimeout(update, 1000)

setInterval(save,2000)
