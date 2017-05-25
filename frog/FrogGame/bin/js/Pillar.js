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
var Pillar = (function (_super) {
    __extends(Pillar, _super);
    function Pillar() {
        var _this = _super.call(this) || this;
        _this.haveTrap = false;
        var t = Laya.loader.getRes("frog/zhuzi.png");
        _this.graphics.drawTexture(t, 0, 0, GameConfig.PILLARWIDTH, Laya.stage.height / 2);
        _this.size(GameConfig.PILLARWIDTH, Laya.stage.height / 2);
        _this.pivot(_this.width / 2, 0);
        _this.trap = new Sprite();
        var ttrap = Laya.loader.getRes("frog/xianjing.png");
        var ttH = GameConfig.PILLARWIDTH * 0.21;
        _this.trap.graphics.drawTexture(ttrap, 0, 0, GameConfig.PILLARWIDTH, ttH);
        _this.trap.size(GameConfig.PILLARWIDTH, ttH);
        _this.trap.pos(0, -ttH);
        _this.addChildren(_this.trap);
        return _this;
    }
    Pillar.prototype.init = function (x, y, haveTrap) {
        this.pos(x, y);
        this.trap.visible = haveTrap;
    };
    return Pillar;
}(Laya.Sprite));
Pillar.PILLARTAG = "pillar";
//# sourceMappingURL=Pillar.js.map