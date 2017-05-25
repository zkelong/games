var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 青蛙
 */
var Sprite = Laya.Sprite;
var Frog = (function (_super) {
    __extends(Frog, _super);
    function Frog() {
        var _this = _super.call(this) || this;
        //动画播放时间间隔
        _this.interval = 50;
        Laya.Animation.createFrames(["frog/tiao_01.png"], "stand"); //静止
        Laya.Animation.createFrames(["frog/tiao_01.png", "frog/tiao_02.png", "frog/tiao_03.png"], "jump"); //起跳
        Laya.Animation.createFrames(["frog/tiao_04.png"], "flyUp"); //起飞
        Laya.Animation.createFrames(["frog/tiao_04.png", "frog/tiao_05.png", "frog/tiao_06.png"], "upToDown"); //上升变下降
        Laya.Animation.createFrames(["frog/tiao_07.png"], "flyDown"); //下降
        Laya.Animation.createFrames(["frog/tiao_07.png", "frog/tiao_08.png", "frog/tiao_09.png"], "landing"); //落地
        Laya.Animation.createFrames(["frog/zha_01.png", "frog/zha_02.png", "frog/zha_03.png", "frog/zha_04.png"], "fried"); //落地
        //增加动画播放完成监听
        _this.on("complete", _this, _this.onPlayComplete);
        return _this;
    }
    //播放
    Frog.prototype.playAnimation = function (action) {
        this.actionName = action;
        this.play(0, true, action);
        var bound = this.getBounds();
        this.size(bound.width, bound.height);
        this.pivot(bound.width / 2, bound.height);
        // console.log("action.....", this.width, this.height);
    };
    Frog.prototype.onPlayComplete = function () {
        this.playAnimation(this.actionName);
    };
    return Frog;
}(Laya.Animation));
//# sourceMappingURL=Frog.js.map