
import { _decorator, Component, Node, Sprite, Label } from 'cc';
import { UIView } from '../ViewController/UIView';
import { UIImage } from '../UIImage/UIImage';
import { UIText } from '../UIText/UIText';
import { UIButton } from '../UIButton/UIButton';
const { ccclass, property, type, string } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

@ccclass('UINaviBar')
export class UINaviBar extends UIView {
    imageBg: UIImage | null = null;
    textTitle: UIText | null = null;
    btnBack: UIButton | null = null;
    onLoad() {
        super.onLoad();
       // this.btnBack.node.active = false;
    }

    start() {
        // [3]
        super.start();

    }



    UpdateTitle(title: string) {
       // this.textTitle.text = title;
    }
    HideBtnBack(isHide: boolean) {
       // this.btnBack.node.active = !isHide;
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
