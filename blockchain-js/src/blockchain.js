const SHA256 = require("crypto-js/sha256");
const Block = require("./block");

class Blockchain {
  constructor() {
    this.chain = [];
    this.height = -1;
    this.initializeChain();
  }

  async initializeChain() {
    if (this.height === -1) {
      const genesisBlock = new Block({ data: "Genesis Block" });
      await this.addBlock(genesisBlock);
    }
  }

  async addBlock(block) {
    block.height = this.chain.length;
    block.time = new Date().toISOString();

    if (this.chain.length > 0) {
      block.previousBlockHash = this.chain[this.chain.length - 1].hash;
    }

    block.hash = SHA256(JSON.stringify(block)).toString();
    this.chain.push(block);
  }

  async validateChain() {
    const errors = [];
    for (const block of this.chain) {
      const isValid = await block.validate();
      if (!isValid) errors.push(`Block ${block.height} is invalid`);
    }
    return errors;
  }

  printChain() {
    this.chain.forEach((block) => console.log(block.toString()));
  }
}

module.exports = Blockchain;

