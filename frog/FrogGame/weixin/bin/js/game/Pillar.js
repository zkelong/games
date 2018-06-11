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
var game;
(function (game) {
    var GameConfig = def.GameConfig;
    var Sprite = Laya.Sprite;
    var Image = Laya.Image;
    /**
     * 青蛙
     */
    var Pillar = /** @class */ (function (_super) {
        __extends(Pillar, _super);
        function Pillar() {
            var _this = _super.call(this) || this;
            _this.haveTrap = false;
            // this.trap = new Sprite();
            // let ttrap: Laya.Texture = Laya.loader.getRes("frog/xianjing.png");
            // let ttH = GameConfig.PILLARWIDTH * 0.21;
            // this.trap.graphics.drawTexture(ttrap, 0, 0, GameConfig.PILLARWIDTH, ttH);
            // this.trap.size(GameConfig.PILLARWIDTH, ttH);
            // this.trap.pos(0, -ttH);
            // this.addChildren(this.trap);
            _this.trap = new Image("frog/xianjing.png");
            var t = Laya.loader.getRes("frog/zhuzi.png");
            _this.graphics.drawTexture(t, 0, 0, GameConfig.PILLARWIDTH, Laya.stage.height / 2);
            _this.size(GameConfig.PILLARWIDTH, Laya.stage.height / 2);
            _this.pivot(_this.width / 2, 0);
            return _this;
        }
        Pillar.prototype.init = function (x, y, haveTrap) {
            this.pos(x, y);
            this.trap.visible = haveTrap;
            this.haveTrap = haveTrap;
        };
        /**
         * 获取展示 array
         * @param begin 游戏开始显示的数组
         * @param idxO 柱子显示数组下标
         */
        Pillar.getPillarShowArray = function (begin, idxO) {
            if (begin) {
                return {
                    array: Pillar.BEGINARRAY,
                    idx: 0
                };
            }
            else {
                var idx = Math.floor(Math.random() * Pillar.NEXTARRAY.length);
                if (idx == Pillar.NEXTARRAY.length) {
                    idx--;
                }
                if (idx == idx) {
                    idx = idx == Pillar.NEXTARRAY.length - 1 ? 0 : idx + 1;
                }
                return {
                    array: Pillar.NEXTARRAY[idx],
                    idx: idx
                };
            }
        };
        Pillar.PILLARTAG = "pillar";
        //1-柱子，2-没有柱子，3-柱子上有刺
        Pillar.BEGINARRAY = [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 3, 1, 1, 2];
        Pillar.NEXTARRAY = [[1, 2, 1, 3, 1], [1, 3, 1, 1, 2], [1, 2, 1, 3, 1], [1, 3, 1, 2, 1]];
        return Pillar;
    }(Sprite));
    game.Pillar = Pillar;
})(game || (game = {}));
//# sourceMappingURL=Pillar.js.map