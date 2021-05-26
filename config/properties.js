// Assets
import richHouse from "../assets/img/richHouse.png";
import poorHouse from "../assets/img/poorHouse.png";
import bigHouse from "../assets/img/bigHouse.png";
import bill from "../assets/img/bill-icon.png";
import bitcoin from "../assets/img/bitcoin-icon.png";
import salary from "../assets/img/briefcase-icon.png";
import luxuryCar from "../assets/img/luxuriousCar.png";
import cheapCar from "../assets/img/cheapCar.png";
import cybertruck from "../assets/img/cybertruck.png";
import luxuryDepartment from "../assets/img/luxuriousDepartment.png";
// import smallBusiness from "../assets/img/smallBusiness.png";
import smallDepartment from "../assets/img/smallDepartment.png";
import stocks from "../assets/img/stocks.png";

// Exportable object
export default properties = [
  {
    name: "Beach Mansion",
    img: richHouse,
    value: 5000000,
    type: "realEstate",
    stats: {
      asset: {
        cashFlow: 25000,
        lifeQuality: 0,
      },
      commodity: {
        cashFlow: -2000,
        lifeQuality: 40,
      },
    },
  },
  {
    name: "Big House",
    img: bigHouse,
    value: 600000,
    type: "realEstate",
    stats: {
      asset: {
        cashFlow: 1000,
        lifeQuality: 0,
      },
      commodity: {
        cashFlow: -100,
        lifeQuality: 20,
      },
    },
  },
  {
    name: "Small House",
    img: poorHouse,
    value: 200000,
    type: "realEstate",
    stats: {
      asset: {
        cashFlow: 1000,
        lifeQuality: 0,
      },
      commodity: {
        cashFlow: -100,
        lifeQuality: 10,
      },
    },
  },
  {
    name: "Bitcoin",
    img: bitcoin,
    value: 1000,
    type: "crypto",
    stats: {
      asset: {
        cashFlow: 0,
        lifeQuality: 0,
      },
    },
  },
  {
    name: "Small Deparment",
    img: smallDepartment,
    value: 100000,
    type: "realEstate",
    stats: {
      asset: {
        cashFlow: 800,
        lifeQuality: 10,
      },
      commodity: {
        cashFlow: -80,
        lifeQuality: 0,
      },
    },
  },
  {
    name: "Luxurious Deparment",
    img: luxuryDepartment,
    value: 1000000,
    type: "realEstate",
    stats: {
      asset: {
        cashFlow: 10000,
        lifeQuality: 10,
      },
      commodity: {
        cashFlow: -800,
        lifeQuality: 30,
      },
    },
  },
  {
    name: "Salary",
    img: salary,
    value: 0,
    type: "salary",
    stats: {
      asset: {
        cashFlow: 4000,
        lifeQuality: -35,
      },
    },
  },
  {
    name: "Cash",
    img: bill,
    value: 1,
    type: "cash",
    stats: {
      asset: {
        cashFlow: 0.01,
        lifeQuality: 0,
      },
      commodity: {
        cashFlow: 0.002,
        lifeQuality: 0,
      },
    },
  },
  // {
  //   name: "Small Business",
  //   img: smallBusiness,
  //   value: 1000000,
  //   type: "business",
  //   stats: {
  //     asset: {
  //       cashFlow: 10000,
  //       lifeQuality: 0,
  //     },
  //   },
  // },
  {
    name: "Cheap Car",
    img: cheapCar,
    value: 5000,
    type: "cars",
    stats: {
      asset: {
        cashFlow: 400,
        lifeQuality: 0,
      },
      commodity: {
        cashFlow: -100,
        lifeQuality: 5,
      },
    },
  },
  {
    name: "Cybertruck",
    img: cybertruck,
    value: 40000,
    type: "cars",
    stats: {
      asset: {
        cashFlow: 4000,
        lifeQuality: 0,
      },
      commodity: {
        cashFlow: -200,
        lifeQuality: 20,
      },
    },
  },
  {
    name: "Luxurious Car",
    img: luxuryCar,
    value: 200000,
    type: "cars",
    stats: {
      asset: {
        cashFlow: 10000,
        lifeQuality: 0,
      },
      commodity: {
        cashFlow: -1000,
        lifeQuality: 30,
      },
    },
  },
  {
    name: "S&P 500",
    img: stocks,
    value: 300,
    type: "stocks",
    stats: {
      asset: {
        cashFlow: 3,
        lifeQuality: 0,
      },
    },
  },
];
