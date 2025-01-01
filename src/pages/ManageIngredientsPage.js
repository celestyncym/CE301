import React, { useState, useEffect } from "react";
import "../styles/form.scss";

const ManageIngredientsPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingIngredient, setEditingIngredient] = useState(null);

  // Fetch ingredients from backend
  const fetchIngredients = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/ingredients", {
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
      setIngredients(data);
    } catch (err) {
      setError("Failed to fetch ingredients.");
      console.error("Error fetching ingredients:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  // Delete ingredient
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/ingredients/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        setIngredients(
          ingredients.filter((ingredient) => ingredient._id !== id)
        );
      } else {
        console.error("Failed to delete ingredient");
      }
    } catch (error) {
      console.error("Error deleting ingredient:", error);
    }
  };

  // Edit ingredient
  const handleEdit = (ingredient) => {
    setEditingIngredient(ingredient);
  };

  // Save edited ingredient
  const handleSave = async (updatedIngredient) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/ingredients/${updatedIngredient._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedIngredient),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setIngredients(
          ingredients.map((ingredient) =>
            ingredient._id === updatedIngredient._id ? data : ingredient
          )
        );
        setEditingIngredient(null);
      } else {
        console.error("Failed to update ingredient");
      }
    } catch (error) {
      console.error("Error updating ingredient:", error);
    }
  };

  // Add a new ingredient
  const handleAdd = async (newIngredient) => {
    try {
      const response = await fetch("http://localhost:5000/api/ingredients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newIngredient),
      });
      if (response.ok) {
        const data = await response.json();
        setIngredients([...ingredients, data]);
      } else {
        console.error("Failed to add ingredient");
      }
    } catch (error) {
      console.error("Error adding ingredient:", error);
    }
  };

  return (
    <div className="form-container">
      <div className="manage-page">
        <h1>Manage Ingredients</h1>
        {loading ? (
          <p>Loading ingredients...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Subcategory</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ingredients.map((ingredient) => (
                  <tr key={ingredient._id}>
                    <td>{ingredient.name}</td>
                    <td>{ingredient.category || "N/A"}</td>
                    <td>{ingredient.subcategory || "N/A"}</td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(ingredient)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(ingredient._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {editingIngredient && (
              <IngredientEditor
                ingredient={editingIngredient}
                onSave={handleSave}
                onCancel={() => setEditingIngredient(null)}
              />
            )}
            <IngredientAdder onAdd={handleAdd} />
          </>
        )}
      </div>
    </div>
  );
};

// Ingredient Editor Component
const IngredientEditor = ({ ingredient, onSave, onCancel }) => {
  const [formData, setFormData] = useState(ingredient);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="ingredient-editor" onSubmit={handleSubmit}>
      <h3>Edit Ingredient</h3>
      <input
        type="text"
        name="name"
        value={formData.name}
        placeholder="Ingredient Name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        placeholder="Category"
        onChange={handleChange}
      />
      <input
        type="text"
        name="subcategory"
        value={formData.subcategory}
        placeholder="Subcategory"
        onChange={handleChange}
      />
      <button type="submit">Save</button>
      {onCancel && <button onClick={onCancel}>Cancel</button>}
    </form>
  );
};

// Ingredient Adder Component
const IngredientAdder = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category) {
      alert("Category is required.");
      return;
    }
    console.log("Form data submitted:", formData);
    onAdd(formData);
    setFormData({ name: "", category: "", subcategory: "" }); // Reset form
  };

  return (
    <form className="ingredient-adder" onSubmit={handleSubmit}>
      <h3>Add New Ingredient</h3>
      <input
        type="text"
        name="name"
        value={formData.name}
        placeholder="Ingredient Name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        placeholder="Category"
        onChange={handleChange}
      />
      <input
        type="text"
        name="subcategory"
        value={formData.subcategory}
        placeholder="Subcategory"
        onChange={handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default ManageIngredientsPage;
