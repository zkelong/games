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
    var Sprite = Laya.Sprite;
    var Image = Laya.Image;
    var ScrollView = /** @class */ (function (_super) {
        __extends(ScrollView, _super);
        function ScrollView(src) {
            var _this = _super.call(this) || this;
            _this.waters = [];
            _this.picWidth = 0;
            _this.picHeight = 0;
            _this.lastPic = null;
            _this.source = src;
            _this.init();
            return _this;
        }
        ScrollView.prototype.init = function () {
            var water1 = new Image();
            water1.skin = this.source;
            water1.x = 0;
            this.addChild(water1);
            this.waters.push(water1);
            this.picWidth = water1.width;
            this.picHeight = water1.height;
            var num = Math.floor(Laya.stage.width / water1.width);
            for (var i = 0; i < num + 1; i++) {
                var water = new Image(this.source);
                water.x = this.picWidth * (i + 1);
                this.addChild(water);
                this.waters.push(water);
            }
            this.lastPic = this.waters[this.waters.length - 1];
        };
        ScrollView.prototype.run = function (rate) {
            for (var i = 0; i < this.waters.length; i++) {
                if (this.waters[i].x + this.picWidth < -1) {
                    this.waters[i].x = this.lastPic.x + this.picWidth;
                    this.lastPic = this.waters[i];
                }
                this.waters[i].x -= rate;
            }
        };
        return ScrollView;
    }(Sprite));
    game.ScrollView = ScrollView;
})(game || (game = {}));
//# sourceMappingURL=WaterView.js.map