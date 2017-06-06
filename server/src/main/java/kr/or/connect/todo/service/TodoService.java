package kr.or.connect.todo.service;

import java.util.Collection;

import org.springframework.stereotype.Service;

import kr.or.connect.todo.domain.Todo;
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
	
	public int update(Integer id) {
		return dao.update(id);
	}
	
	public int delete(Integer id) {
		return dao.delete(id);
	}
	
	public int countTodo() {
		return dao.countTodo();
	}
	
	public Collection<Todo> findByFilter(Integer completed) {
		return dao.selectFilter(completed);
	}
	
	public int deleteCompleted() {
		return dao.deleteCompleted();
	}
	
	public Todo selectOne(Integer id) {
		return dao.selectOne(id);
	}
}
