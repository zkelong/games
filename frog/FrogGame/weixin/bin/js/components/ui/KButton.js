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
var kelong;
(function (kelong) {
    var ui;
    (function (ui) {
        var Image = Laya.Image;
        var Event = Laya.Event;
        var KButton = /** @class */ (function (_super) {
            __extends(KButton, _super);
            function KButton(skin) {
                var _this = _super.call(this) || this;
                _this.skin = skin;
                _this.on(Event.MOUSE_OUT, _this, function () {
                    _this.scale(1, 1);
                });
                _this.on(Event.MOUSE_DOWN, _this, function () {
                    _this.scale(0.9, 0.9);
                });
                _this.on(Event.MOUSE_UP, _this, function () {
                    _this.scale(1, 1);
                });
                return _this;
            }
            return KButton;
        }(Image));
        ui.KButton = KButton;
    })(ui = kelong.ui || (kelong.ui = {}));
})(kelong || (kelong = {}));
//# sourceMappingURL=KButton.js.map