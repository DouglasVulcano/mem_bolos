import { JSX } from "react";

interface StatCardProps {
  icon: JSX.Element;
  label: string;
  value: string | number;
}

export default function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="flex bg-white rounded-lg shadow p-6 items-center justify-left">
      <div className="flex items-center">
        {icon}
        <div className="ml-4">
          <h2 className="text-sm font-medium text-gray-500">{label}</h2>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
