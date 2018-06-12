namespace kelong.ui {
    import Image = Laya.Image;
    import Event = Laya.Event;

    export class KButton extends Image {
        constructor(skin) {
            super();
            this.skin = skin;
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