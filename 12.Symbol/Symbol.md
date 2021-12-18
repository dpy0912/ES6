# Symbol

## 概述

ES5的对象属性名都是字符串，这容易造成属性名的冲突，比如，你使用了一个他人提供的对象，但是又想为这个属性添加方法（mixin模式），新方法的名字就有可能和现有的方法产生冲突，如果有一种机制，**保证每个属性名都是独一无二的**，这样就从根本上防止属性名的冲突。这就是ES6引入`Symbol`的原因。

ES6引入了一个新的**原始数据类型`Symbol`，表示独一无二的值**，他是JavaScript语言的第七种数据类型，前六种是`string`，`undefined`，`Number`，`Boolean`，`null`和`Object`。

**Symbol值是由`Symbol`函数生成**，这就是说，**对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的Symbol类型**，凡是属性名属于Symbol类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

```javascript
let s = Symbol();
console.log(typeof s === "symbol"); // true
```

上面代码中，`s`就是一个独一无二的值，`typeof`运算的结果表明变量`s`是Symbol的数据类型，而不是字符串之类的其他数据类型。

注意，**`Symbol`函数不能使用new命令构造**，否者就会报错，这是因为Symbol是原始的数据类型，而不是对象，也就是说，**`Symbol`值不是对象，所以不能添加属性**，基本是，他是一种类似于字符串的数据类型。
