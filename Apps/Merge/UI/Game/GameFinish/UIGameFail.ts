
import { _decorator, Component, Node, Prefab, Size } from 'cc';
import { UIView } from '../../../../../Common/UIKit/ViewController/UIView';
import { UIViewPop } from '../../../../../Common/UIKit/PopUp/UIViewPop';
import { Language } from '../../../../../Common/Language/Language';
import { UIText } from '../../../../../Common/UIKit/UIText/UIText';
import { GameManager } from '../../../../../AppBase/Game/GameManager';
const { ccclass, property, type } = _decorator;

@ccclass('UIGameFail')
export class UIGameFail extends UIViewPop {

    @type(UIText)
    textTitle: UIText | null = null; 

    @type(UIText)
    textMsg: UIText | null = null; 

    @type(UIText)
    textAgain: UIText | null = null; 
 

    onLoad() {
        super.onLoad();
        this.LayOut();

        this.textTitle.text = Language.main.GetString("STR_GameFail_TITLE");
        this.textMsg.text = Language.main.GetString("STR_GameFail_Detail");
        this.textAgain.text = Language.main.GetString("Restart");
    }
    start() {
        super.start();
        this.LayOut();


    }

    LayOut() {
        super.LayOut();
        var ratio = 0.8;
        var w = this.GetParent().GetContentSize().width * ratio;
        var h = this.GetParent().GetContentSize().height * ratio;
        this.SetContentSize(w, h);
        super.LayOut();
    }


    OnClickBtnAgain(event: Event, customEventData: string) {
        this.Close();
        GameManager.main.GotoPlayAgain();
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
