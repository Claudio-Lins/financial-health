"use client";

import { cn } from "@/lib/utils";

interface DayCardProps {
  active: boolean;
  day: string | number;
  weekDay: string | number;
}

export function DayCard({ active, day, weekDay }: DayCardProps) {
  return (
    <div
      className={cn(
        "w-10 h-12 md:w-16 md:h-20 md:gap-2 rounded-lg flex flex-col items-center justify-center shadow-sm",
        active
          ? "bg-gradient-to-t from-[#FF0404] to-[#910BFA] text-white"
          : "bg-white backdrop-blur-sm bg-opacity-60"
      )}
    >
      <small className="font-light text-[10px] md:text-base">{weekDay}</small>
      <span className="text-md md:text-lg font-semibold">{day}</span>
    </div>
  );
}
