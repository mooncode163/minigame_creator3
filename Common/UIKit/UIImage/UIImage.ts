
import { _decorator, Component, Node, Sprite } from 'cc';
import { UIView } from '../ViewController/UIView';
const { ccclass, property,type } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer
 
@ccclass('UIImage')
export class UIImage extends UIView { 
    
    @type(Sprite)
    image: Sprite | null = null;

    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
  

    onLoad () {   
        super.onLoad();
    }
    
    start () {
        // [3]
        super.start();
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
