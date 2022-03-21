import React from 'react';

function Label({ label, htmlFor }) {
  return (
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor={htmlFor}
    >
      {label}
    </label>
  );
}

export default Label;
