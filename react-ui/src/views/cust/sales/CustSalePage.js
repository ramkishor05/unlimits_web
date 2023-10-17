import React, { useEffect, useState } from 'react';

// material-ui
import { Box, Card, Grid, Typography } from '@material-ui/core';
import MainCard from '../../../ui-component/cards/MainCard';
import SearchSection from '../../../layout/MainLayout/Header/SearchSection';
import { 
    getCustProductList,
    getCustUnitList
 } from '../../../actions';
import { useDispatch } from 'react-redux';
import { useTheme } from '@material-ui/styles';
import ProductPage from "./ProductPage";
import CartPage from "./CartPage";

import { fetchProducts } from "./dataApi";

// project imports

//==============================|| SAMPLE PAGE ||==============================//

const CustSalePage = () => {
   
    const theme = useTheme();
    const dispatcher = useDispatch();
    const [seachTxt, setSeachTxt] = useState("");
    const [productData, setProductData] = useState([]);
    const [categories, setCategories] = useState([]);
  
    const fetchData = async () => {
      await fetchProducts()
      .then((data) => {
        setProductData(data);
        setCategories(prev => [...new Set(data.map((item) => item.category))])
      })
      .catch((e) => {
        console.error(e);
      });
    };
  
    const fetchDataByCategorie = (e) =>{
      fetchProducts(e.target.value)
      .then((data) => {
        setProductData(data);
      })
      .catch((e) => {
        console.error(e);
      });
    }
    const onSeachTxt= (value) =>{
        setSeachTxt(value)
        dispatcher( getCustProductList() );
    }

    useEffect(()=>{
        dispatcher( getCustProductList() );
        fetchData();
    },[])

    return (
        <MainCard title="Sample Card">
            <SearchSection onSeach={onSeachTxt}></SearchSection>
            <Typography variant="body2"></Typography>
            <Grid container spacing={2} padding={.5}>
                 <Grid key={'cust-product-list'} item xs={9}  >
                     <ProductPage products={productData} />
                </Grid>
                <Grid key={'cust-product-cart'} item xs={3} >
                     <CartPage products={productData} />
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default CustSalePage;
