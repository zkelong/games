
import Label = Laya.Label;

class MainGate {

    labelIn; //说明
    frog;
    BEGINXPOS = 30; //开始位置
    PILLARXPOS = Laya.stage.height / 2;
    lastXpos;  //位置记录
    pillarArray = [];
    lastStepBig: boolean = true;    //上一次间隔是大间隔
    lastHaveTrap: boolean = true;   //上次有陷阱
    constructor() {

        let bg: Laya.Image = new Laya.Image("frog/bg.png");
        bg.size(Laya.stage.width, Laya.stage.height);
        Laya.stage.addChild(bg);

        //开始
        let lb = new Label;
        lb.fontSize = 20;
        lb.text = "开始";
        lb.color = "#ffffff";
        lb.left = 30;
        lb.top = 30;
        lb.on(Laya.Event.CLICK, this, () => {
            if (this.labelIn)
                this.labelIn.destroy();
            this.start();
        });
        Laya.stage.addChildren(lb);
        //暂停
        let lp = new Label;
        lp.fontSize = 20;
        lp.text = "暂停";
        lp.color = "#ffffff";
        lp.top = 30;
        lp.right = 30;
        lp.on(Laya.Event.CLICK, this, this.pause);
        Laya.stage.addChildren(lp);
        //说明
        // this.labelIn = new Label;
        // this.labelIn.fontSize = 20;
        // this.labelIn.text = "上划大跳，右滑小跳";
        // this.labelIn.color = "#ffffff";
        // this.labelIn.top = 60;
        // this.labelIn.centerX = 0;
        // this.labelIn.on(Laya.Event.CLICK, this, this.pause);
        // Laya.stage.addChildren(this.labelIn);
        this.init();

    }
    /**
     *初始化 
     */
    init() {
        this.frog = new Frog();
        this.frog.pos(this.BEGINXPOS, this.BEGINXPOS);

        this.lastXpos = this.BEGINXPOS;
        if (this.pillarArray.length == 0) {
            do {
                this.addPillar();
            } while (this.lastXpos <= Laya.stage.width);
        }
    }

    /**
     * 游戏循环
     */
    onLoop() {
        this.frog.x -= GameConfig.SPEED;
        if (this.frog.x < -10) {
            this.frog.x = Laya.stage.width;
        }
        for (let i = 0; i < this.pillarArray.length; ++i) {
            this.pillarArray[i].x -= GameConfig.SPEED;
            if (this.pillarArray[i].x < -GameConfig.PILLARWIDTH / 2) {
                //回收
                Laya.Pool.recover(Pillar.PILLARTAG, this.pillarArray[i]);
                this.pillarArray.shift();
            }
        }
        this.lastXpos = this.pillarArray[this.pillarArray.length - 1].x;
        if (this.lastXpos + GameConfig.SMALLSTEP <= Laya.stage.width + GameConfig.BIGSTEP) {
            this.addPillar();
        }
    }

    //增加柱子
    addPillar() {
        let ran = Math.random();
        if (this.lastHaveTrap) {
            if (ran < 0.5) {  //间距频率
                this.lastXpos += GameConfig.PILLARWIDTH;
                this.lastStepBig = false;
            } else {
                this.lastXpos += GameConfig.SMALLSTEP;
                this.lastStepBig = false;
            }
        } else {
            if (ran < 0.334) {  //间距频率
                this.lastXpos += GameConfig.PILLARWIDTH;
                this.lastStepBig = false;
            } else if (ran < 0.667) {
                this.lastXpos += GameConfig.SMALLSTEP;
                this.lastStepBig = false;
            } else {
                this.lastXpos += GameConfig.BIGSTEP;
                this.lastStepBig = true;
            }
        }
        if (!this.lastStepBig && !this.lastHaveTrap) { //陷阱频率
            this.lastHaveTrap = Math.random() < 0.8 ? true : false;
        } else {
            this.lastHaveTrap = false;
        }
        let pillar: Pillar = Laya.Pool.getItemByClass(Pillar.PILLARTAG, Pillar);
        pillar.init(this.lastXpos, this.BEGINXPOS, this.lastHaveTrap);
        Laya.stage.addChild(pillar);
        this.pillarArray.push(pillar);
    }



    //开始
    start() {
        Laya.timer.frameLoop(1, this, this.onLoop);
    }

    //重新开始开始
    restart() {
        for (let i = this.pillarArray.length - 1; i > -1; --i) {
            this.pillarArray[i].destroy();
            this.pillarArray.pop();
        }
        this.init();
        this.start();
    }
    //继续
    resume() {
        Laya.timer.frameLoop(1, this, this.onLoop);
    }
    //暂停
    pause() {
        Laya.timer.clearAll(this);
    }
}


Laya.init(1136, 640, Laya.WebGL);
// Laya.Stat.show(0, 50);
//设置适配模式
Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
Laya.stage.alignH = "center";

let asset = [
    { url: "res/atlas/frog.json", type: Laya.Loader.ATLAS },
    { url: "frog/bg.png", type: Laya.Loader.IMAGE },
    { url: "frog/zhuzi.png", type: Laya.Loader.IMAGE },
]

Laya.loader.load(asset, new Laya.Handler(this, () => {
    let main = new MainGate();
}));