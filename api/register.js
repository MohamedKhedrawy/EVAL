import { registerUser } from "../controllers/usersController.js";
import { validateRequest, validateRegisterBody } from "./validate.js";

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body); // Parse incoming JSON payload

    // Validate request body
    const errors = validateRequest(validateRegisterBody, body);
    if (errors.length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ errors }),
      };
    }

    // Call the registerUser function
    const response = await registerUser(body);
    return {
      statusCode: 201,
      body: JSON.stringify(response),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
