const withPlugins = require("next-compose-plugins")
const linaria = require("next-linaria")
const svgr = require("next-svgr")
const pwa = require("next-pwa")

module.exports = withPlugins(
  [
    svgr,
    linaria,
    [
      pwa,
      {
        pwa: {
          dest: "public",
          disable: process.env.NODE_ENV === "development",
        },
      },
    ],
  ],
  {
    devIndicators: {
      autoPrerender: false,
    },

    async redirects() {
      return [
        {
          source: "/",
          destination: "/me",
          permanent: false,
        },
      ]
    },
  }
)
