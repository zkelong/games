namespace ad {
    //广告
    export class AdView extends ui.ad.AdViewUI {
        //event
        BACK = "back";
        PLAYAGIN = "playAgin";

        constructor() {
            super();
            this.size(Laya.stage.width, Laya.stage.height);
            this.bg.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#09b0bf")
            this.label_agin.on("click", this, () => {
                this.event(this.PLAYAGIN);
                this.destroy();
            });
            this.label_back.on("click", this, () => {
                this.event(this.BACK);
                this.destroy();
            })
        }
    }
}