
import { _decorator, Component, Node, CCObject, resources, Prefab, sys } from 'cc';
import { Debug } from '../Debug';
import { Dictionary } from '../Dictionary';
import { FileUtil } from '../File/FileUtil';
import { JsonUtil } from '../File/JsonUtil';
import { CSVParser } from '../FileParse/CSV/CSVParser';
import { ResManager } from '../Res/ResManager';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('LTLocalization')
export class LTLocalization extends CCObject {
    public static ENGLISH = "EN";
    public static CHINESE = "CN";
    public static JAPANESE = "JP";
    public static FRENCH = "FR";
    public static GERMAN = "GE";
    public static ITALY = "IT";
    public static KOREA = "KR";
    public static RUSSIA = "RU";
    public static SPANISH = "SP";


    KEY_CODE = "KEY";
    indexLanguage = 0;

    // private dicData: { [key: string]: string } = {}; //声明字典
    
    dicData:Dictionary = null;

    language = sys.LANGUAGE_CHINESE;


    csvParser: CSVParser = null;


    GetLanguageKeyName(lan: string) {
        var ret = LTLocalization.CHINESE;

        switch (lan) {
            case sys.LANGUAGE_CHINESE:
                {
                    ret = LTLocalization.CHINESE;
                }
                break;
            case sys.LANGUAGE_ENGLISH:
                {
                    ret = LTLocalization.ENGLISH;
                }
                break;
        }

        return ret;
    }

    GetLanguageIndexByName(str: string) {
        var listTable = this.csvParser.listTable;
        var list = listTable[0];
        for (var i = 1; i < list.length; i++) {
            //Debug.Log("GetLanguageIndexByName indexLanguage i=" + i + " list[i]=" + list[i] + " str=" + str);
            if (list[i] == str) {
                // Debug.Log("indexLanguage i=" + i + " list[i]=" + list[i] + " str=" + str);
                return i;
            }
        }
        return 1;
    }
    ReadData(data: any) {
        this.dicData = new Dictionary();
        this.csvParser = new CSVParser();
        this.csvParser.ReadData(data);
        this.SetLanguage(this.language);

    }

    SetLanguage(lan: any) {
        this.language = lan;
        if (this.dicData == null) {
            return;
        }
        this.dicData.Clear();
        var key_lan = this.GetLanguageKeyName(lan);
        this.indexLanguage = this.GetLanguageIndexByName(key_lan);

        //var row_count = this.csvParser.listTable.length;
        var row_count = this.csvParser.GetRowCount();

        Debug.Log("indexLanguage=" + this.indexLanguage + " key_lan=" + key_lan);

        for (var row = 0; row < row_count; row++) {
            var key = this.csvParser.GetText(row, 0);
            var value = this.csvParser.GetText(row, this.indexLanguage);
            //Debug.Log("dicData.Add key=" + key + " value=" + value);
            this.dicData.Add(key, value);
        }
    }
    GetLanguage() {
        return this.language;
    }

    GetText(key: any) {
        if (this.IsContainsKey(key)) {
            return this.dicData.Get(key);
        }
        return "[NoDefine]" + key;
    }

    IsContainsKey(key: any) {
        if (this.dicData == null) {
            return false;
        }
        var ret = this.dicData.Contains(key); 
        return ret;
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
