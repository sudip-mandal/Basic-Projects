const jokeDiv = document.getElementById('joke');
const button = document.getElementById('getJoke');
const historyList = document.getElementById('historyList');

async function fetchJoke() {
  try {
    const response = await fetch('https://official-joke-api.appspot.com/jokes/random');
    if (!response.ok) throw new Error('Failed to fetch joke');

    const data = await response.json();
    const fullJoke = `${data.setup} ${data.punchline}`;

   
    jokeDiv.innerHTML = `${data.setup}<br><strong>${data.punchline}</strong>`;

  
    addToHistory(fullJoke);
  } catch (error) {
    jokeDiv.innerHTML = 'Oops! Could not fetch a joke. Try again.';
    console.error('Error:', error);
  }
}

function addToHistory(jokeText) {
  const div = document.createElement('div');
  div.className = 'history-item';
  div.textContent = jokeText;
  historyList.prepend(div);
}

button.addEventListener('click', fetchJoke);
