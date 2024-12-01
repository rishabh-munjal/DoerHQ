var question = document.querySelector('.gemini-input');
var sendButton = document.querySelector('#send-btn');
var chatboxContainer = document.querySelector('#chat-display');
var form = document.querySelector('#chat-form');
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from submitting (reloading the page)
});

const API = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCKH5-IKh2oJ-ZqgE0v3rS_3pf_xHnr9BE';
sendButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Display the user's question in the chatbox
    let chat = document.createElement('div');
    chat.innerHTML = `<div class="text-sm bg-orange-400 w-[10rem] bg-opacity-50 p-2 rounded-md max-w-xs self-start">${question.value}</div>`;
    chatboxContainer.appendChild(chat);

    getResponse();
    question.value = '';
});

async function getResponse() {
    try {
        const response = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "contents": [
                    {
                        "parts": [
                            { "text": question.value }
                        ]
                    }
                ]
            })
        });
        
        const data = await response.json();
        let res = data.candidates[0].content.parts[0].text;
        let res2 = jsonEsc(res);

        let res3 = res2.split("**");
        let res4 = "";

        for(let i = 0 ; i < res3.length ; i++){
            if(i == 0 || i%2 != 1){
                res4 += res3[i];
            }
            else{
                res4+="<strong>"+res3[i]+"</strong>";
            }
        }
        
        // Display the API's response in the chatbox
        let chat2 = document.createElement('div');
        chat2.innerHTML = `<div class="text-sm bg-white ml-7 w-[12rem] bg-opacity-20 p-2 rounded-md max-w-xs self-start">${res4}</div>`;
        chatboxContainer.appendChild(chat2);

    } catch (error) {
        console.error('Error fetching response:', error);
    }
}

function jsonEsc(str){
    return str
    .replace(new RegExp("\r>\n\n" , "g") , "<br>")
    .replace(new RegExp("\r?\n" , "g") , "<br>");
}
