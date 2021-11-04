module.exports = {
  HOST: 'http://localhost:3001',
  user_dev: { acl:["GET_CART_LIST", "ADD_CART_ITEM", "ADD_FAVOURITE"], defaultLanguage: "en" },
  user_admin: { acl:["GET_CART_LIST", "ADD_CART_ITEM", "DELETE_CART_ITEM", "ADD_FAVOURITE"], defaultLanguage: "es" },
};