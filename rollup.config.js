import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const external = ['dayjs', 'dayjs/plugin/isBetween', 'dayjs/plugin/isSameOrAfter', 'dayjs/plugin/isSameOrBefore', 'dayjs/plugin/relativeTime'];

export default [
  // ESM build
  {
    input: {
      index: 'src/index.ts',
      validators: 'src/validators.ts',
      formatters: 'src/formatters.ts',
      datetime: 'src/datetime.ts'
    },
    output: {
      dir: 'dist',
      format: 'es',
      entryFileNames: '[name].js',
      preserveModules: false
    },
    external,
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist'
      })
    ]
  },
  // CJS build
  {
    input: {
      index: 'src/index.ts',
      validators: 'src/validators.ts', 
      formatters: 'src/formatters.ts',
      datetime: 'src/datetime.ts'
    },
    output: {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: '[name].cjs'
    },
    external,
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false
      })
    ]
  }
];