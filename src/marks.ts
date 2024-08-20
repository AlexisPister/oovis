import {Datum} from "./bind";



// export type MarkGroup = Mark[];


interface MarkGroup<Mark> {
    items: Array<Mark>
}





export class Mark {
    id: string;
    children: MarkGroup[];
    parent?: Mark | null;
    rotation?: number;
    scale?: { x: number; y: number };

    constructor() {
        this.children = [];
    }

    bounds() {
        //     Abstract
    }

    render() {
        //     Abstract
    }
}


type dataCallback = (arg: Datum) => any;
type NumberArgument = number | dataCallback;


function computeParam(param: NumberArgument, datum: Datum) {
    if (typeof param == "function") {
        param = param(datum)
    }
    return param;
}




export class GroupMark extends Mark {
    type: SceneType;

    constructor() {
        super();
    }
}


export class Path extends Mark {

}

export class Rect extends Mark {
    x: NumberArgument;
    y: NumberArgument;
    width: NumberArgument;
    height: NumberArgument;

    constructor(x, y, width, height) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath(); // Start a new path
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }

    toMark(datum: Datum) {
        let x = computeParam(this.x, datum);
        let y = computeParam(this.y, datum);
        let width = computeParam(this.width, datum);
        let height = computeParam(this.height, datum);

        let mark = new this.constructor(x, y, width, height);
        return mark;
    }

    toMarkGroup(data: Data) {
        for (let datum of data) {
            this.toMark(datum);
        }
    }
}