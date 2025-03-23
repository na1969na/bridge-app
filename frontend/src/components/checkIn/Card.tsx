import React from 'react';

interface CardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, value, icon }) => {
  return (
    <div className="flex justify-between gap-3 border-b border-stone-400">
      <div className="text-xl flex items-center gap-3">
        {icon}
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <p className="text-2xl">{value}</p>
    </div>
  );
};

export default Card;
