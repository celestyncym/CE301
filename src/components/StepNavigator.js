import React from "react";
import "../styles/stepNavigator.scss";
import { FaCarrot, FaClock, FaUtensils } from "react-icons/fa";
import { MdBlender, MdDoNotDisturbAlt } from "react-icons/md";

const StepNavigator = ({ steps, currentStep }) => {
  // Define an array of icons corresponding to each step
  const stepIcons = [
    <FaCarrot />,
    <FaClock />,
    <FaUtensils />,
    <MdDoNotDisturbAlt />,
    <MdBlender />,
  ];

  return (
    <div className="step-navigator">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${index === currentStep ? "active" : ""}`}
        >
          <div className={`step-icon ${index === currentStep ? "active" : ""}`}>
            {stepIcons[index]}
          </div>
          {index < steps.length - 1 && <div className="step-line"></div>}
        </div>
      ))}
    </div>
  );
};

export default StepNavigator;
