export default function(list) {
  const scope = document.querySelector('.info__item_scope span')
  const active = document.querySelector('.info__item_active span')
  const successfull = document.querySelector('.info__item_successful span')

  const successItems = list.filter(item => item.checked)

  scope.textContent = list.length
  active.textContent = list.length - successItems.length
  successfull.textContent = successItems.length
}