export const fetchIngredients = async () => {
  try {
    const response = await fetch("/api/ingredients");
    if (!response.ok) {
      throw new Error("Failed to fetch ingredients");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching ingredients:", error.message);
    return [];
  }
};
