
<script setup>
import { ref, computed, onMounted } from 'vue';
import {
  obtenerEquipos,
  crearEquipo,
  actualizarEquipo,
  eliminarEquipo,
} from './services/equiposService';

const equipos = ref([]);
const cargando = ref(true);
const error = ref('');
const busqueda = ref('');
const estadoSeleccionado = ref('');

const mostrarFormulario = ref(false);
const guardando = ref(false);
const mensaje = ref('');
const errorFormulario = ref('');
const equipoEditando = ref(null);

const editarEquipo = (equipo) => {
  equipoEditando.value = equipo.id;

  nuevoEquipo.value = {
    codigoInventario: equipo.codigoInventario,
    nombre: equipo.nombre,
    tipo: equipo.tipo,
    marca: equipo.marca,
    modelo: equipo.modelo,
    ubicacion: equipo.ubicacion,
    estado: equipo.estado,
    fechaAdquisicion: equipo.fechaAdquisicion?.slice(0, 10) ?? '',
    observaciones: equipo.observaciones ?? '',
  };

  mensaje.value = '';
  errorFormulario.value = '';
  mostrarFormulario.value = true;
};

const cancelarFormulario = () => {
  mostrarFormulario.value = false;
  equipoEditando.value = null;
  limpiarFormulario();
  errorFormulario.value = '';
};

const borrarEquipo = async (equipo) => {
  const confirmado = window.confirm(
    `¿Estás segura de que deseas eliminar el equipo ${equipo.codigoInventario}?`,
  );

  if (!confirmado) return;

  try {
    await eliminarEquipo(equipo.id);
    equipos.value = await obtenerEquipos();
    mensaje.value = 'Equipo eliminado correctamente.';
    errorFormulario.value = '';
  } catch (e) {
    const respuesta = e.response?.data?.message;
    errorFormulario.value = Array.isArray(respuesta)
      ? respuesta.join(' ')
      : respuesta || 'No se pudo eliminar el equipo.';
  }
};

const nuevoEquipo = ref({
  codigoInventario: '',
  nombre: '',
  tipo: '',
  marca: '',
  modelo: '',
  ubicacion: '',
  estado: 'Disponible',
  fechaAdquisicion: '',
  observaciones: '',
});

const limpiarFormulario = () => {
  nuevoEquipo.value = {
    codigoInventario: '',
    nombre: '',
    tipo: '',
    marca: '',
    modelo: '',
    ubicacion: '',
    estado: 'Disponible',
    fechaAdquisicion: '',
    observaciones: '',
  };
};

const registrarEquipo = async () => {
  guardando.value = true;
  mensaje.value = '';
  errorFormulario.value = '';

  try {
    if (equipoEditando.value !== null) {
      await actualizarEquipo(
        equipoEditando.value,
        nuevoEquipo.value,
      );
      mensaje.value = 'Equipo actualizado correctamente.';
    } else {
      await crearEquipo(nuevoEquipo.value);
      mensaje.value = 'Equipo registrado correctamente.';
    }

    equipos.value = await obtenerEquipos();
    cancelarFormulario();
  } catch (e) {
    const respuesta = e.response?.data?.message;
    errorFormulario.value = Array.isArray(respuesta)
      ? respuesta.join(' ')
      : respuesta || 'No se pudo guardar el equipo.';
  } finally {
    guardando.value = false;
  }
};

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
        <button
          class="boton-principal"
          @click="mostrarFormulario = !mostrarFormulario"
        >
          + Registrar equipo
        </button>
      </div>

      <p v-if="mensaje" class="mensaje-exito">{{ mensaje }}</p>
      <p v-if="errorFormulario" class="mensaje error">
        {{ errorFormulario }}
      </p>

      <form
        v-if="mostrarFormulario"
        class="formulario"
        @submit.prevent="registrarEquipo"
      >
          <h3>
            {{ equipoEditando !== null ? 'Editar equipo' : 'Registrar nuevo equipo' }}
          </h3>

        <div class="campos-formulario">
          <label>
            Código de inventario
            <input v-model.trim="nuevoEquipo.codigoInventario"
              minlength="3" maxlength="50" required />
          </label>

          <label>
            Nombre
            <input v-model.trim="nuevoEquipo.nombre"
              minlength="3" maxlength="100" required />
          </label>

          <label>
            Tipo
            <input v-model.trim="nuevoEquipo.tipo"
              maxlength="80" required />
          </label>

          <label>
            Marca
            <input v-model.trim="nuevoEquipo.marca"
              maxlength="80" required />
          </label>

          <label>
            Modelo
            <input v-model.trim="nuevoEquipo.modelo"
              maxlength="80" required />
          </label>

          <label>
            Ubicación
            <input v-model.trim="nuevoEquipo.ubicacion"
              maxlength="100" required />
          </label>

          <label>
            Estado
            <select v-model="nuevoEquipo.estado" required>
              <option value="Disponible">Disponible</option>
              <option value="En uso">En uso</option>
              <option value="Mantención">Mantención</option>
              <option value="Baja">Baja</option>
            </select>
          </label>

          <label>
            Fecha de adquisición
            <input v-model="nuevoEquipo.fechaAdquisicion"
              type="date" required />
          </label>

          <label class="campo-completo">
            Observaciones
            <textarea v-model.trim="nuevoEquipo.observaciones"
              rows="3"></textarea>
          </label>
        </div>

        <div class="acciones-formulario">
          <button type="submit" class="boton-principal" :disabled="guardando">
            {{
              guardando
                ? 'Guardando...'
                : equipoEditando !== null
                  ? 'Guardar cambios'
                  : 'Guardar equipo'
            }}
          </button>

          <button
            type="button"
            class="boton-secundario"
            @click="cancelarFormulario"
          >
            Cancelar
          </button>
        </div>
      </form>

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
              <th>Acciones</th>
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
              <td>
                <button
                  type="button"
                  class="boton-secundario"
                  @click="editarEquipo(equipo)"
                >
                  Editar
                </button>
              </td>
              <td class="acciones-tabla">
              <button
                type="button"
                class="boton-editar"
                @click="editarEquipo(equipo)"
              >
                Editar
              </button>

              <button
                type="button"
                class="boton-eliminar"
                @click="borrarEquipo(equipo)"
              >
                Eliminar
              </button>
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

