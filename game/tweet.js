import { checkremembers } from "./remember";

export const tweetLink = (self) => {
  let tweetText = "";
  if (self.player.tweeting.includes("world")) {
    tweetText += "在住世界:" + (self.world + 1) + "%0A";
  }
  if (self.player.tweeting.includes("memory")) {
    tweetText += "記憶:" + self.memory + "%0A";
  }
  if (self.player.tweeting.includes("remember")) {
    tweetText += "思い出:" + checkremembers(self) + "%0A";
  }
  if (self.player.tweeting.includes("money")) {
    tweetText +=
      "ポイント:" +
      self.player.money +
      "(" +
      self.player.money.toExponential().replace("+", "%2B") +
      ")%0A";
  }
  if (self.player.tweeting.includes("darkmoney")) {
    tweetText +=
      "裏ポイント:" +
      self.player.darkmoney +
      "(" +
      self.player.darkmoney.toExponential().replace("+", "%2B") +
      ")%0A";
  }
  if (self.player.tweeting.includes("lightmoney")) {
    tweetText +=
      "天上ポイント:" +
      self.player.lightmoney +
      "(" +
      self.player.lightmoney.toExponential().replace("+", "%2B") +
      ")%0A";
  }

  if (self.player.tweeting.includes("level")) {
    tweetText += "段位:" + self.player.level + "%0A";
  }
  if (self.player.tweeting.includes("darklevel")) {
    tweetText += "裏段位:" + self.player.darklevel + "%0A";
  }
  if (self.player.tweeting.includes("achieved")) {
    tweetText += "挑戦達成:" + self.player.challengecleared.length + "%0A";
  }
  if (self.player.tweeting.includes("rankachieved")) {
    tweetText +=
      "上位挑戦達成:" + self.player.rankchallengecleared.length + "%0A";
  }
  if (self.player.tweeting.includes("pachieved")) {
    tweetText += "完全挑戦段階:" + self.pchallengestage + "%0A";
  }
  if (self.player.tweeting.includes("rank")) {
    tweetText += "階位:" + self.player.rank + "%0A";
  }
  if (self.player.tweeting.includes("levelitemboughttime")) {
    tweetText += "段位効力購入:" + self.player.levelitembought + "%0A";
  }
  if (self.player.tweeting.includes("crown")) {
    tweetText += "冠位:" + self.player.crown + "%0A";
  }
  if (self.player.tweeting.includes("crownresettime")) {
    tweetText += "冠位リセット:" + self.player.crownresettime + "%0A";
  }

  let tweetUrl = "dem08656775.github.io/newincrementalgame";
  let tweetHashtag = "新しい放置ゲーム";

  let attribute =
    "https://twitter.com/intent/tweet?" +
    "text=" +
    tweetText +
    "&url=" +
    tweetUrl +
    "&hashtags=" +
    tweetHashtag;

  return attribute;
};

export const configtweet = (self, content) => {
  if (!self.player.tweeting.includes(content)) {
    self.player.tweeting.push(content);
  } else {
    self.player.tweeting.splice(self.player.tweeting.indexOf(content), 1);
  }
};
