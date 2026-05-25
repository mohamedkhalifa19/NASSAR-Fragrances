import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

export default function SkeletonBox({
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
        "bg-gradient-to-r from-stone-100 via-stone-200 to-stone-100",
        className,
      )}
    />
  );
}
