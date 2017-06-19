//Write appropriate functions here for the oven. You may want to consider the following:
//1. A restart button is created when the user clicks the stop button.
//2. Now that you have created a restart button, think of what should happen when the restart button is clicked (refer back to the demo to help you).
//3. If you encountered any bugs in the demo, this is also the place where you can improve the demo's code.
//4. Some functions that you may find useful: getElementById, removeChild, innerHTML, setAttribute, appendChild, insertBefore.
function resetCookieAndOven(){
  startTray = document.getElementById('tray');
  startTray.innerHTML = '';

  restartBtn = document.getElementById('restart');
  restartBtn.parentNode.removeChild(restartBtn);

	p = document.getElementById('final-statement');
	p.innerHTML = '';

  cookieCount = 0;

  clearBtn = document.getElementById('clear');
  if (clearBtn) { clearBtn.parentNode.removeChild(clearBtn); }

	pStart = document.getElementById('counter');
	pStart.innerHTML = 'You have placed ' + cookieCount + ' cookie dough onto the tray.';

	document.getElementById('stop-btn').disabled = false;
  timer = document.getElementById('timer')
  timer.innerHTML = '';
  timer.style.color = 'white';

  oven = document.getElementById('oven')
  oven.style.backgroundImage = '';

  cookieStatus = document.getElementById('cookie-status');
  cookieStatus.innerHTML = '';

  alert = document.getElementById('alert');
  if(alert) { alert.parentNode.removeChild(alert) };

  ovenAlreadyRan = false;
  currentTime = -1;
}

function createOvenRestartBtn() {
	restartBtn = document.createElement('button');
  restartBtn.setAttribute('id', 'restart');
  restartBtn.innerHTML = 'Restart';
  return restartBtn;
}

function createBakedCookieImg() {
  cookieImg = document.createElement('img');
  cookieImg.setAttribute('src', 'img/cookie.jpg');
  size = '30px';
  cookieImg.style.width = size;
  cookieImg.style.height = size;
  cookieImg.style.margin = '3px';
  return cookieImg;
}

function createBurntImg() {
  burntImg = document.createElement('img');
  burntImg.setAttribute('src', 'img/burnt.jpg');
  burntImg.style.width = '40px';
  burntImg.style.height = '60px';
  return burntImg;
}

function createTray() {
  finalTray = document.createElement('div');
  finalTray.setAttribute('id', 'final-tray');
  return finalTray;
}

function showFinalTray() {
  if (!timerRunning) {
    finalStatement = document.getElementById('final-statement');
    finalStatement.innerHTML = 'You have not started the timer yet!';
  }
  else {
    endTimer();
    document.getElementById('stop-btn').disabled = true;

    finalTray = document.getElementById('tray');
    finalTray.innerHTML = '';
    finalStatement = document.getElementById('final-statement');

    if (currentTime <= timeDone) {
      for (var i = 0; i < cookieCount; i++) {
        finalTray.appendChild(createBakedCookieImg());
      }
      finalStatement.innerHTML = "Here you go!"
    }
    else {
      burntImg = createBurntImg();
      finalTray.appendChild(burntImg);
      finalStatement.innerHTML = "Oh no, the cookies are burnt! Try again!"
    }

    restartBtn = createOvenRestartBtn();
    finalStatement.parentNode.insertBefore(restartBtn, finalStatement.nextSibling);

    setTimeout(function(){
      restartBtn.className += ' show';
    }, 10);
    restartBtn.addEventListener('click', resetCookieAndOven);
  }
}

function showFunc() {
  stopBtn = document.getElementById('stop-btn');
  stopBtn.addEventListener("click", showFinalTray);
}

document.addEventListener('DOMContentLoaded', showFunc);