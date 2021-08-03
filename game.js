const version = 2;

const initialData = () => {
  return {
    money: new Decimal(1),
    level: new Decimal(0),
    levelresettime: new Decimal(0),

    generators: new Array(8).fill(null).map(() => new Decimal(0)),
    generatorsBought: new Array(8).fill(null).map(() => new Decimal(0)),
    generatorsCost: [
      new Decimal(1),
      new Decimal('1e4'),
      new Decimal('1e9'),
      new Decimal('1e16'),
      new Decimal('1e25'),
      new Decimal('1e36'),
      new Decimal('1e49'),
      new Decimal('1e64')
    ],
    generatorsMode: new Array(8).fill(null).map((_, i) => i),

    accelerators: [new Decimal(0), new Decimal(0)],
    acceleratorsBought: [new Decimal(0), new Decimal(0)],
    acceleratorsCost: [new Decimal(10), new Decimal('1e10')],

    tickspeed: 1000,
    saveversion: version
  }
}

Vue.createApp({
  data() {
    return {
      player: {
        money: new Decimal(1),
        level: new Decimal(0),
        levelresettime: new Decimal(0),

        generators: new Array(8).fill(null).map(() => new Decimal(0)),
        generatorsBought: new Array(8).fill(null).map(() => new Decimal(0)),
        generatorsCost: [
          new Decimal(1),
          new Decimal('1e4'),
          new Decimal('1e9'),
          new Decimal('1e16'),
          new Decimal('1e25'),
          new Decimal('1e36'),
          new Decimal('1e49'),
          new Decimal('1e64')
        ],
        generatorsMode: new Array(8).fill(null).map((_, i) => i),

        accelerators: [new Decimal(0), new Decimal(0)],
        acceleratorsBought: [new Decimal(0), new Decimal(0)],
        acceleratorsCost: [new Decimal(10), new Decimal('1e10')],

        tickspeed: 1000,
        saveversion: version
      }
    }
  },

  methods: {
    update() {
      for (let i = 0; i < 8; i++) {
        let to = this.player.generatorsMode[i];
        let mult = new Decimal(10).pow((i + 1) * (i - to));
        mult = mult.mul(this.player.levelresettime.add(1))
        mult = mult.mul(new Decimal(this.player.level.add(2).log2()).pow(i - to))
        if (this.player.generators[i].greaterThan(this.player.generatorsBought[i]) && this.player.generatorsBought[i].greaterThan(0)) {
          mult = mult.mul(this.player.generatorsBought[i])
        }
        if (to === 0) {
          this.player.money = this.player.money.add(this.player.generators[i].mul(mult))
        } else {
          this.player.generators[to - 1] = this.player.generators[to - 1].add(this.player.generators[i].mul(mult))
        }
      }
      this.player.tickspeed = 1000 / this.player.accelerators[0].add(10).log10()
      for (let i = 1; i < 2; i++) {
        this.player.accelerators[i - 1] = this.player.accelerators[i - 1].add(this.player.accelerators[i])
      }
    },
    save() {
      console.log(JSON.stringify(this.player))
      localStorage.setItem("playerStored", JSON.stringify(this.player));
    },
    load() {
      if (!localStorage.getItem("playerStored")) return
      let saveData = JSON.parse(localStorage.getItem("playerStored"));
      this.player = parseInt(saveData.saveversion) === version ?
        {
          money: new Decimal(saveData.money),
          level: new Decimal(saveData.level),
          levelresettime: new Decimal(saveData.levelresettime),

          generators: saveData.generators.map(v => new Decimal(v)),
          generatorsBought: saveData.generatorsBought.map(v => new Decimal(v)),
          generatorsCost: saveData.generatorsCost.map(v => new Decimal(v)),
          generatorsMode: saveData.generatorsMode.map(v => parseInt(v)),

          accelerators: saveData.accelerators.map(v => new Decimal(v)),
          acceleratorsBought: saveData.acceleratorsBought.map(v => new Decimal(v)),
          acceleratorsCost: saveData.acceleratorsCost.map(v => new Decimal(v)),

          tickspeed: parseFloat(saveData.tickspeed),
          saveversion: parseInt(saveData.version)
        } :
        readOldFormat(saveData);
    },
    buyGenerator(index) {
      if (this.player.money.greaterThanOrEqualTo(this.player.generatorsCost[index])) {
        this.player.money = this.player.money.sub(this.player.generatorsCost[index])
        this.player.generators[index] = this.player.generators[index].add(1)
        this.player.generatorsBought[index] = this.player.generatorsBought[index].add(1)
        this.player.generatorsCost[index] = index === 0 ?
          new Decimal(10).pow(this.player.generatorsBought[0]) :
          new Decimal(10).pow(this.player.generatorsBought[index].add(index + 1).mul(index + 1))
      }
    },
    buyAccelerator(index) {
      if (this.player.money.greaterThanOrEqualTo(this.player.acceleratorsCost[index])) {
        this.player.money = this.player.money.sub(this.player.acceleratorsCost[index])
        this.player.accelerators[index] = this.player.accelerators[index].add(1)
        this.player.acceleratorsBought[index] = this.player.acceleratorsBought[index].add(1)
        this.player.acceleratorsCost[index] = index === 0 ?
          this.player.acceleratorsCost[0] = this.player.acceleratorsCost[0].mul(
            this.player.acceleratorsBought[0].add(1).pow_base(10)
          ) :
          new Decimal('1e10')
            .pow(
              this.player.acceleratorsBought[index]
                .add(1)
                .mul(this.player.acceleratorsBought[index].add(index + 1)).div(index + 1)
            )
      }
    },
    changeMode(index) {
      this.player.generatorsMode[index] += 1;
      if (this.player.generatorsMode[index] > index) {
        this.player.generatorsMode[index] = 0;
      }
    },
    resetData(force) {
      if (force || confirm('これはソフトリセットではありません。\nすべてが無になり何も得られませんが、本当によろしいですか？')) {
        this.player = initialData()
      }
    },
    resetLevel() {
      let gainlevel = new Decimal(this.player.money.log10()).div(18).pow_base(2).round()
      if (confirm('段位リセットして、段位' + gainlevel + 'を得ますか？')) {
        let nextlevel = this.player.level.add(gainlevel)
        let nextlevelresettime = this.player.levelresettime.add(new Decimal(1))
        this.resetData(true);
        this.player.level = nextlevel
        this.player.levelresettime = nextlevelresettime
      }
    }
  },
  mounted() {
    const tweetbutton = document.getElementById("tweet");
    const anchor = document.createElement('a');
    anchor.className = 'twitter-hashtag-button';
    anchor.innerText = 'Tweet #新しい放置ゲーム';
    anchor.setAttribute('href',
      'https://twitter.com/intent/tweet?text=ポイント:' + this.player.money +
      '(' + this.player.money.toExponential().replace('+', '%2B') + ')' +
      '%0Adem08656775.github.io/newincrementalgame%0A&hashtags=新しい放置ゲーム'
    );
    tweetbutton.appendChild(anchor);

    this.load();
    setInterval(this.update, this.player.tickspeed);
    setInterval(this.save, 2000);
  },
}).mount('#app');

function readOldFormat(saveData) {
  return {
    money: new Decimal(saveData.money),
    level: new Decimal(saveData.level),
    levelresettime: new Decimal(saveData.levelresettime),

    generators: [
      new Decimal(saveData.generator1 ?? 0),
      new Decimal(saveData.generator2 ?? 0),
      new Decimal(saveData.generator3 ?? 0),
      new Decimal(saveData.generator4 ?? 0),
      new Decimal(saveData.generator5 ?? 0),
      new Decimal(saveData.generator6 ?? 0),
      new Decimal(saveData.generator7 ?? 0),
      new Decimal(saveData.generator8 ?? 0),
    ],
    generatorsBought: [
      new Decimal(saveData.generator1bought ?? 0),
      new Decimal(saveData.generator2bought ?? 0),
      new Decimal(saveData.generator3bought ?? 0),
      new Decimal(saveData.generator4bought ?? 0),
      new Decimal(saveData.generator5bought ?? 0),
      new Decimal(saveData.generator6bought ?? 0),
      new Decimal(saveData.generator7bought ?? 0),
      new Decimal(saveData.generator8bought ?? 0),
    ],
    generatorsCost: [
      new Decimal(saveData.generator1cost ?? '1'),
      new Decimal(saveData.generator2cost ?? '1e4'),
      new Decimal(saveData.generator3cost ?? '1e9'),
      new Decimal(saveData.generator4cost ?? '1e16'),
      new Decimal(saveData.generator5cost ?? '1e25'),
      new Decimal(saveData.generator6cost ?? '1e36'),
      new Decimal(saveData.generator7cost ?? '1e49'),
      new Decimal(saveData.generator8cost ?? '1e64'),
    ],
    generatorsMode: [
      parseInt(saveData.generator1mode ?? 0),
      parseInt(saveData.generator2mode ?? 1),
      parseInt(saveData.generator3mode ?? 2),
      parseInt(saveData.generator4mode ?? 3),
      parseInt(saveData.generator5mode ?? 4),
      parseInt(saveData.generator6mode ?? 5),
      parseInt(saveData.generator7mode ?? 6),
      parseInt(saveData.generator8mode ?? 7),
    ],

    accelerators: [
      new Decimal(saveData.accelerator1 ?? 0),
      new Decimal(saveData.accelerator2 ?? 0),
    ],
    acceleratorsBought: [
      new Decimal(saveData.accelerator1bought ?? 0),
      new Decimal(saveData.accelerator2bought ?? 0),
    ],
    acceleratorsCost: [
      new Decimal(saveData.accelerator1cost ?? 10),
      new Decimal(saveData.accelerator2cost ?? '1e10'),
    ],
    tickspeed: parseFloat(saveData.tickspeed ?? 1000),
    saveversion: version
  }
}