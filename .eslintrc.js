module.exports = {
  extends: ['@soybeanjs'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['~', '.'],
          ['@', './src']
        ],
        extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', 'mts', '.d.ts']
      }
    }
  },
  rules: {
    'import/no-unresolved': ['error', { ignore: ['uno.css'] }]
  }
};
