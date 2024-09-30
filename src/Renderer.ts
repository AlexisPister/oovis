import {SceneGraph, SceneGraphNode} from "./sceneGraph";

export class Renderer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    sceneGraph: SceneGraph;

    constructor(canvas: HTMLCanvasElement, sceneGraph: SceneGraph) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d")
        this.sceneGraph = sceneGraph;
    }

    render() {

        const render = (sceneGraphNode: SceneGraphNode) => {
            for (let bindedMark of sceneGraphNode.children) {
                // console.log(bindedMark)

                // for (let mark of bindedMark.items) {
                for (let mark of bindedMark.dataToItem.values()) {
                    console.log("m ", mark)
                    mark.render(this.ctx);
                }

                render(bindedMark);
            }
        }

        render(this.sceneGraph.root)
        // console.log(this.sceneGraph);
    }
}