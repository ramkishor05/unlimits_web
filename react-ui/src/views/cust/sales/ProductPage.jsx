import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Rating } from "@mui/material";
import { Button, TextField } from "@material-ui/core";
import CounterButton from "../../../component/buttons/ShoppingCartButton";
import ShoppingCartButton from "../../../component/buttons/ShoppingCartButton";

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
    width: 100,
    minWidth: 100,
  },
  { field: "category", headerName: "Category", sortable: false, width: 200 },
  { field: "price", headerName: "Price", width: 100 ,
  editable: true
},
  ,
  {
    field: "action",
    headerName: "Action",
    width: 150,
    aligment: 'center',
    renderCell: (params) => (
      <ShoppingCartButton counter={2} params={params}></ShoppingCartButton>
    )
  }
];


const ProductPage = ({ products }) => {
  return (
    <div style={{ height: '450px', width: "100%"}}>
      <DataGrid
        rows={products}
        columns={columns}
        sx={{padding: 0, margin:0, border:0 }}
        
      />
    </div>
  );
};

export default ProductPage;
