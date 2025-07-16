import { clsx } from 'clsx';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'danger' | 'banner';
  children: React.ReactNode;
};

export default function Button({ variant = 'primary', children }: ButtonProps) {
  const base = 'px-4 relative py-2 rounded font-semibold transition hover:cursor-pointer';
  const styles = {
    primary: 'bg-black text-white border border-black hover:bg-white hover:text-black hover:border hover:border-black',
    secondary: 'bg-white text-black border border-black hover:bg-black hover:text-white',
    danger: 'bg-gray-200 text-black border border-black hover:bg-gray-600 hover:text-white hover:border-gray-600',
    banner:'text-black border hover:bg-black  hover:text-white hover:cursor-pointer'
  };

  return <button className={clsx(base, styles[variant])}>{children}</button>;
}
