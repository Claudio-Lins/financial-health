import { cn } from "@/lib/utils"
import { CheckCircle, ArrowUpCircleIcon } from "lucide-react"
import dayjs from "dayjs"

interface SummaryCardProps {
  label: string
  totalAmount: string
  dailyGoal: string
}

export async function SummaryCard({
  label,
  totalAmount,
  dailyGoal,
}: SummaryCardProps) {
  return (
    <div className="bg-zinc-50 w-[100px] h-24 rounded-lg shadow-sm p-2 flex flex-col justify-between">
      <div className="flex items-center justify-between w-full">
        <span className="text-xs font-light">{label}</span>
        {dailyGoal >= totalAmount ? (
          <CheckCircle className={cn("w-4 h-4 text-green-600")} />
        ) : (
          <ArrowUpCircleIcon className={cn("w-4 h-4 text-red-600")} />
        )}
      </div>
      <div className="flex flex-1 items-end justify-between w-full">
        <span className="text-sm font-bold">{totalAmount}</span>
        <div
          className={cn(
            "w-[2.5px] mr-[6px] rounded-md h-14",
            dailyGoal >= totalAmount ? "bg-green-600" : "bg-red-600"
          )}
        />
      </div>
    </div>
  )
}
