import React from 'react';
import { cn } from '../../libs/utils';

interface StatItem {
  title: string;
  count: number;
  divBgColor: string;
  pBgColor: string;
}

interface StatsCardProps {
  stats: StatItem[];
}

const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  return (
    <div className="p-6 rounded-3xl bg-white items-center justify-center">
      <h2 className="text-xl font-semibold mb-5">Your Monthly Wellness</h2>
      <div className="flex flex-col gap-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={cn(
              'flex items-center justify-between rounded-full',
              stat.divBgColor,
            )}
          >
            <h3 className="text-lg font-semibold p-3">{stat.title}</h3>
            <p
              className={cn(
                'w-22 h-22 text-3xl text-white rounded-full flex items-center justify-center',
                stat.pBgColor,
              )}
            >
              {stat.count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCard;
