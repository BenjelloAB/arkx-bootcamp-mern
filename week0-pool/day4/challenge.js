const books = require("./books.json");

// console.log(books.length/);
function sortByProperty(arr, prop_name) {
  let hole;
  let value;

  for (let i = 1; i < arr.length; i++) {
    value = arr[i];
    hole = i;
    while (hole > 0 && arr[hole - 1][prop_name] > value[prop_name]) {
      arr[hole] = arr[hole - 1];

      hole--;
    }
    arr[hole] = value;
  }
  return arr;
}
console.log("============books================")
console.log(books)
console.log("============books sorted================");
console.log(sortByProperty(books, "title"));
console.log("===============books price=============")

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

function priceOfBook(bookName) {
  // write your code here
  if (bookName === "") return "Not Found";
  for (let i = 0; i < books.length; i++) {
    if (books[i].title === bookName) {
      return books[i].price;
    }
  }
  return "Not found";
}
console.log(priceOfBook("The Alchemist"));
console.log(affordableBooks(10).length);
console.log(findBookByGenre("Fiction").length);
console.log(findBookByGenre("Fiction"));
function affordableBooks(budget) {
  // write your code here
  let budgeted_books = [];
  for (let i = 0; i < books.length; i++) {
    if (books[i].price <= budget) {
      budgeted_books.push(books[i].title);
    }
  }
  return budgeted_books;
}

function findBookByGenre(genre) {
  // write your code here
  same_genre_books = [];
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i].genres.length; j++) {
      if (books[i]["genres"][j] === genre) {
        same_genre_books.push(books[i].title);
      }
    }
  }
  return same_genre_books;
}

function groupByGenre() {
  // write your code here
  let group = {};
  let genres_all = [];
  let genres_unique = [];
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i]["genres"].length; j++) {
      genres_all.push(books[i]["genres"][j]);
    }
  }
  genres_all = insertion_sort(genres_all);
  for (let k = 0; k < genres_all.length; k++) {
    genres_unique.push(genres_all[k]);
    while (genres_all[k] === genres_all[k + 1]) k++;
  }

   

  for(let i = 0; i < genres_unique.length; i++)
  {
    group[genres_unique[i]] = [];
  }
  console.log("============= group object :=========");
  console.log(group);

  for(let i = 0; i < books.length; i++)
  {
          for(let j = 0; j < books[i]["genres"].length; j++)
          {
            console.log("books[i][\"genres\"][j] : ", books[i]["genres"][j])
            // console.log("typeof books[i][\"genres\"][i] : ", typeof books[i]["genres"][i])
            // console.log(" group[books[i][\"genres\"][i]] :",  group[books[i]["genres"][i]])
            // console.log(" group['Dystopian'] :",  group["Dystopian"])
            group[books[i]["genres"][j]].push(books[i].title);
          }

        return group;
  }

  console.log("================genres_all : =================");
  console.log(genres_all);
  console.log("=============genres_unique :=========");
  console.log(genres_unique);
  console.log("genres_unique.length = ", genres_unique.length);
  console.log("============= group object :=========");
  console.log(group);
}
console.log(groupByGenre());

function sortBooksByPrice() {
  // write your code here
  return sortByProperty(books, "price");
}

(function main() {
  try {
    if (priceOfBook("The Alchemist") !== 9.49) {
      throw new Error("priceOfBook is not working properly.");
    }
    if (affordableBooks(10).length !== 6) {
      throw new Error("affordableBooks is not working properly.");
    }
    if (findBookByGenre("Fiction").length !== 7) {
      throw new Error("findBookByGenre is not working properly.");
    }
    if (Object.keys(groupByGenre()).length !== 30) {
      throw new Error("groupByGenre is not working properly.");
    }
    if (sortBooksByPrice()[0].price !== 5.99) {
      throw new Error("sortBooksByPrice is not working properly.");
    }
    console.log("All tests passed successfully.");
  } catch (error) {
    console.log(error);
  }
})();
