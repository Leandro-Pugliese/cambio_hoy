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

  const buscar = async () => {

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

  }

  //FrankFurter Api
  const [gbp, setGbp] = useState("");
  const [euro, setEuro] = useState("");
  const [jpy, setJpy] = useState("");
  const [text, setTexto] = useState("");
  
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
  }
  
  //CoinBase Api
  const [ethereum, setEth] = useState("");
  const [bitcoin, setBtc] = useState("");
  const [cardano, setAda] = useState("");
  const [solana, setSol] = useState("");
  const [tether, setUsdt] = useState("");
  const [polygon, setMatic] = useState("");
  const [crpytoText, setCryptoText] = useState("");

  const crypto = async () => {

    const textoCrypto =  `Cryptomonedas`
    setCryptoText(textoCrypto)

    let btc_USD = await axios(`${coinBase}/prices/BTC-USD/buy`)
    let btc_USD_response = await btc_USD.data
    let btc = `BTC (Bitcoin) = $${btc_USD_response.data.amount} USD`
    setBtc(btc)

    let eth_USD = await axios(`${coinBase}/prices/ETH-USD/buy`)
    let eth_USD_response = await eth_USD.data
    let eth = `BTC (Ethereum) = $${eth_USD_response.data.amount} USD`
    setEth(eth)

    let ada_USD = await axios(`${coinBase}/prices/ADA-USD/buy`)
    let ada_USD_response = await ada_USD.data
    let ada = `ADA (Cardano) = $${ada_USD_response.data.amount} USD`
    setAda(ada)

    let sol_USD = await axios(`${coinBase}/prices/SOL-USD/buy`)
    let sol_USD_response = await sol_USD.data
    let sol = `SOL (Solana) = $${sol_USD_response.data.amount} USD`
    setSol(sol)

    let usdt_usd = await axios(`${coinBase}/prices/USDT-USD/buy`)
    let usdt_usd_response = await usdt_usd.data
    let usdt = `USDT (Tether)= $${usdt_usd_response.data.amount} USD`
    setUsdt(usdt)

    let matic_usd = await axios(`${coinBase}/prices/MATIC-USD/buy`)
    let matic_usd_response = await matic_usd.data
    let matic = `MATIC (Polygon)= $${matic_usd_response.data.amount} USD`
    setMatic(matic)
  }
    
  

  return (
    <div className="App">
      <div id='titulo'>
        <h2>Cambio Hoy</h2>
        <p><b>¿Qué cotización estas buscando?</b></p>
      </div>
      <div className="botones">
        <div>
          <button type="button" id="boton" onClick={buscar}>Dolar - ARS</button>
        </div>
        <div>
          <button type="button" id="boton2" onClick={buscarOtros}>Dolar - Otros</button>
        </div>
        <div>
          <button type="button" id="boton2" onClick={crypto}>Crypto</button>
        </div>
      </div>
      <div>
        <div>
          <div className="dolar" id="dolar">
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
        <div id="pares">
          <div id="otros">
            <h4>{text}</h4>
          </div>
          <div id="GBP-USD">
            <p>{gbp}</p>
          </div>
          <div id="EUR-USD">
            <p>{euro}</p>
          </div>
          <div id="USD-JPY">
            <p>{jpy}</p>
          </div>
        </div>
        <div id="cryptos">
          <div id="cryptomonedas">
            <h4>{crpytoText}</h4>
          </div>
          <div id="USDT">
            <p>{tether}</p>
          </div>
          <div id="BTC">
            <h4>{bitcoin}</h4>
          </div>
          <div id="ETH">
            <h4>{ethereum}</h4>
          </div>
          <div id="ADA">
            <p>{cardano}</p>
          </div>
          <div id="SOL">
            <p>{solana}</p>
          </div>
          <div id="MATIC">
            <p>{polygon}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
