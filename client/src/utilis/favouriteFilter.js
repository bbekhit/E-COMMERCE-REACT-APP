export default (products, { favourites }) => {
  return products.filter(item => favourites.indexOf(item._id) > -1);
};
