
import { _decorator, Component, Node, instantiate, Layout, sys } from 'cc';
import { UIImage } from '../../Common/UIKit/UIImage/UIImage';
import { UIView } from '../../Common/UIKit/ViewController/UIView';
import { UIText } from '../../Common/UIKit/UIText/UIText';
import { Debug } from '../../Common/Debug';
import { ItemInfo } from '../../Common/ItemInfo';
import { UITableView } from '../../Common/UIKit/UITableView/UITableView';
import { Language } from '../../Common/Language/Language';
import { Config } from '../../Common/Config/Config';
import { Platform } from '../../Common/Platform';
import { Common } from '../../Common/Common';
const { ccclass, property, type } = _decorator;


@ccclass('UISetting')
export class UISetting extends UIView {

    TAG_SETTING_COMMENT = 0;
    TAG_SETTING_VERSION = 1;
    TAG_SETTING_LANGUAGE = 2;
    TAG_SETTING_BACKGROUND_MUSIC = 3;
    TAG_SETTING_BTN_SOUND = 4;
    TAG_SETTING_NOAD = 5;
    TAG_SETTING_RESTORE_IAP = 6;
    TAG_SETTING_LAST = 7;

    listImage: string[] = ["IMAGE_CELL_BG_BLUE", "IMAGE_CELL_BG_ORINGE", "IMAGE_CELL_BG_YELLOW"];


    oneCellNum = 1;
    heightCell = 160;
    listItem: ItemInfo[] = [];

    @type(UIText)
    textTitle: UIText = null;

    @type(UIImage)
    imageBg: UIImage = null;

    @type(UITableView)
    uiTableView: UITableView = null;



    onLoad() {
        super.onLoad();

        this.UpdateItem();

    }

    UpdateItem() {
        this.listItem.length = 0;
        //if (AppVersion.main().appCheckHasFinished)
        if (sys.isNative) {
            var info = new ItemInfo();
            info.title = Language.main.GetString("STR_SETTING_COMMENT");
            info.tag = this.TAG_SETTING_COMMENT;
            this.listItem.push(info);
        }
        //if (AppVersion.main().appCheckHasFinished)
        if (sys.isNative) {
            var info = new ItemInfo();
            var strversin = Common.GetAppVersion();
            var str = Language.main.GetString("STR_SETTING_VERSION") + "(" + strversin + ")";
            info.title = str;
            info.tag = this.TAG_SETTING_VERSION;
            this.listItem.push(info);
        }

        {
            var info = new ItemInfo();
            info.title = Language.main.GetString("STR_SETTING_LANGUAGE");
            info.tag = this.TAG_SETTING_LANGUAGE;
            this.listItem.push(info);
        }

        var isHasBgMusic = true;
        // if (Config.main.appType == AppType.SHAPECOLOR) {
        //     isHasBgMusic = false;
        // }
        if (isHasBgMusic) {
            var info = new ItemInfo();
            info.title = Language.main.GetString("STR_SETTING_BACKGROUND_MUSIC");
            info.tag = this.TAG_SETTING_BACKGROUND_MUSIC;
            this.listItem.push(info);
        }

        // {
        //     var info = new ItemInfo();
        //     info.title = Language.main.GetString("STR_SETTING_BTN_SOUND");
        //     info.tag = this.TAG_SETTING_BTN_SOUND;
        //     this.listItem.push(info);
        // }

        if (sys.isNative) {


            if (Config.main.isHaveRemoveAd) {
                var info = new ItemInfo();
                info.title = Language.main.GetString("STR_BTN_NOAD");
                info.tag = this.TAG_SETTING_NOAD;
                this.listItem.push(info);
            }
            if (Platform.isiOS && Config.main.isHaveRemoveAd) {
                var info = new ItemInfo();
                info.title = Language.main.GetString("STR_BTN_RESTORE_NOAD");
                info.tag = this.TAG_SETTING_RESTORE_IAP;
                this.listItem.push(info);
            }
        }
        this.InitList();
    } 
    LayOut() {
        super.LayOut();
    }
    OnBtnClickBack(event: Event, customEventData: string) {
        if (this.controller != null) {
            var navi = this.controller.naviController;
            if (navi != null) {
                navi.Pop();
            }
        }
    }

    InitList() {
        this.uiTableView.tableView.oneCellNum = this.oneCellNum;
        this.uiTableView.tableView.cellHeight = 256;
        this.uiTableView.tableView.uiViewParent = this;
        this.uiTableView.tableView.initTableView(this.listItem.length, { array: this.listItem, target: this });
    }
    //下一页(pageview下有效)
    nextPage() {
        //this.tableView.getComponent(tableView).scrollToNextPage();
    }
    //上一页(pageview下有效)
    lastPage() {
        // this.tableView.getComponent(tableView).scrollToLastPage();
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
