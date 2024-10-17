import { writable } from "svelte/store";

export enum Algorithms {
	Home,
  CPM,
  PERT,
  Eoq,
  Epq,
}

export let selectedAlgorithm = writable<Algorithms>(Algorithms.Home);
