
import { _decorator, Component, Node, Prefab } from 'cc';
import { UIButton } from '../../Common/UIKit/UIButton/UIButton';
import { UIView } from '../../Common/UIKit/ViewController/UIView';
import { UIImage } from '../../Common/UIKit/UIImage/UIImage';
import { ItemInfo } from '../../Common/ItemInfo';
import { UIText } from '../../Common/UIKit/UIText/UIText';
import { Config } from '../../Common/Config/Config';
import { PrefabCache } from '../../Common/Cache/PrefabCache';
import { CommonRes } from '../../Common/CommonRes';
import { Common } from '../../Common/Common';
import { Debug } from '../../Common/Debug';
import { AudioPlay } from '../../Common/Audio/AudioPlay';
import { Share } from '../../Common/Share/Share';
import { LevelManager } from './LevelManager';
import { AppRes } from '../../Apps/Main/AppRes';
import { Language } from '../../Common/Language/Language';
import { AdKitCommon } from '../../Common/AdKit/AdKitCommon';
import { FrendBoard } from '../../Common/SNS/FrendBoard';
import { GameManager } from './GameManager';
import { ViewAlertManager } from '../../Common/UIKit/UIViewAlert/ViewAlertManager';
import { LevelData } from './LevelData';
const { ccclass, property, type } = _decorator;


@ccclass('UIGameBase')
export class UIGameBase extends UIView {
    static GAME_AD_INSERT_SHOW_STEP = 2;
    gamePrefab: Prefab | null = null;

    @type(UIButton)
    btnMusic: UIButton | null = null;
    @type(UIButton)
    btnBack: UIButton | null = null;
    @type(UIImage)
    imageBg: UIImage | null = null;
    @type(UIText)
    textTitle: UIText | null = null;

    listProLoad: ItemInfo[] = [];
    onLoad() {
        super.onLoad();
        this.LayOut();
        this.LoadGamePrefab();
    }
    start() {
        super.start();
        this.LayOut();
    }
    UpdateLevel(level: number) {

    }
    OnClickBtnBack(event: Event, customEventData: string) {
        if (this.controller != null) {
            var navi = this.controller.naviController;
            if (navi != null) {
                navi.Pop();
            }
        }
    }



    Init() {
    }


    LoadGamePrefab() {
        var key = "Game" + Config.main.appType;
        PrefabCache.main.LoadByKey(
            {
                key: key,
                success: (p: any, data: any) => {
                    this.gamePrefab = data;
                    this.CreateGame();
                },
                fail: () => {
                },
            });


    }
    CreateGame() {
    }


    UpdateBtnMusic() {
        var ret = Common.GetBoolOfKey(CommonRes.KEY_BACKGROUND_MUSIC, false);
        this.btnMusic.UpdateSwitch(ret);

    }

    OnClickBtnMusic(event, customEventData) {
        var ret = Common.GetBoolOfKey(CommonRes.KEY_BACKGROUND_MUSIC, false);//(AppString.STR_KEY_BACKGROUND_MUSIC);
        var v = !ret;
        Debug.Log("UpdateBtnSwitch value=" + v);
        Common.SetBoolOfKey(CommonRes.KEY_BACKGROUND_MUSIC, v);
        this.UpdateBtnMusic();
        if (v) {
            AudioPlay.main.PlayBgMusic();
        }
        else {
            AudioPlay.main.StopBgMusic();
        }
    }
    OnClickBtnShare(event, customEventData) {
        Share.main.ShareImageText("", Config.main.shareTitle, Config.main.shareUrl, "");
    }

    //guanka  



    UpdateGuankaLevel(level) {
        var idx = LevelData.main.gameLevel;
        Debug.Log("UIGameBase::UpdateGuankaLevel idx=" + idx);
        if (idx >= 3) {
            var isLock = Common.GetBoolOfKey(AppRes.KEY_GAME_LOCK, true);
            if (isLock) {
                //AlertLockViewController.main.Show(null, null);
            }
        }

    }
    UpdatePlaceLevel(level) {
    }


    LoadLanguageGameDidFinish(p) {

    }

    LoadLanguageGame() {
        var info = LevelData.main.GetPlaceItemInfo(LevelData.main.placeLevel);


    }

    ShowUserGuide() {
        var key = CommonRes.KEY_USER_GUIDE + Common.GetAppVersion();
        var isshowplay = Common.GetBoolOfKey(key, false);
        if (isshowplay == true) {
            return;
        }
        var title = Language.main.GetString("STR_UIVIEWALERT_TITLE_USER_GUIDE");
        var msg = Language.main.GetString("STR_UIVIEWALERT_MSG_USER_GUIDE");
        var yes = Language.main.GetString("STR_UIVIEWALERT_YES_USER_GUIDE");
        var no = yes;
        ViewAlertManager.main.ShowFull(
            {
                title: title,
                msg: msg,
                yes: yes,
                no: no,
                isShowBtnNo: false,
                name: "STR_KEYNAME_VIEWALERT_USER_GUIDE",
                finish: (ui: any, isYes: boolean) => {
                    if (isYes) {
                    } else {

                    }
                    Common.SetBoolOfKey(key, true);
                },
                close: (ui: any) => {
                },
            });


    }

    ShowAdInsert(step) {
        var _step = step;
        if (_step <= 0) {
            _step = 1;
        }
        //GameManager.main.isShowGameAdInsert = false;
        // if ((GameManager.gameLevel != 0) && ((GameManager.gameLevel % _step) == 0))
        if ((LevelData.main.gameLevel % _step) == 0) {
            AdKitCommon.main.InitAdInsert();
            AdKitCommon.main.ShowAdInsert(100);
            //GameManager.main.isShowGameAdInsert = true;
        }
    }

    OnGameWinBase() {
        this.ShowAdInsert(UIGameBase.GAME_AD_INSERT_SHOW_STEP);
        if (LevelData.main.gameLevelFinish < LevelData.main.gameLevel) {
            LevelData.main.gameLevelFinish = LevelData.main.gameLevel;
            //好友排行榜
            let score = LevelData.main.placeLevel + "-" + LevelData.main.gameLevel;
            Debug.Log("OnGameWin score=" + score);
            FrendBoard.main.SaveData(score);
        }

    }

    ShowGameWinAlert() {
        var title = Language.main.GetString("STR_UIVIEWALERT_TITLE_GAME_FINISH");
        var msg = Language.main.GetString("STR_UIVIEWALERT_MSG_GAME_FINISH");
        var yes = Language.main.GetString("STR_UIVIEWALERT_YES_GAME_FINISH");
        var no = Language.main.GetString("STR_UIVIEWALERT_NO_GAME_FINISH");
        Debug.Log("game finish ShowFull");
        ViewAlertManager.main.ShowFull(
            {
                title: title,
                msg: msg,
                yes: yes,
                no: no,
                isShowBtnNo: true,
                name: "STR_KEYNAME_VIEWALERT_GAME_FINISH",
                finish: (ui: any, isYes: boolean) => {
                    if (isYes) {
                        LevelManager.main.GotoNextLevelWithoutPlace();
                    } else {
                        //replay
                        GameManager.main.GotoPlayAgain();
                    }
                },
                close: (ui: any) => {
                },
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
