# API Documentation

## Assignment API

### GET `/api/assignment`

Fetches all assignments.

**Request Body:**

- None

**Response:**

- `200 OK`: Returns a list of assignments.
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "string",
        "orderId": "string",
        "partnerId": "string",
        "status": "success | failed",
        "reason": "string"
      }
    ]
  }
  ```
- `500 Internal Server Error`: Error fetching assignments.

---

## Order API

### GET `/api/order`

Fetches all orders.

**Response:**

- `200 OK`: Returns a list of orders.
- `500 Internal Server Error`: Error fetching orders.

### POST `/api/order`

Creates a new order.

**Request Body:**

- `IOrder` object containing:
  ```json
  {
    "customerName": "string",
    "area": "string",
    "scheduledTime": "string",
    "items": [
      {
        "name": "string",
        "quantity": "number",
        "price": "number"
      }
    ],
    "totalAmount": "number"
  }
  ```

**Response:**

- `201 Created`: Order created successfully.
  ```json
  {
    "success": true,
    "data": {
      "_id": "string",
      "customerName": "string",
      "area": "string",
      "scheduledTime": "string",
      "items": [
        {
          "name": "string",
          "quantity": "number",
          "price": "number"
        }
      ],
      "totalAmount": "number",
      "status": "string"
    }
  }
  ```
- `500 Internal Server Error`: Error creating order.

### PUT `/api/order/[id]/status`

Updates the status of an order.

**Request Parameters:**

- `id`: Order ID.

**Request Body:**

- `status`: New status of the order.

**Response:**

- `200 OK`: Status updated successfully.
- `400 Bad Request`: Status is required.
- `404 Not Found`: Order not found.
- `500 Internal Server Error`: Error updating status.

### POST `/api/order/assign`

Assigns a partner to an order.

**Request Body:**

- `orderId`: ID of the order to assign.

**Response:**

- `200 OK`: Partner assigned successfully.
- `404 Not Found`: Order not found.
- `200 OK`: No available partner.
- `500 Internal Server Error`: Server error.

---

## Partner API

### GET `/api/partner`

Fetches all partners.

**Response:**

- `200 OK`: Returns a list of partners.
- `500 Internal Server Error`: Error fetching partners.

### POST `/api/partner`

Creates a new partner.

**Request Body:**

- `IPartner` object containing partner details.

**Response:**

- `201 Created`: Partner created successfully.
- `400 Bad Request`: Partner already exists.
- `500 Internal Server Error`: Error creating partner.

### PUT `/api/partner/[id]`

Updates a partner's details.

**Request Parameters:**

- `id`: Partner ID.

**Request Body:**

- Updated partner details.

**Response:**

- `200 OK`: Partner updated successfully.
- `404 Not Found`: Partner not found.
- `500 Internal Server Error`: Error updating partner.

### DELETE `/api/partner/[id]`

Deletes a partner.

**Request Parameters:**

- `id`: Partner ID.

**Response:**

- `200 OK`: Partner deleted successfully.
- `404 Not Found`: Partner not found.
- `500 Internal Server Error`: Error deleting partner.
