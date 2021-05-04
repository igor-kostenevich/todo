import {template, createToDo} from './template'
import showInfo from './showInfo'
import autoHeight from './autoHeight'

const btnCreateTask = document.querySelectorAll('[data-add-task]')
const list = document.querySelector('.list')
let toDoList = []

if (localStorage.toDoItem) {
  toDoList = [...JSON.parse(localStorage.toDoItem)]
}

isEmptyList()

// show info about tasks
showInfo(toDoList)

// render to do list on page
function render(){
  const html = toDoList.map(template).join('')  // task => template(task)
  list.innerHTML = html
}
render()

list.addEventListener('click', e => {
  const elementType = e.target.dataset.item
  if(elementType){
    const id = +e.target.closest('.list__item').dataset.id
    const el = e.target.closest('.list__item');
    const task = toDoList.find(item => item.id === id)
    const idx = toDoList.findIndex(item => item.id === id)

    if(elementType === 'checkbox'){
      task.checked = !task.checked
      const currentTextarea = el.querySelector('textarea')
      task.checked ? currentTextarea.classList.add('done') : currentTextarea.classList.remove('done')
    } else if (elementType === 'delete') {
      el.classList.add('leave')
      setTimeout(() => {
        toDoList.splice(idx, 1)
        el.remove()
        showInfo(toDoList)
        updateLocalStorage()
        isEmptyList()
      }, 600)
    } else if (elementType === 'edit'){
      const currentTextarea = el.querySelector('textarea')
      const value = currentTextarea.value

      if(!task.edit){
        task.edit = true
        currentTextarea.removeAttribute('disabled')
        e.target.classList.remove('icon-edit')
        e.target.classList.add('icon-check')
        el.classList.add('edit')
        currentTextarea.focus()
      } else if (task.edit && !value) {
        el.classList.add('error')
        !el.querySelector('.err') ? el.insertAdjacentHTML(
          'beforeend',
          `<span class="err">The field cannot be empty</span>`
          ) : ''
        changeField(currentTextarea, el)
      } else {
        currentTextarea.setAttribute('disabled', '')
        e.target.classList.remove('icon-check')
        e.target.classList.add('icon-edit')
        el.classList.remove('edit')
        task.text = value
        task.edit = false
      }
    }

    showInfo(toDoList)
    updateLocalStorage()
  }
})

// create new task
const createTask = el => {
  toDoList.push(el)
  let task = [el].map(template).join()
  list.insertAdjacentHTML(
    'beforeend',
    task
  )
  task = []
}

// click on button
btnCreateTask.forEach((item) => {
  item.addEventListener('click', () => {
    createTask(createToDo())
    isEmptyList()
    showInfo(toDoList)
    updateLocalStorage()
    autoHeight()
  })
})

// Update Local Storage
const updateLocalStorage = () => {
  localStorage.setItem('toDoItem', JSON.stringify(toDoList))
}

// if empty list
function isEmptyList(){ 
  if(!toDoList.length){
    list.insertAdjacentHTML(
      'beforebegin',
      '<div class="empty-list">No tasks. Please add the first task</div>'
    )
  } else {
    const emptyList = document.querySelector('.empty-list')
    if(emptyList) {
      emptyList.remove()
    }
  }
}

// remove an error when typing in a field
const changeField = (field, el) => {
  field.addEventListener('input', () => {
    if(el.classList.contains('error') && el.querySelector('.err')){
      el.classList.remove('error')
      el.querySelector('.err').remove()
    }
  })
}

// Auto height for textarea
autoHeight()