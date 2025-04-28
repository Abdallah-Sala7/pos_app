export enum POS_PERMISSIONS {
  ADD_PRODUCTS = "add_products",
  A4_INVOICE = "a4_invoice",
  REFUND = "refund",
  ADD_PURCHASES = "add_purchases",
  SHOW_CUSTOMERS = "show_customers",
  QR_CODE = "qr_code",
  DISCOUNT = "discount",
  SHOW_PRODUCT_IMAGE = "show_product_image",
  SHOW_SUPPLIERS = "show_suppliers",
  DINE_IN = "dine_in",
  SHOW_CATEGORIES = "show_categories",
}

export enum PAYMENT_METHODS {
  CASH = "CASH",
  CARD = "CARD",
  BankTransfer = "BankTransfer",
  PayLater = "PayLater",
  CARD_CASH = "CARD&CASH",
}

export const posPermissions = [
  {
    desc: "add-products",
    icon: "fluent-mdl2:product-release",
    value: POS_PERMISSIONS.ADD_PRODUCTS,
  },
  {
    desc: "add-purchases",
    icon: "f7:purchased",
    value: POS_PERMISSIONS.ADD_PURCHASES,
  },
  {
    desc: "show-customers",
    icon: "fluent:people-24-regular",
    value: POS_PERMISSIONS.SHOW_CUSTOMERS,
  },
  {
    desc: "a4-invoice",
    icon: "lets-icons:print-light",
    value: POS_PERMISSIONS.A4_INVOICE,
  },
  {
    desc: "refund",
    icon: "gridicons:refund",
    value: POS_PERMISSIONS.REFUND,
  },
  {
    desc: "qr-code",
    icon: "fluent:qr-code-24-regular",
    value: POS_PERMISSIONS.QR_CODE,
  },
  {
    desc: "discount",
    icon: "hugeicons:discount-tag-02",
    value: POS_PERMISSIONS.DISCOUNT,
  },
  {
    desc: "show-product-image",
    icon: "fluent:image-24-regular",
    value: POS_PERMISSIONS.SHOW_PRODUCT_IMAGE,
  },
  {
    desc: "show-suppliers",
    icon: "stash:users-crown-duotone",
    value: POS_PERMISSIONS.SHOW_SUPPLIERS,
  },
  {
    desc: "dine-in",
    icon: "material-symbols-light:table-restaurant",
    value: POS_PERMISSIONS.DINE_IN,
  },
  {
    desc: "show-categories",
    icon: "material-symbols-light:category-outline-rounded",
    value: POS_PERMISSIONS.SHOW_CATEGORIES,
  },
];

export const paymentMethods = [
  {
    desc: "cash-and-card",
    icon: "iconoir:hand-cash",
    value: PAYMENT_METHODS.CARD_CASH,
  },
  {
    desc: "cash",
    icon: "ph:hand-coins",
    value: PAYMENT_METHODS.CASH,
  },
  {
    desc: "mada",
    icon: "icons8:visa",
    value: PAYMENT_METHODS.CARD,
  },
  {
    desc: "bank-transfer",
    icon: "guidance:bank",
    value: PAYMENT_METHODS.BankTransfer,
  },
  {
    desc: "credit",
    icon: "hugeicons:pay-by-check",
    value: PAYMENT_METHODS.PayLater,
  },
];
