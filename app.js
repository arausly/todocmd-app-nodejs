console.log('starting app...');

const fs = require('fs');
const yargs = require('yargs');
const todo = require('./todo');

let  todoOptions = {
	
					 describe:"an activity to perform",
					 demand:true,
					 alias:'t'
	
                   }

let argv = yargs.command('add-todo','Adds new Todo',{
	todo:todoOptions
}).command('remove-todo','Removes todos',{
	todo:todoOptions,
}).command('search-todo','matches todos which search word',{
	todo:todoOptions
}).command('check-todo','toggles todo if completed or not',{
	todo:todoOptions,
})
.help()
.alias('help','h')
.argv; 

let command = argv._[0];




switch(command){
	case "add-todo":
	  let newTodo = todo.addTodo(argv.todo);
		if(newTodo){
	  console.log(' -'.repeat(50));
	  console.log(` Todo: ${newTodo.text} has been added \n ${' -'.repeat(50)}`);
	  console.log(`with a completed status of ${newTodo.completed} |`);
	  newTodo.completed ? console.log(`@${newTodo.completedAt}`):console.log(`@ ${newTodo.createdAt}|`); 
	  console.log(` ${' -'.repeat(15)} |`);		
		}else{
			console.log('todo already exist');
		}
	break;
	case "remove-todo":
	  todo.removeTodo(argv.todo);
	break;
	case "search-todo":
	  let matchedTodos = todo.searchTodo(argv.todo);
		if(matchedTodos || matchedTodos !== []){
				console.log('\n todos with matched keyword ');
				console.log(`${' -'.repeat(25)}`);

				 matchedTodos.map(match => {
					console.log(`${match.text}`);
			});
		}else{
			console.log("No matched found");
		}
		
	break;
	case "check-todo":
	  todo.checkTodo(argv.todo);
	break;
	default:
	 console.log('invalid command type --help for more info');
	break;	
}