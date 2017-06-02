(function (window) {
	'use strict';

	listAll();

	function listAll() { //할일 리스트 불러오기(완료 구분x)

		$('.todo-list').children().remove();
		var todoList = listAllAjax();

		for(var i = 0 ; i < todoList.length ; i++){

			var str="";

			str += "<li><div class='view'><input class='toggle' type='checkbox'>";
			str += ("<label>" + todoList[i].todo + "</label>");
			str += "<button class='destroy'></button></div>";
			str += "<input class='edit' value='Rule the web'></li>";

			$('.todo-list').prepend(str);
			
		}

	};

	function listAllAjax() {
		var todoList
		$.ajax({
			url:'/api/todos',
			type: 'GET',
			dataType: JSON,
			async: false,
			success: function(data) {
				todoList = data;
			}
		});
		return JSON.parse(todoList);
	}
})(window);
