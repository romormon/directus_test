<template>
	<div class="collection-metrics-panel" :class="`display-${displayStyle}`">
		<div v-if="loading && !metricsData.length" class="loading">
			<v-progress-circular indeterminate />
		</div>
		
		<div v-else-if="error" class="error">
			<v-notice type="danger">
				{{ error }}
			</v-notice>
		</div>
		
		<div v-else-if="metricsData.length === 0" class="empty">
			<v-notice type="info">
				No metrics configured. Please configure metrics in the panel settings.
			</v-notice>
		</div>
		
		<div v-else>
			<!-- Cards Display -->
			<div v-if="displayStyle === 'cards'" class="metrics-cards">
				<div v-for="(metric, index) in metricsData" :key="index" class="metric-card">
					<div class="metric-label">{{ metric.label }}</div>
					<div class="metric-value">{{ formatValue(metric.value) }}</div>
					<div class="metric-meta">
						{{ metric.function }}
						<span v-if="metric.field">({{ metric.field }})</span>
					</div>
				</div>
			</div>
			
			<!-- Table Display -->
			<div v-else-if="displayStyle === 'table'" class="metrics-table">
				<table>
					<thead>
						<tr>
							<th>Metric</th>
							<th>Value</th>
							<th>Function</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(metric, index) in metricsData" :key="index">
							<td>{{ metric.label }}</td>
							<td class="metric-value">{{ formatValue(metric.value) }}</td>
							<td>{{ metric.function }}<span v-if="metric.field">({{ metric.field }})</span></td>
						</tr>
					</tbody>
				</table>
			</div>
			
			<!-- List Display -->
			<div v-else-if="displayStyle === 'list'" class="metrics-list">
				<div v-for="(metric, index) in metricsData" :key="index" class="metric-item">
					<span class="metric-label">{{ metric.label }}:</span>
					<span class="metric-value">{{ formatValue(metric.value) }}</span>
				</div>
			</div>
		</div>
		
		<div v-if="lastUpdated" class="last-updated">
			Last updated: {{ formatTime(lastUpdated) }}
		</div>
	</div>
</template>

<script>
import { useApi } from '@directus/extensions-sdk';
import { ref, watch, onMounted, onUnmounted } from 'vue';

export default {
	props: {
		showHeader: {
			type: Boolean,
			default: false,
		},
		collection: {
			type: String,
			default: null,
		},
		metrics: {
			type: Array,
			default: () => [],
		},
		refreshInterval: {
			type: Number,
			default: 60,
		},
		displayStyle: {
			type: String,
			default: 'cards',
		},
	},
	setup(props) {
		const api = useApi();
		const loading = ref(false);
		const error = ref(null);
		const metricsData = ref([]);
		const lastUpdated = ref(null);
		let intervalId = null;

		const fetchMetrics = async () => {
			if (!props.collection || !props.metrics || props.metrics.length === 0) {
				metricsData.value = [];
				return;
			}

			loading.value = true;
			error.value = null;

			try {
				const results = await Promise.all(
					props.metrics.map(async (metric) => {
						try {
							// Build aggregate query
							const params = {
								aggregate: {
									[metric.function]: metric.field || '*',
								},
							};

							// Add filter if specified
							if (metric.filter) {
								params.filter = metric.filter;
							}

							const response = await api.get(`/items/${props.collection}`, { params });
							
							const aggregateKey = Object.keys(response.data.data[0])[0];
							const value = response.data.data[0][aggregateKey];

							return {
								label: metric.label || `${metric.function}(${metric.field || '*'})`,
								value: value,
								function: metric.function,
								field: metric.field,
							};
						} catch (err) {
							console.error(`Error fetching metric ${metric.label}:`, err);
							return {
								label: metric.label || `${metric.function}(${metric.field || '*'})`,
								value: 'Error',
								function: metric.function,
								field: metric.field,
							};
						}
					})
				);

				metricsData.value = results;
				lastUpdated.value = new Date();
			} catch (err) {
				console.error('Error fetching metrics:', err);
				error.value = err.message || 'Failed to fetch metrics';
			} finally {
				loading.value = false;
			}
		};

		const formatValue = (value) => {
			if (value === null || value === undefined) return '-';
			if (typeof value === 'number') {
				return value.toLocaleString();
			}
			return value;
		};

		const formatTime = (date) => {
			if (!date) return '';
			return new Intl.DateTimeFormat('default', {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			}).format(date);
		};

		const startAutoRefresh = () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
			
			if (props.refreshInterval && props.refreshInterval > 0) {
				intervalId = setInterval(() => {
					fetchMetrics();
				}, props.refreshInterval * 1000);
			}
		};

		onMounted(() => {
			fetchMetrics();
			startAutoRefresh();
		});

		onUnmounted(() => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		});

		watch(
			() => [props.collection, props.metrics, props.refreshInterval],
			() => {
				fetchMetrics();
				startAutoRefresh();
			},
			{ deep: true }
		);

		return {
			loading,
			error,
			metricsData,
			lastUpdated,
			formatValue,
			formatTime,
		};
	},
};
</script>

<style scoped>
.collection-metrics-panel {
	padding: 20px;
	height: 100%;
	overflow: auto;
}

.loading,
.error,
.empty {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	min-height: 200px;
}

/* Cards Display */
.metrics-cards {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 16px;
}

.metric-card {
	background-color: var(--theme--background-subdued);
	border: 2px solid var(--theme--border-color-subdued);
	border-radius: var(--theme--border-radius);
	padding: 20px;
	text-align: center;
	transition: all 0.2s ease;
}

.metric-card:hover {
	border-color: var(--theme--primary);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.metric-label {
	font-size: 14px;
	color: var(--theme--foreground-subdued);
	margin-bottom: 8px;
	font-weight: 500;
}

.metric-value {
	font-size: 32px;
	font-weight: 700;
	color: var(--theme--primary);
	margin-bottom: 4px;
	line-height: 1.2;
}

.metric-meta {
	font-size: 12px;
	color: var(--theme--foreground-subdued);
	opacity: 0.8;
}

/* Table Display */
.metrics-table {
	width: 100%;
	overflow-x: auto;
}

.metrics-table table {
	width: 100%;
	border-collapse: collapse;
}

.metrics-table th,
.metrics-table td {
	padding: 12px;
	text-align: left;
	border-bottom: 1px solid var(--theme--border-color-subdued);
}

.metrics-table th {
	background-color: var(--theme--background-subdued);
	font-weight: 600;
	color: var(--theme--foreground);
}

.metrics-table tr:hover {
	background-color: var(--theme--background-subdued);
}

.metrics-table .metric-value {
	font-weight: 700;
	color: var(--theme--primary);
	font-size: 18px;
}

/* List Display */
.metrics-list {
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.metric-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px 16px;
	background-color: var(--theme--background-subdued);
	border-radius: var(--theme--border-radius);
	border-left: 3px solid var(--theme--primary);
}

.metric-item .metric-label {
	font-weight: 500;
	color: var(--theme--foreground);
}

.metric-item .metric-value {
	font-size: 20px;
	font-weight: 700;
	color: var(--theme--primary);
}

/* Last Updated */
.last-updated {
	margin-top: 20px;
	padding-top: 12px;
	border-top: 1px solid var(--theme--border-color-subdued);
	font-size: 12px;
	color: var(--theme--foreground-subdued);
	text-align: right;
}
</style>
