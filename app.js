import { route } from './router';

route('/', 'home', function() {
  this.where = 'Log in';
  this.post = 'start';
  this.$on('form', 'submit', (e) => {
    e.preventDefault();
    const login = e.target.login.value;
    const pass = e.target.password.value;
    if (!login || ! pass) {
      alert('Please enter both username and password correctly!');
      this.$refresh();
    } else {
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
            verifyData(parsedResponse);
          })
          .catch(err => {
            //log below is for developing purpose on errors :)
            //console.log('err:',err)
          });

      const verifyData = (res) => {
        if (res.token) {
          window.location.href="#/success";
        } else if (res.error) {
          alert(res.message)
          this.$refresh();
        }
      }
    }
  })
});

route('/success', 'success', function() {
  this.title = 'Success';
});

route('*', '404', function () {});
