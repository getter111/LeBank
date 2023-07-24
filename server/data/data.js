//mock data representing users in the database
export const dataUser = [
  {
    _id: "63701cc1f03239c72c00017f",
    username: "kirito",
    password: "$2b$10$w4gCeXmyEIxffOaK/CfdIerRUWG5ER13HoUvH7Mn7ATIR0jG1k4ve", //tester1
    accountBalance: "$2000.88",
    transactions: ["thing1", "thing2", "thing3"],
    expensesByCategory: {
      food: "$200.89",
      utilities: "$60",
      clothes: "$1740",
    },
  },
  {
    _id: "63701cc1f03239c72c000180",
    username: "bomba",
    password: "$2b$10$1KGnpDQgeIbViz09QBvPGO3jyrGskTjkujiXhUwQvxhkH6NLSOWWK", //4321
    accountBalance: "$5000.00",
    transactions: ["apple", "poop", "keychain"],
    expensesByCategory: {
      food: "$500.00",
      utilities: "$100.00",
      clothes: "$4400.00",
    },
  },
  {
    _id: "64bad48e38f3cbbee41def65",
    username: "User",
    password: "$2b$10$1KGnpDQgeIbViz09QBvPGO3jyrGskTjkujiXhUwQvxhkH6NLSOWWK", //4321
    accountBalance: "$5000.00",
    transactions: ["User1thing", "poop", "keychain"],
    expensesByCategory: {
      food: "$500.00",
      utilities: "$100.00",
      clothes: "$4400.00",
    },
  },
  {},
];
