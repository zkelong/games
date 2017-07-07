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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var ad;
    (function (ad) {
        var AdViewUI = (function (_super) {
            __extends(AdViewUI, _super);
            function AdViewUI() {
                return _super.call(this) || this;
            }
            AdViewUI.prototype.createChildren = function () {
                View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement);
                _super.prototype.createChildren.call(this);
                this.createView(ui.ad.AdViewUI.uiView);
            };
            return AdViewUI;
        }(View));
        AdViewUI.uiView = { "type": "View", "props": { "width": 640, "height": 1136 }, "child": [{ "type": "Sprite", "props": { "y": 0, "x": 0, "var": "bg" } }, { "type": "HTMLDivElement", "props": { "y": 0, "x": 0, "width": 640, "innerHTML": "www.baidu.com", "height": 1136 } }, { "type": "Label", "props": { "var": "label_agin", "text": "再来一局", "fontSize": 28, "font": "Microsoft YaHei", "color": "#ffffff", "centerX": -136, "bottom": 186, "bold": true } }, { "type": "Label", "props": { "var": "label_back", "text": "返回大厅", "fontSize": 28, "font": "Microsoft YaHei", "color": "#ffffff", "centerX": 136, "bottom": 186, "bold": true } }] };
        ad.AdViewUI = AdViewUI;
    })(ad = ui.ad || (ui.ad = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var GameMainUI = (function (_super) {
            __extends(GameMainUI, _super);
            function GameMainUI() {
                return _super.call(this) || this;
            }
            GameMainUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.GameMainUI.uiView);
            };
            return GameMainUI;
        }(View));
        GameMainUI.uiView = { "type": "View", "props": { "width": 640, "height": 1136 }, "child": [{ "type": "Image", "props": { "var": "img_bg", "top": 0, "skin": "frog/bg.png", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Sprite", "props": { "var": "gameMap" } }, { "type": "Label", "props": { "y": 50, "x": 60, "width": 92, "visible": false, "var": "label_control", "top": 50, "text": "暂停", "left": 60, "height": 43, "fontSize": 40, "color": "#ffffff", "bold": true } }, { "type": "Label", "props": { "visible": false, "var": "label_time", "text": "3", "fontSize": 48, "color": "#ffffff", "centerY": 0, "centerX": 0, "bold": true } }, { "type": "Label", "props": { "y": 50, "x": 419, "width": 161, "visible": true, "var": "label_score", "top": 50, "text": "分数：0", "right": 60, "height": 40, "fontSize": 40, "color": "#ffffff", "bold": true, "align": "right" } }] };
        game.GameMainUI = GameMainUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var lobby;
    (function (lobby) {
        var LobbyMainUI = (function (_super) {
            __extends(LobbyMainUI, _super);
            function LobbyMainUI() {
                return _super.call(this) || this;
            }
            LobbyMainUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.lobby.LobbyMainUI.uiView);
            };
            return LobbyMainUI;
        }(View));
        LobbyMainUI.uiView = { "type": "View", "props": { "width": 640, "height": 1136 }, "child": [{ "type": "Image", "props": { "y": 10, "x": 10, "top": 0, "skin": "frog/bg.png", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Label", "props": { "width": 130, "var": "label_begin", "text": "开始", "fontSize": 42, "color": "#ffffff", "centerY": 0, "centerX": 0, "bold": true, "align": "center" } }] };
        lobby.LobbyMainUI = LobbyMainUI;
    })(lobby = ui.lobby || (ui.lobby = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map