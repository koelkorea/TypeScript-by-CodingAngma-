// [TypeScript 함수(function)]
//  : 함수 표현식이 아닌 함수 선언(function)에 대한 이야기로 ()안의 내용은 파라미터의 타입 의미, 그 밖은 결과물 return값의 타입 의미
//      -> 굳이 인터페이스가 없더라도 함수 선언(function)는 정의 가능하다는거 잊지 말자

//      ex) function 함수명(파라미터명1 : 타입명, ... , 파라미터명n : 타입명) : 타입명 { 내용 };

//  # '프로퍼티명? : 타입명' 과 같이 ?를 써주면 있어도 좋고 없어도 그만이라는 의미가 됨
//      -> 단! ?가 붙는 파라미터에 대한 선언은 뒤로 몰라놔야함 (함수 오버로딩 인식에 영향)

//      ex) X : function person(name? : string, age : naumber) : string { 내용 };
//          O : function person(name : string, age? : naumber) : string { 내용 };

//  # 하나의 변수에 두개의 타입이 올수 있도록 정의도 타입스크립트에서 OR을 의미하는 | (유니언 타입)를 통해서 가능

//      ex) function person(name : string | undefined, age : naumber) : string { 내용 };

//  # 함수에 객체의 프로퍼티를 return값의 this로 사용하는 경우, 선언시 파라미터에 'this : 객체인터페이스명'으로 기입하여 사용가능
//      -> (주의) 
//          1) 그렇다고 this에 대한 선언까지 진짜 함수 실행 코드에서 파라미터로 입력하진 않는다
//          2) 객체를 파라미터로 넣고 싶으면, 'this:객체인터페이스명' -> '파라미터명:객체인터페이스명'으로 넣으면 됨
//          3) 물론 this에 실제 연결될 객체는 bind같은걸 써서 직접 설정해야 함

//      ex) function example ( this : User, param1 : string, param2 : number ) { return this.name + param1 };
//          -> (객체를 정식 파라미터로 넣고 싶은 경우)
//              function example ( person : User, param1 : string, param2 : number ) { return person.name + param1 };

//  # (중요!) return값의 경우 | (유니언 타입) 를 통해 복수타입 처리문을 인식은 하고 내용상 출력내용에 분기처리를 해줘도, TS상에서 어떻게 처리할지 모르겠다는 에러문을 띄움
//      -> 프로그래머가 이 경우 하나하나 오버로딩을 추가적으로 해주는수 밖에 없음 
//          -> (주의) 오버로딩을 위해서는 마지막에 이 모든 오버로딩 조건을 포함한 선언문도 필요하다 (|을 통한 내용의 전체 분기를 하나하나 설명해줘야 한다는 뜻)

//      ex) function ex(param1: string, param2: number) : SomeObj;   // 오버로딩 경우의수1 
//          function ex(param1: string, param2: string) : string;  // 오버로딩 경우의수2
//          function ex(param1: string, param2: string | number) : SomeObj | string { 내용 분기 };   //  오버로딩 경우의 수들을 포괄한 함수 본체

//---------------------------------------------------------------------------------------------------------------------
// ex) function 예시
function hello(age : number | undefined, name? : string) : string {      // age는 number나 undefined 둘 다 받는 파라미터, name은 string만 받으며, return값은 string
    if(age !== undefined) {
        return `Hello, ${name}. You are ${age}`;
    }

    return `Hello, ${name}.`;
}

console.log( hello(30, "Sam") );            // Hello, Sam. You are 30.
console.log( hello(undefined, "Sam") );     // Hello, undefined. You are 30.

//---------------------------------------------------------------------------------------------------------------------
// ex) function 예시 with rest parameter
function sum(... nums : number[] ) {     // rest parameter를 배열로 뭉뚱그려 처리도 가능하며, return값은 number지만 생략가능
    return nums.reduce( (result, num) => result + num, 0);
}

sum(1,2,3,4,5,6,7,8,9,10);      // 55

//---------------------------------------------------------------------------------------------------------------------
// ex) this값이 존재하는 function 예시
interface User1 {
    name : string;
}

const Sam : User1 = { name : 'Sam' };

// this의 타입을 User를 베이스로 한 객체를 참고하도록 설정
function showName( this : User1, age : number, gender : 'm' | 'f' ) {
    console.log(this.name);     // 하지만 interface를 참고할 수는 없으므로, call, apply, bind같은걸로 직접 참고할 객체설정은 해줘야 함
    console.log(age);
    console.log(gender);
}

showName.call(Sam, 30, 'm');    //  Sam  30  m

//---------------------------------------------------------------------------------------------------------------------
// ex) (중요) 함수 오버로딩이 필요한 경우
interface User2 {
    name : string;
    age : number;
}

// return문이 복수 타입이면, 그에 맞는 경우를 다음과 같이 하나하나 오버로딩을 해줘야 함
function join(name: string, age: number) : User2;   // 오버로딩 경우의수1 : age가 number면 User2를 출력
function join(name: string, age: string) : string;  // 오버로딩 경우의수2 : age가 string면 string를 출력
function join(name: string, age: string | number) : User2 | string {    // |를 통한 파라미터와 return문의 타입을 포괄하는 함수 선언문이 있어야, 상단의 오버로딩을 다 포괄 가능
    if (typeof age === 'number') {
        return {
            name,
            age,
        };
    } else {
        return "나이는 숫자로 입력해라";
    }
}

const sam : User2 = join("Sam", 30);         // "name" : sam, "age": 30
const jane : string = join("jane", "30");    // 나이는 숫자로 입력해라

console.log( sam );
console.log( jane );

//---------------------------------------------------------------------------------------------------------------------

