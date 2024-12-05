<script lang="ts">
  import { selectedTheme, selectedVariant } from "./theme/themes";

  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";
  import SideBar from "./lib/SideBar.svelte";
  import Home from "./lib/Home.svelte";
  import Eoq from "./lib/Eoq.svelte";
  import Epq from "./lib/Epq.svelte";
  import CPM from "./lib/CPM.svelte";
  import PERT from "./lib/PERT.svelte";
  import MremplazoE from "./lib/MremplazoE.svelte";
  import tfuerzaT from "./lib/TfuerzaT.svelte";
  import { Algorithms, selectedAlgorithm } from "./stores";
  import TfuerzaT from "./lib/TfuerzaT.svelte";
  let toggleSidebar: boolean = true;
  $: console.log(toggleSidebar);
</script>

<div class="flex flex-row {$selectedTheme}-{$selectedVariant}">
  <SideBar
    on:toggleChange={(event) => {
      toggleSidebar = event.detail;
    }}
  />
  <div class={`${toggleSidebar ? "ml-64" : "ml-20"}`}>
    {#if $selectedAlgorithm == Algorithms.Home}
      <Home />
    {:else if $selectedAlgorithm == Algorithms.CPM}
      <CPM />
    {:else if $selectedAlgorithm == Algorithms.PERT}
      <PERT />
    {:else if $selectedAlgorithm == Algorithms.Eoq}
      <Eoq />
    {:else if $selectedAlgorithm == Algorithms.Epq}
      <Epq />
    {:else if $selectedAlgorithm == Algorithms.MremplazoE}
      <MremplazoE />
    {:else if $selectedAlgorithm == Algorithms.TfuerzaT}
      <TfuerzaT />
    
    {/if}

  </div>
</div>