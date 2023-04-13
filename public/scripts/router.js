class Router {
    constructor(routes, renderNode){
        this.routes = routes;
        this.renderNode = renderNode                
    }

    // Handles route change for onclick events or browser back/forward navigation.
    // Adds new route to window history. 
    // Loads html, css, and js files
    handleRouteChange(event) {
        const path = event ? new URL(event.target.href).pathname : window.location.pathname;
        window.history.pushState({path: path}, '', path);
        this.loadRoute(path);
    }
    
    async loadRoute(path){

        // Match path to route in routes
        const route = this.routes.filter(route => path == route.path)[0];

        // If no route match, load 404
        if (!route) {
            this.renderNode.innerHTML = '404 Page not found :(';
            return
        };
    
        // Load route template
        const html = await fetch(route.template).then((data) => data.text());
        this.renderNode.innerHTML = html        
    
        // Load script
        const scriptId = 'route-script';
        const existingScript = document.getElementById(scriptId);

        if (existingScript) {
            existingScript.parentNode.removeChild(existingScript);
        }

        if (route.script) {
            const script = document.createElement('script');
            script.src = route.script;
            script.id = scriptId;
            script.async = true;
            document.body.appendChild(script);
        }
    }    
}


export default Router;