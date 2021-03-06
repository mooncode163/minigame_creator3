
import { _decorator, Component, Node, Sprite, Label, Button, EventHandler, tween, Vec3, CCObject } from 'cc';
import { UIButton } from '../UIButton/UIButton';
import { UIImage } from '../UIImage/UIImage';
import { UIText } from '../UIText/UIText';
import { UIView } from '../ViewController/UIView';
import { AppSceneBase } from '../../../AppBase/Common/AppSceneBase';
import { Debug } from '../../Debug';
import { UIViewPop } from '../PopUp/UIViewPop';

const { ccclass, property, type, string } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

@ccclass('UIViewAlert')
export class UIViewAlert extends UIViewPop {
    imageBg: UIImage;
    textTitle: UIText;
    textMsg: UIText;
    btnYes: UIButton;
    btnNo: UIButton;
    keyName: string = "";

    //callback(UIViewAlert alert, bool isYes);
    callback = null;
    onLoad() {
        super.onLoad();

        this.LayOut();
    }

    LayOut() {
        var ratio = 0.8;
        var x, y, w, h;
        super.LayOut();
        {
            ratio = 0.8;
            var size = AppSceneBase.main.sizeCanvas;
            var ratio = 0.8;
            //显示异常
            //this.node.setContentSize(size * ratio);
            //显示异常

            w = Math.min(size.width, size.height) * ratio;
            h = w * 9 / 16;
            // h = w / 2;
            Debug.Log("UIViewAlert setContentSize = w=" + w + " h=" + h);
            this.SetContentSize(w, h);

            super.LayOut();
        }
    }
    SetText(title, msg, yes, no) {
        //Debug.Log("SetText title ="+title+" msg="+msg);
        this.textTitle.text = title;
        this.textMsg.text = msg;

        this.btnYes.enableFitTextSize = true;
        this.btnYes.text = yes;

        this.btnNo.enableFitTextSize = true;
        this.btnNo.text = no;


    }

    ShowBtnNo(isShow) {
        this.btnNo.node.active = isShow;
    }
    OnClickBtnYes() {
        this.Remove();
        if (this.callback != null) {
            this.callback(this, true);
        }

    }


    OnClickBtnNo() {
        this.Remove();
        if (this.callback != null) {
            this.callback(this, false);
        }
    }

    Remove() {
        // if (this.node != null) {
        //     this.node.destroy();
        //     //this.node = null;
        // }
        this.Close();
    }

    Hide() {
        this.Remove();
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
