const sha256 = require('crypto-js/sha256');
class Block{
     constructor(index, timestamp, data, prevHash=''){
            this.index = index;
            this.timestamp = timestamp
            this.data = data;
            this.prevHash = prevHash;
            this.hash=this.calculatehash();
            this.nonce=0;

     }
calculatehash(){
return sha256(this.index+this.timestamp+JSON.stringify(this.data).toString()+this.prevHash)
}
mineBlock(difficulty){
    while(this.hash.toString().substring(0,difficulty)!==Array(difficulty+1).join("0")){
        this.nonce++;
        this.hash=this.calculatehash();
    }
    console.log("Block mined: "+this.hash);
}
}
class Blockchain{
    constructor(){
        this.chain=[this.createGenisisBlock()];
        this.difficulty=2;
    }

    createGenisisBlock(){
        return new Block(0,Date.now(),'Genisis Block','');
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock){
        newBlock.prevHash=this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
    isChainValid(){

        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
      
            if (previousBlock.hash !== currentBlock.previousHash) {
              return false;
            }
      
            if (!currentBlock.hasValidTransactions()) {
              return false;
            }
      
            if (currentBlock.hash !== currentBlock.calculateHash()) {
              return false;
            }
          }
      
          return true;
    }

}
let blockchain = new Blockchain();
console.log("mining block 1...");
blockchain.addBlock(new Block(1,Date.now(),{amount:10}));
console.log("mining block 2...");
blockchain.addBlock(new Block(2,Date.now(),{amount:20}));
let newBlock=new Block();
console.log(newBlock.mineBlock(blockchain.difficulty));

