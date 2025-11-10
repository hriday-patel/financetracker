import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "flex h-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-4 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/30 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:scale-100",
        className
      )}
    >
      {children}
    </button>
  );
}
