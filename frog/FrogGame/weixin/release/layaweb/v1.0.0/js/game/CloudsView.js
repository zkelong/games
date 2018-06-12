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
    var CloudsView = /** @class */ (function (_super) {
        __extends(CloudsView, _super);
        function CloudsView() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        CloudsView.prototype.init = function () {
            var _this = this;
            this.img1 = new Image("frog/yun.png");
            this.img1.x = 0;
            this.addChild(this.img1);
            this.img2 = new Image("frog/yun.png");
            this.img2.anchorX = 1;
            this.img2.scaleX = -1;
            this.addChild(this.img2);
            this.img2.x = this.img1.x + this.img1.width;
            this.img1.on(Laya.Event.LOADED, this, function () {
                _this.img2.x = _this.img1.x + _this.img1.width;
            });
        };
        CloudsView.prototype.run = function (rate) {
            if (this.img1.x + this.img1.width < -1) {
                this.img1.x = this.img2.x + this.img2.width;
            }
            if (this.img2.x + this.img2.width < -1) {
                this.img2.x = this.img1.x + this.img1.width;
            }
            this.img1.x -= rate;
            this.img2.x -= rate;
        };
        return CloudsView;
    }(Sprite));
    game.CloudsView = CloudsView;
})(game || (game = {}));
//# sourceMappingURL=CloudsView.js.map