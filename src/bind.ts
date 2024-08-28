import {SceneGraph} from "../src/sceneGraph";
import {Mark} from "./marks";
import {Renderer} from "./Renderer";
import {deepEqual} from "./utils.ts";

export type Data = Array<Datum>;
export type Datum = any;


export class Binder {
    data: Data;
    sceneGraph: SceneGraph;

    matchDatum: (Datum) => any;
    mapData: Map<any, Datum>;

    constructor(data) {
        this.data = data;
        this.sceneGraph = new SceneGraph();

        this.matchDatum = (d) => (d);
        this.indexData();
    }

    indexData() {
        this.mapData = new Map<Datum, Datum>();
        this.data.forEach(datum => {
            this.mapData.set(datum, datum);
        })
    }

    run(markSpecs) {
        for (let markspec of markSpecs) {
            markspec.toBindedMark(this.data, this.sceneGraph.root);
        }

        console.log(this.sceneGraph);
    }


    updateData(newData: Data, matchBy: (d: Datum) => any = (d) => d) {
        const updatedData: Datum[] = [];
        const enteredData: Datum[] = [];
        const removedData: Datum[] = [];

        let matchFn = (d1: Datum, d2: Datum) => {
            // return deepEqual(matchBy(d1), matchBy(d2))
            return this.matchDatum(d1) === this.matchDatum(d2)
        }

        // Iterate over arr1 and determine newData and intersect
        newData.forEach(item2 => {
            const matchedInArr = Array.from(this.mapData.values()).find(item1 => matchFn(item1, item2));
            if (matchedInArr) {
                updatedData.push(item2);
                // Remove the matched item to handle any duplicates
                this.mapData.delete(matchedInArr);
            } else {
                enteredData.push(item2);
            }
        });

        // The remaining items in map2 are the removedData
        this.mapData.forEach((_, key) => {
            removedData.push(key);
        });

        this.data = newData;
        this.indexData();

        return {enteredData, removedData, updatedData};
    }

    // updateData(newData: Data, matchBy: (d: Datum) => any) {
    //     const updatedData: Datum[] = [];
    //     const enteredData: Datum[] = [];
    //     const removedData: Datum[] = [];
    //
    //     let matchFn = (d1: Datum, d2: Datum) => {
    //         // return deepEqual(matchBy(d1), matchBy(d2))
    //         return matchBy(d1) === matchBy(d2)
    //     }
    //
    //     // Create a map for quick lookups
    //     const map = new Map<Datum, Datum>();
    //
    //     // Fill the map with elements from arr2
    //     this.data.forEach(item => {
    //         map.set(item, item);
    //     });
    //
    //     // Iterate over arr1 and determine newData and intersect
    //     newData.forEach(item2 => {
    //         const matchedInArr = Array.from(map.values()).find(item1 => matchFn(item1, item2));
    //         if (matchedInArr) {
    //             updatedData.push(item2);
    //             // Remove the matched item to handle any duplicates
    //             map.delete(matchedInArr);
    //         } else {
    //             enteredData.push(item2);
    //         }
    //     });
    //
    //     // The remaining items in map2 are the removedData
    //     map.forEach((_, key) => {
    //         removedData.push(key);
    //     });
    //
    //     return {enteredData, removedData, updatedData};
    // }
}


export function bind(parent: HTMLCanvasElement, data: Data, ...marks: Mark[]) {
    // let renderer = findRenderer();
    // let eventHandler = findHandler();

    console.log("marks ", marks)

    const binder = new Binder(data);
    binder.run(marks);

    let renderer = new Renderer(parent, binder.sceneGraph);
    renderer.render();

    return {binder, renderer}
}

