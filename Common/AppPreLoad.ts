
import { _decorator, Component, Node, CCObject, resources, Prefab } from 'cc';
import { Common } from '../Common';
import { Device } from '../Device';
import { Platform } from '../Platform';
import { Source } from '../Source';
import { AppPreLoadInternal } from './AppPreLoadInternal';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('AppPreLoad')
export class AppPreLoad extends CCObject { 
    countLoad = 0;
    countMax = 2; 
    
    listItem: CCObject[] = [];


    static _main: AppPreLoad;
    //静态方法
    static Main() {
        if (this._main == null) {
            this._main = new AppPreLoad();
        }
        return this._main;
    }
   
    /*
{  
success: function (p) {
},
fail: function () {
}, 
}
*/
    Load(obj: any) {
        this.countLoad = 0;
         

    }

    OnFinish(obj: any) {
        this.countLoad++;
        if (this.countLoad >= this.countMax) {
            if (obj.success != null) {
                obj.success(this);
            }
        }
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
