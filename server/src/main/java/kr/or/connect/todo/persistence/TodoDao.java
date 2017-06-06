package kr.or.connect.todo.persistence;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import kr.or.connect.todo.domain.Todo;

@Repository
public class TodoDao {
	private NamedParameterJdbcTemplate jdbc;
	private SimpleJdbcInsert insertAction;
	RowMapper<Todo> rowMapper = BeanPropertyRowMapper.newInstance(Todo.class);
	
	public TodoDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
		this.insertAction = new SimpleJdbcInsert(dataSource)
				.withTableName("todo")
				.usingGeneratedKeyColumns("id")
				.usingColumns("todo","completed");
	}
	
	public List<Todo> selectAll() {
		Map<String, Object> params = Collections.emptyMap();
		return jdbc.query(TodoSqls.SELECT_ALL, params, rowMapper);
	}
	
	public Integer insert(Todo todo) {
		SqlParameterSource params = new BeanPropertySqlParameterSource(todo);
		return insertAction.executeAndReturnKey(params).intValue();
	}
	
	public int update(Integer id) {
		Map<String, ?> params = Collections.singletonMap("id", id);
		return jdbc.update(TodoSqls.UPDATE_BY_ID, params);
	}
	
	public int delete(Integer id) {
		Map<String, ?> params = Collections.singletonMap("id", id);
		return jdbc.update(TodoSqls.DELETE_BY_ID, params);
	}
	
	public int countTodo() {
		Map<String, Object> params = Collections.emptyMap();
		return jdbc.queryForObject(TodoSqls.COUNT_TODO, params, Integer.class);
	}
	
	public List<Todo> selectFilter(Integer completed) {
		Map<String, ?> params = Collections.singletonMap("completed", completed);
		return jdbc.query(TodoSqls.SELECT_BY_FILTER, params, rowMapper);
	}
	
	public int deleteCompleted() {
		Map<String, Object> params = Collections.emptyMap();
		return jdbc.update(TodoSqls.DELETE_ALL_COMPLETED, params);
	}
	
	public Todo selectOne(Integer id) {
		Map<String, ?> params = Collections.singletonMap("id", id);
		return jdbc.queryForObject(TodoSqls.SELECT_BY_ID, params, rowMapper);
	}
}
