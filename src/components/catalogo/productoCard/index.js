import React, { Component } from '../../../../node_modules/@types/react';
import { withStyles } from '../../../../node_modules/@material-ui/core/styles';
import { Grid, Divider } from '../../../../node_modules/@material-ui/core';
import loader from '../../../resources/loader.gif';
import axios from '../../../../node_modules/axios';

const GridMain = withStyles({
    root: {
        flexGrow: '12',
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center',
        paddingTop: '10px',
        verticalAlign: 'top',
        color: '#FFF',
        marginBottom: '20px',
        marginTop: '20px',
        fontSize: '2em',
        fontWeight: '700',
        backgroundColor: '#000',
        objectFit: 'contain',
    },
})(Grid);


class ProductoCard extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            imagenproducto: '',
        };
        this.axiosImage = this.axiosImage.bind(this);
        this.getImagen = this.getImagen.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);

    }

    componentDidMount() {
        this._isMounted = true;
        this._isMounted && this.getImagen(this.props.producto.image);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getImagen = async (urlobjeto) => {
        const imagenseg = await this.axiosImage(urlobjeto);
        this._isMounted && this.setState({
            imagenproducto: imagenseg
        })
    };

    axiosImage = async (urlimg) => {
        return await axios.get('https://cors-anywhere.herokuapp.com/https://' + urlimg, { responseType: 'arraybuffer' })
            .then((response) => {
                let image = btoa(
                    new Uint8Array(response.data)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                return `data:${response.headers['content-type'].toLowerCase()};base64,${image}`;
            });
    }

    render() {
        const existeImagen = this.state.imagenproducto;

        return (
            <GridMain container item xs={12} sm={12} md={12} lg={12} xl={12} key={this.props.producto.id} spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    {existeImagen ? <img style={{ with: '200px', height: '200px' }} src={existeImagen} alt=''></img> : <div><label style={{ fontSize: '18px', fontWeight: '500', color: 'red', paddingTop: '50%' }}>{'Cargando imagen'}</label><Divider></Divider><img style={{ with: '200px', height: '200px' }} src={loader} alt=''></img></div>}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <label style={{ color: '#D3CD11', fontSize: '0.5em', fontWeight: '500', letterSpacing: '2px' }}>
                        {'Marca'}
                    </label>
                    <Divider></Divider>
                    <label style={{ color: '#FFF', fontSize: '1.5em', fontWeight: '700', letterSpacing: '1px' }}>
                        {this.props.producto.brand}
                    </label>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <label style={{ color: '#D3CD11', fontSize: '0.5em', fontWeight: '500', letterSpacing: '2px' }}>
                        {'Descripcion'}
                    </label>
                    <Divider></Divider>
                    <label style={{ color: '#FFF', fontSize: '1.1em', fontWeight: '300', letterSpacing: '1px' }}>
                        {this.props.producto.description}
                    </label>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <label style={{ color: '#D3CD11', fontSize: '0.5em', fontWeight: '500', letterSpacing: '2px' }}>
                        {'Precio '}{this.props.palindrome && ' Rebajado un 50%!'}
                    </label>
                    <Divider></Divider>
                    <label style={{ color: 'yellow', marginBottom: '20px' }}> $ {this.props.producto.newprice}</label>
                </Grid>
            </GridMain >
        );
    }
}
export default ProductoCard; 