import React, { useState } from "react";
import { addIngredient } from "../api/adminApi";

const AdminDashboardPage = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addIngredient({ name, category, subcategory });
      alert("Ingredient added successfully!");
      setName("");
      setCategory("");
      setSubcategory("");
    } catch (error) {
      console.error("Error adding ingredient:", error.message);
      alert("Failed to add ingredient");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Admin Dashboard</h2>
      </form>
    </div>
  );
};

export default AdminDashboardPage;
