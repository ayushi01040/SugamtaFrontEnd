export default function Button({ children, className="", ...props }) {
  return (
    <button
      className={
        "inline-flex items-center justify-center px-3 py-2 rounded-lg " +
        "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}