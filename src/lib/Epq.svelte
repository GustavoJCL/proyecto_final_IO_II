<script lang="ts">
	let demandRate = 0;
	let setupCost = 0;
	let holdingCostPercentage = 0; // Percentage
	let dailyProductionRate = 0;
	let daysPerYear = 0;
	let unitCost = 0;

	let optimalProductionQuantity = 0;
	let maximumInventoryLevel = 0;
	let averageInventory = 0;
	let productionRunsPerYear = 0;
	let annualSetupCost = 0;
	let annualHoldingCost = 0;
	let totalInventoryCost = 0;
	let totalCostIncludingUnits = 0;
	let dailyDemandRate = 0;

	function solvePOQ() {
		if (
			demandRate > 0 &&
			setupCost > 0 &&
			holdingCostPercentage > 0 &&
			dailyProductionRate > 0 &&
			daysPerYear > 0 &&
			unitCost >= 0
		) {
			const holdingCost = (holdingCostPercentage / 100) * unitCost;
			optimalProductionQuantity = Math.sqrt(
				(2 * demandRate * setupCost) /
					(holdingCost *
						(1 - demandRate / (dailyProductionRate * daysPerYear))),
			);
			maximumInventoryLevel =
				optimalProductionQuantity *
				(1 - demandRate / (dailyProductionRate * daysPerYear));
			averageInventory = maximumInventoryLevel / 2;
			productionRunsPerYear = demandRate / optimalProductionQuantity;
			annualSetupCost = productionRunsPerYear * setupCost;
			annualHoldingCost = averageInventory * holdingCost;
			totalInventoryCost = annualSetupCost + annualHoldingCost;
			totalCostIncludingUnits = totalInventoryCost + demandRate * unitCost;
			dailyDemandRate = demandRate / daysPerYear;
		} else {
			// Reset values if inputs are invalid
			optimalProductionQuantity = 0;
			maximumInventoryLevel = 0;
			averageInventory = 0;
			productionRunsPerYear = 0;
			annualSetupCost = 0;
			annualHoldingCost = 0;
			totalInventoryCost = 0;
			totalCostIncludingUnits = 0;
			dailyDemandRate = 0;
		}
	}
</script>

<div class="container mx-auto p-4">
	<h2 class="text-2xl font-bold mb-4">POQ Calculator</h2>

	<div class="input-section bg-gray-100 p-6 rounded-lg shadow-md mb-6">
		<h3 class="text-xl font-semibold mb-4">Input Parameters</h3>
		<div class="overflow-x-auto">
			<table class="w-full table-auto">
				<thead>
					<tr>
						<th class="px-4 py-2 text-left bg-gray-200">Parameter</th>
						<th class="px-4 py-2 text-left bg-gray-200">Value</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border px-4 py-2">Demand rate (D)</td>
						<td class="border px-4 py-2">
							<input
								type="number"
								bind:value={demandRate}
								class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
							/>
						</td>
					</tr>
					<tr>
						<td class="border px-4 py-2">Setup/ordering cost (S)</td>
						<td class="border px-4 py-2">
							<input
								type="number"
								bind:value={setupCost}
								class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
							/>
						</td>
					</tr>
					<tr>
						<td class="border px-4 py-2">Holding/carrying cost (H) (%)</td>
						<td class="border px-4 py-2">
							<input
								type="number"
								bind:value={holdingCostPercentage}
								class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
							/>
						</td>
					</tr>
					<tr>
						<td class="border px-4 py-2">Daily production rate (p)</td>
						<td class="border px-4 py-2">
							<input
								type="number"
								bind:value={dailyProductionRate}
								class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
							/>
						</td>
					</tr>
					<tr>
						<td class="border px-4 py-2">Enter Days per year or</td>
						<td class="border px-4 py-2">
							<input
								type="number"
								bind:value={daysPerYear}
								class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
							/>
						</td>
					</tr>
					<tr>
						<td class="border px-4 py-2">Enter Daily demand rate (d)</td>
						<td class="border px-4 py-2">
							<input
								type="number"
								disabled
								value={dailyDemandRate.toFixed(2)}
								class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-200"
							/>
						</td>
					</tr>
					<tr>
						<td class="border px-4 py-2">Unit cost</td>
						<td class="border px-4 py-2">
							<input
								type="number"
								bind:value={unitCost}
								class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<button
			on:click={solvePOQ}
			class="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
		>
			Solve
		</button>
	</div>

	{#if optimalProductionQuantity > 0}
		<div class="results-section bg-gray-100 p-6 rounded-lg shadow-md">
			<h3 class="text-xl font-semibold mb-4">Results</h3>
			<div class="overflow-x-auto">
				<table class="w-full table-auto">
					<thead>
						<tr>
							<th class="px-4 py-2 text-left bg-gray-200">Parameter</th>
							<th class="px-4 py-2 text-left bg-gray-200">Value</th>
							<th class="px-4 py-2 text-left bg-gray-200">Parameter</th>
							<th class="px-4 py-2 text-left bg-gray-200">Value</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="border px-4 py-2">Demand rate (D)</td>
							<td class="border px-4 py-2">{demandRate}</td>
							<td class="border px-4 py-2">Optimal production quantity (Q*)</td>
							<td class="border px-4 py-2"
								>{optimalProductionQuantity.toFixed(2)}</td
							>
						</tr>
						<tr>
							<td class="border px-4 py-2">Setup/ordering cost (S)</td>
							<td class="border px-4 py-2">{setupCost}</td>
							<td class="border px-4 py-2">Maximum Inventory Level (Imax)</td>
							<td class="border px-4 py-2"
								>{maximumInventoryLevel.toFixed(2)}</td
							>
						</tr>
						<tr>
							<td class="border px-4 py-2">Holding/carrying cost (H)</td>
							<td class="border px-4 py-2"
								>{(holdingCostPercentage / 100) * unitCost}</td
							>
							<td class="border px-4 py-2">Average inventory</td>
							<td class="border px-4 py-2">{averageInventory.toFixed(2)}</td>
						</tr>
						<tr>
							<td class="border px-4 py-2">Daily production rate (p)</td>
							<td class="border px-4 py-2">{dailyProductionRate}</td>
							<td class="border px-4 py-2">Production runs per period (N)</td>
							<td class="border px-4 py-2"
								>{productionRunsPerYear.toFixed(2)}</td
							>
						</tr>
						<tr>
							<td class="border px-4 py-2">Days per year (D)</td>
							<td class="border px-4 py-2">{daysPerYear}</td>
							<td class="border px-4 py-2">Annual Setup cost</td>
							<td class="border px-4 py-2">{annualSetupCost.toFixed(2)}</td>
						</tr>
						<tr>
							<td class="border px-4 py-2">Daily demand rate</td>
							<td class="border px-4 py-2">{dailyDemandRate.toFixed(2)}</td>
							<td class="border px-4 py-2">Annual Holding cost</td>
							<td class="border px-4 py-2">{annualHoldingCost.toFixed(2)}</td>
						</tr>
						<tr>
							<td class="border px-4 py-2">Unit cost</td>
							<td class="border px-4 py-2">{unitCost}</td>
							<td class="border px-4 py-2"
								>Total Inventory (Holding + Setup) Cost</td
							>
							<td class="border px-4 py-2">{totalInventoryCost.toFixed(2)}</td>
						</tr>
						<tr>
							<td class="border px-4 py-2"> </td>
							<td class="border px-4 py-2"> </td>
							<td class="border px-4 py-2">Unit costs (PD)</td>
							<td class="border px-4 py-2">{demandRate * unitCost}</td>
						</tr>
						<tr>
							<td class="border px-4 py-2"> </td>
							<td class="border px-4 py-2"> </td>
							<td class="border px-4 py-2">Total Cost (including units)</td>
							<td class="border px-4 py-2"
								>{totalCostIncludingUnits.toFixed(2)}</td
							>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>
