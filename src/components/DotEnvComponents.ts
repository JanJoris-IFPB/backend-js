import "dotenv/config"

const DotEnvComponent = {
    DATABASE_URL: process.env.DATABASE_URL,
    API_PORT: process.env.API_PORT,
    LOGGER_ENVIRONMENT: process.env.LOGGER_ENVIRONMENT,
    LOGGER_LEVEL: process.env.LOGGER_LEVEL,
    LOGGER_SERVICE_NAME: process.env.LOGGER_SERVICE_NAME,
    API_PASSWORD_KEY: process.env.API_PASSWORD_KEY,
    API_JWT_KEY: process.env.API_JWT_KEY
}

export default DotEnvComponent;
