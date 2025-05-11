import jwt from "jsonwebtoken";

export const generateJWT = (payload) => {
  console.log(payload);
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "180d",
  });
  return token;
};
