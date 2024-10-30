var question = document.querySelector('.gemini-input');
var sendButton = document.querySelector('#send-btn');

const API = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDNT77nL8WZhzeaMvLWTuWfQ-D9auG70I0';

sendButton.addEventListener('click', function(e) {
    e.preventDefault();
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
        console.log(data.candidates[0].content.parts[0].text);  // Process or display the response as needed
    } catch (error) {
        console.error('Error fetching response:', error);
    }
}
