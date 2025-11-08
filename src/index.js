import PanelComponent from './panel.vue';

export default {
	id: 'collection-metrics',
	name: 'Collection Metrics',
	icon: 'bar_chart',
	description: 'Display collection metrics and statistics',
	component: PanelComponent,
	options: [
		{
			field: 'collection',
			type: 'string',
			name: 'Collection',
			meta: {
				interface: 'system-collection',
				options: {
					includeSystem: false,
				},
				width: 'full',
			},
		},
		{
			field: 'metrics',
			type: 'json',
			name: 'Metrics',
			meta: {
				interface: 'list',
				options: {
					template: '{{label}} - {{function}}({{field}})',
					fields: [
						{
							field: 'label',
							type: 'string',
							name: 'Label',
							meta: {
								interface: 'input',
								width: 'half',
							},
						},
						{
							field: 'function',
							type: 'string',
							name: 'Aggregate Function',
							meta: {
								interface: 'select-dropdown',
								width: 'half',
								options: {
									choices: [
										{ text: 'Count', value: 'count' },
										{ text: 'Count Distinct', value: 'countDistinct' },
										{ text: 'Sum', value: 'sum' },
										{ text: 'Average', value: 'avg' },
										{ text: 'Min', value: 'min' },
										{ text: 'Max', value: 'max' },
									],
								},
							},
						},
						{
							field: 'field',
							type: 'string',
							name: 'Field',
							meta: {
								interface: 'system-field',
								width: 'half',
								options: {
									collectionField: 'collection',
									allowPrimaryKey: true,
									allowNone: true,
								},
							},
						},
						{
							field: 'filter',
							type: 'json',
							name: 'Filter',
							meta: {
								interface: 'system-filter',
								width: 'full',
								options: {
									collectionField: 'collection',
								},
							},
						},
					],
				},
				width: 'full',
			},
		},
		{
			field: 'refreshInterval',
			type: 'integer',
			name: 'Refresh Interval (seconds)',
			meta: {
				interface: 'input',
				options: {
					placeholder: '60',
				},
				width: 'half',
			},
			schema: {
				default_value: 60,
			},
		},
		{
			field: 'displayStyle',
			type: 'string',
			name: 'Display Style',
			meta: {
				interface: 'select-dropdown',
				width: 'half',
				options: {
					choices: [
						{ text: 'Cards', value: 'cards' },
						{ text: 'Table', value: 'table' },
						{ text: 'List', value: 'list' },
					],
				},
			},
			schema: {
				default_value: 'cards',
			},
		},
	],
	minWidth: 12,
	minHeight: 6,
};
