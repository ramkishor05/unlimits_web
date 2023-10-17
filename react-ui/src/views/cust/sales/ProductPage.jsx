import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Rating } from "@mui/material";
import { Button } from "@material-ui/core";

const columns = [
  {
    field: "image",
    headerName: "IMG",
    width: 80,
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
    minWidth: 200,
  },
  { field: "category", headerName: "Category", sortable: false, width: 130 },
  { field: "price", headerName: "Price", width: 130 },
  {
    field: "rating",
    headerName: "Rating",
    width: 130,
    valueFormatter: ({ value }) => value.rate,
    renderCell: (params) => (
      <Rating
        size="small"
        readOnly
        defaultValue={params.value.rate}
        precision={0.5}
      />
    ),
    sortComparator: (a, b) => {
      if (a.rate > b.rate) return 1;
      if (a.rate < b.rate) return -1;
      if (a.rate === b.rate) return 0;
    },
  },
  {
    field: "action",
    headerName: "Action",
    width: 130,
    renderCell: (params) => (
      <Button variant="outlined" 
        color="primary" 
        >
            Add
        </Button>
    )
  }
];


const ProductPage = ({ products }) => {
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default ProductPage;
