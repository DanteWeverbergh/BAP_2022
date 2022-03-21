import React, { useState } from 'react';
import Button from '../Components/Button';
import Input from '../Components/Input';
import Label from '../Components/Label';
import Footer from '../Layouts/Footer/Footer';
import Header from '../Layouts/Header/Header';

function Calculator() {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');

  const [result, setResult] = useState();

  const handleSumbit = (e) => {
    e.preventDefault();

    setResult(Math.round(weight / (1.0278 - 0.0278 * reps)));
  };

  return (
    <>
      <Header />
      <div>
        <h1 className="mx-12 text-white text-3xl mb-12 text-center">
          Calculator
        </h1>
        <div>
          <form className="mx-12" onSubmit={handleSumbit}>
            <div>
              <Label htmlFor={'weight'} label="weight" />
              <Input
                type={'number'}
                name="weight"
                value={weight}
                onChange={({ target }) => setWeight(target.value)}
                placeholder={'weight'}
                id={'weight'}
              />
            </div>

            <div>
              <Label htmlFor={'reps'} label="reps" />
              <Input
                type={'number'}
                name="reps"
                value={reps}
                onChange={({ target }) => setReps(target.value)}
                placeholder={'reps'}
                id={'reps'}
              />
            </div>

            <Button text={'calculate'} />
          </form>

          {result ? (
            <div className="mx-12 text-white mt-6">
              <p>{`Your estimated 1RM is approximately ${result}kg`}</p>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Calculator;
