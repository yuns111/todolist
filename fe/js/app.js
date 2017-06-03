(function (window) {
	'use strict';

	listAllAjax();
	addEvent();

	function addEvent() {

		//todo입력 이벤트
		$('.new-todo').keyup(function(e) {
			if (e.keyCode == 13) writeTodo();        
		});

		//완료 이벤트
		$('.toggle').change(function() {
			if(this.checked) {
				$(this).parent().parent().addClass("completed");
				var id = $(this).parent().parent().children(".edit").val();
				
				var completed = completedTodoAjax(id);
				if(completed){
					var listFilter = $('.selected').text();
					if(listFilter == "Active"){
						listFilterAjax(0);
					} 
					else if(listFilter == "Completed") {
						listFilterAjax(1);
					}
					else {
						listAllAjax();
					}
				}
			}
		});

		//삭제 이벤트
		$('.destroy').click(function() {
			var id = $(this).parent().parent().children(".edit").val();
			
			var destory = deleteTodoAjax(id);
			if(destory) {
				var listFilter = $('.selected').text();
				if(listFilter == "Active"){
					listFilterAjax(0);
				} 
				else if(listFilter == "Completed") {
					listFilterAjax(1);
				}
				else {
					listAllAjax();
				}
			}
		})

		//필터 선택 이벤트
		$('.filter').click(function() {
			$('.filter').removeClass("selected");
			$(this).addClass("selected");
			var text = $(this).text();

			if(text == "Active"){
				listFilterAjax(0);
			} 
			else if(text == "Completed") {
				listFilterAjax(1);
			}
			else {
				listAllAjax();
			}
		})
	}

	function printList(todoList) { //전체 목록

		$('.todo-list').children().remove();

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

		var todoNum = countTodoAjax();
		str = "<strong>"+todoNum+"</strong> item left";
		$('.todo-count').html(str);
		addEvent();

	};

	function writeTodo() {
		var text = $('.new-todo').val();
		if(text != ''){
			var newTodo = {};
			newTodo.todo = text;
			
			var todo = writeTodoAjax(newTodo);
			if(todo.todo) {
				var listFilter = $('.selected').text();
				if(listFilter == "Active"){
					listFilterAjax(0);
				} 
				else if(listFilter == "Completed") {
					listFilterAjax(1);
				}
				else {
					listAllAjax();
				}
			}
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
		printList(JSON.parse(todoList));
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
		var result;
		$.ajax({
			url: '/api/todos/'+id,
			type: 'PUT',
			async: false,
			success: function(data){
				result = data;
			}
		});

		return result;
	}

	function deleteTodoAjax(id) {
		var result;
		$.ajax({
			url: '/api/todos/'+id,
			type: 'DELETE',
			async: false,
			success: function(data){
				result = data;
			}
		});
		return result;
	}

	function countTodoAjax() {
		var result;
		$.ajax({
			url: '/api/todos/count',
			type: 'GET',
			async: false,
			success: function(data){
				result = data;
			}
		});
		return result;
	}

	function listFilterAjax(completed) {
		var todoList;
		$.ajax({
			url: 'api/todos/'+completed,
			type: 'GET',
			async: false,
			success: function(data){
				todoList = data;
			}
		});
		printList(todoList);
	}
})(window);
