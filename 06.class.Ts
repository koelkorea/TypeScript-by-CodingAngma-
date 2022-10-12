// [TypeScript Class 특징] : 이 2가지 외에는 특이사항 없음 
//  1. Access Modifier(접근 제한자)를 지원한다 - public, private, protect
//      -> 최근에 #변수명으로 js에서도 지원.. 그렇지만 #변수명은 그 자체가 변수이기에 얘를 호출하려면 #도 같이 써야함
//  2. 클래스의 멤버변수가 있다면, 무조건 미리 선언해야 함
//  3. static 변수를 만들수 있음 (js도 마찬가지)
//      -> 타입명이 안 붙어도 됨
//  4. abstract 키워드를 통해 추상클래스, 추상메서드 선언 가능

//      # 접근제한자
//          - public : 외부 어디에서라도 제한없이 접근 가능한 요소임을 의미
//          - protect : 자기 자신 및 자식 클래스 내부에서 접근 가능한 요소임을 의미
//          - private : 해당 클래스 내부에서만 접근 가능한 요소임을 의미

//      # 추상xxx
//          : new 명령어를 통해 객체를 만들수 없고, 반드시 자식클래스를 통한 부모클래스로서 개입해야 함
//            구체적인 구현은 상속 받는 쪽에서 하도록 처리하는 클래스나, 메서드 (추상클래스 내 추상메서드가 있는 경우가 많음)

//---------------------------------------------------------------------------------------------------------------------
// ex) 접근제한자와 static를 사용한 예시
class Ship {
    public name : string = "ship";
    // protected name : string = "ship";
    // private name : string = "ship";
    // readonly name : string = "ship";
    // #name : string = "ship";             // #name은 private속성을 가진 하나의 변수명 그 자체임을 명심
    color : string;
    static wheels = false;                  // 클래스 내 정적타입 변수인 wheels
    constructor(color : string) {
        this.color = color;
    }

    start(){
        console.log("start");
        console.log(this.name);
        // console.log(this.#name);         // #name은 private속성을 가진 하나의 변수명 그 자체임을 명심
        console.log(Ship.wheels);           // static으로 선언된 정적타입 변수는 인스턴스 객체가 아닌 클래스 그 자체를 소환해야 다룰 수 있음
    }
}

class Warship extends Ship {
    constructor(color : string) {
        super(color);
    }
    
    showName() {
        console.log(super.name);        //  private인 경우 : 'name' 속성은 private이며 'Ship' 클래스 내에서만 액세스할 수 있습니다.
        // console.log(super.#name);    // #name은 private속성을 가진 하나의 변수명 그 자체임을 명심
    }
}

const frigate = new Warship("black");

console.log(Ship.wheels);

// frigate.#name = "lsh";       // #name은 private속성을 가진 하나의 변수명 그 자체임을 명심
frigate.name = "lsh";           // name 속성이 무엇이냐에 따라 고칠수 없을때가 있음

// [error메시지]
// readonly  : 읽기 전용 속성이므로 'name'에 할당할 수 없습니다.
// private   : 'name' 속성은 private이며 'Ship' 클래스 내에서만 액세스할 수 있습니다.
// protected : 'name' 속성은 보호된 속성이며 'Ship' 클래스 및 해당 하위 클래스 내에서만 액세스할 수 있습니다.

//---------------------------------------------------------------------------------------------------------------------
// ex) abstract 키워드를 통해 추상클래스, 추상메서드 예시

// 추상클래스 MoblieSuit
abstract class MoblieSuit {
    isZeon : boolean;
    weapon : string;

    constructor(isZeon : boolean, weapon : string){
        this.isZeon = isZeon;
        this.weapon = weapon;
    }

    readSpac(){
        console.log(this.isZeon);
        console.log(this.weapon);
    }

    shot() {
        console.log("shot~!");
    }

    // 추상클래스 MoblieSuit
    abstract doSpecial() : void;      // 부모클래스를 상속받는 자식클래스에서 가지각색으로 완성시킴
}

// 추상클래스인 MoblieSuit를 구현한 자식클래스 RX78
class RX78 extends MoblieSuit {
    constructor(isZeon : boolean, weapon : string){
        super(isZeon, weapon);
    }

    // 부모클래스 MoblieSuit가 가진 추상클래스 구현 (RX78만의 구현방식)
    doSpecial() {
        alert("last shooting~!");   // RX78만의 고유스킬
    }
}

const firstGundam = new RX78(false, "beam rifle");
firstGundam.readSpac(); // false, "beam rifle" 

//---------------------------------------------------------------------------------------------------------------------