# Backend Stage 2 Task: User Authentication & Organisation

## Acceptance Criteria

### Database Connection
- Connect your application to a PostgreSQL database server.
- Optionally, you can choose to use any ORM of your choice.

### User Model
Create a User model with the following properties:
```json
{
    "userId": "string", // Must be unique
    "firstName": "string", // Must not be null
    "lastName": "string", // Must not be null
    "email": "string", // Must be unique and must not be null
    "password": "string", // Must not be null
    "phone": "string"
}
```

### Validation
Provide validation for all fields. In case of validation errors, return status code `422` with the following payload:
```json
{
  "errors": [
    {
      "field": "string",
      "message": "string"
    }
  ]
}
```

### User Authentication
#### User Registration
- Implement an endpoint for user registration.
- Hash the user’s password before storing it in the database.
- On successful registration, return the payload with a `201` success status code.

#### User Login
- Implement an endpoint for user login.
- Use the JWT token returned to access protected endpoints.

### Organisation
- A user can belong to one or more organisations.
- An organisation can contain one or more users.
- On every registration, an organisation must be created. The organisation name should be the user's first name appended with "Organisation" (e.g., "John's Organisation" for a user with the first name "John").

### Organisation Model
Create an Organisation model with the following properties:
```json
{
    "orgId": "string", // Unique
    "name": "string", // Required and cannot be null
    "description": "string"
}
```

### Endpoints
#### User Registration
**[POST] /auth/register**: Registers a user and creates a default organisation.
##### Register request body:
```json
{
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "password": "string",
    "phone": "string"
}
```
##### Successful response:
```json
{
    "status": "success",
    "message": "Registration successful",
    "data": {
      "accessToken": "eyJh...",
      "user": {
          "userId": "string",
          "firstName": "string",
          "lastName": "string",
          "email": "string",
          "phone": "string"
      }
    }
}
```
##### Unsuccessful registration response:
```json
{
    "status": "Bad request",
    "message": "Registration unsuccessful",
    "statusCode": 400
}
```

#### User Login
**[POST] /auth/login**: Logs in a user. When logged in, the user can select an organisation to interact with.
##### Login request body:
```json
{
    "email": "string",
    "password": "string"
}
```
##### Successful response:
```json
{
    "status": "success",
    "message": "Login successful",
    "data": {
      "accessToken": "eyJh...",
      "user": {
          "userId": "string",
          "firstName": "string",
          "lastName": "string",
          "email": "string",
          "phone": "string"
      }
    }
}
```
##### Unsuccessful login response:
```json
{
    "status": "Bad request",
    "message": "Authentication failed",
    "statusCode": 401
}
```

#### Get User Record
**[GET] /api/users/:id**: A user gets their own record or user records in organisations they belong to or created [PROTECTED].
##### Successful response:
```json
{
    "status": "success",
    "message": "<message>",
    "data": {
      "userId": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string"
    }
}
```

#### Get Organisations
**[GET] /api/organisations**: Gets all organisations the user belongs to or created. If a user is logged in properly, they can get all their organisations. They should not get another user’s organisation [PROTECTED].
##### Successful response:
```json
{
    "status": "success",
    "message": "<message>",
    "data": {
      "organisations": [
          {
              "orgId": "string",
              "name": "string",
              "description": "string"
          }
      ]
    }
}
```

#### Get Single Organisation
**[GET] /api/organisations/:orgId**: The logged-in user gets a single organisation record [PROTECTED].
##### Successful response:
```json
{
    "status": "success",
    "message": "<message>",
    "data": {
        "orgId": "string",
        "name": "string",
        "description": "string"
    }
}
```

#### Create Organisation
**[POST] /api/organisations**: A user can create a new organisation [PROTECTED].
##### Request body:
```json
{
    "name": "string", // Required and cannot be null
    "description": "string"
}
```
##### Successful response:
```json
{
    "status": "success",
    "message": "Organisation created successfully",
    "data": {
        "orgId": "string",
        "name": "string",
        "description": "string"
    }
}
```
##### Unsuccessful response:
```json
{
    "status": "Bad Request",
    "message": "Client error",
    "statusCode": 400
}
```

#### Add User to Organisation
**[POST] /api/organisations/:orgId/users**: Adds a user to a particular organisation.
##### Request body:
```json
{
    "userId": "string"
}
```
##### Successful response:
```json
{
    "status": "success",
    "message": "User added to organisation successfully"
}
```

### Unit Testing
Write appropriate unit tests to cover:
- Token generation: Ensure the token expires at the correct time and contains the correct user details.
- Organisation: Ensure users cannot see data from organisations they do not have access to.

### End-to-End Test Requirements for the Register Endpoint
Ensure the `POST /auth/register` endpoint works correctly by performing end-to-end tests. Cover the following scenarios:
- Successful user registration with a default organisation.
- Validation errors.
- Database constraints.

### Directory Structure
The test file should be named `auth.spec.ext` (where `ext` is the file extension of your chosen language) inside a folder named `tests`. For example, `tests/auth.spec.ts` if using TypeScript.

### Test Scenarios
1. **Successful User Registration with Default Organisation**:
   - Ensure a user is registered successfully when no organisation details are provided.
   - Verify the default organisation name is correctly generated (e.g., "John's Organisation" for a user with the first name "John").
   - Check that the response contains the expected user details and access token.
2. **Successful Login**:
   - Ensure a user is logged in successfully with valid credentials.
   - Check that the response contains the expected user details and access token.
3. **Required Fields Missing**:
   - Test cases for each required field (firstName, lastName, email, password) missing.
   - Verify the response contains a status code of `422` and appropriate error messages.
4. **Duplicate Email or UserID**:
   - Attempt to register two users with the same email.
   - Verify the response contains a status code of `422` and appropriate error messages.

### Submission
1. Host your API on a free hosting service.
2. Submit the endpoint’s base URL (e.g., `https://example.com`).
3. A Google form will be provided for submission.

### Submission Deadline
- The deadline for submissions is Sunday, 7th July 2024 at 11:59 PM GMT. Late submissions will not be entertained.

### Submission Mode
1. Submit your task through the designated submission form.
2. Ensure you've:
   - Hosted the page on a platform of your choice.
   - Double-checked all requirements and acceptance criteria.
   - Provided the hosted page's URL in the submission form.
3. Thoroughly review your work to ensure accuracy, functionality, and adherence to the specified guidelines before submission.
