# 7. 클래스

JS에서는 재사용 가능한 컴포넌트를 만들기 위해 함수와 프로토 타입 기반의 상속을 사용

## 상속

상속을 사용하여 기존 클래스를 확장하여 새로운 클래스를 생성

```ts
class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
```

Dog는 extends를 사용하여 Animal 기본 클래스에서 유래된 파생클래스
파생클래스는 _하위 클래스_ , 기본 클래스는 _슈퍼 클래스_ 라고 함

## Public, private, protected

- public: 자유롭게 접근
- private: 클래스의 외부에서는 접근 불가
- protected
  - private과 유사하게 동작
  - 단, 파생 클래스의 인스턴스에서 접근 가능

## 매개변수 프로퍼티

__매개변수 프로퍼티__ 를 사용하여 멤버를 생성, 초기화를 한곳에서 할 수 있음

```ts
// class Octopus {
//     readonly name: string;
//     readonly numberOfLegs: number = 8;
//     constructor (theName: string) {
//         this.name = theName;
//     }
// }

class Octopus {
  readonly numberOfLegs: number = 9;
  constructor(readonly name: string) {}
}
```

매개변수 프로퍼티는 
- 접근 지정자(accessibility modifier)
- readonly 또는
- 둘 모두로 생성자 매개변수를 접두어로 붙여 선언

매개 변수 프로퍼티에
- private을 사용하면 private 멤버가 선언되고 초기화
- 마찬가지로 public와 protected 그리고 readonly도 동일

## 접근자

```ts
class Employee {
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    this._fullName = newName;
  }
}

const e1 = new Employee();
e1.fullName = 'hoil';
console.log('e1.fullName: ', e1.fullName);
```

getter/setter
- ES5이상에서 가능
- get, set을 가진 접근자는 자동 `readonly`로 추론

## 정적 프로퍼티

인스턴스는 인스턴스화 될 때 객체에서 나타남
인스턴스가 아닌 클래스 자체에 볼 수 있는 __static 멤버__ 도 생성 가능

얘는 알고 있으니까 pass

## abstract class

추상클래스는 다른 클래스가 파생될 수 있는 기본 클래스
- 직접 인스턴스화 불가능
- 인터페이스와 달리 추상클래스는 클래스 멤버에 대한 __구현 세부 정보 포함 가능__

```ts
abstract class Animal {
  abstract makeSound(): void;
  move(): void {
    console.log('roaming the earth..');
  }
}
```

```ts
abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log("Department name: " + this.name);
    }

    abstract printMeeting(): void; // 파생된 클래스에서 구현해야 합니다.
}

class AccountingDepartment extends Department {

    constructor() {
        super("Accounting and Auditing"); // 파생된 클래스의 생성자는 super()를 호출해야합니다.
    }

    printMeeting(): void {
        console.log("The Accounting Department meets each Monday at 10am.");
    }

    generateReports(): void {
        console.log("Generating accounting reports...");
    }
}

let department: Department; // abstract 타입에 대한 참조 생성
department = new Department(); // 오류: 추상 클래스의 인스턴스를 생성할 수 없음
department = new AccountingDepartment();
department.printName();
department.printMeeting();
department.generateReports(); // 오류: abstract 타입으로 선언된 메서드가 없음
```

## Advanced Techiniques

### 생성자 함수

TS에서 클래스 선언시 실제로 여러 선언이 동시에 생성됨. 

```ts
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return `Hello ${this.greeting}`;
  }
}

let greeter: Greeter;
greeter = new Greeter("world");
console.log(greeter.greet());
```

클래스 선언시 생성되는 두 가지

1. 클래스의 인스턴스를 나타내는 타입:  `let greeter: Greeter`는 Greeter 클래스의 인스턴스 타입으로 `Greeter`를 사용한다는 의미
2. _생성자 함수_ 라고 불리는 또 다른 값을 생성.
이것은 클래스의 인스턴스를 `new`할 때 호출되는 함수


```ts
class Greeter {
    static standardGreeting = "Hello, there";
    greeting: string;
    greet() {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter.standardGreeting;
        }
    }
}

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet());

let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet());
```

greetMaker라는 변수는 `typeof Greeter`를 사용
- __즉 인스턴스 타입이 아닌 `Greeter` 클래스 자체의 타입을 제공__
- 정확하게 생성자 함수의 타입인 `Greeter`라는 symbol 타입을 제공
- 이 타입에는 `Greeter` 클래스의 인스턴스를 생성하는 생성자와 함께 Greeter의 모든 스태틱 멤버가 포함됨

## 요약

### 상속

상속을 사용하여 기존 클래스를 확장한 새로운 클래스 생성

- extends를 사용하여 기본클래스에서 유래된 파생클래스
- 파생클래스는 하위클래스, 기본 클래스는 슈퍼클래스

### public, private, protected

C++ 과 똑같

### 매개변수 프로퍼티

멤버를 생성, 초기화를 한곳에 하려면 매개변수 프로퍼티 이용

```ts
class Point {
  constructor(name: string, )
}
```

### 접근자

getter/setter

```ts
class Employee {
  constructor(private _fullName: string){}
  get fullName(): string {
    return this._fullName;
  }
  set fullName(newName: string): string {
    this._fullName = newName
  }
}
```

### 정적 프로퍼티

static, 얘는 알고 있으니까 패스

### abstract class

추상클래스는 다른 클래스가 파생될 수 있는 기본 클래스
- 직접 인스턴스화 불가능
- 인터페이스와 달리 추상클래스는 클래스 멤버에 대한 __구현 세부 정보 포함 가능__

파생된 클래스의 생성자는 super()를 호출해야함

```ts
abstract class Point {
  constructor(private x: number, private y: number) { }

  printLocation() {
    console.log(`current Location ${this.x}, ${this.y}`);
  }

  abstract printDotName(): void // 파생클래스에서 구현해야하니까 void
}

class Square extends Point {
  constructor(x: number = 0, y: number = 0) {
    super(x, y);
    console.log("Square is created");
  }

  printDotName() {
    console.log("this is Square");
  }

  imposibbleCall() {
    console.log('error..');
  }
}
const s1: Point = new Square(10, 10);
s1.printDotName();
s1.imposibbleCall(); // Point 추상 클래스에서 존재하지 않는 함수 호출하므로 에러
s1.printLocation();
```

## 생성자 함수

TS에서 클래스 선언시 2가지가 생성됨
1. 클래스의 인스턴스를 나타내는 타입 (예시에서는 Greeter라는 인스턴스 타입 생성)
2. 생성자 함수