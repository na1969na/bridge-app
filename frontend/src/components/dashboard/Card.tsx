import React from 'react';

interface CardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, value, icon }) => {
  return (
    <div className="p-6 rounded-xl bg-stone-200 flex items-center space-x-4">
      <div className="text-3xl">{icon}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-2xl">{value}</p>
    </div>
  );
};

export default Card;
