import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment/moment';
import cambioHoyLogo from "./imagenes/Cambio-hoy-logo.jpeg"
import usdtLogo from "./imagenes/usdtLogo.png"
import btcLogo from "./imagenes/btcLogo.png"
import ethLogo from "./imagenes/ethLogo.png"
import adaLogo from "./imagenes/adaLogo.png"
import solanaLogo from "./imagenes/solanaLogo.png"
import maticLogo from "./imagenes/maticLogo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faBitcoinSign, faCoins, faRightLong } from '@fortawesome/free-solid-svg-icons';


function App() {
  // Hook para pantalla de carga.
  const [pantallaDeCarga, setPantallaDeCarga] = useState(true)

  // Hooks para renders de calculadora.
  const [calculadora, setCalculadora] = useState(false)
  const [calcularUsd, setCalcularUsd] = useState(false)
  const [calcularArs, setCalcularArs] = useState(false)
  
  const activarCalculadora = () => {
    setCalculadora(true);
    setCalcularUsd(true);
    setCalcularArs(false);
    setDolarCss(false);
    // Reseteamos a 0 los valores de la calculadora.
    setCantidadUsdOficialCompra(0)
    setCantidadUsdOficialVenta(0)
    setCantidadUsdBlueCompra(0)
    setCantidadUsdBlueVenta(0)
    setCantidadUsdBolsaCompra(0)
    setCantidadUsdBolsaVenta(0)
    setCantidadUsdLiquiCompra(0)
    setCantidadUsdLiquiVenta(0)
    setCantidadUsdTarjetaVenta(0)
    setCantidadUsdCryptoUsdCompra(0)
    setCantidadUsdCryptoUsdVenta(0)
  }

  const activarCalcularUsd = () => {
    setCalcularUsd(true)
    setCalcularArs(false)
    setCantidadUsdOficialCompra(0)
    setCantidadUsdOficialVenta(0)
    setCantidadUsdBlueCompra(0)
    setCantidadUsdBlueVenta(0)
    setCantidadUsdBolsaCompra(0)
    setCantidadUsdBolsaVenta(0)
    setCantidadUsdLiquiCompra(0)
    setCantidadUsdLiquiVenta(0)
    setCantidadUsdTarjetaVenta(0)
    setCantidadUsdCryptoUsdCompra(0)
    setCantidadUsdCryptoUsdVenta(0)
  }

  const activarCalcularArs = () => {
    setCalcularUsd(false)
    setCalcularArs(true)
    setCantidadUsdOficialCompra(0)
    setCantidadUsdOficialVenta(0)
    setCantidadUsdBlueCompra(0)
    setCantidadUsdBlueVenta(0)
    setCantidadUsdBolsaCompra(0)
    setCantidadUsdBolsaVenta(0)
    setCantidadUsdLiquiCompra(0)
    setCantidadUsdLiquiVenta(0)
    setCantidadUsdTarjetaVenta(0)
    setCantidadUsdCryptoUsdCompra(0)
    setCantidadUsdCryptoUsdVenta(0)
  }

  //Rutas generales
  const host = "https://api.frankfurter.app"
  //const url = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
  //Segunda opcion api dolar
  //const url2 = "https://dolarapi.com"
  const coinBase = "https://api.coinbase.com/v2"

  // Oficial
  const [oficial, setOficial] = useState("");
  const [oficialCompra, setOficialCompra] = useState("");
  const [oficialVenta, setOficialVenta] = useState("");
  // Blue
  const [blue, setBlue] = useState("");
  const [blueCompra, setBlueCompra] = useState("");
  const [blueVenta, setBlueVenta] = useState("");
  // Tarjeta
  const [tarjeta, setTarjeta] = useState("");
  const [tarjetaCompra, setTarjetaCompra] = useState("");
  const [tarjetaVenta, setTarjetaVenta] = useState("");
  // Bolsa
  const [bolsa, setBolsa] = useState("");
  const [bolsaCompra, setBolsaCompra] = useState("");
  const [bolsaVenta, setBolsaVenta] = useState("");
  // Liqui
  const [liqui, setLiqui] = useState("");
  const [liquiCompra, setLiquiCompra] = useState("");
  const [liquiVenta, setLiquiVenta] = useState("");
  // Crypto Dolar
  const [cryptoUsd, setCryptoUsd] = useState("");
  const [cryptoUsdCompra, setCryptoUsdCompra] = useState("");
  const [cryptoUsdVenta, setCryptoUsdVenta] = useState("");
  // Render usd-ars
  const [dolarCss, setDolarCss] = useState(false);
  // Render Msj Error
  const [msjError, setMsjError] = useState(false);
  // Hooks valores para calculadora
  const [oficialValorCompra, setOficialValorCompra] = useState(0);
  const [oficialValorVenta, setOficialValorVenta] = useState(0);
  const [blueValorCompra, setBlueValorCompra] = useState(0);
  const [blueValorVenta, setBlueValorVenta] = useState(0);
  const [tarjetaValorVenta, setTarjetaValorVenta] = useState(0);
  const [bolsaValorCompra, setBolsaValorCompra] = useState(0);
  const [bolsaValorVenta, setBolsaValorVenta] = useState(0);
  const [liquiValorCompra, setLiquiValorCompra] = useState(0);
  const [liquiValorVenta, setLiquiValorVenta] = useState(0);
  const [cryptoUsdValorCompra, setCryptoUsdValorCompra] = useState(0);
  const [cryptoUsdValorVenta, setCryptoUsdValorVenta] = useState(0);
  // Hook fecha de actualizacion precio usd.
  const [actualizacionFechaUsd, setActualizacionFechaUsd] = useState("");

  const buscar = async () => {
    setPantallaDeCarga(false);
    setDolarCss(false);
    setParesCss(false);
    setCryptoCss(false);
    setCalculadora(false);
    setMsjError(false);
    try {
      let dolarApi2Oficial = await axios("https://dolarapi.com/v1/dolares/oficial");
      setOficial(dolarApi2Oficial.data.casa.toUpperCase())
      setOficialCompra(`Compra: ${formateoMoneda(dolarApi2Oficial.data.compra)}`)
      setOficialVenta(`Venta: ${formateoMoneda(dolarApi2Oficial.data.venta)}`)
      // Valor para calculadora
      setOficialValorCompra(dolarApi2Oficial.data.compra)
      setOficialValorVenta(dolarApi2Oficial.data.venta)
      // Fecha de actualización (en todas las cotizaciones es la misma menos el dolar crypto que va adelantado 1hs así que lo usamos una sola vez)
      //setActualizacionFechaUsd(dolarApi2Oficial.data.fechaActualizacion) //Es un string, lo tengo que pasar a Date.
      const ajusteHorario = new Date(dolarApi2Oficial.data.fechaActualizacion)// - 10800000 //Lo paso a Date y ajusto 3hs menos para usar el momentUTC.
      //MomentUTC,Funciona mal, toma el horario de argentina como el utc, por ende vuelve a aumentarte 3hs. Por lo tanto Modificamos el horario (que esta bien en 3hs para que salga con el horario correcto)
      // Ojo última actualizacion de momentUTC vuelve a tomar el horario ok.
      setActualizacionFechaUsd(`${moment.utc(ajusteHorario).format('DD/MM/YYYY, h:mma')}`)

      let dolarApi2Blue = await axios("https://dolarapi.com/v1/dolares/blue");
      setBlue(dolarApi2Blue.data.casa.toUpperCase())
      setBlueCompra(`Compra: ${formateoMoneda(dolarApi2Blue.data.compra)}`)
      setBlueVenta(`Venta: ${formateoMoneda(dolarApi2Blue.data.venta)}`)
      setBlueValorCompra(dolarApi2Blue.data.compra)
      setBlueValorVenta(dolarApi2Blue.data.venta)

      let dolarApi2Tarjeta = await axios("https://dolarapi.com/v1/dolares/tarjeta");
      setTarjeta(dolarApi2Tarjeta.data.casa.toUpperCase())
      setTarjetaCompra(`Compra: ${formateoMoneda(dolarApi2Tarjeta.data.compra)}`)
      setTarjetaVenta(`Venta: ${formateoMoneda(dolarApi2Tarjeta.data.venta)}`)
      setTarjetaValorVenta(dolarApi2Tarjeta.data.venta)

      let dolarApi2Bolsa = await axios("https://dolarapi.com/v1/dolares/bolsa");
      setBolsa(dolarApi2Bolsa.data.casa.toUpperCase())
      setBolsaCompra(`Compra: ${formateoMoneda(dolarApi2Bolsa.data.compra)}`)
      setBolsaVenta(`Venta: ${formateoMoneda(dolarApi2Bolsa.data.venta)}`)
      setBolsaValorCompra(dolarApi2Bolsa.data.compra)
      setBolsaValorVenta(dolarApi2Bolsa.data.venta)

      let dolarApi2Liqui = await axios("https://dolarapi.com/v1/dolares/contadoconliqui");
      setLiqui("CONTADO CON LIQUI")
      setLiquiCompra(`Compra: ${formateoMoneda(dolarApi2Liqui.data.compra)}`)
      setLiquiVenta(`Venta: ${formateoMoneda(dolarApi2Liqui.data.venta)}`)
      setLiquiValorCompra(dolarApi2Liqui.data.compra)
      setLiquiValorVenta(dolarApi2Liqui.data.venta)

      let dolarApi2CryptoUsd = await axios("https://dolarapi.com/v1/dolares/cripto");
      setCryptoUsd("CRIPTO DOLAR")
      setCryptoUsdCompra(`Compra: ${formateoMoneda(dolarApi2CryptoUsd.data.compra)}`)
      setCryptoUsdVenta(`Venta: ${formateoMoneda(dolarApi2CryptoUsd.data.venta)}`)
      setCryptoUsdValorCompra(dolarApi2CryptoUsd.data.compra)
      setCryptoUsdValorVenta(dolarApi2CryptoUsd.data.venta)
      
      setDolarCss(true);
    } catch (error) {
        setMsjError(true)
    } 
    setPantallaDeCarga(true)
  }

  // Hook de info para calculadora
  const [cantidadUsdOficialCompra, setCantidadUsdOficialCompra] = useState(0)
  const [cantidadUsdOficialVenta, setCantidadUsdOficialVenta] = useState(0)
  const [cantidadUsdBlueCompra, setCantidadUsdBlueCompra] = useState(0)
  const [cantidadUsdBlueVenta, setCantidadUsdBlueVenta] = useState(0)
  const [cantidadUsdBolsaCompra, setCantidadUsdBolsaCompra] = useState(0)
  const [cantidadUsdBolsaVenta, setCantidadUsdBolsaVenta] = useState(0)
  const [cantidadUsdLiquiCompra, setCantidadUsdLiquiCompra] = useState(0)
  const [cantidadUsdLiquiVenta, setCantidadUsdLiquiVenta] = useState(0)
  const cantidadUsdTarjetaCompra = "No cotiza"
  const [cantidadUsdTarjetaVenta, setCantidadUsdTarjetaVenta] = useState(0)
  const [cantidadUsdCryptoUsdCompra, setCantidadUsdCryptoUsdCompra] = useState(0)
  const [cantidadUsdCryptoUsdVenta, setCantidadUsdCryptoUsdVenta] = useState(0)
  
  const onChangeCantidadDolares = function (evento) {
    let monto = evento.target.value
    setCantidadUsdOficialCompra( monto * oficialValorCompra)
    setCantidadUsdOficialVenta( monto *  oficialValorVenta)
    setCantidadUsdBlueCompra( monto *  blueValorCompra)
    setCantidadUsdBlueVenta( monto *  blueValorVenta)
    setCantidadUsdBolsaCompra( monto *  bolsaValorCompra)
    setCantidadUsdBolsaVenta( monto *  bolsaValorVenta)
    setCantidadUsdLiquiCompra( monto *  liquiValorCompra)
    setCantidadUsdLiquiVenta( monto *  liquiValorVenta)
    setCantidadUsdTarjetaVenta( monto * tarjetaValorVenta)
    setCantidadUsdCryptoUsdCompra(monto * cryptoUsdValorCompra)
    setCantidadUsdCryptoUsdVenta(monto * cryptoUsdValorVenta)
  }
  const onChangeCantidadArs = function (evento) {
    let monto = evento.target.value
    setCantidadUsdOficialCompra( monto / oficialValorCompra)
    setCantidadUsdOficialVenta( monto /  oficialValorVenta)
    setCantidadUsdBlueCompra( monto /  blueValorCompra)
    setCantidadUsdBlueVenta( monto /  blueValorVenta)
    setCantidadUsdBolsaCompra( monto /  bolsaValorCompra)
    setCantidadUsdBolsaVenta( monto /  bolsaValorVenta)
    setCantidadUsdLiquiCompra( monto /  liquiValorCompra)
    setCantidadUsdLiquiVenta( monto /  liquiValorVenta)
    setCantidadUsdTarjetaVenta( monto /  tarjetaValorVenta)
    setCantidadUsdCryptoUsdCompra(monto / cryptoUsdValorCompra)
    setCantidadUsdCryptoUsdVenta(monto / cryptoUsdValorVenta)
  }

  // FrankFurter Api
  const [gbp, setGbp] = useState("");
  const [euro, setEuro] = useState("");
  const [jpy, setJpy] = useState("");
  const [paresCss, setParesCss] = useState(false);
  const [fechaActualizacionPares, setFechaActualizacionPares] = useState("");
  
  
  const buscarOtros = async () => {
    setPantallaDeCarga(false);
    setCryptoCss(false);
    setDolarCss(false);
    setParesCss(false);
    setCalculadora(false);
    setMsjError(false);
    let gbpDolar = await axios(`${host}/latest?amount=1&from=GBP&to=USD`);
    let gbpData = gbpDolar.data;
    let pound = `${formateoMonedaUSD(gbpData.rates.USD)} USD`; 
    setGbp(pound);
    setFechaActualizacionPares(moment.utc(gbpData.date).format('DD/MM/YYYY'))
    let euroDolar = await axios(`${host}/latest?amount=1&from=EUR&to=USD`);
    let euroData = euroDolar.data;
    let eur = `${formateoMonedaUSD(euroData.rates.USD)} USD`; 
    setEuro(eur);
    let jpyDolar = await axios(`${host}/latest?amount=1&from=USD&to=JPY`);
    let jpyData = jpyDolar.data;
    let japan = `${formateoMonedaYen(jpyData.rates.JPY)} YEN` ;
    setJpy(japan);
    setParesCss(true);
    setPantallaDeCarga(true);
  }
  
  // CoinBase Api
  const [ethereum, setEth] = useState("");
  const [bitcoin, setBtc] = useState("");
  const [cardano, setAda] = useState("");
  const [solana, setSol] = useState("");
  const [tether, setUsdt] = useState("");
  const [polygon, setMatic] = useState("");
  //Hook para ocultar texto de crypto.
  const [crpytoText, setCryptoText] = useState("");
  //Hook para ocultar css de cryptos.
  const [cryptoCss, setCryptoCss] = useState(false);
  // Hook para la fecha de la info de crypto.
  const [fechaActualizacionCrypto, setFechaActualizacionCrypto] = useState("");

  const crypto = async () => {
    setPantallaDeCarga(false);
    setDolarCss(false);
    setParesCss(false);
    setCryptoCss(false);
    setCalculadora(false);
    setMsjError(false);
    const textoCrypto =  `CRYPTOMONEDAS`
    setCryptoText(textoCrypto)
    let usdt_usd = await axios(`${coinBase}/prices/USDT-USD/buy`)
    let usdt_usd_response = usdt_usd.data
    let usdt = `${formateoMonedaUSD(Number(usdt_usd_response.data.amount))} USD`
    setUsdt(usdt)
    let btc_USD = await axios(`${coinBase}/prices/BTC-USD/buy`)
    let btc_USD_response = btc_USD.data
    let btc = `${formateoMonedaUSD(Number(btc_USD_response.data.amount))} USD`
    setBtc(btc)
    let eth_USD = await axios(`${coinBase}/prices/ETH-USD/buy`)
    let eth_USD_response = eth_USD.data
    let eth = `${formateoMonedaUSD(Number(eth_USD_response.data.amount))} USD`
    setEth(eth)
    let ada_USD = await axios(`${coinBase}/prices/ADA-USD/buy`)
    let ada_USD_response = ada_USD.data
    let ada = `${formateoMonedaUSD(Number(ada_USD_response.data.amount))} USD`
    setAda(ada)
    let sol_USD = await axios(`${coinBase}/prices/SOL-USD/buy`)
    let sol_USD_response = sol_USD.data
    let sol = `${formateoMonedaUSD(Number(sol_USD_response.data.amount))} USD`
    setSol(sol)
    let matic_usd = await axios(`${coinBase}/prices/MATIC-USD/buy`)
    let matic_usd_response = matic_usd.data
    let matic = `${formateoMonedaUSD(Number(matic_usd_response.data.amount))} USD`
    setMatic(matic);
    //Coin base trae la fecha actual en formato que falla, si la peticion es devuelta ok, armo yo la fecha con un newDate para mostrar que la peticion fue atendida en este momneto
    const fechaHoy = moment(new Date()) 
    const fechaCryptos = fechaHoy.format('DD/MM/YYYY, h:mma')
    setFechaActualizacionCrypto(fechaCryptos);
    setCryptoCss(true);
    setPantallaDeCarga(true);
  }

  // Función para formatear número a moneda.
  const formateoMoneda = (valor) => {
    return valor.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
  }
  const formateoMonedaUSD = (valor) => {
    return valor.toLocaleString('es-US', { style: 'currency', currency: 'USD' });
  }
  const formateoMonedaYen = (valor) => {
    return valor.toLocaleString('ja-JP', { 
      style: 'currency', 
      currency: 'JPY', 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
}
  useEffect(() => {
    buscar();
  // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <div>
              {
                (dolarCss) &&
                <button className="activo" onClick={buscar}>
                  Dolar - ARS
                  <FontAwesomeIcon className='iconoNav' icon={faDollarSign}/>
                </button>
              }
              {
                (!dolarCss) &&
                <button className="" onClick={buscar}>
                  Dolar - ARS 
                  <FontAwesomeIcon className='iconoNav' icon={faDollarSign}/>
                </button>
              } 
            </div>
          </li>
          <li>
            <div>
              {
                (paresCss) &&
                <button className="activo" onClick={buscarOtros}>
                  Dolar - Otros
                  <FontAwesomeIcon className='iconoNav' icon={faCoins} />
                </button>
              }
              {
                (!paresCss) &&
                <button className="" onClick={buscarOtros}>
                  Dolar - Otros
                  <FontAwesomeIcon className='iconoNav' icon={faCoins} />  
                </button>
              }
            </div>
          </li>
          <li>
            <div>
              {
                (cryptoCss) &&
                <button className="activo" onClick={crypto}>
                  Cryptomonedas
                  <FontAwesomeIcon className='iconoNav' icon={faBitcoinSign} />
                </button>
              }
              {
                (!cryptoCss) &&
                <button onClick={crypto}>
                  Cryptomonedas
                  <FontAwesomeIcon className='iconoNav' icon={faBitcoinSign} />
                </button>
              }
            </div>
          </li>
        </ul>
      </nav>
      <div className='container__general'>
        <div className='titulo'>
          <div className='tituloContainer'>
            <img src={cambioHoyLogo} alt='Logo' className='titulo__imagen' />
          </div>
        </div>
        <div className="cotizaciones">
          {
            (!pantallaDeCarga) &&
            <div className="carga-container">
              <div className="carga"></div>
            </div>
          }
          {
            (msjError) &&
            <div className='error__container'>
              <p className='error__msj'> La Api de consulta (DolarApi) no responde, porfavor intente más tarde y disculpe las molestias. </p>
            </div>
          }
          {
            (dolarCss) &&
            <div className='dolar'>
              <div className="dolarArs">
                <div className='tituloCaja'>
                  <h3> USD - ARS </h3>
                </div>
                <div className='dataContainer'>
                  <div className='dataNombre'>
                    {oficial}
                  </div>
                  <div className='compra-venta'>
                    <div className='compra'>
                      {oficialCompra}
                    </div>
                    <div className='venta'>
                      {oficialVenta}
                    </div>
                  </div>
                </div>
                <div className='dataContainer'>
                  <div className='dataNombre'>
                    {blue}
                  </div>
                  <div className='compra-venta'>
                    <div className='compra'>
                      {blueCompra}
                    </div>
                    <div className='venta'>
                      {blueVenta}
                    </div>
                  </div>
                </div>
                <div className='dataContainer'>
                  <div className='dataNombre'>
                    {tarjeta}
                  </div>
                  <div className='compra-venta'>
                    <div className='compra'>
                      {tarjetaCompra}
                    </div>
                    <div className='venta'>
                      {tarjetaVenta}
                    </div>
                  </div>
                </div>
                <div className='dataContainer'>
                  <div className='dataNombre'>
                    {bolsa}
                  </div>
                  <div className='compra-venta'>
                    <div className='compra'>
                      {bolsaCompra}
                    </div>
                    <div className='venta'>
                      {bolsaVenta}
                    </div>
                  </div>
                </div>
                <div className='dataContainer'>
                  <div className='dataNombre nombreLargo'>
                    {liqui}
                  </div>
                  <div className='compra-venta'>
                    <div className='compra'>
                      {liquiCompra}
                    </div>
                    <div className='venta'>
                      {liquiVenta}
                    </div>
                  </div>
                </div>
                <div className='dataContainer'>
                  <div className='dataNombre'>
                    {cryptoUsd}
                  </div>
                  <div className='compra-venta'>
                    <div className='compra'>
                      {cryptoUsdCompra}
                    </div>
                    <div className='venta'>
                      {cryptoUsdVenta}
                    </div>
                  </div>
                </div>
                <div className='botonCalculadoraContainer'>
                  <button type="button" className="botonCalculadora" onClick={activarCalculadora}>Calculadora</button>
                </div>
              </div>
              <div className='fechaData'> Última actualización: {actualizacionFechaUsd} (Fuente: DolarApi)</div>
            </div> 
          }
          {
            (calculadora) &&
            <div className='calculadoraContainerDisplay'>
              <div>
                <h3> CALCULADORA </h3>
              </div>
              <div className='selectButtonCalculadoraContainer'>
                <button className="botonCalculadora" onClick={activarCalcularUsd}>
                  USD <FontAwesomeIcon icon={faRightLong}/> ARS
                </button>
                <button className="botonCalculadora" onClick={activarCalcularArs}>
                  ARS <FontAwesomeIcon icon={faRightLong}/> USD
                </button>
              </div>
              {
                (calcularUsd)  &&
                <div className='inputCalculadoraContainer'>
                  <label> 
                    USD <FontAwesomeIcon className='iconoFlecha' icon={faRightLong}/> ARS 
                  </label>
                  <input type='number' onChange={onChangeCantidadDolares} placeholder='Ingrese la cantidad de dólares...'/>
                </div>
              }
              {
                (calcularArs) &&
                <div className='inputCalculadoraContainer'>
                  <label> ARS → USD </label>
                  <input type='number' onChange={onChangeCantidadArs} placeholder='Ingrese la cantidad de pesos...'/>
                </div>
              }
              <div className='containerCalculadoraDatos'>
                <div className='dataContainer'>
                    <div className='dataNombre'>
                      {oficial}
                    </div>
                    <div className='compra-venta'>
                      <div className='compra'>
                        Compra: {formateoMoneda(cantidadUsdOficialCompra)}
                      </div>
                      <div className='venta'>
                        Venta: {formateoMoneda(cantidadUsdOficialVenta)}
                      </div>
                    </div>
                  </div>
                  <div className='dataContainer'>
                    <div className='dataNombre'>
                      {blue}
                    </div>
                    <div className='compra-venta'>
                      <div className='compra'>
                        Compra: {formateoMoneda(cantidadUsdBlueCompra)}
                      </div>
                      <div className='venta'>
                        Venta: {formateoMoneda(cantidadUsdBlueVenta)}
                      </div>
                    </div>
                  </div>
                  <div className='dataContainer'>
                    <div className='dataNombre nombreLargo'>
                      {liqui}
                    </div>
                    <div className='compra-venta'>
                      <div className='compra'>
                        Compra: {formateoMoneda(cantidadUsdLiquiCompra)}
                      </div>
                      <div className='venta'>
                        Venta: {formateoMoneda(cantidadUsdLiquiVenta)}
                      </div>
                    </div>
                  </div>
                  <div className='dataContainer'>
                    <div className='dataNombre'>
                      {bolsa}
                    </div>
                    <div className='compra-venta'>
                      <div className='compra'>
                        Compra: {formateoMoneda(cantidadUsdBolsaCompra)}
                      </div>
                      <div className='venta'>
                        Venta: {formateoMoneda(cantidadUsdBolsaVenta)}
                      </div>
                    </div>
                  </div>
                  <div className='dataContainer'>
                    <div className='dataNombre'>
                      {tarjeta}
                    </div>
                    <div className='compra-venta'>
                      <div className='compra'>
                        Compra: {cantidadUsdTarjetaCompra}
                      </div>
                      <div className='venta'>
                        Venta: {formateoMoneda(cantidadUsdTarjetaVenta)}
                      </div>
                    </div>
                  </div>
                  <div className='dataContainer'>
                    <div className='dataNombre'>
                      {cryptoUsd}
                    </div>
                    <div className='compra-venta'>
                      <div className='compra'>
                        Compra: {formateoMoneda(cantidadUsdCryptoUsdCompra)}
                      </div>
                      <div className='venta'>
                        Venta: {formateoMoneda(cantidadUsdCryptoUsdVenta)}
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          }
          {
            (paresCss) && 
            <div className="pares">
              <div className='dolarOtros'>
                <div className='tituloCaja'>
                  <h3> MONEDAS INTERNACIONALES </h3>
                </div>
                <div className="dataContainer">
                  <div>
                    GBP
                  </div>
                  <div>
                    {gbp}
                  </div>
                </div>
                <div className="dataContainer">
                  <div>
                    EURO
                  </div>
                  <div>
                    {euro}
                  </div>
                </div>
                <div className="dataContainer">
                  <div>
                    USD
                  </div>
                  <div>
                    {jpy}
                  </div>
                </div>
              </div>
              <div className='fechaData'> Última actualización: {fechaActualizacionPares} (Fuente: Frankfurter.app)</div>
            </div>
          }
          {
            (cryptoCss) && 
            <div className="cryptos">
              <div className="cryptoBox">
                <div className="tituloCaja">
                  <h3> {crpytoText} </h3>
                </div>
                <div className='dataContainer' id="USDT">
                  <div className='dataFijaCrypto'>
                    <img src={usdtLogo} alt="" />
                    Tether (USDT)
                  </div>
                  <div className='dataVariableCrypto'>
                    {tether}
                  </div>                
                </div>
                <div className='dataContainer' id="BTC">
                  <div className='dataFijaCrypto'>
                    <img src={btcLogo} alt="" />
                    Bitcoin (BTC)
                  </div>
                  <div className='dataVariableCrypto'>
                    {bitcoin}
                  </div>                
                </div>
                <div className='dataContainer' id='ETH'>
                  <div className='dataFijaCrypto'>
                    <img src={ethLogo} alt="" />
                    Ethereum (ETH)
                  </div>
                  <div className='dataVariableCrypto'>
                    {ethereum}
                  </div>                
                </div>
                <div className='dataContainer' id='ADA'>
                  <div className='dataFijaCrypto'>
                    <img src={adaLogo} alt="" />
                    Cardano (ADA)
                  </div>
                  <div className='dataVariableCrypto'>
                    {cardano}
                  </div>                
                </div>
                <div className='dataContainer' id='SOL'>
                  <div className='dataFijaCrypto'>
                    <img src={solanaLogo} alt="" />
                    Solana (SOL)
                  </div>
                  <div className='dataVariableCrypto'>
                    {solana}
                  </div>                
                </div>
                <div className='dataContainer' id='MATIC'>
                  <div className='dataFijaCrypto'>
                    <img src={maticLogo} alt="" />
                    Polygon (MATIC)
                  </div>
                  <div className='dataVariableCrypto'>
                    {polygon}
                  </div>                
                </div>
              </div>
              <div className='fechaData'> Última actualización: {fechaActualizacionCrypto} (Fuente: Coinbase) </div>
            </div>
          }
        </div>
      </div>
      <footer>
        <ul>
          <li>
            <a href='https://www.leandro-pugliese.com/' className='footer__link'>
              &copy; 2024 Leandro Pugliese Web
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
