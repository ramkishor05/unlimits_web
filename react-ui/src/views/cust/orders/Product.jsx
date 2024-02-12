import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';

export default function MediaCard(props) {
    const {item, addToCart, buyNow}= props;
  return (
    <Card className="card">
      <CardMedia
        sx={{ height: 150}}
        image={
            item.logoUrl
        }
        title={item.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {item.title}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
        {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {item.desciption}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{item.retailPrice.price}</Button>
        <Button variant='outlined' size="small" onClick={()=> addToCart(item)}><AddShoppingCart></AddShoppingCart></Button>
      </CardActions>
    </Card>
  );
}