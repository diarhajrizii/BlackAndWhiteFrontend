// api.js

const saveColorData = async (colorData) => {
  try {
    const response = await fetch("/api/v1/panels/color", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(colorData),
    });
    const responseData = await response.json();
    // Handle response data if needed
    console.log(responseData);
    return responseData; // Return response data if needed
  } catch (error) {
    console.error("Error saving color data:", error);
    // Handle errors
  }
};

const saveBrandData = async (brandData) => {
  try {
    const response = await fetch("/api/v1/panels/brand", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(brandData),
    });
    const responseData = await response.json();
    // Handle response data if needed
    console.log(responseData);
    return responseData; // Return response data if needed
  } catch (error) {
    console.error("Error saving brand data:", error);
    // Handle errors
  }
};

const saveNumberData = async (numberData) => {
  try {
    const response = await fetch("/api/v1/panels/number", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(numberData),
    });
    const responseData = await response.json();
    // Handle response data if needed
    console.log(responseData);
    return responseData; // Return response data if needed
  } catch (error) {
    console.error("Error saving color data:", error);
    // Handle errors
  }
};

const saveTypeData = async (typeData) => {
  try {
    const response = await fetch("/api/v1/panels/type", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(typeData),
    });
    const responseData = await response.json();
    // Handle response data if needed
    return responseData; // Return response data if needed
  } catch (error) {
    console.error("Error saving type data:", error);
    // Handle errors
  }
};

const saveData = async (endpoint, data) => {
  try {
    const response = await fetch(`/api/v1/panels/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    // Handle response data if needed
    return responseData; // Return response data if needed
  } catch (error) {
    console.error(`Error saving ${endpoint} data:`, error);
    // Handle errors
  }
};

const deleteItem = async (endpoint, data) => {
  try {
    const response = await fetch(`/api/v1/panels/${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    // Handle response data if needed
    return responseData; // Return response data if needed
  } catch (error) {
    console.error(`Error saving ${endpoint} data:`, error);
    // Handle errors
  }
};

// Example usage:
const editColorData = async (colorData) => {
  return await saveData("color", colorData);
};

const editBrandData = async (brandData) => {
  console.log({ brandData });
  return await saveData("brand", brandData);
};

const editNumberData = async (numberData) => {
  return await saveData("number", numberData);
};

const editTypeData = async (typeData) => {
  return await saveData("type", typeData);
};

export {
  saveColorData,
  saveBrandData,
  saveTypeData,
  saveNumberData,
  saveData,
  editColorData,
  editBrandData,
  editNumberData,
  editTypeData,
  deleteItem,
};
