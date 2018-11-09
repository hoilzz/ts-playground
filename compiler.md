# 개요

디렉토리에 `tsconfig.json`이 있다면 해당 디렉토리가 TS project의 루트임을 나타냄

tsconfig.json은

- 프로젝트 컴파일시 필요한 루트 파일
- 컴파일러 옵션 지정

## tsconfig.json 사용

- **입력 파일 없이 tsc 호출** 하는 경우 컴파일러는 현재 리게토리부터 상위 디렉토리까지 `tsconfig.json`을 검색

## 예제

- `files` 속성 사용

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "sourceMap": true
  },
  "files": [
    "core.ts",
    "sys.ts",
    "types.ts",
    "scanner.ts",
    "parser.ts",
    "utilities.ts",
    "binder.ts",
    "checker.ts",
    "emitter.ts",
    "program.ts",
    "commandLineParser.ts",
    "tsc.ts",
    "diagnosticInformationMap.generated.ts"
  ]
}
```

- files는 상대적이거나 절대적인 파일경로 가짐
- include, exclude는 glob 파일 패턴의 목록과 같은 속성 가짐
    - `*` : 0개 이상의 문자와 매칭 (디렉토리 separator 제외)
    - `?` : 한 문자와 매칭 (디렉토리 separator 제외)
    - `**/` : 반복적으로 모든 하위 디렉토리와 매칭