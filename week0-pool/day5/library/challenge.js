const books = require("./books.json");

function sortByProperty(arr, prop_name) {
  let hole;
  let value;

  for (let i = 1; i < arr.length; i++) {
    value = arr[i];
    hole = i;
    //? instead of sorting the whole element  we are comparing property values 
    while (hole > 0 && arr[hole - 1][prop_name] > value[prop_name]) {
      arr[hole] = arr[hole - 1];

      hole--;
    }
    arr[hole] = value;
  }
  return arr;
}

function insertion_sort(arr) {
  let hole;
  let value;

  for (let i = 1; i < arr.length; i++) {
    value = arr[i];
    hole = i;
    while (hole > 0 && arr[hole - 1] > value) {
      arr[hole] = arr[hole - 1];

      hole--;
    }
    arr[hole] = value;
  }
  return arr;
}

//? Yusri
function priceOfBook(bookName) {
  // using linear search
  if (bookName === "") return "Not Found"; // we should declare not found, to not waste time waiting the whole loop to end. for performance
  for (let i = 0; i < books.length; i++) {
    if (books[i].title === bookName) {
      return books[i].price;
    }
  }
  return "Not found";
}

//? Othman
function affordableBooks(budget) {
  let arr = []; // Initialize an empty array to hold the titles of affordable books

  // Check if the budget is a negative number or 0
  if (budget <= 0) return "Can't search with this number";

  // Iterate through each book in the 'books' array
  for (let i = 0; i <= books.length - 1; i++) {
    // Check if the price of the current book is within the budget
    if (books[i].price <= budget) {
      // If it is within budget, add the book's title to the array
      arr.push(books[i].title);
    }
  }

  return arr;
}

//? Othman
function findBookByGenre(genre) {
  let arr = []; // Initialize an empty array to hold the titles of matching books

  if (genre === "") return "Invalid Genre";
  // Iterate through each book in the 'books' array
  for (let i = 0; i <= books.length - 1; i++) {
    // Iterate through the genres of the current book
    for (let j = 0; j < books[i].genres.length; j++) {
      // Check if the current genre matches the given genre
      if (books[i].genres[j] === genre) {
        // If it's a match, add the book's title to the array
        arr.push(books[i].title);
      }
    }
  }
  return arr;
}

//? Abder
function groupByGenre() {
  // write your code here
  let group = {};
  let genres_all = [];
  let genres_unique = [];

  //create an array with all the genres we have on all the objects
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i]["genres"].length; j++) {
      genres_all.push(books[i]["genres"][j]);
    }
  }

  //? we will sort to make sure the duplicate genres become adjacent
  genres_all = insertion_sort(genres_all);

  //? creating the array with unique genres
  for (let k = 0; k < genres_all.length; k++) {
    genres_unique.push(genres_all[k]);
    while (genres_all[k] === genres_all[k + 1]) k++;
  }

  //? initialzing the obejcts with the genres as keys and empty arrays as intial vlaues
  for (let i = 0; i < genres_unique.length; i++) {
    group[genres_unique[i]] = [];
  }

  //?
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i]["genres"].length; j++) {
      group[books[i]["genres"][j]].push(books[i].title);
    }
  }
  return group;
}

//?Abder
function sortBooksByPrice() {
  return sortByProperty(books, "price");
}
console.log(groupByGenre())
// (function main() {
//   try {
//     if (priceOfBook("The Alchemist") !== 9.49) {
//       throw new Error("priceOfBook is not working properly.");
//     }
//     if (affordableBooks(10).length !== 6) {
//       throw new Error("affordableBooks is not working properly.");
//     }
//     if (findBookByGenre("Fiction").length !== 7) {
//       throw new Error("findBookByGenre is not working properly.");
//     }
//     if (Object.keys(groupByGenre()).length !== 30) {
//       throw new Error("groupByGenre is not working properly.");
//     }
//     if (sortBooksByPrice()[0].price !== 5.99) {
//       throw new Error("sortBooksByPrice is not working properly.");
//     }
//     console.log("All tests passed successfully.");
//   } catch (error) {
//     console.log(error);
//   }
// })();
