import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const GridMain = withStyles({
    root: {
        flexGrow: '12',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        overflow: 'visible',
    },
})(Grid);

class NotFound extends Component {
    render() {
        return (
            <GridMain
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <label style={{ color: '#ccc', fontWeight: '800', fontSize: '2em', textShadow: '1px 1px 2px blue' }}>
                        {this.props.mensaje}
                    </label>
                </Grid>

            </GridMain>
        )
    }
}
export default NotFound; 