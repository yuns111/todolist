(function (window) {
	'use strict';

	listAll();

	//todo입력 이벤트
	$('.new-todo').keyup(function(e) {
	    if (e.keyCode == 13) writeTodo();        
	});
	
	//완료 이벤트
	$('.toggle').change(function() {
        if(this.checked) {
        	$(this).parent().parent().addClass("completed");
        	var id = $(this).parent().parent().children(".edit").val();
        	completedTodoAjax(id);
        }
    });

	function listAll() { //할일 리스트 불러오기(완료 구분x)

		$('.todo-list').children().remove();
		var todoList = listAllAjax();

		for(var i = 0 ; i < todoList.length ; i++){
			var str="";
			if(todoList[i].completed == 1) {
				str+="<li class='completed'>";
			}
			else {
				str+="<li>"
			}
			str += "<div class='view'><input class='toggle' type='checkbox'";
			if(todoList[i].completed == 1) {
				str+=" checked";
			}
			str += ("><label>" + todoList[i].todo + "</label>");
			str += "<button class='destroy'></button></div>";
			str += ("<input class='edit' value=" + todoList[i].id + "></li>");

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
	
	function completedTodoAjax(id) {
		$.ajax({
			url: '/api/todos/'+id,
			type: 'PUT',
			success: function(data){
				
			}
		});
	}
	
})(window);
