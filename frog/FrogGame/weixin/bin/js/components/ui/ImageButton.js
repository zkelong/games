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
        var Image = Laya.Image;
        var Event = Laya.Event;
        var ColorFilter = Laya.ColorFilter;
        var ButtonStatus;
        (function (ButtonStatus) {
            ButtonStatus[ButtonStatus["NORMAL"] = 1] = "NORMAL";
            ButtonStatus[ButtonStatus["SELECTED"] = 2] = "SELECTED";
            ButtonStatus[ButtonStatus["DISABLED"] = 3] = "DISABLED";
        })(ButtonStatus = ui.ButtonStatus || (ui.ButtonStatus = {}));
        var SkinStatus;
        (function (SkinStatus) {
            SkinStatus[SkinStatus["NORMAL"] = 0] = "NORMAL";
            SkinStatus[SkinStatus["OVER"] = 1] = "OVER";
            SkinStatus[SkinStatus["UP"] = 2] = "UP";
            SkinStatus[SkinStatus["DOWN"] = 3] = "DOWN";
            SkinStatus[SkinStatus["DISABLED"] = 4] = "DISABLED";
        })(SkinStatus = ui.SkinStatus || (ui.SkinStatus = {}));
        var selectedMat = [
            1.2, 0, 0, 0, 0,
            0, 1.2, 0, 0, 0,
            0, 0, 1.2, 0, 0,
            0, 0, 0, 1, 0,
        ];
        var disabledMat = [
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0, 0, 0, 1, 0,
        ];
        //基于滤镜效果的按钮
        var ImageButton = /** @class */ (function (_super) {
            __extends(ImageButton, _super);
            function ImageButton(skin) {
                if (skin === void 0) { skin = null; }
                var _this = _super.call(this, skin) || this;
                _this.DEFAULT_SELECTED_FILTERS = [new ColorFilter(selectedMat)];
                _this.DEFAULT_DISABLED_FILTERS = [new ColorFilter(disabledMat)];
                _this.mouseEnabled = true;
                _this._skinStatus = SkinStatus.NORMAL;
                var lb = _this.lable = new Laya.Label();
                lb.centerX = 0;
                lb.centerY = 0;
                _this.addChild(lb);
                _this.on(Event.MOUSE_OVER, _this, _this.onMouseOver);
                _this.on(Event.MOUSE_OUT, _this, _this.onMouseOut);
                _this.on(Event.MOUSE_DOWN, _this, _this.onMouseDown);
                _this.on(Event.MOUSE_UP, _this, _this.onMouseUp);
                return _this;
            }
            Object.defineProperty(ImageButton.prototype, "skinStatus", {
                get: function () {
                    return this._skinStatus;
                },
                set: function (s) {
                    this._skinStatus = s;
                    switch (s) {
                        case SkinStatus.NORMAL: {
                            this.filters = this._normalizeFilters;
                            break;
                        }
                        case SkinStatus.OVER: {
                            this.filters = this._mouseOverFilters || this.DEFAULT_SELECTED_FILTERS;
                            break;
                        }
                        case SkinStatus.UP: {
                            this.filters = this._normalizeFilters;
                            break;
                        }
                        case SkinStatus.DOWN: {
                            this.filters = this._selectedFilters || this.DEFAULT_SELECTED_FILTERS;
                            break;
                        }
                        case SkinStatus.DISABLED: {
                            this.filters = this._disabledFilters || this.DEFAULT_DISABLED_FILTERS;
                            break;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ImageButton.prototype, "normalizeFilters", {
                get: function () {
                    return this._normalizeFilters;
                },
                set: function (n) {
                    this._normalizeFilters = n;
                },
                enumerable: true,
                configurable: true
            });
            ImageButton.prototype.onMouseOver = function () {
                if (this.status === ButtonStatus.DISABLED) {
                    return;
                }
                this.skinStatus = SkinStatus.OVER;
            };
            ImageButton.prototype.onMouseOut = function () {
                if (this.status === ButtonStatus.DISABLED) {
                    return;
                }
                if (this.status === ButtonStatus.SELECTED) {
                    this.skinStatus = SkinStatus.DOWN;
                    return;
                }
                this.skinStatus = SkinStatus.NORMAL;
            };
            ImageButton.prototype.onMouseDown = function () {
                if (this.status === ButtonStatus.DISABLED) {
                    return;
                }
                this.skinStatus = SkinStatus.DOWN;
            };
            ImageButton.prototype.onMouseUp = function () {
                if (this.status === ButtonStatus.DISABLED) {
                    return;
                }
                if (this.canSelected) {
                    if (this.status === ButtonStatus.SELECTED) {
                        this.status = ButtonStatus.NORMAL;
                        this.skinStatus = SkinStatus.NORMAL;
                    }
                    else {
                        this.status = ButtonStatus.SELECTED;
                        this.skinStatus = SkinStatus.DOWN;
                    }
                    return;
                }
                this.skinStatus = SkinStatus.NORMAL;
            };
            return ImageButton;
        }(Image));
        ui.ImageButton = ImageButton;
    })(ui = iobox.ui || (iobox.ui = {}));
})(iobox || (iobox = {}));
//# sourceMappingURL=ImageButton.js.map