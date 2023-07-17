import React, { useState, useEffect } from "react";

const TramosClientesList = ({ handleDateChange }) => {
  const [fechainicial, setFechainicial] = useState("");
  const [fechafinal, setFechafinal] = useState("");
  const [TramosClientesData, setTramosClientesData] = useState([]);

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
        setTramosClientesData([]); // Vaciar los datos existentes
        setTramosClientesData(data); // Almacenar los datos en el estado tramosData
      } else {
        console.error("Error al obtener los datos");
      }
    } catch (error) {
      console.error("Error en la conexión con la API", error);
    }
  };

  useEffect(() => {
    // Realizar alguna acción cuando tramosData se actualice, si es necesario
  }, [TramosClientesData]);

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

      <table className="table">
        <thead>
          <tr>
            <th>Linea</th>
            <th>Tipo Consumo</th>
            <th>Perdidas</th>
          </tr>
        </thead>
        <tbody>
          {TramosClientesData.map((tcliente) => (
            <tr key={tcliente.Linea}>
              <td>{tcliente.Linea}</td>
              <td>{tcliente.TipoConsumo}</td>
              <td>{tcliente.Perdidas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TramosClientesList;
