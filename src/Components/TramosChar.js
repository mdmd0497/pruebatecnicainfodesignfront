import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LinesChart = ({ handleDateChange }) => {
  const [fechainicial, setFechainicial] = useState("");
  const [fechafinal, setFechafinal] = useState("");
  const [tramosData, setTramosData] = useState([]);
  const [auxLinea, setLinea] = useState([]);
  const [auxConsumo, setConsumo] = useState([]);
  const [auxPerdida, setPerdida] = useState([]);
  const [auxCosto, setCosto] = useState([]);

  const handleFechainicialChange = (event) => {
    setFechainicial(event.target.value);
  };

  const handleFechafinalChange = (event) => {
    setFechafinal(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/tramos", {
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
          auxconsumo = [],
          auxperdida = [],
          auxcosto = [];
        data.map((element) => {
          auxlineas.push(element.Linea);
          auxconsumo.push(element.consumo);
          auxperdida.push(element.perdidas);
          auxcosto.push(element.costo);
        });
        setLinea(auxlineas);
        setConsumo(auxconsumo);
        setPerdida(auxperdida);
        setCosto(auxcosto);
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

  const midata = {
    labels: auxLinea,
    datasets: [
      // Cada una de las líneas del gráfico
      {
        label: "Consumos",
        data: auxConsumo,
        tension: 0.5,
        fill: true,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 5,
        pointBorderColor: "rgba(255, 99, 132)",
        pointBackgroundColor: "rgba(255, 99, 132)",
      },
      {
        label: "Perdidas",
        data: auxPerdida,
        tension: 0.5,
        fill: true,
        borderColor: "rgb(43, 23, 208)",
        backgroundColor: "rgba(43, 23, 208, 0.5)",
        pointRadius: 5,
        pointBorderColor: "rgba(43, 23, 208)",
        pointBackgroundColor: "rgba(43, 23, 208)",
      },
      {
        label: "Costos",
        data: auxCosto,
        tension: 0.5,
        fill: true,
        borderColor: "rgb(245, 9, 48)",
        backgroundColor: "rgba(245, 9, 48, 0.5)",
        pointRadius: 5,
        pointBorderColor: "rgba(245, 9, 48)",
        pointBackgroundColor: "rgba(245, 9, 48)",
      },
    ],
  };

  const misoptions = {
    scales: {
      y: {
        min: 0,
      },
      x: {
        ticks: { color: "rgb(255, 99, 132)" },
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
      <Line data={midata} options={misoptions} />
    </div>
  );
};

export default LinesChart;
