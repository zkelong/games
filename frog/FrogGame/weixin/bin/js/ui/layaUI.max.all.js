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
        var FrogUI = /** @class */ (function (_super) {
            __extends(FrogUI, _super);
            function FrogUI() {
                return _super.call(this) || this;
            }
            FrogUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.FrogUI.uiView);
            };
            FrogUI.uiView = { "type": "View", "props": { "width": 52, "height": 52 }, "child": [{ "type": "Image", "props": { "var": "img1", "centerX": 0, "bottom": 0 }, "compId": 2 }, { "type": "Image", "props": { "x": 10, "centerY": 0, "centerX": 0 }, "compId": 3 }], "animations": [{ "nodes": [{ "target": 2, "keyframes": { "skin": [{ "value": "frog/tiao_01.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 0 }] } }], "name": "ani_stand", "id": 1, "frameRate": 24, "action": 0 }, { "nodes": [{ "target": 2, "keyframes": { "skin": [{ "value": "frog/tiao_01.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 0 }, { "value": "frog/tiao_02.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 3 }, { "value": "frog/tiao_03.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 6 }, { "value": "frog/tiao_04.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 9 }] } }], "name": "ani_jump", "id": 2, "frameRate": 24, "action": 0 }, { "nodes": [{ "target": 2, "keyframes": { "skin": [{ "value": "frog/tiao_05.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 0 }] } }], "name": "ani_flyup", "id": 3, "frameRate": 24, "action": 0 }, { "nodes": [{ "target": 2, "keyframes": { "skin": [{ "value": "frog/tiao_05.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 0 }, { "value": "frog/tiao_06.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 3 }, { "value": "frog/tiao_07.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 6 }, { "value": "frog/tiao_07.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 9 }, { "value": "frog/tiao_08.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 12 }, { "value": "frog/tiao_09.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 15 }, { "value": "frog/tiao_02.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 18 }, { "value": "frog/tiao_01.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 21 }] } }], "name": "ani_uptodown", "id": 4, "frameRate": 24, "action": 0 }, { "nodes": [{ "target": 2, "keyframes": { "skin": [{ "value": "frog/tiao_02.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 0 }, { "value": "frog/tiao_01.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 3 }] } }], "name": "ani_land", "id": 6, "frameRate": 24, "action": 0 }, { "nodes": [{ "target": 3, "keyframes": { "skin": [{ "value": "frog/tiao_08.png", "tweenMethod": "linearNone", "tween": false, "target": 3, "key": "skin", "index": 0 }, { "value": "frog/zha_01.png", "tweenMethod": "linearNone", "tween": false, "target": 3, "key": "skin", "index": 3 }, { "value": "frog/zha_02.png", "tweenMethod": "linearNone", "tween": false, "target": 3, "key": "skin", "index": 6 }, { "value": "frog/zha_03.png", "tweenMethod": "linearNone", "tween": false, "target": 3, "key": "skin", "index": 9 }, { "value": "frog/zha_04.png", "tweenMethod": "linearNone", "tween": false, "target": 3, "key": "skin", "index": 12 }, { "value": "", "tweenMethod": "linearNone", "tween": false, "target": 3, "key": "skin", "index": 15 }] } }], "name": "ani_blast", "id": 7, "frameRate": 24, "action": 0 }] };
            return FrogUI;
        }(View));
        game.FrogUI = FrogUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var FrogViewUI = /** @class */ (function (_super) {
            __extends(FrogViewUI, _super);
            function FrogViewUI() {
                return _super.call(this) || this;
            }
            FrogViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.FrogViewUI.uiView);
            };
            FrogViewUI.uiView = { "type": "View", "props": { "width": 320, "height": 140 }, "child": [{ "type": "Image", "props": { "y": 150, "x": 0, "var": "img_frog", "skin": "", "scaleY": 2, "scaleX": 2, "anchorY": 1, "anchorX": 0.5 }, "compId": 2 }, { "type": "Image", "props": { "y": 140, "x": -80, "width": 160, "visible": false, "skin": "frog/zhuzi.png" } }, { "type": "Image", "props": { "y": 140, "x": 80, "width": 160, "visible": false, "skin": "frog/zhuzi.png" }, "child": [{ "type": "Line", "props": { "y": -200, "x": 80, "toY": 200, "toX": 0, "lineWidth": 1, "lineColor": "#ff0000" } }, { "type": "Line", "props": { "y": -200, "x": 0, "toY": 200, "toX": 0, "lineWidth": 1, "lineColor": "#ff0000" } }, { "type": "Line", "props": { "y": -200, "x": 160, "toY": 200, "toX": 0, "lineWidth": 1, "lineColor": "#ff0000" } }, { "type": "Line", "props": { "y": -200, "x": 240, "toY": 200, "toX": 0, "lineWidth": 1, "lineColor": "#ff0000" } }, { "type": "Image", "props": { "y": -17, "x": -1, "skin": "frog/xianjing.png" } }] }, { "type": "Image", "props": { "y": 140, "x": 240, "width": 160, "visible": false, "skin": "frog/zhuzi.png" }, "child": [{ "type": "Image", "props": { "y": -19, "x": 0, "skin": "frog/xianjing.png" } }] }, { "type": "Image", "props": { "y": 140, "x": 400, "width": 160, "visible": false, "skin": "frog/zhuzi.png" }, "child": [{ "type": "Image", "props": { "y": -19, "x": 0, "skin": "frog/xianjing.png" } }] }], "animations": [{ "nodes": [{ "target": 2, "keyframes": { "y": [{ "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 0 }, { "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 3 }, { "value": 126, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 4 }, { "value": 80, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 5 }, { "value": 60, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 6 }, { "value": 60, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 7 }, { "value": 110, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 8 }, { "value": 130, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 9 }, { "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 10 }, { "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 11 }, { "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 12 }, { "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 13 }], "x": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 0 }, { "value": 4, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 1 }, { "value": 7, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 2 }, { "value": 15, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 3 }, { "value": 74, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 6 }, { "value": 86, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 7 }, { "value": 104, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 9 }, { "value": 163, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 12 }, { "value": 160, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 13 }], "skin": [{ "value": "frog/tiao_01.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 0 }, { "value": "frog/tiao_02.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 1 }, { "value": "frog/tiao_03.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 2 }, { "value": "frog/tiao_04.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 3 }, { "value": "frog/tiao_05.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 4 }, { "value": "frog/tiao_06.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 6 }, { "value": "frog/tiao_07.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 8 }, { "value": "frog/tiao_07.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 9 }, { "value": "frog/tiao_08.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 10 }, { "value": "frog/tiao_09.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 11 }, { "value": "frog/tiao_02.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 12 }, { "value": "frog/tiao_01.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 13 }] } }], "name": "jump_small", "id": 1, "frameRate": 24, "action": 0 }, { "nodes": [{ "target": 2, "keyframes": { "y": [{ "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 0 }, { "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 3 }, { "value": 80, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 5 }, { "value": 54, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 7 }, { "value": 54, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 8 }, { "value": 90, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 9 }, { "value": 98, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 10 }, { "value": 110, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 11 }, { "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 12 }, { "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 13 }, { "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 14 }, { "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 15 }], "x": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 0 }, { "value": 4, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 1 }, { "value": 7, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 2 }, { "value": 15, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 3 }, { "value": 154, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 7 }, { "value": 166, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 8 }, { "value": 200, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 9 }, { "value": 310, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 12 }, { "value": 312, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 13 }, { "value": 326, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 14 }, { "value": 320, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 15 }], "skin": [{ "value": "frog/tiao_01.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 0 }, { "value": "frog/tiao_02.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 1 }, { "value": "frog/tiao_03.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 2 }, { "value": "frog/tiao_04.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 3 }, { "value": "frog/tiao_06.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 7 }, { "value": "frog/tiao_07.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 9 }, { "value": "frog/tiao_08.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 12 }, { "value": "frog/tiao_09.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 13 }, { "value": "frog/tiao_02.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 14 }, { "value": "frog/tiao_01.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 15 }] } }], "name": "jump_big", "id": 1, "frameRate": 24, "action": 0 }, { "nodes": [{ "target": 2, "keyframes": { "y": [{ "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 0 }, { "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 3 }, { "value": 80, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 5 }, { "value": 54, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 7 }, { "value": 54, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 8 }, { "value": 90, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 9 }, { "value": 98, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 10 }, { "value": 110, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 11 }, { "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 12 }, { "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 13 }, { "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 14 }, { "value": 160, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 15 }, { "value": 190, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 17 }], "x": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 0 }, { "value": 4, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 1 }, { "value": 7, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 2 }, { "value": 15, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 3 }, { "value": 154, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 7 }, { "value": 166, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 8 }, { "value": 200, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 9 }, { "value": 310, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 12 }, { "value": 312, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 13 }, { "value": 312, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 14 }, { "value": 320, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 15 }], "skin": [{ "value": "frog/tiao_01.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 0 }, { "value": "frog/tiao_02.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 1 }, { "value": "frog/tiao_03.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 2 }, { "value": "frog/tiao_04.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 3 }, { "value": "frog/tiao_06.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 7 }, { "value": "frog/tiao_07.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 9 }, { "value": "frog/tiao_08.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 12 }, { "value": "frog/zha_01.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 13 }, { "value": "frog/zha_02.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 14 }, { "value": "frog/zha_03.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 15 }, { "value": "frog/zha_04.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 17 }, { "value": "", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 19 }] } }], "name": "jump_big_blast", "id": 1, "frameRate": 24, "action": 0 }, { "nodes": [{ "target": 2, "keyframes": { "y": [{ "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 0 }, { "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 3 }, { "value": 126, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 4 }, { "value": 80, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 5 }, { "value": 60, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 6 }, { "value": 60, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 7 }, { "value": 110, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 8 }, { "value": 230, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 9 }, { "value": 240, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 12 }, { "value": 266, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 13 }], "x": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 0 }, { "value": 4, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 1 }, { "value": 7, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 2 }, { "value": 15, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 3 }, { "value": 74, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 6 }, { "value": 86, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 7 }, { "value": 190, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 9 }, { "value": 194, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 10 }], "skin": [{ "value": "frog/tiao_01.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 0 }, { "value": "frog/tiao_02.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 1 }, { "value": "frog/tiao_03.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 2 }, { "value": "frog/tiao_04.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 3 }, { "value": "frog/tiao_05.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 4 }, { "value": "frog/tiao_06.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 6 }, { "value": "frog/tiao_07.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 9 }, { "value": "frog/zha_01.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 10 }, { "value": "frog/zha_02.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 11 }, { "value": "frog/zha_03.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 12 }, { "value": "frog/zha_04.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 13 }, { "value": "", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 14 }] } }], "name": "jump_small_fall", "id": 1, "frameRate": 24, "action": 0 }, { "nodes": [{ "target": 2, "keyframes": { "y": [{ "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 0 }, { "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 3 }, { "value": 126, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 4 }, { "value": 80, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 5 }, { "value": 60, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 6 }, { "value": 60, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 7 }, { "value": 110, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 8 }, { "value": 110, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 9 }, { "value": 136, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 10 }, { "value": 138, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 11 }, { "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 12 }, { "value": 150, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 13 }, { "value": 166, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 14 }], "x": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 0 }, { "value": 4, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 1 }, { "value": 7, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 2 }, { "value": 15, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 3 }, { "value": 74, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 6 }, { "value": 86, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 7 }, { "value": 104, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 9 }, { "value": 163, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 12 }, { "value": 160, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 13 }], "skin": [{ "value": "frog/tiao_01.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 0 }, { "value": "frog/tiao_02.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 1 }, { "value": "frog/tiao_03.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 2 }, { "value": "frog/tiao_04.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 3 }, { "value": "frog/tiao_05.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 4 }, { "value": "frog/tiao_06.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 6 }, { "value": "frog/tiao_07.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 9 }, { "value": "frog/tiao_08.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 10 }, { "value": "frog/zha_01.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 11 }, { "value": "frog/zha_02.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 12 }, { "value": "frog/zha_03.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 13 }, { "value": "frog/zha_04.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 14 }, { "value": "", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 15 }] } }], "name": "jump_small_blast", "id": 1, "frameRate": 24, "action": 0 }, { "nodes": [{ "target": 2, "keyframes": { "y": [{ "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 0 }], "x": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 0 }], "skin": [{ "value": "frog/tiao_01.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 0 }] } }], "name": "jump_stand", "id": 1, "frameRate": 24, "action": 0 }, { "nodes": [{ "target": 2, "keyframes": { "y": [{ "value": 138, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 0 }, { "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 1 }, { "value": 150, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 2 }], "x": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 0 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 1 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 2 }], "skin": [{ "value": "frog/zha_01.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 0 }, { "value": "frog/zha_02.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 1 }, { "value": "frog/zha_03.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 2 }, { "value": "frog/zha_04.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 3 }, { "value": "", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 4 }] } }], "name": "stand_blast", "id": 1, "frameRate": 24, "action": 0 }, { "nodes": [{ "target": 2, "keyframes": { "y": [{ "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 0 }, { "value": 140, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 3 }, { "value": 80, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 5 }, { "value": 54, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 7 }, { "value": 54, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 8 }, { "value": 90, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 9 }, { "value": 98, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 10 }, { "value": 110, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 11 }, { "value": 176, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 14 }, { "value": 208, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 15 }, { "value": 240, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 16 }, { "value": 240, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 17 }, { "value": 240, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 18 }, { "value": 240, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 19 }, { "value": 246, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 20 }, { "value": 260, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 21 }, { "value": 240, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 22 }], "x": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 0 }, { "value": 4, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 1 }, { "value": 7, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 2 }, { "value": 15, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 3 }, { "value": 154, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 7 }, { "value": 166, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 8 }, { "value": 200, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 9 }, { "value": 350, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 16 }, { "value": 356, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 17 }, { "value": 358, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 18 }, { "value": 358, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 19 }], "skin": [{ "value": "frog/tiao_01.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 0 }, { "value": "frog/tiao_02.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 1 }, { "value": "frog/tiao_03.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 2 }, { "value": "frog/tiao_04.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 3 }, { "value": "frog/tiao_06.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 7 }, { "value": "frog/tiao_07.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 9 }, { "value": "frog/tiao_08.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 16 }, { "value": "frog/tiao_09.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 17 }, { "value": "frog/zha_01.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 18 }, { "value": "frog/zha_02.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 19 }, { "value": "frog/zha_03.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 20 }, { "value": "frog/zha_04.png", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 21 }, { "value": "", "tweenMethod": "linearNone", "tween": false, "target": 2, "key": "skin", "index": 22 }] } }], "name": "jump_big_fall", "id": 1, "frameRate": 24, "action": 0 }] };
            return FrogViewUI;
        }(View));
        game.FrogViewUI = FrogViewUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
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
            GameMainUI.uiView = { "type": "View", "props": {}, "child": [{ "type": "Box", "props": { "var": "box_control", "top": 0, "right": 0, "left": 0, "bottom": 0 } }, { "type": "Sprite", "props": { "var": "sp_map" } }, { "type": "Image", "props": { "skin": "frog/yun.png" } }, { "type": "Sprite", "props": { "y": 0, "x": 0, "var": "sp_water" } }, { "type": "Label", "props": { "visible": false, "var": "label_control", "top": 50, "text": "暂停", "left": 60, "fontSize": 46, "color": "#ffffff", "bold": true } }, { "type": "Label", "props": { "visible": false, "var": "label_time", "top": 200, "text": "3", "fontSize": 50, "color": "#ffffff", "centerX": 0, "bold": true } }, { "type": "Label", "props": { "var": "label_score", "top": 50, "text": "分数：0", "left": 60, "fontSize": 46, "color": "#3370ff", "bold": true, "align": "left" } }, { "type": "Box", "props": { "var": "box_tips", "top": 0, "right": 0, "left": 0, "bottom": 0 }, "child": [{ "type": "Sprite", "props": { "var": "sp_tips", "alpha": 0.5 } }, { "type": "Sprite", "props": { "y": 0, "x": 0, "var": "sp_white", "alpha": 0 }, "compId": 24, "child": [{ "type": "Rect", "props": { "y": 0, "x": 0, "width": 642, "lineWidth": 1, "height": 961, "fillColor": "#ffffff" } }] }, { "type": "Box", "props": { "var": "box_labels", "top": 0, "right": 0, "left": 0, "bottom": 0 }, "child": [{ "type": "Label", "props": { "y": -115, "x": -76, "text": "滑动操作", "fontSize": 50, "color": "#ffffff", "centerY": -200, "centerX": 0, "bold": true } }, { "type": "Label", "props": { "y": -115, "x": -76, "text": "向右小跳", "fontSize": 50, "color": "#ffffff", "centerY": -100, "centerX": 0, "bold": true } }, { "type": "Label", "props": { "y": -115, "x": -76, "text": "向上大跳", "fontSize": 50, "color": "#ffffff", "centerY": 0, "centerX": 0, "bold": true } }, { "type": "Label", "props": { "y": -115, "x": -76, "text": "非常简单", "fontSize": 50, "color": "#ffffff", "centerY": 100, "centerX": 0, "bold": true } }, { "type": "Label", "props": { "y": -115, "x": -76, "text": "点击屏幕开始游戏", "fontSize": 42, "color": "#ffffff", "centerX": 0, "bottom": 140 } }] }] }], "animations": [{ "nodes": [{ "target": 24, "keyframes": { "alpha": [{ "value": 0.5, "tweenMethod": "linearNone", "tween": true, "target": 24, "key": "alpha", "index": 0 }, { "value": 0.7, "tweenMethod": "linearNone", "tween": true, "target": 24, "key": "alpha", "index": 1 }, { "value": 0.2, "tweenMethod": "linearNone", "tween": true, "target": 24, "key": "alpha", "index": 2 }, { "value": 0.6, "tweenMethod": "linearNone", "tween": true, "target": 24, "key": "alpha", "index": 3 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 24, "key": "alpha", "index": 4 }] } }], "name": "ani_go", "id": 1, "frameRate": 24, "action": 0 }] };
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
            GameOverUI.uiView = { "type": "View", "props": { "y": 0, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Sprite", "props": { "var": "sp_bg", "alpha": 0.5 } }, { "type": "Label", "props": { "var": "label_get", "text": "得分：", "left": 28, "fontSize": 110, "color": "#ffffff", "centerY": -240, "bold": true } }, { "type": "Label", "props": { "width": 157, "var": "label_score", "text": "0", "left": 350, "height": 100, "fontSize": 100, "color": "#ffffff", "centerY": -240, "align": "left" } }, { "type": "Box", "props": { "visible": false, "var": "box_list", "top": 0, "right": 0, "left": 0, "bottom": 0 }, "child": [{ "type": "List", "props": { "x": 70, "width": 500, "visible": true, "var": "list", "spaceY": 20, "height": 800, "centerY": -10, "centerX": 0 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "width": 500, "renderType": "render", "height": 80 }, "child": [{ "type": "Label", "props": { "text": "1", "name": "label_rank", "left": 10, "fontSize": 40, "color": "#ffffff", "centerY": 0 } }, { "type": "Image", "props": { "width": 70, "skin": "frog/tiao_01.png", "name": "img_head", "left": 50, "height": 70, "centerY": 0 } }, { "type": "Label", "props": { "text": "label", "name": "label_name", "left": 140, "fontSize": 40, "color": "#ffffff", "centerY": 0 } }, { "type": "Label", "props": { "text": "100", "right": 40, "name": "label_score", "fontSize": 40, "color": "#ffffff", "centerY": 0 } }] }] }] }] };
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