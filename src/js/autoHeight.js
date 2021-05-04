export default () => {
  const textarea = document.querySelectorAll('textarea')

  textarea.forEach(el => {
    el.style.height = el.setAttribute('style', `height: ${el.scrollHeight}px`)
    el.addEventListener('input', () => {
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight}px`
    })
  })
}