import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes } from 'react';

/**
 * Tiny, dependency-free UI primitives matching the shadcn-style classes
 * used by the original Batup calculator components — keeps the bundle
 * small while preserving the look.
 */

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`flex flex-col space-y-1.5 p-6 pb-3 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
}

export function CardContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className = '', ...rest } = props;
  return (
    <input
      {...rest}
      className={`flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  );
}

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  const { className = '', children, ...rest } = props;
  return (
    <label
      {...rest}
      className={`text-sm font-medium leading-none text-gray-700 ${className}`}
    >
      {children}
    </label>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}

export function Button({
  children,
  className = '',
  variant = 'primary',
  ...rest
}: ButtonProps) {
  const styles =
    variant === 'outline'
      ? 'border border-brand-500 text-brand-500 hover:bg-brand-50'
      : 'bg-brand-500 text-white hover:bg-brand-700';
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/40 disabled:pointer-events-none disabled:opacity-50 ${styles} ${className}`}
    >
      {children}
    </button>
  );
}
