export default [
  {
    ignores: [
      '.nuxt/**',
      '.output/**',
      '.vercel/**',
      'dist/**',
      'node_modules/**',
      'public/generated/**',
      'content/**',
      'app/**/*.vue',
      'app/**/*.ts',
      'server/**/*.ts',
      '*.ts',
      '*.d.ts',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-console': 'off',
      'no-undef': 'off',
    },
  },
]
