/**
 * 初始化分表详情对话框
 */
var SplitInfoDlg = {
    splitInfoData : {}
};

/**
 * 清除数据
 */
SplitInfoDlg.clearData = function() {
    this.splitInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
SplitInfoDlg.set = function(key, val) {
    this.splitInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
SplitInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
SplitInfoDlg.close = function() {
    parent.layer.close(window.parent.Split.layerIndex);
}

/**
 * 收集数据
 */
SplitInfoDlg.collectData = function() {
    this
    .set('id')
    .set('name')
    .set('num')
    .set('remark')
    .set('createDate')
    .set('createUser');
}

/**
 * 提交添加
 */
SplitInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/split/add", function(data){
        Feng.success("添加成功!");
        window.parent.Split.table.refresh();
        SplitInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.splitInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
SplitInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/split/update", function(data){
        Feng.success("修改成功!");
        window.parent.Split.table.refresh();
        SplitInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.splitInfoData);
    ajax.start();
}

$(function() {

});
