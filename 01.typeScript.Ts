// [TypeScript]

//  1. TypeScript 등장원인
//    : JS는 동적타입 언어 + 인터프리터 언어 = 오류가 발생해도 런타임 중에 발생함
//      (= 디버깅도 힘들고 어디서 사람이 뭘 잘못했는지, 정적타입 언어에 비해 판별이 힘들다는 단점 존재)
//        -> 그렇다면? 이 그 문제를 고치자 해서 등장한 언어가 'TypeScript'

//--------------------------------------------------------------------------------------------
//  ex) JS의 문제점을 보여주는 예시 
// function showItems(arr){
//   arr.foreach((item) => {
//     console.log(item);
//   });
// }

// showItems(1,2,3);   // 파라미터가 배열이 아니기에 foreach를 적용할 수 없는것을 런타임때 가서야 알아냄.. 
//                     //  -> 만약 파라미터의 타입을 정적으로 명시할 수 있고, 이를 사전에 감지할 수 있으면 얼마나 좋을까???
//--------------------------------------------------------------------------------------------

//  2. TypeScript 특징
//    : TS는 정적타입 언어(변수하나 선언하면? 그때마다 타입을 명시해야..) + 컴파일 언어(따로 해당 문법을 JS로 전환타임을 가짐)
//      (= 이를 통해 JS도 타 언어들과 같은 안정성을 가질 수 있게 되었음)

//  3. 설치법
//    : (Node Js 설치 필요) npm install typescript

//    # JS로 컴파일을 해서 실행하기가 싫다면? -> TS-node 라이브러리를 깔아보자
//      : npm install -g ts-node

//  4. 실행법
//    1) JS로 컴파일 ex) tsc hello.ts -> html에 붙이거나 node.js에서 실행
//    2) ts-node로 실행   ex) ts-node hello.ts
//    3) https://www.typescriptlang.org/ 에서 실행해본다..


//  ex) JS -> TS
function showItems(arr:number[]){   // 파라미터에 변수타입 명시
  arr.forEach((item) => {
    console.log(item);
  });
}

// showItems(1,2,3);   // 배열이 아닌 경우는 컴파일 단계에서 에러  
showItems([1,2,3]); 