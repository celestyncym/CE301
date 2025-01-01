import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/mainContent.scss"; // Reuse the styles from MainContent

const SearchResultPage = () => {
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectedIngredients = location.state?.ingredients || [];

  useEffect(() => {
    const fetchRecipesByIngredients = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/recipes/search`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ingredients: selectedIngredients }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedIngredients.length > 0) {
      fetchRecipesByIngredients();
    }
  }, [selectedIngredients]);

  return (
    <div className="main-content">
      <h1 className="heading">Search Results</h1>
      {loading ? (
        <div className="loading-placeholder">
          <p>Loading recipes...</p>
        </div>
      ) : recipes.length > 0 ? (
        <div>
          {recipes.map((recipe) => (
            <div key={recipe._id} className="food-card">
              <div
                className="card-img"
                style={{
                  backgroundImage: `url(${recipe.photoURL || ""})`,
                }}
              ></div>
              <h3>{recipe.name}</h3>
              <p>{recipe.category?.join(", ") || "Uncategorized"}</p>
              <hr />
              <div className="card-footer">
                <p>{recipe.prepTime || "Unknown"} mins</p>
                <a
                  href={recipe.sourceURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="primary-button">View</button>
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No recipes found with the selected ingredients.</p>
      )}
    </div>
  );
};

export default SearchResultPage;
