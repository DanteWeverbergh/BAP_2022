import React, { useState } from 'react';

function Calculator() {
  const [data, setData] = useState({
    weight: '',
    reps: '',
  });

  const [result, setResult] = useState({
    result: '',
  });

  const handleSumbit = () => {
    const weight = data.weight;
    const reps = data.reps;

    const result = weight / (1.0278 - 0.0278 * reps);

    setResult({
      result: result,
    });
  };

  const handleOnChange = (e) => {
    setData({
      [e.target.name]:
        e.target.type === 'number' ? parseInt(e.target.value) : e.target.value,
    });
  };

  return (
    <>
      <div>
        <h1>Calculator</h1>
        <div>
          <input
            type="number"
            name="weight"
            value={data.weight}
            className="form-control"
            placeholder="weight"
            onChange={handleOnChange}
          ></input>
          <input
            type="number"
            name="reps"
            value={data.reps}
            className="form-control"
            placeholder="reps"
            onChange={handleOnChange}
          ></input>
          <button
            className="btn-primary form-control"
            onClick={() => handleSumbit()}
          >
            Calculate
          </button>

          <div className="result">
            <p>{`Your 1RM is approximately ${result}kg`}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Calculator;
