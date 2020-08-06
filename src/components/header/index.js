import React, { Component } from "../../../node_modules/@types/react";
import { withStyles } from '../../../node_modules/@material-ui/core/styles';
import { AppBar, Toolbar, Grid, InputBase, IconButton } from '../../../node_modules/@material-ui/core';
import SearchIcon from '../../../node_modules/@material-ui/icons/Search';
import logo from '../../resources/logo.svg';


const GridMain = withStyles({
    root: {
        flexGrow: '12',
        flexDirection: 'row',
        width: '100vmin',
        height: 'auto',
        overflow: 'visible',
        color: 'white',
    },
})(Grid);



class BarraArriba extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quebusca: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        const valor = e.currentTarget.value.toString().toLowerCase();
        this.setState({ quebusca: valor });
    }


    render() {
        const busca = this.state.quebusca;
        return (
            <AppBar position="fixed">
                <Toolbar className="Navbar">
                    <GridMain
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid>
                            <img src={logo} alt='' style={{ height: '64px' }}></img>
                        </Grid>
                        <Grid>
                            <InputBase
                                placeholder="Búsqueda de producto…"
                                style={{ width: '100%', height: '48px', backgroundColor: '#000', color: '#FFF', margin: '10px', minWidth: '50vmin', paddingLeft: '20px', fontSize: '1.5em', fontWeight: '700' }}
                                inputProps={{ 'aria-label': 'search' }} onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid>
                            <IconButton
                                edge="start"
                                aria-label="open drawer"
                                style={{ width: '64px', height: '64px', marginLeft: '20px', backgroundColor: '#FFCC00', marginTop: '10px', marginBottom: '10px' }}
                                onClick={() => this.props.handleSearch(busca)}
                            >
                                <SearchIcon style={{ fontSize: '2em', color: '#FFF' }} />
                            </IconButton>
                        </Grid>
                    </GridMain>
                </Toolbar>
            </AppBar>

        )
    }
}
export default BarraArriba; 