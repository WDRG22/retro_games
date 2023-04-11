import Router from './scripts/router.js'
import { routes } from './scripts/routes.js';

const router = new Router(routes);

// Browser back/forward buttons call handleRouteChange
window.onpopstate = router.handleRouteChange;

// Give global access to 'handleRouteChange' function
window.handleRouteChange = router.handleRouteChange;

// Call on pageLoad
router.handleRouteChange();

// Attaches event listener to document object to use event delegation
// to avoid binding event listeners to dynamically rendered links
// NOTE: event.target.href returns full url (e.g. localhost:3000/pong), rather than 
// html tag's href property (e.g. href='/pong')
// Solution to use URL builder in handleRouteChange() function
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('router-link')) {
      event.preventDefault();
      router.handleRouteChange(event);
    }
  });