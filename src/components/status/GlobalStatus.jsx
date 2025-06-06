export const GlobalStatus = ({ children }) => {
  return (
    <div className="flex items-center gap-2 text-gray-400">
      <i className="bi bi-arrow-repeat text-[0.875rem] animate-spin"></i>
      <span className="text-[0.875rem]">{children}</span>
    </div>
  );
};
