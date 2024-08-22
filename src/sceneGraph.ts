import {Mark} from "./marks";


export class SceneGraph {
    root: SceneGraphNode;

    constructor() {
        this.root = new SceneGraphNode("root", null);
    }
}

export class SceneGraphNode {
    id: string;
    type: string;
    children: SceneGraphNode[];
    parent: SceneGraphNode;
    items: Array<Mark>;

    constructor(type: string, parent) {
        // TODO
        this.id = "1";
        this.type = type;

        this.parent = parent;
        if (this.parent) {
            this.parent.children.push(this);
        }

        this.children = [];
        this.items = [];
    }

    addItem(mark: Mark) {
        this.items.push(mark);
    }

    addChild(child: SceneGraphNode) {
        this.children.push(child);
    }
}
