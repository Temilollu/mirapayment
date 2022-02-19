import "../styles/input.css";
const Input = ({ name, handleChange, value, placeholder, label, type }) => {
  return (
    <>
      {type === "textarea" ? (
        <label>
          <p className="label">{label}</p>
          <textarea
            rows="4"
            cols="50"
            name={name}
            onChange={handleChange}
            value={value}
            placeholder={placeholder}
            type={type}
            required
            style={{ width: "100%" }}
          ></textarea>
        </label>
      ) : (
        <label>
          <p className="label">{label}</p>
          <input
            name={name}
            onChange={handleChange}
            value={value}
            placeholder={placeholder}
            type={type}
            style={{ width: "100%" }}
            required
          />
        </label>
      )}
    </>
  );
};

export default Input;
