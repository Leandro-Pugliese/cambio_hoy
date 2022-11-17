import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const host = "https://api.frankfurter.app"
  const url = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"

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
      </div>
    </div>
  );
}

export default App;
