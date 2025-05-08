
const fs = require('fs');
const commander=require('commander')
const program = new commander.Command();

const FILE = 'todos.json';


function getTodos() {
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, '[]');
  return JSON.parse(fs.readFileSync(FILE, 'utf8'));
}

function saveTodos(todos) {
  fs.writeFileSync(FILE, JSON.stringify(todos, null, 2));
}


program
  .name('todo')
  .description('Simple filesystem based TODO CLI')
  .version('1.0.0');

program.command('add')
  .description('Add a new todo')
  .argument('<task>', 'Task to add')
  .action(task => {
    const todos = getTodos();
    todos.push({ task, done: false });
    saveTodos(todos);
    console.log(`✅ Added: ${task}`);
  });
program.command('delete')
.description('Delete a todo')
.argument('<index>', 'Index of todo to delete (1-based)')
.action(index => {
  const todos = getTodos();
  const i = parseInt(index) - 1;  

  if (i >= 0 && i < todos.length) {
    const removed = todos.splice(i, 1);  
    saveTodos(todos);
    console.log(`🗑️ Deleted: ${removed[0].task}`);
  } else {
    console.log('❌ Invalid index');
  }
});

program.parse();
