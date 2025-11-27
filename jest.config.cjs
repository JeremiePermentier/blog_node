module.exports = {
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        useESM: true,
        // Désactive les warnings si tu veux
        diagnostics: {
          ignoreCodes: [151002]
        }
      },
    ],
  },
};
