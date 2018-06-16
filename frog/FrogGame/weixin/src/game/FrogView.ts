namespace game {
    
    import GameConfig = def.GameConfig;

    export class FrogView extends ui.game.FrogUI {
        
        //event
        ACTIONEND = "actionEnd";

        static ACTIONS = {
            stand: "stand",      //静止
            jump: "jump",        //起跳
            flyup: "flyUp",      //上飞
            upToDown: "upToDown",//上升变下降
            landing: "landing",  //落地
            blast: "blast",        //爆炸
        }
        
        actionName = "";
        beginPos = { x: 0, y: 0 };       //开始的位置

        speedX: number = 0;      //速度X
        speedY: number = 0;      //速度Y
        beginYSpeed: number = 0; //开始的y速度
        acceleratedY: number = 1; //y上的加速度
        inJump: boolean = false;    //是否正在跳跃
        flying: boolean = false;  //移动中
        jSmall:boolean = true;
        havePlayUpToDown: boolean = false;

        constructor() {
            super();
            this.pivot(this.width/2, this.height)
            this.scale(2, 2);
            this.ani_jump.on(Laya.Event.COMPLETE, this, ()=> {
                //起跳动作完成
                if(this.jSmall) {
                    this.speedX = 10;
                    this.acceleratedY = 4;
                    this.jumpOperate(GameConfig.SMALLSTEP);
                } else {
                    this.speedX = 20;
                    this.acceleratedY = 6;
                    this.jumpOperate(GameConfig.BIGSTEP);
                }
                this.flying = true;
                // console.log("jump complete", this.speedX, this.speedY);
            });
            // this.ani_land.on(Laya.Event.COMPLETE, this, ()=> {
            //     this.flying = false;
            // });
            this.ani_blast.on(Laya.Event.COMPLETE, this, ()=> {
                this.flying = false;
            });
        }

        //设置初始位置
        initPos(x, y) {
            this.pos(x, y);
            this.beginPos = { x: x, y: y };
        }

        playAnimation(action) {
            if(action == this.actionName) {
                return;
            }
            this.actionName = action;
            this.img1.visible = true;
                console.log("frg.action", action);
            if(action == FrogView.ACTIONS.stand) {
                this.ani_stand.play(0, false);
            } else if(action == FrogView.ACTIONS.jump) {
                this.inJump = true;
                this.ani_jump.play(0, false);
            } else if(action == FrogView.ACTIONS.flyup) {                
                this.ani_flyup.play(0, false);
            } else if(action == FrogView.ACTIONS.upToDown) {
                this.ani_uptodown.play(0, false);
            } else if(action == FrogView.ACTIONS.landing) {
                this.ani_uptodown.stop();
                this.ani_land.play(0, false);
            } else if(action == FrogView.ACTIONS.blast) {
                this.flying = false;
                this.speedY = 0;
                this.acceleratedY = 0;
                this.speedX = 0;
                this.img1.visible = false;
                this.ani_blast.play(0, false);
            }
        }
        //停止
        stop() {
            this.flying = false;
            this.inJump = false;
            this.speedY = 0;
            this.acceleratedY = 0;
            this.speedX = 0;
            this.ani_stand.play(0, false);
                console.log("frg.stop", "stop");
        }

        setSpeed() {
            if (this.speedY <= 1 && !this.havePlayUpToDown) { //开始下降
                this.havePlayUpToDown = true;
                this.playAnimation(Frog.ACTIONS.upToDown);
            }
            this.speedY -= this.acceleratedY;
            // console.log("SPEEDY....", this.speedY, this.beginYSpeed);
            // if(this.speedY <= -this.beginYSpeed + this.acceleratedY) {
            //     this.playAnimation(FrogView.ACTIONS.landing);
            // }
        }

        //小跳
        jumpSmall() {
            this.jSmall = true;
            this.playAnimation(Frog.ACTIONS.jump);
        }
        //大跳
        jumpBig() {
            this.jSmall = true;
            this.playAnimation(Frog.ACTIONS.jump);
        }
         //跳跃操作
        jumpOperate(setpWidth) {
            this.havePlayUpToDown = false;
            this.speedY = 0.5 * this.acceleratedY * setpWidth / this.speedX;
            this.beginYSpeed = this.speedY;
            console.log("SPEEDY...init.", this.speedY, this.beginYSpeed);
        }
    }
}