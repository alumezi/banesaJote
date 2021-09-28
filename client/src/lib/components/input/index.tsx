import './index.css';

export function Input({
  label,
  placeholder,
  prepend,
}: {
  label?: string;
  placeholder?: string;
  prepend?: string;
}) {
  return (
    <div>
      {label ? (
        <label htmlFor="price" className="input__label">
          {label}
        </label>
      ) : (
        ''
      )}
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className=" sm:text-sm">{prepend}</span>
        </div>
        <input
          type="text"
          name="price"
          id="price"
          autoComplete="off"
          className="focus:ring-banesa-green focus:border-banesa-green block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-1"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
