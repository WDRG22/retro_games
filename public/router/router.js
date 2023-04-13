class Router {
    constructor(routes, renderNode, currentRoute){
        this.routes = routes;
        this.renderNode = renderNode;
        this.currentRoute = currentRoute;            
    }

    initialPageLoad(){
        this.loadRoute(window.location.pathname);
    }

    // Handles route change for onclick events or browser back/forward navigation.
    // Adds new route to window history. 
    // Loads html, css, and js files
    handleRouteChange(event) {
        const url = new URL(event.target.href);
        const path = event ? url.pathname : window.location.pathname;

        if (url.hostname !== window.location.hostname){
            window.open(url.href, '_blank')
            return
        }
        
        if (path === this.currentRoute) return // Do nothing if same route
        else this.currentRoute = path

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

        // Load route template, replace script and styling
        this.renderNode.innerHTML = ""
        this.replaceStyling(route);
        this.renderNode.innerHTML = await fetch(route.template).then((data) => data.text());
        this.replaceScript(route);
    }    

    // Removes previous route styling and adds current route styling
    replaceStyling(route){
        const cssId = 'route-styles';
        const existingCss = document.getElementById(cssId);
        
        if (existingCss) { 
            existingCss.parentNode.removeChild(existingCss);
        }
        
        if (route.styles) { 
            const css = document.createElement('link');
            css.href = route.styles;
            css.rel = 'stylesheet';
            css.id = cssId;
            document.head.appendChild(css);
        }
    }
    
    // Removes previous route script and adds current route script
    replaceScript(route){
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