import createDate from './createDate'
import showInfo from './showInfo'

const btnCreateTask = document.querySelectorAll('[data-add-task]')
const list = document.querySelector('.list')
let toDoList = []



if (localStorage.toDoItem) {
  toDoList = [...JSON.parse(localStorage.toDoItem)]
  isEmptyList()
} 

// show info about tasks
showInfo(toDoList)


const createToDo = () => {
  let itemTask = {
    text: '',
    checked: false,
    edit: false,
    id: Date.now(),
    date: createDate(),
  }
 
  return itemTask
}

const template = task => `
  <li class="list__item item ${task.edit ? 'focus' : ''}" data-id="${task.id}">
    <div class="item__top">
      <div class="item__items">
        <label>
          <input data-item="checkbox" class="check" type="checkbox" ${task.checked ? 'checked' : ''}>
          <span class="checkbox icon-checkbox"></span>
        </label>
        <span data-item="date" class="item__date">${task.date}</span>
      </div>
      <div class="item__icons">
        <span class="${task.edit ? 'icon-check' : 'icon-edit'}" data-item="edit"></span>
        <span class="icon-cart" data-item="delete"></span>
      </div>
    </div>
    <textarea rows="1" class="item__text ${task.checked ? 'done' : ''}" placeholder="Please enter task description" ${task.edit ? '' : 'disabled'}>${task.text}</textarea>
  </li>
`

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
    console.log(toDoList);
    const task = toDoList.find(item => item.id === id)
    const idx = toDoList.findIndex(item => item.id === id)

    if(elementType === 'checkbox'){
      task.checked = !task.checked
      const currentTextarea = el.querySelector('textarea')
      task.checked ? currentTextarea.classList.add('done') : currentTextarea.classList.remove('done')
    } else if (elementType === 'delete') {
      toDoList.splice(idx, 1)
      el.remove()
      isEmptyList()
    } else if (elementType === 'edit'){
      const currentTextarea = el.querySelector('textarea')
      const value = currentTextarea.value

      if(!task.edit){
        task.edit = true
        currentTextarea.removeAttribute('disabled')
        e.target.classList.remove('icon-edit')
        e.target.classList.add('icon-check')
        el.classList.add('focus')
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
        el.classList.remove('focus')
        task.text = value
        task.edit = false
      }
    }
    showInfo(toDoList)
    updateLocalStorage()
  }
})


const createTask = el => {
  toDoList.push(el)
  let task = [el].map(template).join()
  list.insertAdjacentHTML(
    'beforeend',
    task
  )
  task = []
}


btnCreateTask.forEach((item) => {
  item.addEventListener('click', () => {
    showInfo(toDoList)
    createTask(createToDo())
    isEmptyList()
    updateLocalStorage()
    autoHeight()
  })
})

// Update Local Storage
const updateLocalStorage = () => {
  localStorage.setItem('toDoItem', JSON.stringify(toDoList))
}

const changeField = (field, el) => {
  field.addEventListener('input', () => {
    if(el.classList.contains('error') && el.querySelector('.err')){
      el.classList.remove('error')
      el.querySelector('.err').remove()
    }
  })
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



// btnCreateTask.forEach((item) => {
//   item.addEventListener('click', () => {
//     const newToDo = createToDo()
//     toDoList.push(newToDo)
//     localStorage.setItem('toDoItem', JSON.stringify(toDoList))
//     render()

//   })
// })

// Auto height for textarea
const autoHeight = () => {
  const textarea = document.querySelectorAll('textarea')

  textarea.forEach((el) => {
    el.style.height = el.setAttribute('style', `height: ${el.scrollHeight}px`)
    el.addEventListener('input', () => {
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight}px`
    })
  })
}
autoHeight()

// if(localStorage.getItem('toDoItem')) {
//   toDoList = JSON.parse(localStorage.getItem('toDoItem'))
//   render()
// }

// function render(todoItem){
//   let element = ''

//   toDoList.forEach((item, idx) => {
//     console.log(item);
//     element += `
//     <li class="list__item item">
//       <div class="item__top">
//         <div class="item__items">
//           <label>
//             <input class="check" type="checkbox" id="${idx}" ${item.checked ? 'checked' : ''}>
//             <span class="checkbox icon-checkbox"></span>
//           </label>
//           <span class="item__date">3 Jan 2021</span>
//         </div>
//         <div class="item__icons">
//           <span class="icon-edit"></span>
//           <span class="icon-cart"></span>
//         </div>
//       </div>
//       <textarea rows="1" class="item__text">Create main page of todolistfor frontend test task</textarea>
//     </li>
//     `
//     list.innerHTML = element
//     autoHeight()
//   })
// }
