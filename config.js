import dotenv from "dotenv";

dotenv.config();

const config = {
  apiUrl: process.env.API_URL,

  frontUrl: process.env.FRONT_URL,

  port: process.env.PORT,

  socialProviderUrl: `${process.env.API_URL}/auth/provider`
};

export default config;
