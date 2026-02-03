// 参考您的ESLint规范文档
import antfu from '@antfu/eslint-config'

export default antfu({
  // 忽略文件配置
  ignores: [
    'md/',
    '*.md',
    'dist/',
    'build/',
    'coverage/',
    'node_modules/',
    'pnpm-lock.yaml',
    'package-lock.json',
    'yarn.lock',
    '*.config.js',
    '*.config.ts'
  ],
  
  // 使用 React 相关规则
  react: true,
  
  // 使用 TypeScript 相关规则
  typescript: true,
  
  // 项目特定规则，基于您的ESLint规范文档
  rules: {
    // React 相关规则
    'react/react-in-jsx-scope': 'off',  // React 17+ 不需要引入 React
    'react/jsx-uses-react': 'off',
    'react-hooks/exhaustive-deps': 'error',  // React Hooks 依赖检查
    
    // 单行最大长度限制
    'max-len': ['error', { 'code': 80 }],
    
    // 对象键排序
    'sort-keys': ['error', 'asc', { 'caseSensitive': true, 'natural': false }],
    
    // TypeScript 相关配置
    '@typescript-eslint/no-explicit-any': 'warn',
    
    // 强制使用双引号（覆盖默认的单引号设置）
    'style/quotes': ['error', 'double'],
    'quotes': ['error', 'double'],
    
    // 对于 JSX 属性也强制使用双引号
    'jsx-quotes': ['error', 'prefer-double'],
    
    // 终端 UI 应用特殊规则
    'no-console': 'off', // 终端应用可能需要使用 console
  },
})