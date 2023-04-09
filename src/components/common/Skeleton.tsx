import React from "react";
import clsx from "clsx";

export function Skeleton({ height = "m", animated = true }: SkeletonProps) {
  const resolvedHeight = heightMap[height] || heightMap.m;

  return (
    <div className={clsx({ "animate-pulse": animated })}>
      <div
        className={clsx("mb-4 w-full rounded-md bg-gray-200 dark:bg-gray-700", resolvedHeight)}
      />
    </div>
  );
}

export interface SkeletonProps {
  height?: Height;
  animated?: boolean;
}

export type Height = "xs" | "s" | "m" | "lg" | "xl";

const heightMap: Record<Height, string> = {
  xs: "h-16",
  s: "h-32",
  m: "h-64",
  lg: "h-96",
  xl: "h-screen",
};
