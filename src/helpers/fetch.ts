import React from "react";

export const fetchFunction = async (
  endpoint: string,
  setState: any,
  specificState?: any
) => {
  try {
    const response = await fetch("http://127.0.0.1:3001/" + endpoint);
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();
    setState(data + specificState);
  } catch (error: any) {
    console.log(error.message);
  }
};
