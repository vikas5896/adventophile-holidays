import { type ComponentPropsWithoutRef, type ElementType } from "react";
import clsx from "clsx";

type Variant = "primary" | "accent" | "outline" | "ghost";

type ButtonProps<T extends ElementType> = {
  as?: T;
  variant?: Variant;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  accent: "btn-accent",
  outline: "btn-outline",
  ghost: "btn-ghost",
};

export function Button<T extends ElementType = "button">({
  as,
  variant = "primary",
  className,
  ...props
}: ButtonProps<T>) {
  const Component = as || "button";
  return <Component className={clsx(variantClass[variant], className)} {...props} />;
}
