import React from 'react';

function Label({ label, htmlFor }) {
  return (
    <label
      className="block text-white-950 text-sm font-bold mb-2 mt-4"
      htmlFor={htmlFor}
    >
      {label}
    </label>
  );
}

export default Label;
