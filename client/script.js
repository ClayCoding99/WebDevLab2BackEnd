

const chatbotForm = document.getElementById("chatbot-form");

document.addEventListener("DOMContentLoaded", () => {
    chatbotForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const chatbotFormMessage = document.getElementById("chatbot-input").value;
        fetch('https://webdevlab2.onrender.com/chatbot', {
            method: 'POST',
            body: JSON.stringify({"message":  chatbotFormMessage}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
          .then(data => {
            

            console.log(data);
            const newMessage = document.createElement("div");
            newMessage.classList.add("message");
            newMessage.innerHTML = data.text;

            const removeButton = document.createElement("button");
            removeButton.classList.add("remove-button");
            removeButton.innerHTML = "Remove";
            removeButton.addEventListener("click", function(e) {
                this.parentElement.remove();
            });

            newMessage.appendChild(removeButton);

            document.getElementById("chat-history").appendChild(newMessage);
          })
          .catch(error => console.log(error));
        });
});