
import axios from 'axios';

const API_URL = 'http://localhost:3000/equipos';

export const obtenerEquipos = async () => {
  const respuesta = await axios.get(API_URL);
  return respuesta.data;
};

export const obtenerEquipo = async (id) => {
  const respuesta = await axios.get(`${API_URL}/${id}`);
  return respuesta.data;
};

export const crearEquipo = async (equipo) => {
  const respuesta = await axios.post(API_URL, equipo);
  return respuesta.data;
};

export const actualizarEquipo = async (id, equipo) => {
  const respuesta = await axios.patch(`${API_URL}/${id}`, equipo);
  return respuesta.data;
};

export const eliminarEquipo = async (id) => {
  const respuesta = await axios.delete(`${API_URL}/${id}`);
  return respuesta.data;
};
