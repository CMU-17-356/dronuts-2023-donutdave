// Written with assistance from ChatGPT

import { Link } from 'react-router-dom';
import React, { useState } from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import crumble from './apple_krumb.jpg';
import TextField from '@mui/material/TextField';
// import CarouselProduct from './CarouselProduct';
import Count from './Count';

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
      <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
      <Count/>
      <Button type="submit">Add to Cart</Button>
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


            <div className="md:container mx-auto">
          <div className="grid grid-cols-1 place-items-center lg:grid-cols-2 gap-4 md:gap-16 xl:gap-[118px] md:mx-1 md:px-6 lg:px-12">
            {/* <CarouselProduct /> */}
            <div className="lg:pl-[5px] lg:pr-0 px-[22px] max-w-[480px] w-full place-self-start lg:place-self-center">
              <p className=" text-oranges mb-2 md:mb-5 font-bold md:text-sm text-[13px] tracking-[0.075em] uppercase">
                sneaker company
              </p>
              <h1 className=" mb-4 md:mb-[35px] capitalize text-very-dark-blue leading-[1.2] md:leading-[1.1] lead font-bold text-[28px] md:text-4xl lg:text-[44px]">
                fall limited edition sneakers
              </h1>
              <p className="md:text-base text-[15px] font-normal text-dark-grayish-blue leading-[1.6]">
                These low-profile sneakers are you perfect casual wear companion. Featuring a durable rubber outer sole,
                they'll withstand everything the weather can offer.
              </p>
              <div className="flex md:flex-col flex-row justify-between md:justify-start items-center md:items-start mt-5">
                <div className="flex items-center gap-4">
                  <p className=" text-very-dark-blue text-[30px] font-bold">$125.00</p>
                  <span className=" text-oranges bg-pale-orange h-fit w-fit leading-none font-extrabold px-[10px] py-1 rounded-lg">
                    50%
                  </span>
                </div>
                <s className=" font-bold tracking-wide text-grayish-blue">$250.00</s>
              </div>

              <div className=" mt-5 md:mt-9 mb-10 lg:mb-5">
                
              </div>
            </div>
          </div>
        </div>




        </div>
    );
};

export default DonutPage;