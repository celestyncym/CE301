import React, { useState, useEffect } from "react";
import Tag from "./Tag";
import "../styles/mainContent.scss";
import "../styles/card.scss";
import MultiStepForm from "./MultiStepForm";

// Mock food data (to be replaced with API calls)
const mockFoodData = [
  { id: 1, name: "Pancakes", category: "Breakfast" },
  { id: 2, name: "Caesar Salad", category: "Lunch" },
  { id: 3, name: "Steak", category: "Dinner" },
  { id: 4, name: "Ice Cream", category: "Dessert" },
];

const MainContent = () => {
  const [selectedTag, setSelectedTag] = useState("All");
  const [filteredFood, setFilteredFood] = useState(mockFoodData);

  const tags = ["All", "Breakfast", "Lunch", "Dinner", "Dessert"];

  // Handle filtering when a tag is clicked
  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  // Update filtered food whenever the selected tag changes
  useEffect(() => {
    if (selectedTag === "All") {
      setFilteredFood(mockFoodData);
    } else {
      setFilteredFood(
        mockFoodData.filter((food) => food.category === selectedTag)
      );
    }
  }, [selectedTag]);

  return (
    <div className="main-content">
      <h1 className="heading">Learn, Cook & Eat your favourite local food!</h1>

      <div className="tags">
        {tags.map((tag) => (
          <Tag
            key={tag}
            label={tag}
            isActive={selectedTag === tag}
            onClick={handleTagClick}
          />
        ))}
      </div>

      <div className="food-cards">
        {filteredFood.map((food) => (
          <div key={food.id} className="food-card">
            <img
              className="card-img"
              src="../images/kayatoast.PNG"
              alt="kaya toast"
              width={150}
            />
            <h3>{food.name}</h3>
            <p>{food.category}</p>
            <hr />
            <div className="card-footer">
              <p>10 mins</p>
              <button className="primary-button">View</button>
            </div>
          </div>
        ))}
      </div>

      <h1 className="heading">
        Looking for something specific? We can help you with that!
      </h1>

      <MultiStepForm />
    </div>
  );
};

export default MainContent;
