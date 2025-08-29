const call_btn = document.querySelectorAll(".__calling-btn__");
const copy_btn = document.querySelectorAll(".__copy-btn__");
const callHistory = document.getElementById("history");
const clearHistory = document.getElementById("clear-history");
const favouriteBTN = document.querySelectorAll(".__favourite__");
const favouriteCount = document.getElementById("favourite-count");
const copyCount = document.getElementById("copy-count");

function getTime() {
  const now = new Date();
  const currentTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return currentTime;
}

// -------------- Copy Button ---------------------------------------------------------

for (let btn of copy_btn) {
  btn.addEventListener("click", (e) => {
    try {
      const card = btn.closest(".__cards__");

      const numberElement = card.querySelector(".__content-container__ h2");

      const number = numberElement.textContent.trim();

      if (!number) return;

      // Modern API (works on most desktop + mobile browsers)
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
          .writeText(number)
          .then(() => {
            alert("Copied: " + number);
            copyCount.innerHTML = Number(copyCount.innerText) + 1;
          })
          .catch((err) => {
            console.error("Clipboard error:", err);
          });
      } else {
        // Fallback method for older browsers
        let textArea = document.createElement("textarea");
        textArea.value = number;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert("Copied: " + number);
        copyCount.innerHTML = Number(copyCount.innerText) + 1;
      }
    } catch (error) {
      alert(error);
    }
  });
}

// ----------------- Favourite button ------------------------------------------------------

for (let btn of favouriteBTN) {
  btn.addEventListener("click", () => {
    let srcProp = btn.src;

    let srcAttr = btn.getAttribute("src");

    if (srcAttr === "./assets/heart.png") {
      btn.setAttribute("src", "./assets/heartGRAY.png");

      if (Number(favouriteCount.innerText) > 0) {
        favouriteCount.innerHTML = Number(favouriteCount.innerText) - 1;
      }
    } else {
      btn.setAttribute("src", "./assets/heart.png");
      favouriteCount.innerHTML = Number(favouriteCount.innerText) + 1;
    }
  });
}

// ---------------- Clear call History ----------------------------------------------------

clearHistory.addEventListener("click", () => {
  callHistory.innerHTML = "";
});

// ----------------- Call button -----------------------------------------------------------

for (let btn of call_btn) {
  btn.addEventListener("click", (e) => {
    // ----------- coin section --------------------------------------------------------

    const coin = document.getElementById("coin-count");

    let totalCoin = Number(coin.innerText);

    if (totalCoin > 0) {
      coin.innerHTML = totalCoin - 20;
    } else {
      alert("⚠️ Call limit exceeded");
      return;
    }

    // -----------------------------------------------------------------------------------

    // Make sure you're getting the button itself even if inner elements are clicked
    const callingBtn = e.currentTarget;

    // Find the parent card of the clicked button
    const card = callingBtn.closest(".__cards__");

    // Find the number inside the card (the h2 with the phone number)
    const titleElement = card.querySelector(".__title__");
    const numberElement = card.querySelector(".__content-container__ h2");

    const number = numberElement.textContent.trim();
    const title = titleElement.textContent.trim();
    alert(`📞 Calling to ${title} ${number}...`);

    // ----------- History section ------------------------------------------------------------

    callHistory.innerHTML += `
          <div class="__history-card__ p-[16px] w-full flex items-center justify-between gap-2 bg-[#FAFAFA] rounded-lg border-b-2 border-b-gray-100">
            <div class="__left__ ">
              <h2 class="font-semibold  text-black md:text-[18px]">${title}</h2>
              <p class="text-[#5C5C5C] md:text-[18px]">${number}</p>
            </div>
            <div class="__right__ md:text-[18px] ">${getTime()}</div>
          </div>
`;
  });
}
