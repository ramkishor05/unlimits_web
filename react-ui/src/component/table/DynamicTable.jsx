import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Fab} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles({
    table: {
      minWidth: '90%',
      height:'100%',
      margin: 0,
      padding:0,
      "& .MuiTableCell-root": {
        border: "1px solid rgba(224, 224, 224, 1)"
      }
    }
  });

const styles = {
    updateButton: {
        color: 'purple'
    },
    deleteButton: {
        color: 'red'
    }
};

function DynamicTable (props){
    const classes = useStyles();

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

    const {headers, dataList} = props;
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table" className={classes.table}>
                <caption>{props.title}</caption>
                <TableHead>
                <TableRow>
                    {
                        headers && headers.map(header=>
                            header.name=='actions' 
                            ?
                            <TableCell component="th" scope="row" key={header.name} align={header.align? header.align: 'center'} >{header.label}</TableCell>
                            :
                            <TableCell component="th" scope="row" key={header.name} align={header.align? header.align: 'left'} >{header.label}</TableCell>
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
                            <TableCell key={header.name+'_'+i} align={header.align? header.align: 'center'}>
                                <Fab color="secondary" aria-label="Edit" size="small"   onClick={() => props.editAction(row)}>
                                    <EditIcon/>
                                </Fab>
                                <Fab color="secondary" aria-label="Delete"  size="small"  onClick={() => props.deleteAction(row)} >
                                    <DeleteIcon />
                                </Fab>
                            </TableCell>
                            :
                            <TableCell key={header.name+'_'+i} {...header.props}>{
                                getValue(row,header.name)
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
            </Table>
        </TableContainer>
    )
}

export default DynamicTable;