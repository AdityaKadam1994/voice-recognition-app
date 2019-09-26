const speechBtn = document.getElementById("speech-btn");
const instructions = document.querySelector(".output");
const greetings = [
  "Please leave me alone",
  "Mind your own business",
  "do i know you",
  "Whats up, homeslice?"
];

const weather = [
  "its unpredictable",
  "go find it yourself",
  "why do you care",
  "its raining on moon"
];

const age = [
  "Age is just a number",
  "Old enough to know better, but still too young to care",
  "I’m old enough to give advice, but not old enough to take it.",
  "Why in the world do you want to know"
];

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.onstart = function() {
  instructions.innerHTML =
    "Voice recognition activated. Try speaking into the microphone.";
};
recognition.onerror = function(event) {
  console.log(event);
};

recognition.onresult = function(event) {
  // event is a SpeechRecognitionEvent object.
  // It holds all the lines we have captured so far.
  // We only need the current one.
  var current = event.resultIndex;

  // Get a transcript of what was said.
  var transcript = event.results[current][0].transcript;

  // Add the current transcript to the contents of our Note.
  let noteContent = transcript;
  instructions.innerHTML = noteContent;

  //Passing the noteCotent message to readOutLoud function
  readOutLoud(noteContent);
};

speechBtn.addEventListener("click", function() {
  recognition.start();
});

function readOutLoud(message) {
  let speech = new SpeechSynthesisUtterance();
  let randomized;
  speech.text =
    "Command not recognized. Please check read me file from github repository for accessible commands.";
  if (
    message.includes("how are you") ||
    message.includes("hello") ||
    message.includes("good morning")
  ) {
    randomized = greetings[Math.floor(Math.random() * greetings.length)];
    speech.text = randomized;
  }

  if (
    message.includes("how is the weather like") ||
    message.includes("what is the weather report") ||
    message.includes("weather")
  ) {
    randomized = weather[Math.floor(Math.random() * weather.length)];
    speech.text = randomized;
  }

  if (message.includes("how old are you") || message.includes("old")) {
    randomized = age[Math.floor(Math.random() * age.length)];
    speech.text = randomized;
  }
  // Set the text and voice attributes.
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
}
