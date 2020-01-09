package com.stylefeng.guns.modular.system.controller;

import com.stylefeng.guns.core.base.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import com.stylefeng.guns.core.log.LogObjectHolder;
import org.springframework.web.bind.annotation.RequestParam;
import com.stylefeng.guns.modular.system.model.Split;
import com.stylefeng.guns.modular.system.service.ISplitService;

/**
 * 分表控制器
 *
 * @author fengshuonan
 * @Date 2020-01-09 14:32:10
 */
@Controller
@RequestMapping("/split")
public class SplitController extends BaseController {

    private String PREFIX = "/system/split/";

    @Autowired
    private ISplitService splitService;

    /**
     * 跳转到分表首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "split.html";
    }

    /**
     * 跳转到添加分表
     */
    @RequestMapping("/split_add")
    public String splitAdd() {
        return PREFIX + "split_add.html";
    }

    /**
     * 跳转到修改分表
     */
    @RequestMapping("/split_update/{splitId}")
    public String splitUpdate(@PathVariable Integer splitId, Model model) {
        Split split = splitService.selectById(splitId);
        model.addAttribute("item",split);
        LogObjectHolder.me().set(split);
        return PREFIX + "split_edit.html";
    }

    /**
     * 获取分表列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(String condition) {
        return splitService.selectList(null);
    }

    /**
     * 新增分表
     */
    @RequestMapping(value = "/add")
    @ResponseBody
    public Object add(Split split) {
        splitService.insert(split);
        return SUCCESS_TIP;
    }

    /**
     * 删除分表
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Object delete(@RequestParam Integer splitId) {
        splitService.deleteById(splitId);
        return SUCCESS_TIP;
    }

    /**
     * 修改分表
     */
    @RequestMapping(value = "/update")
    @ResponseBody
    public Object update(Split split) {
        splitService.updateById(split);
        return SUCCESS_TIP;
    }

    /**
     * 分表详情
     */
    @RequestMapping(value = "/detail/{splitId}")
    @ResponseBody
    public Object detail(@PathVariable("splitId") Integer splitId) {
        return splitService.selectById(splitId);
    }
}
