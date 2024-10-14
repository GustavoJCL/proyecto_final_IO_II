import { writable } from "svelte/store";

export enum Algorithms {
	Home,
  Algorithm1,
  Algorithm2,
  Eoq,
  Epq,
}

export let selectedAlgorithm = writable<Algorithms>(Algorithms.Home);
