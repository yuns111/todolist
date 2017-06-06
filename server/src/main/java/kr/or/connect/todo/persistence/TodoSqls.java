package kr.or.connect.todo.persistence;

public class TodoSqls {
	static final String DELETE_BY_ID =
			"DELETE FROM todo WHERE id= :id";
	
	static final String SELECT_ALL =
			"SELECT * FROM todo";
	
	static final String UPDATE_BY_ID = 
			"UPDATE TODO SET completed = 1 WHERE id= :id";
	
	static final String COUNT_TODO = 
			"SELECT COUNT(*) FROM TODO WHERE completed = 0";
	
	static final String DELETE_ALL_COMPLETED = 
			"DELETE FROM todo WHERE completed = 1";
	
	static final String SELECT_BY_ID = 
			"SELECT * FROM todo WHERE id = :id";
}
