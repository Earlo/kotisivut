import nextVitals from 'eslint-config-next/core-web-vitals';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import { defineConfig, globalIgnores } from 'eslint/config';
import { configs as tseslint } from 'typescript-eslint';

export default defineConfig([
  ...nextVitals,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'postcss.config.js',
    'next.config.ts',
    'eslint.config.mjs',
  ]),
  ...tseslint.recommendedTypeChecked,
  { rules: { ...importPlugin.flatConfigs.recommended.rules } },
  { rules: { ...jsxA11y.flatConfigs.recommended.rules } },

  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname ?? process.cwd(),
      },
    },
  },

  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      'import/no-extraneous-dependencies': ['error'],
      'import/no-unresolved': 'off',
      'import/named': 'error',
      'import/namespace': 'error',
      'import/default': 'error',
      'import/export': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
      '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    },
  },
]);
