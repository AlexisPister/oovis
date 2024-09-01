import {Datum, Data} from "./bind";
import {SceneGraphNode} from "./sceneGraph.ts";


export class BindedMark extends SceneGraphNode {
    constructor(type: string, parent, children) {
        super(type, parent)
    }
}


type Color = string;


interface StyleProperties {
    fill?: Color;
    stroke?: Color;
    opacity?: number;
}


export abstract class Mark {
    id: string;
    styleProperties: StyleProperties;
    datum: Datum;
    // properties: Object;


    constructor(styleProperties: StyleProperties) {
        this.styleProperties = styleProperties ?? {};
    }

    linkDatum(datum: Datum) {
        this.datum = datum;
    }

    bounds() {
        //     Abstract
    }

    datumToMark(datum: Datum) {
        let properties = Object.getOwnPropertyNames(this);
        properties = properties.filter(prop => !["styleProperties", "id"].includes(prop))

        let mark = new this.constructor({}, {});
        mark.linkDatum(datum);

        for (let prop of properties) {
            mark[prop] = computeParam(this[prop], datum);
        }
        for (let [nameStyleProp, styleProp] of Object.entries(this.styleProperties)) {
            mark.styleProperties[nameStyleProp] = computeParam(styleProp, datum);
        }

        return mark;
    }

    toBindedMark(enteredData: Data, exitedData: Data, updatedData: Data, parentNode: SceneGraphNode) {
        let bindedMark = new BindedMark(this.constructor.name, parentNode, null);

        // for (let datum of data) {
        for (let datum of enteredData) {
            bindedMark.addItem(this.datumToMark(datum));
        }

        return bindedMark;
    }


    update(props, styleProperties) {
        for (let [propName, propValue] of Object.entries(props)) {

            this[propName] = this[propName].update = propValue;

        }
    }

    abstract render();
}


type dataCallback = (d: Datum, i?: number) => any;
// type NumberParameter = number | dataCallback;
// type CategoricalParameter = string | dataCallback;


// type SimpleParameter<T> = NumberParameter | CategoricalParameter;
type SimpleParameter<T> = T | dataCallback
type ComplexParameter<T> = {
    enter?: SimpleParameter<T>,
    update?: SimpleParameter<T>,
    exit?: SimpleParameter<T>
}

type Parameter<T> = SimpleParameter<T> | ComplexParameter<T>


function computeParam(param: Parameter, datum: Datum) {
    if (typeof param == "function") {
        param = param(datum)
    }
    return param;
}


export class Group extends Mark {
    marks: Mark[];

    constructor(...marks: Mark[]) {
        super({});
        this.marks = marks;
    }

    datumToMark(datum: Datum) {
        return;
    }

    // toBindedMark(data: [], parentNode: SceneGraphNode) {
    toBindedMark(enteredData: Data, exitedData: Data, updatedData: Data, parentNode: SceneGraphNode) {
        let groupBindedMark = new BindedMark(this.constructor.name, parentNode, null);

        for (let mark of this.marks) {
            // let bindedMark = mark.toBindedMark(data, groupBindedMark);
            let bindedMark = mark.toBindedMark(enteredData, exitedData, updatedData, groupBindedMark);
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
    x: Parameter<number>;
    y: Parameter<number>;
    width: Parameter<number>;
    height: Parameter<number>;


    constructor({x, y, width, height}, styleProperties={}) {
    // constructor(props, styleProperties) {
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
}




// let Rect = {
//     props: {},
//     styleProps: {},
//     render: {
//
//     }
// }


