/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_HOSTNAME: process.env.POSTGRES_HOSTNAME,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    POSTGRES_USER: process.env.POSTGRES_USER,
    DATABASE_URL: process.env.DATABASE_URL
  }
  
}
