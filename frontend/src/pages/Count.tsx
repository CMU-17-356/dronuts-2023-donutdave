import React, { useState } from 'react';
import { BsCart2 } from 'react-icons/bs';
import { FaPlus, FaMinus } from 'react-icons/fa';

const Count = () => {
  const [count, setCount] = useState(0);

  const minus = () => {
    setCount(count - 1);
  };
  const plus = () => {
    setCount(count + 1);
  };

//   const addChart = () => {
//     const get = JSON.parse(localStorage.getItem('data')) || null;
//     localStorage.setItem('data', JSON.stringify(get + count));
//     window.location.reload();
//   };
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="relative w-full md:max-w-[156px] flex justify-center items-center bg-light-grayish-blue rounded-xl">
          <button
            className="absolute px-5 md:px-3 h-full top-0 left-0 rounded-l-lg disabled:hover:opacity-100 hover:opacity-60"
            disabled={count === 0 || (count < 0 && true)}
            onClick={minus}
          >
            <FaMinus size={16} className="text-oranges" aria-label="Minus" />
          </button>
          <span className="font-bold py-4">{count}</span>
          <button className="absolute px-5 md:px-3 h-full top-0 right-0 rounded-r-lg hover:opacity-60" onClick={plus}>
            <FaPlus size={16} className="text-oranges" aria-label="Plus" />
          </button>
        </div>
        {/* <button
        //   onClick={addChart}
          disabled={count === 0 || (count < 0 && true)}
          className="w-full md:max-w-[272px] relative py-4 rounded-lg shadow-2xl shadow-oranges bg-oranges flex 
          justify-center items-center gap-5 after:rounded-lg hover:after:visible after:invisible disabled:hover:after:invisible after:transition-all 
          after:duration-100 after:ease-in after:w-full after:h-full after:bg-opacity-30 after:absolute after:bg-white after:top-0"
        >
          <BsCart2 className="text-white" />
          {/* <span className="text-white">Add to cart</span> 
        </button> */}
      </div>
    </>
  );
};

export default Count;