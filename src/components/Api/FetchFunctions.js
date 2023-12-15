// apiCalls.js
export const fetchProducts = async () => {
  try {
    const response = await fetch(`/api/v1/products/products`);
    if (response.ok) {
      const responseData = await response.json();
      const fetchedProducts = responseData.data.data.map((product) => ({
        ...product,
        selected: true,
      }));
      return fetchedProducts;
    } else {
      throw new Error("Failed to fetch products");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

export const fetchLocations = async () => {
  try {
    const response = await fetch(`/api/v1/panels/locations`);
    if (response.ok) {
      const { data: responseData } = await response.json();
      return responseData.data;
    } else {
      throw new Error("Failed to fetch locations");
    }
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw new Error("Failed to fetch locations");
  }
};
