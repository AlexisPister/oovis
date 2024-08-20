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
            // let sceneGroup = new GroupMark();

            let group = this.dataToMark(markspec);
            // sceneGroup.children = group;
            console.log("gg ", group)

            this.sceneGraph.root.children.push(group);
        }

        console.log(this.sceneGraph);
    }

    dataToMark(markSpec: Mark) {
        let markGroup= [];
        for (let datum of this.data) {
            let mark = markSpec.toMark(datum);
            markGroup.push(mark);
        }
        return markGroup;
    }
}


export function bind(parent: HTMLElement, data: Data, ...marks: Mark[]) {
    // let renderer = findRenderer();
    // let eventHandler = findHandler();

    console.log("marks ", marks)

    const binder = new Binder(data);
    binder.run(marks);

    let renderer = new Renderer(parent, binder.sceneGraph);
    renderer.render();
}

