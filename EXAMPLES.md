# Collection Metrics Panel - Configuration Examples

This file contains ready-to-use configuration examples for common use cases.

## 📦 E-Commerce Store

### Sales Overview Dashboard
**Collection**: `orders`

| Metric | Label | Function | Field | Filter |
|--------|-------|----------|-------|--------|
| 1 | Total Orders | count | - | - |
| 2 | Total Revenue | sum | total_amount | - |
| 3 | Average Order Value | avg | total_amount | - |
| 4 | Pending Orders | count | - | `{ "status": { "_eq": "pending" } }` |
| 5 | Completed Today | count | - | `{ "status": { "_eq": "completed" }, "date_updated": { "_gte": "$NOW(-1 day)" } }` |

**Recommended Display Style**: Cards  
**Refresh Interval**: 30 seconds

---

### Product Inventory
**Collection**: `products`

| Metric | Label | Function | Field | Filter |
|--------|-------|----------|-------|--------|
| 1 | Total Products | count | - | - |
| 2 | In Stock | count | - | `{ "stock": { "_gt": 0 } }` |
| 3 | Out of Stock | count | - | `{ "stock": { "_eq": 0 } }` |
| 4 | Low Stock (< 10) | count | - | `{ "stock": { "_lt": 10, "_gt": 0 } }` |
| 5 | Total Inventory Value | sum | inventory_value | - |

**Recommended Display Style**: Cards  
**Refresh Interval**: 60 seconds

---

## 👥 User Management

### User Analytics
**Collection**: `directus_users`

| Metric | Label | Function | Field | Filter |
|--------|-------|----------|-------|--------|
| 1 | Total Users | count | - | - |
| 2 | Active (Last 7 Days) | count | - | `{ "last_access": { "_gte": "$NOW(-7 days)" } }` |
| 3 | Active (Last 30 Days) | count | - | `{ "last_access": { "_gte": "$NOW(-30 days)" } }` |
| 4 | New This Month | count | - | `{ "date_created": { "_gte": "$NOW(-1 month)" } }` |
| 5 | Admin Users | count | - | `{ "role": { "_eq": "admin" } }` |

**Recommended Display Style**: Table  
**Refresh Interval**: 300 seconds (5 minutes)

---

## 📝 Content Management

### Blog/Articles Dashboard
**Collection**: `articles`

| Metric | Label | Function | Field | Filter |
|--------|-------|----------|-------|--------|
| 1 | Total Articles | count | - | - |
| 2 | Published | count | - | `{ "status": { "_eq": "published" } }` |
| 3 | Draft | count | - | `{ "status": { "_eq": "draft" } }` |
| 4 | Scheduled | count | - | `{ "status": { "_eq": "scheduled" } }` |
| 5 | Total Views | sum | view_count | - |
| 6 | Avg Views per Article | avg | view_count | `{ "status": { "_eq": "published" } }` |

**Recommended Display Style**: Cards  
**Refresh Interval**: 120 seconds

---

### Media Library Stats
**Collection**: `directus_files`

| Metric | Label | Function | Field | Filter |
|--------|-------|----------|-------|--------|
| 1 | Total Files | count | - | - |
| 2 | Images | count | - | `{ "type": { "_starts_with": "image/" } }` |
| 3 | Videos | count | - | `{ "type": { "_starts_with": "video/" } }` |
| 4 | Documents | count | - | `{ "type": { "_contains": "pdf" } }` |
| 5 | Total Size (bytes) | sum | filesize | - |

**Recommended Display Style**: List  
**Refresh Interval**: 300 seconds

---

## 🎟️ Event Management

### Event Dashboard
**Collection**: `events`

| Metric | Label | Function | Field | Filter |
|--------|-------|----------|-------|--------|
| 1 | Total Events | count | - | - |
| 2 | Upcoming Events | count | - | `{ "event_date": { "_gte": "$NOW" } }` |
| 3 | Past Events | count | - | `{ "event_date": { "_lt": "$NOW" } }` |
| 4 | Events This Month | count | - | `{ "event_date": { "_gte": "$NOW", "_lte": "$NOW(+1 month)" } }` |
| 5 | Avg Attendees | avg | attendee_count | - |

**Recommended Display Style**: Cards  
**Refresh Interval**: 60 seconds

---

### Ticket Sales
**Collection**: `tickets`

| Metric | Label | Function | Field | Filter |
|--------|-------|----------|-------|--------|
| 1 | Total Tickets Sold | count | - | - |
| 2 | Revenue | sum | price | - |
| 3 | VIP Tickets | count | - | `{ "type": { "_eq": "vip" } }` |
| 4 | General Admission | count | - | `{ "type": { "_eq": "general" } }` |
| 5 | Avg Ticket Price | avg | price | - |

**Recommended Display Style**: Table  
**Refresh Interval**: 30 seconds

---

## 💬 Support System

### Support Tickets
**Collection**: `support_tickets`

| Metric | Label | Function | Field | Filter |
|--------|-------|----------|-------|--------|
| 1 | Total Tickets | count | - | - |
| 2 | Open | count | - | `{ "status": { "_eq": "open" } }` |
| 3 | In Progress | count | - | `{ "status": { "_eq": "in_progress" } }` |
| 4 | Resolved | count | - | `{ "status": { "_eq": "resolved" } }` |
| 5 | High Priority | count | - | `{ "priority": { "_eq": "high" }, "status": { "_neq": "resolved" } }` |
| 6 | Avg Response Time (hours) | avg | response_time_hours | - |

**Recommended Display Style**: Cards  
**Refresh Interval**: 30 seconds

---

## 📊 Project Management

### Tasks Overview
**Collection**: `tasks`

| Metric | Label | Function | Field | Filter |
|--------|-------|----------|-------|--------|
| 1 | Total Tasks | count | - | - |
| 2 | Completed | count | - | `{ "status": { "_eq": "completed" } }` |
| 3 | In Progress | count | - | `{ "status": { "_eq": "in_progress" } }` |
| 4 | To Do | count | - | `{ "status": { "_eq": "todo" } }` |
| 5 | Overdue | count | - | `{ "due_date": { "_lt": "$NOW" }, "status": { "_neq": "completed" } }` |
| 6 | Due This Week | count | - | `{ "due_date": { "_between": ["$NOW", "$NOW(+7 days)"] } }` |

**Recommended Display Style**: Cards  
**Refresh Interval**: 60 seconds

---

## 🛒 Inventory Management

### Stock Levels
**Collection**: `inventory`

| Metric | Label | Function | Field | Filter |
|--------|-------|----------|-------|--------|
| 1 | Total Items | count | - | - |
| 2 | Total Stock Units | sum | quantity | - |
| 3 | Total Inventory Value | sum | total_value | - |
| 4 | Avg Price | avg | unit_price | - |
| 5 | Low Stock Items | count | - | `{ "quantity": { "_lt": 20 } }` |
| 6 | Most Expensive Item | max | unit_price | - |

**Recommended Display Style**: Table  
**Refresh Interval**: 120 seconds

---

## 💰 Financial Tracking

### Revenue Metrics
**Collection**: `transactions`

| Metric | Label | Function | Field | Filter |
|--------|-------|----------|-------|--------|
| 1 | Total Transactions | count | - | - |
| 2 | Total Revenue | sum | amount | `{ "type": { "_eq": "income" } }` |
| 3 | Total Expenses | sum | amount | `{ "type": { "_eq": "expense" } }` |
| 4 | Today's Revenue | sum | amount | `{ "type": { "_eq": "income" }, "date": { "_gte": "$NOW(-1 day)" } }` |
| 5 | This Month Revenue | sum | amount | `{ "type": { "_eq": "income" }, "date": { "_gte": "$NOW(-1 month)" } }` |
| 6 | Avg Transaction Value | avg | amount | - |

**Recommended Display Style**: Cards  
**Refresh Interval**: 60 seconds

---

## 📚 Education Platform

### Course Enrollment
**Collection**: `enrollments`

| Metric | Label | Function | Field | Filter |
|--------|-------|----------|-------|--------|
| 1 | Total Enrollments | count | - | - |
| 2 | Active Students | count | - | `{ "status": { "_eq": "active" } }` |
| 3 | Completed Courses | count | - | `{ "progress": { "_eq": 100 } }` |
| 4 | New This Week | count | - | `{ "date_enrolled": { "_gte": "$NOW(-7 days)" } }` |
| 5 | Avg Course Progress | avg | progress | `{ "status": { "_eq": "active" } }` |

**Recommended Display Style**: Cards  
**Refresh Interval**: 300 seconds

---

## 🏨 Booking System

### Reservation Metrics
**Collection**: `reservations`

| Metric | Label | Function | Field | Filter |
|--------|-------|----------|-------|--------|
| 1 | Total Reservations | count | - | - |
| 2 | Confirmed | count | - | `{ "status": { "_eq": "confirmed" } }` |
| 3 | Pending | count | - | `{ "status": { "_eq": "pending" } }` |
| 4 | Checked In | count | - | `{ "status": { "_eq": "checked_in" } }` |
| 5 | Today's Check-ins | count | - | `{ "check_in_date": { "_eq": "$TODAY" } }` |
| 6 | Avg Nights Booked | avg | nights | - |

**Recommended Display Style**: Cards  
**Refresh Interval**: 60 seconds

---

## 🎯 Tips for Creating Effective Metrics

### 1. **Use Clear Labels**
- ✅ "Active Users (Last 7 Days)"
- ❌ "Users Count Filter Recent"

### 2. **Combine Related Metrics**
Group metrics that tell a story together on the same panel:
- Total vs. Filtered counts (Total Orders, Pending Orders, Completed Orders)
- Time-based comparisons (Today, This Week, This Month)
- Status breakdowns (Open, In Progress, Closed)

### 3. **Choose Appropriate Functions**
- **count**: For counting items (most common)
- **sum**: For totals (revenue, quantities)
- **avg**: For averages (prices, ratings, durations)
- **min/max**: For ranges (lowest/highest prices, dates)

### 4. **Optimize Refresh Intervals**
- Real-time data (orders, tickets): 30-60 seconds
- Hourly updates (analytics): 300-600 seconds
- Static data: 3600 seconds (1 hour)

### 5. **Use Filters Effectively**
```json
// Date ranges
{ "date_created": { "_gte": "$NOW(-7 days)" } }

// Status filtering
{ "status": { "_in": ["active", "pending"] } }

// Combined conditions
{ 
  "status": { "_eq": "published" },
  "date_created": { "_gte": "$NOW(-30 days)" }
}

// Null checks
{ "completed_at": { "_null": false } }
```

### 6. **Select Display Styles**
- **Cards**: 3-6 metrics, emphasis on large numbers
- **Table**: 5+ metrics, need to compare values
- **List**: Simple key-value pairs, compact view

---

## Need More Help?

Check the main README.md for:
- Installation instructions
- Configuration details
- Troubleshooting guide
- API reference
