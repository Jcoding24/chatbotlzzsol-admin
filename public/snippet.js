(function () {
  const script = document.currentScript;
  const color = script.getAttribute("data-color") || "#007bff";
  const title =
    script.getAttribute("data-title") || "Asistente de Lazzar Solutions";
  const font = script.getAttribute("data-font") || "Arial";
  const iconUrl = script.getAttribute("data-icon") || "";

  const chatButton = document.createElement("div");
  chatButton.id = "chat-button";
  chatButton.style.position = "fixed";
  chatButton.style.bottom = "20px";
  chatButton.style.right = "20px";
  chatButton.style.backgroundColor = color;
  chatButton.style.color = "white";
  chatButton.style.padding = "10px 15px";
  chatButton.style.borderRadius = "50px";
  chatButton.style.cursor = "pointer";
  chatButton.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  chatButton.style.fontFamily = font;
  chatButton.onclick = function () {
    chatIframe.style.display = "block";
    chatButton.style.display = "none";
  };

  if (iconUrl) {
    const img = document.createElement("img");
    img.src = iconUrl;
    img.style.width = "30px";
    img.style.height = "30px";
    chatButton.appendChild(img);
  } else {
    chatButton.innerHTML = "💬 Chat";
  }

  document.body.appendChild(chatButton);

  const chatIframe = document.createElement("iframe");
  chatIframe.id = "chat-iframe";
  chatIframe.src = `http://localhost:3000/chatbot.html?color=${encodeURIComponent(
    color
  )}&title=${encodeURIComponent(title)}&font=${encodeURIComponent(font)}`;
  chatIframe.style.display = "none";
  chatIframe.style.position = "fixed";
  chatIframe.style.bottom = "70px";
  chatIframe.style.right = "20px";
  chatIframe.style.width = "350px";
  chatIframe.style.height = "500px";
  chatIframe.style.border = "none";
  chatIframe.style.borderRadius = "10px";
  chatIframe.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  document.body.appendChild(chatIframe);
})();
