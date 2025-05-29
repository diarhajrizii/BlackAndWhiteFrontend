const searchableRoutes = [
  { label: "Dashboard", keywords: ["home", "main"], path: "/admin/dashboard" },

  {
    label: "Sales",
    keywords: ["sales", "purchases", "transactions"],
    path: "/admin/Sales",
  },

  {
    label: "Add Products",
    keywords: ["cms", "Products", "add"],
    path: "/admin/add/products",
  },

  {
    label: "Products",
    keywords: ["items", "catalog", "product"],
    path: "/admin/products",
  },

  {
    label: "Transactions",
    keywords: ["sales", "purchases"],
    path: "/admin/Transactions",
  },
  {
    label: "CMS Panels",
    keywords: ["brands", "locations", "colors", "sizes"],
    path: "/admin/cms",
  },

  {
    label: "Administration",
    keywords: ["configuration", "preferences", "Administration"],
    path: "/admin/settings",
  },
];
const searchItems = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Products", path: "/admin/products" },
  { name: "Product Page", path: "/admin/products" },
  { name: "CMS Panels", path: "/admin/cms-panels" },
  { name: "Brands", path: "/admin/cms-panels" },
];

export { searchableRoutes, searchItems };
