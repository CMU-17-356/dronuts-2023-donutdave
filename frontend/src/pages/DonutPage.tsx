// Written with assistance from ChatGPT

import { Link } from 'react-router-dom';
import React, { useState } from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import crumble from './apple_krumb.jpg';


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
      <Typography> Quantity </Typography>
      <input type="text" value={text} onChange={handleTextChange} />
      <Button type="submit">Order</Button>
    </form>
  );
}
  
function DonutPage (props : OrderPageProps) {
    return (
      
        <div >
          <Link to="/employee"> <Button >Employee Page</Button></Link>
        <Link to="/customer"> <Button >Customer Page</Button></Link>
        <Link to="/signup"> <Button >Sign Up</Button></Link>
            <p>
            <Link to="/customer"> <Button >Back</Button></Link>
            </p>
            <div >
            

            <div style={{display: 'inline-block',  width: "50%", float: "left"}}>
              <img style={{display: 'inline-block',  width:"50%", float: "left"}} src= {crumble} alt="hello"/>
              <Form />
              </div>
            </div>
        </div>
    );
};

export default DonutPage;