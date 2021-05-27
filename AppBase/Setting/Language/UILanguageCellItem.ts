
import { _decorator, Component, Node, instantiate } from 'cc';
import { Common } from '../../../Common/Common';
import { CommonRes } from '../../../Common/CommonRes';
import { Debug } from '../../../Common/Debug';
import { ItemInfo } from '../../../Common/ItemInfo';
import { Language } from '../../../Common/Language/Language';
import { UIButton } from '../../../Common/UIKit/UIButton/UIButton';
import { UIImage } from '../../../Common/UIKit/UIImage/UIImage';
import { UICellItemBase } from '../../../Common/UIKit/UITableView/UICellItemBase';
import { UIText } from '../../../Common/UIKit/UIText/UIText';
import { AppSceneBase } from '../../Common/AppSceneBase';
import { UILanguage } from './UILanguage';
const { ccclass, property, type } = _decorator;


@ccclass('UILanguageCellItem')
export class UILanguageCellItem extends UICellItemBase {

    listImage: string[] = ["IMAGE_CELL_BG_BLUE", "IMAGE_CELL_BG_ORINGE", "IMAGE_CELL_BG_YELLOW"];

    @type(UIText)
    textTitle: UIText = null;

    @type(UIImage)
    imageBg: UIImage = null;
    @type(UIButton)
    btnSwitch: UIButton = null;

    info: ItemInfo;

    onLoad() {
        super.onLoad();
    }

    init(index, data, reload, group) {
        this.node.active = true;
        this.index = index;
        if (index >= data.array.length) {
            // this.index.string = '越界';
            // this.group.string = group.toString();
            this.node.active = false;
            return;
        }
        this.target = data.target;
        this.info = data.array[index];
        this.UpdateItem(this.info);
        //KEY_BACKGROUND_MUSIC
    }

    OnClickItem() {
        var uiViewParent = this.GetUIViewParent();// 
        var lan =Language.main;
       Debug.Log("language id= " + this.info.id);
        lan.SetLanguage(this.info.id);
       AppSceneBase.main.UpdateLanguage();

       Common.SetItemOfKey(CommonRes.KEY_LANGUAGE, this.info.id); 
       UILanguage.main.OnClickBtnBack(null,null);
    }
    UpdateItem(info) {
        Debug.Log("UISettingCellItem UpdateItem info.title=" + info.title);
        this.textTitle.text = info.title;
        this.btnSwitch.node.active = false;

    }


    UpdateImageBg(pic) {
        // this.imageBg.UpdateImageKey(pic);
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
