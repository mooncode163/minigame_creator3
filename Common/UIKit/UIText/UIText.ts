
import { _decorator, Component, Node, Sprite, Label, Color } from 'cc';
import { Common } from '../../Common';
import { Debug } from '../../Debug';
import { UIView } from '../ViewController/UIView'; 
const { ccclass, property, type, string } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

@ccclass('UIText')
export class UIText extends UIView {

    @type(Label)
    label: Label | null = null;

    @type(string)
    //get 的用法
    get text() {
        return this.label.string;
    }
    // set 的用法
    set text(value) {
        this.label.string = value;
        this.LayOut();

    }




    //get 的用法
    get fontSize() {
        return this.label.fontSize;
    }
    // set 的用法
    set fontSize(value) {
        this.label.fontSize = value;
        this.label.lineHeight = value;
        this.LayOut();

    }

    //get 的用法
    get color() {
        return this.label.color;
    }
    // set 的用法
    set color(value) {
        this.label.color = value;
        this.LayOut();

    }
    onLoad() {
        super.onLoad();
        Debug.Log("UIText this.keyColor =" + this.keyColor);

        if (!Common.BlankString(this.keyColor)) {
            Debug.Log("UIText this.color");
            var ret = this.GetKeyColor(Color.YELLOW);
            Debug.Log("UIText this.color =" + ret);
            // this.label.color= ret;
            this.color = ret;
        }
        if (!Common.BlankString(this.keyText)) {
            this.text = this.GetKeyText();
        }
    }

    start() {
        // [3]
        super.start();
    }
    LayOut() {
        super.LayOut();
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
