import { BASE_API_URL } from "@/constants/constants";
import axios from "axios";
import React from "react";
import DisplayProducts from "./displayProducts";

async function fetchData(): Promise<Product[]> {
  try {
    const response = await axios.get(`${BASE_API_URL}/products`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    return response.data.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(`Request failed with status ${error.response.status}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Error setting up the request: ${error.message}`);
    }
  }
}

const ProductPage = async () => {
  const products = await fetchData();
  return <div>
    <DisplayProducts productData={products}/>
  </div>;
};

export default ProductPage;
