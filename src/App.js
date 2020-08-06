
import React, { Component } from "react";
import BarraArriba from './components/header';
import Catalogo from './components/catalogo';
import axios from '../node_modules/axios';
import fondo from './resources/fondo.svg';
import NotFound from './components/catalogo/notfound';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      resultado: [],
      palindrome: false,
      mensaje: '',
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePalindrome = this.handlePalindrome.bind(this);
    this.getProductos = this.getProductos.bind(this);
  }

  componentDidMount() {
    this.getProductos();
  }

  getProductos = async () => {
    let res = await axios.get("http://localhost:4000/api/products");
    this.setState({ productos: res.data });
  };


  handlePalindrome = (texto) => {
    let re = /[^A-Za-z0-9]/g;
    let auxstr = texto.toLowerCase().replace(re, '');
    let len = auxstr.length;
    for (let i = 0; i < len / 2; i++) {
      if (auxstr[i] !== auxstr[len - 1 - i]) {
        return false;
      }
    }
    return true;
  }

  handleSearch = (buscado) => {

    const aplica50 = this.handlePalindrome(buscado);
    let multiplicador = 1;
    if (aplica50 === true) {
      multiplicador = 0.5;
    }

    let resultado = [];
    let auxProd = {};
    const catalogo = this.state.productos;

    if (buscado.length <= 3) {
      for (let i = 0; i < catalogo.length; i++) {
        if (catalogo[i].id.toString().toLowerCase() === buscado.toString().toLowerCase()) {
          auxProd = catalogo[i];
          auxProd.newprice = auxProd.price * multiplicador;
          auxProd.multiplicador = multiplicador;
          resultado.push(auxProd);
          break;
        }
      }
    } else {
      // eslint-disable-next-line 
      for (let i = 0; i < catalogo.length; i++) {
        if ((catalogo[i].brand.toString().toLowerCase().includes(buscado)) || (catalogo[i].description.toString().toLowerCase().includes(buscado))) {
          auxProd = catalogo[i];
          auxProd.newprice = auxProd.price * multiplicador;
          auxProd.multiplicador = multiplicador;
          resultado.push(auxProd);
        } else if (catalogo[i].id.toString().toLowerCase() === buscado.toString().toLowerCase()) {
          auxProd = catalogo[i];
          auxProd.newprice = auxProd.price * multiplicador;
          auxProd.multiplicador = multiplicador;
          resultado.push(auxProd);
        }
      }
    }

    let mensaje = '';
    if (resultado.length === 0) {
      mensaje = 'Su búsqueda : ' + buscado + ' no arrojó resultados';
    }
    this.setState({ resultado: resultado, palindrome: aplica50, mensaje: mensaje })

  }


  render() {
    const resultado = this.state.resultado;
    const palindrome = this.state.palindrome;
    const mensaje = this.state.mensaje;

    return (
      <div className="App">
        <BarraArriba handleSearch={this.handleSearch}></BarraArriba>
        <div className="Paralax">
          <img src={fondo} className="ParalaxImg" alt={'fondo'}></img>
        </div>
        <div style={{ marginTop: '200px', top: '0', alignItems: 'top', textAlign: 'center' }}>
          {(resultado.length > 0) ? <Catalogo productos={resultado} palindrome={palindrome}></Catalogo> : <NotFound mensaje={mensaje}></NotFound>}
        </div>
      </div>
    )
  }
}
export default App; 
