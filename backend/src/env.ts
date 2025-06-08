type EnvConfig = {
  PORT: number;
  DATABASE_URL: string;
  auth: {
    SALT_ROUNDS: number;
    TOKEN_SECRET: string;
    ACCESS_TOKEN_AGE: number;
    REFRESH_TOKEN_AGE: number;
    OTP_AGE: number;
    OTP_SECRET: string;
  };
  smtp: {
    SMTP_AUTH_USER: string;
    SMTP_AUTH_PASS: string;
  };
};

const env: EnvConfig = {
  PORT: Number(process.env["PORT"]),
  DATABASE_URL: process.env["DATABASE_URL"] || "",
  auth: {
    SALT_ROUNDS: Number(process.env["SALT_ROUNDS"]) || 10,
    TOKEN_SECRET: process.env["TOKEN_SECRET"] || "",
    ACCESS_TOKEN_AGE: Number(process.env["ACCESS_TOKEN_AGE"]) || 60000,
    REFRESH_TOKEN_AGE: Number(process.env["REFRESH_TOKEN_AGE"]) || 86400000,
    OTP_AGE: Number(process.env["OTP_AGE"]) || 50,
    OTP_SECRET: process.env["OTP_SECRET"] || "",
  },
  smtp: {
    SMTP_AUTH_USER: process.env["SMTP_AUTH_USER"] || "",
    SMTP_AUTH_PASS: process.env["SMTP_AUTH_PASS"] || "",
  },
};

export { env };
