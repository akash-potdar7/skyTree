import store from './store';

export default class TreeUtil {

    constructor() {
        this.root = store.state._root;
    }

    traverse(node) {
        console.log(node.name);

        if (node.children) {
            node.children.forEach(child => {
                this.traverse(child);
            });
        }
    }

    // underscore denotes private fn
    _traverse(callback) {
        function exec(node) {
            callback(node);
            node.children.forEach(exec);
        }
        exec(this.root);
    }

    addNode(name, parentNode) {
        var newNode = {
            id: 1001,
            name,
            children: []
        };

        if (null === parentNode && null == store.state._root) {
            store.state._root = newNode;
            this.root = store.state._root;
            return;
        }
        var addDone = false; 
        this._traverse(function(node) {
            if (!addDone && (parentNode.id === node.id)) {
                if (null == node.children)
                    node['children'] = [];
                node.children.push(newNode);
                addDone = true;
            }
        });
    }

    removeNode(id) {
        this._traverse(function(node) {
            node.children && node.children.some(function(childNode, index) {
                if (id === childNode.id) {
                    return !!node.children.splice(index, 1);
                }
            });
        });
    }

    updateNode(currentNode, newName) {
        this._traverse(function(node) {
            if (currentNode.id == node.id) {
                currentNode.name = newName;
            }
        });
    }

}