// [TypeScript Literal, Union, Intersection Type]

import { getImpliedNodeFormatForFile } from "typescript";

//  - Literal Type
//      : 리터럴 타입은 변수 혹은 매개변수 등이 string이나 number 처럼 어떠한 포괄적인 타입을 가지는 것이 아니라 변수나 매개변수에 마치 const처럼 정확한 값을 설정하는 것을 의미
//        (그러니까 TS에서는 JS처럼 타입정의 없이 변수에 값을 할당해 버리면, let도 const처럼 되어버림)

//      ex) let example = 'emample';    <- 이렇게 타입 정의 없이 값을 설정하면, let도 Literal Type으로 인지되어 변조불가 판정이 남

//  - Union Type (유니언 타입) ( | )
//      : 타입스크립트에서 OR을 의미하는 연산자로 '|' 기호이며, 
//        이를 통해 특정 변수의 타입을 여러가지로 설정 가능함
//          -> 내용에 조건식을 통해, 내용을 통제 가능

//      # type
//          : | 과 조합하여, 특정 지정된 값들만 들어가게끔 조치한 타입 (이를 하나의 타입명으로 사용할 수 있음)

//  - Intersection Type (교차 타입) ( & )
//      : 타입스크립트에서 AND을 의미하는 연산자로 '&' 기호이며, 
//        이를 통해 특정 변수의 타입이 interface의 형식을 참고할 때, 다양한 interface의 형식을 전부 만족 가능
//          -> 단 언급된 interface의 모든 프로퍼티가 들어가야 에러가 안 생김

//      ex) let example : Toy & Car = { Toy 객체 interface, Car 객체 프로퍼티들이 interface 전부 포함되어야 함 };   

//      # 복수의 인터페이스 동시 확장할 때 쓰는 interface 인터페이스명 extends 인터명1, 인터명2;를 통해서도 비슷한걸 구현 가능하다
//          -> 단지 표현의 과정과 형태만 변할 뿐 

//---------------------------------------------------------------------------------------------------------------------
// ex) Literal Type 예시

// Literal Type
// let userName2 = "Tim";

// 이렇게 타입을 명시해야 Literal Type 판정을 벗어남
let userName2 : string | number = "Tim";
userName2 = 3; //  에러 : number' 형식은 'string' 형식에 할당할 수 없습니다

//---------------------------------------------------------------------------------------------------------------------
// ex) 유니언 타입 | 사용 예시

//  1) type에 사용
type Job = "police" | "developer" | "teacher";

interface User3 {
    name : string;
    job : Job;          // 기입한 임의의 type Job으로 타입명을 주는것 가능
}

const interviewee : User3 = {
    name : "Bob",
    job : "developer",  // 타입을 Job이라는 타입에 맞췄으니 type에 명시한 애들만 올 수 있음
}

//  2) 타입별 다른 메서드를 출력시
interface Home {
    name : "Home";
    color : string;
    ring() : void;
}

interface Mobile {
    name : "mobile";
    color : string;
    call() : void;
}

// 타입을 조건문으로 확인하여 분기처리를 통해, 다른 베타적 인터페이스의 메서드를 각각 사용 가능 
function getCall(where : Home | Mobile) {

    if(where.name === 'Home'){
        where.ring();
    } else {
        where.call();
    }
}


//---------------------------------------------------------------------------------------------------------------------
// ex) 교차 타입 & 사용 예시

interface Airplane {
    name : string;
    fly() : void; 
}

interface Toy {
    name : string;
    color : string;
    price : number;
}

// Airplane & Toy의 모든 프로퍼티가 와야.. (없으면 에러)
const toyPlane1 : Airplane & Toy = {
    name : "글로벌호구" ,
    fly() {} ,
    color : "blue",
    price : 1000 ,  
}

// 같은 내용을 interface의 다중상속으로 구현
interface toyPlane extends Airplane, Toy{

}

const toyPlane2 : toyPlane = {
    name : "글로벌호구" ,
    fly() {} ,
    color : "blue",
    price : 1000 ,  
}
