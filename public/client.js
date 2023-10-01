const signinBtn = document.getElementById('signin-btn');

const authModule = (function(){
    'use strict';
    let _userAccessToken = '';

    const getCreds = function(e) {
        e.preventDefault();
        const user = document.getElementById('username').value;
        const pwd = document.getElementById('password').value;
        //console.log(user, pwd);
        const dataToSend = {
            user, //abbrv. user: user
            pwd
        };
        _sendLogin(dataToSend)
    }

    const _sendLogin = function(dataToSend) {
        fetch('http://localhost:3000/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            credentials: 'include', 
            body: JSON.stringify(dataToSend), 
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse the JSON response
            })
            .then(data => {
                // Handle the parsed response data
                _userAccessToken = data.accessToken;
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }
    return { getCreds };
})();

//must initialize authModule.getCreds first .... no hoisting here
signinBtn.addEventListener('click', authModule.getCreds);