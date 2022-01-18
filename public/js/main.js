const container = document.querySelector(".container");
const fullUrl = document.querySelector("#fullUrl");
const shortenBtn = document.querySelector(".container__btn");
const showMessage = (message) => {
  const messageElement = document.querySelector(".message");
  if (messageElement) {
    messageElement.innerHTML = message;
    return;
  }
  const element = `<p class="message">${message}</p>`;
  container.insertAdjacentHTML("beforeend", element);
};

const removeLastChild = () => {
  const lastChild = document.querySelector(".message");
  const result = document.querySelector(".result");
  if (lastChild) {
    lastChild.parentNode.removeChild(lastChild);
  }
  if (result) {
    result.parentNode.removeChild(result);
  }
};
const showResult = (originalUrl, shortUrl) => {
  removeLastChild();
  const formattedShortUrl = shortUrl.substring(shortUrl.lastIndexOf("/") + 1);
  const result = `<div class="result">
          <div class="result__full--url">
            <h2 class="result__url--heading">Full Url</h2>
                <div class="container__output">
                    <a class="url" href=https://${originalUrl} target="_blank">${originalUrl}</a>
                </div>
          </div>
          <div class="result__short--url">
            <h2 class="result__url--heading">Short Url</h2>
            <div class="container__output">
                <a class="url" href=${shortUrl} target="_blank">${formattedShortUrl}</a>
            </div>
          </div>
        </div>`;
  container.insertAdjacentHTML("beforeend", result);
};
const shortenUrl = async (originalUrl) => {
  try {
    const response = await fetch("http://localhost:3000/api/short", {
      method: "POST",
      body: JSON.stringify({
        data: originalUrl,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      showResult(fullUrl.value, data.shortUrl);
      return;
    }
    showMessage("Something Went Wrong");
  } catch (err) {
    showMessage(err.message);
  }
};
shortenBtn.addEventListener("click", () => {
  const originalUrl = fullUrl.value;
  if (originalUrl) {
    showMessage("Loading...");
    shortenUrl(originalUrl);
  }
  showMessage("Input Cannot Be Empty");
});
