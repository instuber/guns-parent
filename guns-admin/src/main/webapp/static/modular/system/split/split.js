/**
 * 分表管理初始化
 */
var Split = {
    id: "SplitTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Split.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: 'id', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: '名称', field: 'name', visible: true, align: 'center', valign: 'middle'},
            {title: '数量', field: 'num', visible: true, align: 'center', valign: 'middle'},
            {title: '备注', field: 'remark', visible: true, align: 'center', valign: 'middle'},
            {title: '创建时间', field: 'createDate', visible: true, align: 'center', valign: 'middle'},
            {title: '创建人', field: 'createUser', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
Split.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Split.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加分表
 */
Split.openAddSplit = function () {
    var index = layer.open({
        type: 2,
        title: '添加分表',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/split/split_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看分表详情
 */
Split.openSplitDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '分表详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/split/split_update/' + Split.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除分表
 */
Split.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/split/delete", function (data) {
            Feng.success("删除成功!");
            Split.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("splitId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询分表列表
 */
Split.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Split.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Split.initColumn();
    var table = new BSTable(Split.id, "/split/list", defaultColunms);
    table.setPaginationType("client");
    Split.table = table.init();
});
