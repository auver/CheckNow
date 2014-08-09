CheckNow
========

Lightweight Form Validation (Can Use HTML5 Attr)
一款轻量级的表单验证jQuery插件（可以使用HTML5新增的属性，从而避免书写繁琐的字面量来配置）
 - 传入0个参数，则使用默认设置，根据form中各input的属性分析;
 - 传入1个参数，则需要使用字面量传入，可以有fields和config两个名称:
  - fields下的对象，以jQuery选择器命名，对应的值为包含属性对的对象;
  - config下为全局属性，仅在fields下的单个input属性缺失时，使用全局属性.
 - 传入2个参数，前为fields，后为config.

可以设置的全局属性：
 - autoCheck （布尔型）true为在填写时就开始检测
 - submitButton 表单提交按钮选择器，如果为空，使用form默认的submit
 - message 错误消息的文字内容
 - errorClass 检测出错的input需要追加的类
 - messageClass 显示的错误文字的类名

可以设置的单个属性：
 - message 错误消息的文字内容
 - errorClass 检测出错的input需要追加的类
 - messageClass 显示的错误文字的类名
 - required （布尔型）功能同HTML5属性，建议直接在HTML中书写，增加语义性
 - type 同HTML5属性，建议直接在HTML中书写，增加语义性，可进行验证的值有email url cnmobile cntel cnphone qqnumber postcode number range
 - pattern 功能同HTML5属性，建议直接在HTML中书写，增加语义性
 - max 功能同HTML5属性，建议直接在HTML中书写，增加语义性
 - min 功能同HTML5属性，建议直接在HTML中书写，增加语义性
 - step 功能同HTML5属性，建议直接在HTML中书写，增加语义性
