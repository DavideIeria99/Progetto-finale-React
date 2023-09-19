export default function Input({ type, field, content, onChange, value }) {
  return (
    <div className="group relative z-0 mb-12 w-full">
      <input
        className="peer block w-full  appearance-none border-0 border-b-2 border-gray-500 bg-transparent py-2.5 text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-400  dark:text-white"
        type={type}
        name={field}
        id={field}
        onChange={onChange}
        value={value}
      />

      <label
        htmlFor={field}
        className="absolute top-3  -z-10 origin-[0] -translate-y-6  text-gray-500  duration-300 peer-placeholder-shown:translate-y-0 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:font-medium  dark:text-gray-400"
      >
        {content}
      </label>
    </div>
  );
}
