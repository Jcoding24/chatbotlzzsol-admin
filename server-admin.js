const express = require("express");
const bodyParser = require("body-parser");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files from the "public" directory

// Directly assigning the API key
const apiKey = "AIzaSyApgVw2qYjPDlg8tm9dLMuGKbcOwZ7x_cA"; // Replace 'your_api_key_here' with your actual API key
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 50,
  responseMimeType: "text/plain",
};

let chatSession;

async function initializeChatSession() {
  chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Tu eres un asistente de la empresa igari motors . Es una empresa que encarga de venta de respuestos automotriz a nivel nacional, con tiendas en los olivos y sa luis. pagina web es igari.com y nuestro numero de telefono es 1234566789. Solo responderas preguntas que tengan que ver con la informacion que se te ha brindado, no responderas nada fuera de la informacion que te acabo de dar",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "¡Entendido! Soy el asistente virtual de igari motors. Estoy aquí para ayudarlos en lo que necesiten. 😊 ",
          },
        ],
      },
    ],
  });
}

initializeChatSession();

app.post("/api/message", async (req, res) => {
  const userMessage = req.body.message;
  const result = await chatSession.sendMessage(userMessage);
  res.json({ response: result.response.text() });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:`);
});
