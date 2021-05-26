
import { _decorator, Component, Node, instantiate } from 'cc';
import { UIImage } from '../../Common/UIKit/UIImage/UIImage';
import { UIView } from '../../Common/UIKit/ViewController/UIView';
import { UIText } from '../../Common/UIKit/UIText/UIText';   
import { Debug } from '../../Common/Debug';
import { UICellItemBase } from '../../Common/UIKit/UITableView/UICellItemBase';
const { ccclass, property, type } = _decorator;


@ccclass('UISettingCellItem')
export class UISettingCellItem extends UICellItemBase {
    @type(UIText)
    textTitle: UIText = null;

    @type(UIImage)
    imageBg: UIImage = null; 
 
 
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
