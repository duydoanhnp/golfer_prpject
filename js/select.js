const showClb = document.querySelector('#clbbtn')
const showDay1 = document.querySelector('#day1btn')
const showDay2 = document.querySelector('#day2btn')

const clb = document.querySelector('#clb-content-show')
const day1 = document.querySelector('#day1-content-show')
const day2 = document.querySelector('#day2-content-show')

const nameClb = document.querySelector('#clb-name')
const nameDay1 = document.querySelector('#day1-name')
const nameDay2 = document.querySelector('#day2-name')

showClb.addEventListener('click', () => {
  clb.style.display = 'block'
  nameClb.style.display = 'block'
  day1.style.display = 'none'
  nameDay1.style.display = 'none'
  day2.style.display = 'none'
  nameDay2.style.display = 'none'
})

showDay1.addEventListener('click', () => {
  day1.style.display = 'block'
  nameDay1.style.display = 'block'
  clb.style.display = 'none'
  nameClb.style.display = 'none'
  day2.style.display = 'none'
  nameDay2.style.display = 'none'
})

showDay2.addEventListener('click', () => {
  day2.style.display = 'block'
  nameDay2.style.display = 'block'
  clb.style.display = 'none'
  nameClb.style.display = 'none'
  day1.style.display = 'none'
  nameDay1.style.display = 'none'
})
