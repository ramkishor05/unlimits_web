import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, ButtonGroup, Fab, Grid, Pagination, TableFooter, TablePagination} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@mui/icons-material/PrintOutlined';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import config from '../../config';
import defaultImg from '../../assets/images/product/no-image.svg'
const useStyles = makeStyles({
    table: {
      width: '100%',
      height:'100%',
      margin: 0,
      padding:0,
      border: "0px",
      "& .MuiPaper-root": {
        padding:0,
        margin:0,
        borderRadius: 0 
      },
      "& .MuiTableRow-root": {
        borderBottom: '1px solid #ddd',
        padding:0,
        margin:0
      },
      "& .MuiTableCell-root": {
        border: "0px solid rgba(224, 224, 224, 1)",
        padding: 8
      },
      "& .MuiTableFooter-root":{
        textAlign: 'right',
        align:'right',

        padding: 8
      },
      "& .MuiTableHeader-root":{
        padding: 8 
      }

    }
  });

function DynamicTable (props){
    const classes = useStyles();
    
    const [totalPages, setTotalPages] = React.useState(props.totalPages);
    const [pageSize, setPageSize] = React.useState(props.pageSize);
    const [pageNumber, setPageNumber] = React.useState(0);
    const handlePageNumber = (event, pageNumber) => {
      setPageNumber(pageNumber);
      props.pageAction &&  props.pageAction(pageNumber-1,props.pageSize);
    };
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
            let logo= getValue(data,field.name);
            let resourseUrl= logo && logo!==""? config.resourseUrl(logo) :defaultImg;
            return  <img
                    width={field.width}
                    height={field.height}
                    className={classes.img}
                    src={resourseUrl}
                />
        case 'color':
            return <Button style={{backgroundColor: getValue(data,field.name), height:'80%'}} ></Button>
        default:
           return getValue(data,field.name);
        }
    }

    const {headers, dataList} = props;
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table" className={classes.table}>
                
                <TableHead>
                <TableRow>
                    {
                        headers && headers.map(header=>
                            header.name=='actions' 
                            ?
                            <TableCell component="th" scope="row" 
                            key={header.name} 
                            align={header.align? header.align: 'center'} 
                            style={{width: header.width, fontWeight: 600}}
                            >{header.label}</TableCell>
                            :
                            <TableCell component="th" scope="row" 
                            key={header.name} align={header.align? header.align: 'left'} 
                            style={{width: header.width, fontWeight: 600}}
                            >{header.label}</TableCell>
                        )
                    }
                </TableRow>
                </TableHead>
                <TableBody>
                {dataList && dataList.length>0 ?  dataList.map((row, i) => (
                    <TableRow key={i}>{
                        headers &&  headers.map(header=>
                            header.name=='actions' 
                            ?
                            header.render ? header.render('', row, i, header, props) :
                            <TableCell key={header.name+'_'+i} align={header.align? header.align: 'center'} style={{fontWeight: 400}}>
                               <ButtonGroup>
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
                            <TableCell key={header.name+'_'+i} {...header.props} style={{fontWeight: 400}}>{
                                header.render ?
                                 header.render(getValue(row,header.name), row, header, props) :
                                renderCell(row,header)
                                
                                
                             }</TableCell>
                            )
                        }
                    </TableRow>
                )) :
                <TableRow>
                    <TableCell colSpan={headers.length+1} align='center'>
                        No rows found
                    </TableCell>
                </TableRow>
                }
                </TableBody>
                {
                  props.pageAction && 
                  <TableFooter style={{border : 0}} >
                    <TableRow style={{border : 0}} >
                      <TableCell colSpan={headers.length} sx={{border : 0, textAlign: 'right'}}  align='right' > 
                      <div style={{border : 2, textAlign: 'right'}}>
                      <Pagination count={totalPages} page={pageNumber}  boundaryCount={1}
                        variant="outlined" shape="rounded" onChange={handlePageNumber}/>
                        </div>
                      </TableCell>
                    </TableRow>
                </TableFooter>
                }
            </Table>
        </TableContainer>
    )
}

export default DynamicTable;