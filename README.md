```markdown
# Secure API with JWT Authentication and CORS

## Project Description

This project demonstrates a secure API implementation using Express.js with JWT authentication and CORS configuration. The API includes endpoints for user registration, login, token refreshing, and logout. JWT tokens are used for authentication, with the refresh token stored as an HTTP-only cookie to enhance security.

## Features

- **User Registration**: Allows users to register with email and password (optional in this example).
- **User Login**: Users can log in with their email and password to receive access and refresh tokens.
- **JWT Authentication**: Secure endpoints using access tokens.
- **Token Refresh**: Refresh the access token using the refresh token stored in HTTP-only cookies.
- **User Logout**: Clear the refresh token cookie to log out the user.
- **CORS Configuration**: Properly configured CORS to control cross-origin requests.

## Project Structure

```bash
src/
├── controllers/
│   └── authController.ts
│   └── userController.ts
├── middleware/
│   └── authenticate.ts
│   └── validate.ts
│   └── logger.ts
├── models/
│   └── dao/
│       └── userDAO.ts
│   └── domain/
│       └── UserSchema.ts
├── routes/
│   └── authRoutes.ts
│   └── userRoutes.ts
├── services/
│   └── authService.ts
├── utils/
│   └── customError.ts
└── app.ts
```

## Setup Instructions

### Prerequisites

- Node.js (v14.x or later)
- npm or yarn
- A database (e.g., PostgreSQL, MySQL)

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/secure-api.git
    cd secure-api
    ```

2. **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Configure environment variables**:
    Create a `.env` file in the root directory with the following variables:
    ```env
    PORT=4000
    NODE_ENV=development
    ACCESS_TOKEN_SECRET=youraccesstokensecret
    REFRESH_TOKEN_SECRET=yourrefreshtokensecret
    ```

4. **Run the server**:
    ```bash
    npm start
    # or
    yarn start
    ```

## Endpoints

### Authentication

- **Login**: `POST /auth/login`
    - Request body: `{ "email": "user@example.com", "password": "password123" }`
    - Response: `{ "accessToken": "jwt-token" }`
    - Sets an HTTP-only cookie with the refresh token.

- **Refresh Token**: `POST /auth/refresh-token`
    - Request: Sends the refresh token as an HTTP-only cookie.
    - Response: `{ "accessToken": "new-jwt-token" }`
    - Sets a new HTTP-only cookie with the refresh token.

- **Logout**: `POST /auth/logout`
    - Request: Sends the refresh token as an HTTP-only cookie.
    - Response: `{ "message": "Logged out successfully" }`
    - Clears the HTTP-only cookie.

### User Management

- **Create User**: `POST /api/users`
    - Request body: `{ "email": "user@example.com", "password": "password123" }`
    - Response: `{ "message": "User created", "user": { "email": "user@example.com", "password": "password123" } }`

## Authentication Flow

1. **User Login**:
    - User sends a POST request to `/auth/login` with email and password.
    - Server verifies credentials and responds with an access token and sets a refresh token in an HTTP-only cookie.

2. **Accessing Protected Routes**:
    - User includes the access token in the Authorization header when making requests to protected routes.
    - Server verifies the access token using middleware.

3. **Refreshing Token**:
    - When the access token expires, the user sends a POST request to `/auth/refresh-token`.
    - Server verifies the refresh token from the HTTP-only cookie and responds with a new access token and refresh token.

4. **User Logout**:
    - User sends a POST request to `/auth/logout`.
    - Server clears the refresh token cookie, effectively logging out the user.

## CORS Configuration

CORS is configured to allow specific origins and support credentials. The `cors` middleware is set up with the following options:

- **Allowed Origins**: `http://localhost:3000`, `https://my-frontend.com`
- **Allowed Methods**: `GET`, `POST`, `PUT`, `DELETE`
- **Allowed Headers**: `Content-Type`, `Authorization`
- **Credentials**: `true` (Allows cookies to be sent with requests)

## Contribution

Feel free to fork this repository and contribute by submitting a pull request. Any contributions are welcome!

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
```

Replace `"https://github.com/your-username/secure-api.git"` with the actual URL of your repository and adjust any other details specific to your project. This `README.md` file should provide a comprehensive overview of your secure API project, including setup instructions, endpoints, and the authentication flow.
