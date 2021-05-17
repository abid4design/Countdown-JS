const MINUTES = 60;
const HOURS = 60 * MINUTES;
const DAYS = 24 * HOURS;
const elements = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
}

let previousDiff = {}
// On calcul la différence en seconde entre les deux dates
const countDown = document.getElementById("countDown");
const lunchDate = Date.parse(countDown.dataset.time) / 1000; // en secondes

function refreshCountDown() {
  
  const difference = lunchDate - Date.now() / 1000; // en secondes
  if(difference <= 0){
      document.location.reload()
      return
  }
  const diff = {
    days: Math.floor(difference / DAYS),
    hours: Math.floor((difference % DAYS) / HOURS),
    minutes: Math.floor((difference % HOURS) / MINUTES),
    seconds: Math.floor(difference % MINUTES),
  };

 updateDom(diff)

  window.setTimeout(() => {
    window.requestAnimationFrame(refreshCountDown)
  }, 1000)
}

/**
 * Met à jour la structure HTML en fonction d'un nouvel interval
 * 
 * @param {{days: number, hours: number, minutes: number, seconds: number,} diff 
 */
function updateDom(diff){
    Object.keys(diff).forEach(key => {
        if(previousDiff[key] !== diff[key]){
            elements[key].innerText = diff[key]
            console.log(key)
        }
    })

    // if (previousDiff.days !== diff.days){
    //     $days.innerText = diff.days;
    //     console.log('date')
    // }
    // $hours.innerText = diff.hours;
    // $minutes.innerText = diff.minutes;
    // $seconds.innerText = diff.seconds;
    previousDiff = diff
}

refreshCountDown()
