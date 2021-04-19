
import { _decorator, CCObject, director } from 'cc';
import { Debug } from './Debug';

const { ccclass, property } = _decorator;

// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('Device')
export class Device extends CCObject { 
    static _main:Device;
    //静态方法
    static Main(){ 
        if(this._main==null)
        {
            this._main = new Device();
        }
        return this._main;
    }
    //get 的用法
    get isLandscape(): boolean {           
        var sz = director.getWinSizeInPixels();//屏幕分辨率
        Debug.Log("sz=" + sz);
        if (sz.width > sz.height) {
            return true;
        }
        return false;
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
