// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  i18n: {
    locales: ["tr", "en"],
    defaultLocale: "en",
    localeDetection: false,
    localePath: path.resolve("./public/locales"),
  },
};
