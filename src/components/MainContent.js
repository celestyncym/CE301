import React, { useState, useEffect } from "react";
import Tag from "./Tag";
import "../styles/mainContent.scss";
import "../styles/card.scss";
import MultiStepForm from "./MultiStepForm";
import Slider from "react-slick";

const MainContent = () => {
  const [selectedTag, setSelectedTag] = useState("All");
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const tags = ["All", "Breakfast", "Lunch", "Dinner", "Dessert"];

  // Fetch recipes from the backend
  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/recipes"); // Endpoint to fetch saved recipes
      const data = await response.json();
      setRecipes(data); // Store all recipes in state
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setLoading(false);
    }
  };

  // Filter recipes based on the selected tag
  useEffect(() => {
    if (selectedTag === "All") {
      setFilteredRecipes(recipes); // Show all recipes
    } else {
      setFilteredRecipes(
        recipes.filter(
          (recipe) => recipe.category.includes(selectedTag) // Check if the category array includes the selected tag
        )
      );
    }
  }, [selectedTag, recipes]);

  // Fetch recipes on component mount
  useEffect(() => {
    fetchRecipes();
  }, []);

  // Handle tag click
  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  // Slider settings for react-slick
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Number of cards to show at once
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="main-content">
      <h1 className="heading">Learn, Cook & Eat Your Favourite Local Food!</h1>

      {/* Tags for filtering */}
      <div className="tags">
        {tags.map((tag) => (
          <Tag
            key={tag}
            label={tag}
            isActive={selectedTag === tag}
            onClick={() => handleTagClick(tag)}
          />
        ))}
      </div>

      {/* Food Cards Carousel */}
      <div className="food-carousel">
        {loading ? (
          <div className="loading-placeholder">
            <p>Loading recipes...</p>
          </div>
        ) : filteredRecipes.length > 0 ? (
          <Slider {...sliderSettings}>
            {filteredRecipes.map((recipe) => (
              <div key={recipe._id} className="food-card">
                <div
                  className="card-img"
                  style={{
                    backgroundImage: `url(${recipe.photoURL})`,
                  }}
                ></div>
                <h3>{recipe.name}</h3>
                <p>{recipe.category.join(", ")}</p>{" "}
                {/* Show multiple categories */}
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
          </Slider>
        ) : (
          <p>No recipes found.</p>
        )}
      </div>

      <h1 className="heading">Looking for Something Specific?</h1>

      <MultiStepForm />
    </div>
  );
};

export default MainContent;
