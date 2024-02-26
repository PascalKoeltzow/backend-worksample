# Backend Test

Basic setup for the backend engineer test.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [Testing](#testing)

## Prerequisite

Use latest Node.js Version.<br>
Build and tested with Node.js version 20.11.1

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/PascalKoeltzow/backend-worksample
    ```

2. Navigate to the project directory:

    ```bash
    cd backend-test
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up your environment variables by creating a `.env` file in the root directory of the project and adding the following variables:

    ```
    PORT=4111
    MONGODB_URI=your-mongodb-uri
    ```

    Replace `your-mongodb-uri` with your actual MongoDB connection URI.

## Usage

1. Start the server:

    ```bash
    npm start
    ```

    The server will start running at `http://localhost:4111`.

2. Use the provided API endpoints to interact with the server.

## Routes

### Register User

- **URL:** `/register`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**
    ```json
    {
        "email": "user@example.com",
        "password": "password",
        "username": "user123"
    }
    ```

### Get All Users

- **URL:** `/users`
- **Method:** `GET`
- **Description:** Get a list of all users.
- **Query Parameters:**<br>
`created`
<br>Sort users by creation date. Accepted values: asc (ascending) or desc (descending).<br> Example: /users?created=desc
- **Response:**
    ```json
    [
        {
            "_id": "65da964f834573516d9ccabe",
            "username": "pascal",
            "email": "pascal@perspective.com",
            "date": "2024-02-25T01:22:23.677Z",
            "__v": 0
        },
        {
            "_id": "65daa8cd2c4b911154354780",
            "username": "pascal2",
            "email": "pascal2@perspective.com",
            "date": "2024-02-25T02:41:17.183Z",
            "__v": 0
        }
    ]
    ```

## Testing

To run tests, use the following command:

```bash
npm test
