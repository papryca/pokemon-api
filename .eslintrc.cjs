module.exports = {
    root: true,
    env: { browser: true, es2020: true, "jest": true,
        "node": true },
    extends: [
        'eslint:recommended',
        "plugin:react/recommended",
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        "plugin:import/typescript",
        "plugin:prettier/recommended",
        "prettier"
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": ['./tsconfig.json', './tsconfig.node.json'],
        "tsconfigRootDir": __dirname,
    },
    plugins: ['react-refresh', "react", "react-hooks", "prettier", "import", "@typescript-eslint"],
    rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "comma-dangle": ["error", "only-multiline"],
        "react/prop-types": "off",
        "react/display-name": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/ban-ts-comment": "error",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-var-requires": "off",
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off"
    },
    "settings": {
        "react": {
            "pragma": "React",
            "version": "detect"
        },
    }
}

