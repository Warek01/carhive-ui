import { fixupConfigRules } from '@eslint/compat';
import pluginJs from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import importSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      import: importPlugin,
      'sort-imports': importSort,
      prettier: prettier,
      'unused-imports': unusedImports,
    },
    rules: {
      'prettier/prettier': 'error',
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
        },
      ],
      'import/order': [
        1,
        {
          groups: [
            'external',
            'builtin',
            'internal',
            'sibling',
            'parent',
            'index',
          ],
          pathGroups: [
            {
              pattern: '@carhive/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['internal'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: false,
          },
        },
      ],
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/display-name': 'off',
    },
  },
];
