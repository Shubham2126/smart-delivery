# Smart Delivery System

## Project Description

The Smart Delivery System is a web-based application designed to streamline the process of managing delivery orders, assigning partners, and tracking order statuses. 

### Key Features

- **Partner Registration**: Register and manage delivery partners with shift timings and availability.
- **Order Management**: Create, update, and track delivery orders.
- **Assignment System**: Automatically assign orders to available partners based on their shift and workload.
- **Dashboard**: View key metrics, active orders, partner availability, and recent assignments.

---

## Prerequisites

To run this application, ensure you have the following installed:

- Node.js (v16 or higher)
- npm (v7 or higher)
- MongoDB (running locally or accessible via a connection string)

---

## Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/smart-delivery.git
   cd smart-delivery
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the application in your browser:
   Navigate to `http://localhost:3000`.


---

## Folder Structure

- `src/app`: Contains the main application pages and API routes.
- `src/models`: Mongoose models for database entities.
- `src/types`: TypeScript type definitions.
- `src/database`: Database connection logic.

---


