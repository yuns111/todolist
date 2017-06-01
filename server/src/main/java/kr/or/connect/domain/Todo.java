package kr.or.connect.domain;

import java.sql.Timestamp;

public class Todo {
	
	private int id;
	private String todo;
	private int conpleted;
	private Timestamp date;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTodo() {
		return todo;
	}
	public void setTodo(String todo) {
		this.todo = todo;
	}
	public int getConpleted() {
		return conpleted;
	}
	public void setConpleted(int conpleted) {
		this.conpleted = conpleted;
	}
	public Timestamp getDate() {
		return date;
	}
	public void setDate(Timestamp date) {
		this.date = date;
	}
	
}
