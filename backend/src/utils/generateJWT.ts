import jwt from "jsonwebtoken";

const generateJWT = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
};

export default generateJWT;
