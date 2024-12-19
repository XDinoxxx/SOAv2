const offensesUrl = 'http://localhost:3001/offenses';
const accountsUrl = 'http://localhost:3002/account/';
const transactionsUrl = 'http://localhost:3002/transaction/';

async function fetchOffenses() {
    const response = await fetch(offensesUrl);
    return await response.json();
}

async function fetchAccounts() {
    const response = await fetch(accountsUrl);
    return await response.json();
}

async function payFine(offense) {
    const accounts = await fetchAccounts();
    const matchingAccount = accounts.find(account => 
        account.name === offense.driver_name &&
        account.surname === offense.driver_surname
    );

    if (!matchingAccount) {
        alert(`No matching account found for ${offense.driver_name} ${offense.driver_surname}`);
        return;
    }

    if (matchingAccount.balance < offense.sum) {
        alert(`Insufficient funds for ${matchingAccount.name} ${matchingAccount.surname}`);
        return;
    }

    const transactionPayload = {
        account_id: matchingAccount.id,
        number_account: 'numberoffenses',
        amount: offense.sum
    };

    const response = await fetch(transactionsUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transactionPayload)
    });

    if (response.ok) {
        alert('Fine paid successfully!');
        
        const updateOffenses = {
            id: offense.id, 
            driver_name: offense.driver_name,
            driver_surname: offense.driver_surname,
            amount: 0 
        };
        
        const response = await fetch(offensesUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateOffenses)
        });
        

        updateUI();
    } else {
        alert('Error paying fine.');
    }
}

async function updateUI() {
    const offenses = await fetchOffenses();
    const offensesContainer = document.getElementById('offenses-container');
    offensesContainer.innerHTML = '';

    offenses.forEach(offense => {
        const offenseElement = document.createElement('div');
        offenseElement.classList.add('offense');

        offenseElement.innerHTML = `
            <p>Driver: ${offense.driver_name} ${offense.driver_surname}</p>
            <p>Fine: $${offense.sum}</p>
            <button onclick="payFine(${JSON.stringify(offense).replace(/"/g, '&quot;')})">Pay Fine</button>
        `;

        offensesContainer.appendChild(offenseElement);
    });
}

updateUI();
