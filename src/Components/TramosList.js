import React, { useState, useEffect } from "react";

const TramosList = ({ handleDateChange }) => {
  const [fechainicial, setFechainicial] = useState("");
  const [fechafinal, setFechafinal] = useState("");
  const [tramosData, setTramosData] = useState([]);

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

        <button className="btn btn-primary" type="submit">Enviar</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Linea</th>
            <th>consumo</th>
            <th>perdidas</th>
            <th>costo</th>
          </tr>
        </thead>
        <tbody>
          {tramosData.map((tramo) => (
            <tr key={tramo.Linea}>
              <td>{tramo.Linea}</td>
              <td>{tramo.consumo}</td>
              <td>{tramo.perdidas}</td>
              <td>{tramo.costo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TramosList;
