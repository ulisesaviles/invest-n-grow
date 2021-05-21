export const priceToStr = (price) => {
  if (price > 0) {
    price = price.toString();

    if (price.length < 4) {
      return price;
    }

    if (price.length < 7) {
      return price.slice(0, price.length - 3) + "k";
    }

    return price.slice(0, price.length - 6) + "M";
  } else if (price < 0) {
    price = price.toString();

    if (price.length < 5) {
      return price;
    }

    if (price.length < 8) {
      return price.slice(0, price.length - 3) + "k";
    }

    return price.slice(0, price.length - 6) + "M";
  }
  return price.toString();
};
