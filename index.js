const quoteText = document.querySelector("#text"),
  categoryBase = document.querySelector("#author #name"),
  categoryName = document.querySelector("#anime"),
  quoteBtn = document.querySelector("#new-quote"),
  copyBtn = document.querySelector("#copy-quote"),
  twitterBtn = document.querySelector("#tweet-quote"),
  soundBtn = document.querySelector("#sound-quote"),
  imgElement = document.querySelector(".img-area"), // Select the image element
  // Get the src attribute value
  synth = speechSynthesis;
let imgSrc = imgElement.src;
const category = [
  "waifu",
  "neko",
  "shinobu",
  "megumin",
  "bully",
  "cuddle",
  "cry",
  "hug",
  "awoo",
  "kiss",
  "lick",
  "pat",
  "smug",
  "bonk",
  "yeet",
  "blush",
  "smile",
  "wave",
  "highfive",
  "handhold",
  "nom",
  "bite",
  "glomp",
  "slap",
  "kill",
  "kick",
  "happy",
  "wink",
  "poke",
  "dance",
  "cringe",
];

function randomPics() {
  quoteBtn.classList.add("Loading");
  quoteBtn.innerText = "Loading...";
  const randomIndex = Math.floor(Math.random() * category.length);
  const animeCate = category[randomIndex];

  fetch(`https://api.waifu.pics/sfw/${animeCate}`)
    .then((response) => response.json())
    .then((animg) => {
      console.log(animg.url);
      imgSrc = animg.url;
      imgElement.src = animg.url;
      categoryName.innerText = animeCate;
      quoteBtn.classList.remove("Loading");
      quoteBtn.innerText = "New Pics";
    });
}

quoteBtn.addEventListener("click", randomPics);

soundBtn.addEventListener("click", () => {
  let utterance = new SpeechSynthesisUtterance(
    `The anime ${categoryBase.innerText} is ${categoryName.innerText}`
  );
  const voices = speechSynthesis.getVoices();
  const selectedVoices = voices[2];
  utterance.voice = selectedVoices;
  speechSynthesis.speak(utterance);
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard
    .writeText(imgSrc)
    .then(() => {
      console.log("Text copied to clipboard");
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
    });
});

twitterBtn.addEventListener("click", () => {
  let tweetUrl = `https://twitter.com/intent/tweet?url=${imgSrc}`;
  window.open(tweetUrl, "_blank");
});

console.log(quoteText.innerText);
