import path from "path";

const DEV_BUILD = true;

export const MONGO = {
  URI:
    process.env.NODE_ENV === "testing"
      ? "mongodb://localhost:28018/testing"
      : "mongodb://localhost/application",
  OPTIONS: {
    native_parser: true,
    poolSize: 5,
    // user: "baseUser",
    // pass: "password",
    autoIndex: true,
    reconnectTries: 4,
    reconnectInterval: 1000
  },
  STORE_OPTIONS: {
    collection: "sessions",
    stringify: true
  }
};
export const EXPRESS = {
  DEV_BUILD: DEV_BUILD,
  SESSION_SECRET: "my super secret",
  STATIC_DIR: path.resolve(__dirname, "./static"),
  TEMP_DIR: "/var/tmp/"
};
export const CAS = {
  DEV_MODE: DEV_BUILD,
  DEV_USER: "88888888",
  DEV_USERINFO: {
    eduPersonAffiliation: ["member", "employee"],
    eduPersonPrincipalName: "4d7ba4657ad211a2@harvard.edu",
    mail: "help@seas.harvard.edu",
    sn: "qa-user",
    givenName: ["QA"],
    displayName: "QA User",
    authenticationType: "PIN"
  },
  VERSION: "saml1.1",
  URL: "https://www.pin1.harvard.edu/cas",
  SERVICE_URL_DEV: "https://im-dev.seas.harvard.edu",
  SERVICE_URL: "https://app.seas.harvard.edu",
  SESSION_NAME: "cas_user",
  SESSION_INFO: "cas_userinfo",
  DESTROY_SESSION: true
};
export const SERVER = {
  PROCESS_TITLE: "seas-application",
  HOST: "localhost",
  PORT: DEV_BUILD ? 3001 : 3020,
  LOG_LEVEL: "DEBUG",
  LOG_OUTPUT_TO_FILE: !DEV_BUILD, // if false, log output goes to console
  WORKER_COUNT: 1, // if 0, uses max number of processor cores
  LOG_DIR: path.join(__dirname, "logs"),
  APP_LOG: path.join(__dirname, "logs/app.log"),
  ERROR_LOG: path.join(__dirname, "logs/error.log"),
  PID_FILE: path.join(__dirname, "app.pid")
};
export const APP = {
  CURRENT_ACADEMIC_YEAR: 2015
};
