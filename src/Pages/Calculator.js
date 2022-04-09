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

              <div className="bg-slate-960  rounded-md px-2 py-2">
                <table className="w-full table-fixed rounded-md">
                  <thead>
                    <tr className="bg-slate-950 ">
                      <th className="px-4 py-2">1RM %</th>
                      <th className="px-4 py-2">Reps</th>
                      <th className="px-4 py-2">Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b-2 border-slate-950">
                      <td className="px-4 py-2">100%</td>
                      <td className="px-4 py-2">1</td>
                      <td className="px-4 py-2">{result} kg</td>
                    </tr>
                    <tr className="border-b-2 border-slate-950">
                      <td className="px-4 py-2">95%</td>
                      <td className="px-4 py-2">2</td>
                      <td className="px-4 py-2">
                        {Math.round(result * 0.95)} kg
                      </td>
                    </tr>
                    <tr className="border-b-2 border-slate-950 ">
                      <td className="px-4 py-2">90%</td>
                      <td className="px-4 py-2">4</td>
                      <td className="px-4 py-2">
                        {Math.round(result * 0.9)} kg
                      </td>
                    </tr>
                    <tr className="border-b-2 border-slate-950">
                      <td className="px-4 py-2">85%</td>
                      <td className="px-4 py-2">6</td>
                      <td className="px-4 py-2">
                        {Math.round(result * 0.85)} kg
                      </td>
                    </tr>
                    <tr className="border-b-2 border-slate-950">
                      <td className="px-4 py-2">80%</td>
                      <td className="px-4 py-2">8</td>
                      <td className="px-4 py-2">
                        {Math.round(result * 0.8)} kg
                      </td>
                    </tr>
                    <tr className="border-b-2 border-slate-950">
                      <td className="px-4 py-2">75%</td>
                      <td className="px-4 py-2">10</td>
                      <td className="px-4 py-2">
                        {Math.round(result * 0.75)} kg
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">70%</td>
                      <td className="px-4 py-2">12</td>
                      <td className="px-4 py-2">
                        {Math.round(result * 0.7)} kg
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Calculator;
