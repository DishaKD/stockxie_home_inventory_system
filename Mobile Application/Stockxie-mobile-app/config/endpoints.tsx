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
    items: "api/items/",
    expenses: "api/expenses",
    profile: "api/auth/profile",
  },
  post: {
    order: "api/order/create",
    items: "api/items/create",
    categories: "api/categories",
  },
  put: {
    items: "api/items/update",
  },
  delete: {
    items: "api/items/delete",
    categories: "api/categories",
  },
  healthProfile: {
    create: "api/health-profiles/",
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
    search: "api/items/search",
  },
  purchaseHistory: {
    // Separate purchase history endpoints
    create: "api/purchase-history", // Create a purchase record
    getAll: "api/purchase-history", // Get all purchase records
    getById: "api/purchase-history", // Get a purchase record by ID
    update: "api/purchase-history", // Update a purchase record
    delete: "api/purchase-history", // Delete a purchase record
  },
  BUDGET: "api/budget",
};
