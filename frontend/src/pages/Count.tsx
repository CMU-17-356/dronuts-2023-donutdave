// code adapated from https://github.com/devina36/ecommerce-product-page/blob/main/src/index.css

import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const Count = () => {
  const [count, setCount] = useState(0);

  const minus = () => {
    setCount(count - 1);
  };
  const plus = () => {
    setCount(count + 1);
  };

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

      </div>
    </>
  );
};

export default Count;