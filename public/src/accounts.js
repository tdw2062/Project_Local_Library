//Create function to find an account with an id matching that given
function findAccountById(accounts, id) {
  let found = accounts.find((account) => account.id === id);
  return found;
}

//Sort the accounts by last name
function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );
  return accounts;
}

//Return an the total number of times a borrower has borrowed any book
//id is destructured from an account object
function getTotalNumberOfBorrows({ id }, books) {
  let counter = 0;

  for (let i = 0; i < books.length; i++) {
    let borrowArray = books[i].borrows;
    for (let j = 0; j < borrowArray.length; j++) {
      if (borrowArray[j].id === id) counter++;
    }
  }
  return counter;
}

//Return an array of book objects (with author object inside) currently checked out by a given borrower
function getBooksPossessedByAccount(account, books, authors) {
  let resultsArray = [];

  //Loop through books array
  for (let i = 0; i < books.length; i++) {
    let author = authors.find((author) => author.id === books[i].authorId);
    let borrowArrayItem = books[i].borrows[0];

    //If the first item in the borrows array shows the given borrower has checked the book out
    //then put the book object (with the author object inside) in resultsArray
    if (
      borrowArrayItem.id === account.id &&
      borrowArrayItem.returned === false
    ) {
      let newObject = books[i];
      newObject.author = author;
      resultsArray.push(newObject);
    }
  }

  return resultsArray;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
