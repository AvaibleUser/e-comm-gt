db.user.insertMany([
  {
    name: "John",
    lastname: "Doe",
    username: "johndoe",
    password: "password123",
    creditCards: [
      {
        cardType: "Visa",
        cardNumber: 1234567890,
        expirationDate: ISODate("2024-12-31"),
        CVV: 123,
      },
    ],
    userType: "seller",
  },
  {
    name: "Jane",
    lastname: "Doe",
    username: "janedoe",
    password: "password123",
    creditCards: [
      {
        cardType: "Mastercard",
        cardNumber: 0987654321,
        expirationDate: ISODate("2023-06-30"),
        CVV: 456,
      },
    ],
    userType: "seller",
  },
  {
    name: "Bob",
    lastname: "Smith",
    username: "bobsmith",
    password: "password123",
    creditCards: [
      {
        cardType: "American Express",
        cardNumber: 1111222233334444,
        expirationDate: ISODate("2025-02-28"),
        CVV: 789,
      },
    ],
    userType: "seller",
  },
  {
    name: "Alice",
    lastname: "Johnson",
    username: "alicejohnson",
    password: "password123",
    creditCards: [
      {
        cardType: "Visa",
        cardNumber: 5555666677778888,
        expirationDate: ISODate("2026-04-30"),
        CVV: 246,
      },
    ],
    userType: "seller",
  },
  {
    name: "Mark",
    lastname: "Davis",
    username: "markdavis",
    password: "password123",
    creditCards: [
      {
        cardType: "Mastercard",
        cardNumber: 4444333322221111,
        expirationDate: ISODate("2023-09-30"),
        CVV: 135,
      },
    ],
    userType: "seller",
  },
]);
