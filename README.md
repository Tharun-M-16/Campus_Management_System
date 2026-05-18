# Campus Notifications Microservice App

A student-level React app to display campus notifications from a remote evaluation-service API.

## Features
- Fetch notifications from http://4.224.186.213/evaluation-service/notifications`n- Filter by notification type: Event, Result, Placement
- Separate unread and viewed notifications using frontend state
- Highlight unread notifications visually
- Mark notifications as viewed on click
- Pagination support with limit and page`n- Top priority notification section with Placement > Result > Event ordering
- Notification details page
- Loading, error, and empty state handling

## Folder structure
- src/components — reusable UI pieces
- src/pages — route-based page views
- src/services — Axios API calls
- src/utils — helper functions and sorting logic

## Installation
1. Open a terminal in myapp`n2. Run 
pm install`n3. Run 
pm start`n4. Open http://localhost:3000`n
## Notes
- The app uses localStorage to keep viewed notification state on the front end.
- If the API requires an authorization header, update src/services/api.js.
- The UI is built with Material UI and only uses functional components with hooks.

## Viva answers
- App.js sets up routing and the Material UI theme.
- HomePage.js fetches notifications and handles filters, pagination, unread/viewed sections, and priority sorting.
- NotificationDetailsPage.js shows a single notification and marks it as viewed.
- NotificationCard.js highlights unread notifications and provides a click area for navigation.
- Notification_System_Design.md explains the app structure and priority logic.

## API testing examples
- Notification_Api.postman_collection.json contains sample GET requests for the notifications endpoint.
- Use query params limit, page, and 
otification_type.

## Run the app

pm start

Then open http://localhost:3000.
