const { Web3 } = require('web3');

let web3 = null;

function initializeWeb3() {
  try {
    const rpcUrl = process.env.NETWORK === 'testnet' 
      ? process.env.BSC_TESTNET_RPC_URL 
      : process.env.BSC_RPC_URL;
    
    web3 = new Web3(rpcUrl);
    console.log(`Connected to BSC ${process.env.NETWORK || 'mainnet'}`);
  } catch (error) {
    console.error('Failed to initialize Web3:', error);
    throw error;
  }
}

function getWeb3() {
  if (!web3) {
    initializeWeb3();
  }
  return web3;
}

async function getWeb3Status() {
  try {
    const web3Instance = getWeb3();
    const isListening = await web3Instance.eth.net.isListening();
    const latestBlock = await web3Instance.eth.getBlockNumber();
    const networkId = await web3Instance.eth.net.getId();
    
    return {
      connected: isListening,
      currentBlock: Number(latestBlock),
      networkId: Number(networkId)
    };
  } catch (error) {
    return {
      connected: false,
      error: error.message
    };
  }
}

async function getTransaction(txHash) {
  try {
    const web3Instance = getWeb3();
    const tx = await web3Instance.eth.getTransaction(txHash);
    
    if (!tx) {
      throw new Error('Transaction not found');
    }
    
    return tx;
  } catch (error) {
    throw new Error(`Failed to fetch transaction: ${error.message}`);
  }
}

async function getTransactionReceipt(txHash) {
  try {
    const web3Instance = getWeb3();
    const receipt = await web3Instance.eth.getTransactionReceipt(txHash);
    
    if (!receipt) {
      throw new Error('Transaction receipt not found');
    }
    
    return receipt;
  } catch (error) {
    throw new Error(`Failed to fetch transaction receipt: ${error.message}`);
  }
}

async function getTransactionConfirmations(txHash) {
  try {
    const web3Instance = getWeb3();
    const receipt = await web3Instance.eth.getTransactionReceipt(txHash);
    
    if (!receipt) {
      return 0;
    }
    
    const currentBlock = await web3Instance.eth.getBlockNumber();
    return currentBlock - receipt.blockNumber;
  } catch (error) {
    return 0;
  }
}

function weiToBnb(wei) {
  const web3Instance = getWeb3();
  return web3Instance.utils.fromWei(wei.toString(), 'ether');
}

function bnbToWei(bnb) {
  const web3Instance = getWeb3();
  return web3Instance.utils.toWei(bnb.toString(), 'ether');
}

module.exports = {
  initializeWeb3,
  getWeb3,
  getWeb3Status,
  getTransaction,
  getTransactionReceipt,
  getTransactionConfirmations,
  weiToBnb,
  bnbToWei
};

