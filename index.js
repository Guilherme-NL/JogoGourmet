const OK = "ok";
const YES = "yes";

class Node {
  constructor(dishName) {
    this.dishName = dishName;
    this.yes = null;
    this.no = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  addNode(node, parent = null, response = YES) {
    if (!this.root) {
      this.root = node;
    } else if (parent) {
      parent[response] = node;
    }
  }
}
