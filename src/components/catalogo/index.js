import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ProductoCard from "./productoCard";


const GridMain = withStyles({
    root: {
        flexGrow: '12',
        flexDirection: 'row',
        width: '100%',
        height: 'auto',
        overflow: 'visible',
        color: 'white',
    },
})(Grid);


class Catalogo extends Component {
    render() {
        return (

            <GridMain
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <label style={{ fontSize: '2.5em', color: '#000', fontWeight: '700' }}>{'Productos del catálogo'}</label>
                </Grid>
                {this.props.productos.map((objProd, index) =>
                    <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={3} style={{ margin: '10px' }}>
                        <ProductoCard producto={objProd} palindrome={this.props.palindrome} />
                    </Grid>)}
            </GridMain>
        )
    }
}
export default Catalogo; 