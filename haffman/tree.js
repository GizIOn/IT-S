import {MyNode} from "./MyNode.js";

export function TreeClass(freqDict) {
    let tree = []
    constructor(freqDict)
    {
        fillInRoots();
        sortTree();
        makeUpCodes();
    }

    this.getTree = function () {
        return tree
    }

    this.findParent = function (leaf) {
        for (let i = 0; i < tree.length; i++) {
            if (tree[i].left.name === leaf || tree[i].right.name === leaf) return tree[i]
        }
        return "Parent not found"
    }

    this.findLeafCode = function (leafToFind) {
        for (let i in tree) {
            if (tree[i].name === leafToFind.toString()) {
                return tree[i].code
            }
        }
    }

    this.findLeafName = function (leafCodeToFind) {
        for (let i in tree) {
            if (tree[i].code === leafCodeToFind) {
                return tree[i].name
            }
        }
    }

    function fillInRoots() {
        for (let i in freqDict) {
            if (i==="27") tree.push(new MyNode(i, freqDict[i]/2, ""))
            else tree.push(new MyNode(i, freqDict[i], ""))
        }
    }

    function sortTree() {
        let usedNodes = [], i = 0;
        while (tree.length > 1) {
            const current = tree[i], next = tree[i + 1];
            if (isBoltIn(current.name)) tree.push(new MyNode(current.name + "_" + next.name, current.frequency + next.frequency, current.code + next.code, current, next))
            else if (isBoltIn(next.name)) tree.push(new MyNode( next.name+ "_" + current.name, current.frequency + next.frequency, current.code + next.code, next, current))
            else tree.push(new MyNode(current.name + "_" + next.name, current.frequency + next.frequency, current.code + next.code, next, current))
            tree = tree.slice(2)
            usedNodes.push(current, next)
            tree.sort((x, y) => x.frequency - y.frequency)
        }

        tree = tree.concat(usedNodes)
        tree.sort((x, y) => x.frequency - y.frequency)
    }

    function isBoltIn(name){
            if (name.startsWith("27"))
                return true

    }

    function makeUpCodes() {
        for (let i = tree.length - 1; i >= 0; i--) {
            const current = tree[i];
            const left = current.left;
            const right = current.right;

            if (current.left !== undefined) {
                left.code = current.code + "0"
            }

            if (current.right !== undefined) {
                right.code = current.code + "1"
            }

        }
    }
}