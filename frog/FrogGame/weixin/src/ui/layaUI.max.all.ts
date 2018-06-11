
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.game {
    export class GameMainUI extends View {
		public img_bg:Laya.Image;
		public sp_map:Laya.Sprite;
		public label_control:Laya.Label;
		public label_time:Laya.Label;
		public label_score:Laya.Label;
		public box_tips:Laya.Box;
		public sp_tips:Laya.Sprite;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"var":"img_bg","top":0,"skin":"frog/bg.png","right":0,"left":0,"bottom":0}},{"type":"Sprite","props":{"var":"sp_map"}},{"type":"Label","props":{"visible":false,"var":"label_control","top":50,"text":"暂停","left":60,"fontSize":46,"color":"#ffffff","bold":true}},{"type":"Label","props":{"var":"label_time","top":200,"text":"3","fontSize":50,"color":"#ffffff","centerX":0,"bold":true}},{"type":"Label","props":{"var":"label_score","top":50,"text":"分数：0","right":60,"fontSize":46,"color":"#ffffff","bold":true,"align":"right"}},{"type":"Box","props":{"var":"box_tips","top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Sprite","props":{"var":"sp_tips","alpha":0.5}},{"type":"Label","props":{"text":"滑动操作","fontSize":50,"color":"#ffffff","centerY":-150,"centerX":0,"bold":true}},{"type":"Label","props":{"text":"向右小跳","fontSize":50,"color":"#ffffff","centerY":-50,"centerX":0,"bold":true}},{"type":"Label","props":{"text":"向上大跳","fontSize":50,"color":"#ffffff","centerY":50,"centerX":0,"bold":true}},{"type":"Label","props":{"text":"非常简单","fontSize":50,"color":"#ffffff","centerY":150,"centerX":0,"bold":true}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.game.GameMainUI.uiView);

        }

    }
}

module ui.game {
    export class GameOverUI extends View {
		public img_bg:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":0,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"var":"img_bg","top":0,"skin":"frog/bg.png","right":0,"left":0,"bottom":0}},{"type":"Label","props":{"text":"Game Over","fontSize":45,"color":"#ffffff","centerY":0,"centerX":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.game.GameOverUI.uiView);

        }

    }
}

module ui.lobby {
    export class LobbyMianUI extends View {
		public label_begin:Laya.Label;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"top":0,"skin":"frog/bg.png","right":0,"left":0,"bottom":0}},{"type":"Label","props":{"width":130,"var":"label_begin","text":"开始","fontSize":42,"color":"#ffffff","centerY":0,"centerX":0,"bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.lobby.LobbyMianUI.uiView);

        }

    }
}
