# 7. 클래스

JS에서는 재사용 가능한 컴포넌트를 만들기 위해 함수와 프로토 타입 기반의 상속을 사용

## 상속

상속을 사용하여 기존 클래스를 확장하여 새로운 클래스를 생성

```ts
class Animal {
  move(distanceInMeters: number = 0) {

  }
}
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
- 