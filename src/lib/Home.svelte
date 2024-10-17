<script lang="ts">
    const integrantes = [
      "Jhon William Mamani Condori",
      "Gustavo Joaquin Calizaya Leon",
    ];
  </script>
  
  <div class="flex items-center justify-center min-h-screen" style="margin-left: 16rem;">
    <div class="text-center">
        <h1 class="text-3xl font-bold mb-6">PROYECTO FINAL DE INVESTIGACIÓN OPERATIVA II</h1>
      <h2 class="text-3xl font-bold mb-4">Integrantes del Proyecto</h2>
      <ul class="list-none">
        {#each integrantes as integrante}
          <li class="text-xl mb-2">{integrante}</li>
        {/each}
      </ul>
    </div>
  </div>
  
  