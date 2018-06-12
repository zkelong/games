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
    var KButton = kelong.ui.KButton;
    var KLabelButton = kelong.ui.KLabelButton;
    var GameOverView = /** @class */ (function (_super) {
        __extends(GameOverView, _super);
        function GameOverView(socre) {
            var _this = _super.call(this) || this;
            //event
            _this.AGIN = "playAgin";
            _this.ADEND = "adEnd";
            _this.size(Laya.stage.width, Laya.stage.height);
            _this.sp_bg.graphics.drawRect(0, 0, _this.width, _this.height, "#000000");
            _this.list.renderHandler = new Laya.Handler(_this, _this.renderItem);
            _this.label_score.text = socre;
            var ok = new KLabelButton("OK");
            ok.fontSize = 80;
            ok.color = "#ffffff";
            ok.bottom = 30;
            ok.centerX = 0;
            _this.box_list.addChild(ok);
            ok.on(Laya.Event.CLICK, _this, function () {
                _this.box_list.visible = false;
                _this.img_score.visible = true;
                _this.label_score.visible = true;
                _this.btn_ad.visible = true;
                _this.btn_rank.visible = true;
                _this.btn_agin.visible = true;
            });
            //广告
            _this.btn_ad = new KButton("frog/bt_ad.png");
            _this.btn_ad.centerX = 0;
            _this.btn_ad.centerY = -80;
            _this.addChild(_this.btn_ad);
            _this.btn_ad.on("click", _this, function () {
                _this.adOperator();
            });
            //排行
            _this.btn_rank = new KButton("frog/bt_rank.png");
            _this.btn_rank.centerX = 0;
            _this.btn_rank.centerY = 40;
            _this.addChild(_this.btn_rank);
            _this.btn_rank.on("click", _this, function () {
                _this.showRank();
            });
            //再来一把
            _this.btn_agin = new KButton("frog/bt_rank.png");
            _this.btn_agin.centerX = 0;
            _this.btn_agin.centerY = 160;
            _this.addChild(_this.btn_agin);
            _this.btn_agin.on("click", _this, function () {
                _this.event(_this.AGIN);
                _this.removeSelf();
                _this.destroy();
            });
            return _this;
        }
        //广告
        GameOverView.prototype.adOperator = function () {
            this.event(this.ADEND);
            this.removeSelf();
            this.destroy();
        };
        //排行榜
        GameOverView.prototype.showRank = function () {
            this.img_score.visible = false;
            this.label_score.visible = false;
            this.btn_ad.visible = false;
            this.btn_rank.visible = false;
            this.btn_agin.visible = false;
            this.box_list.visible = true;
            if (this.list.array == null || this.list.array.length == 0) {
                var listArr = [];
                for (var i = 0; i < 10; i++) {
                    // let data = arr[i];
                    var item = {
                        label_rank: { text: i + "" },
                        img_head: { skin: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1528762687&di=e64ab46df2f8aa276b537ed67943c63a&src=http://imgsrc.baidu.com/imgad/pic/item/9d82d158ccbf6c8154bdd5ccb63eb13533fa4008.jpg" },
                        label_name: { text: "wang" + i },
                        label_score: { text: (10000 + i) + "" },
                    };
                    listArr.push(item);
                }
                this.list.array = listArr;
            }
        };
        /**
         * 渲染集体item
         * @param cell
         * @param idx
         */
        GameOverView.prototype.renderItem = function (cell, idx) {
            var sp = new Sprite;
            sp.graphics.drawRect(0, 0, cell.width, cell.height, "#000000");
            sp.alpha = 0.5;
            sp.zOrder = -1;
            cell.addChild(sp);
        };
        return GameOverView;
    }(ui.game.GameOverUI));
    game.GameOverView = GameOverView;
})(game || (game = {}));
//# sourceMappingURL=GameOverView.js.map