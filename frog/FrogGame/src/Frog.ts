
/**
 * 青蛙
 */
import Sprite = Laya.Sprite;
class Frog extends Laya.Animation {
    actionBody; //动作
    actionName; //动作名称
    constructor() {
        super();
        //动画播放时间间隔
        this.interval = 50;
        Laya.Animation.createFrames(["frog/tiao_01.png"], "stand");   //静止
        Laya.Animation.createFrames(["frog/tiao_01.png", "frog/tiao_02.png", "frog/tiao_03.png"], "jump");//起跳
        Laya.Animation.createFrames(["frog/tiao_04.png"], "flyUp");   //起飞
        Laya.Animation.createFrames(["frog/tiao_04.png", "frog/tiao_05.png", "frog/tiao_06.png"], "upToDown");//上升变下降
        Laya.Animation.createFrames(["frog/tiao_07.png"], "flyDown"); //下降
        Laya.Animation.createFrames(["frog/tiao_07.png", "frog/tiao_08.png", "frog/tiao_09.png"], "landing");//落地
        Laya.Animation.createFrames(["frog/zha_01.png", "frog/zha_02.png", "frog/zha_03.png", "frog/zha_04.png"], "fried");//落地
        //增加动画播放完成监听
        this.on("complete", this, this.onPlayComplete);
    }

    //播放
    playAnimation(action) {
        this.actionName = action;
        this.play(0, true, action);
        var bound: Laya.Rectangle = this.getBounds();
        this.size(bound.width, bound.height);
        this.pivot(bound.width / 2, bound.height);
        // console.log("action.....", this.width, this.height);
    }

    onPlayComplete(): void {
        this.playAnimation(this.actionName);
    }
}
