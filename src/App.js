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


function App() {
  // Hook para pantalla de carga.
  const [pantallaDeCarga, setPantallaDeCarga] = useState(true)

  // Posición del footer
  const [footerFixed, setFooterFixed] = useState(true);
  const [footerCalculadora, setFooterCalculadora] = useState(false);

  // Hooks para renders de calculadora.
  const [calculadora, setCalculadora] = useState(false)
  const [calcularUsd, setCalcularUsd] = useState(false)
  const [calcularArs, setCalcularArs] = useState(false)
  
  const activarCalculadora = () => {
    setFooterCalculadora(true)
    setCalculadora(true)
    setCalcularUsd(true)
    setDolarCss(false)
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

  //DolarSi Api
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
    setFooterCalculadora(false)
    setFooterFixed(true)
    setPantallaDeCarga(false)
    setDolarCss(false)
    setParesCss(false)
    setCryptoCss(false)
    setCalculadora(false)
    setMsjError(false)

    try {
      let dolarApi2Oficial = await axios("https://dolarapi.com/v1/dolares/oficial");
      setOficial(dolarApi2Oficial.data.casa.toUpperCase())
      setOficialCompra(`Compra: ${dolarApi2Oficial.data.compra}`)
      setOficialVenta(`Venta: ${dolarApi2Oficial.data.venta}`)
      // Valor para calculadora
      setOficialValorCompra(dolarApi2Oficial.data.compra)
      setOficialValorVenta(dolarApi2Oficial.data.venta)
      // Fecha de actualización (en todas las cotizaciones es la misma menos el dolar crypto que va adelantado 1hs así que lo usamos una sola vez)
      setActualizacionFechaUsd(dolarApi2Oficial.data.fechaActualizacion) //Es un string, lo tengo que pasar a Date.
      const ajusteHorario = new Date(dolarApi2Oficial.data.fechaActualizacion) - 10800000 //Lo paso a Date y ajusto 3hs menos para usar el momentUTC.
      //MomentUTC,Funciona mal, toma el horario de argentina como el utc, por ende vuelve a aumentarte 3hs. Por lo tanto Modificamos el horario (que esta bien en 3hs para que salga con el horario correcto)
      setActualizacionFechaUsd(`${moment.utc(ajusteHorario).format('DD/MM/YYYY, h:mma')}`)
      

      let dolarApi2Blue = await axios("https://dolarapi.com/v1/dolares/blue");
      setBlue(dolarApi2Blue.data.casa.toUpperCase())
      setBlueCompra(`Compra: ${dolarApi2Blue.data.compra}`)
      setBlueVenta(`Venta: ${dolarApi2Blue.data.venta}`)
      setBlueValorCompra(dolarApi2Blue.data.compra)
      setBlueValorVenta(dolarApi2Blue.data.venta)

      let dolarApi2Tarjeta = await axios("https://dolarapi.com/v1/dolares/tarjeta");
      setTarjeta(dolarApi2Tarjeta.data.casa.toUpperCase())
      setTarjetaCompra(`Compra: ${dolarApi2Tarjeta.data.compra}`)
      setTarjetaVenta(`Venta: ${dolarApi2Tarjeta.data.venta}`)
      setTarjetaValorVenta(dolarApi2Tarjeta.data.venta)

      let dolarApi2Bolsa = await axios("https://dolarapi.com/v1/dolares/bolsa");
      setBolsa(dolarApi2Bolsa.data.casa.toUpperCase())
      setBolsaCompra(`Compra: ${dolarApi2Bolsa.data.compra}`)
      setBolsaVenta(`Venta: ${dolarApi2Bolsa.data.venta}`)
      setBolsaValorCompra(dolarApi2Bolsa.data.compra)
      setBolsaValorVenta(dolarApi2Bolsa.data.venta)

      let dolarApi2Liqui = await axios("https://dolarapi.com/v1/dolares/contadoconliqui");
      setLiqui("CONTADO CON LIQUI")
      setLiquiCompra(`Compra: ${dolarApi2Liqui.data.compra}`)
      setLiquiVenta(`Venta: ${dolarApi2Liqui.data.venta}`)
      setLiquiValorCompra(dolarApi2Liqui.data.compra)
      setLiquiValorVenta(dolarApi2Liqui.data.venta)

      let dolarApi2CryptoUsd = await axios("https://dolarapi.com/v1/dolares/cripto");
      setCryptoUsd("CRIPTO DOLAR")
      setCryptoUsdCompra(`Compra: ${dolarApi2CryptoUsd.data.compra}`)
      setCryptoUsdVenta(`Venta: ${dolarApi2CryptoUsd.data.venta}`)
      setCryptoUsdValorCompra(dolarApi2CryptoUsd.data.compra)
      setCryptoUsdValorVenta(dolarApi2CryptoUsd.data.venta)

      setDolarCss(true)

    } catch (error) {
        setMsjError(true)
      }
      
    setFooterFixed(false)
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
  
  const buscarOtros = async () => {
    setFooterCalculadora(false)  
    setFooterFixed(true) 
    setPantallaDeCarga(false)
    setCryptoCss(false)
    setDolarCss(false)
    setParesCss(false)
    setCalculadora(false)
    setMsjError(false)

    let gbpDolar = await axios(`${host}/latest?amount=1&from=GBP&to=USD`);
    let gbpData = await gbpDolar.data
    let pound = `${gbpData.rates.USD} USD (${moment.utc(gbpData.date).format('DD/MM/YYYY')})` 
    setGbp(pound);
    
    let euroDolar = await axios(`${host}/latest?amount=1&from=EUR&to=USD`);
    let euroData = await euroDolar.data
    let eur = `${euroData.rates.USD} USD (${moment.utc(euroData.date).format('DD/MM/YYYY')})` 
    setEuro(eur);

    let jpyDolar = await axios(`${host}/latest?amount=1&from=USD&to=JPY`);
    let jpyData = await jpyDolar.data
    let japan = `${jpyData.rates.JPY} YEN (${moment.utc(jpyData.date).format('DD/MM/YYYY')})` 
    setJpy(japan);

    setParesCss(true)
    setPantallaDeCarga(true)
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

  const crypto = async () => {
    setFooterCalculadora(false)
    setFooterFixed(true)
    setPantallaDeCarga(false)
    setDolarCss(false)
    setParesCss(false)
    setCryptoCss(false)
    setCalculadora(false)
    setMsjError(false)
    
    const textoCrypto =  `CRYPTOMONEDAS`
    setCryptoText(textoCrypto)

    let usdt_usd = await axios(`${coinBase}/prices/USDT-USD/buy`)
    let usdt_usd_response = await usdt_usd.data
    let usdt = `$${usdt_usd_response.data.amount} USD`
    setUsdt(usdt)

    let btc_USD = await axios(`${coinBase}/prices/BTC-USD/buy`)
    let btc_USD_response = await btc_USD.data
    let btc = `$${btc_USD_response.data.amount} USD`
    setBtc(btc)

    let eth_USD = await axios(`${coinBase}/prices/ETH-USD/buy`)
    let eth_USD_response = await eth_USD.data
    let eth = `$${eth_USD_response.data.amount} USD`
    setEth(eth)

    let ada_USD = await axios(`${coinBase}/prices/ADA-USD/buy`)
    let ada_USD_response = await ada_USD.data
    let ada = `$${ada_USD_response.data.amount} USD`
    setAda(ada)

    let sol_USD = await axios(`${coinBase}/prices/SOL-USD/buy`)
    let sol_USD_response = await sol_USD.data
    let sol = `$${sol_USD_response.data.amount} USD`
    setSol(sol)

    let matic_usd = await axios(`${coinBase}/prices/MATIC-USD/buy`)
    let matic_usd_response = await matic_usd.data
    let matic = `$${matic_usd_response.data.amount} USD`
    setMatic(matic)

    setCryptoCss(true)
    setFooterFixed(false)
    setPantallaDeCarga(true)
  }

  // Función para convertir numero a formato moneda
  const formatterPeso = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  })
  // "formatterPeso.format()", Así se llama a la función.

  useEffect(() => {
    buscar();
  }, []);

  return (
    <div className="App">
      <div className='titulo'>
        <div className='tituloContainer'>
          <img src={cambioHoyLogo} alt='Logo' className='titulo__imagen' />
        </div>
      </div>
      <div className="botones">
        <div className='botonesContainer'>
          <div className='buttonContainerIndividual'>
            <button type="button" className='button-62' onClick={buscar}>Dolar - ARS</button>
          </div>
          <div className='buttonContainerIndividual'>
            <button type="button" className='button-62' onClick={buscarOtros}>Dolar - Otros</button>
          </div>
          <div className='buttonContainerIndividual'>
            <button type="button" className='button-62' onClick={crypto}>Cryptomonedas</button>
          </div>
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
            <p className='error__msj'> La Api de consulta (DolarApi.com) no responde, porfavor intente más tarde y disculpe las molestias. </p>
          </div>
        }
        {
          (dolarCss) &&
          <div className='dolar'>
            <div className="dolarArs">
              <div className='tituloCaja'>
                <h3><b> USD - ARS </b></h3>
              </div>
              <div className='dataContainer'>
                
                <div className='dataNombre'>
                  <p><b><i>{oficial}</i></b></p>
                </div>
                <div className='compra-venta'>
                  <div className='compra'>
                    <p><b><i>{oficialCompra}</i></b></p>
                  </div>
                  <div className='venta'>
                    <p><b><i>{oficialVenta}</i></b></p>
                  </div>
                </div>
              </div>
              <div className='renglon'>
                <hr/>
              </div>

              <div className='dataContainer'>
                <div className='dataNombre'>
                  <p><b><i>{blue}</i></b></p>
                </div>
                <div className='compra-venta'>
                  <div className='compra'>
                    <p><b><i>{blueCompra}</i></b></p>
                  </div>
                  <div className='venta'>
                    <p><b><i>{blueVenta}</i></b></p>
                  </div>
                </div>
              </div>
              <div className='renglon'>
                <hr/>
              </div>

              <div className='dataContainer'>
                <div className='dataNombre'>
                  <p><b><i>{tarjeta}</i></b></p>
                </div>
                <div className='compra-venta'>
                  <div className='compra'>
                    <p><b><i>{tarjetaCompra}</i></b></p>
                  </div>
                  <div className='venta'>
                    <p><b><i>{tarjetaVenta}</i></b></p>
                  </div>
                </div>
              </div>
              <div className='renglon'>
                <hr/>
              </div>

              <div className='dataContainer'>
                <div className='dataNombre'>
                  <p><b><i>{bolsa}</i></b></p>
                </div>
                <div className='compra-venta'>
                  <div className='compra'>
                    <p><b><i>{bolsaCompra}</i></b></p>
                  </div>
                  <div className='venta'>
                    <p><b><i>{bolsaVenta}</i></b></p>
                  </div>
                </div>
              </div>
              <div className='renglon'>
                <hr/>
              </div>

              <div className='dataContainer'>
                <div className='dataNombre' id='nombreLargo'>
                  <p><b><i>{liqui}</i></b></p>
                </div>
                <div className='compra-venta'>
                  <div className='compra'>
                    <p><b><i>{liquiCompra}</i></b></p>
                  </div>
                  <div className='venta'>
                    <p><b><i>{liquiVenta}</i></b></p>
                  </div>
                </div>
              </div>
              <div className='renglon'>
                <hr/>
              </div>

              <div className='dataContainer'>
                <div className='dataNombre' id='nombreLargo'>
                  <p><b><i>{cryptoUsd}</i></b></p>
                </div>
                <div className='compra-venta'>
                  <div className='compra'>
                    <p><b><i>{cryptoUsdCompra}</i></b></p>
                  </div>
                  <div className='venta'>
                    <p><b><i>{cryptoUsdVenta}</i></b></p>
                  </div>
                </div>
              </div>
              <div className='renglon'>
                <hr/>
              </div>

              <div className='botonCalculadoraContainer'>
                <button type="button" className='button-62' onClick={activarCalculadora}>Calculadora</button>
              </div>
              
            </div>
            <p>Última actualización: {actualizacionFechaUsd}</p>
          </div> 
        }
        {
          (calculadora) &&
          <div className='calculadoraContainerDisplay'>
            <div>
              <h3><b>CALCULADORA</b></h3>
            </div>
            <div className='selectButtonCalculadoraContainer'>
              <button type="button" className='button-62' onClick={activarCalcularUsd}>USD → ARS</button>
              <button type="button" className='button-62' onClick={activarCalcularArs}>ARS → USD</button>
            </div>
            {
              (calcularUsd)  &&
              <div className='inputCalculadoraContainer'>
                <label> USD → ARS </label>
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
                    <p><b><i>{oficial}</i></b></p>
                  </div>
                  <div className='compra-venta'>
                    <div className='compra'>
                      <p><b><i>Compra: {formatterPeso.format(cantidadUsdOficialCompra.toFixed(2))}</i></b></p>
                    </div>
                    <div className='venta'>
                      <p><b><i>Venta: {formatterPeso.format(cantidadUsdOficialVenta.toFixed(2))}</i></b></p>
                    </div>
                  </div>
                </div>

                <div className='renglon'>
                  <hr/>
                </div>

                <div className='dataContainer'>
                  <div className='dataNombre'>
                    <p><b><i>{blue}</i></b></p>
                  </div>
                  <div className='compra-venta'>
                    <div className='compra'>
                      <p><b><i>Compra: {formatterPeso.format(cantidadUsdBlueCompra.toFixed(2))}</i></b></p>
                    </div>
                    <div className='venta'>
                      <p><b><i>Venta: {formatterPeso.format(cantidadUsdBlueVenta.toFixed(2))}</i></b></p>
                    </div>
                  </div>
                </div>

                <div className='renglon'>
                  <hr/>  
                </div>

                <div className='dataContainer'>
                  <div className='dataNombre'>
                    <p><b><i>{liqui}</i></b></p>
                  </div>
                  <div className='compra-venta'>
                    <div className='compra'>
                      <p><b><i>Compra: {formatterPeso.format(cantidadUsdLiquiCompra.toFixed(2))}</i></b></p>
                    </div>
                    <div className='venta'>
                      <p><b><i>Venta: {formatterPeso.format(cantidadUsdLiquiVenta.toFixed(2))}</i></b></p>
                    </div>
                  </div>
                </div>

                <div className='renglon'>
                  <hr/>  
                </div>

                <div className='dataContainer'>
                  <div className='dataNombre'>
                    <p><b><i>{bolsa}</i></b></p>
                  </div>
                  <div className='compra-venta'>
                    <div className='compra'>
                      <p><b><i>Compra: {formatterPeso.format(cantidadUsdBolsaCompra.toFixed(2))}</i></b></p>
                    </div>
                    <div className='venta'>
                      <p><b><i>Venta: {formatterPeso.format(cantidadUsdBolsaVenta.toFixed(2))}</i></b></p>
                    </div>
                  </div>
                </div>

                <div className='renglon'>
                  <hr/>  
                </div>

                <div className='dataContainer' id='ultimoContainerDato'>
                  <div className='dataNombre'>
                    <p><b><i>{tarjeta}</i></b></p>
                  </div>
                  <div className='compra-venta'>
                    <div className='compra'>
                      <p><b><i>Compra: {cantidadUsdTarjetaCompra}</i></b></p>
                    </div>
                    <div className='venta'>
                      <p><b><i>Venta: {formatterPeso.format(cantidadUsdTarjetaVenta.toFixed(2))}</i></b></p>
                    </div>
                  </div>
                </div>

                <div className='renglon'>
                  <hr/>  
                </div>

                <div className='dataContainer'>
                  <div className='dataNombre'>
                    <p><b><i>{cryptoUsd}</i></b></p>
                  </div>
                  <div className='compra-venta'>
                    <div className='compra'>
                      <p><b><i>Compra: {formatterPeso.format(cantidadUsdCryptoUsdCompra.toFixed(2))}</i></b></p>
                    </div>
                    <div className='venta'>
                      <p><b><i>Venta: {formatterPeso.format(cantidadUsdCryptoUsdVenta.toFixed(2))}</i></b></p>
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
                <h3><b>MONEDAS INTERNACIONALES</b></h3>
              </div>
              <div className="dataContainerPar">
                <div className='dataNombrePar'>
                  <p><b><i>GBP</i></b></p>
                </div>
                <div className='dataValor'>
                  <p><b>{gbp}</b></p>
                </div>
              </div>
              <div className='renglon'>
                <hr/>
              </div>

              <div className="dataContainerPar">
                <div className='dataNombrePar'>
                  <p><b><i>EURO</i></b></p>
                </div>
                <div className='dataValor'>
                  <p><b>{euro}</b></p>
                </div>
              </div>
              <div className='renglon'>
                <hr/>
              </div>

              <div className="dataContainerPar">
                <div className='dataNombrePar'>
                  <p><b><i>USD</i></b></p>
                </div>
                <div className='dataValor'>
                  <p><b>{jpy}</b></p>
                </div>
              </div>
              
            </div>
          </div>
        }
        {
          (cryptoCss) && 
          <div className="cryptos">
            <div className="cryptoBox">
              <div className="tituloCaja">
                <h3><b>{crpytoText}</b></h3>
              </div>
              <div className='cryptoContainer' id="USDT">
                <div className='dataFijaCrypto'>
                  <img src={usdtLogo} alt="" />
                  <p>Tether (USDT)</p>
                </div>
                <div className='dataVariableCrypto'>
                  <p>{tether}</p>
                </div>                
              </div>
              
              <div className='renglon'>
                <hr/>
              </div>
              
              <div className='cryptoContainer' id="BTC">
                <div className='dataFijaCrypto'>
                  <img src={btcLogo} alt="" />
                  <p>Bitcoin (BTC)</p>
                </div>
                <div className='dataVariableCrypto'>
                  <p>{bitcoin}</p>
                </div>                
              </div>
              
              <div className='renglon'>
                <hr/>
              </div>

              <div className='cryptoContainer' id='ETH'>
                <div className='dataFijaCrypto'>
                  <img src={ethLogo} alt="" />
                  <p>Ethereum (ETH)</p>
                </div>
                <div className='dataVariableCrypto'>
                  <p>{ethereum}</p>
                </div>                
              </div>
              
              <div className='renglon'>
                <hr/>
              </div>

              <div className='cryptoContainer' id='ADA'>
                <div className='dataFijaCrypto'>
                  <img src={adaLogo} alt="" />
                  <p>Cardano (ADA)</p>
                </div>
                <div className='dataVariableCrypto'>
                  <p>{cardano}</p>
                </div>                
              </div>
              
              <div className='renglon'>
                <hr/>
              </div>
             
              <div className='cryptoContainer' id='SOL'>
                <div className='dataFijaCrypto'>
                  <img src={solanaLogo} alt="" />
                  <p>Solana (SOL)</p>
                </div>
                <div className='dataVariableCrypto'>
                  <p>{solana}</p>
                </div>                
              </div>
              
              <div className='renglon'>
                <hr/>
              </div>

              <div className='cryptoContainer' id='MATIC'>
                <div className='dataFijaCrypto'>
                  <img src={maticLogo} alt="" />
                  <p>Polygon (MATIC)</p>
                </div>
                <div className='dataVariableCrypto'>
                  <p>{polygon}</p>
                </div>                
              </div>
              
            </div>
          </div>
        }
      </div>
      {
        (footerFixed && !footerCalculadora) &&
        <footer className="footer__info footer__info--bottom">
          <a href='https://www.leandro-pugliese.com/' className='footer__link'>
            &copy; 2024 Leandro Pugliese Web
          </a>
         </footer>
      }
      {
        (!footerFixed && !footerCalculadora && !msjError) &&
        <footer className="footer__info">
          <a href='https://www.leandro-pugliese.com/' className='footer__link'>
            &copy; 2024 Leandro Pugliese Web
          </a>
         </footer>
      }
      {
        (!footerFixed && !footerCalculadora && msjError) &&
        <footer className="footer__info footer__info--bottom">
          <a href='https://www.leandro-pugliese.com/' className='footer__link'>
            &copy; 2024 Leandro Pugliese Web
          </a>
         </footer>
      }
      {
        (footerCalculadora) &&
        <footer className="footer__info-calculadora">
          <a href='https://www.leandro-pugliese.com/' className='footer__link'>
            &copy; 2024 Leandro Pugliese Web
          </a>
        </footer>
      }
    </div>
  );
}

export default App;
