// [TypeScript Generic]
//   : 클래스 내부에서 사용할 데이터 타입을 외부에서 지정하는 기법 (java의 경우 주로 ArrayList 같이 여러 타입을 다 안고 갈수 있는 객체에 ArrayList<Integer> 이런식으로 사용해서 변수종류를 차단가능)

//      # TS에서 Generic 사용 이점 (자세한 이야기는 하단의 예시 참고)
//          : 객체 구현이나 함수 실행시 구체적으로 Generic까지 같이 써주면, 함수의 파라미터나 특정 객체의 프로퍼티의 타입을 통제할 수 있음

//          - function
//              : 함수에 들어가는 변수의 타입이 다른 경우를 상정해야 할때, 케이스마다 일일히 오버로딩을 안해도 된다는 옵션이 성립함
//          - interface
//              : 특정 프로퍼티의 타입을 객체마다 경우에 맞게 설정해서 쓰고 싶을때 그 구현을 쉽게 할 수 있음
//          - interface의 프로퍼티를 사용하는 function의 존재
//              : 선언된 Generic의 가정사항을 extends를 통해 구체적인 내용을 적어서, 더 구체적이고 안전하게 런타임 에러 방지 가능

//      # Generic 사용시 유의점
//          1. <객체명>으로 명시하는 자바와 다르게, TS는 주로 <타입명> 명시
//          2. Generic가 선언때 사용되면, 실행시도 같이 써줘야함
//          3. Generic도 상속을 사용하는게 가능하다     
//              ex) xxx <T extends 객체명 or {설정프로퍼티 : 타입명}> (param1 : T) : 타입명 { } 

//---------------------------------------------------------------------------------------------------------------------
// ex) function을 통한 Generic 사용 예시 (오버로딩 생략 가능)

// 함수에 Generic사용시에는 구체적 타입을 명시하지 않고, 임의의 이니셜 사용(진짜 아무거나 괜춘)
function getSize<T>(arr : T[] ) : number {  // Generic인 T는 파라미터의 타입을 추후 결정할 예정 -> 이를 함수 실행시 구체화시키면, 실행하는 함수는 그걸 따라간다
    return arr.length;
}

const arr1 = [1,2,3];
getSize<number | string>(arr1);  // 3       // generic도 유니언 타입을 통한 제어가 가능

const arr2 = ["a","b","c"];
getSize<string>(arr2);          // 3        // 일단 선언시 generic을 썼으면, 실행시에도 구체적인 타입명을 적어놔야 함

//---------------------------------------------------------------------------------------------------------------------
// ex) interface을 통한 Generic 사용 예시 (원하는 프로퍼티의 타입, 유동적 제어 가능)
interface CellPhone<T> {
    name : string;
    price: number;
    option : T;         // Generic을 통해 타입을 유동적으로 통제할 프로퍼티
}

// m1는 CellPhone 인터페이스를 토대로 리터럴 객체의 주소를 저자하는 인스턴스고, Generic으로 option의 타입을 object으로 지정
const m1 : CellPhone<object> = {
    name : "S23",
    price: 4444 ,
    option : {              // Generic에 따라 m1의 option은 객체타입으로 선언가능
        color : "red",
        primium : false,
    },        
};

// m1는 CellPhone 인터페이스를 토대로 리터럴 객체의 주소를 저자하는 인스턴스고, Generic으로 option의 타입을 color, primium이란 프로퍼티를 갖눈 객체로 지정
const m2 : CellPhone< {color : string, primium : boolean} > = {
    name : "G note",
    price: 4444 ,
    option : {              // Generic에 따라 m1의 option은 olor, primium이란 프로퍼티를 갖눈 객체 타입으로 선언가능
        color : "blue",
        primium : true,
    },        
};

// m3는 CellPhone 인터페이스를 토대로 리터럴 객체의 주소를 저자하는 인스턴스고, Generic으로 option의 타입을 string으로 지정
const m3 : CellPhone<string> = {
    name : "S22",
    price: 2222 ,
    option : 'good',        
};


//---------------------------------------------------------------------------------------------------------------------
// ex) interface의 프로퍼티를 사용하는 function의 존재시 Generic 사용 예시
//     (extends를 통해 Generic에 대한 가정사항을 보강, 문제 생기는 실행코드에 대한 런타임에러 사전 방지가능)
interface Shuttle {
    name : string;
    color : string;
}

interface Book {
    price : number;
}

const shuttle : Shuttle = {
    name : "dropship" ,
    color : "random"
}

const book : Book = {
    price : 1111
}

// extends를 통해 복잡한 가정사항 또한 Generic에 할당가능
//  : showName 메서드의 파라미터 data는 반드시 name파라미터가 string 타입인 객체를 상속받는 객체를 타입으로 둔다는 것을 의미...  
function showName<T extends { name : string } > (data : T) : string {
    return data.name
}

showName(shuttle);  // name 프로퍼티가 있는 Shuttle을 구현한 shuttle 객체는 showName 실행에 문제 없음

// name 프로퍼티가 없어 showName 실행에 문제를 유발하는 다음 case의 경우 런타임까지 가지도 않게 TS가 에러로 차단시킬수 있음
// showName(book);     // 'Book' 형식의 인수는 '{ name: string; }' 형식의 매개 변수에 할당될 수 없습니다. 'name' 속성이 'Book' 형식에 없지만 '{ name: string; }' 형식에서 필수입니다.