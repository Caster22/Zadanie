import { route } from './router';

route('/', 'home', function() {
  this.where = 'Log in';
  this.post = 'start';
  this.$on('.submit-btn', 'click', () => {
    this.post = 'end';
    this.$refresh();
  })
});

route('/success', 'success', function() {
  this.title = 'Success';
});

route('/ex2', 'example2', function() {
  this.title = 'Example 2';
  this.counter = 0;
  this.$on('.my-button', 'click', () => {
    this.counter += 1;
    this.$refresh();
  });
});

route('*', '404', function () {});
