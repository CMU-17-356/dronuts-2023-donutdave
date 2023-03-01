import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

type DonutCardProps = {
    height : string;
    width : string;
    padding : string;
    margin : string;
    image : string;
    name : string;
    description : string;
}

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
          image={require('../images' + props.image)}
          alt="random"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
          {`${props.name}`}
          </Typography>
          <Typography>
          {`${props.description}`}
          </Typography>
        </CardContent>
        <CardActions>
            <Button sx={{textTransform : 'none'}} size="small">Add to Cart</Button>
        </CardActions>
      </Card>
    )
}

export default DonutCard