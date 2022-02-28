import React, { Component } from 'react';

class Calculator extends Component {
  state = {
    weight: '',
    reps: '',
    result: '',
  };

  handleSumbit() {
    const weight = this.state.weight;
    const reps = this.state.reps;

    const result = weight / (1.0278 - 0.0278 * reps);

    this.setState({
      result: result,
    });
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]:
        e.target.type === 'number' ? parseInt(e.target.value) : e.target.value,
    });
  };

  render() {
    const { weight, reps, result } = this.state;

    return (
      <>
        <div>
          <h1>Calculator</h1>
          <div>
            <input
              type="number"
              name="weight"
              value={weight}
              className="form-control"
              placeholder="weight"
              onChange={this.handleOnChange}
            ></input>
            <input
              type="number"
              name="reps"
              value={reps}
              className="form-control"
              placeholder="reps"
              onChange={this.handleOnChange}
            ></input>
            <button
              className="btn-primary form-control"
              onClick={() => this.handleSumbit()}
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
}

export default Calculator;
