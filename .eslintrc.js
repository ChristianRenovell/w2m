module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "angular"],
  extends: ["plugin:@typescript-eslint/recommended", "plugin:angular/johnpapa"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "angular/function-type": ["error", "named"],
    "angular/no-private-call": "error",
    "angular/no-service-method": "error",
    "angular/prefer-component": "error",
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "rxjs",
            message: "Import only what you need from RxJS",
          },
          {
            name: "primeng",
            message: "Import only what you need from Primeng",
          },
        ],
      },
    ],
  },
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
};
