const Blockchain = require("./src/blockchain");
const Block = require("./src/block");
const { connectDatabase, Transaction } = require("./src/database");

async function main() {
  await connectDatabase();

  const blockchain = new Blockchain();
  await blockchain.initializeChain();

  const block1 = new Block({ from: "Alice", to: "Bob", amount: 50 });
  await blockchain.addBlock(block1);

  const block2 = new Block({ from: "Bob", to: "Charlie", amount: 30 });
  await blockchain.addBlock(block2);

  const transaction1 = new Transaction({
    from: "Alice",
    to: "Bob",
    amount: 50,
    timestamp: new Date(),
  });

  const transaction2 = new Transaction({
    from: "Bob",
    to: "Charlie",
    amount: 30,
    timestamp: new Date(),
  });

  await transaction1.save();
  await transaction2.save();

  console.log("Blockchain:");
  blockchain.printChain();

  console.log("Transactions in MongoDB:");
  const transactions = await Transaction.find();
  console.log(transactions);
}

main();
