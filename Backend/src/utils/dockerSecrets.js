import fs from "fs";
const accessTokenSecret = fs.readFileSync(
  "/run/secrets/ACCESS_TOKEN_SECRET",
  "utf8"
);
const accessTokenExpiry = fs.readFileSync(
  "/run/secrets/ACCESS_TOKEN_EXPIRY",
  "utf8"
);
const refreshTokenSecret = fs.readFileSync(
  "/run/secrets/REFRESH_TOKEN_SECRET",
  "utf8"
);
const refreshTokenExpiry = fs.readFileSync(
  "/run/secrets/REFRESH_TOKEN_EXPIRY",
  "utf8"
);
const mongodbUrl = fs.readFileSync("/run/secrets/MONGODB_URL", "utf8");
const databaseName = fs.readFileSync("/run/secrets/DB_NAME", "utf8");
const googleApiKey = fs.readFileSync("/run/secrets/GOOGLE_API_KEY", "utf8");

export {
  accessTokenSecret,
  accessTokenExpiry,
  refreshTokenExpiry,
  refreshTokenSecret,
  mongodbUrl,
  databaseName,
  googleApiKey,
};
