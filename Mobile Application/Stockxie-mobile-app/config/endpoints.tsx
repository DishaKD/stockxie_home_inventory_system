export const ENDPOINTS = {
  get: {
    tags: "api/tags",
    users: "api/users",
    orders: "api/orders",
    carousel: "api/slides",
    banners: "api/banners",
    reviews: "api/reviews",
    discount: "api/discount",
    products: "api/products",
    promocode: "api/promocode",
    promocodes: "api/promocodes",
    categories: "api/categories",
  },
  post: {
    order: "api/order/create",
  },
  healthProfile: {
    create: "/api/healthProfile",
  },
  auth: {
    login: "api/auth/login",
    register: "api/auth/register",
    updateUser: "api/auth/user/update",
    emailVerify: "api/auth/email/verify",
    createNewUser: "api/auth/user/create",
    ifUserExists: "api/auth/user/exists",
    ifEmailExists: "api/auth/email/exists",
    emailConfirm: "api/auth/email/confirm",
  },

  items: {
    add: "api/addItem"
  }
};
