
import { _decorator, Component, Node, Sprite, Label, Button, EventHandler, tween, Vec3, CCObject } from 'cc';
import { Platform } from '../../Platform';
import { AdInsertPlatformWrapper } from './AdInsertPlatformWrapper';
import { AdInsertWeiXin } from './AdInsertWeiXin';

const { ccclass, property, type, string } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

@ccclass('AdInsert')
export class AdInsert extends CCObject {

    platform: AdInsertPlatformWrapper = null;

    static _main: AdInsert;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new AdInsert();
            this._main.Init();
        }
        return this._main;
    }
	GetPlatform() {
        var p = null;
        if (Platform.isWeiXin||Platform.isByte)  {
            p = new AdInsertWeiXin();
        }
        return p;
    }
    Init () { 
		this.platform = this.GetPlatform();
	}
	InitAd(source) {

		if (this.platform == null) {
			return;
		}
		// Moonma.AdKit.AdConfig.AdConfig.main.InitPriority(source, AdConfigParser.SOURCE_TYPE_INSERT);
		this.platform.InitAd(source);
	}
	SetObjectInfo(objName) {
		if (this.platform == null) {
			return;
		}
		this.platform.SetObjectInfo(objName);
	}
	ShowAd() {
		if (this.platform == null) {
			return;
		}
		this.platform.ShowAd();
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
