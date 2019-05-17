// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'
const errorDiv = document.getElementById('modal')

// Your JavaScript code goes here!

// Function below will hide the error modal
function hideErrorDiv() {
  // const errorDiv = document.getElementById('modal')
  console.log(errorDiv)
  errorDiv.classList.add('hidden');
}

function heartClick() {
  let heartButtons = document.querySelectorAll('.like')
  //heartButton is a nodeList so I need to use an enumerator to
  //add an event listener to each
  for (let i = 0; i < heartButtons.length; i++) {
    heartButtons[i].addEventListener('click', serverPostLike)
  }
  // heartButton.addEventListener('click', serverPostLike)

}

function changeHeart(event) {
  let target = event.target;
  let heartSpan = target.querySelector('.like-glyph')
  console.log(heartSpan)
  if (heartSpan.innerText === EMPTY_HEART) {
    heartSpan.innerText = FULL_HEART
    heartSpan.classList.add('activated-heart')
  } else if (heartSpan.innerText === FULL_HEART) {
    heartSpan.innerText = EMPTY_HEART
    heartSpan.classList.remove('activated-heart')
  }

}

function serverPostLike (event) {
  console.log(event)
  console.log("here is the event.target")
  console.log(event.target)
  console.log("here is the response")
  mimicServerCall()
  .then(resp => console.log(resp))
  .then(()=> changeHeart(event))
  // .then(obj => console.log(obj))
  .catch( error => {
    console.log(error)
    errorDiv.classList.remove('hidden');
    errorDiv.innerText = error
    setTimeout(() => { errorDiv.classList.add('hidden'); }, 5000)
  })
}



// Function calls for website on page load
hideErrorDiv();
heartClick();

//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
