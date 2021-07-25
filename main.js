"ui";
importClass(android.graphics.Color)
importClass(android.view.MenuItem)
importClass(com.stardust.autojs.project.ProjectConfig)
importClass(com.stardust.autojs.core.ui.inflater.util.Ids)
importClass(Packages.androidx.core.graphics.drawable.DrawableCompat)
importClass(Packages.androidx.appcompat.content.res.AppCompatResources)

var Name = "AutoBattle";

var version = "5.1.0";

var appName = Name + " v" + version;

function getProjectVersion() {
    var conf = ProjectConfig.Companion.fromProjectDir(engines.myEngine().cwd());
    if (conf) return conf.versionName;
}

var floatUI = require('floatUI.js');

ui.statusBarColor("#FF4FB3FF")
ui.layout(
    <relative id="container">
        <appbar id="appbar" w="*">
            <toolbar id="toolbar" bg="#ff4fb3ff" title="{{appName}}" />
        </appbar>
        <androidx.swiperefreshlayout.widget.SwipeRefreshLayout id="swipe" layout_below="appbar" layout_above="start">
            <ScrollView id="content">
                <vertical gravity="center" layout_weight="1">

                    <vertical margin="0 5" padding="10 6 0 6" bg="#ffffff" w="*" h="auto" elevation="1dp">
                        <Switch id="autoService" margin="0 3" w="*" checked="{{auto.service != null}}" textColor="#666666" text="无障碍服务" />
                        <Switch id="foreground" margin="0 3" w="*" textColor="#000000" text="前台服务（常被鲨进程可以开启，按需）" />
                        <Switch id="stopOnVolUp" margin="0 3" w="*" textColor="#000000" text="按音量上键停止全部脚本" />
                        <Switch id="showExperimentalFixes" margin="0 3" w="*" checked="false" textColor="#666666" text="显示实验性问题修正选项" />
                        <vertical id="experimentalFixes" visibility="gone" margin="5 3" w="*">
                            <Switch id="exitOnServiceSettings" margin="0 3" w="*" checked="false" textColor="#000000" text="OPPO手机拒绝开启无障碍服务" />
                            <text id="exitOnServiceSettingsText1" visibility="gone" textSize="12" text="如果不是OPPO则不建议打开这个选项" textColor="#000000" />
                            <text id="exitOnServiceSettingsText2" visibility="gone" textSize="12" text="OPPO等部分品牌的手机在有悬浮窗(比如“加速球”)存在时会拒绝开启无障碍服务" textColor="#000000" />
                            <text id="exitOnServiceSettingsText3" visibility="gone" textSize="12" text="启用这个选项后，在弹出无障碍设置时，脚本会完全退出、从而关闭悬浮窗来避免触发这个问题" textColor="#000000" />
                            <text id="exitOnServiceSettingsText4" visibility="gone" textSize="12" text="与此同时请关闭其他有悬浮窗的应用(简单粗暴的方法就是清空后台)以确保无障碍服务可以顺利开启" textColor="#000000" />
                            <Switch id="killSelf" margin="0 3" w="*" textColor="#666666" checked="false" text="错误地检测到竖屏" />
                            <text id="killSelfText1" visibility="gone" textSize="12" text="“检测到竖屏”这个警告出现时,表示脚本因为无法获取正确的屏幕数据,而无法正确运行,比如捕获点击坐标的半透明悬浮窗本来应该完整覆盖屏幕,却只覆盖了半边屏幕" textColor="#666666" />
                            <text id="killSelfText2" visibility="gone" textSize="12" text="启用后,脚本会在按返回键退出时杀死自己的进程" textColor="#666666" />
                            <text id="killSelfText3" visibility="gone" textSize="12" text="注意!杀死自己的进程会带来一个副作用:无障碍服务需要更频繁地重新开启" textColor="#666666" />
                            <text id="killSelfText4" visibility="gone" textSize="12" text="这个选项参数不会永久保存,下次启动时会重置为默认值,也就是停用" textColor="#666666" />
                        </vertical>

                    </vertical>

                    <vertical margin="0 5" bg="#ffffff" elevation="1dp" w="*" h="auto">
                        <text text="全局设置" textColor="#000000" padding="5" w="*" bg="#eeeeee" />
                        <vertical padding="10 6 0 6" w="*" h="auto">
                            <linear margin="0 3">
                                <text text="默认执行脚本" layout_weight="1" layout_gravity="center_vertical" textColor="#666666" />
                                <spinner id="default" h="auto" gravity="right" textSize="14" entries="{{floatUI.scripts.map(x=>x.name).join('|')}}" />
                            </linear>
                            <text text="恢复药使用选择：" margin="0 5" />
                            <vertical padding="10 3 0 3" w="*" h="auto">
                                <linear>
                                    <checkbox id="drug1" text="ap恢复药50" layout_weight="1" textColor="#666666" />
                                    <input maxLength="3" id="drug1num" hint="可设置次数" text="" textSize="14" inputType="number|none" />
                                </linear>
                                <linear>
                                    <checkbox id="drug2" text="ap恢复药全" layout_weight="1" textColor="#666666" />
                                    <input maxLength="3" id="drug2num" hint="可设置次数" text="" textSize="14" inputType="number|none" />
                                </linear>
                                <linear>
                                    <checkbox id="drug3" text="魔法石" layout_weight="1" textColor="#666666" />
                                    <input maxLength="3" id="drug3num" hint="可设置次数" text="" textSize="14" inputType="number|none" />
                                </linear>
                                <linear>
                                    <checkbox id="jjcisuse" text="bp恢复药（镜层）" layout_weight="1" textColor="#666666" />
                                    <input maxLength="3" id="jjcnum" hint="可设置次数" text="" textSize="14" inputType="number|none" />
                                </linear>
                            </vertical>
                            <Switch id="justNPC" w="*" margin="0 5" checked="false" textColor="#666666" text="只使用NPC（不选则先互关好友，后NPC）" />
                        </vertical>
                    </vertical>
                    <vertical margin="0 5" bg="#ffffff" elevation="1dp" w="*" h="auto">
                        <text text="默认脚本设置" textColor="#000000" padding="5" w="*" bg="#eeeeee" />
                        <vertical padding="10 6 0 6" w="*" h="auto">
                            <Switch id="useAuto" w="*" margin="0 3" checked="true" textColor="#666666" text="优先使用官方auto（如设置用药则回复到1倍上限）" />
                            <linear padding="0 0 0 0" w="*" h="auto">
                                <text text="用药回复到上限倍数" textColor="#666666"  />
                                <input maxLength="3" margin="5 0 0 0" id="drugmul" hint="可选值1-4，默认为1" text="" textSize="14" inputType="number|none" />
                            </linear>
                        </vertical>
                    </vertical>
                    <vertical margin="0 5" bg="#ffffff" elevation="1dp" w="*" h="auto">
                        <text text="备用脚本设置" textColor="#000000" padding="5" w="*" bg="#eeeeee" />
                        <vertical padding="10 6 0 6" w="*" h="auto">
                            <Switch id="isStable" w="*" margin="0 3" checked="false" textColor="#666666" text="稳定模式（战斗中不断点击重连弹窗位置）" />
                            <text text="活动周回关卡选择：" margin="0 5" />
                            <radiogroup id="battleNo" padding="10 3 0 3">
                                <radio id="cb1" text="初级" />
                                <radio id="cb2" text="中级" />
                                <radio id="cb3" text="高级" checked="true" />
                            </radiogroup>
                            <linear margin="0 3">
                                <text text="助战x，y坐标自定义：" layout_gravity="center_vertical" />
                                <input maxLength="4" id="helpx" text="" hint="横坐标" textSize="14" inputType="number|none" />
                                <input maxLength="4" id="helpy" text="" hint="纵坐标" textSize="14" inputType="number|none" />
                            </linear>
                        </vertical>
                    </vertical>
                    <vertical margin="0 5" bg="#ffffff" elevation="1dp" w="*" h="auto">
                        <text text="关于" textColor="#000000" padding="5" w="*" bg="#eeeeee" />
                        <linear padding="10 6" bg="#ffffff">
                            <text id="versionMsg" layout_weight="1" w="*" gravity="center" color="#666666" text="尝试获取最新版本信息" />
                        </linear>
                        <linear padding="10 6" bg="#ffffff">
                            <text id="" layout_weight="1" color="#666666" text="版权声明，本app仅供娱乐学习使用，且永久免费，不可进行出售盈利。作者bilibili 虹之宝玉  群号：453053507" />
                        </linear>
                    </vertical>
                </vertical>
            </ScrollView>
        </androidx.swiperefreshlayout.widget.SwipeRefreshLayout>
        <button id="start" layout_alignParentBottom="true" w="*" text="修改配置" tag="ScriptTag" color="#ffffff" bg="#FF4FB3FF" foreground="?selectableItemBackground" />
    </relative>
);

ui.emitter.on("create_options_menu", menu => {
    let item = menu.add("查看日志");
    item.setIcon(getTintDrawable("ic_assignment_black_48dp", colors.WHITE));
    item.setShowAsAction(MenuItem.SHOW_AS_ACTION_IF_ROOM | MenuItem.SHOW_AS_ACTION_WITH_TEXT);
    item = menu.add("魔纪百科");
    item.setIcon(getTintDrawable("ic_book_black_48dp", colors.WHITE));
    item.setShowAsAction(MenuItem.SHOW_AS_ACTION_WITH_TEXT);
    item = menu.add("模拟抽卡");
    item.setIcon(getTintDrawable("ic_store_black_48dp", colors.WHITE));
    item.setShowAsAction(MenuItem.SHOW_AS_ACTION_WITH_TEXT);
});

function setFollowRedirects(value) {
    let newokhttp = new Packages.okhttp3.OkHttpClient.Builder().followRedirects(value);
    http.__okhttp__.muteClient(newokhttp);
}

const logMaxSize = 1048576;
var reportTask = null;
function reportBug() {
    toastLog("正在上传日志和最近一次的快照,请耐心等待...");

    log(appName);
    try{floatUI.logParams();} catch (e) {}
    log("Android API Level", device.sdkInt);
    log("屏幕分辨率", device.width, device.height);
    var str = "";
    for (let key of ["brand", "device", "model", "product", "hardware"]) {
        str += "\n"+key+" "+device[key];
    }
    log(str);

    var snapshotDir = files.join(files.getSdcardPath(), "auto_magireco");
    var listedFilenames = files.listDir(snapshotDir, function (filename) {
        return filename.match(/^\d+-\d+-\d+_\d+-\d+-\d+\.xml$/) != null && files.isFile(files.join(snapshotDir, filename));
    });
    var latest = [0,0,0,0,0,0];
    if (listedFilenames != null) {
        for (let i=0; i<listedFilenames.length; i++) {
            let filename = listedFilenames[i];
            let timestamp = filename.match(/^\d+-\d+-\d+_\d+-\d+-\d+/)[0];
            let timevalues = timestamp.split('_').join('-').split('-').map((val) => parseInt(val));
            let isNewer = false;
            for (let j=0; j<6; j++) {
                if (timevalues[j] > latest[j]) {
                    isNewer = true;
                    break;
                } else if (timevalues[j] < latest[j]) {
                    isNewer = false;
                    break;
                } //相等的话继续比下一项数值
            }
            if (isNewer) for (let j=0; j<6; j++) {
                latest[j] = timevalues[j];
            }
        }
    }
    var snapshotContent = null;
    if (listedFilenames != null && listedFilenames.length > 0) {
        let latestSnapshotFilename = latest.slice(0, 3).join('-') + "_" + latest.slice(3, 6).join('-') + ".xml";
        log("要上传的快照文件名", latestSnapshotFilename);
        snapshotContent = files.read(files.join(snapshotDir, latestSnapshotFilename));
        let snapshotBytes = files.readBytes(files.join(snapshotDir, latestSnapshotFilename));
        let snapshotSize = snapshotBytes.length;
        log("快照大小", snapshotSize+"字节", snapshotContent.length+"字符");
        if (snapshotSize > logMaxSize) {
            //大于1MB时不上传
            snapshotContent = null;
            toastLog("快照文件太大，请采取其他方式上传");
        }
    }

    var parentDir = files.join(engines.myEngine().cwd(), "..");
    var logDir = files.join(parentDir, "logs");
    var logContent = files.read(files.join(logDir, "log.txt"));
    let logBytes = files.readBytes(files.join(logDir, "log.txt"));
    let logSize = logBytes.length;
    log("日志大小", logSize+"字节", logContent.length+"字符");
    if (logSize > logMaxSize) {
        //大于1MB时只截取尾部
        //算法太渣，很慢，需要改
        let excessSize = logSize - logMaxSize;
        let rate = logSize / logContent.length;
        let est = excessSize / rate;
        do {
            var logTailContent = new java.lang.String(logContent).substring(est, logContent.length-1);
            var logTailSize = new java.lang.String(logTailContent).getBytes().length;
            est += (logTailSize - logMaxSize) / rate;
            sleep(1000);
        } while (logTailSize - logMaxSize > 0 || logTailSize - logMaxSize <= -32);
        logContent = logTailContent;
        log("截取尾部 日志大小", logTailSize+"字节", logContent.length+"字符");
    }

    var resultLinks = "";

    var uploadContents = {
        log: {content: logContent, syntax: "text"},
        snapshot: {content: snapshotContent, syntax: "xml"}
    };
    for (let key in uploadContents) {
        if (uploadContents[key].content == null) {
            log("读取"+key+"内容失败");
            continue;
        }
        if (uploadContents[key].content == "") {
            log(key+"内容为空,无法上传");
            continue;
        }

        toastLog("上传"+key+"...");

        http.__okhttp__.setTimeout(60 * 1000);
        setFollowRedirects(false);
        let response = null;
        try {
            response = http.post("https://pastebin.ubuntu.com/", {
                poster: "autojs_"+key,
                syntax: uploadContents[key].syntax,
                expiration: "week",
                content: uploadContents[key].content
            });
        } catch (e) {
            toastLog("请求超时,请稍后再试");
        }
        setFollowRedirects(true);

        if (response == null) {
            log(key+"上传失败");
        } else if (response.statusCode != 302) {
            log(key+"上传失败", response.statusCode, response.statusMessage);
        } else {
            if (resultLinks != "") resultLinks += "\n";
            let location = response.headers["Location"];
            resultLinks += key+"已上传至: ";
            if (location != null) {
                resultLinks += "https://pastebin.ubuntu.com"+location;
            } else {
                log(key+"链接获取失败");
                resultLinks += "链接获取失败";
            }
            toastLog(key+"上传完成!\n等待2秒后继续...");
            sleep(2000);
        }
    }

    if (resultLinks != "") {
        log(resultLinks);
        ui.run(() => {
            clip = android.content.ClipData.newPlainText("auto_bugreport_result", resultLinks);
            activity.getSystemService(android.content.Context.CLIPBOARD_SERVICE).setPrimaryClip(clip);
            toast("内容已复制到剪贴板");
        });
        dialogs.build({
            title: "上传完成",
            content: "别忘了全选=>复制，然后粘贴给群里的小伙伴们看看哦~ 不然的话，我们也不知道你上传到哪里了啊！！！",
            inputPrefill: resultLinks
        }).show();
        log("报告问题对话框已关闭");
    }
}


ui.emitter.on("options_item_selected", (e, item) => {
    switch (item.getTitle()) {
        case "查看日志":
            app.startActivity("console")
            break;
        case "魔纪百科":
            app.openUrl("https://magireco.moe/");
            break;
        case "模拟抽卡":
            app.openUrl("https://rika.ren/~kuro/workspace/playground/");
            break;
    }
    e.consumed = true;
});

activity.setSupportActionBar(ui.toolbar);

function getTintDrawable(name, tint) {
    var id = context.getResources().getIdentifier(name, "drawable", context.getPackageName());
    var raw = AppCompatResources.getDrawable(context, id);
    var wrapped = DrawableCompat.wrap(raw);
    DrawableCompat.setTint(wrapped, tint);
    return wrapped
}

//无障碍开关监控
ui.autoService.setOnCheckedChangeListener(function (widget, checked) {
    if (checked && !auto.service) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service) auto.service.disableSelf()
    ui.autoService.setChecked(auto.service != null)
});

ui.showExperimentalFixes.setOnCheckedChangeListener(function (widget, checked) {
    ui.experimentalFixes.setVisibility(checked?View.VISIBLE:View.GONE);
});
//前台服务
$settings.setEnabled('foreground_service', $settings.isEnabled('foreground_service')); //修正刚安装好后返回错误的数值，点进设置再出来又变成正确的数值的问题
ui.foreground.setChecked($settings.isEnabled('foreground_service'));
ui.foreground.setOnCheckedChangeListener(function (widget, checked) {
    $settings.setEnabled('foreground_service', checked);
});
//按音量上键完全退出脚本
$settings.setEnabled('stop_all_on_volume_up', $settings.isEnabled('stop_all_on_volume_up')); //修正刚安装好后返回错误的数值，点进设置再出来又变成正确的数值的问题
ui.stopOnVolUp.setChecked($settings.isEnabled('stop_all_on_volume_up'));
ui.stopOnVolUp.setOnCheckedChangeListener(function (widget, checked) {
    $settings.setEnabled('stop_all_on_volume_up', checked);
});

//显示更多选项
function setToggleListener(key) {
    ui["toggle"+key+"ExtraSettings"].setOnCheckedChangeListener(function (widget, checked) {
        for (let i=1; ui[key+"ExtraSettings"+i] != null; i++) {
            ui[key+"ExtraSettings"+i].setVisibility(checked?View.VISIBLE:View.GONE);
        }
    });
}
for (let key of ["Default", "Mirrors", "CVAutoBattle"]) {
    setToggleListener(key);
}


//回到本界面时，resume事件会被触发
ui.emitter.on("resume", () => {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
    if (!floatIsActive) {
        floatUI.main()
        floatIsActive = true;
    }
});

//监听刷新事件
ui.swipe.setOnRefreshListener({
    onRefresh: function () {
        //为了看效果延迟一下
        toUpdate()
        ui.swipe.setRefreshing(false);
    },
});
//-----------------自定义逻辑-------------------------------------------

var floatIsActive = false;
// 悬浮窗权限检查
if (!floaty.checkPermission()) {
    app.startActivity({
        packageName: "com.android.settings",
        className: "com.android.settings.Settings$AppDrawOverlaySettingsActivity",
        data: "package:" + context.getPackageName(),
    });
} else {
    floatUI.main();
    floatIsActive = true;
}

var storage = storages.create("auto_mr");

const persistParamList = [
    "foreground",
    "stopOnVolUp",
    "exitOnServiceSettings",
    "default",
    "autoReconnect",
    "justNPC",
    "helpx",
    "helpy",
    "battleNo",
    "useAuto",
    "autoFollow",
    "breakAutoCycleDuration",
    "forceStopTimeout",
    "periodicallyKillTimeout",
    "timeout",
    "rootForceStop",
    "rootScreencap",
    "smartMirrorsPick",
    "useCVAutoBattle",
    "CVAutoBattleDebug",
    "CVAutoBattleClickAllSkills",
];
const tempParamList = [
    "drug1",
    "drug2",
    "drug3",
    "drug4",
    "drug1num",
    "drug2num",
    "drug3num",
    "drug4num",
    "apmul",
    "killSelf",
];


var idmap = {};
var field = (new Ids()).getClass().getDeclaredField("ids");
field.setAccessible(true);
var iter = field.get(null).keySet().iterator();
while (iter.hasNext()) {
    let item = iter.next();
    idmap[Ids.getId(item)] = item;
}

function syncValue(key, value) {
    switch (ui[key].getClass().getSimpleName()) {
        // input
        case "JsEditText":
            if (value !== undefined)
                ui[key].setText(value)
            return ui[key].getText() + ""
        case "Switch":
        case "CheckBox":
            if (value !== undefined)
                ui[key].setChecked(value)
            return ui[key].isChecked()
        case "JsSpinner":
            if (value !== undefined && ui[key].getCount() > value)
                ui[key].setSelection(value, true)
            return ui[key].getSelectedItemPosition()
        case "RadioGroup": {
            if (value !== undefined && ui[value])
                ui[value].setChecked(true)
            let name = "";
            let id = ui[key].getCheckedRadioButtonId();
            if (id >= 0)
                name = idmap[ui[key].getCheckedRadioButtonId()]
            return name
        }

    }
}


function saveParamIfPersist(key, value) {
    for (let paramName of persistParamList) {
        if (paramName === key) {
            log("保存参数：", key, value);
            storage.put(key, value);
        }
    }
}

function setOnChangeListener(key) {
    switch (ui[key].getClass().getSimpleName()) {
        case "JsEditText":
            ui[key].addTextChangedListener(
            new android.text.TextWatcher({
            afterTextChanged: function (s) {
                let value = ""+s;
                saveParamIfPersist(key, value); //直接用s作为参数会崩溃
                floatUI.adjust(key, value);
            }
            })
            );
            break;
        case "CheckBox":
        case "Switch":
            ui[key].setOnCheckedChangeListener(
            function (widget, checked) {
                for (let i=1; ui[key+"Text"+i]!=null; i++) {
                    ui[key+"Text"+i].setVisibility(checked?View.VISIBLE:View.GONE);
                }
                saveParamIfPersist(key, checked);
                floatUI.adjust(key, checked);
            }
            );
            break;
        case "JsSpinner":
            ui[key].setOnItemSelectedListener(
            new android.widget.AdapterView.OnItemSelectedListener({
            onItemSelected: function (spinnerparent, spinnerview, spinnerposition, spinnerid) {
                saveParamIfPersist(key, spinnerposition);
                floatUI.adjust(key, spinnerposition);
            }
            })
            );
            break;
        case "RadioGroup":
            ui[key].setOnCheckedChangeListener(
            new android.widget.RadioGroup.OnCheckedChangeListener({
            onCheckedChanged: function (group, checkedId) {
                let name = idmap[checkedId];
                if (name) {
                    saveParamIfPersist(key, name);
                    floatUI.adjust(key, name);
                }
            }
            })
            );
            break;
    }
}

//限制timeout的取值
ui["timeout"].addTextChangedListener(
new android.text.TextWatcher({
afterTextChanged: function (s) {
    let str = ""+s;
    let value = parseInt(str);
    if (isNaN(value) || value < 100) {
        s.replace(0, str.length, "5000");
    }
}
})
);


for (let key of persistParamList) {
    let value = storage.get(key)
    syncValue(key, value)
    floatUI.adjust(key, value)
}

ui.start.click(() => {
    for (let key of persistParamList) {
        let value = syncValue(key)
        log("保存参数：", key, value)
        storage.put(key, value)
        floatUI.adjust(key, value)
    }

    for (let key of tempParamList) {
        let value = syncValue(key)
        floatUI.adjust(key, value)
    }

    toastLog("修改完成")
});

//版本获取

var refreshUpdateStatus = sync(function () {
    http.__okhttp__.setTimeout(5000);
    try {
        let res = http.get("https://cdn.jsdelivr.net/gh/icegreentee/magireco_autoBattle@latest/project.json");
        if (res.statusCode != 200) {
            log("请求失败: " + res.statusCode + " " + res.statusMessage);

            ui.run(function () {
                ui.versionMsg.setText("获取失败")
                ui.versionMsg.setTextColor(colors.parseColor("#666666"))
            })
        } else {
            let resJson = res.body.json();
            if (parseInt(resJson.versionName.split(".").join("")) <= parseInt(version.split(".").join(""))) {
                ui.run(function () {
                    ui.versionMsg.setText("当前无需更新")
                    ui.versionMsg.setTextColor(colors.parseColor("#666666"))
                });
            } else {
                ui.run(function () {
                    ui.versionMsg.setText("最新版本为" + resJson.versionName + ",下拉进行更新")
                    ui.versionMsg.setTextColor(colors.RED)
                });
            }
        }
    } catch (e) {
        ui.run(function () {
            ui.versionMsg.setText("请求超时")
            ui.versionMsg.setTextColor(colors.parseColor("#666666"))
        })
    }
});
threads.start(function () {refreshUpdateStatus();});

//版本更新
function toUpdate() {
    try {
        let res = http.get("https://cdn.jsdelivr.net/gh/icegreentee/magireco_autoBattle/project.json");
        if (res.statusCode != 200) {
            toastLog("请求超时")
        } else {
            let resJson = res.body.json();
            if (parseInt(resJson.versionName.split(".").join("")) <= parseInt(version.split(".").join(""))) {
                toastLog("无需更新")
            } else {
                let main_script = http.get("https://cdn.jsdelivr.net/gh/icegreentee/magireco_autoBattle/main.js");
                let float_script = http.get("https://cdn.jsdelivr.net/gh/icegreentee/magireco_autoBattle/floatUI.js");
                if (main_script.statusCode == 200 && float_script.statusCode == 200) {
                    toastLog("更新加载中");
                    let mainjs = main_script.body.string();
                    let floatjs = float_script.body.string();
                    files.write(engines.myEngine().cwd() + "/main.js", mainjs)
                    files.write(engines.myEngine().cwd() + "/floatUI.js", floatjs)
                    engines.stopAll()
                    events.on("exit", function () {
                        engines.execScriptFile(engines.myEngine().cwd() + "/main.js")
                        toast("更新完毕")
                    })

                    floatUI.isUpgrading = true; //避免把自己的后台杀了
                    engines.stopAll()

                } else {
                    toast("脚本获取失败！这可能是您的网络原因造成的，建议您检查网络后再重新运行软件吧\nHTTP状态码:" + main_script.statusMessage, "," + float_script.statusMessag);
                }
            }
        }

    } catch (error) {
        toastLog("请求超时，可再一次尝试")
    }

}

floatUI.enableToastParamChanges();

