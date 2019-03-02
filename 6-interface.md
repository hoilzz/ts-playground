# interface

ts의 핵심원리는 값이 가지는 형태에 초점을 맞추는 __타입 체킹__
이것은 `duck typing` 또는 `구조적 하위 유형화`라고 함

```typescript
function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
```

타입 체커는 `printLabel`에 대한 호출 확인
- 해당 함수에 필요한 단일 매개변수가 있고 이는 문자열 타입의 `label` 프로퍼티를 가짐
- 실제로 객체는 이보다 더 많은 프로퍼티를 가지고 있지만
- 컴파일러는 필요한 속성이 `최소한` 있고 필요한 타입과 일치하는지만 검사

인터페이스를 이용하여 위와 동일하게 동작하는 코드 작성

```typescript
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 object"};
printLabel(myObj);
```

interface `LabelledValue`는 이전 예제의 요구사항을 설명하는데 사용할 수 있는 이름

타입 체커는 프로퍼티 순서 신경 ㄴㄴ,
- 인터페이스에 필요한 속성이 있고
- 필요한 타입만 필요하다는 점을 체크

## 선택적 프로퍼티 (?)

인터페이스의 모든 프로퍼티가 필수로 필요하진 않음
- 어떤 것은 특정 조건에서 존재하지 않을 수 있음
- option bags과 같은 패턴을 생성시 많이 사용

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number} {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" });
```

선택적 프로퍼티는 이름 끝에 `?`로 표시

## 읽기 전용 프로퍼티

일부 프로퍼티는 첫 생성시만 수정 가능해야함

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}
```

객체 리터럴을 할당하여 `Point` 구성 가능.
할당 후 x, y는 변경 불가

```typescript
let p1: Point = { x: 10, y: 20};
p1.x = 5; // cannot assign x
```

> 모든 변경 메서드가 제거된 `Array<T>`와 동일한 `ReadonlyArray<T>` 타입이 있음
> 생성 후 배열 변경하지 말아야 함

```typescript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // 오류!
ro.push(5); // 오류!
ro.length = 100; // 오류!
a = ro; // 오류!
```

마지막 줄의 `ReadOnlyArray`를 일반 배열로 다시 할당하는 것조차 불법임을 알 수 있음
- 하지만 type assertion을 통해 오버라이드 가능

```typescript
a = ro as number[];
```

> 타입 단언
> 타입 추론 기능의 한계가 있을 경우, 프로그래머가 수동으로 컴파일러에게 특정 변수에 대해 타입 힌트를 주는것
> 한계 - 실제 런타임에 존재할 변수의 타입과 다르게 추론, 너무 보수적으로 추론
> 참고 - [타입 추론과 타입 단언](https://hyunseob.github.io/2017/12/12/typescript-type-inteference-and-type-assertion/)


## 프로퍼티 초과 검사

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  // ...
}

let mySquare = createSquare({ colour: "red", width: 100 });
```

ts는 이 코드에 버그 가능성 표시
- 객체 리터럴은 다른 변수에 할당하거나, 인수에 전달시 __프로퍼티 초과 검사__ 를 거침
- 객체 리터럴에 대상 타입에 없는 프로퍼티가 있을 경우 오류 발생

```typescript
// 오류 : 'colour'는 'SquareConfig' 타입에서 필요하지 않습니다.
let mySquare = createSquare({ colour: "red", width: 100 });
```

## 함수 타입

인터페이스는 함수 타입도 형성 가능

- 호출 시그니처 제공
- `매개변수 목록`과 `반환 타입`만 주어진 함수 선언과 같음
- 매개 변수 목록의 각 매개 변수에는 `이름`과 `타입`이 필요

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
};
```

- 매개변수 이름 달라도 됨

## 인덱싱 가능 타입

`a[1]`, `ageMap['daniel']`처럼 인덱스 생성할 수 있는 타입
- 객체로 인덱싱 하는데 사용할 수 있는 타입과
- 인덱싱할 때 반환 타입을 설명하는 `인덱스 시그니처`가 있음

```ts
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```

## Class Types

### interafce 구현하기

자바에서 인터페이스 사용하는 가장 일반적인 방법은
클래스가 특정 계약을 충족하도록 명시적인 강제

```ts
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date);
}

class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constrcutor(h: number, m: number) {}
}
```

## 클래스의 스태틱과 인스턴스의 차이점

클래스가 가진 2가지 타입

1. static
2. instance

construct signature로 인터페이스를 만들고 이 인터페이스 구현하려는 클래스 생성시 오류 발생

```typescript
interface ClockConstructor {
  new (hour: number, minute: number);
}

class Clock implements ClockConstructor {
  currentTime: Date;
  constructor(h: number, m: number) {}
}
```

왜냐하면 클래스가 인터페이스를 구현할 때 클래스의 `인스턴스 측면`만 검사
생성자는 정적(static)인 측면이기 때문에 미검사

대신 클래스의 정적인 측면에서 직접 작업해야함
- 생성자를 위한 `ClockConstructor`
- 인스턴스 메서드를 위한 `ClockInterface`라는

2개의 인터페이스 정의

```typescript
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
  tick();
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
}
class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```

- createClock의 첫번째 매개변수는 `ClockConstructor` 타입이므로
  - ctor이 올바른 `생성자 시그니처`를 가지고 있는지 확인

## 인터페이스 확장

클래스처럼 인터페이스도 서로 확장 가능
- 한 인터페이스 멤버를 다른 인터페이스로 복사 가능
- 인터페이스를 재사용 가능한 컴포넌트로 분리하는 방법ㅈ을 더 유연하게 가져감

```typescript
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

let square = <Square>{};

square.color = "blue";
square.sideLengh = 10;
```

## 인터페이스 확장 클래스

인터페이스 타입이 클래스 타입을 확장하면
- 해당 클래스 멤버들을 상속하지만
- 구현을 상속하지 않음

이는 인터페이스가 구현을 제공하지 않고 클래스의 모든 멤버를 선언한 것과 같음

상속 계층 크지만 특정 프로퍼티 가진 서브 클래스에서만 코드가 작동하도록 지정하는 경우

```typescript
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() {}
}

class TextBox extends Control {
  select() {}
}

// 오류: 'Image' 타입의 'state' 프로퍼티가 없습니다.
class Image implements SelectableControl {
  select() {}
}

class Location {}
```

## Summary

### interface, 타입체커

함수 호출시 타입체커는
- 해당 함수에 필요한 매개변수가 있는지, 이 매개변수 타입이 맞는지
- 실제로 객체는 이보다 더 많은 프로퍼티를 가지지만, 컴파일러는 필요한 속성이 최소한 있는지만 검사

### 선택적 프로퍼티

인터페이스의 모든 프로퍼티가 필수는 아닐 경우
__변수명 뒤에 ? 붙이기__


### 읽기 전용 프로퍼티

일부 프로퍼티는 첫 생성시에만 수정 가능해야할 경우
__readonly 붙이기__

### 프로퍼티 초과 검사

ts는 이 코드에 버그 가능성 표시
- 객체 리터럴은 다른 변수에 할당되거나, 인수에 전달시 프로퍼티 초과 검사 거침
- 그래서 객체 리터럴에 대상 타입에 없는 프로퍼티가 있을 경우 오류 발생

### 함수 타입

인터페이스는 함수 타입도 형성 가능

- `매개변수 목록`과 `반환타입`만 주어진 함수 선언과 동일

```typescript
interface possibleFunc {
  (isPossible: boolean): boolean;
}

let myPossibleFunc: possibleFunc;
myPossibleFunc(isP: boolean): boolean => {
  //...
}
```

### 인덱싱 가능 타입

```typescript
interface User {
  [job: string]: string
}
```

### 인터페이스 구현하기

클래스가 인터페이스를 implements 할 경우 인터페이스의 스펙을 강제 구현해야됨

### 클래스의 스태틱과 인스턴스의 차이점

클래스가 인터페이스 구현시 클래스의 `인스턴스 측면`만 검사
- 생성자는 static이라 미검사

생성자 함수를 검사하기 위해, 생성자를 위한 `ClockConstructor` 인터페이스를 생성하여 createXXX 라는 생성자 함수 래퍼 함수를 만들어서 이 함수의 인자의 타입으로 `ClockConstructor`를 넣어줘서 검사


## 인터페이스 확장

클래스처럼 인터페이스도 확장 가능
- 한 인터페이스 멤버를 다른 인터페이스로 복사 가능
- 인터페이스를 `재사용 가능한 컴포넌트로 분리`하는 방법을 더 유연하게 가져감