// Account business logic module
// Equivalent to the COBOL data.cob and operations.cob combined

let balance = 1000.00; // Initial balance as per COBOL

/**
 * Get the current account balance
 * @returns {number} Current balance
 */
function getBalance() {
  return balance;
}

/**
 * Credit (add) amount to the account
 * @param {number} amount - Amount to credit
 * @returns {object} Result with success flag and message
 */
function credit(amount) {
  if (typeof amount === 'number' && amount >= 0) {
    balance += amount;
    return {
      success: true,
      message: `Amount credited. New balance: ${balance.toFixed(2)}`
    };
  } else {
    return {
      success: false,
      message: 'Invalid amount. Please enter a valid positive number.'
    };
  }
}

/**
 * Debit (subtract) amount from the account
 * @param {number} amount - Amount to debit
 * @returns {object} Result with success flag and message
 */
function debit(amount) {
  if (typeof amount === 'number' && amount >= 0) {
    if (balance >= amount) {
      balance -= amount;
      return {
        success: true,
        message: `Amount debited. New balance: ${balance.toFixed(2)}`
      };
    } else {
      return {
        success: false,
        message: 'Insufficient funds for this debit.'
      };
    }
  } else {
    return {
      success: false,
      message: 'Invalid amount. Please enter a valid positive number.'
    };
  }
}

/**
 * Reset balance to initial value (for testing purposes)
 */
function resetBalance() {
  balance = 1000.00;
}

module.exports = {
  getBalance,
  credit,
  debit,
  resetBalance
};