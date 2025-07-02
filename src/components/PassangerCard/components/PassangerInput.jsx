const PassangerInput = ({
  name,
  id,
  onChange,
  ph,
  type,
  labelClassName,
  titleClassName,
  inputClassName,
  value,
}) => {
  return (
    <label className={labelClassName}>
      <p className={titleClassName}>{name}</p>
      <input
        className={inputClassName}
        type={type}
        id={id}
        defaultValue={value}
        placeholder={ph}
        onChange={onChange}
        required
      />
    </label>
  );
};

export default PassangerInput;