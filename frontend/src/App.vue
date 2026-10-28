
<script setup>
import { ref, computed, onMounted } from 'vue';
import { obtenerEquipos } from './services/equiposService';

const equipos = ref([]);
const cargando = ref(true);
const error = ref('');
const busqueda = ref('');
const estadoSeleccionado = ref('');

const equiposFiltrados = computed(() => {
  return equipos.value.filter((equipo) => {
    const texto = busqueda.value.toLowerCase().trim();

    const coincideBusqueda = [
      equipo.codigoInventario,
      equipo.nombre,
      equipo.tipo,
      equipo.marca,
      equipo.modelo,
      equipo.ubicacion,
    ].some((valor) => String(valor ?? '').toLowerCase().includes(texto));

    const coincideEstado =
      !estadoSeleccionado.value ||
      equipo.estado === estadoSeleccionado.value;

    return coincideBusqueda && coincideEstado;
  });
});

onMounted(async () => {
  try {
    equipos.value = await obtenerEquipos();
  } catch (e) {
    error.value = 'No fue posible cargar los equipos. Comprueba que el backend esté activo.';
    console.error(e);
  } finally {
    cargando.value = false;
  }
});
</script>

<template>
  <main class="contenedor">
    <header class="encabezado">
      <div>
        <p class="subtitulo">GESTIÓN TECNOLÓGICA</p>
        <h1>Inventario de Equipos</h1>
        <p class="descripcion">
          Administra y consulta los equipos tecnológicos registrados.
        </p>
      </div>
    </header>

    <section class="resumen">
      <div class="tarjeta">
        <span class="etiqueta">Total de equipos</span>
        <strong>{{ equipos.length }}</strong>
      </div>

      <div class="tarjeta">
        <span class="etiqueta">Disponibles</span>
        <strong>
          {{ equipos.filter(e => e.estado === 'Disponible').length }}
        </strong>
      </div>

      <div class="tarjeta">
        <span class="etiqueta">En uso</span>
        <strong>
          {{ equipos.filter(e => e.estado === 'En uso').length }}
        </strong>
      </div>

      <div class="tarjeta">
        <span class="etiqueta">En mantención</span>
        <strong>
          {{ equipos.filter(e => e.estado === 'Mantención').length }}
        </strong>
      </div>
    </section>

    <section class="panel">
      <div class="panel-titulo">
        <div>
          <h2>Equipos registrados</h2>
          <p>Consulta y filtra los equipos del inventario.</p>
        </div>
        <span class="contador">{{ equiposFiltrados.length }} resultados</span>
      </div>

      <div class="filtros">
        <input
          v-model="busqueda"
          type="search"
          placeholder="Buscar por código, nombre, tipo o ubicación..."
          aria-label="Buscar equipos"
        />

        <select v-model="estadoSeleccionado" aria-label="Filtrar por estado">
          <option value="">Todos los estados</option>
          <option value="Disponible">Disponible</option>
          <option value="En uso">En uso</option>
          <option value="Mantención">Mantención</option>
          <option value="Baja">Baja</option>
        </select>
      </div>

      <p v-if="cargando" class="mensaje">Cargando equipos...</p>
      <p v-else-if="error" class="mensaje error">{{ error }}</p>

      <div v-else-if="equiposFiltrados.length" class="tabla-contenedor">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Marca / Modelo</th>
              <th>Ubicación</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="equipo in equiposFiltrados" :key="equipo.id">
              <td class="codigo">{{ equipo.codigoInventario }}</td>
              <td>{{ equipo.nombre }}</td>
              <td>{{ equipo.tipo }}</td>
              <td>{{ equipo.marca }} {{ equipo.modelo }}</td>
              <td>{{ equipo.ubicacion }}</td>
              <td>
                <span
                  class="estado"
                  :class="{
                    disponible: equipo.estado === 'Disponible',
                    uso: equipo.estado === 'En uso',
                    mantencion: equipo.estado === 'Mantención',
                    baja: equipo.estado === 'Baja',
                  }"
                >
                  {{ equipo.estado }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p v-else class="mensaje">
        No se encontraron equipos con los criterios seleccionados.
      </p>
    </section>

    <footer>
      Sistema de Inventario de Equipamiento Tecnológico
    </footer>
  </main>
</template>

