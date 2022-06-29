const sha256 = require('crypto-js/sha256');
class Block{
     constructor(index, timestamp, data, prevHash=''){
            this.index = index;
            this.timestamp = timestamp
            this.data = data;
            this.prevHash = prevHash;
            this.hash=this.calculatehash();
     }
calculatehash(){
return sha256(this.index+this.timestamp+JSON.stringify(this.data).toString()+this.prevHash)
}
}
class Blockchain{
    constructor(){
        this.chain=[this.createGenisisBlock()];
    }

    createGenisisBlock(){
        return new Block(0,Date.now(),'Genisis Block','');
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock){
        newBlock.prevHash=this.getLatestBlock().hash;
        newBlock.hash=newBlock.calculatehash();
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

blockchain.addBlock(new Block(1,Date.now(),{amount:10}));

blockchain.addBlock(new Block(2,Date.now(),{amount:20}));

blockchain.addBlock(new Block(3,Date.now(),{amount:30}));

blockchain.addBlock(new Block(4,Date.now(),{amount:40}));

blockchain.addBlock(new Block(5,Date.now(),{amount:50}));

console.log(JSON.stringify(blockchain,null,5));