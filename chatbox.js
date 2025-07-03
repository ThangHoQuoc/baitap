document.addEventListener('DOMContentLoaded', () => {
  // Lấy các phần tử đã có sẵn trong HTML
  const log = document.getElementById('chat-log');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  let isSending = false;

  function appendMessage(text, isUser) {
    const msgDiv = document.createElement('div');
    msgDiv.style.margin = '4px 0';
    msgDiv.innerHTML = `<div style="text-align:${isUser ? 'right' : 'left'};">
      <span style="background:${isUser ? '#bfdbfe' : '#e5e7eb'};padding:6px 10px;border-radius:12px;display:inline-block;">
        ${text}
      </span>
    </div>`;
    log.appendChild(msgDiv);
    log.scrollTop = log.scrollHeight;
    return msgDiv;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isSending) return false; // chặn spam
    const text = input.value.trim();
    if (!text) return false;

    appendMessage(text, true);
    input.value = '';

    // Gửi "Typing..." tạm
    const typingDiv = appendMessage('Typing...', false);

    isSending = true;
    try {
      const res = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      const { reply } = await res.json();
      typingDiv.innerHTML = `<div style="text-align:left;">
        <span style="background:#e5e7eb;padding:6px 10px;border-radius:12px;display:inline-block;">
          ${reply}
        </span>
      </div>`;
    } catch (err) {
      console.error("Error calling GPT API:", err);
      typingDiv.innerHTML = `<div style="text-align:left;">
        <span style="background:#fee2e2;padding:6px 10px;border-radius:12px;display:inline-block;">
          Error: ${err.message}
        </span>
      </div>`;
    } finally {
      isSending = false;
    }
    return false;
    
  });
  
});
