namespace game {
    import Event = Laya.Event;
    import GameConfig = def.GameConfig;
    import Sprite =  Laya.Sprite;

    export class GameOverView extends ui.game.GameOverUI {
        constructor() {
            super();
            this.size(Laya.stage.width, Laya.stage.height);            
            this.list.renderHandler = new Laya.Handler(this, this.renderItem);
            this.btn_ad.on(Laya.Event.CLICK, this, ()=>{ //广告
                this.adOperator();
            });
            this.btn_agin.on(Laya.Event.CLICK, this, ()=>{ //再来一次
                
            });
            this.btn_rank.on(Laya.Event.CLICK, this, ()=>{ //排行榜
                this.showRank();
            });
        }

        //广告
        adOperator() {

        }

        //排行榜
        showRank() {
            let listArr = [];
            for (let i = 0; i < 10; i++) {
                // let data = arr[i];
                let item = {
                    label_rank: { text: i + "" },
                    img_head: {skin: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1528762687&di=e64ab46df2f8aa276b537ed67943c63a&src=http://imgsrc.baidu.com/imgad/pic/item/9d82d158ccbf6c8154bdd5ccb63eb13533fa4008.jpg"},
                    label_name: {text: "wang" + i},
                    label_score: {text: (10000 + i) + ""},
                }
                listArr.push(item);
            }
            this.list.array = listArr;
            this.list.visible = true;
        }

        /**
         * 渲染集体item
         * @param cell 
         * @param idx 
         */
        renderItem(cell: Laya.Box, idx: number) {
            let bg = cell.getChildByName("sp_bg");
            (Sprite)bg.graphics.
            cell.getChildByName("ibtnOperation").on(Event.CLICK, this, this.onOperation, [idx]);
            cell.getChildByName("ibtnItem").on(Event.CLICK, this, this.chooseItem, [idx]);
        }
    }
}
