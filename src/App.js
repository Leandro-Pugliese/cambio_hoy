import './App.css';
import { useState } from 'react';
import axios from 'axios';
import moment from 'moment/moment';
import usdtLogo from "./imagenes/usdtLogo.png"
import btcLogo from "./imagenes/btcLogo.png"
import ethLogo from "./imagenes/ethLogo.png"
import adaLogo from "./imagenes/adaLogo.png"
import solanaLogo from "./imagenes/solanaLogo.png"
import maticLogo from "./imagenes/maticLogo.png"


function App() {
  // Hook para pantalla de carga.
  const [pantallaDeCarga, setPantallaDeCarga] = useState(true)
  
  // Hooks para renders de calculadora.
  const [calculadora, setCalculadora] = useState(false)
  const [calcularUsd, setCalcularUsd] = useState(false)
  const [calcularArs, setCalcularArs] = useState(false)
  
  const activarCalculadora = () => {
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
  }

  //Rutas generales
  const host = "https://api.frankfurter.app"
  const url = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
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
  //Render usd-ars
  const [dolarCss, setDolarCss] = useState(false);

  const buscar = async () => {
    
    setPantallaDeCarga(false)
    setDolarCss(false)
    setParesCss(false)
    setCryptoCss(false)
    setCalculadora(false)
    
    let dolar = await axios(url);
    let dataDolar = await dolar.data;

    // Oficial
    let oficialDolar = `${dataDolar[0].casa.nombre}`
    setOficial(oficialDolar)
    
    let oficialDolarCompra = `Compra: $${dataDolar[0].casa.compra.replace(",", ".")}`
    setOficialCompra(oficialDolarCompra)
    
    let oficialDolarVenta = `Venta: $${dataDolar[0].casa.venta.replace(",", ".")}`
    setOficialVenta(oficialDolarVenta)

    // Blue
    let blueDolar = `${dataDolar[1].casa.nombre}`
    setBlue(blueDolar)
    
    let blueDolarCompra = `Compra: $${dataDolar[1].casa.compra.replace(",", ".")}`
    setBlueCompra(blueDolarCompra)
    
    let blueDolarVenta = `Venta: $${dataDolar[1].casa.venta.replace(",", ".")}`
    setBlueVenta(blueDolarVenta)

    // Tarjeta
    let tarjetaDolar = `${dataDolar[6].casa.nombre.replace("t", "T")}`
    setTarjeta(tarjetaDolar)
    
    let tarjetaDolarCompra = `Compra: ${dataDolar[6].casa.compra}`
    setTarjetaCompra(tarjetaDolarCompra)
    
    let tarjetaDolarVenta = `Venta: $${dataDolar[6].casa.venta.replace(",", ".")}`
    setTarjetaVenta(tarjetaDolarVenta)

    // Bolsa
    let bolsaDolar = `${dataDolar[4].casa.nombre}`
    setBolsa(bolsaDolar)
    
    let bolsaDolarCompra = `Compra: $${dataDolar[4].casa.compra.replace(",", ".")}`
    setBolsaCompra(bolsaDolarCompra)
    
    let bolsaDolarVenta = `Venta: $${dataDolar[4].casa.venta.replace(",", ".")}`
    setBolsaVenta(bolsaDolarVenta)

    // Liqui
    let liquiDolar = `${dataDolar[3].casa.nombre}`
    setLiqui(liquiDolar)
    
    let liquiDolarCompra = `Compra: $${dataDolar[3].casa.compra.replace(",", ".")}`
    setLiquiCompra(liquiDolarCompra)
    
    let liquiDolarVenta = `Venta: $${dataDolar[3].casa.venta.replace(",", ".")}`
    setLiquiVenta(liquiDolarVenta)

    setDolarCss(true)
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
  
  
  const onChangeCantidadDolares = function (evento) {
    let monto = evento.target.value
    setCantidadUsdOficialCompra( monto * parseFloat(oficialCompra.slice(9)))
    setCantidadUsdOficialVenta( monto *  parseFloat(oficialVenta.slice(8)))
    setCantidadUsdBlueCompra( monto *  parseFloat(blueCompra.slice(9)))
    setCantidadUsdBlueVenta( monto *  parseFloat(blueVenta.slice(8)))
    setCantidadUsdBolsaCompra( monto *  parseFloat(bolsaCompra.slice(9)))
    setCantidadUsdBolsaVenta( monto *  parseFloat(bolsaVenta.slice(8)))
    setCantidadUsdLiquiCompra( monto *  parseFloat(liquiCompra.slice(9)))
    setCantidadUsdLiquiVenta( monto *  parseFloat(liquiVenta.slice(8)))
    setCantidadUsdTarjetaVenta( monto * parseFloat(tarjetaVenta.slice(8)))
  }
  const onChangeCantidadArs = function (evento) {
    let monto = evento.target.value
    setCantidadUsdOficialCompra( monto / parseFloat(oficialCompra.slice(9)))
    setCantidadUsdOficialVenta( monto /  parseFloat(oficialVenta.slice(8)))
    setCantidadUsdBlueCompra( monto /  parseFloat(blueCompra.slice(9)))
    setCantidadUsdBlueVenta( monto /  parseFloat(blueVenta.slice(8)))
    setCantidadUsdBolsaCompra( monto /  parseFloat(bolsaCompra.slice(9)))
    setCantidadUsdBolsaVenta( monto /  parseFloat(bolsaVenta.slice(8)))
    setCantidadUsdLiquiCompra( monto /  parseFloat(liquiCompra.slice(9)))
    setCantidadUsdLiquiVenta( monto /  parseFloat(liquiVenta.slice(8)))
    setCantidadUsdTarjetaVenta( monto /  parseFloat(tarjetaVenta.slice(8)))
  }

  //FrankFurter Api
  const [gbp, setGbp] = useState("");
  const [euro, setEuro] = useState("");
  const [jpy, setJpy] = useState("");
  const [paresCss, setParesCss] = useState(false);
  
  const buscarOtros = async () => {
    
    setPantallaDeCarga(false)
    setCryptoCss(false)
    setDolarCss(false)
    setParesCss(false)
    setCalculadora(false)

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
  
  //CoinBase Api
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
    setPantallaDeCarga(false)
    setDolarCss(false)
    setParesCss(false)
    setCryptoCss(false)
    setCalculadora(false)
    
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
    setPantallaDeCarga(true)
  }

  //Función para convertir numero a formato moneda
  const formatterPeso = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  })
  // "formatterPeso.format()", Así se llama a la función.
    
  return (
    <div className="App">
      <div className='titulo'>
        <div className='tituloContainer'>
          <div>
            <h2><b>¡Cambio Hoy!</b></h2>
          </div>
          <div>
            <h4><b><i>¿Qué cotización estas buscando?</i></b></h4>
          </div>
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
          (dolarCss) &&
          <div className='dolar'>
            <div className="dolarArs">
              <div className='tituloCaja'>
                <h3><b>USD - ARS</b></h3>
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

              <div className='botonCalculadoraContainer'>
                <button type="button" className='button-62' onClick={activarCalculadora}>Calculadora</button>
              </div>
              
            </div>
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
    </div>
  );
}

export default App;
