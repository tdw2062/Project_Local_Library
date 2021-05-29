//Get author object for the given id
function findAuthorById(authors, id) {
  let found = authors.find((author) => author.id === id);
  return found;
}

//Get book object for the given id
function findBookById(books, id) {
  let found = books.find((book) => book.id === id);
  return found;
}

//Create an array with contains an array with checked out books and an array with returned books
function partitionBooksByBorrowedStatus(books) {
  let combined = [];
  let checkedOut = books.filter((book) => book.borrows[0].returned === false);
  let available = books.filter((book) => book.borrows[0].returned === true);
  combined[0] = checkedOut;
  combined[1] = available;
  return combined;
}

//Return an array of borrowInstances objects with the borrower's info attached
function getBorrowersForBook(book, accounts) {
  let results = [];
  //Loop through book's borrows object
  for (let i = 0; i < book.borrows.length; i++) {
    if (i > 9) break;
    //Populate borrowInstance object with borrows object
    let borrowInstance = {};
    borrowInstance.id = book.borrows[i].id;
    borrowInstance.returned = book.borrows[i].returned;
    //Match the author by id in borrows object and then add all of the author information in borrowInstance
    let found = accounts.find((account) => account.id === borrowInstance.id);
    borrowInstance.name = found.name;
    borrowInstance.picture = found.picture;
    borrowInstance.age = found.age;
    borrowInstance.company = found.company;
    borrowInstance.email = found.email;
    borrowInstance.registered = found.registered;
    results[i] = borrowInstance;
  }

  return results;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
