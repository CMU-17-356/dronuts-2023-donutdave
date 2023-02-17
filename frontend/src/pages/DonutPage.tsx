// Written with assistance from ChatGPT

import { Link } from 'react-router-dom';
import React, { useState } from "react";

type OrderPageProps = {}

function Form() {
  const [text, setText] = useState('');

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log(`Submitted text: ${text}`);
    setText('');
  };

  const handleTextChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setText(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <tr>
        <label>
          Quantity
        </label>
      </tr>
      <tr>
        <input type="text" value={text} onChange={handleTextChange} />
      </tr>
      <button type="submit">Order</button>
    </form>
  );
}
  
function DonutPage (props : OrderPageProps) {
    return (
        <div >
            <p>This is the donut page.</p>
            <p>
                <Link to="/customer">back</Link>
            </p>
            <div style={{display: 'flex', justifyContent: 'center', height: 10}}>
              <Form />
            </div>
        </div>
    );
};

export default DonutPage;