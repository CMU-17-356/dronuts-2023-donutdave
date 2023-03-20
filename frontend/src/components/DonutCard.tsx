import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Product from './Product';
import { useState } from 'react';

type DonutCardProps = {
    height : string;
    width : string;
    padding : string;
    margin : string;
    product: Product;
    addToCart : (product : Product) => void
    removeFromCart : (product : Product) => void
}

type QuantityPickerProps = {
    handleAdd : () => void
    handleRemove : () => void
}
function QuantityPicker (props : QuantityPickerProps) {
  const [counter, setCounter] = useState(0);
  return (
     <ButtonGroup size="small" aria-label="small outlined button group">
      <Button disabled={counter <= 0} onClick={() => {
              setCounter(counter - 1)
              props.handleRemove()
              }}>
        -
      </Button>
      {<Button disabled>{counter}</Button>}
      <Button onClick={() => {
              setCounter(counter + 1)
              props.handleAdd()
              }}>
        +
      </Button>
    </ButtonGroup>
  )
}

let USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function DonutCard (props : DonutCardProps) {
    return (
        <Card
        sx={{ height: props.height, width: props.width, display: 'inline-block', flexDirection: 'column', padding: props.padding, margin: props.margin }}
      >
        <CardMedia
          component="img"
          sx={{
            // 16:9
            pt: '0.25%',
          }} 
          image={props.product.image === "" ? 'https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png' 
                                            : props.product.image}
          alt="random"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
          {`${props.product.name}`}
          </Typography>
          <Typography>
          {`${USDollar.format(props.product.price)}`}
          </Typography>
        </CardContent>
        <CardActions>
            <QuantityPicker handleAdd={() => props.addToCart(props.product)} 
                            handleRemove={() => props.removeFromCart(props.product)}
            />
        </CardActions>
      </Card>
    )
}

export default DonutCard