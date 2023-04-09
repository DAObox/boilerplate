import React, { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import clsx from "clsx";
import Link from "next/link";

export const Card: React.FC<CardProps> = ({
  children,
  onClick,
  className,
  href,
  hoverable = false,
  pressable = false,
  ...rest
}) => {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);

  const cardClassName = clsx(
    "rounded-lg border-1 border border-gray-100 shadow-lg p-4 bg-white",
    className
  );

  const wrapperClassName = clsx("transition-transform duration-150 ease-in-out", {
    "transform scale-95": pressed && pressable,
    "transform scale-105": hovered && hoverable,
    "transform scale-100": !pressed && (!hovered || !hoverable),
  });

  const cardContent = (
    <div
      className={wrapperClassName}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      {...rest}
    >
      <div className={cardClassName}>{children}</div>
    </div>
  );

  return href ? (
    <Link href={href} passHref={true}>
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};

export interface CardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onClick?: () => void;
  hoverable?: boolean;
  pressable?: boolean;
  href?: string;
}
