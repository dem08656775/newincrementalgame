export const exportsave = (self) => {
  self.exported = btoa(JSON.stringify(self.players));
};

export const exportsavefile = (self) => {
  let result = btoa(JSON.stringify(self.players));
  const file = new Blob([result], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = `newincremantal_savedata${new Date()}.txt`;
  a.click();
};

export const save = (self) => {
  self.players[self.world] = self.player;

  localStorage.setItem("playerStored", JSON.stringify(self.player));
  localStorage.setItem("playerStoredb", btoa(JSON.stringify(self.players)));

  console.log("save succeeded" + Date.now());
};

export const importsave = (self) => {
  let input = window.prompt("データを入力", "");
  if (input.length <= 50) {
    console.log("returned");
    return;
  }
  let k = atob(input).charAt(0);
  console.log(k);
  if (k == "{") return;
  localStorage.setItem("playerStoredb", input);
  dataload(self);
  load(self, 0);
};
