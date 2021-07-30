var val = 0;

var player = {
  money:　new Decimal(0)
};

function update(){
  player.money = player.money.add(1)
  document.getElementById("coinamount").textContent = player.money
  setTimeout(update, 1000)
}

setTimeout(update, 1000)
