<script lang="ts">
    // Definición del tipo para cada actividad
    type Actividad = {
      actividad: string;
      duracion: number;
      dependencias: string[];
      earlyStart: number;
      earlyFinish: number;
      lateStart: number;
      lateFinish: number;
      slack: number;
      predecesores: string[];
      sucesores: string[];
    };
  
    // Variables para almacenar actividades, resultados y ruta crítica
    let actividades: Actividad[] = [];
    let actividad: string = '';
    let duracion: string = '';
    let dependencias: string = '';
    let resultado: Actividad[] = [];
    let rutaCritica: string[] = [];
  
    // Función para agregar una actividad
    function agregarActividad() {
      if (actividad && duracion) {
        actividades = [
          ...actividades, // Clona el array para forzar la reactividad
          {
            actividad,
            duracion: parseFloat(duracion),
            dependencias: dependencias ? dependencias.split(',') : [],
            earlyStart: 0,
            earlyFinish: 0,
            lateStart: 0,
            lateFinish: Infinity,
            slack: 0,
            predecesores: [],
            sucesores: []
          }
        ];
        // Limpieza de los campos de entrada
        actividad = '';
        duracion = '';
        dependencias = '';
      }
    }
  
    // Función para calcular el método CPM
    function calcularCPM() {
      let grafo = new Map<string, Actividad>();
  
      // Construcción del grafo de actividades con predecesores y sucesores
      actividades.forEach(act => {
        grafo.set(act.actividad, { ...act, predecesores: [], sucesores: [] });
      });
  
      actividades.forEach(act => {
        act.dependencias.forEach(dep => {
          if (grafo.has(dep)) {
            grafo.get(dep)?.sucesores.push(act.actividad);
            grafo.get(act.actividad)?.predecesores.push(dep);
          }
        });
      });
  
      // Forward pass (Calcula Early Start y Early Finish)
      let stack = actividades.filter(act => act.dependencias.length === 0);
      while (stack.length) {
        let current = stack.shift()!;
        let currentNode = grafo.get(current.actividad)!;
        currentNode.earlyFinish = currentNode.earlyStart + currentNode.duracion;
  
        currentNode.sucesores.forEach(succ => {
          let succNode = grafo.get(succ)!;
          succNode.earlyStart = Math.max(succNode.earlyStart, currentNode.earlyFinish);
          if (!stack.includes(succNode)) {
            stack.push(succNode);
          }
        });
      }
  
      // Calcula el tiempo total del proyecto
      let maxDuracion = Math.max(...Array.from(grafo.values()).map(node => node.earlyFinish));
  
      // Backward pass (Calcula Late Start y Late Finish)
      stack = actividades.filter(act => grafo.get(act.actividad)!.sucesores.length === 0);
      stack.forEach(act => {
        let node = grafo.get(act.actividad)!;
        node.lateFinish = maxDuracion;
        node.lateStart = node.lateFinish - node.duracion;
      });
  
      while (stack.length) {
        let current = stack.shift()!;
        let currentNode = grafo.get(current.actividad)!;
  
        currentNode.predecesores.forEach(pred => {
          let predNode = grafo.get(pred)!;
          predNode.lateFinish = Math.min(predNode.lateFinish, currentNode.lateStart);
          predNode.lateStart = predNode.lateFinish - predNode.duracion;
  
          if (!stack.includes(predNode)) {
            stack.push(predNode);
          }
        });
      }
  
      // Calcula Slack y determina la ruta crítica
      resultado = [];
      rutaCritica = [];
      
      grafo.forEach((node) => {
        node.slack = node.lateStart - node.earlyStart;
        resultado.push(node);
        if (node.slack === 0) {
          rutaCritica.push(node.actividad);
        }
      });
    }
  </script>
  
  <style>
    h1, h2, h3 {
      text-align: center;
      color: #4A90E2;
    }
    
    form {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }
  
    input {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  
    button {
      padding: 0.5rem 1rem;
      background-color: #4A90E2;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  
    button:hover {
      background-color: #357ABD;
    }
  
    table {
      width: 90%;
      margin: 1rem auto;
      border-collapse: collapse;
    }
  
    th, td {
      padding: 0.75rem;
      border: 1px solid #ddd;
      text-align: center;
    }
  
    th {
      background-color: #4A90E2;
      color: white;
    }
  
    td {
      background-color: #f9f9f9;
    }
  </style>
  
  <h1>Método CPM</h1>
  
  <!-- Formulario para agregar actividades -->
  <form on:submit|preventDefault={agregarActividad}>
    <input type="text" placeholder="Actividad" bind:value={actividad} required />
    <input type="number" placeholder="Duración" bind:value={duracion} required />
    <input type="text" placeholder="Dependencias (separadas por coma)" bind:value={dependencias} />
    <button type="submit">Agregar Actividad</button>
  </form>
  
  <!-- Tabla de actividades agregadas -->
  <h2>Actividades Agregadas:</h2>
  <table>
    <thead>
      <tr>
        <th>Actividad</th>
        <th>Duración</th>
        <th>Dependencias</th>
      </tr>
    </thead>
    <tbody>
      {#each actividades as {actividad, duracion, dependencias}}
        <tr>
          <td>{actividad}</td>
          <td>{duracion}</td>
          <td>{dependencias.join(', ')}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  
  <!-- Botón para calcular CPM -->
  <div style="text-align: center; margin-top: 1rem;">
    <button on:click={calcularCPM}>Solve</button>
  </div>
  
  <!-- Tabla de resultados con los detalles del CPM -->
  {#if resultado.length > 0}
    <h2>Resultados del CPM:</h2>
    <table>
      <thead>
        <tr>
          <th>Actividad</th>
          <th>Duración</th>
          <th>Inicio Temprano (ES)</th>
          <th>Fin Temprano (EF)</th>
          <th>Inicio Tardío (LS)</th>
          <th>Fin Tardío (LF)</th>
          <th>Slack</th>
        </tr>
      </thead>
      <tbody>
        {#each resultado as {actividad, duracion, earlyStart, earlyFinish, lateStart, lateFinish, slack}}
          <tr>
            <td>{actividad}</td>
            <td>{duracion}</td>
            <td>{earlyStart}</td>
            <td>{earlyFinish}</td>
            <td>{lateStart}</td>
            <td>{lateFinish}</td>
            <td>{slack}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  
    <!-- Mostrar la Ruta Crítica -->
    <h3>Ruta Crítica:</h3>
    <p>{rutaCritica.join(' → ')}</p>
  {/if}
  