# COBOL Student Account Management System - Test Plan

This test plan covers the business logic and functionality of the COBOL-based student account management system. It includes test cases for all account operations including balance viewing, crediting, and debiting with validation.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|--------------|----------------------|----------------|------------|----------------|----------------|-------------------|-----------|
| TC001 | Verify initial account balance display | Application is compiled and running | 1. Start the application<br>2. Select option 1 (View Balance) | Current balance displays as $1000.00 |  |  | Initial balance should be $1000.00 as per business rules |
| TC002 | Verify credit operation with positive amount | Application is running with initial balance | 1. Select option 2 (Credit Account)<br>2. Enter amount: 500.00<br>3. Select option 1 to view balance | Balance increases by $500.00, displays $1500.00 |  |  | Test basic credit functionality |
| TC003 | Verify debit operation with sufficient funds | Application is running with balance >= $200.00 | 1. Select option 3 (Debit Account)<br>2. Enter amount: 200.00<br>3. Select option 1 to view balance | Balance decreases by $200.00, displays updated balance |  |  | Test debit with sufficient funds |
| TC004 | Verify debit operation with insufficient funds | Application is running with balance < $500.00 | 1. Select option 3 (Debit Account)<br>2. Enter amount: 500.00 | Error message: "Insufficient funds for this debit." Balance unchanged |  |  | Business rule: No overdrafts allowed |
| TC005 | Verify multiple credit operations | Application is running | 1. Credit $100.00<br>2. Credit $250.00<br>3. View balance | Balance reflects cumulative credits ($1350.00) |  |  | Test accumulation of credits |
| TC006 | Verify multiple debit operations | Application is running with sufficient balance | 1. Debit $100.00<br>2. Debit $50.00<br>3. View balance | Balance reflects cumulative debits |  |  | Test accumulation of debits |
| TC007 | Verify credit followed by debit | Application is running | 1. Credit $300.00<br>2. Debit $150.00<br>3. View balance | Balance increases by $150.00 net |  |  | Test mixed operations |
| TC008 | Verify balance persistence across operations | Application remains running | 1. Perform credit/debit operations<br>2. View balance multiple times<br>3. Continue operations | Balance accurately maintained and displayed |  |  | Test data persistence in working storage |
| TC009 | Verify application exit | Application is running | 1. Select option 4 (Exit) | Application displays "Exiting the program. Goodbye!" and terminates |  |  | Test proper program termination |
| TC010 | Verify invalid menu choice handling | Application is running | 1. Enter invalid choice (e.g., 5)<br>2. Observe response | Displays "Invalid choice, please select 1-4." and shows menu again |  |  | Test input validation for menu choices |
| TC011 | Verify zero amount credit | Application is running | 1. Select credit<br>2. Enter amount: 0.00<br>3. View balance | Balance unchanged (or increases by 0) |  |  | Edge case: zero credit |
| TC012 | Verify zero amount debit | Application is running | 1. Select debit<br>2. Enter amount: 0.00<br>3. View balance | Balance unchanged (or decreases by 0) |  |  | Edge case: zero debit |
| TC013 | Verify exact balance debit | Application has balance of $1000.00 | 1. Debit $1000.00<br>2. View balance | Balance becomes $0.00 |  |  | Edge case: debit entire balance |
| TC014 | Verify large amount credit | Application is running | 1. Credit $999999.99<br>2. View balance | Balance reflects large credit amount |  |  | Test large number handling |
| TC015 | Verify menu loop continuation | Application is running | 1. Perform operations<br>2. Do not select exit<br>3. Observe behavior | Menu continues to display after each operation |  |  | Test program loop functionality |

## Test Execution Notes

- **Environment**: Ubuntu Linux with GnuCOBOL compiler
- **Test Data**: Use the default initial balance of $1000.00 unless otherwise specified
- **Execution Method**: Manual testing through interactive console interface
- **Pass Criteria**: Actual result matches expected result exactly
- **Business Rules Validation**:
  - Initial balance: $1000.00
  - Credits: Always allowed, any positive amount
  - Debits: Only allowed if balance >= debit amount
  - No negative balances permitted
  - Balance persistence across operations

## Future Implementation

This test plan will be used to create automated unit and integration tests in the Node.js modernization of this application.