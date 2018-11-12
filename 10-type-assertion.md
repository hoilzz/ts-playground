# Type Assertion, Type alias

## type assertion

- 형변환과는 다름
    - 형변환은 실제 데이터 구조를 바꿈
- '타입이 이것이다' 라고 컴파일러에게 알려주는 것을 의미
    - __그래서 행동에 대해 작성자가 100% 신뢰하는 것이 중요__
- 문법으로는 2가지 방법
    - 변수 as 강제할 타입
    - <강제할 타입> 변수

```typescript
let someValue: any = 'this is a string';

let strLength: number = (<string>someValue).length;
let strLength: number = (someValue as string).length;
```

## type alias

- 인터페이스와 비슷해보임
- Primitive, Union Type, Tuple
- 기타 직접 작성해야하는 타입을 다른 이름을 지정
- 만들어진 타입의 refer로 사용하는 것이지 타입을 만드는거 아님

```typescript

```

## union type

- 이거 될 수 있고, 이거도 될 수 있다
- any랑 비슷하지만 any보다 더 구체적

```typescript
type StringOrNumber = string | number;

let b: StringOrNumber;

b = 'str';
b = 0;
```

## type alias 와 Interface 차이점

### interface와의 차이점

#### 차이점 1

```typescript
type  Alias = { num: number }

interface Interface {
    num: number;
}

declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;

/**
 * 둘의 차이점은 타입에 대해 뭔가 잘못됐을 때
 * 1. type alias는 object literal type으로
 * 2. interface는 Interface로
 * /
```

#### 차이점 2



```typescript

```
