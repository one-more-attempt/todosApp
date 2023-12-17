import { Todo } from '../todo/todo';
import { Header } from '../header/header';
import { Spinner } from '../../shared/spinner';
import { apiService } from '../../api/api-handlers';
import { getUserLocal } from '../../shared/services/local-storage-service';
import { Modal } from '../../shared/modal';
import { MODAL_MESSAGES } from '../../shared/constants/modal-messages';

export const mainPageHandler = async () => {
  const mainPage = document.querySelector('.main');
  const todoWrapper = document.querySelector('.main__todos');
  const title = document.getElementById('title');
  const description = document.getElementById('description');
  const submitBtn = document.getElementById('submitBtn');
  const cancelBtn = document.getElementById('cancelBtn');

  const newTodo = {
    title: '',
    description: ''
  };

  let todos = [];
  let isEditMode = false;
  let editingTodoId = '';
  let deletingTodoId = '';

  const clearForm = () => {
    newTodo.title = '';
    newTodo.description = '';
    title.value = null;
    description.value = null;
  }

  const editTodoHandler = todoId => {
    const findingTodo = todos.find(({id}) => id === todoId);
    
    editingTodoId = todoId;
    cancelBtn.style.display = 'inline';
    isEditMode = true;
    submitBtn.innerText = 'Save';
    title.value = findingTodo.title;
    newTodo.title = findingTodo.title;
    description.value = findingTodo.description;
    newTodo.description = findingTodo.description;
    checkIsFormValid();
  };

  const deleteSelectedTodo = async () => {
    Spinner.showSpinner();
    await apiService.del(`todos/${deletingTodoId}`);
    await apiService.get('todos').then(todosArr => renderTodos(todosArr));
  }

  const deleteTodoHandler = todoId => {
    deletingTodoId = todoId;
    new Modal(MODAL_MESSAGES.deleteTodo, deleteSelectedTodo).showModal();
  }

  const setIsComplete = (isComplete, todoId) => {
    const findingTodo = todos.find(todo => todo.id === todoId);

    delete findingTodo.id;
    updateCurrentTodo({...findingTodo, isComplete}, todoId);
  }

  const renderTodos = todosArr => {
    if (todosArr) {
      const id = getUserLocal().authId;
      
      todos = [];
      todoWrapper.innerHTML = null;
      todos = Object.keys(todosArr).map(key => {
        const todo = {id: key, ...todosArr[key]};

        if (todo.userId === id) {
          todoWrapper.append(
            new Todo(
              todo, 
              editTodoHandler, 
              deleteTodoHandler,
              setIsComplete
            ).getTodo());        
        }        

        return todo;
      });
    } else todoWrapper.innerHTML = null;
  }

  const checkIsFormValid = () => Object.values(newTodo).every(value => !!value) ?
    submitBtn.removeAttribute('disabled') : submitBtn.setAttribute('disabled', true);
    
  const createNewTodo = async () => {
    Spinner.showSpinner();
    const todo = {
      ...newTodo, 
      date: new Date(), 
      userId: getUserLocal().authId, 
      isComplete: false,
      comments: []
    }
    await apiService.post('todos', todo).then(response => clearForm());
    await apiService.get('todos').then(todosArr => renderTodos(todosArr));
  }

  const updateCurrentTodo = async (todo, id) => {
    Spinner.showSpinner();
    await apiService.put(`todos/${id}`, todo).then(response => clearForm());
    await apiService.get('todos').then(todosArr => renderTodos(todosArr));
  }

  title.oninput = () => {
    newTodo.title = title.value;
    checkIsFormValid();
  }

  description.oninput = () => {
    newTodo.description = description.value;
    checkIsFormValid();
  }

  submitBtn.onclick = async () => {
    if (isEditMode) {
      const findingTodo = todos.find(todo => todo.id === editingTodoId);
      const todoToRequest = {...findingTodo, ...newTodo, date: new Date(), userId: getUserLocal().authId};

      updateCurrentTodo(todoToRequest, editingTodoId)
    } else createNewTodo();
  }

  cancelBtn.onclick = () => {
    clearForm();
    isEditMode = false;
    cancelBtn.style.display = 'none';
    submitBtn.innerText = 'Create Todo';
  }

  Header.getHeader(mainPage);
  Spinner.showSpinner();
  await apiService.get('todos').then(todosArr => renderTodos(todosArr));
};
