module.exports = {
  ci: {
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        "unused-javascript": ["warning", { maxLength: 0 }],
      },
    },
  },
}
