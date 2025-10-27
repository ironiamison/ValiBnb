const {
  getTransaction,
  getTransactionReceipt,
  getTransactionConfirmations,
  weiToBnb
} = require('./web3Service');

const MIN_CONFIRMATIONS = parseInt(process.env.MIN_CONFIRMATIONS) || 3;
const MAX_PAYMENT_AGE_HOURS = parseInt(process.env.MAX_PAYMENT_AGE_HOURS) || 24;

/**
 * Verify a payment transaction
 */
async function verifyPayment({ transactionHash, fromAddress, toAddress, expectedAmount, currency = 'BNB' }) {
  try {
    // Get transaction details
    const tx = await getTransaction(transactionHash);
    const receipt = await getTransactionReceipt(transactionHash);
    
    // Check if transaction status is successful
    if (receipt.status === false) {
      return {
        valid: false,
        reason: 'Transaction failed or reverted',
        transactionHash
      };
    }

    // Verify from address
    if (tx.from.toLowerCase() !== fromAddress.toLowerCase()) {
      return {
        valid: false,
        reason: 'From address mismatch',
        expected: fromAddress.toLowerCase(),
        actual: tx.from.toLowerCase(),
        transactionHash
      };
    }

    // Verify to address
    if (tx.to && tx.to.toLowerCase() !== toAddress.toLowerCase()) {
      return {
        valid: false,
        reason: 'To address mismatch',
        expected: toAddress.toLowerCase(),
        actual: tx.to?.toLowerCase() || 'null',
        transactionHash
      };
    }

    // Check currency
    if (currency !== 'BNB') {
      // For now, only support BNB native currency
      return {
        valid: false,
        reason: `Unsupported currency: ${currency}. Only BNB is currently supported.`,
        transactionHash
      };
    }

    // Verify amount (transaction value in BNB)
    const actualAmount = parseFloat(weiToBnb(tx.value));
    const expectedAmountNum = parseFloat(expectedAmount);
    const tolerance = 0.0000001; // Very small tolerance for floating point comparison
    
    if (Math.abs(actualAmount - expectedAmountNum) > tolerance) {
      return {
        valid: false,
        reason: 'Amount mismatch',
        expected: expectedAmountNum,
        actual: actualAmount,
        transactionHash
      };
    }

    // Check confirmations
    const confirmations = await getTransactionConfirmations(transactionHash);
    if (confirmations < MIN_CONFIRMATIONS) {
      return {
        valid: false,
        reason: 'Insufficient confirmations',
        confirmations,
        required: MIN_CONFIRMATIONS,
        transactionHash
      };
    }

    // Check transaction age
    const txAge = Date.now() / 1000 - receipt.blockNumber * 3; // BSC block time ~3 seconds
    const maxAge = MAX_PAYMENT_AGE_HOURS * 3600;
    if (txAge > maxAge) {
      return {
        valid: false,
        reason: 'Transaction too old',
        ageHours: txAge / 3600,
        maxAgeHours: MAX_PAYMENT_AGE_HOURS,
        transactionHash
      };
    }

    // All checks passed
    return {
      valid: true,
      transactionHash,
      from: tx.from,
      to: tx.to,
      amount: actualAmount,
      currency,
      confirmations,
      blockNumber: receipt.blockNumber
    };

  } catch (error) {
    return {
      valid: false,
      error: error.message,
      transactionHash
    };
  }
}

/**
 * Settle a payment (mark as processed)
 */
async function settlePayment({ transactionHash, recipientAddress, amount, currency = 'BNB' }) {
  try {
    // First verify the payment
    const verification = await verifyPayment({
      transactionHash,
      fromAddress: 'ANY', // Not checking from address for settlement
      toAddress: recipientAddress,
      expectedAmount: amount,
      currency
    });

    if (!verification.valid) {
      return {
        success: false,
        reason: verification.reason || verification.error,
        transactionHash
      };
    }

    // TODO: In a full implementation, you would:
    // 1. Update database to mark payment as settled
    // 2. Trigger any downstream processes
    // 3. Send notifications
    
    // For now, just return success
    return {
      success: true,
      settled: true,
      transactionHash,
      recipient: recipientAddress,
      amount: verification.amount,
      currency,
      confirmations: verification.confirmations,
      blockNumber: verification.blockNumber,
      settledAt: new Date().toISOString()
    };

  } catch (error) {
    return {
      success: false,
      error: error.message,
      transactionHash
    };
  }
}

module.exports = {
  verifyPayment,
  settlePayment
};

