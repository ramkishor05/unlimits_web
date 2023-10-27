import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Fab } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    table: {
      minWidth: '90%',
      "& .MuiTableCell-root": {
        border: "1px solid rgba(224, 224, 224, 1)"
      }
    }
  });

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

const getValue=(data, keyStr)=>{
    let keys=keyStr.split("\.");
    let val=data;
    for (let i = 0; i < keys.length; i++){
      if( typeof val === 'object')
      val=val[keys[i]];
    }
    return val;
  }

function Row(props) {
  const classes = useStyles();
  const { row, headers } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      
    <TableRow key={row.id} sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>{
                    <><IconButton
                        aria-label="expand row"
                        size="small" 
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton> </> 
                }
            </TableCell>
        {
            headers &&  headers.headers.map((header)=>
                
                    header.name=='actions' 
                    ?
                    <TableCell key={header.name+'_'+row.id} align='right'>
                        <Fab color="primary" aria-label="Edit" onClick={() => props.editAction(row)}>
                            <EditIcon/>
                        </Fab>
                        <Fab color="secondary" aria-label="Delete" onClick={() => props.deleteAction(row)} >
                            <DeleteIcon />
                        </Fab>
                    </TableCell>
                    :
                    <TableCell key={header.name+'_'+row.id} {...header.props}>
                        { 
                         getValue(row,header.name)
                        } 
                            
                    </TableCell>
                
            )
        }
    </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={headers.headers.length+1}>
          {
            headers &&  headers.childrens.map(children=>
            <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2, padding:2 }} className={classes.table}>
              <Typography variant="h6" gutterBottom component="div">
                {children.label}
              </Typography>
              <Table size="small" aria-label="purchases" className={classes.table}>
                <TableHead>
                  <TableRow>
                   {children.headers.map((header)=><TableCell>{header.label}</TableCell>)}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    row[children.name].map((childrenRow) => (
                      <TableRow key={childrenRow.id}>
                      {
                        children.headers.map((header)=>
                            <TableCell>{getValue(childrenRow,header.name)}</TableCell>
                        )}
                     </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
           </Collapse>
            )
        }
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable(props) {
  const classes = useStyles();
  const {dataList, headers, vendorCustomerList}=props;

  return (
    <TableContainer component={Paper} >
      <Table aria-label="collapsible table" className={classes.table}>
        <TableHead>
          <TableRow>
          <TableCell><IconButton></IconButton> </TableCell>
           {
                headers && headers.headers.map(header=>
                    <TableCell key={header.name} align={header.align} >{header.label}</TableCell>
                )
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {  
            dataList.map((row) => (
                <Row key={row.id} row={row} headers ={headers}/>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}