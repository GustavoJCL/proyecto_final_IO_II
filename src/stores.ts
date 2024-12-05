import { writable } from "svelte/store";

export enum Algorithms {
	Home,
  CPM,
  PERT,
  Eoq,
  Epq,
  MremplazoE,
  TfuerzaT,
}

export let selectedAlgorithm = writable<Algorithms>(Algorithms.Home);
