import React from 'react';
import Input from '../../Components/Input';
import Label from '../../Components/Label';

function Filter({
  setFilterMenu,
  days,
  setDays,
  trainer,
  setTrainer,
  routineName,
  setRoutineName,
}) {
  return (
    <>
      <div className="  h-screen w-screen text-white-950 absolute top-0 z-50 bg-slate-950">
        <div
          className="absolute right-12 top-12 "
          onClick={() => setFilterMenu(false)}
        >
          X
        </div>
        <ul className="mt-48 mx-12">
          <li className="">
            <Label label={'days'} />
            <select>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
            </select>
          </li>
          <li className="mt-2">
            <Label label={'name'} />
            <Input placeholder={'name'} />
          </li>
          <li className="mt-2">
            <select>
              <option>Trainer 1</option>
              <option>Trainer 2</option>
            </select>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Filter;
