const tweetbutton = document.getElementById("tweet");
console.log(tweetbutton);
var val = 0;

var firstplayer = {
  money: new Decimal(1),
  generator1: new Decimal(0),
  generator2: new Decimal(0),
  generator3: new Decimal(0),
  generator4: new Decimal(0),
  generator5: new Decimal(0),
  generator6: new Decimal(0),
  generator7: new Decimal(0),
  generator8: new Decimal(0),
  generator1cost: new Decimal(1),
}
var player = $.extend(true,{},firstplayer)

function update(){
  player.money = player.money.add(player.generator1)
  updatetext()
  setTimeout(update, 1000)
}

function updatetext(){
  $("#coinamount").text('ポイント: '+ player.money.toExponential(3))
  $("#generator1").text('発生器1: ' + player.generator1)
  $("#button1").text('購入　コスト: ' + player.generator1cost.toExponential(1))

  if (!tweetbutton.firstChild){
    const anchor = document.createElement('a');
    anchor.className = 'twitter-hashtag-button';
    anchor.innerText = 'Tweet #新しい放置ゲーム';
    tweetbutton.appendChild(anchor);
  }

  tweetbutton.firstChild.setAttribute('href','https://twitter.com/intent/tweet?text=ポイント:'+player.money+'%0Adem08656775.github.io/newincrementalgame%0A&hashtags=新しい放置ゲーム');
}

function save(){
  localStorage.setItem("playerStored", JSON.stringify(player));
  console.log(JSON.stringify(player))
}

function load() {
	$.extend(true, player, JSON.parse(localStorage.getItem("playerStored")));
  player.money = new Decimal(player.money)
  player.generator1 = new Decimal(player.generator1)
  player.generator2 = new Decimal(player.generator2)
  player.generator3 = new Decimal(player.generator3)
  player.generator4 = new Decimal(player.generator4)
  player.generator5 = new Decimal(player.generator5)
  player.generator6 = new Decimal(player.generator6)
  player.generator7 = new Decimal(player.generator7)
  player.generator8 = new Decimal(player.generator8)
  player.generator1cost = new Decimal(player.generator1cost)

}

load()

$("#button1").on('click',function(){
  console.log(player.generator1cost)
  if(player.money.greaterThanOrEqualTo(player.generator1cost)){
    player.money = player.money.sub(player.generator1cost)
    player.generator1 = player.generator1.add(1)
    player.generator1cost = player.generator1cost.mul(10)

  }
  updatetext()
})

$("#resetbutton").on('click',function(){
  player = $.extend(true,{},firstplayer)
  updatetext()
})

setTimeout(update, 1000)

setInterval(save,2000)
