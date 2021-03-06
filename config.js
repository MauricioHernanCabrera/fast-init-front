import dotenv from "dotenv";

dotenv.config();

const config = {
  apiUrl: process.env.API_URL,

  port: process.env.PORT,

  socialProviderUrl: `${process.env.API_URL}/auth/provider`
};

export default config;
