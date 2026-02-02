import antfu from '@antfu/eslint-config'

export default antfu({
  // 使用 React 相关规则
  react: true,
  
  // 使用 TypeScript 相关规则
  typescript: true,
  
  // 自定义规则
  rules: {
    // React 相关规则
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }], // 禁止不必要的大括号
    'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }], // 每行最多一个 prop
    'react/jsx-first-prop-new-line': ['error', 'multiline'], // 多行时第一个 prop 在新行
    'react/jsx-sort-props': [ // 属性排序
      'error',
      {
        callbacksLast: true, // 回调函数放最后
        shorthandFirst: true, // 简写属性放前面
        multiline: 'ignore', // 忽略多行属性
        noSortAlphabetically: false, // 按字母顺序排序
        reservedFirst: true, // 保留字放前面
      }
    ],
    
    // 字符串使用双引号
    'style/quotes': ['error', 'double'],
    
    // 单行最大长度限制
    'style/max-len': ['error', { 'code': 80 }],
    
    // 对象键排序
    'sort-keys': ['error', 'asc', { 'caseSensitive': true, 'natural': false }],
    
    // 强制使用驼峰命名
    'style/camelcase': 'off', // 使用新的规则名
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variableLike',
        format: ['camelCase', 'UPPER_CASE'],
      },
      {
        selector: 'function',
        format: ['camelCase'],
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
      },
      {
        selector: 'memberLike',
        format: ['camelCase'],
      },
      {
        selector: 'objectLiteralProperty',
        format: ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'classMethod',
        format: ['camelCase'],
      },
      {
        selector: 'classProperty',
        format: ['camelCase'],
      },
      {
        selector: 'typeProperty',
        format: ['camelCase'],
      },
    ],
    
    // TypeScript 相关规则
    '@typescript-eslint/consistent-type-imports': 'error',
    
    // JSDoc 相关规则
    'jsdoc/require-jsdoc': 'off', // 暂时关闭，可根据需要开启
    'jsdoc/check-alignment': 'error', // 检查 JSDoc 注释对齐
    'jsdoc/check-syntax': 'error', // 检查 JSDoc 语法
    'jsdoc/tag-lines': ['error', 'any', { 
      'startLines': 1, 
      'endLines': 0 
    }], // 控制 JSDoc 标签换行
    
    // 终端 UI 应用特殊规则
    'no-console': 'off', // 终端应用可能需要使用 console
  },
})