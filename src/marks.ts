import {Datum, Data} from "./bind";
import {SceneGraphNode} from "./sceneGraph.ts";


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
    styleProperties: StyleProperties;


    constructor(styleProperties: StyleProperties) {
        this.styleProperties = styleProperties ?? {};
    }

    bounds() {
        //     Abstract
    }

    datumToMark(datum: Datum) {
        let properties = Object.getOwnPropertyNames(this);
        properties = properties.filter(prop => !["styleProperties", "id"].includes(prop))

        let mark = new this.constructor();

        for (let prop of properties) {
            mark[prop] = computeParam(this[prop], datum);
        }
        for (let [nameStyleProp, styleProp] of Object.entries(this.styleProperties)) {
            // mark[nameStyleProp] = computeParam(styleProp, datum);
            mark.styleProperties[nameStyleProp] = computeParam(styleProp, datum);
        }

        return mark;
    }

    toBindedMark(enterData: Data, exitData: Data, updateData: Data, parentNode: SceneGraphNode) {
        let bindedMark = new BindedMark(this.constructor.name, parentNode, null);

        for (let datum of data) {
            bindedMark.addItem(this.datumToMark(datum));
        }

        return bindedMark;
    }

    // toBindedMark(data: [], parentNode: SceneGraphNode) {
    //     let bindedMark = new BindedMark(this.constructor.name, parentNode, null);
    //     for (let datum of data) {
    //         bindedMark.addItem(this.datumToMark(datum));
    //     }
    //     return bindedMark;
    // }


    update({props}, styleProperties) {


    }

    abstract render();
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
            let bindedMark = mark.toBindedMark(data, groupBindedMark);
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

    constructor(x, y, width, height, styleProperties) {
        super(styleProperties);
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

    // datumToMark(datum: Datum) {
    //     let x = computeParam(this.x, datum);
    //     let y = computeParam(this.y, datum);
    //     let width = computeParam(this.width, datum);
    //     let height = computeParam(this.height, datum);
    //
    //     let mark = new this.constructor(x, y, width, height);
    //     return mark;
    // }
}


