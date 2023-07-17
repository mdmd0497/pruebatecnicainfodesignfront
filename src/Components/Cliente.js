import React, { useState, useEffect } from "react";

const ClientesList = ({ handleDateChange }) => {
  const [fechainicial, setFechainicial] = useState("");
  const [fechafinal, setFechafinal] = useState("");
  const [ClientesData, setClientesData] = useState([]);

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
        setClientesData([]); // Vaciar los datos existentes
        setClientesData(data); // Almacenar los datos en el estado tramosData
      } else {
        console.error("Error al obtener los datos");
      }
    } catch (error) {
      console.error("Error en la conexión con la API", error);
    }
  };

  useEffect(() => {
    // Realizar alguna acción cuando tramosData se actualice, si es necesario
  }, [ClientesData]);

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
            <th>Consumo Residencial</th>
            <th>Consumo Comercial</th>
            <th>Consumo Industrial</th>
            <th>Perdidas Residencial</th>
            <th>Perdidas Comercial</th>
            <th>Perdidas Industrial</th>
            <th>Costo Residencial</th>
            <th>Costo Comercial</th>
            <th>Costo Industrial</th>
          </tr>
        </thead>
        <tbody>
          {ClientesData.map((cliente) => (
            <tr key={cliente.Linea}>
              <td>{cliente.Linea}</td>
              <td>{cliente.consumo_residencial}</td>
              <td>{cliente.consumo_comercial}</td>
              <td>{cliente.consumo_industrial}</td>
              <th>{cliente.perdidas_residencial}</th>
              <th>{cliente.perdidas_comercial}</th>
              <th>{cliente.perdidas_industrial}</th>
              <th>{cliente.costo_residencial}</th>
              <th>{cliente.costo_comercial}</th>
              <th>{cliente.costo_industrial}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientesList;
