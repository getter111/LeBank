//mock data representing users in the database
export const dataUser = [
  {
    _id: "63701cc1f03239c72c00017f",
    //cookies: ""
    username: "kirito",
    password: "$2b$10$w4gCeXmyEIxffOaK/CfdIerRUWG5ER13HoUvH7Mn7ATIR0jG1k4ve", //tester1
  },
  {
    _id: "63701cc1f03239c72c000180",
    //cookies: ""
    username: "bomba",
    password: "$2b$10$1KGnpDQgeIbViz09QBvPGO3jyrGskTjkujiXhUwQvxhkH6NLSOWWK", //4321
  },
  {
    _id: "64bad48e38f3cbbee41def65",
    //cookies: ""
    username: "User",
    password: "$2b$10$1KGnpDQgeIbViz09QBvPGO3jyrGskTjkujiXhUwQvxhkH6NLSOWWK", //4321
  },
];

export const dataBankAccount = [
  {
    institution: "chase",
    accounts: {
      balances: {
        available: 100,
        current: 110,
        iso_currency_code: "USD",
        limit: 0,
        unofficial_currency_code: "String",
      },
      account_id: "String",
      mask: "String",
      name: "String",
      official_name: "String",
      subtype: "String",
      type: "String",
    },
    achNumbers: {
      account: "String",
      account_id: "String",
      routing: "String",
      wire_routing: "String",
    },
  },
  {
    institution: "chasfucker",
    accounts: {
      account_id: "119LKm3zwlFVG3dkDegeHJGaKR47VWiqL6848",
      balances: {
        available: 200,
        current: 210,
        iso_currency_code: "USD",
        limit: null,
        unofficial_currency_code: null,
      },
      mask: "1111",
      name: "Plaid Saving",
      official_name: "Plaid Silver Standard 0.1% Interest Saving",
      subtype: "savings",
      type: "depository", // L Mongoose fr, cant use type as field name rip
    },
    achNumbers: {
      account: "1111222233331111",
      account_id: "119LKm3zwlFVG3dkDegeHJGaKR47VWiqL6848",
      routing: "011401533",
      wire_routing: "021000021",
    },
  },
];
