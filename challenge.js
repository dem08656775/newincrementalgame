export function Challengedata() {
  this.challengetext = [
    "昇段リセットは1e24ポイントから可能になります。",
    "発生器は高速に値上がりします。",
    "発生器購入数による強化は無効になります。",
    "発生器のモードは0に固定されます。",
    "段位によらない基礎的な下位モード強化は無効となります。",
    "時間加速器は購入できません。",
    "発生器4と8は購入できません。",
    "段位リセット回数による強化は無効になります。",
  ];
  this.rewardtext = [
    "昇段リセット後1e4ポイント獲得",
    "昇段リセット後10個の時間加速器1獲得",
    "番号が最高の発生器にも購入数ボーナスが働く",
    "全発生器の生産力が2倍に",
    "挑戦中でも効力を有効に",
    "発生器自動購入器を入手",
    "時間加速器1に購入数ボーナスが働く",
    "発生器1の生産力が一度に取得した最大段位数倍に(上限:100000)",
    "段位リセット回数の増加分が2倍に",
    "時間加速器自動購入器を入手",
    "時間加速器2に購入数ボーナスが働く",
    "発生器の購入数ボーナスが強化",
    "リセット時の段位取得数が2倍に",
    "発生器は同時に全てのモードとなる",
    "自動昇段リセット器を入手",
  ];
  this.rewardcost = [1, 2, 4, 8, 8, 8, 16, 16, 16, 16, 32, 32, 32, 32, 32];
  this.rankrewardtext = [
    "昇段リセット後1e9ポイント獲得",
    "昇段リセット後256個の時間加速器1獲得",
    "輝きの一度の入手数が2つに",
    "全発生器の生産力が3倍に",
    "受けている挑戦の数に応じて発生器が少し強化",
    "段位効力自動購入器を入手",
    "時間加速器3以降に購入数ボーナスが働く",
    "効力8が上限以降も少しだけ強化",
    "階位リセット回数の増加分が3倍に",
    "間隙が50毛秒に固定(発生器の生産力変化)",
    "時間加速器の購入数ボーナスが強化",
    "記憶が入手数に応じてさらに強化",
    "リセット時の階位取得数が3倍に",
    "全時間加速器が間隙に影響",
    "自動昇階リセット器を入手",
  ];
  this.challengeids = [
    128, 64, 32, 16, 8, 4, 2, 1, 192, 160, 96, 144, 80, 48, 136, 72, 40, 24,
    132, 68, 36, 20, 12, 130, 66, 34, 18, 10, 6, 129, 65, 33, 17, 9, 5, 3, 224,
    208, 176, 112, 200, 168, 104, 152, 88, 56, 196, 164, 100, 148, 84, 52, 140,
    76, 44, 28, 194, 162, 98, 146, 82, 50, 138, 74, 42, 26, 134, 70, 38, 22, 14,
    193, 161, 97, 145, 81, 49, 137, 73, 41, 25, 133, 69, 37, 21, 13, 131, 67,
    35, 19, 11, 7, 240, 232, 216, 184, 120, 228, 212, 180, 116, 204, 172, 108,
    156, 92, 60, 226, 210, 178, 114, 202, 170, 106, 154, 90, 58, 198, 166, 102,
    150, 86, 54, 142, 78, 46, 30, 225, 209, 177, 113, 201, 169, 105, 153, 89,
    57, 197, 165, 101, 149, 85, 53, 141, 77, 45, 29, 195, 163, 99, 147, 83, 51,
    139, 75, 43, 27, 135, 71, 39, 23, 15, 248, 244, 236, 220, 188, 124, 242,
    234, 218, 186, 122, 230, 214, 182, 118, 206, 174, 110, 158, 94, 62, 241,
    233, 217, 185, 121, 229, 213, 181, 117, 205, 173, 109, 157, 93, 61, 227,
    211, 179, 115, 203, 171, 107, 155, 91, 59, 199, 167, 103, 151, 87, 55, 143,
    79, 47, 31, 252, 250, 246, 238, 222, 190, 126, 249, 245, 237, 221, 189, 125,
    243, 235, 219, 187, 123, 231, 215, 183, 119, 207, 175, 111, 159, 95, 63,
    254, 253, 251, 247, 239, 223, 191, 127, 255,
  ];

  this.pchallengetext = [
    "発生器の倍率が1/100になります。",
    "間隙のベースは10000毛秒になります。",
    "発生器3と6は生産をしません。",
    "倍率は6桁毎に切り捨てられます。",
    "段位と段位リセットの入手量は大幅に減少します。",
    "階位の入手量は大幅に減少します。",
    "輝きと煌きは使用できません。",
    "記憶と思い出は大幅に弱体化されます。",
    "裏発生器と裏ポイントは発生器を強化しません。",
    "鋳片効力は、新規挑戦達成でない段位リセットを行うごとにランダムで1つが無効になります。",
  ];
  this.prewardtext = [];
  this.prewardcost = [];
}
