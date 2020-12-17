import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ProductDetail from "../pages/ProductDetail";


const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    width: 600,
    
  },
  media: {
    height: 200,
    media: 300
  },
});





export default function ProductCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Rp. {props.price}
           <div>
           Stock: {props.stock}
           </div>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <img src="http://cdn.onlinewebfonts.com/svg/img_420427.png" alt="" height="15px"/>
        </Button>
        <Button onClick={ProductDetail} size="small" color="primary">
          <img src="https://cdn3.iconfinder.com/data/icons/business-finance-40/512/24-512.png" alt="" height="15px"/>
        </Button>
      </CardActions>
    </Card>
  );
}