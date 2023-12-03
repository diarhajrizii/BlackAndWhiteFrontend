// api.js

const saveColorData = async (colorData) => {
  try {
    const response = await fetch("/api/v1/add/color", {
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
    const response = await fetch("/api/v1/add/brand", {
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
    const response = await fetch("/api/v1/add/number", {
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

export { saveColorData, saveBrandData, saveNumberData };
