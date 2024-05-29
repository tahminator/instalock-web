module.exports = {
  extends: ['mantine'],
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    "linebreak-style": 0
  },
};
