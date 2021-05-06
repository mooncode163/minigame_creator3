
import { _decorator, Component, Node, CCObject, resources, Prefab } from 'cc'; 
import { ResManager } from '../Res/ResManager';

const { ccclass, property } = _decorator;


@ccclass('PrefabCache')
export class PrefabCache extends CCObject {
    
    static _main: PrefabCache;
    //静态方法
    static get main() { 
        if (this._main == null) {
            this._main = new PrefabCache();
        }
        return this._main;
    }
/*
{ 
   filepath:"", 
success: (p:any,data:any) => {
    
}, 
fail: (p:any) => {
    
},
}
*/
Load(obj: any) {

    // resources.load("App/Prefab/Home/UIHomeMerge", Prefab, (err, prefab) => {
    //     const newNode = instantiate(prefab);
    //     // director.getScene().addChild(newNode);
    //     this.objController?.addChild(newNode);
    // });


    ResManager.Load(
        {
            filepath: obj.filepath,
            success: (p: any, data: any) => {
                if (obj.success != null) {
                    obj.success(this, data);
                }
            },
            fail: () => {
                if (obj.fail != null) {
                    obj.fail(this);
                }
            },
        });
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
