// [TypeScript Utility Type]

//  1. (type 리스트) keyof 인터페이스명
//      : 해당 인터페이스의 모든 프로퍼티들을 유니온 타입으로 늘어놓는 용도로 씀 (주로 type 지정할때 많이 사용한다)

//      ex) interface Exam { math : number; english : number; social : number;}
//          keyof Exam = 'math' | 'number' | 'social'

//---------------------------------------------------------------------------------------------------------------------
// ex) keyof 인터페이스명 예시
interface User {
    id : number;
    name : string;
    age : number;
    gender : "m" | "f";
}

type UserKey = keyof User;  //  (중요) 'id' | 'name' | 'age' | 'gender' == keyof User

const uk : UserKey = "name";
//---------------------------------------------------------------------------------------------------------------------

//  2. (타입명) Partial<인터페이스명>
//      : 일종의 변종 '인터페이스 타입'으로 변수 앞에 사용 가능하며, 
//        이 경우 해당 변수는 Generic으로 들어간 인터페이스를 베이스로 하는 객체타입이 되지만, 모든 프로퍼티는 ?로서 일부만 사용해도 ㅇㅋ다

//      ex) interface Exam { math : number; english : number; social : number;}
//          Partial<Exam>  == interface Exam { math? : number; english? : number; social? : number;} 로 사용가능하다 의미

//---------------------------------------------------------------------------------------------------------------------
// ex) (타입명) Partial<인터페이스명> 사용예시
interface User {
    id : number;
    name : string;
    age : number;
    gender : "m" | "f";
}

// Partial<User> 
//  ==
// interface User {
//     id? : number;
//     name? : string;
//     age? : number;
//     gender? : "m" | "f";
// }

let admin : Partial<User> = {   // admin은 User인터페이스의 프로퍼티 중 일부만 넣어도 되는 객체이다
    id : 1
}
//---------------------------------------------------------------------------------------------------------------------

//  3. (타입명) Required<인터페이스명>
//      : 일종의 변종 '인터페이스 타입'으로 변수 앞에 사용 가능하며, 
//        이 경우 해당 변수는 Generic으로 들어간 인터페이스를 베이스로 하는 객체타입으로서 해당 인터페이스의 모든 프로퍼티를 다 사용해야 함

//      ex) interface Exam { math : number; english : number; social : number;}
//          let exam : Required<Exam>  == let exam : Exam

//  4.  (타입명) Readonly<인터페이스명>
//      : 일종의 변종 '인터페이스 타입'으로 변수 앞에 사용 가능하며, 
//        이 경우 해당 변수는 Generic으로 들어간 인터페이스를 베이스로 하는 객체타입이 되지만 ... 그 프로퍼티에 접근하지 못함

//      ex) interface Exam { math : number; english : number; social : number;}
//          Readonly<Exam>  == interface Exam { readonly math : number; readonly english : number; readonly social : number;} 로 사용가능하다 의미

//---------------------------------------------------------------------------------------------------------------------
// ex) Partial<인터페이스명> 사용예시

// Readonly<User> 
//  ==
// interface User {
//     readonly id : number;
//     readonly name : string;
//     readonly age : number;
//     readonly gender : "m" | "f";
// }

let readonlyAdmin : Readonly<User> = {  
    name : "LSH",
    age : 22,
    gender : "m",
    id : 1
}

// admin.id = 4;    // 접근할수 없음
//---------------------------------------------------------------------------------------------------------------------


//  5. (타입명)  Record<K(type 리스트나 type변수), v(type 리스트나 type변수)>
//      : 일종의 변종 '인터페이스 타입'으로 변수 앞에 사용 가능하며, 
//        이 경우 해당 변수는 key는 K에 해당하는 type리스트에 해당하는 값으로, value는 K에 해당하는 type리스트에 해당하는 값으로만 구성된 객체의 형식을 띄어야 한다
//          -> 예시를 보는게 더 빠르다

//      # 단 K에 해당하는 애들은 중복이 불가능하며, 전부 존재해야 함

//---------------------------------------------------------------------------------------------------------------------
// ex) Record<K, V> 사용 예시

// K, V에 해당하는 Generic은 전부 type 형식을 띄어야 한다
const score1 : Record< "1" | "2" | "3" , "A" | "B" | "C" | "D" | "E" > = {
    1: "A",
    3: "C",
    2: "B",
}

// 상단의 내용을 다음처럼 표현해도 같다
type Grade = "1" | "2" | "3";
type Score = "A" | "B" | "C" | "D" | "E" ;

const score2 : Record< Grade , Score > = {  // type변수에 해당하는 부분을 직접 집어넣어도 됨
    1: "A",
    3: "C",
    2: "B",
}


// Record<K, V> 응용 사용 function
function isValid (user : User){
    const result : Record<keyof User, boolean> = {  // 파라미터로 받은 User 데이터를 가공해서 다른 객체로 만드는데 사용된 Record<K, V>
        id : user.id > 0,
        name : user.name !== "",
        age : user.age > 0,
        gender : user.gender == "f",
    }

    return result;
}
//---------------------------------------------------------------------------------------------------------------------

//  6.  (타입명) Pick<T(type 리스트나 type변수, 인터페이스명 같은 열거타입), K(type 리스트)>
//      : 일종의 변종 '인터페이스 타입'으로 변수 앞에 사용 가능하며, 
//        이 경우 해당 변수는 Generic으로 들어간 인터페이스를 베이스로 하는 객체타입으로서, K에서 유니언 타입으로 열거된 프로퍼티만을 사용한다
//          <-> Omit<T(type 리스트나 type변수, 인터페이스명 같은 열거타입), K(type 리스트)>

//      ex) interface Exam { math : number; english : number; social : number;}
//          Pick<Exam, math, social>  == interface Exam { math : number; social : number;}

//---------------------------------------------------------------------------------------------------------------------
// ex) Pick<T, K> 사용 예시
const admin3 : Pick<User, "id" | "name"> = {    // User 인터페이스의 프로퍼티 중 id와 name으로만 구성된 리터럴 객체가 admin2
    id : 0,
    name : "Bob"
};
//---------------------------------------------------------------------------------------------------------------------

//  7.  (타입명) Omit<T(type 리스트나 type변수, 인터페이스명 같은 열거타입), K(type 리스트)>
//      : 일종의 변종 '인터페이스 타입'으로 변수 앞에 사용 가능하며, 
//        Pick과 다르게, K쪽에 있는 애들을 빼고 써야함

//      ex) interface Exam { math : number; english : number; social : number;}
//          Omit<Exam, english>  == interface Exam { math : number; social : number;}

//---------------------------------------------------------------------------------------------------------------------
// ex) Omit<T, K> 사용 예시
const admin2 : Omit<User, "age" | "gender"> = {    // 상단의 것과 완전히 같은 의미로 변수로 들어간 프로퍼티는 배제의 대상
    id : 0,
    name : "Bob"
};
//---------------------------------------------------------------------------------------------------------------------

//  8.  (타입명 type 리스트) Exclude<T1(타입명으로 구성된 type 리스트), T2(타입명으로 구성된 type 리스트 or 타입명)>
//      :  유니온 타입으로 늘어놓는 type으로 유니언으로 연결된 복수개의 타입명으로 지정된 T1에서 T2에 해당하는 타입들을 배제함

//---------------------------------------------------------------------------------------------------------------------
// ex) EXclude<T1, T1> 사용 예시
type T1 = string | number | boolean;
type T2 = Exclude<T1, number | string>;     // T2는 T1에서  number, string이 배제된 타입명을 type 리스트 형식으로 담고 있음
//---------------------------------------------------------------------------------------------------------------------

//  9.  (타입명 type 리스트) NonNullable<T(타입명으로 구성된 type 리스트)>
//      :  유니온 타입으로 늘어놓는 type으로 유니언으로 연결된 복수개의 타입명에서 null, undefined 제거

//---------------------------------------------------------------------------------------------------------------------
// ex) NonNullable<T> 사용 예시
type T3 = string | number | boolean | null | undefined;
type T4 = NonNullable<T3>;     // T4는 T3에서  null, undefined;이 배제된 타입명을 type 리스트 형식으로 담고 있음

// typeTest에 타입명을 T4로 둘 때 에러 유발자가 되는 경우
// let typeTest : T4 = null;
// let typeTest : T4 = undefined;

let typeTest : T4 = 1;      //  null, undefined을 제외한 나머지 타입은 문제 없다
console.log(typeTest);      //  1
//---------------------------------------------------------------------------------------------------------------------


