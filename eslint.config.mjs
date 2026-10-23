import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      '@next/next/no-img-element': 'warn',
      'react/display-name': 'off',
      'no-unused-vars': 'warn',
      'react/no-unknown-property': 'off',
      'react-hooks/set-state-in-effect': 'off'
    }
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'coverage/**',
    'test-results/**',
    'playwright-report/**',
    'next-env.d.ts'
  ])
]);

export default eslintConfig;
