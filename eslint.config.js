import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json', './test/tsconfig.json'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        Buffer: 'readonly',
        atob: 'readonly',
        globalThis: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'import': importPlugin,
      'jsx-a11y': jsxA11y,
      'prettier': prettier,
    },
    rules: {
      'import/extensions': 0,
      'no-alert': 0,
      '@typescript-eslint/await-thenable': 0,
      'react/button-has-type': 0,
      'no-cond-assign': 0,
      'class-methods-use-this': 0,
      'no-underscore-dangle': 0,
      'no-useless-constructor': 0,
      'no-shadow': 0,
      '@typescript-eslint/no-shadow': 'warn',
      'no-empty-function': 0,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { 
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
        'ignoreRestSiblings': true 
      }],
    },
    settings: {
      'import/resolver': {
        typescript: {
          directory: ['./tsconfig.json', './test/tsconfig.json'],
        },
      },
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },
];
