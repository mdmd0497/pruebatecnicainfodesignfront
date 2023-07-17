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
  const [auxTipoConsumo, setTipoConsumo] = useState([]);
  const [auxPerdida, setPerdida] = useState([]);

  const handleFechainicialChange = (event) => {
    setFechainicial(event.target.value);
  };

  const handleFechafinalChange = (event) => {
    setFechafinal(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/tramos-cliente", {
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
          auxtipoconsumo = [],
          auxperdida = [];

        data.map((element) => {
          auxlineas.push(element.Linea);
          auxtipoconsumo.push(element.TipoConsumo);
          auxperdida.push(element.Perdidas);
        });
        setLinea(auxlineas);
        setTipoConsumo(auxtipoconsumo);
        setPerdida(auxperdida);
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
        label: "Tipo Consumo",
        data: auxTipoConsumo,
        backgroundColor: "rgba(0, 220, 195, 0.5)",
      },
      {
        label: "Perdida",
        data: auxPerdida,
        backgroundColor: "rgba(43, 23, 208, 0.5)",
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
        min: -0.05,
        max: 1,
      },
      x: {
        ticks: { color: "rgba(0, 220, 195)" },
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
    </div>
  );
};

export default ClientesChar;
