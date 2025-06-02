const jwt = require("jsonwebtoken");

const jwtGenerator = (userId) => {
  const payload = {
    user: {
      id: userId,
    },
  };

  return jwt.sign(payload, "your-secret-key", { expiresIn: "24h" });
};

module.exports = jwtGenerator;
