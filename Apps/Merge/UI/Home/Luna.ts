import { TestCallAndThis } from "./TestCallAndThis";

export class Luna { 　　　//注意观察，this异常的时候的isLoading的值是undefind
    private isLoading: boolean = false;
    private getResult(rst: number): void {
        console.log("get rusult:" + rst + this.isLoading);

    }
    testbind() {
        //不推荐的回调写法， 遗漏了bind（this）
        // TestCallAndThis.callBackTest(1, this.getResult);
        //不推荐的回调写法， 使用了bind（this）（ √ ）
        TestCallAndThis.callBackTest(1, this.getResult.bind(this));

        //提倡的回调写法 ，有无bind(this)都可以
        TestCallAndThis.callMethod(1, this, this.getResult);
        TestCallAndThis.callMethod(1, this, this.getResult.bind(this));
    }
}
