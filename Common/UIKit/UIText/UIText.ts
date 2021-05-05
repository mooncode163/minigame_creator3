
import { _decorator, Component, Node, Sprite, Label } from 'cc';
import { UIView } from '../ViewController/UIView';
const { ccclass, property,type,string } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer
 
@ccclass('UIText')
export class UIText extends UIView { 
     
    @type(Label)
    title: Label | null = null;   
  
    @type(string)
    //get 的用法
    get text() {         
        return this.title.string;
    }
    // set 的用法
    set text(value) { 
        this.title.string= value;
        this.LayOut();

    }



    
    //get 的用法
    get fontSize() {         
        return this.title.fontSize;
    }
    // set 的用法
    set fontSize(value) { 
        this.title.fontSize= value;
        this.title.lineHeight = value;
        this.LayOut();

    }

    //get 的用法
    get color() {         
        return this.title.color;
    }
    // set 的用法
    set color(value) { 
        this.title.color= value;
        this.LayOut();

    } 
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
