/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const { loadEnvConfig } = require("@next/env");

const { i18n } = require("./next-i18next.config");

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const nextConfig = {
  reactStrictMode: true,
  i18n,
  publicRuntimeConfig: {
    processEnv: Object.fromEntries(Object.entries(process.env).filter(([key]) => key.includes("NEXT_PUBLIC_"))),
  },
};

module.exports = nextConfig;
