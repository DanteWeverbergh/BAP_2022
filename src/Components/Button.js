import React from 'react';

function Button({ text }) {
  return (
    <>
      <button
        type="submit"
        className={`bg-blue-950  text-white-950  py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline mt-5 w-full`}
      >
        {text}
      </button>
    </>
  );
}

export default Button;
