import React, { useEffect, useState } from "react";
import StepNavigator from "./StepNavigator";
import Select from "react-select";
import "../styles/multiStepForm.scss";
import { fetchIngredients } from "../api/ingredientApi";
import { useNavigate } from "react-router-dom";

const MultiStepForm = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    ingredients: [],
    mealType: "",
    cuisine: "",
    dietaryRestrictions: [],
    kitchenTools: [],
  });

  const [ingredientOptions, setIngredientOptions] = useState([]);

  const steps = [
    {
      label: "What ingredients do you have?",
      key: "ingredients",
      options: ingredientOptions,
    },
    {
      label: "Which type of meal is it?",
      key: "mealType",
      options: [
        { value: "breakfast", label: "Breakfast" },
        { value: "lunch", label: "Lunch" },
        { value: "dinner", label: "Dinner" },
        { value: "dessert", label: "Dessert" },
      ],
    },
    {
      label: "What cuisine is it?",
      key: "cuisine",
      options: [
        { value: "singaporean", label: "Singaporean" },
        { value: "malaysian", label: "Malaysian" },
        { value: "indonesian", label: "Indonesian" },
        { value: "chinese", label: "Chinese" },
      ],
    },
    {
      label: "Any dietary restrictions?",
      key: "dietaryRestrictions",
      options: [
        { value: "vegetarian", label: "Vegetarian" },
        { value: "vegan", label: "Vegan" },
        { value: "gluten-free", label: "Gluten-Free" },
        { value: "dairy-free", label: "Dairy-Free" },
      ],
    },
    {
      label: "What kitchen tools do you have?",
      key: "kitchenTools",
      options: [
        { value: "knife", label: "Knife" },
        { value: "blender", label: "Blender" },
        { value: "frying-pan", label: "Frying Pan" },
        { value: "mixing-bowl", label: "Mixing Bowl" },
      ],
    },
  ];

  useEffect(() => {
    // Fetch ingredients on component mount
    const loadIngredients = async () => {
      const ingredients = await fetchIngredients();
      const options = ingredients.map((ingredient) => ({
        value: ingredient._id,
        label: ingredient.name,
      }));
      setIngredientOptions(options);
    };
    loadIngredients();
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleSelectChange = (selected) => {
    const key = steps[currentStep].key;
    setFormData((prev) => ({
      ...prev,
      [key]: selected,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    const selectedIngredients = formData.ingredients.map((item) => item.value);

    navigate("/search-results", {
      state: { ingredients: selectedIngredients },
    });
  };

  const currentOptions = steps[currentStep].options;

  return (
    <div className="multi-step-form">
      <StepNavigator steps={steps} currentStep={currentStep} />
      <div className="form-content">
        <h2>{steps[currentStep].label}</h2>
        <Select
          options={currentOptions}
          isMulti={currentStep !== 1} // Allow multiple selections for all steps except meal type
          value={formData[steps[currentStep].key]}
          onChange={handleSelectChange}
        />
        <div className="form-buttons">
          {currentStep > 0 && (
            <button className="primary-button" onClick={handleBack}>
              Back
            </button>
          )}
          {currentStep < steps.length - 1 && (
            <button className="primary-button" onClick={handleNext}>
              Next
            </button>
          )}
          {currentStep === steps.length - 1 && (
            <button className="primary-button" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
