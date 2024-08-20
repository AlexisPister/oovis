import {SceneGraph} from "../src/sceneGraph";
import {Mark} from "./marks";
import {Renderer} from "./Renderer";

export type Data = Array<any>;
export type Datum = any;


class Binder {
    data: Data;
    sceneGraph: SceneGraph;

    constructor(data) {
        this.data = data;
        this.sceneGraph = new SceneGraph();
    }

    run(markSpecs) {
        for (let markspec of markSpecs) {
            markspec.toBindedMark(this.data, this.sceneGraph.root);
        }

        console.log(this.sceneGraph);
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

    return {binder, renderer}
}

