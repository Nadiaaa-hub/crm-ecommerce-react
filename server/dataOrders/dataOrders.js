export const orders = [
  {
    id: "1a2b3c",
    date: "2025-01-01T12:00:00.000Z",
    client: {
      name: "Patricia Robertson Reyn",
      phone: "+380931234567",
      postOffice: "Nova Poshta №122",
      email: "example@gmail.com",
    },
    items: [
      {
        id: "10aa",
        title: "Flower Vase blue (40*50cm)",
        price: 1000,
        quantity: 2,
      },
    ],
    total: 2000,
  },

  {
    id: "2b3c4d",
    date: "2025-01-02T15:30:00.000Z",
    client: {
      name: "John Smith",
      phone: "+380671234567",
      postOffice: "Nova Poshta №55",
      email: "john.smith@gmail.com",
    },
    items: [
      {
        id: "20bb",
        title: "Wooden Frame (30*40cm)",
        price: 800,
        quantity: 1,
      },
    ],
    total: 800,
  },
];
