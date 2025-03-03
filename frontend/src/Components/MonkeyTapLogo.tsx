const MonkeyTapLogo = ({ size = 40 }) => {
  return (
    <div
      className="grid grid-cols-3 gap-0.5 aspect-square"
      style={{ width: size, height: size }}
    >
      {[...Array(9)].map((_, index) => (
        <div
          key={index}
          className={`rounded-[1px] ${
            index === 4 ? "bg-active" : "bg-inactive"
          }`}
        />
      ))}
    </div>
  );
};

export default MonkeyTapLogo;
