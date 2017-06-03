package kr.or.connect.todo.persistence;

public class TodoSqls {
	static final String DELETE_BY_ID =
			"DELETE FROM todo WHERE id= :id";
	
	static final String SELECT_ALL =
			"SELECT id, todo, completed FROM todo";
	
	static final String INSERT_TODO = 
			"INSERT INTO TODO (todo) values (:todo)";
}
