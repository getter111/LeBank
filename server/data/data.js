//mock data representing users in the database
export const dataUser = [
  {
    _id: "63701cc1f03239c72c00017f",
    username: "kirito",
    password: "tester1",
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
    password: "4321",
    accountBalance: "$5000.00",
    transactions: ["apple", "poop", "keychain"],
    expensesByCategory: {
      food: "$500.00",
      utilities: "$100.00",
      clothes: "$4400.00",
    },
  },
];
