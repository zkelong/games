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
    var game;
    (function (game) {
        var GameMainUI = /** @class */ (function (_super) {
            __extends(GameMainUI, _super);
            function GameMainUI() {
                return _super.call(this) || this;
            }
            GameMainUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.GameMainUI.uiView);
            };
            GameMainUI.uiView = { "type": "View", "props": {}, "child": [{ "type": "Image", "props": { "var": "img_bg", "top": 0, "skin": "frog/bg.png", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Sprite", "props": { "var": "sp_map" } }, { "type": "Label", "props": { "visible": false, "var": "label_control", "top": 50, "text": "暂停", "left": 60, "fontSize": 46, "color": "#ffffff", "bold": true } }, { "type": "Label", "props": { "visible": false, "var": "label_time", "top": 200, "text": "3xx", "fontSize": 50, "color": "#ffffff", "centerX": 0, "bold": true } }, { "type": "Label", "props": { "var": "label_score", "top": 50, "text": "分数：0", "right": 60, "fontSize": 46, "color": "#ffffff", "bold": true, "align": "right" } }, { "type": "Box", "props": { "var": "box_tips", "top": 0, "right": 0, "left": 0, "bottom": 0 }, "child": [{ "type": "Sprite", "props": { "var": "sp_tips", "alpha": 0.5 } }, { "type": "Label", "props": { "text": "滑动操作", "fontSize": 50, "color": "#ffffff", "centerY": -170, "centerX": 0, "bold": true } }, { "type": "Label", "props": { "text": "向右小跳", "fontSize": 50, "color": "#ffffff", "centerY": -70, "centerX": 0, "bold": true } }, { "type": "Label", "props": { "text": "向上大跳", "fontSize": 50, "color": "#ffffff", "centerY": 30, "centerX": 0, "bold": true } }, { "type": "Label", "props": { "text": "非常简单", "fontSize": 50, "color": "#ffffff", "centerY": 130, "centerX": 0, "bold": true } }, { "type": "Label", "props": { "x": 10, "text": "点击屏幕开始游戏", "fontSize": 42, "color": "#ffffff", "centerX": 0, "bottom": 100 } }] }, { "type": "Image", "props": { "visible": false, "skin": "frog/go2.png", "centerY": -80, "centerX": 0 }, "compId": 17 }], "animations": [{ "nodes": [{ "target": 17, "keyframes": { "visible": [{ "value": true, "tweenMethod": "linearNone", "tween": false, "target": 17, "key": "visible", "index": 0 }, { "value": false, "tweenMethod": "linearNone", "tween": false, "target": 17, "key": "visible", "index": 9 }], "skin": [{ "value": "frog/go2.png", "tweenMethod": "linearNone", "tween": false, "target": 17, "key": "skin", "index": 0 }, { "value": "frog/go1.png", "tweenMethod": "linearNone", "tween": false, "target": 17, "key": "skin", "index": 4 }, { "value": "frog/go2.png", "tweenMethod": "linearNone", "tween": false, "target": 17, "key": "skin", "index": 8 }] } }], "name": "ani_go", "id": 1, "frameRate": 24, "action": 0 }] };
            return GameMainUI;
        }(View));
        game.GameMainUI = GameMainUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var GameOverUI = /** @class */ (function (_super) {
            __extends(GameOverUI, _super);
            function GameOverUI() {
                return _super.call(this) || this;
            }
            GameOverUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.GameOverUI.uiView);
            };
            GameOverUI.uiView = { "type": "View", "props": { "y": 0, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "var": "img_bg", "top": 0, "skin": "frog/bg.png", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Label", "props": { "text": "Game Over", "fontSize": 45, "color": "#ffffff", "centerY": 0, "centerX": 0 } }] };
            return GameOverUI;
        }(View));
        game.GameOverUI = GameOverUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var lobby;
    (function (lobby) {
        var LobbyMianUI = /** @class */ (function (_super) {
            __extends(LobbyMianUI, _super);
            function LobbyMianUI() {
                return _super.call(this) || this;
            }
            LobbyMianUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.lobby.LobbyMianUI.uiView);
            };
            LobbyMianUI.uiView = { "type": "View", "props": {}, "child": [{ "type": "Image", "props": { "top": 0, "skin": "frog/bg.png", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Label", "props": { "width": 130, "var": "label_begin", "text": "开始", "fontSize": 42, "color": "#ffffff", "centerY": 0, "centerX": 0, "bold": true, "align": "center" } }] };
            return LobbyMianUI;
        }(View));
        lobby.LobbyMianUI = LobbyMianUI;
    })(lobby = ui.lobby || (ui.lobby = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map