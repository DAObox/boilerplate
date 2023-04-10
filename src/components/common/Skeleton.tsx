import React from "react";
import clsx from "clsx";

export type Height = "xs" | "s" | "m" | "lg" | "xl";

const heightMap: Record<Height, string> = {
  xs: "h-16",
  s: "h-32",
  m: "h-64",
  lg: "h-96",
  xl: "h-screen",
};

interface SkeletonProps {
  height?: Height;
  animated?: boolean;
  data?: any;
  children?: React.ReactNode;
}

export function Skeleton({
  height = "m",
  animated = true,
  data,
  children,
}: SkeletonProps) {
  const resolvedHeight = heightMap[height];

  if (data) {
    return <>{children}</>;
  }

  return (
    <div className={clsx({ "animate-pulse": animated })}>
      <div
        className={clsx(
          "mb-4 w-full rounded-md bg-gray-200 dark:bg-gray-700",
          resolvedHeight
        )}
      />
    </div>
  );
}
