import React from 'react';

function Button({ text }) {
  return (
    <>
      <button
        type="submit"
        className={`bg-blue-950 hover:bg-blue-700 text-white-950 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5`}
      >
        {text}
      </button>
    </>
  );
}

export default Button;
