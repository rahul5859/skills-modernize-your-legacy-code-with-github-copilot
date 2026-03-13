const { getBalance, credit, debit, resetBalance } = require('./account');

describe('COBOL Student Account Management System - Unit Tests', () => {
  beforeEach(() => {
    // Reset balance to initial state before each test
    resetBalance();
  });

  // TC001: Verify initial account balance display
  test('TC001 - should display initial balance of $1000.00', () => {
    expect(getBalance()).toBe(1000.00);
  });

  // TC002: Verify credit operation with positive amount
  test('TC002 - should credit $500.00 and update balance to $1500.00', () => {
    const result = credit(500.00);
    expect(result.success).toBe(true);
    expect(result.message).toBe('Amount credited. New balance: 1500.00');
    expect(getBalance()).toBe(1500.00);
  });

  // TC003: Verify debit operation with sufficient funds
  test('TC003 - should debit $200.00 when balance is sufficient', () => {
    const result = debit(200.00);
    expect(result.success).toBe(true);
    expect(result.message).toBe('Amount debited. New balance: 800.00');
    expect(getBalance()).toBe(800.00);
  });

  // TC004: Verify debit operation with insufficient funds
  test('TC004 - should reject debit of $1500.00 when balance is insufficient', () => {
    const result = debit(1500.00);
    expect(result.success).toBe(false);
    expect(result.message).toBe('Insufficient funds for this debit.');
    expect(getBalance()).toBe(1000.00); // Balance unchanged
  });

  // TC005: Verify multiple credit operations
  test('TC005 - should handle multiple credit operations cumulatively', () => {
    credit(100.00);
    credit(250.00);
    expect(getBalance()).toBe(1350.00);
  });

  // TC006: Verify multiple debit operations
  test('TC006 - should handle multiple debit operations cumulatively', () => {
    debit(100.00);
    debit(50.00);
    expect(getBalance()).toBe(850.00);
  });

  // TC007: Verify credit followed by debit
  test('TC007 - should handle mixed credit and debit operations', () => {
    credit(300.00);
    debit(150.00);
    expect(getBalance()).toBe(1150.00);
  });

  // TC008: Verify balance persistence across operations
  test('TC008 - should maintain balance persistence across operations', () => {
    credit(100.00);
    expect(getBalance()).toBe(1100.00);
    debit(50.00);
    expect(getBalance()).toBe(1050.00);
    expect(getBalance()).toBe(1050.00); // Multiple calls return same value
  });

  // TC011: Verify zero amount credit
  test('TC011 - should allow zero amount credit', () => {
    const result = credit(0.00);
    expect(result.success).toBe(true);
    expect(result.message).toBe('Amount credited. New balance: 1000.00');
    expect(getBalance()).toBe(1000.00);
  });

  // TC012: Verify zero amount debit
  test('TC012 - should allow zero amount debit', () => {
    const result = debit(0.00);
    expect(result.success).toBe(true);
    expect(result.message).toBe('Amount debited. New balance: 1000.00');
    expect(getBalance()).toBe(1000.00);
  });

  // TC013: Verify exact balance debit
  test('TC013 - should allow debiting exact balance amount', () => {
    const result = debit(1000.00);
    expect(result.success).toBe(true);
    expect(result.message).toBe('Amount debited. New balance: 0.00');
    expect(getBalance()).toBe(0.00);
  });

  // TC014: Verify large amount credit
  test('TC014 - should handle large amount credits', () => {
    const result = credit(999999.99);
    expect(result.success).toBe(true);
    expect(result.message).toBe('Amount credited. New balance: 1000999.99');
    expect(getBalance()).toBe(1000999.99);
  });

  // Additional tests for invalid inputs
  test('should reject negative credit amount', () => {
    const result = credit(-100.00);
    expect(result.success).toBe(false);
    expect(result.message).toBe('Invalid amount. Please enter a valid positive number.');
    expect(getBalance()).toBe(1000.00);
  });

  test('should reject negative debit amount', () => {
    const result = debit(-100.00);
    expect(result.success).toBe(false);
    expect(result.message).toBe('Invalid amount. Please enter a valid positive number.');
    expect(getBalance()).toBe(1000.00);
  });

  test('should reject non-numeric credit amount', () => {
    const result = credit('abc');
    expect(result.success).toBe(false);
    expect(result.message).toBe('Invalid amount. Please enter a valid positive number.');
    expect(getBalance()).toBe(1000.00);
  });

  test('should reject non-numeric debit amount', () => {
    const result = debit('abc');
    expect(result.success).toBe(false);
    expect(result.message).toBe('Invalid amount. Please enter a valid positive number.');
    expect(getBalance()).toBe(1000.00);
  });
});