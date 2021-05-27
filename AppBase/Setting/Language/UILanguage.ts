
import { _decorator, Component, Node, instantiate, Layout, sys, Enum } from 'cc';
import { ItemInfo } from '../../../Common/ItemInfo';
import { UIImage } from '../../../Common/UIKit/UIImage/UIImage';
import { UITableView } from '../../../Common/UIKit/UITableView/UITableView';
import { UIText } from '../../../Common/UIKit/UIText/UIText';
import { UIView } from '../../../Common/UIKit/ViewController/UIView';
 
const { ccclass, property, type } = _decorator;
export enum SettingType {
    COMMENT =0,//0
    VERSION,//1
    LANGUAGE,//2
    BACKGROUND_MUSIC,//3
    BTN_SOUND,
    NOAD,
    RESTORE_IAP,
    LAST,
}
//必须Enum设置才能在编辑器里设置enum的值
Enum(SettingType);

@ccclass('UILanguage')
export class UILanguage extends UIView { 
    oneCellNum = 1;
    heightCell = 160;
    listItem: ItemInfo[] = [];

    @type(UIText)
    textTitle: UIText = null;

    @type(UIImage)
    imageBg: UIImage = null;

    @type(UITableView)
    uiTableView: UITableView = null;

    static _main: UILanguage;
    //静态方法
    static get main() {
        if (this._main == null) {
         
        }
        return this._main;
    }

    onLoad() {
        super.onLoad();
        UILanguage._main = this;
        this.UpdateItem();

    }

    UpdateItem() {
        this.listItem.length = 0;
        {
            var info = new ItemInfo();
            info.title = "中文";
            info.id = sys.LANGUAGE_CHINESE;
            this.listItem.push(info);
        }
        {
            var info = new ItemInfo();
            info.title = "English";
            info.id = sys.LANGUAGE_ENGLISH;
            this.listItem.push(info);
        }
        this.InitList();
    } 
    LayOut() {
        super.LayOut();
    }
    OnClickBtnBack(event: Event, customEventData: string) {
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
