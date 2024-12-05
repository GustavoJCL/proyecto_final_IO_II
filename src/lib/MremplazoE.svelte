<script lang="ts">
  // Variables de entrada
  let years = 0; // Número total de años (incluyendo 0)
  let startYear = 0; // Año de decisión inicial
  let machineAge = 0; // Edad actual de la máquina
  let initialCost = 0; // c(0): costo inicial del equipo
  let replacementCost = 0; // I: costo inicial de reemplazo
  let rt: number[] = []; // r(t): ingresos anuales
  let ct: number[] = []; // c(t): costos operativos anuales
  let st: number[] = []; // s(t): valores de salvamento anuales

  // Resultados
  let results: { t: number; conserve: number; replace: number; decision: string; ft: number }[][] = [];
  let stages: number[][] = []; // Etapas dinámicas según el año de decisión inicial

  // Inicializa los arrays para las entradas anuales
  function initializeArrays() {
    rt = Array(years + 1).fill(0);
    ct = Array(years + 1).fill(0);
    st = Array(years + 1).fill(0); // Incluye el año 0
    results = [];
    stages = [];
  }

  // Construir las etapas según el año de decisión inicial
  function buildStages() {
    stages = [];
    for (let i = startYear; i >= 1; i--) {
      if (i === startYear) {
        stages.push([1, 2, 3, years]); // Etapa inicial
      } else if (i === 3) {
        stages.push([1, 2, 5]);
      } else if (i === 2) {
        stages.push([1, 4]);
      } else if (i === 1) {
        stages.push([machineAge]); // Edad de la máquina
      }
    }
  }

  // Función para calcular los ingresos netos máximos y las decisiones
  function calculateMaxNetIncome() {
  if (
    years === 0 ||
    rt.length === 0 ||
    ct.length === 0 ||
    st.length === 0 ||
    startYear < 1 ||
    startYear > years ||
    machineAge < 0 ||
    machineAge >= years
  ) {
    alert("Por favor, completa todos los campos correctamente y selecciona valores válidos.");
    return;
  }

  // Reinicia los resultados y construye las etapas
  results = [];
  buildStages();

  // Inicialización de los ingresos futuros (f(t)) para cada año
  const f = Array(years + 1).fill(0);

  // Calcular la última etapa (Etapa 4)
  const lastStageResults = [];
  const stageYears = stages[0]; // Primera etapa definida dinámicamente
  for (const t of stageYears) {
    const conserve = rt[t] + st[t + 1] - ct[t]; // Conservar
    const replace = rt[0] + st[t] +st[1]- ct[0] - replacementCost; // Reemplazar
    const decision = conserve >= replace ? "K" : "R";
    const ft = Math.max(conserve, replace);

    lastStageResults.push({ t, conserve, replace, decision, ft });
    f[t] = ft; // Guardar el ingreso futuro para este año
  }
  results.push(lastStageResults);

  // Cálculos para etapas previas (hacia atrás)
  for (let i = 1; i < stages.length; i++) {
    const currentStageResults = [];
    const stageYears = stages[i];

    for (const t of stageYears) {
      const conserve = rt[t] - ct[t] + f[t + 1]; // Conservar usando f(t+1)
      const replace = rt[0] + st[t] - ct[0] - replacementCost + f[1]; // Reemplazar usando f(1)
      const decision = conserve >= replace ? "K" : "R";
      const ft = Math.max(conserve, replace);

      currentStageResults.push({ t, conserve, replace, decision, ft });
      f[t] = ft; // Actualizar f(t) para este año
    }
    results.unshift(currentStageResults); // Insertar resultados al inicio
  }
}
</script>

<!-- Interfaz -->
<div class="container mx-auto p-4">
  <h2 class="text-2xl font-bold mb-4">Modelo de Reemplazo de Equipos</h2>

  <!-- Parámetros generales -->
  <div class="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
    <h3 class="text-xl font-semibold mb-4">Parámetros Generales</h3>
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label for="years" class="block text-gray-700">Número de años:</label>
        <input
          type="number"
          id="years"
          min="1"
          bind:value={years}
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          on:change={initializeArrays}
        />
      </div>
      <div>
        <label for="startYear" class="block text-gray-700">Año de Decisión Inicial:</label>
        <input
          type="number"
          id="startYear"
          min="1"
          max={years}
          bind:value={startYear}
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div>
        <label for="machineAge" class="block text-gray-700">Edad de la Máquina:</label>
        <input
          type="number"
          id="machineAge"
          min="0"
          max={years - 1}
          bind:value={machineAge}
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div>
        <label for="initialCost" class="block text-gray-700">Costo inicial (c(0)):</label>
        <input
          type="number"
          id="initialCost"
          bind:value={initialCost}
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div>
        <label for="replacementCost" class="block text-gray-700">Costo de reemplazo (I):</label>
        <input
          type="number"
          id="replacementCost"
          bind:value={replacementCost}
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
    </div>
  </div>

  <!-- Parámetros anuales -->
  <div class="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
    <h3 class="text-xl font-semibold mb-4">Parámetros Anuales</h3>
    <div class="overflow-x-auto">
      <table class="w-full table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2 bg-gray-200">Año (t)</th>
            <th class="px-4 py-2 bg-gray-200">Ingreso r(t)</th>
            <th class="px-4 py-2 bg-gray-200">Costo c(t)</th>
            <th class="px-4 py-2 bg-gray-200">Valor Salvamento s(t)</th>
          </tr>
        </thead>
        <tbody>
          {#each Array(years + 1).fill(0) as _, t}
            <tr>
              <td class="border px-4 py-2">{t}</td>
              <td class="border px-4 py-2">
                <input
                  type="number"
                  bind:value={rt[t]}
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </td>
              <td class="border px-4 py-2">
                <input
                  type="number"
                  bind:value={ct[t]}
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </td>
              <td class="border px-4 py-2">
                <input
                  type="number"
                  bind:value={st[t]}
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <button
      on:click={calculateMaxNetIncome}
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
    >
      Calcular
    </button>
  </div>

  <!-- Resultados -->
  {#if results.length > 0}
    <div class="bg-gray-100 p-6 rounded-lg shadow-md">
      <h3 class="text-xl font-semibold mb-4">Resultados</h3>
      {#each results as stage, stageIndex}
        <h4 class="text-lg font-bold mt-4">Etapa {stageIndex + 1}</h4>
        <table class="w-full table-auto">
          <thead>
            <tr>
              <th class="px-4 py-2 bg-gray-200">Año (t)</th>
              <th class="px-4 py-2 bg-gray-200">Conserva</th>
              <th class="px-4 py-2 bg-gray-200">Reemplaza</th>
              <th class="px-4 py-2 bg-gray-200">Decisión</th>
              <th class="px-4 py-2 bg-gray-200">f(t)</th>
            </tr>
          </thead>
          <tbody>
            {#each stage as { t, conserve, replace, decision, ft }}
              <tr>
                <td class="border px-4 py-2">{t}</td>
                <td class="border px-4 py-2">${conserve.toFixed(2)}</td>
                <td class="border px-4 py-2">${replace.toFixed(2)}</td>
                <td class="border px-4 py-2">{decision}</td>
                <td class="border px-4 py-2">${ft.toFixed(2)}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/each}
    </div>
  {/if}
</div>

<style>
  h2, h3, h4 {
    text-align: center;
    color: #2b6cb0;
  }
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
</style>
