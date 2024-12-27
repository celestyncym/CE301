import React, { useState } from "react";
import StepNavigator from "./StepNavigator";
import Select from "react-select";
import "../styles/multiStepForm.scss";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    ingredients: [],
    mealType: "",
    cuisine: "",
    dietaryRestrictions: [],
    kitchenTools: [],
  });

  const steps = [
    {
      label: "What ingredients do you have?",
      key: "ingredients",
      options: [
        { value: "tomato", label: "Tomato" },
        { value: "onion", label: "Onion" },
        { value: "garlic", label: "Garlic" },
        { value: "chicken", label: "Chicken" },
      ],
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

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Add API submission logic here
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
          {currentStep > 0 && <button onClick={handleBack}>Back</button>}
          {currentStep < steps.length - 1 && (
            <button className="primary-button" onClick={handleNext}>
              Next
            </button>
          )}
          {currentStep === steps.length - 1 && (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
