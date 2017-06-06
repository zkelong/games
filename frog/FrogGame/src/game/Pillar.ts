
namespace game {
    import GameConfig = def.GameConfig;
    import Sprite = Laya.Sprite;

    /**
     * 青蛙
     */
    export class Pillar extends Sprite {
        static PILLARTAG = "pillar";
        haveTrap = false;
        trap; //陷阱
        constructor() {
            super();
            let t: Laya.Texture = Laya.loader.getRes("frog/zhuzi.png");
            this.graphics.drawTexture(t, 0, 0, GameConfig.PILLARWIDTH, Laya.stage.height / 2);
            this.size(GameConfig.PILLARWIDTH, Laya.stage.height / 2);
            this.pivot(this.width / 2, 0);

            this.trap = new Sprite();
            let ttrap: Laya.Texture = Laya.loader.getRes("frog/xianjing.png");
            let ttH = GameConfig.PILLARWIDTH * 0.21;
            this.trap.graphics.drawTexture(ttrap, 0, 0, GameConfig.PILLARWIDTH, ttH);
            this.trap.size(GameConfig.PILLARWIDTH, ttH);
            this.trap.pos(0, -ttH);
            this.addChildren(this.trap);
        }

        init(x, y, haveTrap) {
            this.pos(x, y);
            this.trap.visible = haveTrap;
        }
    }
}