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
var ad;
(function (ad) {
    //广告
    var AdView = (function (_super) {
        __extends(AdView, _super);
        function AdView() {
            var _this = _super.call(this) || this;
            //event
            _this.BACK = "back";
            _this.PLAYAGIN = "playAgin";
            _this.size(Laya.stage.width, Laya.stage.height);
            _this.bg.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#09b0bf");
            _this.label_agin.on("click", _this, function () {
                _this.event(_this.PLAYAGIN);
                _this.destroy();
            });
            _this.label_back.on("click", _this, function () {
                _this.event(_this.BACK);
                _this.destroy();
            });
            return _this;
        }
        return AdView;
    }(ui.ad.AdViewUI));
    ad.AdView = AdView;
})(ad || (ad = {}));
//# sourceMappingURL=ADView.js.map