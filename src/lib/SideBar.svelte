<script lang="ts">
  import {
    IconEaseInOutControlPoints,
    IconMatchstick,
    IconMathXy,
    IconX,
    IconMathMaxMin,
    IconHome,
  } from "@tabler/icons-svelte";
  import { createEventDispatcher } from "svelte";
  import { Algorithms, selectedAlgorithm } from "../stores";
  import Home from "./Home.svelte";

  const dispatch = createEventDispatcher();
  let sidebarOpen = true;
  const toggleSidebar = () => {
    sidebarOpen = !sidebarOpen;
  };
  $: dispatch("toggleChange", sidebarOpen);
  $: console.log(sidebarOpen);
</script>

<div
  class={`bg-bgBase
         text-accent
         fixed h-screen z-20 
         transition-all duration-300 ease-in-out 
         ${sidebarOpen ? "w-64" : "w-20"}`}
>
  <div class="p-4 flex items-center justify-between">
    <div
      class="flex items-center h-28 transition-all duration-300 ease-in-out overflow-hidden"
      class:w-0={!sidebarOpen}
    >
      <span class="text-xl font-bold">
        {sidebarOpen ? "Proyecto Final Investigacion Operativa II" : ""}
      </span>
    </div>
    <button class="p-2 rounded-md" on:click={toggleSidebar}>
      <IconX />
    </button>
  </div>
  <nav class="p-4">
    <button
      class={`flex items-center justify-between w-full text-left p-2 rounded-md
                 hover:bg-gray-200 dark:hover:bg-gray-700
                 transition-all duration-300 ease-in-out`}
      on:click={() => {
        $selectedAlgorithm = Algorithms.Home;
      }}
    >
      <IconHome />
      {#if sidebarOpen}
        <div class="ml-2">Home</div>
      {/if}
    </button><button
      class={`flex items-center justify-between w-full text-left p-2 rounded-md
                 hover:bg-gray-200 dark:hover:bg-gray-700
                 transition-all duration-300 ease-in-out`}
      on:click={() => {
        $selectedAlgorithm = Algorithms.CPM;
      }}
    >
      <IconMathXy />
      {#if sidebarOpen}
        <div class="ml-2">METODO  CPM</div>
      {/if}
    </button>
    <button
      class={`flex items-center justify-between w-full text-left p-2 rounded-md 
                 hover:bg-gray-200 dark:hover:bg-gray-700
                 transition-all duration-300 ease-in-out`}
      on:click={() => {
        $selectedAlgorithm = Algorithms.PERT;
      }}
    >
      <IconMathXy />
      {#if sidebarOpen}
        <div class="ml-2"> METODO PERT</div>
      {/if}
    </button>
    <button
      class={`flex items-center justify-between w-full text-left p-2 rounded-md 
                 hover:bg-gray-200 dark:hover:bg-gray-700
                 transition-all duration-300 ease-in-out`}
      on:click={() => {
        $selectedAlgorithm = Algorithms.Eoq;
      }}
    >
      <IconMathMaxMin />
      {#if sidebarOpen}
        <div class="ml-2">EOQ</div>
      {/if}
    </button>
    <button
      class={`flex items-center justify-between w-full text-left p-2 rounded-md 
                 hover:bg-gray-200 dark:hover:bg-gray-700
                 transition-all duration-300 ease-in-out`}
      on:click={() => {
        $selectedAlgorithm = Algorithms.Epq;
      }}
    >
      <IconEaseInOutControlPoints />
      {#if sidebarOpen}
        <div class="ml-2">EPQ</div>
      {/if}
    </button>
    <button
      class={`flex items-center justify-between w-full text-left p-2 rounded-md 
                 hover:bg-gray-200 dark:hover:bg-gray-700
                 transition-all duration-300 ease-in-out`}
      on:click={() => {
        $selectedAlgorithm = Algorithms.MremplazoE;
      }}
    >
      <IconEaseInOutControlPoints />
      {#if sidebarOpen}
        <div class="ml-2">EremplazoE</div>
      {/if}
    </button>
    <button
      class={`flex items-center justify-between w-full text-left p-2 rounded-md 
                 hover:bg-gray-200 dark:hover:bg-gray-700
                 transition-all duration-300 ease-in-out`}
      on:click={() => {
        $selectedAlgorithm = Algorithms.TfuerzaT;
      }}
    >
      <IconEaseInOutControlPoints />
      {#if sidebarOpen}
        <div class="ml-2">tfuerzaT</div>
      {/if}
    </button>
  </nav>
</div>
