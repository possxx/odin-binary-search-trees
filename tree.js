import Node from "./node.js";

export default class Tree {
  constructor(arr) {
    this.inputArr = this.removeDuplicates(this.mergeSort(arr));
    this.root = this.buildTree(this.inputArr);
  }

  mergeSort(arr) {
    if (arr.length <= 1) return arr;

    let mid = Math.floor(arr.length / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);

    return this.merge(this.mergeSort(left), this.mergeSort(right));
  }

  merge(left, right) {
    let mergedArr = [];

    while (left.length && right.length) {
      if (left[0] >= right[0]) {
        mergedArr.push(right.shift());
      } else {
        mergedArr.push(left.shift());
      }
    }

    return [...mergedArr, ...left, ...right];
  }

  removeDuplicates(arr) {
    let newArr = [];

    arr.forEach((element) => {
      if (!newArr.includes(element)) {
        newArr.push(element);
      }
    });

    return newArr;
  }

  buildTree(arr) {
    if (arr.length <= 0) return null;

    let mid = Math.floor(arr.length / 2);
    let data = arr[mid];
    let leftChild = arr.slice(0, mid - 1);
    let rightChild = arr.slice(mid + 1);

    let root = new Node();
    root.data = data;
    root.leftChild = this.buildTree(leftChild);
    root.rightChild = this.buildTree(rightChild);

    return root;
  }
}

const tree = new Tree([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 18, 29, 32, 654, 65, 2,
]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

console.log(tree.root);
