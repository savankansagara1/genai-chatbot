const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const threadId = Date.now().toString(36) + Math.random().toString(36).substring(2,8); // Function to generate unique thread ID

// 1. Function to add User Message
function addUserMessage(text) {
  const wrapper = document.createElement("div");
  wrapper.className = "flex gap-4 justify-end";

  wrapper.innerHTML = `
    <div class="bg-[#2f2f2f] p-4 rounded-lg max-w-2xl">
      ${text}
    </div>
    <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">
      U
    </div>
  `;

  chatBox.appendChild(wrapper);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// 2. Function to add Bot Message
function addBotMessage(text) {
  const wrapper = document.createElement("div");
  wrapper.className = "flex gap-4";

  wrapper.innerHTML = `
    <div class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center font-bold">G</div>
    <div class="bg-[#444654] p-4 rounded-lg max-w-2xl">
      ${text}
    </div>
  `;

  chatBox.appendChild(wrapper);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// 3. Function to show Loading Bubble (Thinking state)
function showLoading() {
  const wrapper = document.createElement("div");
  wrapper.className = "flex gap-4";
  wrapper.id = "loading-indicator"; // ID to easily find and remove it later

  // Added simple dots with animation-delay for a "wave" effect
  wrapper.innerHTML = `
    <div class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center font-bold animate-pulse">G</div>
    <div class="bg-[#444654] p-4 rounded-lg max-w-2xl flex items-center gap-2">
      <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
      <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
      <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
    </div>
  `;

  chatBox.appendChild(wrapper);
  chatBox.scrollTop = chatBox.scrollHeight;
  return wrapper;
}

// 4. Function to remove Loading Bubble
function removeLoading(loadingElement) {
  if (loadingElement && loadingElement.parentNode) {
    loadingElement.parentNode.removeChild(loadingElement);
  }
}


// 5. Send Message Event Listener
sendBtn.addEventListener("click", async () => {
  const text = userInput.value.trim();
  if (!text) return;

  addUserMessage(text);
  userInput.value = "";

  await botReply(text); 
});

// 6. Enter Key Event Listener
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendBtn.click();
});

// 7. Main Bot Reply Function (Fetches from Backend)
async function botReply(inputText) {
  // Show the loading bubble before fetching
  const loadingElement = showLoading();

  try {
    const response = await fetch("https://genai-chatbot-8trf.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({threadId: threadId, message: inputText })
    });

    const result = await response.json();
    console.log("FULL BACKEND RESPONSE:", result);

    // Remove loading bubble now that we have data
    removeLoading(loadingElement);

    // Show real message
    addBotMessage(result.message); 
    
  } catch (error) {
    console.error(error);
    
    // Remove loading bubble even if there is an error
    removeLoading(loadingElement);
    
    addBotMessage("⚠️ Error fetching bot response");
  }
}