const Button = (props) => {
  const { label, onClick, disabled } = props;

  return (
    <button
      className="ml-2 px-4 py-2 rounded-md bg-white text-[#000] font-bold hover:bg-opacity-80 transition"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
