
import { _decorator, Component, Node, Sprite, Label, Button, EventHandler, tween, Vec3, CCObject } from 'cc';
import { UIView } from '../ViewController/UIView';

const { ccclass, property, type, string } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

@ccclass('UIViewAlert')
export class UIViewAlert extends UIView {
    properties: {
        imageBg: cc.UIImage,
        textTitle: cc.UIText,
        textMsg: cc.UIText,
        btnYes: cc.UIButton,
        btnNo: cc.UIButton,
        keyName: "",

        //callback(UIViewAlert alert, bool isYes);
        callback: null,
    }
    onLoad () {
        this._super();

        this.LayOut();
    }

    LayOut () {
        var ratio = 0.8;
        var x, y, w, h;
        this._super();
        {
            ratio = 0.8;
            var size = cc.Common.appSceneMain.sizeCanvas; 
            var ratio = 0.8;
            //显示异常
            //this.node.setContentSize(size * ratio);
            //显示异常

            w = Math.min(size.width, size.height) * ratio;
            h = w * 9 / 16;
            // h = w / 2;
            cc.Debug.Log("UIViewAlert setContentSize = w=" + w + " h=" + h);
            this.node.setContentSize(new cc.Size(w, h));

            this._super();
        }
    }
    SetText (title, msg, yes, no) {
        //cc.Debug.Log("SetText title ="+title+" msg="+msg);
        this.textTitle.text = title;
        this.textMsg.text = msg;

        this.btnYes.enableFitTextSize = true;
        this.btnYes.text = yes;

        this.btnNo.enableFitTextSize = true;
        this.btnNo.text = no;


    }

    ShowBtnNo (isShow) {
        this.btnNo.node.active = isShow;
    }
    OnClickBtnYes () {
        this.Remove();
        if (this.callback != null) {
            this.callback(this, true);
        }

    }


    OnClickBtnNo () {
        this.Remove();
        if (this.callback != null) {
            this.callback(this, false);
        }
    }

    Remove () {
        // if (this.node != null) {
        //     this.node.destroy();
        //     //this.node = null;
        // }
        this.Close();
    }

    Hide () {
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
