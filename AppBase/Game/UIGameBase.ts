
import { _decorator, Component, Node, Prefab } from 'cc';
import { UIButton } from '../../Common/UIKit/UIButton/UIButton';
import { UIView } from '../../Common/UIKit/ViewController/UIView';
import { UIImage } from '../../Common/UIKit/UIImage/UIImage';
import { ItemInfo } from '../../Common/ItemInfo';
import { UIText } from '../../Common/UIKit/UIText/UIText';
const { ccclass, property, type } = _decorator;


@ccclass('UIGameBase')
export class UIGameBase extends UIView {
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

    statics: {
        GAME_AD_INSERT_SHOW_STEP: 2
    }

    properties: {
        gamePrefab: {
            default: null,
            type: cc.Prefab
        }
        listProLoad: {
            default: [],
            type: cc.LoadItemInfo
        }
        btnMusic: cc.UIButton,
        btnBack: cc.UIButton,

        //@moon cc.UIImage 等自定义的无法在编辑器里绑定 改成系统的
        imageBg: cc.Component,

        textTitle: cc.UIText,
        callbackGuankaFinish: null,
        callbackPlaceFinish: null,
    }
    Init () {
    }
    onLoad () {
        super.onLoad();
        this.node.setContentSize(this.node.parent.getContentSize());
        this.LoadGamePrefab();
        
    }
    start () {
        // this.UpdateBtnMusic();
        super.start();
    }
    LoadGamePrefab () {
        // var strPrefab = "AppCommon/Prefab/Game/Game" + cc.Config.main().appType;

        var key = "Game"+ cc.Config.main().appType;
        // var strPrefab = cc.ConfigPrefab.main().GetPrefab(key);
        // Debug.Log("HomeViewController LoadPrefab=" + strPrefab);
        cc.PrefabCache.main.LoadByKey(key, function (err, prefab) {
            if (err) {
                Debug.Log("LoadGamePrefab err=" + err.message || err);
                return;
            }
            this.gamePrefab = prefab;
            this.CreateGame();
        }.bind(this)
        );
    }
    CreateGame () {
    }

    OnClickBtnBack (event, customEventData) {
        if (this.controller != null) {
            var navi = this.controller.naviController;
            if (navi != null) {
                navi.Pop();
            }
        }
    }
    UpdateBtnMusic () {
        var ret = cc.Common.GetBoolOfKey(cc.CommonRes.KEY_BACKGROUND_MUSIC, false);
        this.btnMusic.UpdateSwitch(ret);

    }

    OnClickBtnMusic (event, customEventData) {
        var ret = cc.Common.GetBoolOfKey(cc.CommonRes.KEY_BACKGROUND_MUSIC, false);//(AppString.STR_KEY_BACKGROUND_MUSIC);
        var v = !ret;
        Debug.Log("UpdateBtnSwitch value=" + v);
        cc.Common.SetBoolOfKey(cc.CommonRes.KEY_BACKGROUND_MUSIC, v);
        this.UpdateBtnMusic();
        if (v) {
            AudioPlay.main.PlayBgMusic();
        }
        else {
            AudioPlay.main.PlayStopBgMusic();
        }
    }
    OnClickBtnShare (event, customEventData) {
        cc.Share.main().ShareImageText("", cc.Config.main().shareTitle, cc.Config.main().shareUrl, "");
    }

    //guanka  



    UpdateGuankaLevel (level) {
        var idx = cc.LevelManager.main().gameLevel;
        Debug.Log("UIGameBase::UpdateGuankaLevel idx=" + idx);
        if (idx >= 3) {
            var isLock = cc.Common.GetBoolOfKey(cc.AppRes.KEY_GAME_LOCK, true);
            if (isLock) {
                //AlertLockViewController.main().Show(null, null);
            }
        }

    }
    UpdatePlaceLevel (level) {
    }


    LoadLanguageGameDidFinish (p) {

    }

    LoadLanguageGame () {
        var info = cc.LevelManager.main().GetPlaceItemInfo(cc.LevelManager.main().placeLevel);
    

    }

    ShowUserGuide () {
        var key = cc.CommonRes.KEY_USER_GUIDE + cc.Common.main().GetAppVersion();
        var isshowplay = cc.Common.GetBoolOfKey(key, false);
        if (isshowplay == true) {
            return;
        }
        var title = Language.main.GetString("STR_UIVIEWALERT_TITLE_USER_GUIDE");
        var msg = Language.main.GetString("STR_UIVIEWALERT_MSG_USER_GUIDE");
        var yes = Language.main.GetString("STR_UIVIEWALERT_YES_USER_GUIDE");
        var no = yes;

        cc.ViewAlertManager.main().ShowFull({
            title: title,
            msg: msg,
            yes: yes,
            no: no,
            isShowBtnNo: false,
            name: "STR_KEYNAME_VIEWALERT_USER_GUIDE",
            finish (ui, isYes) {
                if (isYes) {
                } else {

                }
                cc.Common.SetBoolOfKey(key, true);
            }.bind(this),
        });

    }

    ShowAdInsert(step) {
        var _step = step;
        if (_step <= 0) {
            _step = 1;
        }
        //cc.GameManager.main().isShowGameAdInsert = false;
        // if ((GameManager.gameLevel != 0) && ((GameManager.gameLevel % _step) == 0))
        if ((cc.LevelManager.main().gameLevel % _step) == 0) {
            cc.AdKitCommon.main.InitAdInsert();
            cc.AdKitCommon.main.ShowAdInsert(100);
            //GameManager.main.isShowGameAdInsert = true;
        }
    }

    OnGameWinBase () {
        this.ShowAdInsert(UIGameBase.GAME_AD_INSERT_SHOW_STEP);
        if (cc.LevelManager.main().gameLevelFinish < cc.LevelManager.main().gameLevel) {
            cc.LevelManager.main().gameLevelFinish = cc.LevelManager.main().gameLevel;
            //好友排行榜
            let score = cc.LevelManager.main().placeLevel + "-" + cc.LevelManager.main().gameLevel;
            Debug.Log("OnGameWin score=" + score);
            cc.FrendBoard.main().SaveData(score);
        }

    }

    ShowGameWinAlert () {
        var title = Language.main.GetString("STR_UIVIEWALERT_TITLE_GAME_FINISH");
        var msg = Language.main.GetString("STR_UIVIEWALERT_MSG_GAME_FINISH");
        var yes = Language.main.GetString("STR_UIVIEWALERT_YES_GAME_FINISH");
        var no = Language.main.GetString("STR_UIVIEWALERT_NO_GAME_FINISH");
        Debug.Log("game finish ShowFull");

        cc.ViewAlertManager.main().ShowFull({
            title: title,
            msg: msg,
            yes: yes,
            no: no,
            isShowBtnNo: true,
            name: "STR_KEYNAME_VIEWALERT_GAME_FINISH",
            finish (ui, isYes) {
                if (isYes) {
                    cc.LevelManager.main().GotoNextLevelWithoutPlace();
                } else {
                    //replay
                    cc.GameManager.main().GotoPlayAgain();
                }
            }.bind(this),
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
