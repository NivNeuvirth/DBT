const fetchAttractions = async () => {
  try {
    const response = await fetch("http://localhost:3005/api/data");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default fetchAttractions;
