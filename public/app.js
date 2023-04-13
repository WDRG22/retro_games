import Router from './scripts/router.js'
import { routes } from './scripts/routes.js';


const renderNode = document.getElementById("root")
const router = new Router(routes, renderNode);

// Browser back/forward buttons call handleRouteChange
window.addEventListener('popstate', event => router.loadRoute(event.state.path));

// Handle route on initial page load
router.handleRouteChange();

// Attaches event listener to document object to use event delegation
// to avoid binding event listeners to dynamically rendered links
// NOTE: event.target.href returns full url (e.g. localhost:3000/pong), rather than 
// html tag's href property (e.g. href='/pong')
// Solution uses URL builder in handleRouteChange() function
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('router-link')) {
      event.preventDefault();
      router.handleRouteChange(event);
    }
  });