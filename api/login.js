import { loginUser } from "../controllers/usersController.js";

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body); // Parse incoming JSON payload

    // Call the loginUser function
    const response = await loginUser(body);
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
