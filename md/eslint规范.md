# ESLint 规范

## 项目概述
本项目采用 Anthony Fu (antfu) 的 ESLint 配置，适用于 React + TypeScript + React Ink + Zod + dayjs + xe-utils 项目。

Anthony Fu (antfu) 是一位知名的前端开发者，他的 ESLint 配置提供了一套现代化、合理的 ESLint 规则集合，无需繁琐的配置即可获得高质量的代码规范。

## 配置说明

### 1. 安装依赖

```bash
# 安装 antfu 的 ESLint 配置
pnpm i -D eslint @antfu/eslint-config

# 或者使用 dlx 命令（临时安装）
pnpm dlx @antfu/eslint-config@latest
```

该配置会自动安装所需的相关依赖。

### 2. 配置文件

根据 antfu 配置的官方文档，有几种配置方式：

#### 方式一：使用 JavaScript 配置
```javascript
// .eslintrc.cjs
module.exports = {
  extends: [
    '@antfu',
  ],
  rules: {
    // 个性化规则配置
    // 例如，如果你希望禁用某些规则
    // 'no-console': 'warn',

    // 对于 React 项目的特殊配置
    'react-hooks/exhaustive-deps': 'error',
    'react/react-in-jsx-scope': 'off', // React 17+ 不需要引入 React

    // TypeScript 相关配置
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',

    // 对于终端 UI 项目的特殊考虑
    'no-console': 'off', // 终端应用可能需要使用 console
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
```

#### 方式二：使用 JSON 配置
```json
{
  "extends": "@antfu"
}
```

#### 方式三：使用 package.json
```json
{
  "eslintConfig": {
    "extends": "@antfu"
  }
}
```

### 3. 针对 React + TypeScript + React Ink 项目的扩展配置

如果需要针对我们的技术栈做额外配置，可以使用以下配置：

```javascript
// .eslintrc.cjs
module.exports = {
  extends: [
    '@antfu',
  ],
  // 如果需要使用 JSX 或 React 相关规则
  plugins: [
    'react',
  ],
  env: {
    node: true,
    browser: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
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
        callbacksLast: true,
        shorthandFirst: true,
        multiline: 'ignore',
        noSortAlphabetically: false,
        reservedFirst: true,
      }
    ],

    // 字符串使用双引号
    'quotes': ['error', 'double'],

    // 单行最大长度限制
    'max-len': ['error', { code: 80 }],

    // 对象键排序
    'sort-keys': ['error', 'asc', { caseSensitive: true, natural: false }],

    // 强制使用驼峰命名
    '@typescript-eslint/camelcase': 'off', // 使用新的规则名
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

    // 强制静态 class 名按字母排序（对于 React 组件）
    // 注意：ESLint 本身没有直接检查 className 排序的规则
    // 可能需要额外的插件或自定义规则来实现

    // JSX 属性排序规则
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

    // JSDoc 相关规则
    'jsdoc/require-jsdoc': 'off', // 暂时关闭，可根据需要开启
    'jsdoc/check-alignment': 'error', // 检查 JSDoc 注释对齐
    'jsdoc/check-syntax': 'error', // 检查 JSDoc 语法
    'jsdoc/tag-lines': ['error', 'any', {
      startLines: 1,
      endLines: 0
    }], // 控制 JSDoc 标签换行

    // 终端 UI 应用特殊规则
    'no-console': 'off', // 终端应用可能需要使用 console
  },
}
```
```

## antfu 配置的特点

### 代码风格
- 使用 Prettier 进行代码格式化
- 2 空格缩进
- 使用双引号（根据项目规范）
- 行末无分号
- 使用箭头函数
- 优先使用 const 和 let，避免 var

### TypeScript 集成
- 自动启用 TypeScript 支持
- 推荐的 TypeScript 规则
- 与 Prettier 的良好集成

### 现代化规则
- 鼓励使用现代 JavaScript 特性
- 避免过时的语法和模式
- 推荐合理的最佳实践

## 规范内容

### 代码风格
- 使用 Prettier 进行代码格式化（antfu 配置已包含）
- 2 空格缩进
- 使用双引号（而非单引号）
- 行末无分号
- 使用箭头函数
- 优先使用 const 和 let，避免 var
- 单行代码限制在 80 个字符以内

### TypeScript 规范
- 优先使用接口（interface）而非类型别名（type）
- 为函数参数和返回值提供明确的类型注解
- 使用泛型增强类型安全性
- 优先使用不可变数据结构
- 对象的键按字母顺序排序，不可重复
- 强制使用驼峰命名，组件也使用小写字母开头的驼峰命名法（如 myComponent）

### React 规范
- 使用函数组件和 Hooks
- 正确使用 useEffect 的依赖数组
- 避免在渲染期间产生副作用
- 使用 React.memo 优化性能
- 合理使用 Context

### JSX 属性排序规范
- 组件 props 排序规则：
  1. 必需的 props 在前，可选的在后
  2. 按字母顺序排序
  3. 事件处理函数以 on 前缀结尾，如 onClick, onChange
- 具体排序原则：
  1. 元素标识（key, ref）
  2. 渲染控制（dangerouslySetInnerHTML）
  3. 条件渲染（hidden）
  4. 表单属性（value, name, type 等）
  5. 事件处理器（onClick, onChange 等）
  6. 样式与布局（className, style, id）
  7. 无障碍性（aria-*, role）
  8. 其他属性（data-*, title, alt 等）

### JSDoc 注释规范
- JSDoc 块注释规范：多行 JSDoc 必须为多行格式，其他尽可能单行
- 单行 JSDoc 示例：
  ```javascript
  /** 简单的函数描述 */
  ```
- 多行 JSDoc 示例：
  ```javascript
  /**
   * 复杂函数的详细描述
   * 可以包含多行内容
   * 说明函数的功能和用途
   * @param {string} param1 - 参数描述
   * @param {number} param2 - 参数描述
   * @returns {boolean} 返回值描述
   */
  ```

### 代码风格规范
- 强制静态 class 名按字母顺序排序
- 静态 class 名排序示例：
  ```jsx
  // ✅ 正确 - 按字母顺序排序
  <div className="alert button container dialog form header input label modal navigation sidebar table utility" />

  // ❌ 错误 - 未按字母顺序排序
  <div className="container button alert" />
  ```

### React Ink 专用规范
- 组件应适当地响应终端尺寸变化
- 正确处理键盘事件和用户输入
- 使用 ink 提供的组件进行布局（Box, Text 等）
- 遵循终端 UI 的可访问性原则

### Zod 规范
- 为 API 响应和外部数据定义验证 schema
- 在运行时进行数据验证
- 使用 z.infer 从 schema 推导 TypeScript 类型
- 合理使用 Zod 的错误处理机制

### dayjs 规范
- 统一日期时间处理方式
- 使用相对时间格式化功能
- 避免使用原生 Date 对象
- 合理处理时区转换

### xe-utils 规范
- 利用工具库进行数据处理
- 避免重复造轮子
- 注意性能优化，选择合适的工具函数

## 特殊注意事项

### 终端 UI 项目的特殊考虑
- console 输出在终端应用中是常见的
- 键盘事件处理需要特别注意
- 界面更新逻辑不同于 Web 应用

### 与 Ink 的兼容性
- 避免使用 Web 特有的 API
- 注意终端渲染的性能影响
- 正确处理异步更新

## 常用命令

```bash
# 检查代码规范
pnpm lint

# 修复可自动修复的问题
pnpm lint --fix
```

## IDE 集成

### VS Code 推荐插件
- ESLint
- Prettier
- TypeScript Importer
- Bracket Pair Colorizer

### 配置自动修复
在 VS Code 中启用保存时自动修复：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## 项目特定规则

针对 Android TUI 项目的特殊规则：

1. **数据验证**: 所有来自外部的数据必须使用 Zod 进行验证
2. **类型安全**: 所有函数应有明确的类型签名
3. **组件设计**: 终端 UI 组件应具有良好的可访问性
4. **错误处理**: 适当处理异步操作和数据验证错误
5. **性能**: 避免不必要的重渲染和计算

## 维护说明

- 定期更新 ESLint 配置至最新版本
- 根据项目发展调整个性化规则
- 团队成员需遵循此规范
- 代码审查时重点关注规范遵守情况
