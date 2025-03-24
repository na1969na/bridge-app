import React, { useEffect, useState } from 'react';
import { cn } from '../../libs/utils';
import useCheckInStore from '../../stores/useCheckInStore';
import { CheckIn, HealthStatus } from '../../types';

interface StatItem {
  title: string;
  count: number;
  divBgColor: string;
  pBgColor: string;
}

const StatsCard: React.FC = () => {
  const { checkIns } = useCheckInStore();
  const [stats, setStats] = useState<StatItem[]>([]);

  useEffect(() => {
    if (checkIns && checkIns.length > 0) {
      const newStats: StatItem[] = [
        {
          title: 'Feeling Good',
          count: checkIns.filter((checkIn: CheckIn) => checkIn.healthStatus === HealthStatus.GOOD).length,
          divBgColor: 'bg-bubble',
          pBgColor: 'bg-rose',
        },
        {
          title: 'Physical Discomfort',
          count: checkIns.filter((checkIn: CheckIn) => checkIn.healthStatus === HealthStatus.PHYSICAL).length,
          divBgColor: 'bg-grape',
          pBgColor: 'bg-olive-green',
        },
        {
          title: 'Mental Struggles',
          count: checkIns.filter((checkIn: CheckIn) => checkIn.healthStatus === HealthStatus.MENTAL).length,
          divBgColor: 'bg-light-lavender',
          pBgColor: 'bg-lavender',
        },
      ];

      setStats(newStats);
    }
  }, [checkIns]);

  return (
    <div className="p-6 rounded-3xl bg-stone-100 flex flex-col justify-between w-full lg:w-1/3 animate-slide-up">
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
            <h3 className="text-xl font-semibold px-5 md:px-10 py-3">{stat.title}</h3>
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
