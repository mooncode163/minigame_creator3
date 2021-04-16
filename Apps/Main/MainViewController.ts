
import { _decorator, Component, Node, director, instantiate, Prefab, resources, SpriteFrame } from 'cc'; 
import { TextureCache } from '../../Common/Cache/TextureCache';
import { UIViewController } from '../../Common/UIKit/ViewController/UIViewController';
const { ccclass, property } = _decorator;
 

@ccclass('MainViewController')
export class MainViewController extends UIViewController {
    static _main:MainViewController;
    //静态方法
    static   Main(){
        console.log("AppScene MainViewController Main");
        if(this._main==null)
        {
            this._main = new MainViewController();
        }
        return this._main;
    }
    ViewDidLoad () {
        super.ViewDidLoad();
        console.log("MainViewController ViewDidLoad");
  

        // https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html
        // load Prefab
        resources.load("App/Prefab/Home/UIHomeMerge", Prefab, (err, prefab) => {
            const newNode = instantiate(prefab);
            // director.getScene().addChild(newNode);
            this.objController?.addChild(newNode);
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
