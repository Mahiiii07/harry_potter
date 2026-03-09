"use client";
export default async function fetchFilteredData(title) {
  try {
    const response = await fetch(
      `https://potterapi-fedeperin.vercel.app/en/${title}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
