import {SceneGraph} from "../src/sceneGraph";
import {Mark} from "./marks";
import {Renderer} from "./Renderer";
import {deepEqual} from "./utils.ts";

export type Data = Array<Datum>;
export type Datum = any;


export class Binder {
    data: Data;

    enteredData: Data;
    updatedData: Data;
    exitedData: Data;

    sceneGraph: SceneGraph;

    matchDatum: (i: number, Datum) => any;
    mapData: Map<any, Datum>;

    constructor(data) {
        this.data = data;
        this.enteredData = data;

        this.sceneGraph = new SceneGraph();

        this.matchDatum = (i, d) => (i);
        this.indexData();
    }

    indexData() {
        this.mapData = new Map<Datum, Datum>();
        this.data.forEach((datum, i) => {
            // this.mapData.set(datum, datum);
            this.mapData.set(this.matchDatum(i, datum), datum);
        })
        console.log(this.mapData)
    }

    run(markSpecs) {
        for (let markspec of markSpecs) {
            // markspec.toBindedMark(this.data, this.sceneGraph.root);
            markspec.toBindedMark(this.enteredData, this.updatedData, this.exitedData, this.sceneGraph.root);
        }

        console.log(this.sceneGraph);
    }


    updateData(newData: Data, matchBy: (d: Datum) => any = (d) => d) {
        // const updatedData: Datum[] = [];
        // const enteredData: Datum[] = [];
        // const removedData: Datum[] = [];
        this.updatedData = [];
        this.enteredData = [];
        this.exitedData = [];

        let matchFn = (i1: number, d1: Datum, i2: number, d2: Datum) => {
            return this.matchDatum(i1, d1) === this.matchDatum(i2, d2)
        }

        // Iterate over arr1 and determine newData and intersect
        newData.forEach((item2, i2) => {
            // const matchedInArr = Array.from(this.mapData.values()).find((item1, i1) => matchFn(i1, item1, i2, item2));
            const matchedInArr = this.data.find((item1, i1) => matchFn(i1, item1, i2, item2));
            if (matchedInArr) {
                this.updatedData.push(item2);

                // Remove the matched item to handle any duplicates
                this.mapData.delete(this.matchDatum(i2, item2));
            } else {
                this.enteredData.push(item2);
            }
        })

        // The remaining items in map2 are the removedData
        this.mapData.forEach((datum, key) => {
            this.exitedData.push(datum);
        });

        this.data = newData;
        this.indexData();

        // this.enteredData = enteredData;
        // this.updatedData = updatedData;
        // this.enteredData = enteredData;
        // return {enteredData, removedData, updatedData};
    }
}


export function bind(parent: HTMLCanvasElement, data: Data, ...marks: Mark[]) {
    // let renderer = findRenderer();
    // let eventHandler = findHandler();

    console.log("marks ", marks)

    const binder = new Binder(data);
    binder.run(marks);

    let renderer = new Renderer(parent, binder.sceneGraph);
    renderer.render();

    let vis = new Vis(binder, renderer)

    // return {binder, renderer}
    return vis
}


class Vis {
    binder: Binder;
    renderer: Renderer;

    constructor(binder, renderer) {
        this.binder = binder;
        this.renderer = renderer;
    }

    update(newData) {
        this.binder.updateData(newData);

        console.log("uu ", this.binder)
        this.renderer.render();
    }
}

