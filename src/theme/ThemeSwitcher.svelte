<script lang="ts">
	import {
		CatppuccinVariant,
		GruvboxVariant,
		selectedTheme,
		selectedVariant,
		Theme,
		TokyoNightVariant,
	} from "./themes";
	// Subscribe to stores to log changes
	selectedTheme.subscribe((theme) => {
		console.log("Selected Theme:", theme);
	});

	selectedVariant.subscribe((variant) => {
		console.log("Selected Variant:", variant);
	});
</script>

<div>
	<label for="theme">Theme:</label>
	<select id="theme" bind:value={$selectedTheme}>
		{#each Object.values(Theme) as themes_values}
			<option value={themes_values}>{themes_values}</option>
		{/each}
	</select>
</div>

<div>
	<label for="mode">Mode:</label>
	{#if $selectedTheme == Theme.Catppuccin}
		<select id="mode" bind:value={$selectedVariant}>
			{#each Object.values(CatppuccinVariant) as variant}
				<option value={variant}>{variant}</option>
			{/each}
		</select>
	{:else if $selectedTheme == Theme.Gruvbox}
		<select id="mode" bind:value={$selectedVariant}>
			{#each Object.values(GruvboxVariant) as variant}
				<option value={variant}>{variant}</option>
			{/each}
		</select>
	{:else if $selectedTheme == Theme.TokyoNight}
		<select id="mode" bind:value={$selectedVariant}>
			{#each Object.values(TokyoNightVariant) as variant}
				<option value={variant}>{variant}</option>
			{/each}
		</select>
	{/if}
</div>
