# 5. ts-basic

- __사용자가 만든 타입은 결국 이 기본 자료형으로 쪼개진다.__

- 프밍 도울 몇가지 타입
    - Any : 적폐..
    - Void 
    - Never 
    - 주로 위 3가지는 함수에서 리턴시 사용

## primitive type

## literal

- 값자체가 변하지 않는 값
- 상수와 다른 것은 상수는 가리키는 포인터가 고정이라는 것
- 리터럴은 그 자체가 값이자 그릇

## Boolean / boolean

```typescript
let isDone: boolean = false;

typeof isDone === 'boolean' // true

// Type 'boolean' is assignable to type 'Boolean'
let isOk: Boolean = true;

// Type 'Boolean' is not assignable to type 'boolean'.
// 'boolean' is a primitive, but 'Boolean' is a wrapper object.
// prefer using 'boolean' when possible
let isNotOk: boolean = new Boolean(true);
```

- 마지막 라인을 보면, wrapper object인 Boolean을 할당 불가
- ts 에서는 primitive한 값을 권장 (number 등 마찬가지)

## undefined & null are subtypes of all other types

- 모든 타입의 서브타입이다 = 대입이 가능하다
    - 예컨대 null or undefined을 string에 대입할 수 있다
- 기본설정이 이래

## null in JS

- __null 이라는 값으로 할당__ 된 것을 null
- 무언가가 있는데, 사용할 준비가 덜 된 상태

## undefined in JS

- 값을 할당하지 않은 변수는 undefined 가짐
- 무언가가 아예 준비 안된 상태
- 없는 property 부를 때 undefined

## Void

- 타입이 없는 상태
- 주로 함수의 리턴이 없을 때 사용. 그 외에 사용할 일 없음
- any와 반대의 의미

## Any

- 적폐
- 어떤 걸 넣어도 되니까
- 최대한 쓰지 않아야함. 그래야 ts 의미가 있음

## Never

- 써본적 x

## Array

- Array<타입>