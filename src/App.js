import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  //Rutas generales
  const host = "https://api.frankfurter.app"
  const url = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
  const coinBase = "https://api.coinbase.com/v2"

  //DolarSi Api
  const [oficial, setOficial] = useState("");
  const [blue, setBlue] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [bolsa, setBolsa] = useState("");
  const [liqui, setLiqui] = useState("");
  const [textoDolar, setTextoDolar] = useState("");
  const [dolarCss, setDolarCss] = useState("");

  const buscar = async () => {

    const dolarText = `Dolar - Ars`
    setTextoDolar(dolarText)

    let dolar = await axios(url);
    let dataDolar = await dolar.data;
    

    let oficialDolar = `${dataDolar[0].casa.nombre} =
                        Compra: $${dataDolar[0].casa.compra} /
                        Venta: $${dataDolar[0].casa.venta}`

    let blueDolar = `${dataDolar[1].casa.nombre} =
                      Compra: $${dataDolar[1].casa.compra} /
                      Venta: $${dataDolar[1].casa.venta}`
    
    let tarjetaDolar = `${dataDolar[6].casa.nombre} (tarjeta) =
                        Compra: $${dataDolar[6].casa.compra} /
                        Venta: $${dataDolar[6].casa.venta}`
                 
    let bolsaDolar = `${dataDolar[4].casa.nombre} =
                        Compra: $${dataDolar[4].casa.compra} /
                        Venta: $${dataDolar[4].casa.venta}`
    
    let liquiDolar = `${dataDolar[3].casa.nombre} =
                        Compra: $${dataDolar[3].casa.compra} /
                        Venta: $${dataDolar[3].casa.venta}`
    
    setOficial(oficialDolar);
    setBlue(blueDolar);
    setTarjeta(tarjetaDolar);
    setBolsa(bolsaDolar);
    setLiqui(liquiDolar);

    setDolarCss(true)
    setParesCss(false)
    setCryptoCss(false)

  }

  //FrankFurter Api
  const [gbp, setGbp] = useState("");
  const [euro, setEuro] = useState("");
  const [jpy, setJpy] = useState("");
  const [text, setTexto] = useState("");
  const [paresCss, setParesCss] = useState("");
  
  const buscarOtros = async () => {
    
    const texto = `Otras cotizaciones`
    setTexto(texto)

    let gbpDolar = await axios(`${host}/latest?amount=1&from=GBP&to=USD`);
    let gbpData = await gbpDolar.data
    let pound = `GBP (Libra esterlina) = ${gbpData.rates.USD} USD (${gbpData.date})` 
    setGbp(pound);
    
    let euroDolar = await axios(`${host}/latest?amount=1&from=EUR&to=USD`);
    let euroData = await euroDolar.data
    let eur = `EURO = ${euroData.rates.USD} USD (${euroData.date})` 
    setEuro(eur);

    let jpyDolar = await axios(`${host}/latest?amount=1&from=USD&to=JPY`);
    let jpyData = await jpyDolar.data
    let japan = `USD = ${jpyData.rates.JPY} JPY (Yen) (${jpyData.date})` 
    setJpy(japan);

    setParesCss(true)
    setCryptoCss(false)
    setDolarCss(false)
    
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
  const [cryptoCss, setCryptoCss] = useState("");

  const crypto = async () => {

    const textoCrypto =  `Cryptomonedas`
    setCryptoText(textoCrypto)

    let usdt_usd = await axios(`${coinBase}/prices/USDT-USD/buy`)
    let usdt_usd_response = await usdt_usd.data
    let usdt = `USDT (Tether)= $${usdt_usd_response.data.amount} USD`
    setUsdt(usdt)

    let btc_USD = await axios(`${coinBase}/prices/BTC-USD/buy`)
    let btc_USD_response = await btc_USD.data
    let btc = `BTC (Bitcoin) = $${btc_USD_response.data.amount} USD`
    setBtc(btc)

    let eth_USD = await axios(`${coinBase}/prices/ETH-USD/buy`)
    let eth_USD_response = await eth_USD.data
    let eth = `ETH (Ethereum) = $${eth_USD_response.data.amount} USD`
    setEth(eth)

    let ada_USD = await axios(`${coinBase}/prices/ADA-USD/buy`)
    let ada_USD_response = await ada_USD.data
    let ada = `ADA (Cardano) = $${ada_USD_response.data.amount} USD`
    setAda(ada)

    let sol_USD = await axios(`${coinBase}/prices/SOL-USD/buy`)
    let sol_USD_response = await sol_USD.data
    let sol = `SOL (Solana) = $${sol_USD_response.data.amount} USD`
    setSol(sol)

    let matic_usd = await axios(`${coinBase}/prices/MATIC-USD/buy`)
    let matic_usd_response = await matic_usd.data
    let matic = `MATIC (Polygon)= $${matic_usd_response.data.amount} USD`
    setMatic(matic)

    setCryptoCss(true)
    setDolarCss(false)
    setParesCss(false)
  }
    
  

  return (
    <div className="App">
      <div id='titulo'>
        <h2><i>Cambio Hoy</i></h2>
        <p><b><i>¿Qué cotización estas buscando?</i></b></p>
      </div>
      <div className="botones">
        <div>
          <button type="button" id="boton" onClick={buscar}>Dolar - ARS</button>
        </div>
        <div>
          <button type="button" id="boton2" onClick={buscarOtros}>Dolar - Otros</button>
        </div>
        <div>
          <button type="button" id="boton2" onClick={crypto}>Cryptomonedas</button>
        </div>
      </div>
      <div id="cotizaciones">
      <br/>
        {(!! dolarCss) &&
          <div id='dolar'>
            <div id="dolarArs">
              <div>
                <h4>{textoDolar}</h4>
              </div>
              <div className="dolar" id="oficial">
                <p>{oficial}</p>
              </div>
              <div className="dolar" id="blue">
                <p>{blue}</p>
              </div>
              <div className="dolar" id="tarjeta">
                <p>{tarjeta}</p>
              </div>
              <div className="dolar" id="bolsa">
                <p>{bolsa}</p>
              </div>
              <div className="dolar" id="liqui">
                <p>{liqui}</p>
              </div>
            </div>
          </div> 
        }
        {(!! paresCss) && 
        <div id="pares">
          <div id='dolarOtros'>
            <div id="otros">
              <h4><i>{text}</i></h4>
            </div>
            <div id="GBP-USD">
              <p><b>{gbp}</b></p>
            </div>
            <div id="EUR-USD">
              <p><b>{euro}</b></p>
            </div>
            <div id="USD-JPY">
              <p><b>{jpy}</b></p>
            </div>
          </div>
        </div>
        }
        {(!!cryptoCss) && 
          <div id="cryptos">
            <div id="cryptoBox">
              <div id="cryptomonedas">
                <h4><i>{crpytoText}</i></h4>
              </div>
              <div id="USDT">
                <p>{tether}</p>
              </div>
              <br/>
              <div id="BTC">
                <p>{bitcoin}</p>
              </div>
              <br/>
              <div id="ETH">
                <p>{ethereum}</p>
              </div>
              <br/>
              <div id="ADA">
                <p>{cardano}</p>
              </div>
              <br/>
              <div id="SOL">
                <p>{solana}</p>
              </div>
              <br/>
              <div id="MATIC">
                <p>{polygon}</p>
              </div>
              <br/>
            </div>
            <br/>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
