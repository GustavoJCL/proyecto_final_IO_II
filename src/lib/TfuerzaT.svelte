<script lang="ts">
  let workers: number[] = []; // Trabajadores disponibles (x_i)
  let b: number[] = []; // Trabajadores requeridos (b_i)
  let c1: number = 10; // Costo por trabajador excedente
  let c2: number = 20; // Costo por contratar nuevos trabajadores
  let fixedHiringCost: number = 50; // Costo fijo por contratación
  let totalCost: number = 0; // Costo total calculado
  let results: { stage: number; x_i: number; cost: number }[] = []; // Resultados de cada etapa

  let weeks: number = 0; // Número de semanas

  // Inicializar arreglos de trabajadores disponibles y requeridos
  function initializeArrays() {
    workers = Array(weeks).fill(0); // Inicializar con 0
    b = Array(weeks).fill(0); // Inicializar con 0
    results = [];
  }

  // Calcular modelo usando la fórmula recursiva
  function calculateWorkforceModel() {
    if (weeks === 0 || b.some((val) => val <= 0)) {
      alert("Por favor, completa correctamente los valores de semanas y trabajadores requeridos.");
      return;
    }

    totalCost = 0;
    results = [];

    // Etapas desde la última hacia la primera
    for (let i = weeks - 1; i >= 0; i--) {
      const x_i = workers[i] || b[i]; // Si no se define trabajadores disponibles, toma el mínimo requerido
      const f_next = i === weeks - 1 ? 0 : results[0].cost; // Última etapa tiene costo 0
      const conserveCost = c1 * Math.max(0, x_i - b[i]); // C1(x_i - b_i)
      const hiringCost = i > 0 ? c2 * Math.max(0, x_i - workers[i - 1]) + fixedHiringCost : c2 * x_i + fixedHiringCost;

      const cost = conserveCost + hiringCost + f_next; // Aplicar la fórmula recursiva
      results.unshift({ stage: i + 1, x_i, cost });
      totalCost += cost;
    }
  }
</script>

<div class="container mx-auto p-4">
  <h2 class="text-2xl font-bold mb-4">Modelo de Tamaño de la Fuerza de Trabajo</h2>

  <!-- Parámetros generales -->
  <div class="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
    <h3 class="text-xl font-semibold mb-4">Parámetros Generales</h3>
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label for="weeks" class="block text-gray-700">Número de semanas:</label>
        <input
          type="number"
          id="weeks"
          min="1"
          bind:value={weeks}
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          on:change={initializeArrays}
        />
      </div>
      <div>
        <label for="c1" class="block text-gray-700">Costo por trabajador excedente (C1):</label>
        <input
          type="number"
          id="c1"
          bind:value={c1}
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div>
        <label for="c2" class="block text-gray-700">Costo por contratar nuevos trabajadores (C2):</label>
        <input
          type="number"
          id="c2"
          bind:value={c2}
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div>
        <label for="fixedHiringCost" class="block text-gray-700">Costo fijo por contratación:</label>
        <input
          type="number"
          id="fixedHiringCost"
          bind:value={fixedHiringCost}
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
    </div>
  </div>

  <!-- Parámetros semanales -->
  <div class="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
    <h3 class="text-xl font-semibold mb-4">Parámetros Semanales</h3>
    <div class="overflow-x-auto">
      <table class="w-full table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2 bg-gray-200">Semana</th>
            <th class="px-4 py-2 bg-gray-200">Trabajadores Disponibles (xi)</th>
            <th class="px-4 py-2 bg-gray-200">Trabajadores Requeridos (bi)</th>
          </tr>
        </thead>
        <tbody>
          {#each Array(weeks).fill(0) as _, i}
            <tr>
              <td class="border px-4 py-2">{i + 1}</td>
              <td class="border px-4 py-2">
                <input
                  type="number"
                  bind:value={workers[i]}
                  placeholder="(mínimo: {b[i]})"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </td>
              <td class="border px-4 py-2">
                <input
                  type="number"
                  bind:value={b[i]}
                  placeholder="0"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <button
      on:click={calculateWorkforceModel}
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
    >
      Calcular
    </button>
  </div>

  <!-- Resultados -->
  {#if results.length > 0}
    <div class="bg-gray-100 p-6 rounded-lg shadow-md">
      <h3 class="text-xl font-semibold mb-4">Resultados</h3>
      <table class="w-full table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2 bg-gray-200">Etapa</th>
            <th class="px-4 py-2 bg-gray-200">Trabajadores Disponibles (xi)</th>
            <th class="px-4 py-2 bg-gray-200">Costo Total</th>
          </tr>
        </thead>
        <tbody>
          {#each results as { stage, x_i, cost }}
            <tr>
              <td class="border px-4 py-2">{stage}</td>
              <td class="border px-4 py-2">{x_i}</td>
              <td class="border px-4 py-2">${cost.toFixed(2)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
      <h4 class="text-lg font-semibold mt-4">Costo Total: ${totalCost.toFixed(2)}</h4>
    </div>
  {/if}
</div>
