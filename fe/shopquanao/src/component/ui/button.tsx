import { clsx } from 'clsx';
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: "primary" | "secondary" | "danger" | "banner" | "loading";
  loading?: boolean;
};

export default function Button({ 
  variant = 'primary', 
  loading = false,
  children,
  className, 
  ...props 
}: ButtonProps) {
  const base = 'px-4 py-2 rounded font-semibold transition flex items-center justify-center gap-2 relative';
  const styles = {
    primary: 'bg-black text-white border border-black hover:bg-white hover:text-black hover:border hover:border-black hover:cursor-pointer',
    secondary: 'bg-white text-black border border-black hover:bg-black hover:text-white hover:cursor-pointer',
    danger: 'bg-gray-200 text-black border border-black hover:cursor-not-allowed',
    banner:'text-black border hover:bg-black hover:text-white hover:cursor-pointer',
    loading: 'bg-gray-300 text-gray-700 border border-gray-300 cursor-not-allowed',
  };

  return (
    <button
      disabled={loading || variant === "loading" || props.disabled}
      className={clsx(base, styles[variant], className)}
      {...props}
    >
      {loading || variant === "loading" ? (
            <span className="flex space-x-1">
      <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></span>
      <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-.2s]"></span>
      <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-.4s]"></span>
    </span>
      ) : (
        children
      )}
    </button>
  );
}
