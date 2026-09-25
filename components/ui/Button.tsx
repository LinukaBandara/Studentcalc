import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary";

interface BaseProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

const styles: Record<Variant, string> = {
  primary:
    "bg-emerald hover:bg-emerald-dark text-white shadow-sm",
  secondary:
    "bg-white hover:bg-mint text-navy border border-borderc",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-card px-5 py-3 font-medium text-[15px] transition-colors duration-150 min-h-[44px]";

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
}: BaseProps & { href: string }) {
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  children,
  className = "",
  ...rest
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
