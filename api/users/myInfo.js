import { protectRoute } from "../middleware/authMiddleware.js";
import { getMyInfo } from "../controllers/usersController.js";

export const handler = async (event) => {
  try {
    // Validate the token using the protectRoute middleware
    const user = protectRoute(event.headers.authorization);

    // Call the getMyInfo function
    const response = await getMyInfo(user);
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
