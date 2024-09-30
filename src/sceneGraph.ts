import {Mark} from "./marks";
import {Data, Datum} from "./bind.ts";


export class SceneGraph {
    root: SceneGraphNode;

    constructor() {
        this.root = new SceneGraphNode("root", null);
    }

    update(enterData: Data, updateData: Data, exitData: Data) {

    }
}

// TODO: visit the scene graph for update. Idea: link the mark items to the data items. Have a variable that store the join state, and update accordingly


export class SceneGraphNode {
    id: string;
    type: string;
    children: SceneGraphNode[];
    parent: SceneGraphNode;
    items: Array<Mark>;

    dataToItem: Map<Datum, Mark>

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

        this.dataToItem = new Map();
    }

    addItem(datum: Datum, mark: Mark) {
        // this.items.push(mark);
        this.dataToItem.set(datum, mark);
    }

    addChild(child: SceneGraphNode) {
        this.children.push(child);
    }

    update(enterData: Data, updateData: Data, exitData: Data) {
        for (let datum of enterData) {
            this.dataToItem[datum]
        }
    }
}
