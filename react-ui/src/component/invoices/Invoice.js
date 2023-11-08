import { Box, Card, CardContent, Grid, Table, TableCell, TableHead, TableRow, Typography } from "@material-ui/core"

const Invoice = ()=>{

    const invoice={
        from: {
            name:"", 
            phone:"", 
            address:""
        },
        to: {
            name:"", 
            phone:"", 
            address:""
        },
        headers:{

        },
        dataList: [],
        subtotal:'',
        discounts: '',
        total:'',
    }

    return (
        <Card sx={{ width: 600, margin: 'auto' }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom>
                            <p>From </p>
                            <p>Ram Kishor </p>
                            <p>Noida </p>
                            <p>Up </p>
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom align="right">
                            <p>To </p>
                            <p>Vijay </p>
                            <p>Noida </p>
                            <p>Up </p>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} container alignContent="flex-end">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        ID
                                    </TableCell>
                                    <TableCell>
                                        Name
                                    </TableCell>
                                    <TableCell>
                                        Price
                                    </TableCell>
                                    <TableCell>
                                        Qnt
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </Grid>
                </Grid>
                <Box height={20}>&nbsp;</Box>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom align="center">
                            Date{' '}
                        </Typography>
                        <Typography gutterBottom align="center">
                            {}
                        </Typography>
                    </Grid>

                    <Grid item xs={5}>
                        <Typography variant="h6" gutterBottom align="center">
                            Order
                        </Typography>
                        
                    </Grid>
                </Grid>
                <Box margin="10px 0">
                    
                </Box>
            </CardContent>
        </Card>
    )
}

export default Invoice;

