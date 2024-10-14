<script lang="ts">
	let demandRate = 0;
	let setupCost = 0;
	let holdingCost = 0;
	let unitCost = 0;
	let daysPerYear = 0;
	let leadTime = 0;
	let computeReorderPoint = true; // Default to Compute reorder point

	let optimalOrderQuantity = 0;
	let maximumInventoryLevel = 0;
	let averageInventory = 0;
	let ordersPerPeriod = 0;
	let annualSetupCost = 0;
	let annualHoldingCost = 0;
	let totalInventoryCost = 0;
	let totalCostIncludingUnits = 0;
	let reorderPoint = 0;
	let dailyDemandRate = 0;

	function solveEOQ() {
		if (
			demandRate > 0 &&
			setupCost > 0 &&
			holdingCost > 0 &&
			unitCost >= 0 &&
			daysPerYear > 0 &&
			(computeReorderPoint ? leadTime >= 0 : true) // Only check leadTime if computing reorder point
		) {
			optimalOrderQuantity = Math.sqrt(
				(2 * demandRate * setupCost) / holdingCost,
			);
			maximumInventoryLevel = optimalOrderQuantity;
			averageInventory = optimalOrderQuantity / 2;
			ordersPerPeriod = demandRate / optimalOrderQuantity;
			annualSetupCost = ordersPerPeriod * setupCost;
			annualHoldingCost = averageInventory * holdingCost;
			totalInventoryCost = annualSetupCost + annualHoldingCost;
			totalCostIncludingUnits = totalInventoryCost + demandRate * unitCost;
			dailyDemandRate = demandRate / daysPerYear;
			reorderPoint = computeReorderPoint ? dailyDemandRate * leadTime : 0; // Calculate reorder point only if selected
		} else {
			// Reset values if inputs are invalid
			optimalOrderQuantity = 0;
			maximumInventoryLevel = 0;
			averageInventory = 0;
			ordersPerPeriod = 0;
			annualSetupCost = 0;
			annualHoldingCost = 0;
			totalInventoryCost = 0;
			totalCostIncludingUnits = 0;
			dailyDemandRate = 0;
			reorderPoint = 0;
		}
	}

	// Function to generate data for the reorder point graph
	function generateGraphData(): { x: number; y: number }[] {
		const data = [];
		if (optimalOrderQuantity > 0 && computeReorderPoint) {
			const numPoints = 20; // Number of data points for the graph
			const maxX = reorderPoint * 2; // Maximum x-value for the graph

			for (let i = 0; i <= numPoints; i++) {
				const x = (i / numPoints) * maxX;
				const y = x <= reorderPoint ? 0 : x - reorderPoint; // Inventory level based on reorder point
				data.push({ x, y });
			}
		}
		return data;
	}

	$: console.log(computeReorderPoint);
	$: console.log(graphData);

	$: graphData = generateGraphData();
</script>

<div class="container mx-auto p-4">
	<h2 class="text-2xl font-bold mb-4">EOQ Calculator</h2>

	<div class="input-section bg-gray-100 p-6 rounded-lg shadow-md mb-6">
		<h3 class="text-xl font-semibold mb-4">Input Parameters</h3>

		<div class="grid grid-cols-2 gap-4 mb-4">
			<div>
				<label class="block text-gray-700">Reorder point:</label>
				<div class="mt-2">
					<label class="inline-flex items-center">
						<input
							type="radio"
							bind:group={computeReorderPoint}
							value={false}
							class="form-radio"
						/>
						<span class="ml-2">No reorder point</span>
					</label>
					<label class="inline-flex items-center ml-6">
						<input
							type="radio"
							bind:group={computeReorderPoint}
							value={true}
							class="form-radio"
						/>
						<span class="ml-2">Compute reorder point</span>
					</label>
				</div>
			</div>
			<div>
				<label for="orderQuantity" class="block text-gray-700"
					>Order Quantity (0=EOQ):</label
				>
				<input
					type="number"
					id="orderQuantity"
					disabled
					value={0}
					class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
				/>
			</div>
		</div>

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
						<td class="border px-4 py-2">Holding/carrying cost (H)</td>
						<td class="border px-4 py-2">
							<input
								type="number"
								bind:value={holdingCost}
								class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
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
					{#if computeReorderPoint}
						<tr>
							<td class="border px-4 py-2">Lead time (in days)</td>
							<td class="border px-4 py-2">
								<input
									type="number"
									bind:value={leadTime}
									class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
								/>
							</td>
						</tr>
						<tr>
							<td class="border px-4 py-2">Days per year or ...</td>
							<td class="border px-4 py-2">
								<input
									type="number"
									bind:value={daysPerYear}
									class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
								/>
							</td>
						</tr>
						<tr>
							<td class="border px-4 py-2">... Daily demand rate (d)</td>
							<td class="border px-4 py-2">
								<input
									type="number"
									disabled
									value={dailyDemandRate.toFixed(2)}
									class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-200"
								/>
							</td>
						</tr>
					{/if}
				</tbody>
			</table>
		</div>

		<button
			on:click={solveEOQ}
			class="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
		>
			Solve
		</button>
	</div>

	{#if optimalOrderQuantity > 0}
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
							<td class="border px-4 py-2">Optimal order quantity (Q*)</td>
							<td class="border px-4 py-2">{optimalOrderQuantity.toFixed(2)}</td
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
							<td class="border px-4 py-2">{holdingCost}</td>
							<td class="border px-4 py-2">Average inventory</td>
							<td class="border px-4 py-2">{averageInventory.toFixed(2)}</td>
						</tr>
						<tr>
							<td class="border px-4 py-2">Unit cost</td>
							<td class="border px-4 py-2">{unitCost}</td>
							<td class="border px-4 py-2">Orders per period (N)</td>
							<td class="border px-4 py-2">{ordersPerPeriod.toFixed(2)}</td>
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
						{#if computeReorderPoint}
							<tr>
								<td class="border px-4 py-2">Lead time (in days)</td>
								<td class="border px-4 py-2">{leadTime}</td>
								<td class="border px-4 py-2"
									>Total Inventory (Holding + Setup) Cost</td
								>
								<td class="border px-4 py-2">{totalInventoryCost.toFixed(2)}</td
								>
							</tr>
							<tr>
								<td class="border px-4 py-2">Safety stock</td>
								<td class="border px-4 py-2">0</td>
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
							<tr>
								<td class="border px-4 py-2"> </td>
								<td class="border px-4 py-2"> </td>
								<td class="border px-4 py-2">Reorder point</td>
								<td class="border px-4 py-2">{reorderPoint.toFixed(2)} units</td
								>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>
