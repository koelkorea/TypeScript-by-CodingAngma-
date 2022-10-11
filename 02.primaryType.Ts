// [TypeScript 기본 타입]

//  ex)  let or const or var 변수명:타입명 = 내용;

//  1. 원시형

let initial:string = 'lsh';
let age:number = 30;
let isAdult:boolean = true;
let a:null = null;
let b:undefined = undefined;

// 숫자배열
let num:number[] = [1,2,3];
let arr:Array<number> = [1,2,3];

// 문자배열
let week1:string[] = ['mon', 'tues', 'weds'];
let week2:Array<string> = ['mon', 'tues', 'weds'];


// 2. 튜플 (Tuple)
//  : 셀 수 있는 수량의 순서 있는 열거로 TS에서는 []안에 ,를 기준으로 타입명을 적어넣으면 완료

let tuple:[string, number];

// tuple  = [1, 'z'];
tuple  = ['z', 1];

tuple[0].toLowerCase();
// tuple[1].toLowerCase();  // number타입은 toLowerCase();을 사용할 수 없다


// 3. never
//  : 에러를 반환하거나, 영원하게 반복되는 타입의 영우

//에러의 경우
function showError():never{
  throw new Error();
}

// 무한 반복의 경우
function inLoop():never{
  while (true) {
    
  }
}


// 4. enum
//  : 열거형으로 서로 연관된 상수들의 집합

//  ex) enum 변수명 { 프로퍼티1 = 값1, ... , 프로퍼티n = 값n  }

// 값을 숫자로 둔 경우
enum Os {
  Window = 3,
  Ios = 10,
  Android
}

console.log(Os['Ios']);   //  10
console.log(Os[10]);    //  Ios

// 특정 변수를 특정 enum값만 쓸수 있도록 할수 있음. 
let myOs:Os = Os.Window;


// 값을 문자로 둔 경우
enum family {
  dad = 'father',
  mom = 'mother',
  son = 'sonson'
}

console.log(family['dad']);         //  father
console.log(family['father']);    //  dad

// 특정 변수를 특정 enum값만 쓸수 있도록 할수 있음. 
let myFamily:family = family['mother'];