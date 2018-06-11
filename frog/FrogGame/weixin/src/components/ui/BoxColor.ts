
module comp.ui
{
    import Event = Laya.Event;
    // import Box = laya.editerUI.Box;
    import Box = Laya.Box;

    export class BoxColor extends Box {
        color:string;
        constructor() {
            super();
            this.on(Event.RESIZE, this, () => {
                this.graphics.drawRect(0,0, this.width, this.height, this.color);
            });
        }
    }
}