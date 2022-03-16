import React from 'react';

function Label({ label, htmlFor }) {
  return (
    <label className="text-white" htmlFor={htmlFor}>
      {label}
    </label>
  );
}

export default Label;
