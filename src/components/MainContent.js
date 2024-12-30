import React, { useState, useEffect } from "react";
import Tag from "./Tag";
import "../styles/mainContent.scss";
import "../styles/card.scss";
import MultiStepForm from "./MultiStepForm";
import Slider from "react-slick";

const MainContent = () => {
  const [selectedTag, setSelectedTag] = useState("All");
  const [filteredFood, setFilteredFood] = useState([]);
  const [loading, setLoading] = useState(true);

  const tags = ["All", "Breakfast", "Lunch", "Dinner", "Dessert"];

  // Fetch recipes from the backend
  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/recipes/scrape");
      const data = await response.json();

      // Filter based on the selected tag
      const filteredData =
        selectedTag === "All"
          ? data
          : data.filter((recipe) => recipe.category === selectedTag);

      setFilteredFood(filteredData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Filtered Food:", filteredFood);
  }, [filteredFood]);

  // Fetch recipes when the component mounts or selectedTag changes
  useEffect(() => {
    fetchRecipes();
  }, [selectedTag]);

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
      <h1 className="heading">Learn, Cook & Eat your favourite local food!</h1>

      {/* Tags for filtering */}
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

      {/* Food Cards */}
      <div className="food-carousel">
        {loading ? (
          <div className="loading-placeholder">
            <p>Loading recipes...</p>
          </div>
        ) : filteredFood.length > 0 ? (
          <Slider {...sliderSettings}>
            {filteredFood.map((food, index) => (
              <div key={index} className="food-card">
                <div
                  className="card-img"
                  style={{
                    backgroundImage: `url(${food.thumbnail})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "150px",
                    borderRadius: "10px",
                  }}
                ></div>
                <h3>{food.title}</h3>
                <p>{food.category || selectedTag}</p>
                <hr />
                <div className="card-footer">
                  <p>{food.prepTime || "10 mins"}</p>
                  <a
                    href={food.sourceURL}
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

      <h1 className="heading">Looking for something specific?</h1>

      <MultiStepForm />
    </div>
  );
};

export default MainContent;
