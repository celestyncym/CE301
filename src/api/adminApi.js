export const addIngredient = async (ingredient) => {
  const token = localStorage.getItem("token");
  const response = await fetch("/api/users/ingredients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(ingredient),
  });

  if (!response.ok) throw new Error("Failed to add ingredient");
  return await response.json();
};
