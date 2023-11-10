import { Box, Button, Card, CardActions, CardContent, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core"

const Invoice = (props)=>{
    const {invoice}=props
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
    
   const print=() =>{
        var content = document.getElementById('printarea');
        var pri = document.getElementById('ifmcontentstoprint').contentWindow;
        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();      
    }

    return (
        <>
        <iframe id="ifmcontentstoprint" style={{
            height: '0px',
            width: '0px',
            position: 'absolute'
        }}></iframe>   
        <Card>
            
            <CardContent id='printarea'>
                <Grid container spacing={2}>
                    <Grid item xs={6} xl={6} sx={12}>
                        <Typography variant="h6" gutterBottom>
                            <p>From </p>
                            <p>{invoice.from.name}</p>
                            <p>{invoice.from.address }</p>
                            <p>{invoice.from.phone } </p>
                        </Typography>
                    </Grid>
                    <Grid item xs={6} xl={6} sx={12}>
                        <Typography variant="h6" gutterBottom align="right">
                            <p>To </p>
                            <p>{invoice.from.name}</p>
                            <p>{invoice.from.address }</p>
                            <p>{invoice.from.phone } </p>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} xl={12} sx={12} container alignContent="flex-end">
                        <Table style={{border:1, borderStyle:'outset'}}>
                            <TableHead>
                                
                                 <TableRow>
                                 {
                                 invoice.headers.map(header=>
                                    <TableCell>
                                        {header.label}
                                    </TableCell>
                                 )}
                                </TableRow>
                               
                                
                            </TableHead>
                            <TableBody>
                                
                                 {
                                invoice.items.map(item=>
                                    <TableRow>
                                        {
                                            invoice.headers.map(header=>
                                                <TableCell>
                                                    {
                                                        header.render ? header.render(getValue(item,header.name),item, header, props ):
                                                        getValue(item,header.name)
                                                    }
                                                </TableCell>
                                            )
                                        }
                                     </TableRow>
                                   )
                                }
                                
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
                <Box height={20}>&nbsp;</Box>
                <Grid container spacing={2}>
                    <Grid item xs={8} align="right">
                        
                    </Grid>

                    <Grid item xs={4}>
                        <Grid container spacing={2} >
                            <Grid item xs={9} align="right">
                               Sub Total : 
                            </Grid>
                            <Grid item xs={3} align="right">
                                {invoice.subTotal}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={8} align="right">
                        
                    </Grid>

                    <Grid item xs={4}>
                        <Grid container spacing={2} >
                            <Grid item xs={9} align="right">
                                Discounts :
                            </Grid>
                            <Grid item xs={3} align="right">
                                {invoice.discounts}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={8} align="right">
                        
                    </Grid>

                    <Grid item xs={4}>
                        <Grid container spacing={2} >
                            <Grid item xs={9} align="right">
                                Total Amount :
                            </Grid>
                            <Grid item xs={3} align="right">
                                {invoice.totalAmount}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
               
            </CardContent>
            <CardActions sx={{align: 'right'}}>
                <Button variant='contained' onClick={print} >Print</Button>
            </CardActions>
        </Card>
       
        </>
    )
}

export default Invoice;

