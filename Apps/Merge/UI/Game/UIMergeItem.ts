
import { _decorator, Component, Node, Prefab } from 'cc'; 
import { Debug } from '../../../../Common/Debug';
import { UIView } from '../../../../Common/UIKit/ViewController/UIView';
import { GameData } from '../../Data/GameData';
import { UIGameMerge } from './UIGameMerge';
const { ccclass, property, type } = _decorator;

@ccclass('UIMergeItem')
export class UIMergeItem extends UIView {
    

    properties: {
        nodeItem: cc.Node,
        collision: cc.py,
        spriteItem: {
            default: null,
            type: cc.UISprite
        }

        isNew: false,
        type: 0,
        t: 0,
        hasGoDownDeadLine: false,
    }
    onLoad () {
        super.onLoad();
        this.t = 0;
        // this.node.zIndex = 100;
        // var manager = cc.director.getCollisionManager();
        // manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // var collider = this.node.getComponent(cc.PhysicsBoxCollider);
        var ev = this.node.addComponent(cc.UITouchEvent);
        ev.callBackTouch = this.OnUITouchEvent.bind(this);
    }
    start () {
        super.start();
    }

    update () {
        if (!this.isNew) {
            // 游戏失败判断  onCollisionEnter 碰撞检测失效 直接判断位置
            this.IsCollisionDeadLine();
            // this.t += cc.director.getDeltaTime();
            // if (this.t > 2.0) {
                // this.t = 0;
                // var pos = GameMerge.main.nodeDeadline.getPosition();
                // var y_top = this.node.getPosition().y + this.node.getBoundingBox().height / 2;
                // if (y_top >= pos.y) {
                //     Debug.Log("UIMergeItem this.hasGoDownDeadLine="+this.hasGoDownDeadLine);
                //     if (this.hasGoDownDeadLine) {
                //         if (!GameData.main.isGameFail) {

                //             GameData.main.isGameFail = true;
                //             Debug.Log("UIMergeItem game over");
                //             cc.UIGameMerge.main.OnGameFinish(true);
                //         }
                //     }

                // } else {
                //     this.hasGoDownDeadLine = true;
                // }


            // }
 
        }
    }

    // 碰撞线检测
    IsCollisionDeadLine () {
        var pos = GameMerge.main.nodeDeadline.getPosition();
        var y1 = this.node.getPosition().y + this.GetBoundingBox().height / 2;
        var y2 = this.node.getPosition().y - this.GetBoundingBox().height / 2;
        if ((pos.y > y2) && (pos.y < y1)) {
            this.t += cc.director.getDeltaTime();
            if (this.t > 2.0) {
                this.t = 0;
                if (!GameData.main.isGameFail) {
                    GameData.main.isGameFail = true;
                    Debug.Log("UIMergeItem game over");
                    UIGameMerge.main.OnGameFinish(true);
                }
            }

            return true;
        }
        return false;
    }

    UpdateImage (pic) {
        this.spriteItem = this.nodeItem.getComponent(cc.UISprite);
        this.spriteItem.UpdateImageCloud(pic);
    }

    EnableGravity (isEnable) {
        var bd = this.node.getComponent(cc.RigidBody);
        bd.type = isEnable ? cc.RigidBodyType.Dynamic : cc.RigidBodyType.Static;
    }

    OnTouchDown (pos) {
    }
    OnTouchMove (pos) {
    }
    OnTouchUp (pos) {
    }
    OnUITouchEvent (ev, status, event) {

        var pos = event.getLocation();//canvas坐标原点在屏幕左下角 
        var posnode = this.node.convertToNodeSpace(pos);//坐标原点在node左下角
        var posnodeAR = this.node.convertToNodeSpaceAR(pos);//坐标原点在node的锚点

        switch (status) { 
            case cc.UITouchEvent.TOUCH_DOWN:
                this.OnTouchDown(posnodeAR);
                break;

            case cc.UITouchEvent.TOUCH_MOVE:
                this.OnTouchMove(posnodeAR);
                break;

            case cc.UITouchEvent.TOUCH_UP:
                this.OnTouchUp(posnodeAR);
                break;
        }
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
