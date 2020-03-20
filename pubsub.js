const PubNub = require('pubnub');

const credentials = {
    publishKey : 'pub-c-4d167929-e93f-4813-a933-30d9147fe797',
    subscribeKey : 'sub-c-b040ec8c-6a8a-11ea-94ed-e20534093ea4',
    secretKey : 'sec-c-YjJjMzk0MWYtYzI3NC00MDYzLTk0NDYtM2U4YzI1ZDE5ZjVm',
    
};

const CHANNELS = {
    TEST : 'TEST',
   // TESTTWO : 'TESTTWO'   //channel name must be a string
    BLOCKCHAIN: 'BLOCKCHAIN',
    TRANSACTION: 'TRANSACTION'
  
};

class PubSub{
    constructor({blockchain}){
        this.blockchain = blockchain;

        this.pubnub = new PubNub(credentials);

        this.pubnub.subscribe({channels:Object.values(CHANNELS)}); // returns an array //this will subscribe the person to all channels listed in channels
                                                        // otherwise we can specify manually (channels.test) 
    
        this.pubnub.addListener(this.listener());

    }
    broadcastChain() {
        this.publish({
          channel: CHANNELS.BLOCKCHAIN,
          message: JSON.stringify(this.blockchain.chain)  //message must be in string format, hence stringify is used to convert from array
         });
      }
    subscribeToChannels() {
        this.pubnub.subscribe({
          channels: [Object.values(CHANNELS)]
        });
      }
    
    listener(){ //helper mesthod to listen
        return {
            message: messageObject => {
              const { channel, message } = messageObject;
      
              console.log(`Message received. Channel: ${channel}. Message: ${message}`);
              const parsedMessage = JSON.parse(message);
      
              switch(channel) {
                case CHANNELS.BLOCKCHAIN:
                  this.blockchain.replaceChain(parsedMessage);//, true, () => {
                //     this.transactionPool.clearBlockchainTransactions(
                //       { chain: parsedMessage.chain }
                //     );
                //   });
                  break;
                // case CHANNELS.TRANSACTION:
                //   if (!this.transactionPool.existingTransaction({
                //     inputAddress: this.wallet.publicKey
                //   })) {
                //     this.transactionPool.setTransaction(parsedMessage);
                //   }
                //   break;
                default:
                  return;
              }
            }
          }    
    }

    

    publish({channel, message}){
        this.pubnub.publish({channel,message});
    }

}
//const testPubSub = new PubSub();
//testPubSub.pubnub.publish({channel : CHANNELS.TEST,message : 'The universe is friendly!'});

module.exports = PubSub;