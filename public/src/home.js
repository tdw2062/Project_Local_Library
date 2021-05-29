//Return total books counted
function getTotalBooksCount(books) {
  return books.length;
}

//Return total accounts number
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

//Return array of books that are checked out
function getBooksBorrowedCount(books) {
  let result = books.filter((book) => book.borrows[0].returned === false);
  return result.length;
}

//Get an array of objects of most common genres with name and count
function getMostCommonGenres(books) {
  let resultsArray = [];

  for (let i = 0; i < books.length; i++) {
    if (resultsArray.some((result) => result.name === books[i].genre)) {
      //Case where genre already exists in resultsArray (find and increment)
      for (j = 0; j < resultsArray.length; j++) {
        if (resultsArray[j].name === books[i].genre) {
          resultsArray[j].count++;
        }
      }
    } else {
      //Case where genre is new to resultsArray (create new object)
      let newObject = {};
      newObject.name = books[i].genre;
      newObject.count = 1;
      resultsArray.push(newObject);
    }
  }
  //Sort the resultsArray
  resultsArray.sort((obj1, obj2) => (obj1.count < obj2.count ? 1 : -1));

  //Keep top 5 genres
  top5Array = resultsArray.slice(0, 5);
  return top5Array;
}

//Return an array of books that have been checked out the most
function getMostPopularBooks(books) {
  let resultsArray = [];

  //Helper function to be used with map() method
  //Takes book object and transforms it to an object with name and count
  function myFunction(book) {
    let newObject = {};
    newObject.name = book.title;
    newObject.count = book.borrows.length;
    return newObject;
  }

  resultsArray = books.map(myFunction);

  //Sort the resultsArray
  resultsArray.sort((obj1, obj2) => (obj1.count < obj2.count ? 1 : -1));

  //Keep top 5 genres
  top5Array = resultsArray.slice(0, 5);
  return top5Array;
}

//return an array of the most popular authors (objects with name and count)
function getMostPopularAuthors(books, authors) {
  let resultsArray = [];

  //Loop through authors array
  for (let i = 0; i < authors.length; i++) {
    //Filter books by author
    let filteredArray = books.filter((book) => authors[i].id === book.authorId);

    //Add together total times their books have been borrowed
    let count = filteredArray.reduce(
      (acc, book) => acc + book.borrows.length,
      0
    );
    let name = authors[i].name.first + " " + authors[i].name.last;
    let newObject = { name, count };
    resultsArray.push(newObject);
    console.log(resultsArray);
  }

  //Sort the resultsArray
  resultsArray.sort((obj1, obj2) => (obj1.count < obj2.count ? 1 : -1));

  //Keep top 5 genres
  top5Array = resultsArray.slice(0, 5);
  return top5Array;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
