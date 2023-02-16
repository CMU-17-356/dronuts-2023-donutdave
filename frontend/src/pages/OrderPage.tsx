// Written with assistance from ChatGPT

import { Link } from 'react-router-dom';
import React, { FC, useState } from "react";

type OrderPageProps = {}

interface Item {
    quantity: number;
    name: string;
}
  
interface Props {
  items: Item[];
}

const ItemList: FC<Props> = ({ items }) => {
  return (
    <table>
      <tr>
          <th style={{display: 'flex'}}>Donut</th>
          <th>Quantity</th>
      </tr>
      {items.map((item) => (
        <tr >
          <td>{item.name}</td>
          <td>{item.quantity}</td>
        </tr>
      ))}
    </table>
  );
};

const donutList = [
    {quantity: 1, name: "Jelly"}, 
    {quantity: 1, name: "Strawberry Frosted"},
    {quantity: 2, name: "Chocolate Glaze"},
];

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
          Drone Number: 
        </label>
      </tr>
      <tr>
        <input type="text" value={text} onChange={handleTextChange} />
      </tr>
      <button type="submit">Send Order</button>
    </form>
  );
}
  
function OrderPage (props : OrderPageProps) {
    return (
        <div >
            <p>This is the order page.</p>
            <p>
                <Link to="/employee">back</Link>
            </p>
            <div style={{display: 'flex', justifyContent: 'center', padding: 30}}>
              <ItemList items={donutList} />
            </div>
            <div style={{display: 'flex', justifyContent: 'center', height: 10}}>
              <Form />
            </div>
        </div>
    );
};

export default OrderPage;