import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(["dist"]),
  {
    ignores: [
      'coverage/',
      'coverage/*',
      'coverage/**/*',
      'lib/',
      'lib/*',
      'lib/**/*',
      'dist/',
      'dist/*',
      'dist/**/*',
      '**/dist/',
      '**/dist/*',
      '**/dist/**/*',
      'script/',
      'script/*',
      'script/**/*',
      'node_modules/',
      'node_modules/*',
    ],
    files: ['**/*.ts'],
    extends: [eslint.configs.recommended, tseslint.configs.recommended],
    plugins: {
      jest: {},
    },
    rules: {
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-case-declarations': 'off',
    },
  },
]);
