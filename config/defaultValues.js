export default defaultValues = {
  multipliers: {
    realEstate: 1,
    crypto: 1,
    cash: 1,
    cars: 1,
    stocks: 1,
  },
  ownedProperties: [
    {
      name: "Cheap Car",
      isAnAsset: false,
      ammount: 1,
      pricePaid: 5000,
    },
    {
      name: "Cash",
      isAnAsset: true,
      ammount: 5000,
    },
    {
      name: "Small House",
      isAnAsset: false,
      ammount: 1,
      pricePaid: 200000,
    },
    {
      name: "Salary",
      isAnAsset: true,
      ammount: 1,
    },
  ],
  passedEvents: [],
  debt: 102500,
};
