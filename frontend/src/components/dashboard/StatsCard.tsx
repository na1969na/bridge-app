import React from "react";

interface StatItem {
  title: string;
  count: number;
}

interface StatsCardProps {
  stats: StatItem[];
}

const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  return (
    <div className="p-6 rounded-3xl bg-grape items-center justify-center">
      <h2 className="text-xl font-semibold">
        Your Monthly Wellness
      </h2>
      <div className="flex justify-center space-x-10 p-3">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <h3 className="text-lg font-semibold">{stat.title}</h3>
            <p className="w-22 h-22 text-3xl text-white bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
              {stat.count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCard;
