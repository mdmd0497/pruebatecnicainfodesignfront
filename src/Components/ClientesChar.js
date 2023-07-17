import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ClientesChar = ({ handleDateChange }) => {
  const [fechainicial, setFechainicial] = useState("");
  const [fechafinal, setFechafinal] = useState("");
  const [tramosData, setTramosData] = useState([]);
  const [auxLinea, setLinea] = useState([]);
  const [auxConsumo_residencial, setConsumoR] = useState([]);
  const [auxConsumo_comercial, setConsumoC] = useState([]);
  const [auxConsumo_industrial, setConsumoI] = useState([]);
  const [auxPerdidas_residencial, setPerdidaR] = useState([]);
  const [auxPerdidas_comercial, setPerdidaC] = useState([]);
  const [auxPerdidas_industrial, setPerdidaI] = useState([]);
  const [auxCosto_residencial, setCostoR] = useState([]);
  const [auxCosto_comercial, setCostoC] = useState([]);
  const [auxCosto_industrial, setCostoI] = useState([]);

  const handleFechainicialChange = (event) => {
    setFechainicial(event.target.value);
  };

  const handleFechafinalChange = (event) => {
    setFechafinal(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/cliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fechainicial: fechainicial,
          fechafinal: fechafinal,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setTramosData([]); // Vaciar los datos existentes
        setTramosData(data); // Almacenar los datos en el estado tramosData
        var auxlineas = [],
          auxconsumo_residencial = [],
          auxconsumo_comercial = [],
          auxconsumo_industrial = [],
          auxperdidas_residencial = [],
          auxperdidas_comercial = [],
          auxperdidas_industrial = [],
          auxcosto_residencial = [],
          auxcosto_comercial = [],
          auxcosto_industrial = [];

        data.map((element) => {
          auxlineas.push(element.Linea);
          auxconsumo_residencial.push(element.consumo_residencial);
          auxconsumo_comercial.push(element.consumo_comercial);
          auxconsumo_industrial.push(element.consumo_industrial);
          auxperdidas_residencial.push(element.perdidas_residencial);
          auxperdidas_comercial.push(element.perdidas_comercial);
          auxperdidas_industrial.push(element.perdidas_industrial);
          auxcosto_residencial.push(element.costo_residencial);
          auxcosto_comercial.push(element.costo_comercial);
          auxcosto_industrial.push(element.costo_industrial);
        });
        setLinea(auxlineas);
        setConsumoR(auxconsumo_residencial);
        setConsumoC(auxconsumo_comercial);
        setConsumoI(auxconsumo_industrial);
        setPerdidaR(auxperdidas_residencial);
        setPerdidaC(auxperdidas_comercial);
        setPerdidaI(auxperdidas_industrial);
        setCostoR(auxcosto_residencial);
        setCostoC(auxcosto_comercial);
        setCostoI(auxcosto_industrial);
      } else {
        console.error("Error al obtener los datos");
      }
    } catch (error) {
      console.error("Error en la conexión con la API", error);
    }
  };

  useEffect(() => {
    // Realizar alguna acción cuando tramosData se actualice, si es necesario
  }, [tramosData]);

  var midata = {
    labels: auxLinea,
    datasets: [
      {
        label: "Consumo Residencial",
        data: auxConsumo_residencial,
        backgroundColor: "rgba(0, 220, 195, 0.5)",
      },
      {
        label: "Consumo Comercial",
        data: auxConsumo_comercial,
        backgroundColor: "rgba(43, 23, 208, 0.5)",
      },
      {
        label: "Consumo Industrial",
        data: auxConsumo_industrial,
        backgroundColor: "rgba(463, 20, 208, 0.5)",
      },
    ],
  };

  var misoptions = {
    responsive: true,
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: -25,
        max: 100,
      },
      x: {
        ticks: { color: "rgba(0, 220, 195)" },
      },
    },
  };
  var midata2 = {
    labels: auxLinea,
    datasets: [
      {
        label: "Perdidas Residencial",
        data: auxPerdidas_residencial,
        backgroundColor: "rgba(0, 220, 195, 0.5)",
      },
      {
        label: "Perdidas Comercial",
        data: auxPerdidas_comercial,
        backgroundColor: "rgba(43, 23, 208, 0.5)",
      },
      {
        label: "Perdidas Industrial",
        data: auxPerdidas_industrial,
        backgroundColor: "rgba(463, 20, 208, 0.5)",
      },
    ],
  };

  var misoptions2 = {
    responsive: true,
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: -2,
        max: 5,
      },
      x: {
        ticks: { color: "rgba(9, 245, 23,0.8)" },
      },
    },
  };
  var midata3 = {
    labels: auxLinea,
    datasets: [
      {
        label: "Costos Residencial",
        data: auxCosto_residencial,
        backgroundColor: "rgba(0, 220, 195, 0.5)",
      },
      {
        label: "Costos Comercial",
        data: auxCosto_comercial,
        backgroundColor: "rgba(43, 23, 208, 0.5)",
      },
      {
        label: "Costos Industrial",
        data: auxCosto_industrial,
        backgroundColor: "rgba(463, 20, 208, 0.5)",
      },
    ],
  };

  var misoptions3 = {
    responsive: true,
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: -25,
        max: 100,
      },
      x: {
        ticks: { color: "rgba(245, 37, 9,0.8)" },
      },
    },
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fechainicial">Fecha inicial:</label>
        <input
          className="form-control"
          type="date"
          id="fechainicial"
          value={fechainicial}
          onChange={handleFechainicialChange}
        />

        <label htmlFor="fechafinal">Fecha final:</label>
        <input
          className="form-control"
          type="date"
          id="fechafinal"
          value={fechafinal}
          onChange={handleFechafinalChange}
        />

        <button className="btn btn-primary" type="submit">
          Enviar
        </button>
      </form>
      <div>
        <Bar data={midata} options={misoptions} />
      </div>
      <div>
        <Bar data={midata2} options={misoptions2} />
      </div>
      <div>
        <Bar data={midata3} options={misoptions3} />
      </div>
    </div>
  );
};

export default ClientesChar;
