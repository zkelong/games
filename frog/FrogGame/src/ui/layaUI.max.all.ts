
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.ad {
    export class AdViewUI extends View {
		public bg:Laya.Sprite;
		public label_agin:Laya.Label;
		public label_back:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Sprite","props":{"y":0,"x":0,"var":"bg"}},{"type":"HTMLDivElement","props":{"y":0,"x":0,"width":640,"innerHTML":"www.baidu.com","height":1136}},{"type":"Label","props":{"var":"label_agin","text":"再来一局","fontSize":28,"font":"Microsoft YaHei","color":"#ffffff","centerX":-136,"bottom":186,"bold":true}},{"type":"Label","props":{"var":"label_back","text":"返回大厅","fontSize":28,"font":"Microsoft YaHei","color":"#ffffff","centerX":136,"bottom":186,"bold":true}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.createView(ui.ad.AdViewUI.uiView);
        }
    }
}

module ui.game {
    export class GameMainUI extends View {
		public img_bg:Laya.Image;
		public gameMap:Laya.Sprite;
		public label_control:Laya.Label;
		public label_time:Laya.Label;
		public label_score:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"var":"img_bg","top":0,"skin":"frog/bg.png","right":0,"left":0,"bottom":0}},{"type":"Sprite","props":{"var":"gameMap"}},{"type":"Label","props":{"y":50,"x":60,"width":92,"visible":false,"var":"label_control","top":50,"text":"暂停","left":60,"height":43,"fontSize":40,"color":"#ffffff","bold":true}},{"type":"Label","props":{"visible":false,"var":"label_time","text":"3","fontSize":48,"color":"#ffffff","centerY":0,"centerX":0,"bold":true}},{"type":"Label","props":{"y":50,"x":419,"width":161,"visible":true,"var":"label_score","top":50,"text":"分数：0","right":60,"height":40,"fontSize":40,"color":"#ffffff","bold":true,"align":"right"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.game.GameMainUI.uiView);
        }
    }
}

module ui.lobby {
    export class LobbyMainUI extends View {
		public label_begin:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":10,"x":10,"top":0,"skin":"frog/bg.png","right":0,"left":0,"bottom":0}},{"type":"Label","props":{"width":130,"var":"label_begin","text":"开始","fontSize":42,"color":"#ffffff","centerY":0,"centerX":0,"bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.lobby.LobbyMainUI.uiView);
        }
    }
}
