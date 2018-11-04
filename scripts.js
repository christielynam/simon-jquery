let simonPattern = []
let playerPattern = []
let level = 0

$(document).ready(function() {
  $('.start').click(function() {
    clearGame()
    levelUp()
  })
})

const clearGame = () => {
  simonPattern = []
  playerPattern = []
  level = 0
  $('.display').text(level)
}

// increase level and display that level to the user
// add element to simonPattern and animate the pattern to the user 
const levelUp = () => {
  level++
  $('.display').text(level)
  updateSimonPattern()
}

const updateSimonPattern = () => {
  const randomNum = Math.floor(Math.random() * 4)
  simonPattern.push(randomNum)
  showPattern()
}

// loop over the simonPattern and animate the pattern to the user
const showPattern = () => {
  let i = 0
  const interval = setInterval(function() {
    toggleClass(simonPattern[i])
    i++
    if(i >= simonPattern.length) {
      clearInterval(interval)
    }
  }, 750)
  playerPattern = []
}

const toggleClass = (id) => {
  $(`#${id}`).addClass('active')
  setTimeout(() => {
    $(`#${id}`).removeClass('active')
  }, 500)
}

// grab the id of the clicked pad, add it to the playerPattern array, and check the response
$('.pad').click(function() {
  const id = $(this).attr('id')
  playerPattern.push(parseInt(id))
  checkResponse()
})

// check playerPattern against simonPattern
const checkResponse = () => {
  const lastItem = playerPattern.length - 1
  if(playerPattern[lastItem] !== simonPattern[lastItem]) {
    alert('NOPE!')
    clearGame()
  } else {
    console.log('Good Move!')
    const done = playerPattern.length === simonPattern.length
    if(done) {
      if(level === 20) {
        alert('WINNER!')
      } else {
        alert('LEVEL UP!')
        playerPattern = []
        levelUp()
      }
    }
  }
}

