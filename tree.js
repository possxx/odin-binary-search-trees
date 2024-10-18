import Node from "./node.js";

export default class Tree {
  constructor(arr) {
    this.inputArr = this.removeDuplicates(this.mergeSort(arr));
    this.root = this.buildTree(inputArr);
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

  buildTree(arr) {}
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
