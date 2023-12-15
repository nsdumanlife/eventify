class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  get Info() {
    return `${this.name} age is ${this.age}`
  }
}
const person = new Person('johns', 34)
console.log(person.Info)
console.log(person.Info)
