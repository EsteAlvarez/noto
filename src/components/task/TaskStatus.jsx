export const TaskStatus = ({ children }) => {
  return (
    <div className="flex items-center gap-2 text-gray-500">
      <i className="bi bi-arrow-repeat text-[0.875rem] animate-spin"></i>
      <span className="text-[0.875rem]">{children}</span>
    </div>
  );
};
