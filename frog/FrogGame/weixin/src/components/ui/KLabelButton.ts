namespace kelong.ui {
    import Label = Laya.Label;
    import Event = Laya.Event;

    export class KLabelButton extends Label {
        constructor(txt, fontSize) {
            super();
            this.text = txt;
            this.font = "Microsoft YaHei";
            this.fontSize = fontSize;
            this.on(Event.MOUSE_OUT, this, () => {
                this.scale(1, 1);
            });
            this.on(Event.MOUSE_DOWN, this, () =>{
                this.scale(0.9, 0.9);
            });
            this.on(Event.MOUSE_UP, this, () => {
                this.scale(1, 1);
            });
        }
    }
}