const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!process.env.JWT_SECRET) {
    return res
      .status(500)
      .json({ message: "JWT secret is not set in environment variables" });
  }

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

    req.user = decoded; // Attach user info to request object
    next(); // Proceed to the next middleware
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token has expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    } else {
      return res
        .status(500)
        .json({ message: "Server Error: Failed to authenticate token" });
    }
  }
};

module.exports = authMiddleware;
