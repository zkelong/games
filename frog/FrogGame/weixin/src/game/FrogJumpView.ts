namespace game {
    export class FrogJumpView extends ui.game.FrogViewUI {

        //event
        static ACTIONEND = "actionEnd";
        static EVENT_DIE = "event_die";
        static EVENT_STOP = "event_stop";

        static ACTIONS = {
            stand: "stand",
            jump_small: "jump_small",
            jump_big: "jump_big",
            jump_small_blast: "jump_small_blast",
            jump_small_fall: "jump_small_fall",
            jump_big_blast: "jump_big_blast",
        }

        inJump:boolean = false;

        constructor() {
            super();
            
            this.pivot(0, this.height);
            
            this.jump_small.on(Laya.Event.COMPLETE, this, () => {
                this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_STOP);
            });
            this.jump_big.on(Laya.Event.COMPLETE, this, () => {
                this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_STOP);
            });
            this.jump_small_blast.on(Laya.Event.COMPLETE, this, () => {
                this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_DIE);
            });
            this.jump_small_fall.on(Laya.Event.COMPLETE, this, () => {
                this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_DIE);
            });
            this.jump_big_blast.on(Laya.Event.COMPLETE, this, () => {
                this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_DIE);
            });
        }

        //设置初始位置
        initPos(x, y) {
            this.pos(x, y);
        }

        playAction(actionName) {
            console.log("action....", actionName)
            this.inJump = true;
            if (actionName == FrogJumpView.ACTIONS.stand) {
                this.jump_stand.play(0, false);
                this.inJump = false;
            } else if (actionName == FrogJumpView.ACTIONS.jump_small) {
                this.jump_small.play(0, false);
            } else if (actionName == FrogJumpView.ACTIONS.jump_big) {
                this.jump_big.play(0, false);
            } else if (actionName == FrogJumpView.ACTIONS.jump_small_blast) {
                this.jump_small_blast.play(0, false);
            } else if (actionName == FrogJumpView.ACTIONS.jump_small_fall) {
                this.jump_small_fall.play(0, false);
            } else if (actionName == FrogJumpView.ACTIONS.jump_big_blast) {
                this.jump_big_blast.play(0, false);
            }
        }
    }
}