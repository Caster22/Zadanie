// Simple JavaScript Templating
// John Resig - https://johnresig.com/ - MIT Licensed
import home from './templates/home.html';
import success from './templates/success.html';
import error from './templates/404.html';

const cache = {};

const chosenTemplate = str => {
  const temp = () => {
    if (str === 'home') return home;
    if (str === 'success') return success;
    if (str === '404') return error;
  };

  const el = new DOMParser();
  const parsedHtml = el.parseFromString(temp(), 'text/html');
  const template = parsedHtml.getElementById(str);
  console.log(template);
  return template;
};

export const engine = (str, data) => {
  // Figure out if we're getting a template, or if we need to
  // load the template - and be sure to cache the result.
  const fn = !/\W/.test(str) ? cache[str] = cache[str] || engine(chosenTemplate(str).innerHTML) :
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
          "var p=[],print=function(){p.push.apply(p,arguments);};" +
          // Introduce the data as local variables using with(){}
          "with(obj){p.push('" +
          // Convert the template into pure JavaScript
          str
              .replace(/[\r\t\n]/g, " ")
              .split("<%").join("\t")
              .replace(/((^|%>)[^\t]*)'/g, "$1\r")
              .replace(/\t=(.*?)%>/g, "',$1,'")
              .split("\t").join("');")
              .split("%>").join("p.push('")
              .split("\r").join("\\'")
          + "');}return p.join('');");

  // Provide some basic currying to the user
  return data ? fn( data ) : fn;
};
