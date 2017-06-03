package kr.or.connect.todo.service;

import java.util.Collection;

import org.springframework.stereotype.Service;

import kr.or.connect.domain.Todo;
import kr.or.connect.todo.persistence.TodoDao;

@Service
public class TodoService {

	private TodoDao dao;
	
	public TodoService(TodoDao dao) {
		this.dao = dao;
	}
	
	public Collection<Todo> findAll() {
		return dao.selectAll();
	}
	
	public Todo create(Todo todo) {
		Integer id = dao.insert(todo);
		todo.setId(id);
		return todo;
	}
}
