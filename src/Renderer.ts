import {SceneGraph} from "./sceneGraph";

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
        console.log(this.sceneGraph);
        for (let markGroup of this.sceneGraph.root.children) {
            console.log(markGroup)

            for (let mark of markGroup) {
                mark.render(this.ctx);
            }
        }
    }
}