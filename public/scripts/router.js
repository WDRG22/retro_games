export default class Router {
    constructor(routes){
        this.routes = routes;
    }

    // Handles route change for onclick events or browser back/forward navigation.
    // Adds new route to window history. 
    // Loads html, css, and js files
    async handleRouteChange(event) {
        const path = event ? new URL(event.target.href).pathname : window.location.pathname;
        
        // initialize route to 404
        let route = this.routes[this.routes.length -1]
    
        // if path corresponds to a route in routes, update route 
        // if not, route remains as 404
        for (let index = 0; index < this.routes.length; index++) {
            if (path === this.routes[index].path){
                route = this.routes[index]
            } 
        }
 
        // Load route template
        const html = await fetch(route.template).then((data) => data.text());
        document.getElementById("main-page").innerHTML = html;
    
        // Load route script
        const script = document.createElement("script");
        script.type = "module"
        script.src = route.script
        document.body.appendChild(script)
        
        // Update current route and window history
        window.history.pushState({ path }, '', path);
    }    
}