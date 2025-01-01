import React, { useState, useEffect } from "react";
import "../styles/form.scss";

const ManageRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingRecipe, setEditingRecipe] = useState(null);

  const fetchRecipes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/recipes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token for authentication
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        return;
      }
      const data = await response.json();
      setRecipes(data);
    } catch (err) {
      setError("Failed to fetch recipes.");
      console.error("Error fetching recipes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/recipes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        setRecipes(recipes.filter((recipe) => recipe._id !== id));
      } else {
        console.error("Failed to delete recipe");
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
  };

  const handleSave = async (updatedRecipe) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/recipes/${updatedRecipe._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedRecipe),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setRecipes(
          recipes.map((recipe) =>
            recipe._id === updatedRecipe._id ? data : recipe
          )
        );
        setEditingRecipe(null);
      } else {
        console.error("Failed to update recipe");
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <div className="form-container">
      <div className="manage-page">
        <h1>Manage Recipes</h1>
        {loading ? (
          <p>Loading recipes...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Cuisine</th>
                  <th>Ingredients</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recipes.map((recipe) => (
                  <tr key={recipe._id}>
                    <td>{recipe.name}</td>
                    <td>{recipe.cuisine || "N/A"}</td>
                    <td>
                      {recipe.ingredients && recipe.ingredients.length > 0
                        ? recipe.ingredients
                            .map((ingredient) => ingredient.name)
                            .join(", ")
                        : "No ingredients"}
                    </td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(recipe)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(recipe._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {editingRecipe && (
              <RecipeEditor
                recipe={editingRecipe}
                onSave={handleSave}
                onCancel={() => setEditingRecipe(null)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

const RecipeEditor = ({ recipe, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    recipe || {
      name: "",
      description: "",
      cuisine: "",
      ingredients: [],
      dietaryRestrictions: [],
      steps: [],
      photoURL: "",
      sourceURL: "",
    }
  );

  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState(
    recipe.ingredients || []
  );

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/ingredients", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAvailableIngredients(data);
        } else {
          console.error("Failed to fetch ingredients");
        }
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchIngredients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, ingredients: selectedIngredients });
  };

  return (
    <form className="recipe-editor" onSubmit={handleSubmit}>
      <div className="edit-group">
        <input
          type="text"
          className="form-input"
          name="name"
          value={formData.name}
          placeholder="Recipe Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          className="form-input"
          name="cuisine"
          value={formData.cuisine}
          placeholder="Cuisine"
          onChange={handleChange}
        />
        <textarea
          className="form-input"
          name="description"
          value={formData.description}
          placeholder="Description"
          onChange={handleChange}
        />
        <textarea
          className="form-input"
          name="steps"
          value={formData.steps}
          placeholder="Steps (comma-separated)"
          onChange={(e) =>
            setFormData({ ...formData, steps: e.target.value.split(",") })
          }
        />
        <select
          multiple
          value={selectedIngredients}
          onChange={(e) =>
            setSelectedIngredients(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
        >
          {availableIngredients.map((ingredient) => (
            <option key={ingredient._id} value={ingredient._id}>
              {ingredient.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Save</button>
      {onCancel && <button onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default ManageRecipesPage;
