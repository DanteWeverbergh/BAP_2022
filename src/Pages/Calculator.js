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
        <h1 className="mx-12 text-white-950 text-3xl mb-12 text-center">
          1RM Calculator
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

          {result && (
            <div className="mx-12 text-white-950 mt-6 ">
              <p className="font-semibold text-xl mb-6">{`Your estimated 1RM is  ${result}kg`}</p>

              <div className="flex justify-between bg-blue-950 py-2 rounded-lg mb-4">
                <div className="px-4 font-bold">1RM%</div>
                <div className="px-4 font-bold">Reps</div>
                <div className="px-4 font-bold">Weight</div>
              </div>

              <div className="flex justify-between ">
                <div>100%</div>
                <div>1</div>
                <div>{result} kg</div>
              </div>
              <div className="flex justify-between ">
                <div>95%</div>
                <div>2</div>
                <div>{Math.round(result * 0.95)} kg</div>
              </div>
              <div className="flex justify-between ">
                <div>90%</div>
                <div>4</div>
                <div>{Math.round(result * 0.9)} kg</div>
              </div>
              <div className="flex justify-between ">
                <div>85%</div>
                <div>6</div>
                <div>{Math.round(result * 0.85)} kg</div>
              </div>
              <div className="flex justify-between ">
                <div>80%</div>
                <div>8</div>
                <div>{Math.round(result * 0.8)} kg</div>
              </div>
              <div className="flex justify-between ">
                <div>75%</div>
                <div>10</div>
                <div>{Math.round(result * 0.75)} kg</div>
              </div>
              <div className="flex justify-between ">
                <div>70%</div>
                <div>12</div>
                <div>{Math.round(result * 0.7)} kg</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-24"></div>
      <Footer />
    </>
  );
}

export default Calculator;
