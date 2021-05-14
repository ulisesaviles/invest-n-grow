export const priceToStr = (price) => {
  price = price.toString();

  if (price.length < 4) {
    return price;
  }

  if (price.length < 7) {
    return price.slice(0, price.length - 3) + "k";
  }

  return price.slice(0, price.length - 6) + "M";
};
