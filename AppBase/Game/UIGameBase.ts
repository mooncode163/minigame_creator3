
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
