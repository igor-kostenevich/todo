const btnCreateTask = document.querySelectorAll('[data-add-task]')
const list = document.querySelector('.list')


let toDoList = []

function isEmptyList(){ // if empty list
  if(toDoList.length === 0){
    console.log('s');
  }
}


if (localStorage.toDoItem) {
  toDoList = [...JSON.parse(localStorage.toDoItem)]
  isEmptyList()
}


const createToDo = () => {
  let itemTask = {
    text: '',
    checked: false,
    edit: false,
    id: Date.now(),
    date() {
      const date = new Date()
      return `${date.getDate()}`
    },
  }
 
  return itemTask
}

const template = task => `
  <li class="list__item item ${task.edit ? 'focus' : ''}" data-id="${task.id}">
    <div class="item__top">
      <div class="item__items">
        <label>
          <input data-item="checkbox" class="check" type="checkbox" ${task.checked ? 'checked' : ''} data-checkbox>
          <span class="checkbox icon-checkbox"></span>
        </label>
        <span data-item="date" class="item__date">3 Jan 2021</span>
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
  const html = toDoList.map(template).join('')
  list.innerHTML = html
}
render()

list.addEventListener('click', e => {
  const elementType = e.target.dataset.item
  if(elementType){
    const id = +e.target.closest('.list__item').dataset.id
    const el = e.target.closest('.list__item');
    const task = toDoList.find(item => item.id === id)

    if(elementType === 'checkbox'){
      task.checked = !task.checked
      const currentTextarea = el.querySelector('textarea')
      task.checked ? currentTextarea.classList.add('done') : currentTextarea.classList.remove('done')
      updateLocalStorage()
    } else if (elementType === 'delete') {
      toDoList.splice(task, 1)
      updateLocalStorage()
      isEmptyList() // logic for empty do to list
      render()
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

      updateLocalStorage()
    }
  }
})

const onFocusFn = (el) => {
  return el.focus()
}


btnCreateTask.forEach((item) => {
  item.addEventListener('click', () => {
    toDoList.push(createToDo())
    updateLocalStorage()
    render()
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
// changeField()




// getDate()
// getFullYear
// date() {
//   const date = new Date()
//   // return `${date.getDate()}`
//   return 'dada'
// }


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
