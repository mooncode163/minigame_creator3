
import { _decorator } from 'cc';
// import { debug } from 'cocos_core_platform_debug';

const { ccclass, property } = _decorator;

@ccclass('Debug')
export class Debug {
    //静态方法
    static Log(str: string) {
        console.log(str);
        // debug.setDisplayStats(false);
    } 

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
