import { clsx } from 'clsx';
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";


type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: "primary" | "secondary" | "danger" | "banner";
};
export default function Button({ variant = 'primary', children,className, ...props }: ButtonProps) {
  const base = 'px-4 relative py-2 rounded font-semibold transition ';
  const styles = {
    primary: 'bg-black text-white border border-black hover:bg-white hover:text-black hover:border hover:border-black hover:cursor-pointer',
    secondary: 'bg-white text-black border border-black hover:bg-black hover:text-white hover:cursor-pointer',
    danger: 'bg-gray-200 text-black border border-black   hover:cursor-not-allowed',
    banner:'text-black border hover:bg-black  hover:text-white hover:cursor-pointer'
  };

   return (
    <button
      className={clsx(base, styles[variant], className)}
      {...props} // ← truyền toàn bộ props còn lại (onClick, disabled, ...)
    >
      {children}
    </button>
  );
}
