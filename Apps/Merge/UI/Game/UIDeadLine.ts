
import { _decorator, Component, Node, Prefab, Collider2D, Contact2DType, IPhysics2DContact, director } from 'cc';
import { Debug } from '../../../../Common/Debug';
import { UIView } from '../../../../Common/UIKit/ViewController/UIView';
import { GameData } from '../../Data/GameData';
import { UIGameMerge } from './UIGameMerge';
import { UIMergeItem } from './UIMergeItem';
const { ccclass, property, type } = _decorator;

@ccclass('UIDeadLine')
export class UIDeadLine extends UIView {
    t = 0;
    isGameFail = false;

    onLoad() {
        super.onLoad();
        this.node.name = GameData.NameDeadLine;
        this.t = 0;
        this.isGameFail = false;

        // 还需要body勾选回调接口 cocos 的碰撞区检测必须同时有刚体 和unity不一样
        let collider = this.node.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
            collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
            collider.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        }

    }
    start() {
        super.start();
    }
 
    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        Debug.Log('UIDeadLine OnCollisionEnter2D on collision enter onBeginContact otherCollider.name=' + otherCollider.node.name + " this.name=" + this.node.name);
        this.t = 0;
    }

    // 只在两个碰撞体结束接触时被调用一次
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when the contact between two colliders just about to end.
        // Debug.Log('onEndContact');
    }

    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called every time collider contact should be resolved
        this.t += director.getDeltaTime();
        if (otherCollider.node.name != GameData.NameDeadLine) {
            Debug.Log("UIDeadLine onPreSolve enter other.name=" + otherCollider.node.name);

            var ui = otherCollider.node.getComponent(UIMergeItem);
            if (ui != null)
            {
                if (ui.isNew)
                {
                    this.t = 0;
                }
                if (this.t >= 2.0)
                {
                    // GameObject.Find("CodeControl").GetComponent<ScoreControl>().SaveScore();//保存分数
                    // SceneManager.LoadScene("Over");//切换场景
                    this.t = 0;
                    if (!this.isGameFail)
                    {
                        this.isGameFail = true;
                        UIGameMerge.main.OnGameFinish(true);
                    }
                }
            }
        }
    }

    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called every time collider contact should be resolved
        // Debug.Log('onPostSolve');
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
