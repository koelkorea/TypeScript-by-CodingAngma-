// [TypeScript 인터페이스]
//  : 어떤 변수를 리터럴 객체, 함수, 클래스로 쓰고 싶다면, let or const 변수:object가 아니라 
//    interface 인터페이스명 {프로퍼티1:타입, ... , 프로퍼티n:타입}; 이렇게 인터페이스를 설정하고 난 뒤 객체를 구현해야 한다

//  ex) (선) interface 인터페이스명 {프로퍼티1:타입, ... , 프로퍼티n:타입};
//      (후) let or const 변수:인터페이스명 = {프로퍼티1:'값1', ... , 프로퍼티n:'값n'}; 

//  # 일단 interface에 프로퍼티를 선언했다면, 반드시 객체를 구현할때 포함되어야 한다
//    -> 포함되어도 좋고 아니어도 상관없는 녀석은 어떻게?
//        -> '프로퍼티명? : 타입명' 과 같이 ?를 써주면 있어도 좋고 없어도 그만이라는 의미가 됨

//---------------------------------------------------------------------------------------------------------------------
// ex) 리터럴 객체를 통한 interface 예시
type Score = 'A' | 'B' | 'C' | 'F';

interface User {
  name : string;
  age : number;
  gender? : string;             // gender의 경우는 User를 실제 구현할때 없어도 그만이다
  readonly birthYear : number;  // readonly 속성이 붙은 녀석은 구현 후 값 수정이 불가함
  [grade : number] : Score;     // 선언해둔 type에 해당하는 값을 타입으로 지정 가능     ex) 숫자 : Score의 문자열만 가능;
}

let user : User = {
  name : 'xx',
  age : 30,
  birthYear : 2000,
  1 : 'A',
  2 : 'B'
}

user.age = 10;
user.gender = "male";     // 도중에 추가해도 아무 문제 없음
// user.birthYear 1990;   // readonly속성이 붙은 프로퍼티는 수정이 불가능함

console.log(user.age);

//---------------------------------------------------------------------------------------------------------------------
// ex) 함수 표현식를 통한 interface 예시 : () 안의 내용은 파라미터의 타입 의미,  그 밖은 결과물의 타입 의미
//  -> 굳이 인터페이스가 없더라도 함수 선언(function)는 정의 가능하다는거 잊지 말자

interface Add {
  (num1 : number, num2 : number) : number;    // 함수 Add의 파라미터 num1, num2는 타입이 number, return값은 타입이 number임을 의미
}

const add : Add = function(x, y) {
  return x + y;
}

add(10, 20);

interface isAdult {
  (age:number) : boolean;   //  함수 isAdult의 파라미터 age는 타입이 number, return값은 타입이 boolean임을 의미
}

const adult : isAdult = (age) => {
  return age > 19;
}

//---------------------------------------------------------------------------------------------------------------------
// ex) 클래스를 통한 interface 예시
//      1) 구현 : 타언어처럼 implements 사용
//      2) 확장 : 타언어처럼 extends 사용

interface Car {
  color : string;
  wheels : number;
  start() : void;
}

// 1) 상단의 Car 인터페이스 구현 
class Bmw implements Car {
  color;
  wheels = 4;

  // 생성자 구현
  constructor(c : string){
    this.color = c;
  }

  start() {
    console.log('부릉부릉');
  }

}

const greenCar = new Bmw('green');
console.log(greenCar);
greenCar.start();


// 2) 인터페이스의 확장 : 확장한 인터페이스는 선조의 프로퍼티가 다 있어야 함
interface Benz extends Car {
  door : number;
  stop() : void;
}

// Car의 프로퍼티가 없기에 에러가 뜸
const benz : Benz = { 
  color : 'red',
  wheels : 4,
  start(){
    console.log('gogo');
  },
  door : 5,
  stop(){
    console.log('stop');
  }
}

// 3) 복수의 인터페이스 동시 확장
interface Toy {
  name : string;
}

interface ToyCar extends Car, Toy {   // car와 toy의 동시구현 (두 인터페이스의 프로퍼티를 전부 가져야 함)
  price : number;
}

const toyCar : ToyCar = {
  color : 'blue',
  wheels : 4,
  start(){
    console.log('gogo');
  },
  name : "toycar",
  price : 111,
}