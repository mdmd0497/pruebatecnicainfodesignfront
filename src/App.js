import "./App.css";
import React, { Fragment } from "react";
import Navbar from "./Components/Navbar";
import TramosList from "./Components/TramosList";
import ClientesList from "./Components/Cliente";
import TramosClientesList from "./Components/TramosCliente";
import LinesChart from "./Components/TramosChar";
import ClientesChar from "./Components/ClientesChar";
import TramosClienteChar from "./Components/TramosClienteChar";
function App() {
  return (
    <Fragment>
      <Navbar brand="infoApp" />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 style={{ textAlign: "center" }}>Lista de Clientes</h2>
            <ClientesList/>
          </div>
          <div className="col-12">
            <h2 style={{ textAlign: "center" }}>Clientes Grafico</h2>
            <ClientesChar/>
          </div>
          <div className="col-7">
            <h2 style={{ textAlign: "center" }}>Lista de Tramos</h2>
            <TramosList/>
          </div>
          <div className="col-5">
            <h2 style={{ textAlign: "center" }}>Tramos Grafico</h2>
            <LinesChart/>
          </div>
          <div className="col-7">
            <h2 style={{textAlign: 'center'}}>Lista de  Tramos Clientes</h2>
            <TramosClientesList/>
          </div>
          <div className="col-5">
            <h2 style={{textAlign: 'center'}}>Tramos Cliente Grafico</h2>
            <TramosClienteChar/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
