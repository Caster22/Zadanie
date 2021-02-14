import { route } from './router';

route('/', 'home', function() {
  this.where = 'Log in';
  this.post = 'start';
  this.$on('form', 'submit', (e) => {
    e.preventDefault();
    const login = e.target.login.value;
    const pass = e.target.password.value;
    const payload = {
      username: login,
      password: pass,
    };

    fetch('https://zwzt-zadanie.netlify.app/api/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
        .then(function (response) {
          return response.json();
        })
        .then(function (parsedResponse) {
          verifyData(parsedResponse.message);
        })
        .catch(err => {
          //log below is for developing purpose on errors :)
          console.log('err:',err)
        });

    const verifyData = (res) => {
      if (res === 'Login success!') {
        window.location.href="#/success";
      } else if (res === 'Wrong password!') {
        alert('Login Failed')
        this.$refresh();
      }
    }
  })
});

route('/success', 'success', function() {
  this.title = 'Success';
});

route('*', '404', function () {});
