var val = 0;

var player = {
  money: new Decimal(0)

};

function update(){
  player.money = player.money.add(1)
  document.getElementById("coinamount").textContent = 'ポイント: '+player.money
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
