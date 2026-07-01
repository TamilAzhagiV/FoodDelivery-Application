# Cart, Order, and Restaurant Order System Documentation

This document provides a comprehensive specification of the Mongoose models and API endpoints for the **Cart**, **Order**, and **Restaurant Order** modules in the food delivery application.

---

## 1. Database Models

The system is built on top of MongoDB using Mongoose. Below are the schemas and definitions for the primary models involved.

### 1.1. Cart Model (`Cart.js`)
* **Path:** [Cart.js](file:///home/dell/Documents/Express/src/models/Cart.js)
* **Description:** Manages the customer's current shopping cart. Each customer can have exactly one active cart.

| Field Name | Type | Description | Validation / Constraints |
| :--- | :--- | :--- | :--- |
| `customerId` | `ObjectId` | Reference to the `User` model (Customer) | Required, Unique, references `"User"` |
| `items` | `Array` | List of items added to the cart | Array of Item objects (see below) |
| `items.menuItemId` | `ObjectId` | Reference to the `MenuItem` model | Required, references `"MenuItem"` |
| `items.quantity` | `Number` | Quantity of the item | Default: `1`, Minimum: `1` |
| `items.price` | `Number` | Price per item (captured at add time) | Required |
| `totalAmount` | `Number` | Grand total of all items in the cart | Default: `0`, automatically computed |
| `timestamps` | `Boolean` | Created/Updated timestamps | Automatically generated (`createdAt`, `updatedAt`) |

---

### 1.2. Order Model (`Order.js`)
* **Path:** [Order.js](file:///home/dell/Documents/Express/src/models/Order.js)
* **Description:** Manages placed orders. Used by customers to view history, by restaurant owners to manage preparation flow, and by delivery partners to accept pick-up requests.

| Field Name | Type | Description | Validation / Constraints |
| :--- | :--- | :--- | :--- |
| `customerId` | `ObjectId` | Reference to the `User` model (Customer) | Required, references `"User"` |
| `restaurantId` | `ObjectId` | Reference to the `Restaurant` model | Required, references `"Restaurant"` |
| `items` | `Array` | List of ordered items and captured prices | Array of Order Item objects (see below) |
| `items.menuItemId` | `ObjectId` | Reference to the `MenuItem` model | Required, references `"MenuItem"` |
| `items.quantity` | `Number` | Quantity of the item ordered | Required |
| `items.price` | `Number` | Price per item at the time of order | Required |
| `totalAmount` | `Number` | Grand total of the order | Required |
| `orderStatus` | `String` | State machine status of the order | Required. Enum: `["PLACED", "ACCEPTED", "PREPARING", "READY_FOR_PICKUP", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"]`. Default: `"PLACED"` |
| `deliveryPartnerId` | `ObjectId` | Reference to the delivery partner profile | References `"DeliveryPartner"`, default: `null` |
| `pickedUpAt` | `Date` | Timestamp when the order was picked up | Default: `null` |
| `deliveredAt` | `Date` | Timestamp when the order was delivered | Default: `null` |
| `timestamps` | `Boolean` | Created/Updated timestamps | Automatically generated (`createdAt`, `updatedAt`) |

---

## 2. API Specifications

All endpoints require authorization via a JWT Bearer Token in the `Authorization` header:
`Authorization: Bearer <JWT_TOKEN>`

### 2.1. Cart API Endpoints (Prefix: `/cart`)
* **Routes Handler:** [cartRoutes.js](file:///home/dell/Documents/Express/src/routes/cartRoutes.js)
* **Controller:** [cartController.js](file:///home/dell/Documents/Express/src/controllers/cartController.js)

#### `GET /cart`
* **Description:** Retrieve the current customer's cart. If no cart exists, returns empty items.
* **Role Requirement:** `CUSTOMER`
* **Response (Success - 200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "_id": "6850c1c6f3a5f5f4b6a12344",
      "customerId": "6850c1c6f3a5f5f4b6a12345",
      "items": [
        {
          "menuItemId": {
            "_id": "6850c1c6f3a5f5f4b6a12347",
            "name": "Paneer Butter Masala",
            "image": "paneer.jpg",
            "isAvailable": true
          },
          "quantity": 2,
          "price": 250,
          "_id": "6850c1c6f3a5f5f4b6a1234a"
        }
      ],
      "totalAmount": 500,
      "createdAt": "2026-06-25T12:00:00.000Z",
      "updatedAt": "2026-06-25T12:05:00.000Z"
    }
  }
  ```

#### `POST /cart/add`
* **Description:** Add a menu item to the cart or increment its quantity if it already exists. Recalculates total amount.
* **Role Requirement:** `CUSTOMER`
* **Validation (Zod):**
  - `body.menuItemId`: MongoDB ObjectId (String, Required)
  - `body.quantity`: Integer, Min: `1` (Coerced Number, Required)
* **Request Payload Example:**
  ```json
  {
    "menuItemId": "6850c1c6f3a5f5f4b6a12347",
    "quantity": 2
  }
  ```
* **Response (Success - 200 OK):**
  ```json
  {
    "success": true,
    "message": "Item added to cart",
    "data": {
      "customerId": "6850c1c6f3a5f5f4b6a12345",
      "items": [
        {
          "menuItemId": "6850c1c6f3a5f5f4b6a12347",
          "quantity": 2,
          "price": 250
        }
      ],
      "totalAmount": 500
    }
  }
  ```

#### `PUT /cart/item/:menuItemId`
* **Description:** Update the quantity of a specific menu item already in the cart.
* **Role Requirement:** `CUSTOMER`
* **Validation (Zod):**
  - `params.menuItemId`: MongoDB ObjectId (Required)
  - `body.quantity`: Integer, Min: `1` (Required)
* **Request Payload Example:**
  ```json
  {
    "quantity": 3
  }
  ```
* **Response (Success - 200 OK):**
  ```json
  {
    "success": true,
    "message": "Cart updated successfully",
    "data": {
      "customerId": "6850c1c6f3a5f5f4b6a12345",
      "items": [
        {
          "menuItemId": "6850c1c6f3a5f5f4b6a12347",
          "quantity": 3,
          "price": 250
        }
      ],
      "totalAmount": 750
    }
  }
  ```

#### `DELETE /cart/item/:menuItemId`
* **Description:** Remove a specific menu item completely from the cart.
* **Role Requirement:** `CUSTOMER`
* **Validation (Zod):**
  - `params.menuItemId`: MongoDB ObjectId (Required)
* **Response (Success - 200 OK):**
  ```json
  {
    "success": true,
    "message": "Item removed from cart",
    "data": {
      "customerId": "6850c1c6f3a5f5f4b6a12345",
      "items": [],
      "totalAmount": 0
    }
  }
  ```

#### `DELETE /cart/clear`
* **Description:** Remove all items and reset total amount to `0`.
* **Role Requirement:** `CUSTOMER`
* **Response (Success - 200 OK):**
  ```json
  {
    "success": true,
    "message": "Cart cleared successfully",
    "data": {
      "customerId": "6850c1c6f3a5f5f4b6a12345",
      "items": [],
      "totalAmount": 0
    }
  }
  ```

---

### 2.2. Customer Order API Endpoints (Prefix: `/orders`)
* **Routes Handler:** [orderRoutes.js](file:///home/dell/Documents/Express/src/routes/orderRoutes.js)
* **Controller:** [orderController.js](file:///home/dell/Documents/Express/src/controllers/orderController.js)

#### `POST /orders`
* **Description:** Place a new order using the current items in the customer's cart. The restaurant ID is determined by the first item's restaurant. The cart is cleared upon successful placement.
* **Role Requirement:** `CUSTOMER`
* **Validation (Zod):** Empty schema (takes items automatically from cart).
* **Response (Success - 201 Created):**
  ```json
  {
    "success": true,
    "message": "Order placed successfully",
    "data": {
      "_id": "6850c1c6f3a5f5f4b6a12348",
      "customerId": "6850c1c6f3a5f5f4b6a12345",
      "restaurantId": "6850c1c6f3a5f5f4b6a12346",
      "items": [
        {
          "menuItemId": "6850c1c6f3a5f5f4b6a12347",
          "quantity": 2,
          "price": 250,
          "_id": "6850c1c6f3a5f5f4b6a1234b"
        }
      ],
      "totalAmount": 500,
      "orderStatus": "PLACED",
      "deliveryPartnerId": null,
      "pickedUpAt": null,
      "deliveredAt": null,
      "createdAt": "2026-06-25T12:10:00.000Z",
      "updatedAt": "2026-06-25T12:10:00.000Z"
    }
  }
  ```
* **Error Response (400 Bad Request - Empty Cart):**
  ```json
  {
    "success": false,
    "message": "Cart is empty"
  }
  ```

#### `GET /orders`
* **Description:** Get all orders placed by the current customer, sorted newest first. Populates the `restaurantId` (name) and `items.menuItemId` (name, image).
* **Role Requirement:** `CUSTOMER`
* **Response (Success - 200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "6850c1c6f3a5f5f4b6a12348",
        "customerId": "6850c1c6f3a5f5f4b6a12345",
        "restaurantId": {
          "_id": "6850c1c6f3a5f5f4b6a12346",
          "restaurantName": "Gourmet Paradise"
        },
        "items": [
          {
            "menuItemId": {
              "_id": "6850c1c6f3a5f5f4b6a12347",
              "name": "Paneer Butter Masala",
              "image": "paneer.jpg"
            },
            "quantity": 2,
            "price": 250,
            "_id": "6850c1c6f3a5f5f4b6a1234b"
          }
        ],
        "totalAmount": 500,
        "orderStatus": "PLACED",
        "createdAt": "2026-06-25T12:10:00.000Z"
      }
    ]
  }
  ```

#### `GET /orders/:orderId`
* **Description:** Retrieve details of a specific order. Populates the `restaurantId` (name) and `items.menuItemId` (name, image).
* **Role Requirement:** `CUSTOMER`
* **Validation (Zod):**
  - `params.orderId`: MongoDB ObjectId (Required)
* **Response (Success - 200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "_id": "6850c1c6f3a5f5f4b6a12348",
      "customerId": "6850c1c6f3a5f5f4b6a12345",
      "restaurantId": {
        "_id": "6850c1c6f3a5f5f4b6a12346",
        "restaurantName": "Gourmet Paradise"
      },
      "items": [
        {
          "menuItemId": {
            "_id": "6850c1c6f3a5f5f4b6a12347",
            "name": "Paneer Butter Masala",
            "image": "paneer.jpg"
          },
          "quantity": 2,
          "price": 250
        }
      ],
      "totalAmount": 500,
      "orderStatus": "PLACED"
    }
  }
  ```

#### `PATCH /orders/:orderId/cancel`
* **Description:** Cancel an order. An order can **only** be cancelled if its current status is `"PLACED"`.
* **Role Requirement:** `CUSTOMER`
* **Validation (Zod):**
  - `params.orderId`: MongoDB ObjectId (Required)
* **Response (Success - 200 OK):**
  ```json
  {
    "success": true,
    "message": "Order cancelled successfully",
    "data": {
      "_id": "6850c1c6f3a5f5f4b6a12348",
      "orderStatus": "CANCELLED"
    }
  }
  ```
* **Error Response (500 Server Error - Invalid status for cancellation):**
  ```json
  {
    "success": false,
    "message": "Order cannot be cancelled"
  }
  ```

---

### 2.3. Restaurant Order API Endpoints (Prefix: `/restaurant`)
* **Routes Handler:** [restaurantOrderRoutes.js](file:///home/dell/Documents/Express/src/routes/restaurantOrderRoutes.js)
* **Controller:** [restaurantOrderController.js](file:///home/dell/Documents/Express/src/controllers/restaurantOrderController.js)

#### `GET /restaurant/orders`
* **Description:** Retrieve all orders placed to the restaurant owned by the logged-in owner. Sorts by newest first. Populates customer details (`fullName email phoneNumber`) and item details (`name image`).
* **Role Requirement:** `RESTAURANT_OWNER`
* **Response (Success - 200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "6850c1c6f3a5f5f4b6a12348",
        "customerId": {
          "_id": "6850c1c6f3a5f5f4b6a12345",
          "fullName": "Jane Doe",
          "email": "jane@example.com",
          "phoneNumber": "9876543210"
        },
        "restaurantId": "6850c1c6f3a5f5f4b6a12346",
        "items": [
          {
            "menuItemId": {
              "_id": "6850c1c6f3a5f5f4b6a12347",
              "name": "Paneer Butter Masala",
              "image": "paneer.jpg"
            },
            "quantity": 2,
            "price": 250
          }
        ],
        "totalAmount": 500,
        "orderStatus": "PLACED",
        "createdAt": "2026-06-25T12:10:00.000Z"
      }
    ]
  }
  ```

#### `PATCH /restaurant/orders/:orderId/accept`
* **Description:** Accept a placed order. Changes status from `"PLACED"` to `"ACCEPTED"`.
* **Role Requirement:** `RESTAURANT_OWNER`
* **Validation (Zod):**
  - `params.orderId`: MongoDB ObjectId (Required)
* **Response (Success - 200 OK):**
  ```json
  {
    "success": true,
    "message": "Order accepted successfully",
    "data": {
      "_id": "6850c1c6f3a5f5f4b6a12348",
      "orderStatus": "ACCEPTED"
    }
  }
  ```

#### `PATCH /restaurant/orders/:orderId/preparing`
* **Description:** Mark the accepted order as preparing. Changes status from `"ACCEPTED"` to `"PREPARING"`.
* **Role Requirement:** `RESTAURANT_OWNER`
* **Validation (Zod):**
  - `params.orderId`: MongoDB ObjectId (Required)
* **Response (Success - 200 OK):**
  ```json
  {
    "success": true,
    "message": "Order preparation started",
    "data": {
      "_id": "6850c1c6f3a5f5f4b6a12348",
      "orderStatus": "PREPARING"
    }
  }
  ```

#### `PATCH /restaurant/orders/:orderId/ready`
* **Description:** Mark the preparing order as ready for pick-up. Changes status from `"PREPARING"` to `"READY_FOR_PICKUP"`. This makes the order visible/available for delivery partners to pick up.
* **Role Requirement:** `RESTAURANT_OWNER`
* **Validation (Zod):**
  - `params.orderId`: MongoDB ObjectId (Required)
* **Response (Success - 200 OK):**
  ```json
  {
    "success": true,
    "message": "Order is ready for pickup",
    "data": {
      "_id": "6850c1c6f3a5f5f4b6a12348",
      "orderStatus": "READY_FOR_PICKUP"
    }
  }
  ```
