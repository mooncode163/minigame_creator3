
import { _decorator, Component, Node, Prefab } from 'cc';  
import { UIViewPop } from '../../../../../Common/UIKit/PopUp/UIViewPop';
import { UIText } from '../../../../../Common/UIKit/UIText/UIText';
import { UIView } from '../../../../../Common/UIKit/ViewController/UIView';
import { UIImage } from '../../../../../Common/UIKit/UIImage/UIImage';
import { UIButton } from '../../../../../Common/UIKit/UIButton/UIButton';
import { GameLevelParse } from '../../../Data/GameLevelParse';
import { LevelManager } from '../../../../../AppBase/Game/LevelManager';
import { LevelData } from '../../../../../AppBase/Game/LevelData';
import { GameManager } from '../../../../../AppBase/Game/GameManager';
import { AppScene } from '../../../../../AppBase/AppScene';
import { AppSceneBase } from '../../../../../AppBase/Common/AppSceneBase';
const { ccclass, property, type } = _decorator;

@ccclass('UIGameWin')
export class UIGameWin extends UIViewPop {
 
    @type(UIText)
    textTitle: UIText | null = null; 
    @type(UIImage)
    imageBg: UIImage | null = null; 
    @type(UIImage)
    imageLogo: UIImage | null = null; 
    @type(UIImage)
    imageItem0: UIImage | null = null; 

    @type(UIImage)
    imageItem1: UIImage | null = null; 

    @type(UIImage)
    imageItem2: UIImage | null = null; 

    @type(UIButton)
    btnRestart: UIButton | null = null; 

    listItem:UIImage[]=[];
  
    onLoad () {
        super.onLoad();
 
        this.listItem.push(this.imageItem0);
        this.listItem.push(this.imageItem1);
        this.listItem.push(this.imageItem2);

        for (var i = 0; i < this.listItem.length; i++)
        {
            var info = GameLevelParse.main.GetLevelItemInfo(i);
            var pic = GameLevelParse.main.GetImagePath(info.id);
            var ui = this.listItem[i];
            ui.index = i;
            ui.id = info.id;
            ui.UpdateImage(pic);
        }

        {
            var info = GameLevelParse.main.GetLastItemInfo();
            var pic = GameLevelParse.main.GetImagePath(info.id);
            this.imageLogo.UpdateImage(pic);
        }
        this.LayOut();
    }
    start () {
        super.start();
        this.LayOut();
    }
     

    LayOut() {
        super.LayOut(); 
    }
  
 

    OnClickBtnRestart(event: Event, customEventData: string) {
        this.Close(); 

        // placeLevel 不改变
        // LevelManager.main.placeLevel = 0;
        LevelData.main.gameLevel = 0;
        LevelData.main.gameLevelFinish = -1;
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
