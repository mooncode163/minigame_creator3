
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

// vscode 插件开发 typescript部分报错 Object is possibly 'undefined'.
/*
在tsconfig.js中:

strict设置false状态

{
    "compilerOptions": {
        "strict": false,
        //...
    }

    */


// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

import { UIViewController } from "./UIViewController";

@ccclass('UIView')
export class UIView extends Component {
    @property
    keyText: string = "";
    @property
    keyColor: string= "";

    @property
    keyImage: string= "";
    @property
    keyImage2: string= "";

    @property
    keyImageH: string= "";//only for landscap 横屏
    @property
    keyImageH2: string= "";
    index: number;
    id: string;
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    rootViewController: UIViewController | null = null;

    onLoad() {
    }

    start() {
        // [3]
    }
    LayOut() {
    }
    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
