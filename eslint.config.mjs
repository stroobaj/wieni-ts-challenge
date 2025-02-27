import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: { extends: 'eslint:recommended' },
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    rules: {
      semi: 'error',
      quotes: ['error', 'single'],
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
    },
  }),
];

export default eslintConfig;