import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Cart from './Cart';

type CartModalProps = {
    open : boolean;
    handleClose : () => void;
    cart : Cart
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

interface IObjectKeys {
    [key: string]: number;
  }

type DisplayItemsProps = {
    counts : IObjectKeys
}

function DisplayItems (props : DisplayItemsProps) {
    return(
        <Box>
        {Object.keys(props.counts).map(function (name) {
        return(<Typography>
        {`${props.counts[name]}x ${name}`}
      </Typography>)})}
        </Box>
      )
}

function CartModal (props: CartModalProps) {
    return(
    <Modal
        open={props.open}
        onClose={props.handleClose}
    >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Cart
      </Typography>
      <DisplayItems counts={props.cart.getCounts()}/>
      {"Total: " + USDollar.format(props.cart.getTotal())}
    </Box>
  </Modal>
    )
} 


export default CartModal