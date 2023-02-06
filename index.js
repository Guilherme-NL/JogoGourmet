import PromptSync from "prompt-sync";
import chalk from "chalk";

const prompt = PromptSync();

const OK = "ok";
const YES = "yes";
const NO = "no";

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

  getUserInput() {
    console.log("Pense em um prato que gosta");
    const response = prompt(
      "Digite " + chalk.yellow.underline.bold("ok") + " se estiver pronto! "
    );
    if (response === OK) {
      this.guessUserDish();
    }
  }

  handleNewDish(node) {
    let newDishName = prompt("Qual prato você pensou? ");
    let newParentName = prompt(
      `${newDishName} é _______ mas ${node.dishName} não. `
    );
    let parentNode = new Node(newParentName);
    this.addNode(parentNode, node, NO);
    let newNode = new Node(newDishName);
    this.addNode(newNode, parentNode, YES);
  }

  handleResponse(node) {
    console.log(
      "O prato que você pensou é " + chalk.yellow(`${node.dishName}`) + "? "
    );
    return prompt(
      `Digite ${chalk.yellow.underline.bold(
        "yes"
      )} ou ${chalk.yellow.underline.bold("no")}: `
    );
  }

  guessUserDish(node = this.root) {
    if (!node.yes && !node.no) {
      const response = this.handleResponse(node);
      if (response === YES) {
        console.log(chalk.green("Acertei de novo!"));
        this.getUserInput();
      } else {
        this.handleNewDish(node);
        this.getUserInput();
      }
    } else if (!node.yes && node.no) {
      const response = this.handleResponse(node);
      if (response === YES) {
        console.log(chalk.green("Acertei de novo!"));
        this.getUserInput();
      } else {
        this.guessUserDish(node.no);
      }
    } else if (node.yes && !node.no) {
      const response = this.handleResponse(node);
      if (response === YES) {
        this.guessUserDish(node.yes);
      } else {
        this.handleNewDish(node);
        this.getUserInput();
      }
    } else {
      const response = this.handleResponse(node);
      if (response === YES) {
        this.guessUserDish(node.yes);
      } else {
        this.guessUserDish(node.no);
      }
    }
  }
}

function main() {
  let tree = new Tree();
  tree.getUserInput();
}

main();
