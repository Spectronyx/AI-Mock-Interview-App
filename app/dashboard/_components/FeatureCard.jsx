import React from "react";

function FeatureCard({ title, desc }) {
  return (
    <div className="border rounded-lg p-5 shadow-md bg-white">
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
      <p className="text-gray-600 mt-2">{desc}</p>
    </div>
  );
}

export default FeatureCard;