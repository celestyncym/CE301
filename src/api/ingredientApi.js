export const fetchIngredients = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/ingredients", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch ingredients");
    }
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return [];
  }
};
