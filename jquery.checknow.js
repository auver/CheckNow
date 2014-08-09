(function($) {
	/*传入0个参数，则使用默认设置，根据form中各input的属性分析（不推荐）
	 *传入1个参数，则需要使用字面量传入，可以有fields和config两个名称
	 *fields下的对象，以jQuery选择器选择input的方式命名，对应的值为包含属性对的对象
	 *config下为全局属性，fields下的单个input属性会覆盖全局属性
	 *传入2个参数，前为fields，后为config
	 */
	$.fn.checkNow = function() {
		var fields, config;
		var $_this = $(this);
		var defaultConfig = {
			checkType: 'auto', //input的类型，默认是自动
			autoCheck: false, //在填写时就开始检测
			submitButton: '', //表单提交按钮选择器，如果为空，使用form中的submit
			success: '',
			failed: '',
			message: null,
			errorClass: 'checkError', //检测出错的input需要追加的类
			messageClass: 'errorMsg' //显示错误的类名
		};
		if (arguments.length == 1) {
			fields = arguments[0].fields;
			config = arguments[0].config;
		} else if (arguments.length == 2) {
			fields = arguments[0];
			config = arguments[1];
		}

		config = $.extend({}, defaultConfig, config);

		/* 每个input可以设置的选项
		 * message, errorClass, messageClass 推荐仅在个例时使用
		 * required, type 推荐设置为input标签属性
		 *
		 */
		function fieldCheck(name, args) {
			var $field = $(name);
			args = args || {};
			var message = args.message || config.message;
			var errorClass = args.errorClass || config.errorClass;
			var messageClass = args.messageClass || config.messageClass;
			$field.each(function(index) {
				var $th = $(this);

				function validNow() {
					var required = args.required !== undefined ? args.required : !!$th.attr('required') || false;
					var type = args.type !== undefined ? args.type.toLowerCase() : $th.attr('type').toLowerCase();
					var pattern = args.pattern || $th.attr('pattern');
					var maxVal = args.max || $th.attr('max');
					var minVal = args.min || $th.attr('min');
					var step = args.step || $th.attr('step');
					var val = $th.val();
					var error = false;
					var msgTxt = args.message;
					var msgSource = {
						email: '请输入邮箱地址',
						url: '请输入网址',
						cnmobile: '请输入手机号码',
						cntel: '请输入固定电话号码',
						cnphone: '请输入电话号码',
						qqnumber: '请输入QQ号码',
						postcode: '请输入邮政编码',
						number: '请输入有效数字',
						range: '请输入指定范围数字',
						default: '请正确输入'
					};
					msgTxt = msgTxt || msgSource[type] || msgSource['default'];

					if (type != 'password') {
						//trim the input
						val = $.trim(val);
						$th.val(val);
					}

					$th.removeClass(errorClass).next().filter('.' + messageClass).remove();
					if (val.length === 0) {
						if (required) {
							var $errorTpl = $('<span>' + msgTxt + '</span>').attr('class', messageClass);
							existError = true;
							$th.addClass(errorClass).after($errorTpl);
							return false;
						} else {
							return true;
						}

					}

					switch (type) {
						case 'email':
							error = error | !/^(?:\w+\.?\+?)*\w+@(?:\w+\.)+\w+$/.test(val);
							break;
						case 'url':
							error = error | !/((https?|ftp|mms):\/\/)?([A-z0-9]+[_\-]?[A-z0-9]+\.)*[A-z0-9]+\-?[A-z0-9]+\.[A-z]{2,}(\/.*)*\/?/.test(val);
							break;
						case 'cnmobile':
							error = error || !/^(1[3|5|7|8|][0-9]{9})$/.test(val);
							break;
						case 'cntel':
							error = error || !/^((\d{3,4}-)?\d{7,8})$/.test(val);
							break;
						case 'cnphone':
							error = error || !/^((\d{3,4}-)?\d{7,8})$|^(1[3|5|7|8|][0-9]{9})$/.test(val);
							break;
						case 'qqnumber':
							error = error || !/^([1-9][0-9]{4,})$/.test(val);
							break;
						case 'postcode':
							error = error || !/^([1-9]\d{5}(?!\d))$/.test(val);
							break;
						case 'number':
							error = error || val > maxVal || val < minVal || val % step;
							break;
						case 'range':
							error = error || val > maxVal || val < minVal || val % step;
							break;
					}
					if (pattern != undefined) {
						error = error || !pattern.test(val);
					}
					if (error) {
						var $errorTpl = $('<span>' + msgTxt + '</span>').attr('class', messageClass);
						existError = true;
						$th.addClass(errorClass).after($errorTpl);
						return false;
					} else {
						return true;
					}

				}

				if (config.autoCheck) {
					$(this).bind('input keyup paste', function() {
						//检测函数
						validNow();
					})
				} else if (config.submitButton) {
					$(config.submitButton).bind('click', function() {
						//检测函数
						alert(index);
						validNow();
					})
				} else
					$_this.bind('submit', function() {
						//检测函数
						//	alert(index);
						validNow();
					});

			});
		}

		var existError = false;

		function submitFunction(e) {
			existError = false;
			e.preventDefault();
			//alert('you submit the form');
		};
		if (config.submitButton) {
			$(config.submitButton).bind('click', submitFunction);
		} else $(this).bind('submit', submitFunction);
		$(this).attr('novalidate', 'novalidate');
		if (fields != null)
			for (var name in fields) {
				fieldCheck(name, fields[name]);
			} else {
				fieldCheck($(this).find('input').filter("[type!='submit']"), null);
			}
	}
})(jQuery);
