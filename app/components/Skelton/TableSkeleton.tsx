import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

function SkeletonBox({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={style}
      className={cn(
        "animate-[shimmer_1.6s_ease-in-out_infinite] rounded-md",
        "bg-[length:600px_100%]",
        "bg-gradient-to-r from-white/10 via-white/20 to-white/10",
        className,
      )}
    />
  );
}

const COLUMNS = 5; // match your actual columns count
const ROWS = 6;

export default function TableSkeleton() {
  return (
    <div className="overflow-hidden rounded-md border w-full bg-black/95 h-full text-white">
      <Table>
        <TableHeader>
          <TableRow className="font-cairo hover:bg-transparent">
            {Array.from({ length: COLUMNS }).map((_, i) => (
              <TableHead key={i} className="text-center">
                <SkeletonBox
                  className="h-4 w-20 mx-auto rounded-md"
                  style={{ animationDelay: `${i * 0.07}s` }}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: ROWS }).map((_, rowIdx) => (
            <TableRow key={rowIdx} className="hover:bg-white/5 border-white/10">
              {Array.from({ length: COLUMNS }).map((_, colIdx) => (
                <TableCell key={colIdx} className="text-center">
                  <SkeletonBox
                    className="h-4 mx-auto rounded-md"
                    style={{
                      width: `${[60, 80, 100, 70, 40][colIdx % 5]}%`,
                      animationDelay: `${(rowIdx * COLUMNS + colIdx) * 0.03}s`,
                    }}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
