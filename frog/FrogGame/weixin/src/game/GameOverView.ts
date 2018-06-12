namespace game {
    import Event = Laya.Event;
    import GameConfig = def.GameConfig;
    import Sprite = Laya.Sprite;
    import KButton = kelong.ui.KButton;
    import KLabelButton = kelong.ui.KLabelButton;

    export class GameOverView extends ui.game.GameOverUI {
        btn_ad: KButton;
        btn_rank: KButton;
        btn_agin: KButton;

        //event
        AGIN = "playAgin";
        ADEND = "adEnd";

        constructor(socre) {
            super();
            this.size(Laya.stage.width, Laya.stage.height);
            this.sp_bg.graphics.drawRect(0, 0, this.width, this.height, "#000000");
            this.list.renderHandler = new Laya.Handler(this, this.renderItem);

            this.label_score.text = socre;
            let ok = new KLabelButton("OK");
            ok.fontSize = 80;
            ok.color = "#ffffff";
            ok.bottom = 30;
            ok.centerX = 0;
            this.box_list.addChild(ok);
            ok.on(Laya.Event.CLICK, this, () => {
                this.box_list.visible = false;
                this.img_score.visible = true;
                this.label_score.visible = true;
                this.btn_ad.visible = true;
                this.btn_rank.visible = true;
                this.btn_agin.visible = true;
            });

            //广告
            this.btn_ad = new KButton("frog/bt_ad.png");
            this.btn_ad.centerX = 0;
            this.btn_ad.centerY = -80;
            this.addChild(this.btn_ad);
            this.btn_ad.on("click", this, () => {  //广告
                this.adOperator();
            });

            //排行
            this.btn_rank = new KButton("frog/bt_rank.png");
            this.btn_rank.centerX = 0;
            this.btn_rank.centerY = 40;
            this.addChild(this.btn_rank);
            this.btn_rank.on("click", this, () => {  //广告
                this.showRank();
            });

            //再来一把
            this.btn_agin = new KButton("frog/bt_rank.png");
            this.btn_agin.centerX = 0;
            this.btn_agin.centerY = 160;
            this.addChild(this.btn_agin);
            this.btn_agin.on("click", this, () => {  //广告
                this.event(this.AGIN);
                this.removeSelf();
                this.destroy();
            });
        }

        //广告
        adOperator() {
            this.event(this.ADEND);
            this.removeSelf();
            this.destroy();
        }

        //排行榜
        showRank() {
            this.img_score.visible = false;
            this.label_score.visible = false;
            this.btn_ad.visible = false;
            this.btn_rank.visible = false;
            this.btn_agin.visible = false;
            this.box_list.visible = true;

            if (this.list.array == null || this.list.array.length == 0) {
                let listArr = [];
                for (let i = 0; i < 10; i++) {
                    // let data = arr[i];
                    let item = {
                        label_rank: { text: i + "" },
                        img_head: { skin: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1528762687&di=e64ab46df2f8aa276b537ed67943c63a&src=http://imgsrc.baidu.com/imgad/pic/item/9d82d158ccbf6c8154bdd5ccb63eb13533fa4008.jpg" },
                        label_name: { text: "wang" + i },
                        label_score: { text: (10000 + i) + "" },
                    }
                    listArr.push(item);
                }
                this.list.array = listArr;
            }
        }

        /**
         * 渲染集体item
         * @param cell 
         * @param idx 
         */
        renderItem(cell: Laya.Box, idx: number) {
            let sp = new Sprite;
            sp.graphics.drawRect(0, 0, cell.width, cell.height, "#000000");
            sp.alpha = 0.5;
            sp.zOrder = -1;
            cell.addChild(sp);
        }
    }
}
