import "./ui.css";

// Setup
let temp;
let buttons = document.getElementById("buttons");
let feedback = document.getElementById("feedback");
let input = document.getElementById("input") as HTMLInputElement;
let intro = document.getElementById("intro");
let loader = document.getElementById("loader");

function init() {
  // Hide the intro text
  intro.classList.add("invisible");
  // Get stored URL
  parent.postMessage({ pluginMessage: { type: "get-url" } }, "*");
}

onmessage = event => {
  const msg = event.data.pluginMessage;
  if (msg === "no-url") {
    removeFeedback(0);
    intro.classList.remove("invisible");

    return;
  }
  if (msg === "non-text") {
    toggleLoader(false);
    showFeedback(`You've selected one or more non-text nodes.`);

    // Remove feedback after 2,5s
    removeFeedback(2500);

    return;
  } else if (msg === "no-selection") {
    toggleLoader(false);
    showFeedback(`No text elements selected. Please select something`);

    // Remove feedback after 2,5s
    removeFeedback(2500);
  } else if (msg != undefined) {
    // Set URL in input field
    input.value = msg;

    getData(msg)
      .then(data => {
        // Send data to code
        parent.postMessage(
          { pluginMessage: { type: "received-data", content: data } },
          "*"
        );

        //Reset buttons
        temp = null;

        // Get keys from data
        temp = Object.keys(data);

        // Generate buttons for all keys
        temp.forEach(function(el) {
          generateButtons(el);
        });

        // Remove the loader
        toggleLoader(false);

        // This button fills out the remaining space after rendering all the working buttons
        const btn = document.createElement("button");
        btn.className = "buttons__filler";
        document.getElementById("buttons").appendChild(btn);
      })
      .catch(reason => {
        toggleLoader(false);
        showFeedback(
          `Can't show data. Check if URL is correct or if JSON has errors.`
        );
      });
  }
};

function generateButtons(val) {
  // If not visible, make visible again
  buttons.classList.remove("invisible");

  // Create let that contains button, set some properties/attributes to this button
  let button = document.createElement("button");
  button.innerHTML = capFirstLetter(val);
  button.id = val;
  button.className = "button button__main";

  // Onclick send a nmessage stating the value of the button
  button.onclick = () => {
    parent.postMessage(
      { pluginMessage: { type: "replace-text", content: val } },
      "*"
    );
  };

  // Place the button on a element with the id 'buttons'
  buttons.appendChild(button);
}

async function getData(url: string) {
  let data = await (await fetch(url)).json();

  if (!data) {
    toggleLoader(false);
    showFeedback(`Error, couldn't retrieve data`);
  } else {
    return data;
  }
}

function capFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toggleLoader(show) {
  if (show === true) {
    loader.classList.remove("invisible");
  } else {
    loader.classList.add("invisible");
  }
}

// ToDo: Rewrite this stuff to 1 method for showing feedback
function showFeedback(str: string) {
  if (str) {
    feedback.innerHTML = str;
    buttons.classList.add("invisible");
    feedback.classList.remove("invisible");
  }
}

function removeFeedback(length: number) {
  setTimeout(function() {
    buttons.classList.remove("invisible");
    feedback.classList.add("invisible");
  }, length);
}

// Close plugin when cancel is clicked
document.getElementById("cancel").onclick = () => {
  parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
};

// Save JSON url on click
document.getElementById("save").onclick = async () => {
  intro.classList.add("invisible");

  // Clear buttons div
  buttons.innerHTML = "";

  if (input.value) {
    toggleLoader(true);
    parent.postMessage(
      { pluginMessage: { type: "set-url", content: input.value } },
      "*"
    );
  } else {
    showFeedback("No URL entered");
    removeFeedback(2000);
  }
};

// Initialize plugin
init();
