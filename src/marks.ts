import {Datum} from "./bind";
import {SceneGraphNode} from "./sceneGraph.ts";


// export type MarkGroup = Mark[];


interface MarkGroup<Mark> {
    items: Array<Mark>
}


export class BindedMark extends SceneGraphNode {
    constructor(type: string, parent, children) {
        super(type, parent, children)
    }
}


type Color = string;


interface StyleProperties {
    fill: Color;
    stroke: Color;
    opacity: number;
}


export abstract class Mark {
    id: string;
    // children: MarkGroup[];
    // parent?: Mark | null;
    // rotation?: number;
    // scale?: { x: number; y: number };


    styleProperties: StyleProperties;


    constructor(styleProperties: StyleProperties) {
        this.styleProperties = styleProperties;
    }

    bounds() {
        //     Abstract
    }

    // abstract datumToMark(datum: Datum): Mark

    // abstract toBindedMark(data: [], parentNode: SceneGraphNode)


    datumToMark(datum: Datum) {


        let properties = Object.getPrototypeOf(this);
        properties = properties.filter(prop => ["styleProperties", "id"])

        for (let prop of properties) {



        }

        let x = computeParam(this.x, datum);
        let y = computeParam(this.y, datum);
        let width = computeParam(this.width, datum);
        let height = computeParam(this.height, datum);

        let mark = new this.constructor(x, y, width, height);
        return mark;
    }




    // datumToMark(datum: Datum) {
    //     let x = computeParam(this.x, datum);
    //     let y = computeParam(this.y, datum);
    //     let width = computeParam(this.width, datum);
    //     let height = computeParam(this.height, datum);
    //
    //     let mark = new this.constructor(x, y, width, height);
    //     return mark;
    // }

    toBindedMark(data: [], parentNode: SceneGraphNode) {
        let bindedMark = new BindedMark(this.constructor.name, parentNode, null);
        for (let datum of data) {
            bindedMark.addItem(this.datumToMark(datum));
        }
        return bindedMark;
    }

    abstract render()
}


type dataCallback = (d: Datum, i?: number) => any;
type NumberArgument = number | dataCallback;


function computeParam(param: NumberArgument, datum: Datum) {
    if (typeof param == "function") {
        param = param(datum)
    }
    return param;
}


export class Group extends Mark {
    marks: Mark[];

    constructor(...marks: Mark[]) {
        super();
        this.marks = marks;
    }

    datumToMark(datum: Datum) {
        return;
    }

    toBindedMark(data: [], parentNode: SceneGraphNode) {
        let groupBindedMark = new BindedMark(this.constructor.name, parentNode, null);

        for (let mark of this.marks) {
            console.log(22)
            let bindedMark = mark.toBindedMark(data, groupBindedMark);
            // groupBindedMark.addChild(bindedMark);
        }

        return groupBindedMark;
    }

    render() {
        return;
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
        ctx.beginPath(); // Start a new path
        ctx.moveTo(this.x1, this.y1); // Move the pen to (30, 50)
        ctx.lineTo(this.x2, this.y2); // Draw a line to (150, 100)
        ctx.stroke(); // Render the path
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

    constructor({x, y, width, height}) {
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
}


