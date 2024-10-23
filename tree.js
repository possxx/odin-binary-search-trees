import Node from "./node.js";

export default class Tree {
  constructor(inputArr) {
    this.arr = this.removeDuplicates(this.mergeSort(inputArr));
    this.root = this.buildTree(this.arr);
  }

  merge(left, right) {
    const mergedArr = [];

    while (left.length && right.length) {
      if (left[0] >= right[0]) {
        mergedArr.push(right.shift());
      } else {
        mergedArr.push(left.shift());
      }
    }

    return [...mergedArr, ...left, ...right];
  }

  mergeSort(arr) {
    if (arr.length <= 1) return arr;

    let mid = Math.floor(arr.length / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);

    return this.merge(this.mergeSort(left), this.mergeSort(right));
  }

  removeDuplicates(arr) {
    const uniqueArr = [];

    arr.forEach((element) => {
      if (!uniqueArr.includes(element)) uniqueArr.push(element);
    });

    return uniqueArr;
  }

  buildTree(arr) {
    if (arr.length <= 0) return null;

    let mid = Math.floor(arr.length / 2);
    let root = new Node(arr[mid]);
    root.left = this.buildTree(arr.slice(0, mid));
    root.right = this.buildTree(arr.slice(mid + 1));

    return root;
  }

  insert(value) {
    if (!this.root) {
      this.root = new Node(value);
      return;
    }

    let root = this.root;
    let previousRoot = null;

    while (root !== null) {
      previousRoot = root;
      if (value < root.data) {
        root = root.left;
      } else if (value > root.data) {
        root = root.right;
      } else {
        return;
      }
    }

    if (value > previousRoot.data) {
      previousRoot.right = new Node(value);
    } else {
      previousRoot.left = new Node(value);
    }
  }

  insertRec(value, root = this.root) {
    if (root === null) return new Node(value);
    if (root.data === value) return root;

    if (value > root.data) {
      root.right = this.insertRec(value, root.right);
    } else {
      root.left = this.insertRec(value, root.left);
    }

    return root;
  }

  getSuccessor(root) {
    let succ = root;
    let succNext = root.right;

    while (succNext !== null) {
      succ = succNext;
      succNext = succNext.left;
    }

    return succ;
  }

  deleteItem(value) {
    let rootPrev = null;
    let root = this.root;

    while (root !== null) {
      if (value > root.data) {
        rootPrev = root;
        root = root.right;
      } else if (value < root.data) {
        rootPrev = root;
        root = root.left;
      } else {
        if (root.left === null && root.right === null) {
          value === rootPrev.left.data
            ? (rootPrev.left = null)
            : (rootPrev.right = null);
          return;
        }
        if (root.left === null) {
          value === rootPrev.left.data
            ? (rootPrev.left = root.right)
            : (rootPrev.right = root.right);
          return;
        }
        if (root.right === null) {
          value === rootPrev.left.data
            ? (rootPrev.left = root.left)
            : (rootPrev.right = root.left);
          return;
        }

        let succ = root;
        let succNext = root.right;
        let succPrev = null;

        while (succNext !== null) {
          succPrev = succ;
          succ = succNext;
          succNext = succNext.left;
        }

        root.data = succ.data;
        succPrev.left.data === succ.data
          ? (succPrev.left = null)
          : (succPrev.right = null);
        return;
      }
    }
  }

  deleteItemRec(value, root = this.root) {
    if (root === null) return root;

    if (value < root.data) {
      root.left = this.deleteItemRec(value, root.left);
    } else if (value > root.data) {
      root.right = this.deleteItemRec(value, root.right);
    } else {
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      let succ = this.getSuccessor(root);
      root.data = succ.data;
      root.right = this.deleteItemRec(root.data, root.right);
    }

    return root;
  }

  find(value) {
    let root = this.root;

    while (root !== null) {
      if (value > root.data) {
        root = root.right;
      } else if (value < root.data) {
        root = root.left;
      } else {
        return root;
      }
    }

    return false;
  }

  levelOrder(callback) {
    if (!callback) throw new Error("Callback function is required!");

    let queue = [this.root];

    while (queue.length !== 0) {
      const newQueue = [];
      queue.forEach((item) => {
        callback(item);
        if (item.left !== null) newQueue.push(item.left);
        if (item.right !== null) newQueue.push(item.right);
      });
      queue = newQueue;
    }
  }

  levelOrderRec(callback, queue = [this.root]) {
    if (!callback) throw new Error("Callback function is required!");
    if (queue.length === 0) return;

    const newQueue = [];

    queue.forEach((item) => {
      callback(item);
      if (item.left !== null) newQueue.push(item.left);
      if (item.right !== null) newQueue.push(item.right);
    });

    this.levelOrderRec(callback, newQueue);
  }
}

const tree = new Tree([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 18, 29, 32, 654, 65, 2,
]);

const tree2 = new Tree([8, 10, 23, 48, 2, 4, 0]);

const add2 = function (node) {
  node.data += 2;
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(tree.root);
tree.levelOrder(add2);
prettyPrint(tree.root);
