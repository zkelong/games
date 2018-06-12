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
var iobox;
(function (iobox) {
    var ui;
    (function (ui) {
        var Event = Laya.Event;
        // import Box = laya.editerUI.Box;
        var Box = Laya.Box;
        var BoxColor = /** @class */ (function (_super) {
            __extends(BoxColor, _super);
            function BoxColor() {
                var _this = _super.call(this) || this;
                _this.on(Event.RESIZE, _this, function () {
                    _this.graphics.drawRect(0, 0, _this.width, _this.height, _this.color);
                });
                return _this;
            }
            return BoxColor;
        }(Box));
        ui.BoxColor = BoxColor;
    })(ui = iobox.ui || (iobox.ui = {}));
})(iobox || (iobox = {}));
//# sourceMappingURL=BoxColor.js.map