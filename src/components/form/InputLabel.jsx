export const InputLabel = ({ label, type, id, name, placeholder, onChange }) => {
  return (
    <label className="flex flex-col text-start gap-1" htmlFor={id}>
      {label}
      <input
        className="border-1 border-[#B2B0B0] rounded-[5px] p-1"
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </label>
  );
};
