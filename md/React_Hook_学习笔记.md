# React Hook 学习笔记

## 视频教程
- 视频链接：[React Hook 教程](https://www.bilibili.com/video/BV14r54zgESL)

## 1. React Hook 概述

React Hook 是 React 16.8 引入的新特性，允许在不编写 class 的情况下使用 state 以及其他的 React 特性。

### 优势
- 可以在函数组件中使用状态
- 更容易复用组件逻辑
- 更简洁的代码组织方式

## 2. 基础 Hook

### useState
用于在函数组件中添加状态。

```jsx
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### useEffect
用于执行副作用操作，如数据获取、订阅或手动更改 DOM。

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### useContext
接收一个 context 对象并返回该 context 的当前值。

```jsx
import React, { useState, useContext } from 'react';

const CountContext = React.createContext();

function ComponentA() {
  const count = useContext(CountContext);
  return <div>Count: {count}</div>;
}
```

## 3. 额外 Hook

### useReducer
用于复杂状态逻辑的替代方案。

```jsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
}
```

### useCallback
返回一个 memoized 回调函数。

```jsx
import React, { useState, useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <ChildComponent onClick={handleClick} />
    </div>
  );
}
```

### useMemo
返回一个 memoized 值。

```jsx
import React, { useState, useMemo } from 'react';

function CalculateExpensiveValue({ items, multiplier }) {
  const expensiveValue = useMemo(() => {
    // 执行昂贵的计算
    return items.reduce((sum, item) => sum + item.value * multiplier, 0);
  }, [items, multiplier]);

  return <div>Expensive Value: {expensiveValue}</div>;
}
```

### useRef
返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数。

```jsx
import React, { useRef, useEffect } from 'react';

function FocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} type="text" />;
}
```

### useImperativeHandle
自定义暴露给父组件的实例值。

```jsx
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));

  return <input ref={inputRef} type="text" />;
});
```

## 4. 自定义 Hook

自定义 Hook 允许我们将组件逻辑提取到可重用的函数中。

```jsx
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}

// 使用自定义 Hook
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

## 5. Hook 规则

### 规则一：只在最顶层调用 Hook
不要在循环、条件或嵌套函数中调用 Hook。

### 规则二：只在 React 函数中调用 Hook
不要在普通的 JavaScript 函数中调用 Hook。

## 6. 常见 Hook 模式

### 条件执行副作用
```jsx
useEffect(() => {
  if (shouldFetch) {
    fetchData();
  }
}, [shouldFetch]);
```

### 清理副作用
```jsx
useEffect(() => {
  const subscription = subscribeToNews(feedUrl);
  return () => {
    subscription.unsubscribe();
  };
}, [feedUrl]);
```

## 7. 性能优化

### 避免不必要的渲染
- 使用 `useMemo` 缓存计算结果
- 使用 `useCallback` 缓存回调函数
- 使用 `React.memo` 包装组件

### 合理使用依赖数组
- 确保依赖数组包含所有依赖项
- 避免不必要的依赖项导致重复执行

## 8. 最佳实践

1. 优先使用基础 Hook（useState, useEffect, useContext）
2. 对于复杂状态逻辑考虑使用 useReducer
3. 合理使用 useMemo 和 useCallback 进行性能优化
4. 创建自定义 Hook 来封装可复用逻辑
5. 遵循 Hook 规则，确保代码稳定可靠
6. 适当使用 ESLint 规则（eslint-plugin-react-hooks）来检查 Hook 的使用

## 9. 学习要点

- 理解 Hook 的工作原理
- 掌握各种内置 Hook 的使用场景
- 学会创建自定义 Hook
- 注意性能优化技巧
- 遵循最佳实践和规则