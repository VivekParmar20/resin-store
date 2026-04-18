const SizeSelector = ({ sizes, selected, setSelected }) => {
  return (
    <div className="flex gap-2 mt-3">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => setSelected(size)}
          className={`px-3 py-1 rounded ${
            selected === size ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          {size}
        </button>
      ))}
    </div>
    
  );
};

export default SizeSelector;