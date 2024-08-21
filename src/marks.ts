import {Datum} from "./bind";



// export type MarkGroup = Mark[];


interface MarkGroup<Mark> {
    items: Array<Mark>
}



export class SceneGraphNode {
    id: string;
    type: string;
    children: SceneGraphNode[];
    parent: SceneGraphNode;
    items: Array<Mark>;

    constructor(type: string, parent) {
        // TODO
        this.id = "1";
        this.type = type;

        this.parent = parent;
        if (this.parent) {
            this.parent.children.push(this);
        }

        this.children = [];
        this.items = [];
    }
}


export class BindedMark extends SceneGraphNode{
    constructor(type: string, parent, children) {
        super(type, parent, children)
    }

    addItem(mark: Mark) {
        this.items.push(mark);
    }
}




export abstract class Mark {
    id: string;
    // children: MarkGroup[];
    // parent?: Mark | null;
    // rotation?: number;
    // scale?: { x: number; y: number };

    constructor() {
    }

    bounds() {
        //     Abstract
    }

    abstract datumToMark(datum: Datum): Mark

    abstract toBindedMark(data: [], parentNode: SceneGraphNode)

    abstract render()
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

    constructor() {
        super();
    }
}


interface Point {
    x: number,
    y: number
}


export class Line extends Mark {
    x1: number;
    y1: number;
    x2: number;
    y2: number;

    constructor(x1, y1, x2, y2) {
        super();
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    render(ctx: CanvasRenderingContext2D) {
    }

}


export class Path extends Mark {
    points: Point[];

    constructor() {
        super();
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath(); // Start a new path

        // ctx.path(this.x, this.y, this.width, this.height);

        ctx.fill();
    }

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

    datumToMark(datum: Datum) {
        let x = computeParam(this.x, datum);
        let y = computeParam(this.y, datum);
        let width = computeParam(this.width, datum);
        let height = computeParam(this.height, datum);

        let mark = new this.constructor(x, y, width, height);
        return mark;
    }

    toBindedMark(data: [], parentNode: SceneGraphNode) {
        let bindedMark = new BindedMark(this.constructor.name, parentNode, null);
        for (let datum of data) {
            bindedMark.addItem(this.datumToMark(datum));
        }
        return bindedMark;
    }
}


