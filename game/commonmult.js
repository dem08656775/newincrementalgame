import Decimal from "../break_eternity.esm.js";
import { softCap } from "./lib/softCap.js";

export const calccommonmult = (self) => {
  let mult = new Decimal(1);
  if (!(self.player.onchallenge && self.player.challenges.includes(7))) {
    let cap = new Decimal(100).mul(
      self.player.levelitems[2] * (1 + self.player.setchip[28] * 0.3) + 1
    );
    mult = mult.mul(softCap(self.player.levelresettime.add(1), cap));
  }

  if (self.activechallengebonuses.includes(3)) {
    mult = mult.mul(new Decimal(2));
  }

  if (self.player.rankchallengebonuses.includes(3)) {
    mult = mult.mul(new Decimal(3));
  }

  if (self.player.onpchallenge && self.player.pchallenges.includes(0)) {
    mult = mult.div(100);
  }

  let x1 = 0.25;
  let x2 = 12;

  if (self.player.onpchallenge && self.player.pchallenges.includes(7)) {
    x1 = 1.0 / 81;
    x2 = 27;
  }

  mult = mult.mul(1 + self.smalltrophy * 0.01 + self.memory * x1);

  if (self.player.rankchallengebonuses.includes(11)) {
    mult = mult.mul(new Decimal(2).pow(new Decimal(self.memory).div(x2)));
  }

  mult = mult.mul(1 + Math.sqrt(self.pipedsmalltrophy));

  if (self.player.onchallenge && self.player.rankchallengebonuses.includes(4)) {
    mult = mult.mul(1 + self.player.challenges.length * 0.25);
  }
  if (!(self.player.onpchallenge && self.player.pchallenges.includes(8))) {
    if (self.player.darkmoney.greaterThanOrEqualTo(1)) {
      mult = mult.mul(
        new Decimal(self.player.darkmoney.add(10).log10()).pow(
          1 + self.player.setchip[40] * 0.1
        )
      );
    }
  }

  mult = mult.mul(self.multbyac);
  if (self.multbyac.gt(1)) mult = mult.mul(self.multbyac);

  mult = mult.mul(1 + self.player.setchip[0] * 0.1);

  let camp = self.player.accelevelused;

  let d = new Date();
  if (d.getMonth() == 4 && 3 <= d.getDate() && d.getDate() <= 7)
    camp = camp + 1; //ゴールデンウィークキャンペーン
  //if(d.getMonth()==0&&d.getDate()<=7)camp = camp + 1//新年キャンペーン
  //if(d.getMonth()==1&&8<=d.getDate()&&d.getDate()<=14)camp = camp + 1//バレンタインキャンペーン
  //if((d.getMonth()==1&&25<=d.getDate()) || ((d.getMonth()==2&&d.getDate()<=3)))camp = camp + 1//桃の節句キャンペーン
  //if((d.getMonth()==6&&27<=d.getDate()) || ((d.getMonth()==7&&d.getDate()<27)))camp = camp + 2//1周年キャンペーン

  if (camp > 7) camp = 7;
  mult = mult.mul(1 + 4 * camp);
  return mult;
};

export const updateCommonMult = (self) => {
  self.commonmult = calccommonmult(self);
};
