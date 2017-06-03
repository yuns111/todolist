(function (window) {
	'use strict';

	listAll();

	$('.new-todo').keyup(function(e) {
	    if (e.keyCode == 13) writeTodo();        
	});

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

	function writeTodo() {

		var text = $('.new-todo').val();
		if(text != ''){
			var newTodo = {};
			newTodo.todo = text;
			var todo = writeTodoAjax(newTodo);
			if(todo.todo) listAll();
			$('.new-todo').val("");
		}
	}

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

	function writeTodoAjax(todo) {
		var todo;
		$.ajax({
			url:'/api/todos',
			type: 'POST',
			contentType: "application/json;charset=UTF-8",
			async : false,
			data : JSON.stringify(todo),
			success: function(data) {
				todo = data;
			}
		});
		
		return todo;
	}
})(window);
