
import { _decorator, Component, Node, Prefab, Collider2D, Contact2DType, IPhysics2DContact, CircleCollider2D, PhysicsSystem2D } from 'cc';
import { AudioPlay } from '../../../../Common/Audio/AudioPlay';
import { Common } from '../../../../Common/Common';
import { Debug } from '../../../../Common/Debug';
import { UIView } from '../../../../Common/UIKit/ViewController/UIView';
import { GameData } from '../../Data/GameData';
import { GameMerge } from './GameMerge';
import { UIGameMerge } from './UIGameMerge';
const { ccclass, property, type } = _decorator;

@ccclass('CollisionDetection')
export class CollisionDetection extends UIView {

    isItDetected = true;//定义是否进行碰撞检测后逻辑判断
    playFallingSound = false;//定义是否播放过下落声音 
    onLoad() {
        this.isItDetected = true;
        super.onLoad();

        // 还需要body勾选回调接口
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
            collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
            collider.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        }

        // Registering global contact callback functions
        // if (PhysicsSystem2D.instance) {
        //     PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        //     PhysicsSystem2D.instance.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        //     PhysicsSystem2D.instance.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
        //     PhysicsSystem2D.instance.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        // }

    }
    start() {
        super.start();
    }


    CheckCollision(other) {
        var _tag = other.node.name;//获取被碰撞物体的Tag 

        //播放下落声音
        if (other.node.name == GameData.NameDeadLine && this.playFallingSound == false) {
            //播放下落声音
            this.playFallingSound = true;
            // AudioPlay.main.PlayFile(AppRes.AUDIO_Down);
            AudioPlay.main.PlayByKey("Down");
        }
        if (other.node.name != this.node.name) {
            // Debug.Log("OnCollisionEnter2D other.node.name != this.node.name"+_tag);
            return;
        }


        // 在出生地方不检测
        var enable = false;
        var limity = 10;
        var stepy = 0;
        stepy = Math.abs(this.node.position.y - GameMerge.main.posYInit);
        if (stepy < limity) {
            Debug.Log("OnCollisionEnter2D stepy 1=" + stepy);
            return;
        }
        stepy = Math.abs(other.node.position.y - GameMerge.main.posYInit);
        if (stepy < limity) {
            Debug.Log("OnCollisionEnter2D stepy 2=" + stepy);
            return;
        }



        // 检测是否产生新的
        var otherDetect = other.node.getComponent(CollisionDetection).HasTheDeliveryBeenDetected();
        Debug.Log("OnCollisionEnter2D otherDetect=" + otherDetect);
        if (this.isItDetected == true && otherDetect) //判断碰撞物体的tag是否与自身一致和是否应该检测
        {
            this.isItDetected = false;//不进行检测
            other.node.getComponent(CollisionDetection).IgnoreDetection();//停止对方检测
            var v2 = other.node.position;//保存被碰撞物体的位置
            //   _tag = other.transform.tag;//获取被碰撞物体的Tag
            Debug.Log("OnCollisionEnter2D other=" + _tag);
            //判断是否超出最大水果限制
            // if (Convert.ToInt32(_tag) < Generate.imageKeyFruit.Length)
            var keynext = GameMerge.main.GetNextItem(_tag);

            if (Common.BlankString(keynext)) {
                Debug.Log("OnCollisionEnter2D keynext blank");
                return;
            }


            {
                Debug.Log("OnCollisionEnter2D keynext=" + keynext + " this.name=" + this.node.name + " other.name=" + other.node.name + " this.position=" + this.node.position + " other.position=" + other.node.position);
                //在被碰撞的物体原有的位置上生成新物体

                var uiNext = GameMerge.main.CreateItem(keynext);
                uiNext.node.setPosition(v2);
                uiNext.EnableGravity(true);
                uiNext.hasGoDownDeadLine = true;
                GameMerge.main.ShowMergeParticle(v2, _tag);
                //播放合成声音 
                // AudioPlay.main.PlayFile(AppRes.AUDIO_Merge);
                AudioPlay.main.PlayByKey("Merge");
                //增加分数

                GameData.main.score += 10 * GameMerge.main.GetIndexOfItem(keynext);
                UIGameMerge.main.UpdateScore();

                GameMerge.main.RemoveItemFromList(this.node);
                GameMerge.main.RemoveItemFromList(other.node);
                Debug.Log("OnCollisionEnter2D destroy ");
                this.node.destroy();
                other.node.destroy();

                if (keynext == GameMerge.main.GetLastItem()) {
                    //game win 合成了大西瓜
                    //  UIGameMerge.main.OnGameFinish(false);
                }
            }
        }


    }

    /// <summary>
    /// 用来忽略检测
    /// </summary>
    IgnoreDetection()//用于忽略检测
    {
        this.isItDetected = false;//不进行检测
    }

    HasTheDeliveryBeenDetected() {
        return this.isItDetected;
    }

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        Debug.Log('CollisionDetection OnCollisionEnter2D on collision enter onBeginContact otherCollider.name=' + otherCollider.node.name + " this.name=" + this.node.name);
        this.CheckCollision(otherCollider);
    }

    // 只在两个碰撞体结束接触时被调用一次
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when the contact between two colliders just about to end.
        Debug.Log('onEndContact');
    }

    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called every time collider contact should be resolved
        if (otherCollider.node.name == GameData.NameDeadLine) {
            Debug.Log("CollisionDetection onPreSolve enter other.name=" + otherCollider.node.name);
        }
    }

    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called every time collider contact should be resolved
        Debug.Log('onPostSolve');
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
