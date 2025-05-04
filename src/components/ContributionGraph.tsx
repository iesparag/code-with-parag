import { motion } from 'framer-motion';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionGraphProps {
  data: ContributionDay[];
}

export default function ContributionGraph({ data }: ContributionGraphProps) {
  const weeks = [];
  const days = ['Mon', '', 'Wed', '', 'Fri', '', 'Sun'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Group contributions by week
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  interface MonthLabel {
    month: string;
    position: number;
  }

  // Get month labels with their positions
  const monthLabels: MonthLabel[] = [];
  let currentMonth = -1;
  weeks.forEach((week, weekIndex) => {
    const date = new Date(week[0].date);
    const month = date.getMonth();
    if (month !== currentMonth) {
      monthLabels.push({
        month: months[month],
        position: weekIndex
      });
      currentMonth = month;
    }
  });

  const getColor = (level: number) => {
    switch(level) {
      case 0: return 'bg-gray-800';
      case 1: return 'bg-green-900';
      case 2: return 'bg-green-700';
      case 3: return 'bg-green-500';
      case 4: return 'bg-green-300';
      default: return 'bg-gray-800';
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-max">
        {/* Month labels */}
        <div className="flex mb-2">
          <div className="w-8 mr-2"></div>
          <div className="relative h-4">
            {monthLabels.map((label, index) => {
              // Calculate if this month label would overlap with the next one
              const nextLabel = monthLabels[index + 1];
              const width = nextLabel 
                ? Math.min(40, (nextLabel.position - label.position) * 12 - 4)
                : 40;
              
              return (
                <div
                  key={index}
                  className="absolute text-xs text-gray-400 whitespace-nowrap overflow-hidden"
                  style={{
                    left: `${label.position * 12}px`,
                    width: `${width}px`,
                  }}
                >
                  {label.month}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main graph */}
        <div className="flex">
          <div className="w-8 mr-2">
            {days.map((day, i) => (
              <div key={i} className="h-[10px] text-xs text-gray-400 mb-[2px] leading-[10px]">
                {day}
              </div>
            ))}
          </div>
          <div className="flex gap-[2px]">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[2px]">
                {week.map((day, dayIndex) => (
                  <motion.div
                    key={`${weekIndex}-${dayIndex}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: weekIndex * 0.02 }}
                    className={`w-[10px] h-[10px] rounded-sm ${getColor(day.level)} cursor-pointer`}
                    title={`${day.count} contributions on ${new Date(day.date).toLocaleDateString('en-US', { 
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-end items-center mt-2 text-sm text-gray-400 gap-2">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-[10px] h-[10px] rounded-sm ${getColor(level)}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
