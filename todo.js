const check = console.log('app is now modular');
const fs = require('fs');
const uuid = require('node-uuid');
const moment = require('moment');

const fb = require('./firebase'); 

fb.firebase.initializeApp(fb.config);
const firebaseRef = fb.firebase.database().ref();
const fetchTodos = () =>{
	try{
		//				   let todosString = fs.readFileSync('todos_data.json');  
		//				   return JSON.parse(todosString);
		let  todoRef = firebaseRef.child('todos');
		todoRef.once('value',(snapshot)=>{
			let todos = snapshot.val() || {}; 
			let transformedTodos = [];

			Object.keys(todos).map((id)=>{
				transformedTodos.push(Object.assign({},todos[id],{id}));
			});
			return transformedTodos;
		});
	}catch(e){
		return [];
	}
}

const saveTodos = (todos) =>{
	fs.writeFileSync('todos_data.json',JSON.stringify(todos));
//	let todo = todos[0];
//	firebaseRef.child('todos').push(todo).then(()=>{
//		let todoRef = firebaseRef.child('todos');
//		Object.assign({},todo,{id:todoRef.key})	 
//	},(e)=>{
//		console.log(e.message);
//	});
	let todoRef = firebaseRef.child('todos');
    todos.map((todo)=>{
		
	});
}

const addTodo = (todo)=>{
	let todos = fetchTodos();
	console.log(todos);
//	let newTodo = {
//		text:todo,
//		completed:false,
//		createdAt:moment().unix(),
//		completedAt:null
//	}	
//	let todosDuplicate = todos.filter(item => item.text === todo);
//
//	if(todosDuplicate.length === 0){
//		todos.push(newTodo); 
//		saveTodos(todos);
//		return newTodo; 
//	}
}

const removeTodo = (todo) =>{
	let todos = fetchTodos();
	let filteredTodos = todos.filter(item => item.text !== todo);
	saveTodos(filteredTodos);
}

const searchTodo = (keyword) =>{
	let todos =  fetchTodos();
	let matchedTodos = todos.filter(item => item.text.toLowerCase().indexOf(keyword.toLowerCase()) > -1);
	return matchedTodos;
}

const checkTodo = (todo) =>{
	let todos = fetchTodos();
	let checkedTodo = todos.filter(item => item.text === todo);
	let unmatchedTodos  = todos.filter(item => item.text !== todo);
	if(todos.length !== checkedTodo.length){
		checkedTodo[0].completed = !checkedTodo[0].completed;
		checkedTodo[0].completedAt = checkedTodo[0].completed ? moment().unix() : undefined;
		let totalTodos = [...unmatchedTodos,checkedTodo[0]];
		saveTodos(totalTodos); 
	}else{
		console.log('todo not found check, type --help for more details');
	}	
}
module.exports = {
	addTodo,
	removeTodo,
	searchTodo,
	checkTodo,
}
