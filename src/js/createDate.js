export default function() {
  const date = new Date()
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}