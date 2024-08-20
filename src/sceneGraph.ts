import {Mark, SceneGraphNode} from "./marks";


export class SceneGraph {
    root: SceneGraphNode;

    constructor() {
        this.root = new SceneGraphNode("root", null);
    }
}
