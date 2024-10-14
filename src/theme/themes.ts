import { writable } from "svelte/store";

// const themes = ["latte", "frappe", "macchiato", "mocha"];
export enum CatppuccinVariant {
  Latte = "latte",
  Frappe = "frappe",
  Macchiato = "macchiato",
  Mocha = "mocha",
}

export enum GruvboxVariant {
  Light = "light",
  Dark = "dark",
}

export enum TokyoNightVariant {
  Light = "light",
  Dark = "dark",
}

// Enum for main themes
export enum Theme {
  Catppuccin = "catppuccin",
  Gruvbox = "gruvbox",
  TokyoNight = "tokyonight",
}

export let selectedTheme = writable<Theme>(Theme.Gruvbox);
export let selectedVariant = writable<
  GruvboxVariant | CatppuccinVariant | TokyoNightVariant
>(GruvboxVariant.Dark);
