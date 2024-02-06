import * as React from 'react';
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
import { Button, ButtonGroup, Fab, TableFooter, TablePagination } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PrintIcon from '@mui/icons-material/PrintOutlined';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    table: {
      minWidth: '90%',
      "& .MuiTableCell-root": {
        border: "1px solid rgba(224, 224, 224, 1)"
      }
    }
  });


const getValue=(data, keyStr)=>{
    let keys=keyStr.split("\.");
    let val=data;
    for (let i = 0; i < keys.length; i++){
      if( typeof val === 'object'){
        if(!val){
          val={};
        }
        val=val[keys[i]];
      }
    }
    return val;
  }

  const renderCell= (data, field)=>{
    switch(field.type) {
    case 'img':
        return  <img
                width={field.width}
                height={field.height}
                src={getValue(data,field.name)}
            />
    default:
       return getValue(data,field.name);
    }
}

  const getChildrenLoad = (row,children, props) =>{
    let childrenRow = children.onLoad(row[children.name],row, props);
    return childrenRow ?  children.headers.map((header)=>
            <TableCell key={row.id+'_data_child_collapse_row_body_cel_'+children.name+'_'+childrenRow.id+'_'+header.name}>{
              header.render ? header.render(getValue(childrenRow,header.name), childrenRow,header, props ):
              renderCell(childrenRow, header)
            }</TableCell>
      ) :
              <TableCell key={row.id+'_data_child_collapse_row_body_cel_'+children.name+'_norows'} 
              colSpan={7} sx={{textAlign: 'center'}}>
                            No data founds
            </TableCell>
  }

function Row(props) {
  const classes = useStyles();
  const { row, headers } = props;
  const [open, setOpen] = React.useState(false);


  return (
    <React.Fragment>
      
    <TableRow key={row.id+'_data_main'} sx={{ '& > *': { borderBottom: 'unset' } }}>
           
        {
            headers &&  headers.headers.map((header)=>
                
                    header.name=='actions' 
                    ?
                    <TableCell key={row.id+'_data_main_'+header.name} align={header.align? header.align: 'center'}>
                        <ButtonGroup>
                        {
                           <Button color="primary" aria-label="Collapse"
                              size="small" variant='outlined'
                              onClick={() => setOpen(!open)}
                          >
                              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                          </Button>
                      }
                       {
                          props.editAction &&
                          <Button color="secondary" aria-label="Edit" size="small" variant='outlined'  onClick={() => props.editAction(row)}>
                                <EditIcon/>
                          </Button>
                        }
                        {
                          props.deleteAction &&
                          <Button  color="error" aria-label="Delete"  size="small" variant='outlined' onClick={() => props.deleteAction(row)} >
                            <DeleteIcon />
                          </Button>

                        }
                        {
                          props.printAction && 
                          <Button color="primary"  aria-label="Print"  size="small" variant='outlined'  onClick={() => props.printAction(row)} >
                              <PrintIcon />
                          </Button>
                        }
                        </ButtonGroup>
                    </TableCell>
                    :
                    <TableCell key={row.id+'_data_main_'+header.name} {...header.props}>
                        {
                         header.render ? header.render(getValue(row,header.name),row, header, props ):
                         renderCell(row, header)
                        } 
                            
                    </TableCell>
                
            )
        }
    </TableRow>
    <TableRow key={row.id+'_data_child'}>
        <TableCell  style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={headers.headers.length+1}>
          {
            headers &&  headers.childrens && headers.childrens.map(children=>
            <Collapse key={row.id+'_data_child_collapse'+children.name} in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2, padding:2 }} className={classes.table}>
              <Typography variant="h6" gutterBottom component="div">
                {children.label}
              </Typography>
              <Table size="small" aria-label="purchases" className={classes.table}>
                <TableHead>
                  <TableRow key={row.id+'_data_child_collapse_row_header_'+children.name}>
                   {children.headers.map((header)=>
                      <TableCell key={row.id+'_data_child_collapse_row_header_cel_'+children.name+'_'+header.name}>{header.label}</TableCell>
                   )}
                  </TableRow>
                </TableHead>
                <TableBody>
                 
                  {
                   children.onLoad ? 
                      <TableRow key={row.id+'_data_child_collapse_row_body_'+children.name+'_onLoad'}>
                        { getChildrenLoad(row, children, props ) }
                      </TableRow>
                  :
                  row[children.name] ? row[children.name].map(childrenRow=>
                    <TableRow key={row.id+'_data_child_collapse_row_body_'+children.name+'_onLoad'}>
                    {
                    children.headers.map((header)=>
                      <TableCell key={row.id+'_data_main_'+header.name} {...header.props}>
                        {
                        header.render ? header.render(getValue(childrenRow,header.name),childrenRow, header, props ):
                        getValue(childrenRow,header.name)
                        }   
                      </TableCell>
                        )
                      }
                    </TableRow>
                  )
                  :
                  <TableRow key={row.id+'_data_child_collapse_row_body_'+children.name+'_norows'} >
                           <TableCell key={row.id+'_data_child_collapse_row_body_cel_'+children.name+'__norows'} 
                           colSpan={6} sx={{textAlign: 'center'}}>
                            No data founds
                          </TableCell>
                  </TableRow>
                 
                }
                </TableBody>
                <TableFooter>
                  <TablePagination  rowsPerPage={10} page={1} count={1} onPageChange={()=>{}} rowsPerPageOptions={[10, 50]}  />
                </TableFooter>
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

export default function CollapsibleTable(props) {
  const classes = useStyles();
  const {dataList, headers}=props;

  return (
    <TableContainer component={Paper} >
      <Table aria-label="collapsible table" className={classes.table}>
        <TableHead>
          <TableRow>
           {
                headers && headers.headers.map(header=>
                  header.name=='actions' ?
                  <TableCell key={header.name} align={header.align? header.align: 'center'} >{header.label}</TableCell>:
                    <TableCell key={header.name} align={header.align? header.align: 'left'} >{header.label}</TableCell>
                )
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {  
           dataList && dataList.length>0 ? dataList.map((row) => (
                <Row key={row.id} row={row} {...props}/>
            ))
            :
            <TableRow>
              <TableCell colSpan={headers.headers.length+1} align='center'>
                No rows found
              </TableCell>
            </TableRow>
          }
        </TableBody>
        <TableFooter>
        <TablePagination  rowsPerPage={10} page={1} count={1} onPageChange={()=>{}} rowsPerPageOptions={[10, 50]}  />

        </TableFooter>
      </Table>
    </TableContainer>
  );
}