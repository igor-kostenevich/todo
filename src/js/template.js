import createDate from './createDate'

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

export {
  template, createToDo
}