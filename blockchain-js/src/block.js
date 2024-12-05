const SHA256 = require("crypto-js/sha256");
const hex2ascii = require("hex2ascii");

class Block {
  constructor(data) {
    this.hash = null;
    this.height = 0;
    this.body = Buffer.from(JSON.stringify(data)).toString("hex");
    this.time = 0;
    this.previousBlockHash = null;
  }

  validate() {
    const self = this;
    return new Promise((resolve, reject) => {
      let currentHash = self.hash;
      self.hash = SHA256(JSON.stringify({ ...self, hash: null })).toString();
      resolve(currentHash === self.hash);
    });
  }

  getBlockData() {
    const self = this;
    return new Promise((resolve, reject) => {
      try {
        const decodedData = hex2ascii(self.body);
        const data = JSON.parse(decodedData);
        if (data === "Genesis Block") reject("Cannot access Genesis Block data.");
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  toString() {
    return `Block -
      Hash: ${this.hash}
      Height: ${this.height}
      Body: ${this.body}
      Time: ${this.time}
      Previous Hash: ${this.previousBlockHash}`;
  }
}

module.exports = Block;
