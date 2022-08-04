import React from 'react';

function Input({ type, name, value, onChange, placeholder, id, ...rest }) {
  return (
    <>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        className="bg-white-950 border-none shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...rest}
      />
    </>
  );
}

export default Input;
