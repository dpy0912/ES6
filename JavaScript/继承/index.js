/*
 * @Author: mikey.zhaopeng 
 * @Date: 2022-03-Su 11:42:12 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2022-03-Su 11:42:12 
 */
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2022-03-Su 11:42:12 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2022-03-Su 11:42:12 
 */
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2022-03-Su 11:42:10 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2022-03-Su 11:42:10 
 */
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2022-03-Su 11:42:10 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2022-03-Su 11:42:10 
 */
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2022-03-Su 11:42:06 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2022-03-Su 11:42:06 
 */
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2022-03-Su 11:42:05 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2022-03-Su 11:42:05 
 */
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2022-03-Su 11:41:47 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2022-03-Su 11:41:47 
 */
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2022-03-Su 11:37:10 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2022-03-Su 11:37:10 
 */
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2022-03-Su 11:37:10 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2022-03-Su 11:37:10 
 */
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2022-03-Su 11:36:24 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2022-03-Su 11:36:24 
 */
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2022-03-Su 11:17:28 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2022-03-Su 11:17:28 
 */
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2022-03-Su 11:17:27 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2022-03-Su 11:17:27 
 */
/*
 * @Author: bugdr 
 * @Date: 2022-03-Su 11:02:56 
 * @Last Modified by:   bugdr 
 * @Last Modified time: 2022-03-Su 11:02:56 
 */
/*
 * @Author: bugdr 
 * @Date: 2022-03-Su 11:02:55 
 * @Last Modified by:   bugdr 
 * @Last Modified time: 2022-03-Su 11:02:55 
 */
/*
 * @Author: bugdr 
 * @Date: 2022-03-Su 11:02:54 
 * @Last Modified by:   bugdr 
 * @Last Modified time: 2022-03-Su 11:02:54 
 */
/*
 * @Author: bugdr 
 * @Date: 2022-03-Su 11:01:28 
 * @Last Modified by:   bugdr 
 * @Last Modified time: 2022-03-Su 11:01:28 
 */
/*
 * @Author: bugdr 
 * @Date: 2022-03-Su 11:01:13 
 * @Last Modified by:   bugdr 
 * @Last Modified time: 2022-03-Su 11:01:13 
 */
/*
 * @Author: bugdr 
 * @Date: 2022-03-Su 10:57:28 
 * @Last Modified by:   bugdr 
 * @Last Modified time: 2022-03-Su 10:57:28 
 */
/*
 * @Author: bugdr 
 * @Date: 2022-03-Su 10:57:25 
 * @Last Modified by:   bugdr 
 * @Last Modified time: 2022-03-Su 10:57:25 
 */
/*
 * @Author: bugdr 
 * @Date: 2022-03-Su 10:55:38 
 * @Last Modified by:   bugdr 
 * @Last Modified time: 2022-03-Su 10:55:38 
 */
/*
 * @Author: bugdr 
 * @Date: 2022-03-Su 10:55:36 
 * @Last Modified by:   bugdr 
 * @Last Modified time: 2022-03-Su 10:55:36 
 */
// ???????????????
// function SuperType() {
//     this.property = true
// }

// SuperType.prototype.getSuperValue = function () {
//     return this.property
// }

// function SubType() {
//     this.subproperty = false;
// }

// // ??????SuperType????????????????????????????????????SubType.prototype
// SubType.prototype = new SuperType()

// SubType.prototype.getSubValue = function () {
//     return this.subproperty
// }

// const test = new SubType()

// console.log(test.getSuperValue()) // true

// ???????????????
// function SuperType() {
//     this.color = ["red", "green", "blue"]
// }

// function SubType() {}

// // ??????SuperType????????????????????????????????????SubType.prototype
// SubType.prototype = new SuperType()

// const test = new SubType()
// test.color.push("block")
// console.log(test.color) // [ 'red', 'green', 'blue', 'block' ]

// const test1 = new SubType()

// console.log(test1.color) // [ 'red', 'green', 'blue', 'block' ]

/* 
????????????
*/

// function SuperType() {
//     this.color = ["red", "green", "blue"]
// }

// function SubType() {
//     // ????????????????????????????????????
//     SuperType.call(this)
// }

// const test = new SubType()
// test.color.push("block")
// console.log(test.color) // [ 'red', 'green', 'blue', 'block' ]

// const test1 = new SubType()
// console.log(test1.color) // [ 'red', 'green', 'blue' ]


/**
 * ????????????
 */
// function SuperType(name) {
//     this.name = name
//     this.color = ['red', 'green', 'blue']
// }

// SuperType.prototype.sayName = function () {
//     console.log(this.name)
// }

// function SubType(name, age) {
//     // ????????????
//     // ???????????????SuperType
//     SuperType.call(this, name)
//     this.age = age
// }

// // ????????????
// // ????????????
// SubType.prototype = new SuperType()
// // ??????SubType.prototype ???constructor????????????????????????????????????
// SubType.prototype.constructor = SubType
// SubType.prototype.sayAge = function () {
//     console.log(this.age)
// }

// const test1 = new SubType("bugdr", 27)
// test1.color.push("block")
// console.log(test1.color) // [ 'red', 'green', 'blue', 'block' ]
// test1.sayName() // bugdr
// test1.sayAge() // 27

// const test2 = new SubType("bugdr1", 28)
// console.log(test2.color) // [ 'red', 'green', 'blue' ]
// test2.sayName() // bugdr1
// test2.sayAge() // 28

/**
 * ???????????????
 */
// function object(obj) {
//     function F() {}
//     F.prototype = obj
//     return new F()
// }

// const person = {
//     name: "bugdr",
//     friends: ["Shelby", "Court", "Van"]
// }
// const anotherPerson = object(person)

// anotherPerson.name = "bugdr1"
// anotherPerson.friends.push("mo")

// const yetAnotherPerson = new object(person)

// yetAnotherPerson.name = "bugdr2"
// yetAnotherPerson.friends.push("mo1")

// console.log(person.friends) // [ 'Shelby', 'Court', 'Van', 'mo', 'mo1' ]

/**
 * ???????????????
 */

// function object(obj) {
//     function F() {}
//     F.prototype = obj
//     return new F()
// }

// function createAnother(original) {
//     const clone = object(original) // ???????????? object() ???????????????????????????
//     clone.sayHi = function () { // ??????????????????????????????
//         console.log("hi")
//     }
//     return clone // ??????????????????
// }

// const person = {
//     name: "bugdr",
//     friends: ["Shelby", "Court", "Van"]
// }

// const anotherPerson = createAnother(person)
// anotherPerson.sayHi() // hi

/**
 * ?????????????????????
 */
// function inheritPrototype(subType, superType) {
//     const prototype = Object.create(superType.prototype) // ?????????????????????????????????????????????
//     prototype.constructor = subType
//     subType.prototype = prototype
// }

// // ???????????????????????????????????????
// function SuperType(name) {
//     this.name = name
//     this.colors = ["red", "blue", "green"];
// }

// SuperType.prototype.sayName = function () {
//     console.log(this.name)
// }

// // ???????????????????????????????????????????????????
// function SubType(name, age) {
//     SuperType.call(this, name)
//     this.age = age
// }

// // ???????????????????????????
// inheritPrototype(SubType, SuperType)

// // ???????????????????????????
// SubType.prototype.sayAge = function () {
//     console.log(this.age)
// }

// const test1 = new SubType("bugdr", 18)
// const test2 = new SubType("bugdr1", 18)
// test1.colors.push("2")
// test1.colors.push("3")
// console.log(test1.colors) // [ 'red', 'blue', 'green', '2', '3' ]

/**
 * ??????????????????????????????
 */

// function MyClass() {
//     SuperClass.call(this)
//     OtherSuperClass.call(this)
// }

// // ???????????????
// MyClass.prototype = Object.create(SuperClass.prototype)
// // ????????????
// Object.assign(MyClass.prototype, OtherSuperClass.prototype)
// // ????????????constructor
// MyClass.prototype.constructor = MyClass

// MyClass.prototype.myMethod = function () {
//     // code
// }

/**
 * extends??????
 */
// class Rectangle {
//     constructor(height, width) {
//         this.height = height
//         this.width = width
//     }

//     // get
//     get area() {
//         return this.calcArea()
//     }

//     // method
//     calcArea() {
//         return this.height * this.width
//     }
// }

// const rectangle = new Rectangle(10, 6)
// console.log(rectangle.area) // 60

// // ????????????
// class Square extends Rectangle {
//     constructor(length) {
//         super(length, length)
//         this.name = "Square"
//     }

//     get area() {
//         return this.height * this.width
//     }
// }

// const square = new Square(10)
// console.log(square.area) // 100

// function _inherits(subType, superType) {
//     // ????????????
//     // ????????????
//     // ????????????
//     subType.prototype = Object.create(superType && superType.prototype, {
//         constructor: {
//             value: subType,
//             enumerable: false,
//             writable: true,
//             configurable: true
//         }
//     })

//     if (superType) {
//         Object.setPrototypeOf ? Object.setPrototypeOf(subType, superType) : subType.__proto__ = subType
//     }
// }

console.log(1 + true + "1")