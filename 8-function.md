# 함수

함수는 작업 방법을 설명하는데 중요한 역할

## 함수의 타입

### 함수 작성하기

```typescript
function add(x: number, y: number): number {
  return x + y;
}
```

- 각 매개변수에 타입 추가
- 반환타입은 선택적 생략 가능

### 함수 타입 작성하기

함수의 전체 타입 작성해보기

```ts
let myAdd: (baseValue: number, increment:number) => number =
  function(x: number, y:number): number { return x + y; };
```

함수는 다음 2가지를 가짐
- 인수 타입
- 반환 타입
  - `=>`를 이용하여 반환 타입 명시
  - 함수 타입의 필수 부분이라 반환 값이 없는 경우 `void` 명시

## 타입 추론

ts 한쪽에는 타입이 있지만 다른 한쪽에 타입이 없는 경우 
타입 추론의 한 종류인 Contextual Typing

```ts
// myAdd는 완벽하게 함수 타입을 가지고 있습니다.
let myAdd = function(x: number, y: number): number { return  x + y; };

// 매개변수 'x'와 'y'에는 number 타입이 있습니다.
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };
```

## 선택적 매개변수와 기본 매개변수

ts에서는 모든 매개변수가 함수에 필요하다고 가정
- 이것은 `null` 또는 `undefined`가 주어질 수 없다는 것을 의미하는게 아님
- 함수가 호출될 때 각 매개변수에 값을 제공했는지 확인

```ts
function buildName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

buildName('hoil', 'jung');
buildName('hoil', 'jung', 'cc'); // error 2개 인자를 기대, 3개 아님
```

매개변수 선택적 사용하기

```ts
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
```

- 선택적 매개변수는 필수 매개변수 뒤에 와야함

### 기본 매개 변수 사용하기

```ts
function buildName(lastName = "Smith", firstName: string) {
    return firstName + " " + lastName;
}
```

기본 매개변수는 필수 매개변수 뒤에 나올 필요 없음

## overloads

JS 함수가 전달된 인수 형태를 기반으로 서로 다른 타입의 객체를 반환할 수 있는 동적인 언어

```ts
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x): any {
    // 객체 / 배열로 작업하고 있는지 확인해보세요
    // 그렇다면 그것들은 덱을 주고 사용자는 카드를 선택할 것입니다.
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // 그렇지 않으면 카드를 선택하게하세요.
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```

`pickCard` 함수는 사용자가 전달한 인자에 따라 2개의 서로 다른 내용을 반환
- deck을 나타내는 객체 전달시 함수가 card 반환
- card 선택시 선택한 card를 알려줌

이것을 오버로드 하려면 __동일 함수에 대해 여러 함수 타입을 제공하면 됨__

- 이 목록은 컴파일러가 함수 호출을 해결하는 데 사용
- `pickCard`가 받아들일 수 있는 것과 그것이 반환하는 것을 기술한 오버로드 목록 작성

```ts
function pickCard(x: {suit: string; card: number }[]): number;
function pickCard(x: number): {suit: string; card: number;};
function pickCard(x): any {
    // 객체 / 배열로 작업하고 있는지 확인해보세요
    // 그렇다면 그것들은 덱을 주고 사용자는 카드를 선택할 것입니다.
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // 그렇지 않으면 카드를 선택하게하세요.
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
```

__오버로드가 `pickCard` 함수에 대한 타입-체크 호출 제공__

컴파일러는 오버로드 목록을 살펴보고 제공된 매개변수를 사용하여 첫 번쨰 오버로드 시도
- 일치 하는 것 찾으면 이 오버로드를 올바른 오버로드로 선택
- `function pickCard(x): any`는 오버로드 목록이 아님 (즉 위 예제에서 오버로드 목록은 2개만 있음)

## Summary

함수는 
- 인수 타입
- 반환 타입
을 가진다.

```ts
let myAdd = function(x: number, y: number): number { return  x + y; };
```

매개변수 선택적 사용 가능
- argument?: type

```ts
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
```

함수 overload 선언 가능