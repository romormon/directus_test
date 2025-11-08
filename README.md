# Collection Metrics Panel Extension for Directus 11.13

A custom panel extension for Directus that displays collection metrics and statistics. This extension is compatible with Editable Layouts and can be used alongside them without conflicts.

## Features

- 📊 **Multiple Aggregate Functions**: Count, Count Distinct, Sum, Average, Min, Max
- 🎨 **Three Display Styles**: Cards, Table, and List views
- 🔄 **Auto-Refresh**: Configurable refresh interval
- 🎯 **Flexible Filtering**: Apply filters to each metric
- 🎭 **Multiple Metrics**: Display multiple metrics from the same collection
- 💅 **Modern UI**: Uses Directus design system with theme variables

## Installation

### Method 1: Local Development

1. **Navigate to your Directus extensions directory:**
   ```bash
   cd /path/to/your/directus/extensions
   ```

2. **Clone or copy this extension:**
   ```bash
   cp -r /path/to/this/extension ./directus-extension-panel-collection-metrics
   cd directus-extension-panel-collection-metrics
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Build the extension:**
   ```bash
   npm run build
   ```

5. **Restart Directus:**
   ```bash
   # Navigate back to your Directus root
   cd ../..
   npm run start
   # or
   npx directus start
   ```

### Method 2: Using npm link (for development)

1. **In this extension directory:**
   ```bash
   npm install
   npm run link
   ```

2. **Follow the prompts to link to your Directus instance**

3. **Build in watch mode:**
   ```bash
   npm run dev
   ```

## Usage

### Adding the Panel

1. **Navigate to Insights** in your Directus admin panel
2. **Click "Create Dashboard"** or open an existing dashboard
3. **Click the "+" button** to add a new panel
4. **Select "Collection Metrics"** from the panel types
5. **Configure your metrics** (see Configuration below)

### Configuration Options

#### Collection
Select the collection you want to display metrics for.

#### Metrics
Add one or more metrics. Each metric has:

- **Label**: Display name for the metric (e.g., "Total Sales", "Active Users")
- **Aggregate Function**: 
  - `count` - Count all items
  - `countDistinct` - Count unique values
  - `sum` - Sum of values
  - `avg` - Average of values
  - `min` - Minimum value
  - `max` - Maximum value
- **Field**: The field to aggregate (or leave empty for count functions)
- **Filter**: Optional filter to apply to this specific metric

#### Display Style
Choose how to display your metrics:
- **Cards**: Grid of cards with large values (default)
- **Table**: Traditional table layout
- **List**: Vertical list with labels and values

#### Refresh Interval
Set how often (in seconds) the metrics should refresh automatically. Default is 60 seconds.

## Example Configurations

### Example 1: E-commerce Dashboard

```
Collection: orders
Metrics:
  1. Label: "Total Orders"
     Function: count
     Field: (leave empty)
     
  2. Label: "Total Revenue"
     Function: sum
     Field: total_amount
     
  3. Label: "Average Order Value"
     Function: avg
     Field: total_amount
     
  4. Label: "Pending Orders"
     Function: count
     Filter: { "status": { "_eq": "pending" } }
```

### Example 2: User Analytics

```
Collection: users
Metrics:
  1. Label: "Total Users"
     Function: count
     
  2. Label: "Active Users (Last 30 Days)"
     Function: count
     Filter: { "last_login": { "_gte": "$NOW(-30 days)" } }
     
  3. Label: "New Users (This Month)"
     Function: count
     Filter: { "date_created": { "_gte": "$NOW(-1 month)" } }
```

### Example 3: Content Management

```
Collection: articles
Metrics:
  1. Label: "Total Articles"
     Function: count
     
  2. Label: "Published Articles"
     Function: count
     Filter: { "status": { "_eq": "published" } }
     
  3. Label: "Draft Articles"
     Function: count
     Filter: { "status": { "_eq": "draft" } }
     
  4. Label: "Total Views"
     Function: sum
     Field: view_count
```

## Displaying Metrics Below Collection Table

Since you're using Editable Layouts and want metrics under your collection table, here are recommended approaches:

### Option 1: Use Insights Dashboard (Recommended)
1. Create a dedicated dashboard for your collection
2. Add a "Collection Metrics" panel at the top
3. Bookmark this dashboard for quick access
4. Use it alongside your collection view

### Option 2: Custom Module Extension
If you need metrics directly integrated with the collection view, you would need to create a custom Module extension that:
1. Embeds the collection layout component
2. Adds the metrics panel component below it
3. Registers as a separate menu item

### Option 3: Bookmark Strategy
1. Create an Insights dashboard with your metrics
2. Open it in a browser tab
3. Keep your collection view in another tab
4. Use browser tab management to view both simultaneously

## Development

### Project Structure
```
.
├── package.json
├── src/
│   ├── index.js      # Extension entry point and options
│   └── panel.vue     # Main panel component
└── README.md
```

### Available Scripts

- `npm run build` - Build the extension for production
- `npm run dev` - Build in watch mode with no minification
- `npm run link` - Link extension to Directus instance

### Customization

You can customize the panel by modifying:

1. **`src/panel.vue`** - Main component logic and styling
2. **`src/index.js`** - Panel configuration and options

## API Reference

The extension uses the Directus REST API aggregate endpoints:

```javascript
GET /items/{collection}?aggregate[{function}]={field}
```

For more information, see the [Directus Aggregation Documentation](https://docs.directus.io/reference/query.html#aggregation-group).

## Troubleshooting

### Extension Not Appearing
- Ensure the extension is built: `npm run build`
- Check Directus logs for errors
- Verify the extension is in the correct directory
- Restart Directus after installation

### Metrics Not Loading
- Check browser console for API errors
- Verify collection and field names are correct
- Ensure your user has read permissions for the collection
- Check that aggregate functions are supported for the field types

### Display Issues
- Clear browser cache
- Verify Directus theme variables are loading
- Check for console errors

## Compatibility

- **Directus Version**: 11.0.0 and above (tested on 11.13)
- **Vue Version**: 3.x
- **Browser Support**: All modern browsers

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Support

For issues specific to this extension, please open an issue in the repository.
For Directus-related questions, visit the [Directus Community](https://github.com/directus/directus/discussions).
