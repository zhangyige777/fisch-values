import { TrendingUp, Database, Clock, Users } from 'lucide-react';

export function QuickStats() {
  const stats = [
    {
      label: "Items Listed",
      value: "300+",
      icon: <Database className="h-6 w-6" />,
    },
    {
      label: "Daily Updates",
      value: "50K+",
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      label: "Accuracy Rate",
      value: "99.9%",
      icon: <Users className="h-6 w-6" />,
    },
    {
      label: "Last Update",
      value: "2 min ago",
      icon: <Clock className="h-6 w-6" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="flex justify-center text-cyan-400 mb-2">
            {stat.icon}
          </div>
          <div className="text-2xl font-bold text-white">
            {stat.value}
          </div>
          <div className="text-sm text-gray-400">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}