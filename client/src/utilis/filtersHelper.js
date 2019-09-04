export default (
  products,
  { types, searchFilter, minPrice, maxPrice, favourites }
) => {
  return products.filter((item, i) => {
    const textMatch = item.brand
      .toLowerCase()
      .includes(searchFilter.toLowerCase());
    const productMatch = !types.length ? item : types.indexOf(item.brand) > -1;

    // const favouriteMatch = favourites.length
    //   ? favourites.map(favourite => favourite.product).indexOf(item._id) > -1
    //   : item;

    let favouriteMatch;
    if (favourites.length === 0) {
      favouriteMatch = item;
    } else if (favourites.length > 0) {
      favouriteMatch =
        favourites.map(favourite => favourite.product).indexOf(item._id) > -1;
    } else if ((favourites = false)) {
      favouriteMatch = false;
    }

    const priceMatch =
      item.price >= Number(minPrice) && item.price <= Number(maxPrice);
    return textMatch && productMatch && priceMatch && favouriteMatch;
  });
};
