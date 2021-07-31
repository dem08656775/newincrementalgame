const tweetbutton = document.getElementById("tweet");
console.log(tweetbutton);
var val = 0;

var player = {
  money: new Decimal(0)

};

function update(){
  player.money = player.money.add(1)
  document.getElementById("coinamount").textContent = 'ポイント: '+player.money

  //ツイートボタン壊して付ける
  while (tweetbutton.firstChild){
    tweetbutton.removeChild(tweetbutton.firstChild);
  }
  const anchor = document.createElement('a');
  anchor.setAttribute('data-hashtags', '新しい放置ゲーム');
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text','ポイント:'+player.money+'\n'+'dem08656775.github.io/newincrementalgame'+'\n');
  anchor.innerText = 'Tweet #新しい放置ゲーム';
  tweetbutton.appendChild(anchor);

  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetbutton.appendChild(script);

  setTimeout(update, 1000)
}

function save(){
  localStorage.setItem("playerStored", JSON.stringify(player));
}

function load() {
	$.extend(true, player, JSON.parse(localStorage.getItem("playerStored")));
  player.money = new Decimal(player.money)
}

load()

setTimeout(update, 1000)

setInterval(save,2000)
