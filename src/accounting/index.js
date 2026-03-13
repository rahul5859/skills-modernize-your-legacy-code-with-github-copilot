const readline = require('readline');
const { getBalance, credit, debit } = require('./account');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log('--------------------------------');
  console.log('Account Management System');
  console.log('1. View Balance');
  console.log('2. Credit Account');
  console.log('3. Debit Account');
  console.log('4. Exit');
  console.log('--------------------------------');
  rl.question('Enter your choice (1-4): ', (choice) => {
    handleChoice(choice.trim());
  });
}

function handleChoice(choice) {
  switch (choice) {
    case '1':
      // View Balance - equivalent to TOTAL operation
      console.log(`Current balance: ${getBalance().toFixed(2)}`);
      showMenu();
      break;

    case '2':
      // Credit Account - equivalent to CREDIT operation
      rl.question('Enter credit amount: ', (amount) => {
        const amt = parseFloat(amount.trim());
        const result = credit(amt);
        console.log(result.message);
        showMenu();
      });
      break;

    case '3':
      // Debit Account - equivalent to DEBIT operation
      rl.question('Enter debit amount: ', (amount) => {
        const amt = parseFloat(amount.trim());
        const result = debit(amt);
        console.log(result.message);
        showMenu();
      });
      break;

    case '4':
      // Exit - equivalent to setting CONTINUE-FLAG to 'NO'
      console.log('Exiting the program. Goodbye!');
      rl.close();
      break;

    default:
      console.log('Invalid choice, please select 1-4.');
      showMenu();
      break;
  }
}

// Start the application - equivalent to MAIN-LOGIC in COBOL
showMenu();