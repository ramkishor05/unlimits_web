import React from "react";
import { DataGrid  , GridFooter, GridFooterContainer , useGridApiContext, useGridSelectors} from "@mui/x-data-grid";
import { Rating } from "@mui/material";
import { Button, ButtonBase } from "@material-ui/core";
import CounterButton from "../../../component/buttons/ShoppingCartButton";

const columns = [
  {
    field: "image",
    headerName: "IMG",
    width: 30,
    sortable: false,
    renderCell: (params) => (
      <img
        src={params.value}
        height="30"
        width="30"
        style={{ marginLeft: "10px" }}
        alt="product"
      />
    ),
  },
  {
    field: "title",
    headerName: "Product Name",
    sortable: false,
    flex: 1,
    minWidth: 20,
    width: 50,
  },
  {
    field: "action",
    headerName: "Action",
    width: 10,
    flex: 1,
    renderCell: (params) => (
      <CounterButton></CounterButton>
    )
  }
];

const CustomFooter=({rows}) =>{
 
   console.log("apiRef.slotProps.rows=",rows)
  return (
    <GridFooterContainer>
      Sub total : {
        rows && rows.reduce((a,v) =>  a = a + v.price , 0 )
      }

      <Button variant="outlined" >Submit</Button >
    </GridFooterContainer>
  );
}

const CartPage = ({ products }) => {
  return (
    <div style={{ height: 600, width: '100%'}}>
      <DataGrid
        rows={products}
        columns={columns}
        slots={{
          footer: CustomFooter,
        }}
        slotProps={{
          footer: { background: 'red', rows: products},
        }}
      />
    </div>
  );
};

export default CartPage;
