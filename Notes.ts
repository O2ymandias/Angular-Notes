// * Commands
/*
    * Angular CLI
        ng new <project-name>
            Creating new Angular project

        ng serve(s)
            Running the Angular project

        ng s --open(-o)
            Running the Angular project and open the browser

        ng generate(g) component(c) <component-name> 
            Creating new component

        ng g c <component-name> --skip-tests 
            Creating new component without test file

        ng g i <interface-name>
            Creating new interface

        ng g s <service-name>
            Creating new service

        ng g d <directive-name>
            Creating new directive

        ng g g <guard-name>
            Creating new guard

        ng g interceptor <interceptor-name>
            Creating new interceptor
            

    * CMD (for loop)
        for %i in (componentOne, componentTwo, componentThree) do ng g c %i --skip-tests


    * TypeScript Compiler (tsc)
        tsc <file-name>.ts
            Compiling TypeScript file to JavaScript file

        tsc <file-name>.ts --watch(-w) 
            Watching the changes in TypeScript file and compiling it to JavaScript file

        tsc --init
            Creating tsconfig.json file

        tsc <file-name>.ts --target(-t) ES-Version
            Compiling TypeScript file to specific JavaScript version
        
        tsc
            Compiling all TypeScript files in the project to JavaScript files
            NOTE: To run this command tsconfig.json file must be initialized.


    * What is the difference between ng add <package> & npm install <package>
        ng add <package>
            Installs and configures an Angular package with necessary dependencies and updates.
            Uses npm install internally to install the package.
            Runs schematics provided by the package to configure it automatically.
            Updates angular.json, package.json, and other necessary files.

        npm install <package>
            Installs a package without additional Angular-specific configuration.
            Only installs the package into node_modules.
            Updates package.json.
            Does not run schematics or modify Angular files.


*/

// * TypeScript
/*
    * Data Types
        TypeScript: Is JavaScript with syntax for types.

        Data Types: Same data types as JavaScript (number, string, boolean, undefined, null, object) + (union, type literal, tuple, any, custom type, void)

        [1] union (|)
            let x: number | string | boolean = 10;
            x = "10";
            x = true;
            x = null; XXXXXXXXX

        [2] type literal
            let role: "admin" | "user" = "admin";
            role = "user";
            role = "super admin"; ❌ Error

        [3] tuple
            Array with fixed number of elements with fixed data types.
            let product: [string, number] = ["Samsung S24", 1000];

        [4] any
            let x: any = 10;
            x = "10";
            x = true;
            x = null;

        [5] custom type (Alias)
            Alias name for a specific data types.

            type Id = string | number;
            let id: Id = 1;
            id = "1";

            ///////////////////////////

            type Product = [string, number];
            let product: Product = ["Samsung S24", 1000];

            ///////////////////////////

            type Role = "admin" | "user";
            let role: Role = "admin";
            role = "user";
            role = "super admin"; XXXXXXXXX

            ///////////////////////////

            type User = { id: string; name: string; avatar: string }
            let user: User = {
                id: "XXX",
                name: "XXX",
                avatar: "XXX"
            }
            OR
            let user: { id: string; name: string; avatar: string } = {
                id: "XXX",
                name: "XXX",
                avatar: "XXX"
            }


        [6] void
            Function that does not return a value.
                function sayHello(name: string): void {
                    console.log(`Hello ${name}`);
                }

        [7] enum
            A way to store a set of related constants.
            Labels only accepts values of (numbers or strings).
            By default, enums are zero-based, but you can change the start value.
            If string values are used, all labels must be initialized.

            enum Role {
                Admin,
                User,
                SuperAdmin,
            }

        [8] interface
            Code CONTRACT ensures if a class implements this interface, it MUST implements every signature of a property or methods.
            Only contains signature for properties or methods (Doesn't have any implementation or logic)


            ❕The Problem was:
                let user: object = {
                    name: "Nael",
                    age: 27,
                    isDeveloper: true,
                };

                [1] Can't Force type on properties.
                [2] Can't access the properties of the object. 
                    The object type only ensures that a value is non-primitive but it doesn't describe the specific properties an object has.
                    This is why TypeScript raises an error when you try to access user.name, it doesn't know that name exists on the user object

            ❕Example:
                interface User {
                    readonly fullName: string; (Readonly property "Can't be changed after initialization")

                    age: number;
                    isDeveloper: boolean;

                    isMarried?: boolean; (Optional property)

                    sayHello(): void;
                }

                const user: User = {
                    fullName: "Nael Muhamed",
                    age: 27,
                    isDeveloper: true,

                    sayHello() {
                        console.log(`Hello, this is ${this.fullName}`);
                    },
                };

                user.fullName = "Max Dmyan"; XXXXXXXXX
                user.sayHello();

        
        ? What is the difference between (type assign & type inference)?
            Type assign:
                let x: number = 10; 
                    x only accepts number type. 

            Type inference:
                let y = 10; 
                    y only accepts number type (Compiler detects the type from the variable).

        ? Why NOT to use a class instead of interface when we want to define the shape of an object ?

            * Using class
                class User {
                    isLoggedIn: boolean = false;
                    name: string = "";
                    age: number = 0;
                }
                const user: User = {
                    fullName: "Nael Muhamed",
                    age: 27,
                    isLoggedIn: true
                }

            * Using interface
                class IUser {
                    readonly fullName: string;
                    age: number;
                    isLoggedIn?: boolean
                }

                const user: User = {
                    fullName: "Nael Muhamed",
                    age: 27,
                    isLoggedIn: true
                }


            Class will be compiled to JS, This costs unnecessary memory (Allocating this obj at heap) and performance overhead (Default Constructor will be generated)


    * Access Modifiers
        [1] public
            -> Accessible everywhere (inside the class, outside the class, and in derived classes).
            -> If no modifier is specified, it defaults to public.

        [2] private
            -> Accessible only inside the class where it is defined.
            -> Not accessible in derived classes or outside the class.

        [3] internal
            -> Accessible inside the class and in derived classes, but not from outside.

        [..] readonly
            -> Prevents modification after initialization.

*/

// * Intro
/*
    MPA (Multi Page Application)
        Web application loads multiple HTML pages:
            When a user navigates to a different page, the browser sends a request to the server.
            The server processes the request and responds with a new HTML page, along with CSS and JavaScript files.
            Since the browser receives a completely new page, it needs to reload, causing a visible refresh.


    Angular: JS Framework allows to create Single Page Applications (SPA)
    Single Page Application (SPA): Web application loads only one single HTML page and its content is updated dynamically via an AJAX call WITHOUT reloading


    Disadvantages of SPA:
        - Initial load (First Request) is slow as it loads all the resources (html, css, js) at once.
            Fix: Lazy loading.

        - Not friendly with SEO (Search Engine Optimization)
            Fix: Server-side rendering (SSR)

            SSR VS CSR 
                CSR (Client-Side Rendering)
                    1. The client (browser) sends a request to the server.
                    2. The server responds with blank HTML (HTML page contains only <app-root/> element).
                    3. A large JavaScript bundle is sent along with the response.
                    4. The browser executes the JavaScript, which dynamically builds and renders the rest of the content.
                    5. The browser displays the fully-rendered HTML.

                    

                    
                SSR (Server-side rendering)
                    The client sends a request to the server.
                    The server renders the HTML on the server-side.
                    The fully-rendered HTML is sent to the client.
                    The browser displays the fully-rendered HTML.

    🗒️Rendering Strategies
        ❕Client-side rendering (CSR)
            1. The client (browser) sends a request to the server.
            2. The server responds with blank HTML (HTML page contains only <app-root/> element).
            3. A large JavaScript bundle is sent along with the response.
            4. The browser executes the JavaScript, which dynamically builds and renders the rest of the content.
            5. The browser displays the fully-rendered HTML.

            Advantages:
                -> Fast navigation (only data needs to be fetched)

            Disadvantages:
                -> Bad SEO performance as search engine crawlers may not execute JavaScript effectively
                -> Large JavaScript bundle size can impact performance and memory

        ❕Server-side rendering (SSR)
            1. The client (browser) sends a request to the server.
            2. The Angular application runs on the server (Node.js environment).
            3. The server fully renders the HTML, including all components and content.
            4. The server sends complete HTML to the browser.
            5. The browser displays this HTML immediately.
            6. In parallel, Angular JavaScript bundles are downloaded.
            7. Once downloaded, Angular "hydrates" the page.
            8. The application becomes fully interactive.

            Advantages:
                -> Improved SEO: Search engines receive fully rendered HTML content.

            Disadvantages:
                -> Requires more server resources to render applications.

            Considerations
                Angular executes the components on (Node.js server environment) where the browser global objects like (window, document, navigator, location, ...) are not defined.
                Accessing these objects during SSR leads to Reference Errors.

                How to solve?

                [1] Type Check
                    Making sure the code ONLY runs in the browser.
                    This works cause of Hydration, Angular Re-Executes the component in the browser.
                    if (type of window !== "undefined"){
                        Code to be executed ONLY In the browser
                    }

                [2] LifeCycle Hook afterNextRender
                    Making sure the code ONLY runs after Hydration
                    afterNextRender(()=> {
                        Code to be executed ONLY In the browser, after Hydration
                    })

                [3] isPlatformBrowser(PLATFORM_ID) [Recommended]
                        Returns true if the PLATFORM_ID represents browser.

                        How to get PLATFORM_ID ?
                            PLATFORM_ID: special token helps you distinguish between the browser and the server.    

                            1. Constructor Injection
                                constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {}
                                PLATFORM_ID is a Token, Not a Service
                                Tokens need to be injected using the parameter decorator @Inject

                            2. inject() method
                                private readonly platformId: Object = inject(PLATFORM_ID);

                        ngOnInit(){
                            if (isPlatformBrowser(platformId)){
                                Code to be executed ONLY In the browser
                            }
                        }

        ❕Static Site Generation
            1. During build time, the Angular application pre-renders all pages.
            2. Each route/page is generated as a separate HTML file.
            3. These static HTML files are deployed to a static file server (Firebase)
            4. When a user requests a page, the server delivers the pre-rendered HTML immediately.
            5. The browser displays the complete HTML content instantly.
            6. JavaScript bundles are downloaded in the background.
            7. The application "hydrates" into a fully interactive Angular app.

            Advantages:
                Advantages
                    Fastest Initial Load: Serves pre-built HTML with no rendering delay.
                    Excellent SEO: Search engines receive complete HTML content.

                Disadvantages
                    Dynamic Routes Complexity: Requires special handling for dynamic routes.
                        Static Site Generation happens at build time, which means:
                            -> Angular needs to know all the routes ahead of time to pre-render them.
                            -> This works great for static routes (/home, /about).
                            -> But dynamic routes (/product/:id, /blog/:slug) depend on data that might come from a backend or database.
*/

// * Component
/*
    The most basic UI building block of an Angular app, contains
        1. The logic (via typescript class decorated with @Component decorator.)
        2. The view (via angular template)
    of a part of the application.
    An Angular app contains a tree of Angular components.
    
    @Component: decorator marks the TS class as an Angular component and provides metadata about the component (selector, templateUrl, styleUrls, standalone) that determines how the component should be processed, instantiated, and used at runtime.

    Angular components are a subset of directives, always associated with a template. Unlike other directives, only one component can be instantiated for a given element in a template.

    Standalone components can be directly imported in any other standalone component or NgModule.

    NgModule based apps on the other hand require components to belong to an NgModule in order for them to be available to another component.

    To make a component a member of an NgModule, list it in the declarations field of the NgModule metadata.

*/

// * Binding
/*
    Syncing the data between the component (TS Logic) and the view (Angular template).

        🗒️ One-Way Data Binding
            [1] Data Interpolation
                Used to bind TEXT CONTENT of an HTML element to component's property or method.
                Is limited to text-binding (Converts any data type to string).
                Syntax: {{ data }}
                Example: <p>{{ message }}</p>

            [2] Property Binding
                Used to bind a component's property or method to a DOM property (Targets DOM properties, not HTML attributes.)
                Preserve original data type
                Syntax: [property]="data"
                Example: <img [src]="imageUrl" />

            🗒️ Difference between Data Interpolation & Property Binding
                ❕The behavior of disabled attribute
                    disabled => Evaluates to disabled
                    disabled="" => Evaluates to disabled
                    disabled="Any string" => Evaluates to disabled

                <button disabled=" {{isAdmin}} "> Save </button>
                    {{isAdmin}} -> will be converted to string, which results into this button will always be disabled no matter what.

                <button [disabled]="isAdmin"> Save </button>
                    [disabled]="isAdmin" -> ONLY if isAdmin evaluates to true, disabled attribute will be added to the button.

            🗒️ Difference between DOM Property & HTML attribute
                ❕HTML Attributes:
                    1. Define the initial state of HTML elements in the markup
                    2. Are specified in HTML code (e.g., <input type="text" value="initial">)
                    3. Always represented as strings
                    4. Don't change when a user interacts with the element

                ❕DOM Properties:
                    1. Are properties of DOM objects (JavaScript objects that represent HTML elements in the browser's memory after an HTML document has been parsed.)
                    2. Represent the current state of the element
                    3. Can be of any JavaScript type (string, boolean, object, etc.)
                    4. Reflect the current state and can change during user interaction

            [3] Event Binding
                Used to handle the DOM events.
                Syntax: (event)="handler()"
                Example: <button (click)="handler($event)" />


            [4] Attribute Binding
                Used to bind the component's property or method to HTML attribute (custom/built-in).
                Syntax: [attr.attributeName]="data"
                Example: <div [attr.data-id]="id" />

            [5] Class Binding
                Used to set the class/classes of an HTML element based on condition.
                Syntax:
                    ❕Single Class Binding
                        [class.className]="condition"
                        <div class="alert" [class.alert-success]="isActive">

                    ❕Multiple Class Binding
                        [class]="{
                            'classNameX': conditionA,
                            'classNameY': conditionB,
                        }"

                        <div class="alert" [class]="{
                            'alert-success': isActive,
                            'alert-danger': !isActive
                        }">


            [6] Style Binding
                Dynamically setting the INLINE style of an HTML element based on The component's property or method.
                Syntax:
                    Single Style Binding 
                        [style.styleName]="styleValue"
                        <button [style.backgroundColor]=" isActive ? 'green' : 'red' " />

                    Multiple Style Binding
                        [style]="{
                            'CSS propertyNameX' : "valueA",
                            'CSS propertyNameY' : "valueB",
                        }"

                        <div [style]="{
                            'background-color': isActive ? 'green' : 'red',
                            'padding': '5px'
                        }">


        🗒️Two-way Binding [()]
            Works with Form Inputs, combines Property Binding"[value]" and Event Binding "(input)".
            Syntax: [(ngModel)]="data"

            ❕How to use Two-way Binding?
                1. Import the FormsModule from @angular/forms
                2. Use the ngModel directive [(ngModel)]
                3. Assign it the state that you want it to update.

            Example:
                <input [(ngModel)]="stateProperty" />


            🗒️FormsModule
                Module that provides directives for creating and handling forms.
                ❕Key Features of FormsModule:
                    [1] Two-Way Data Binding
                        Uses [(ngModel)] directive to create two-way data binding between form controls and component properties
                        Automatically updates the model when the form control value changes and vice versa

                    [2] Handling Submission
                        Uses (ngSubmit) to handle form submission efficiently.
                        Prevents default browser submission behavior automatically.

                        🗒️Default Behavior of <form>:
                            [1] If the <form> tag does not have an action attribute, it submits the form data to the current page's URL using the method specified (GET or POST, default is GET). (Sending a request to the server that is serving the app)

                            [2] If an action attribute is provided, the request is sent to the specified URL.

                        🗒️Why Does the Page Reload?
                            When the submit button is clicked, the browser:
                                1. Gathers form data.
                                2. Sends a request (GET/POST) to the server.
                                3. Waits for the server's response.
                                4. If the server responds with a new HTML page, the browser loads that page (causing a reload).
                                5. If the server responds with a redirect, the browser navigates to the new URL.

        🗒️Custom Two-way Data Binding (Using (input & output) properties)
            ❕Child Component
                [1] Setting Input Property
                    size = input.required<{ width: string; height: string }>();

                [2] Setting Output Property
                    sizeChange = output<{ width: string; height: string }>();
                        ‼️MUST be the same input property name + "Change"

            ❕Parent Component
                [3] Using [(modelProperty)] syntax
                    <app-rect [(size)]="rectSize" />

                    
        🗒️Custom Two-way Data Binding (Using modelSignal)
            ❕ChildComponent
                size = model.required<{ width: string; height: string }>();

            ❕Parent Component
                Using [(modelProperty)] syntax
                    <app-rect [(size)]="rectSize" />


*/

// * Control Flow
/*
    [1] @for
        @for (item of iterable; track $index){
            🗒️Track Expression:
                ❕REQUIRED within the @for block.
                ❕Plays a crucial role in rendering performance:
                    - Used to uniquely identify items for Angular to track changes.
                    Allows for minimal DOM operations when changes happen within the collection.

                    - Without it, DOM updates would be slower since Angular would have to re-render elements from scratch.

                🗒️How to select a good tracking key:
                    ❕Static collections:
                        (track $index) can be sufficient for collections that will not change.

                    ❕Dynamic collections:
                        Use a unique item property that does not change (track item.id)

            🗒️@for Variables:
                $index -> Index of the current item in the iterable
                $count -> Total number of items in the iterable
                $first -> True if the current item is the first item in the iterable
                $last -> True if the current item is the last item in the iterable
                $even -> True if the current item has an even index
                $odd -> True if the current item has an odd index
        }

        @empty{
            @empty block is exclusive to the @for block.
            Executed ONLY if the iterable is empty.
        }


    [2] @if
        Content is added and removed from the DOM based on the condition.

        @if (condition) {  
            Content to render when the condition is true  
        } 
        @else if (anotherCondition) {  
            Content to render if the first condition is false, and the second is true  
        } 
        @else {  
            Content to render if all conditions are false  
        }

    [3] @switch
        @switch (expression) {
            @case value1 {
                Content to render when the expression === value1
            }
            @case value2 {
                Content to render when the expression === value2
            }
            @default {
                Content to render when the expression does not match any case
            }
        }
        @switch does not have fallthrough, so you do not need to (break or return) statement.


    Before (@for, @if, @switch) Directives were used to handle control flow.
        🗒️Grouping Elements
            ❕<ng-container>
                Is a logical grouping element that does not get rendered in the DOM. It is useful when you need to apply structural directives (*ngIf, *ngFor, etc.) without adding unnecessary extra elements.

                ✅ Use Cases
                    1. Grouping elements without adding extra HTML
                    2. Applying structural directives (*ngIf, *ngFor) without wrapping elements
                    3. Improving performance by avoiding extra divs/spans

            ❕<ng-template>
                Is used to define template blocks that are not rendered immediately. These templates can be reused and displayed dynamically using *ngIf.


        🗒️Structural Directives
            Needs to be imported from @angular/common.

            [1] *ngFor
                <ng-container *ngFor=" let item of iterable; let i = index">
                    Repeated Content
                </ng-container>

                To access any contextual variable (Here without $) (index, odd, even, count, first, last), you need store it in a variable.
                
            [2] *ngIf
                <ng-container *ngIf="condition; else fallback">
                    Content to render when the condition is true
                </ng-container>

                <ng-template #fallback>
                    Content to render when the condition is false
                </ng-template>


            [3] *ngSwitch



    Advantages of @if, @for, @switch over *ngIf, *ngFor, *ngSwitch:
        [1] Can be used anywhere in the template.
            Unlike directives can only be used as an attribute on an element.

        [2] Performance improvements.
            @for has built-in track to improve performance.

        [3] No need to be imported
            Directives need to be imported from @angular/common module.
        
*/

// * Modules
/*
    A module is a mechanism to group related components, directives, pipes, and services.
    It helps to organize the application.

    Every Angular application has at least one module, called the root module (AppModule), which bootstraps the application.

    🗒️NgModule Decorator
        Configures the module with metadata that tells Angular how to compile and run the application.
        {
            declarations: components, directives, and pipes that belong to this module,
            imports: standalone components & the other modules,
            providers: services that the module contributes to the global collection of services,
            bootstrap: The root component that Angular creates and inserts into the index.html page,
            exports: components, directives, and pipes from the current module that will be available to other modules that import this module. It's essentially the public API of the module.
        } 

    🗒️AppModule
        import { NgModule } from '@angular/core';
        import { AppComponent } from './app.component';
        import { BrowserModule } from '@angular/platform-browser';

        @NgModule({
            declarations: [AppComponent],
            bootstrap: [AppComponent],
            imports: [BrowserModule],
        })
        export class AppModule {}

    🗒️Browser Module
        Foundation module that enables Angular applications to run in web browsers:
            1. Connects Angular to the browser's DOM
            2. Provides critical rendering services (Without it nothing will be rendered)
            3. Includes all common directives (ngIf, ngFor, etc.) and pipes (DatePipe, CurrencyPipe, etc.) as the BrowserModule itself imports CommonModule  
            4. Manages browser events and DOM manipulation
            5. Handles security through DOM sanitization

        MUST be imported ONLY ONCE in the entire application
        MUST be included ONLY in the root AppModule
        Feature modules should use CommonModule instead

    🗒️ main.ts
        import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
        import { AppModule } from './app/app.module';
        platformBrowserDynamic().bootstrapModule(AppModule);




*/

// * Extending Built-in Elements
/*
    🗒️How Angular Normally Renders Components?
        When Angular renders a component, it wraps it inside a custom HTML element.
        For example, a ButtonComponent with selector: 'app-button' would be used as <app-button></app-button>, which creates a wrapper element.

    🗒️Preventing the Wrapper with Attribute Selectors.
        1. Instead of using a custom element (<app-button>), we can use an attribute selector like button[app-button].
        2. This tells Angular to apply the component’s logic to an existing button element instead of wrapping it inside another element.

        ❕Button Component
            @Component({
                selector: 'button[app-button]',
                ‼️Angular will scan the template for a button element with the app-button attribute.
                ‼️If it finds one, it will enhance the button with the component’s template and logic.
                ‼️Angular preserves native behavior, The <button> retains all default behavior like type, disabled, and click events.

                ❕For Multiple Selectors
                    selector: 'button[app-button], a[app-button], input[app-button]',
                    ‼️Angular will scan the template for button, a, and input elements with the app-button attribute.

                ...
            })

        ❕Button Template
            <span> Click </span>
            <span class="icon"> ⌲ </span>



        ❕Parent Component
            @Component({
                imports: [ButtonComponent], ‼️Must be imported
                ...
            })

            <button app-button></button> ‼️Since app-button is just an attribute, There is no wrapper element.

    🗒️Types Of Selectors
        [1] Element Selector: Selects an element by its tag name. (app-header)
        [2] Class Selector: Selects an element by its class name. (.header)
        [3] Attribute Selector: Selects an element by its attribute. (button[app-button] | button[app-button="submit"]) ) 

*/

// * Routing
/* 
    Allows to create single-page application (SPA) that can navigate between views or components without reloading the entire page (Client Side Routing).

    🗒️Provide the app with Angular Router.
        In main.ts
            bootstrapApplication(AppComponent, appConfig)
            The appConfig is an obj implements ApplicationConfig usually imported from app.config.ts, thats why it must have a providers array.

        In app.config.ts
            export const appConfig: ApplicationConfig = {
                providers: [provideRouter(routes)],
            };

            Here we can provide Angular with the Router using provideRouter().
            provideRouter(routes, ...features)
                [1] Routes: an array of Route, usually imported from app.routes.ts, each consists of:
                    {
                        path:
                            URL segment Or "**"(wildcard route) -> Is used to handle any routes that don't match any predefined paths.

                        component:
                            Component to render when the URL matches the path.

                        redirectTo:
                            Redirects to another route.

                        children:
                            For nested routes.

                        pathMatch:
                            'full' ->  The entire URL must match the route's path.
                            Example
                                { path: '', pathMatch: 'full', redirectTo: '/home' }

                                URL: domain/ -> MATCHES (because it's an exact match to the empty path '').

                                URL: domain/home -> DOES NOT MATCH (since path: '' must match the entire URL, and /home is not empty).

                            'prefix' -> The start of the URL must match the route's path.
                            Example
                                { path: 'user', pathMatch: 'prefix', redirectTo: '/user' }

                                URL: domain/user -> MATCHES (because it starts with user).

                                URL: domain/user/profile -> MATCHES (because it also starts with user).

                                URL: domain/about -> DOES NOT MATCH (because it doesn't start with user).

                        title:
                            Title of the page
                            Could be static or dynamic(Resolved)

                        loadComponent:
                            To apply lazy loading.

                        data:
                            To pass static data to the loaded component via route.
                            {key: value}

                        resolve:
                            To fetch data before the route is activated
                            {key: value} 
                    }

            [2] ...features:
                withInMemoryScrolling({
                    scrollPositionRestoration:
                        "disabled" -> Default
                        "enabled" -> Scroll to the top of the page when navigating via router links.
                        "top" -> Scroll to the top of the page when navigating via links OR browser back/forward.
                })

                withHashLocation()
                withViewTransition()
                withComponentInputBinding() -> Enables automatic binding of routeParams/ queryParams/ staticData/ dynamicData to component inputs




    🗒️Where to render the component of the matching route?
        1. app.component.ts: 
            Import the RouterOutlet directive from @angular/router.

            RouterOutlet acts as a placeholder where Angular dynamically renders the component that matches the current route.

        2. app.component.html:
            <router-outlet />
            HERE right after the directive , Angular will render the component of the matching route.


        Nested Routes (Child Routes):
            You can define child routes in the route config using the children property.
            Angular will render child route components inside the RouterOutlet of the parent component's template.
        
    🗒️Navigating
        [1] Using RouterLink Directive
            RouterLink:
                Allows to navigate to a specific route.
                Needs to be imported from @angular/router.
                Syntax: routerLink="path"
                Example:
                    <a routerLink="/home">
                        Home
                    </a>

            RouterLinkActive Directive:
                Adds a css class/classes when the routerLink is active (routerLink value matches the current URL).
                Needs to be imported from @angular/router.            
                Syntax: routerLinkActive="classOne classTwo"
                Example:
                    <a routerLink="home" routerLinkActive="active" >
                        Home
                    </a>

            RouterLinkActiveOptions:
                Interface used to configure the behavior of RouterLinkActive.
                Syntax: [routerLinkActiveOptions]="{exact: true}"
                Example:
                    <a routerLink="home" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                        Home
                    </a>

    🗒️Dynamic Routing
        ❕Sending Data Via Route

            1. Setting up dynamic routes (:dynamicRoute)
                { path: 'users/:userId', component: UsersComponent }
                 
            2. Sending data via routes
                ❕RouterLink Directive 
                    <a [routerLink] = "['/users', id]">
                        User
                    </a>

                ❕Router Service (Programmatically)
                    private readonly _router = inject(Router)
                    _router.navigate(["/users", id], {
                        (replaceUrl: boolean) -> Useful when you DON'T want the current URL to be kept in the browser history, so no longer go back using the browser's back button

                        (fragment: '') -> Adds a fragment (hash) to the URL, useful for scrolling to an element with the corresponding id.

                        queryParams: {key: value} ->  Adds query parameters to the URL (?sort=asc), great for passing lightweight data.
                    })


        ❕Extracting Route Parameters
            [1] @Input() / input()
                The component must be standalone.
                Need to be configured in the provideRouter()
                    provideRouter(routes, withComponentInputBinding())

                🗒️Default Behavior
                    It only gives access to route parameters defined in the same route (not parent or child routes).

                    To access parameters from parent routes, you need to pass withRouterConfig() to provideRouter()
                        provideRouter(
                            routes,
                            withComponentInputBinding(),
                            withRouterConfig({
                                paramsInheritanceStrategy: 'always',
                            })
                        ),

            [2] ActivatedRoute
                private readonly _activatedRoute = inject(ActivatedRoute);
                ngOnInit() {
                    this._activatedRoute.paramMap.subscribe({
                        next: (params) => {
                            const userId = params.get("userId")
                        })
                    })

                    Or ypu can take a snapshot of the url.
                    const userId = this._activatedRoute.snapshot.paramMap.get('id').
                }

                🗒️What is the difference paramMap & snapshot?
                    [1] paramMap (Observable)
                        Listens for changes in the route parameters and emits new value whenever the route changes.

                        Best for: components that stay loaded while route parameters change.

                    [2] snapshot.paramMap
                        Gets the route parameter only ONCE, when the component is initialized.

                        If the route parameter changes while the component remains loaded, the value does not update.

                        Best for: when the component is destroyed and recreated for each navigation change.

                🗒️Default Behavior of ActivatedRoute
                    It only gives access to route parameters defined in the same route (not parent or child routes).
                    
                    When using nested routes, you need to traverse up the route tree to access parameters from parent routes.

                    this._activatedRoute.parent?.paramMap.subscribe().


    🗒️Relative Path VS Absolute Path
        [1] Relative Path
            Means: Current URL + path
            Better to use with child routes.

        [2] Absolute Path (/path)
            Means: Root of application + path
            Better to use with main navigation links.

        "../" -> is a relative path that tells the router to go (one level up) from the current route in the route hierarchy.
            /users/13/details -> routerLink="../" -> /users/13

        "./" -> is also a relative path tells the router to stay at the current level and resolve the route relative to the current URL.

        ❕When you navigate programmatically using ("./", "../"), some configurations needs to be set.
            this._router.navigate(['./'], {
                relativeTo: this._activatedRoute,
                onSameUrlNavigation: 'reload',
                queryParamsHandling: 'preserve',
            });



    🗒️Query Params
        ❕Setting up query params
            1. Import RouterLink Directive to have access on queryParams at the template.
            2. in template
                <a 
                    routerLink="./" -> Navigates relative to the current route.
                    [queryParams]="{ sort: sort() === 'asc' ? 'desc' : 'asc' }" -> Adds ?sort=asc/desc to the URL.
                >
                    Sort Ascending / Descending
                </a>

        ❕Extracting query params
            [1] Via @Input()/input() -> withComponentInputBinding() MUST be configured

                Make sure input property has the same name as been set in the template
                sort = input<'asc' | 'desc'>('asc');

            [2] Via ActivatedRoute
                private _activatedRoute = inject(ActivatedRoute);
                sort = signal<'asc' | 'desc'>('asc')
                ngOnInit() {
                    this._activatedRoute.queryParams.subscribe({
                        next: (params) => this.sort.set(params['sort']),
                    });
                }

    🗒️Passing static data to a route
        route obj:
        {
            path: 'user',
            component: UserComponent,
            data: {
                message: 'Hello'
            }
        },

        ❕Extracting data
            ❕Via @Input()/input() -> withComponentInputBinding() MUST be configured
                message = input.required<string>();

            ❕Via Activated Route
                private _activatedRoute = inject(ActivatedRoute);
                message = signal('');
                this._activatedRoute.data.subscribe({
                    next: (data) => this.message.set(data['message']),
                });

    🗒️Resolving Route-Related Dynamic 
        Resolvers allow to fetch data before the route is activated, ensuring that components have all necessary data when they are initialized.

        [1] Create Resolver Function
            The resolver function must have specific signature
            const resolve: ResolveFn<T> = (
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot
            )
            {
                Must return a value, Observable<T>, or Promise<T>.
            }

            Example:
                export const resolveUserName: ResolveFn<string> = (
                    route: ActivatedRouteSnapshot,
                    state: RouterStateSnapshot
                ) => {
                    const usersService = inject(UsersService);
                    const userId = route.paramMap.get('userId');
                    return usersService.users.find((u) => u.id === userId)?.name ?? '';
                };

        [2] Add Resolver to the Route
            {
                path: 'users/:userId',
                component: UserDetailComponent,
                resolve: {
                    userName: resolveUserName
                }
            }

        [3] Access Resolved Data
            ❕Via @Input()/input() -> withComponentInputBinding() MUST be configured
                userName = input.required<string>();

            ❕Via ActivatedRoute
                private _activatedRoute = inject(ActivatedRoute);
                userName = signal('');
                this._activatedRoute.data.subscribe({
                    next: (data) => this.message.set(data['userName']),
                });

        ❕Default Behavior
            Resolvers run when route parameters change NOT query parameters
            You can pass another property to the route obj runGuardsAndResolvers: 'paramsOrQueryParamsChange' to run the resolver when queryParams change as well 
*/

// * Guards
/*
    Are used to control access to routes in your application.
    They allow or prevent navigation to/from a route based on certain conditions 

    Types of Guards in Angular:
        [1] CanActivate
            Checks if a route can be activated.
            Example: Authentication (allow access only if the user is logged in).

        [2] CanActivateChild
            Checks if child routes of a route can be activated.
            Example: Restricting access to child routes based on user roles or permissions.

        [3] CanDeactivate
            Checks if it's safe to leave the current route.
            Example: Prevent losing unsaved changes when leaving a form.

        [4] CanMatch
            Checks if a route should be matched before the router activation.
            Example: Conditionally matching routes based on user roles or other criteria.

        ❕ If there is a guard on a parent route, the nested routes are also guarded. 

        🗒️What is the difference between CanActivate & CanMatch ?
            CanMatch (Should Angular even look at this route) 
                Evaluated before the router matches the route.
                If it returns false, the route is skipped during the matching process.

            canActivate (Now that we found this route, are you allowed to enter?)
                Evaluated after the route is matched but before the component is activated and loaded.
                If it returns false, the navigation is canceled.
                More versatile

        ❕Guard function signature
            (route: Route, segments: UrlSegment[]): boolean | RedirectCommand | Observable<boolean | RedirectCommand>

        Example
            export const authGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
                const router = inject(Router);
                const isAuthorized = Math.random() > 0.5;
                const isAuthorized$ = of(isAuthorized).pipe(
                    delay(1000),
                    map((isAuthorized) => {
                        if (isAuthorized) return true;
                        else return new RedirectCommand(router.parseUrl('/unauthorized'));
                    })
                );
                return isAuthorized$;
            };


*/

// * Lazy Loading
/*
    Loading resources only when they are needed. This reduces the bundle size which leads to improving performance & reducing memory usage.
    This also means more http requests to the server which could have impact on performance if not wisely used.

    🗒️Route-based Lazy Loading
        ❌ Avoid -> import { TasksComponent } from '../tasks/tasks.component';
            This will eagerly load the component as soon as the file is parsed/executed.

        ❕loadComponent
            {
                path: 'tasks',
                loadComponent: () => import('./../tasks/tasks.component').then((c) => c.TasksComponent),
                    ❕Angular triggers this only when the route is activated. Keeps initial bundle smaller and loads TasksComponent on demand.
            }

        ❕loadChildren
            {
                path: 'users/:userId',
                component: UserTasksComponent,
                loadChildren: () => import('./users/users.routes').then((module) => module.routes),
            },

        🗒️Providing a service at the route level with lazy loading
            1. Define the service without the {providedIn: 'root'} option in the @Injectable() decorator.
            2. Avoid importing it in the main app routes file
            3. Use lazy loading with loadChildren
            4. Provide the service in a parent route within the lazy-loaded routes

            Example
                ❕app.routes.ts
                export const routes: Routes = [
                    {
                        path: 'user',
                        loadChildren: () => import('./user/user.routes').then(m => m.USER_ROUTES)
                    },
                    Other app routes...
                ];

                ❕user.routes.ts
                export const USER_ROUTES: Routes = [
                {
                    path: '', -> Parent route for all user routes
                    providers: [UserDataService], ->  Provide service at route level
                    children: [
                        {
                            path: 'profile',
                            loadComponent: () => import('./user-profile.component')
                            .then(m => m.UserProfileComponent)
                        },
                        {
                            path: 'settings',
                            loadComponent: () => import('./user-settings.component')
                            .then(m => m.UserSettingsComponent)
                        }
                    ]
                }
                ];



    🗒️Deferrable Views
        @defer
            The code for any components, directives, and pipes inside the @defer block is split into a separate JavaScript file and loaded only when necessary, results into a faster initial load.

        @defer Triggers:
            [1] Predefined Triggers (on + ACTION)
                    interaction: Triggers when the user interacts with specified element through (click or keydown) events.

                    hover: Triggers when the mouse hovers over specified area

                    viewport: Triggers when specified content enters the viewport

                    timer: Triggers after a specific duration

                    idle (Default): Triggers when the browser is "idle" (It means not processing tasks, such as loading a page, running scripts, or handling user interactions).

                    immediate: Triggers immediately after non-deferred content has finished rendering

                    ❕Notes
                        By default, @placeholder acts as the interaction element incase of (interaction & hover) or the intersection element incase of (viewport).

                        Placeholders used this way MUST have at least a single element.

                        You can specify a "template reference variable"(#ref), which is used as interaction element incase of (interaction & hover) or the intersection element incase of (viewport).

                        "prefetch": allows you to preload the content in the background, so it’s ready by the time it needs to be displayed
                            @defer (on interaction; prefetch on hover) {
                            <app-offer-preview />
                            } @placeholder {
                            <p> We might have an offer </p>
                            This will be loaded on hover and will be displayed on interaction.
}
 

                


            [2] when + CONDITION
                @defer block does not revert back to the placeholder if the condition changes to a falsy value after becoming truthy.

                We can use more than one trigger separating them by semicolons (;)
                Example:
                    @defer (on hover ; on timer(60s) ; when truthyValue ) {
                        <app-recommendations>
                    }@placeholder {
                        <p>See more ...</p>
                    }
                    This means that <app-recommendations> will be shown when the user hovers over <p> See more... </p> OR
                    after 30 seconds OR when truthyValue is truthy.

        @placeholder
            By default, defer block doesn't render any content before they are triggered.
            
            @placeholder is an optional block that declares what content to show before the @defer block is triggered.

            Angular replaces placeholder content with the main content once loading is complete.

            You can use any content in the placeholder body including plain HTML, components, directives, and pipes.

            @placeholder(minimum 5s/5000ms): Accepts an optional parameter to specify the minimum amount of time that this placeholder should be shown after @defer is triggered.
                This minimum parameter is useful to prevent fast flickering of placeholder content in the case that the deferred dependencies are fetched quickly.

            @placeholder dependencies are eagerly loaded. 


        @loading
            -> Optional block that allows you to declare content that is shown ONLY while the deferred dependencies are loading.

            -> Similar to @placeholder, the dependencies of the @loading block are eagerly loaded.

            -> Accepts an optional parameters to help prevent fast flickering of content:
                minimum: the minimum amount of time that the loading template should be shown after @defer is triggered.

        @error
            -> Optional block that displays if deferred loading fails.
            -> Similar to @placeholder and @loading, the dependencies of the @error block are eagerly loaded.

    
*/

// * Variables in templates
/*
    [1] Local template variable (@let)
    [2] Template reference variable

    🗒️Template reference variable
        Is used to get a reference to an element or child component inside a template.
        It allows direct access to DOM elements, Angular components, or directives.

        Example
            <input #nameInput type="text">
            <button (click)="onSubmit(nameInput.value)">Submit</button>

            #nameInput references the <input> element.
            It can be used anywhere in the template.


    🗒️Accessing Template reference variable in TS
        @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;
        ngAfterViewInit(): void {
            ‼️Access the input after view initialization
            const value = nameInput.nativeElement.value
        }

*/

// * Content Projection
/*
    ❕Allows to provide/inject content(HTML design) into child component. (Reusable components)

    ❕At the parent component:
        <app-reusable-component>
            Here where to inject content.
        </app-reusable-component>

    ❕At the child (reusable) component:
        We use <ng-content> to tell Angular where to inject content.
        The <ng-content> element is neither a component nor DOM element. Instead, it is a special placeholder that tells Angular where to render content.

        <div>
            <h2> Heading </h2>
            <ng-content />
            <p> Paragraph </p>
        </div>

    🗒️Multiple content placeholders
        You can project multiple different elements into different <ng-content> placeholders using CSS selectors
            select="h2"
                -> Selects the <h2> element
            select=".paragraph"
                -> Selects the element with the class paragraph
            select="input, textarea"
                -> Selects the <input> and <textarea> elements
            

        Example
            ❕Parent Component Template
                <app-reusable-component>
                    <h2 class="heading"> This is a heading element </h2>
                    <p class="paragraph"> This is a paragraph element </p>
                    <div ngProjectAs="divElement" > This is a div element </div>
                        ❕This tells Angular to treat the <div> as if it had a selector divElement.
                    <span class="span"> This is a span element </span>
                </app-reusable-component>

            
            ❕Child Component Template
                <div>
                    <div> <ng-content select=".heading" /> </div>

                    <div> <ng-content select=".paragraph" /> </div>

                    <div> <ng-content select="divElement" /> </div>

                    <ng-content /> ‼️This will capture the span
                </div>

        🗒️NOTES
            If you include one or more <ng-content> placeholders with a select attribute and one <ng-content> placeholder without a select attribute, the latter captures all elements that did not match a select attribute, But if the latter not provided, any non-matching elements will be removed from DOM (Angular already created them first at the parent component)


    🗒️ ngProjectAs Directive
        Tells Angular to treat the projected content as if it had a different selector.(The old selector will be ignored)

        ❕Parent Component Template
            <app-card>
                <div ngProjectAs="header">This is the header</div>
                <p>This is the body</p>
            </app-card>

        ❕Child Component Template
            <div class="card">
                <ng-content select="header" />‼️Will project the div with ngProjectAs="header"
                <ng-content />   ‼️Will capture everything else that is not selected 
            </div>



    🗒️Fullback content
        Angular can show fallback content inside <ng-content> placeholder if there is no matching projected content.

        Example
            ❕Parent Component Template
                <app-reusable-component /> (No projected content is provided)

            ❕Child Component Template
                <ng-content>
                    <p> Fallback content </p>
                </ng-content>

            -> If no content is passed to <app-reusable-component />, the default fallback content (<p>This is fallback content.</p>) will be displayed.

            -> If content is provided inside <app-reusable-component />, that content will replace the fallback content.
        
*/

// * @ViewChild | @ViewChildren | @ContentChild | @ContentChildren Decorators
/*
    🗒️@ViewChild()
        To access (DOM element OR child component) from parent VIEW (Template).

        Parameters:
            selector: ('Template reference variable' -> DOM element) OR (ComponentName -> Child component) 

        Returns:
            ElementRef<TypeOfDOMElement> -> DOM element
                ElementRef: A wrapper around a native element inside of a View.

            Component -> Child component

        ❕Example
            export class HomeComponent {
                @ViewChild('form') form?: ElementRef<HTMLFormElement>;
                @ViewChild(ChildComponent) childComponent!: ChildComponent;
            }

        ❕Migrating to signal (viewChild())
            private form = viewChild<ElementRef<HTMLFormElement>>('form');
            If you are sure that selector is valid (references DOM element or component), you can consider required
                form = viewChild.required<ElementRef<HTMLFormElement>>('form');


    🗒️@ViewChildren()
        -> To access a QueryList of (DOM elements OR child components) of the parent VIEW (Template).

        Parameters:
            selector: ('Template reference variable' -> DOM element) OR (ComponentName -> Child component) 
            

        Returns:
            QueryList<ElementRef<TypeOfDOMElement>> -> DOM elements
                Inside QueryList, we can access useful properties like:
                    first(): provides access to the first DOM element of the QueryList
                    last(): provides access to the last DOM element of the QueryList

            QueryList<Component> -> Child components

        ❕Example
            export class HomeComponent {
                @ViewChildren('listItem') listItems?: QueryList<ElementRef<HTMLElement>>;
                @ViewChildren(ChildComponent) childComponents!: QueryList<ChildComponent>;
            }

        ❕Migrating to signal (viewChildren)
            private listItems = viewChildren<QueryList<ElementRef<HTMLElement>>>('listItem')

        ❕NOTES
            1. QueryList: Immutable list of items that Angular keeps up to date when the state of the application changes.
            2. QueryList itself is an iterable object.
            3. If the view DOM changes, and a new child matches the selector of @ViewChild/@ViewChildren, the property is updated.


    🗒️@ContentChild()
        To access DOM element or child component from parent PROJECTED CONTENT (<ng-content />).
        Example
            ❕Parent Component
                <app-control>
                     <input #projectedInput type="text" />
                </app-control>

            ❕Child Component Template
                <ng-content select="input, textarea" />

            ❕Child Component TS
                @ContentChild('projectedInput') private projectedInput?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;

                ngAfterContentInit(): void {
                    const value = projectedInput.nativeElement.value;
                }


        ❕Migrating to signal (contentChild())
            projectedInput? = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('projectedInput');

            If you are sure that selector is valid (references DOM element or component), you can consider required
                projectedInput = contentChild.required<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('projectedInput');



    🗒️@ContentChildren()
        To access a QueryList of DOM elements or child components from parent PROJECTED CONTENT (<ng-content />).
        We may need to send a 2nd param
            options: { descendants: boolean ‼️Deep search into the nested elements }

        ❕Migrating to signal (contentChildren())

*/

// * Transfer data from the parent to the child component (@Input()).
/*
    🗒️@Input() Decorator
        1. Marks a class property as an input property
        2. The input property is bound to a DOM property.
        3. During change detection, Angular automatically updates the class property with the DOM property's value.

    🗒️Example
        ❕ChildComponent
            export class ChildComponent {
                @Input() userName = '';

                ❕You can pass an options to @Input({})
                    @Input({
                        required: true, ❗To make the property required.
                        alias: emailAddress, ❗To provide an alias for the property.
                        transform: (value) => value.trim() ❗To apply a transformation on data. 
                    })
                    email: string = '';
            }


        ❕ ParentComponent
            export class ParentComponent {
                UserNameToBeSent = 'Nael Muhamed';
                EmailToBeSent = 'nael.muhamed@pm.me';
            }

        ❕Parent Component Template
            <app-child
                [userName]="UserNameToBeSent"
                [email]="EmailToBeSent" ‼️Must be provided
            />

    🗒️Migrating to signals
        Creating an input signal
            userName = input<string>(''); ‼️Optional, to give it an initial value, if not (userName -> InputSignal<string | undefined>)

        Creating a required input signal
            email = input.required<string>();

        Additional Configurations
            id = input<string>({
                alias: "UserId",
                transform: (val) => val.trim();
            })

*/

// * Transfer data from the child to the parent component (@Output()).
/*
    🗒️@Output() Decorator
        ❕ Marks a class property as an output property which is typically an instance of EventEmitter<T>.
        So parent component can listen to this event using event binding syntax.

        
    🗒️Steps
        [1] Define an EventEmitter in the child component and marks it as an output property using @Output() decorator.

            export class ChildComponent {
                userName: string = 'John Doe';❗Data to be sent to the parent component
                @Output() dataEvent = new EventEmitter<string>();

                ❕You can pass a string to @Output("Data") to configure aliasName. 
            }

        [2] Emit the event with data when ACTION is triggered.

            export class ChildComponent {
                sendDataToParent(): void {
                    this.dataEvent.emit(this.userName);❗Fire the event with the data
                }
            }

            <button (click)="sendDataToParent()"> FireEvent </button>

        [3] Capture the event in the parent component using the event binding syntax.

            <app-child (dataEvent)="receivedUserName = $event" />
            OR
            <app-child (dataEvent)="onReceivingData($event)" />

            export class AboutComponent {
                receivedUserName: string = '';

                onReceivingData(data: string): void {
                    this.receivedUserName = data;
                    // Do some logic
                }
            }

    🗒️Using output()
        It is not a signal, But its the modern way to create an event emitter WITHOUT manually creating an instance of EventEmitter)
        Example
            dataEvent = output<string>();
            sendDataToParent(): void {
                this.dataEvent.emit(this.userName);‼️Fire the event with the data.
            }
        ❕You can pass a configuration obj to output() to configure aliasName

*/

// * Component Lifecycle Hooks.
/*
    ❕Constructor
    	Standard JS class constructor . Runs when Angular instantiates the component.
        Initializes the class properties and injects dependencies when the class is instantiated.
        Called once.

    ❕ngOnChanges (Multiple times)
        Called:
            [1] First Call -> After the constructor.
            [2] After input properties change with NEW values.

        If the component has no input properties, ngOnChanges won't be called.

    ❕ngOnInit (Once)
        Called once after the first ngOnChanges call (after Angular has initialized all the component's inputs).
        Usage:
            Initialization logic, fetching data, and subscribing to observables.

    ❕ngDoCheck (Multiple times)
        Called:
            [1] First Call -> After ngOnInit.
            [2] With every change detection cycle.

                🗒️What triggers change detection cycle?
                    1. User interaction (click, input, etc.)
                    2. HTTP request
                    3. Timer (setTimeout, setInterval)
                    4. Observables
        Usage:
            Enables custom change detection logic when Angular default change detection is not sufficient.

    ❕ngAfterContentInit (Once)
        After the projected content (<ng-content />) is initialized.
        Usage:
            With @ContentChild and @ContentChildren.

        ‼️NOTE
            This means we have access on the projected content before the view is initialized.
        

    ❕ngAfterContentChecked (Multiple times)
        Called:
            [1] First Call -> After ngAfterContentInit.
            [2] When the projected content is checked for changes (With every change detection cycle).

    ❕ngAfterViewInit (Once)
        After the component's view and child views are initialized.
        Usage:
            Interacting with the DOM using @ViewChild or @ViewChildren.

    ❕ngAfterViewChecked (Multiple times)
        Called:
            [1] First Call -> After ngAfterViewInit.
            [2] When the view and child views are checked for changes (With every change detection cycle).


    ❕afterNextRender (Once) 
        Executes exactly once after the component is hydrated.
        Skipped during Server-Side Rendering (SSR).
        Guaranteed to run only on the client-side.

    ❕afterRender (Multiple Times) 
        Runs with every change detection cycle
        Skipped during Server-Side Rendering (SSR).
        Guaranteed to run only on the client-side.


    ‼️(afterNextRender & afterRender) only can be executed inside the constructor.
        constructor() {
            afterNextRender(() => { LOGIC });
            afterRender(() => { LOGIC });
        }


    ❕ngOnDestroy (Once)
        Before the component is destroyed (Leaving the current route).
        Usage:
            Cleanup activities such as unsubscribing from observables and clearing intervals.

*/

// * Services
/* 
    Allows to share logic and data across the application.

    🗒️What is the difference between constructor injection & inject()?
        [1] Constructor Injection
                constructor(private _someService: SomeService) {
                By default Angular DI System provides the required instances when the class is instantiated
            }

        [2] inject()
            Works only inside injection contexts (like services, components, directives, pipes, or effects).
            It is not dependent on constructor parameters.

    🗒️Angular has multiple injectors:
        Hierarchy: ElementInjector -> (RootInjector || ModuleInjector) -> PlatformInjector 

        [1] ElementInjector
            Angular implicitly creates a hierarchy of injectors for each DOM element that corresponds to an Angular component or directive.

            These injectors form a tree structure similar to the component tree.

            ❕How Does This Work?
                [1] Each Component or Directive Gets Its Own Element Injector
                    When Angular creates a component instance, it implicitly creates an Element Injector for the component.
                    
                    This injector is responsible for providing services specific to that component or directive.

                [2] Service Resolution in the Injector Hierarchy
                    If a service is not found in a component’s Element Injector, Angular will look up the hierarchy and search through the parent components' injectors.

                    The search continues until Angular reaches the Root Injector.

                    If no service is found at any level, Angular throws  NullInjectorError.

            ❕Important
                You can provide the service in the element injector via providers array.
                    @Component({
                        providers: [MyService],
                    })

                The service provided by Element Injector
                    One shared instance of the service for the component and its children.
                    Once the component/directive is destroyed, the associated service instance will also be destroyed.

        [2] RootInjector
            The root injector is created when the application starts.
            Service is SINGLETON and will be shared across the application.
            Service can be provided in 2 ways
                [1] @Injectable({ providedIn: 'root' }) (Most Common Way)
                    ❕Tree-shakable (Angular removes the service if not used).

                [2] main.ts
                    bootstrapApplication(AppComponent, {
                        providers: [Service],
                    }).catch((err) => console.error(err));
                    ❌ Not tree-shakable

                [..] If you are using Module-Based, You can provide the service or the token at AppModule's providers array
                    @NgModule({
                        providers: [
                            { provide: tasksServiceToken, useClass: TasksService,}, ❕Token-based
                            LoggingService ❕Class-based
                        ],
                    })


        [3] ModuleInjector
            ❕Eagerly Loaded Modules
                When a service is provided in the providers[] array of a feature module, Angular merges it with the root injector.
                This means all modules in the application share the same instance of the service.

            ❕Lazy Loaded Modules 
                If a module is lazy-loaded, Angular does not merge its providers into the root injector.
                Instead, it creates a new instance of any service provided in providers[].


        [4] PlatformInjector
            @Injectable({
                providedIn: 'platform'
                ❕Service is SINGLETON and will be shared across multiple applications running on the same Angular project.
            })

            ❕In main.ts you can bootstrap multiple Angular applications
                bootstrapApplication(AppComponent);
                bootstrapApplication(AnotherAppComponent);

                Both AppComponent and AnotherAppComponent will share the same instance of the service.


    🗒️ Creating a Custom Injection Token
        The InjectionToken is used as a key to inject a service manually instead of relying on Angular's default class-based DI (By default, Angular uses class types as tokens).
        
        Example
            [1] Create an object of InjectionToken class
                export const tasksServiceToken = new InjectionToken<TasksService>("tasks-service-token")
                    The token (tasksServiceToken) acts as an identifier for the TasksService.
                    "tasks-service-token" is just a debugging aid.


                    
            [2] Providing the Service Using the Root Injector
                At main.ts:
                    bootstrapApplication(AppComponent, {
                        providers: [
                            {
                                provide: tasksServiceToken,
                                useClass: TasksService, 
                                    ❕“When someone requests tasksServiceToken, create and return an instance of TasksService.”
                            },
                        ],
                    })

                Angular, by default, would have done this for us behind the scenes with class-based DI.
                    bootstrapApplication(AppComponent, { providers: [TasksService] }
    
                Now, any component that needs TasksService must request the token instead of the class.
                    [1] Using inject()
                        private _tasksService = inject(tasksServiceToken);

                    [2] Using constructor
                        constructor(@Inject(tasksServiceToken) private _tasksService: TasksService) {}

        Example (Non-Service Values)
            [1] Injection Token
                export const TASK_STATUS_OPTIONS = new InjectionToken<TaskStatusOptions[]>('task-status-options');
                    TASK_STATUS_OPTIONS → Acts as the identifier for TaskStatusOptions array.
                    "task-status-options" → Used for debugging.

            [2] The Value to provide and inject
                export const taskStatusOptions: TaskStatusOptions[] = [
                    {
                        value: 'open',
                        taskStatus: 'OPEN',
                        text: 'Open'
                    },
                    {
                        value: 'in-progress',
                        taskStatus: 'IN_PROGRESS',
                        text: 'In-Progress',
                    },
                    {
                        value: 'done',
                        taskStatus: 'DONE',
                        text: 'completed',
                    },
                ];

            [3] The Provider
                Since this is not a service, we use useValue instead of useClass
                export const taskStatusOptionsProvider: Provider = {
                    provide: TASK_STATUS_OPTIONS,
                    useValue: taskStatusOptions,
                    ❕"When someone requests TASK_STATUS_OPTIONS, return taskStatusOptions."
                };

            [4] Providing the token via Element Injector (Component Level)
                @Component({
                    providers: [taskStatusOptionsProvider],
                    ...
                })
                The token is only available in this component and its child components.

            [5] Injecting the token
                taskStatusOptions = inject(TASK_STATUS_OPTIONS);


    🗒️ Notes
        when you inject one service into another, the injected service must be provided by the root injector. This is because services don’t have their own element injector like components/directives. 
    
*/

// * RXJS
/*
    RxJs: is a library that makes it easier to apply "reactive programming" concepts using Observables.
    Observable: is an object that produces and controls a stream of data.
    RXJS observables emit values over time, you can set a subscriptions to handle them.
    Observables implement the observer design pattern.

    In the Angular, Observables are used by multiple services to get notified:
        1. Whenever the URL changes in the browser
            ActivatedRoute Service -> paramMap (Observable)

        2. When a form input value gets updated
            FormControl -> valueChanges (Observable)

        3. When a HTTP request completes successfully
            HTTPClient Service -> (get/post/patch/put/delete) return observable

    🗒️How to get data from an Observable?
        This is how we subscribe to an observable:
            observable.subscribe({
                next: (val) => {
                    Will be called every time the observable emits a new value.
                    The new value will be passed as a parameter to the next method.
                }
                error: (err) => {
                    Will be called when the observable encounters an error.
                    It will stop emitting after this.
                }
                complete: () => {
                    Will be called once the observable completes (no more values will be emitted, and no error occurred)
                    If an error occurs, the complete() won't be called.
                } 
            });


    🗒️RXJS Operators
        Transform, filter, manipulate emitted values of an Observable before they reach the subscriber.

        [1] of()
            Creates an observable from a sequence of values.
            It emits the values one by one synchronously, then completes.

            Example:
                source$ = of(1, 2, 3);

        [2] from()
            Creates an observable from an iterable object.
            It iterates over the iterable and emits each value one by one.

            Example:
                source$ = from([1, 2, 3]);

        [3] map()
            Transforms each emitted value before it reaches the subscriber.

            Example:
                source$ = of(1, 2, 3);
                mapped$ = source$.pipe(map(value => value * 2));

        [4] filter()
            Transforms each emitted value based on a condition before it reaches the subscriber.

            Example:
                source$ = of(1, 2, 3);
                filtered$ = source$.pipe(filter(value => value % 2 === 0));

        [5] tap()
            Executes a side effect (like logging) for each emitted value without modifying it.
            It has its own obj
            {
                next: (value) => {
                    Executes when the Observable emits a value.
                },
                error: (error) => {
                    Executes when an error occurs.
                    Once an error occurs in an observable
                        1. The stream immediately stops.
                        2. No more values will be emitted from the original observable 

                },
                complete: () => {
                    Executes ONLY when an Observable has finished emitting ALL its values.
                    Won't execute if an error occurs.
                }
            }
                

        [6] switchMap()
            Switches from outer stream to inner stream whenever the outer stream emits a value.
            The emitted value from the outer stream is passed to the inner stream.
            Automatically unsubscribes from the previous inner stream before subscribing to the new one.
                If the inner stream takes time (HttpRequest) and the outer stream emits a new value before the inner stream completes,
                the previous inner stream will be unsubscribed and a new one will be subscribed to.

            Example:
                details$ = router.paramMap.pipe(
                    switchMap(params => {
                        return this._detailsService.getData(params.get('id'));
                    })
                )

        [7] concatMap()
            Maps each value emitted by the source Observable to an inner Observable
            Subscribes to these inner Observables one at a time in sequence
            Waits for each inner Observable to complete before moving to the next one
            Maintains the original order of emissions


        [8] mergeMap()
            Maps each value emitted by the source Observable to an inner Observable and process them CONCURRENTLY
            Subscribes to inner Observables as soon as the outer Observable emits a value
            Doesn't wait for each inner Observable to complete before moving to the next one
            Faster but doesn't maintain the order.

        [9] combineLatest()
            Takes two or more Observables.
            Emits an array (or projection) of the latest values from each observable.
            Waits for all observables to emit at least once before it starts emitting.

                    
        [10] interval()
            Creates an Observable that emits sequential numbers every specified interval of time
            interval() emits values forever, so complete() is never called.
            Example
                timer$ = interval(1000)

        [11] catchError()
            Catches errors thrown by an observable and allows you to handle them.
            Must return an observable. If not, stream will break.
            You can handle this by
                1. Suppress Error Using of(fallbackValue)
                    The observable does not throw an error to the subscriber.
                    It emits the fallback value, then it completes

                2. Silently Ignore the Error Using EMPTY
                    The observable completes immediately. no value is emitted, and no error is thrown to the subscriber.

                3. Re-throw the Error using throwError(() => error)
                    The error is not suppressed.
                    It allows the subscriber to handle it.
                    
                    throwError()
                        -> Creates an observable that immediately throws an error
                        -> In RxJS 7+, requires a function: throwError(() => error)

        [12] debounceTime()
            Waits for a specified number of milliseconds after the last emitted value before emitting the latest value.
            If a new value comes in before the timeout, the timer resets.


            this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(value => {
                Makes sure 300ms have been passed before emitting the next value
                If the value emitted before 300ms, it will be ignored, and timer will be reset. 
            });


        [13] takeUntilDestroyed()
            RxJS operator introduced in Angular 16+ that provides a clean and automatic way to unsubscribe from observables when a component, directive, or service is destroyed.

            It takes DestroyRef Token as parameter which reference the component/directive/service that has been injected into.

            Imported from: '@angular/core/rxjs-interop'

            Automatically completes the observable on destruction (like takeUntil(this.destroy$) but cleaner)

            Must be used in Angular's injection context if not explicitly passed a DestroyRef

            Example (Injection Context)
                @Component({...})
                export class ExampleComponent {
                    constructor() {
                        interval(1000)
                        .pipe(takeUntilDestroyed()) // implicitly uses DestroyRef here
                        .subscribe();
                    }
                }

            Example (Lifecycle Hook)
                @Component({...})
                export class ExampleComponent implements OnInit {
                    private destroyRef = inject(DestroyRef); // must inject explicitly

                    ngOnInit() {
                        interval(1000)
                        .pipe(takeUntilDestroyed(this.destroyRef)) // explicitly pass DestroyRef
                        .subscribe();
                    }
                }

    🗒️Unsubscribing from an observable
        Unsubscribing from observables is crucial to prevent memory leaks.
        [1] Manual Unsubscription
            @Component({...})
            export class ExampleComponent implements OnInit, OnDestroy {
                private subscription!: Subscription;

                ngOnInit() {
                    this.subscription = interval(1000).subscribe();
                }

                ngOnDestroy() {
                    this.subscription.unsubscribe();
                }
            }
                
        [2] DestroyRef
            @Component({...})
            export class ExampleComponent implements OnInit {
                private _destroyRef = inject(DestroyRef)

                ngOnInit() {
                    const subscription = interval(1000).subscribe();

                    this.destroyRef.onDestroy(() => subscription.unsubscribe());
                }
            }

        [3] takeUntil()
            @Component({...})
            export class ExampleComponent implements OnInit, OnDestroy {
                private destroy$ = new Subject<void>();

                ngOnInit() {
                    interval(1000)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe();
                }

                ngOnDestroy() {
                    this.destroy$.next();
                    this.destroy$.complete();
                }
            }

        [4] takeUntilDestroyed()
            @Component({...})
            export class ExampleComponent {
                private destroyRef = inject(DestroyRef); // Automatically tracks component destruction

                constructor() {
                    interval(1000)
                    .pipe(takeUntilDestroyed(this.destroyRef))
                    .subscribe();
                }
            }


    🗒️Observables VS Signals
        ❕Observables
            1. Represent a stream of values over time
            2. Require subscription management (must unsubscribe to prevent memory leaks)
            3. Ideal for asynchronous operations (e.g., HTTP, user input, timers)
            4. Support complex data flows using powerful RxJS operators (map, filter, switchMap, etc.)

        ❕Signals
            1. Represent a single reactive value that can change over time
            2. Don't require subscription/unsubscription
            3. Designed for fine-grained, synchronous reactivity (ideal for UI state)
            4. Integrated with Angular's reactivity system (template updates, computed signals, effects)

        Converting:
            toObservable(signal)
                To convert Signal to Observable
                Must be called in an injection context.
                Whenever the signal value changes, the observable will emit the new value.

            toSignal(observable$) 
                To convert Observable to Signal
                Must be called in an injection context.
                Whenever the observable emits new value, the signal will be updated.
                Unlike observable (Doesn't necessary have initial value), signal has initial value, you can set it by passing an options object to toSignal()
                    toSignal(observable$, { initialValue: 0 }) 


    🗒️ Creating custom observable
        The constructor for the Observable class takes a function as a parameter, this function takes an observer object as a parameter, which has three methods:
            next(): returns the next value to all subscribers.
            complete(): is called when all data has been sent to subscribers
            error() when an error occurs


    🗒️RXJS Subject
        Is a special type of Observable that allows values to be sent to many subscribers
        A subject can emit data, on top of having the capability to be subscribed to

        Example
            Send data to all subscribers
                subject.next(data);

            Expose the subject as an Observable and
                subject.asObservable().subscribe(newValue => {
                    this.currentValue = newValue;
                });

        There are several kinds of subjects:
            1. Subject: Emits next value to current subscribers.
            2. BehaviorSubject: Emits latest value to current and future subscribers.
            3. ReplaySubject: Emits one-or-more previous values to future subscribers.
            4. AsyncSubject: will only emit the last value upon completion of the Observable.


        ❕More on Behavior Subject
            Special type of Observable used to manage state and share data across different parts of the application.


            -> Stores the Current Value [State Management]: It keeps the last emitted value in memory and emits it immediately to any new subscribers.
            -> Requires an Initial Value: Needs an initial value upon creation.
            -> Multiple Subscribers: Multiple components can subscribe to it and get the latest value.
            -> Next Method: You can emit a new value using the .next() method

            Syntax:
                [1] Creating a behavior subject
                    const behaviorSubject = new BehaviorSubject<T>(initialValue);

                [2] Emitting a new value
                    behaviorSubject.next(newValue);

                [3] Subscribing to the behavior subject
                    const subscriber = behaviorSubject.subscribe((value) => {
                        Do something with the value
                    })
                    
            Note:
                Every time you emit a new value using .next(), it will notify all active subscribers (.subscribe() callbacks will be triggered).
            
*/

// * Promise VS Observable
/*
    Observable
        Handling Events
            -> Can Emit 0, 1, or multiple values over time.

        Cancellable
            -> Yes, can be unsubscribed

        Lazy Execution
            -> Lazy: Starts only when subscribed.

        Chaining & Operators
            -> Provides many powerful operators like map, filter, retry, replay

        Package
            -> ReactiveX (RXJS)

    Promise
        Handling Events
            -> Emits(Resolves) only 1 value.

        Cancellable
            ->  No, once started, it always completes (resolve/reject).

        Lazy Execution
            -> Eager: Starts immediately.

        Chaining & Operators
            -> Supports then(), catch(), and finally()

        Package
            -> Built in JS
        
*/

// * HttpClient
/*
    Service for making HTTP request, provides useful methods to interact with backend APIs like:
        get<T>(), post<T>(), put<T>(), patch<T>(), delete<T>()
        
    All returns an Observable.
    All take an optional second or third parameter called options:
        {
            headers,
            observe: 'body' | 'response' | 'events' -> Specify the part of the response to return,
            ...
        }
    The returned observable emits exactly ONCE.

    
    🗒️Providing HTTPClient Service
        ❕StandAlone Component
            At main.ts
            bootstrapApplication(AppComponent, {
                providers: [provideHttpClient()],
            })

            In modern Angular versions bootstrapApplication(AppComponent, appConfig) will take appConfig:ApplicationConfig as a second parameter, this appConfig is exported from app.config.ts file.

            ❕By default HttpClient uses XMLHttpRequest API to make request.
            ❕Passing withFetch() to provideHttpClient(withFetch()) switches the client to use fetch API instead.
            ❕It's strongly recommended to enable fetch for applications that use Server-Side Rendering for better performance and compatibility.
            
        ❕Module-Based
            @NgModule({
                providers: [provideHttpClient()],
                ...
            })
            export class AppModule {}


*/

// * Decorators Overview
/*
    Decorator
        -> Special function used to provide class, property, method or parameter with metadata.

    Types Of Decorator
        Class Decorators
            [1] @Component
            [2] @Directive
            [3] @Pipe
            [4] @Injectable
            [5] @NgModule()

        Property Decorator
            [1] @Input
            [2] @Output
            [3] @HostBinding [To Search]
            [4] @ViewChild
            [5] @ViewChildren
            [6] @ContentChild
            [7] @ContentChildren

        Method Decorator
            [1] @HostListener

        Parameter Decorator
            [1] @Inject
            [2] @Self
            [3] @SkipSelf
            [4] @Optional
*/

// * Directives
/*
    Enhancements for elements (Native HTML element | Component)
    Unlike components, directives have no template.

    Types Of Directives
        [1] Component Directives
            Component is special directive with a template.

        [2] Structural Directives (*)
            ❕Directives that modifies the structure of the DOM (adding or removing elements).
                -> *ngIf, *ngFor, *ngSwitch
            ❕Not commonly used after control flow (@If, @For, @Switch) 

        [3] Attribute Directives
            ❕Directives that enhances the appearance or the behavior of an HTML native element or component.
                [ngStyle]="{
                    'CSS property': 'value',
                }"
                [ngClass]="{
                    'className': condition,
                }"
                [NgModel] => Two way data binding

            ❕Not commonly used after class binding & style binding

        🗒️Custom Attribute Directive
            @Directive({
                selector: 'a[appSafeLink]',
                    ❕Angular will look at an anchor tag with an attribute "appSafeLink"

                standalone: true,

                host: {
                    ❕The element where the directive is used (The anchor that has appSafeLink attribute)
                    ❕The host (a[appSafeLink]) can be enhanced by:
                        1. Attaching an event listener
                            "(click)": "onClick($event)",

                        2. Adding classes
                            "class": "active",
                },
            })

            export class SafeLinkDirective {
                hostElement = inject(ElementRef);
            }

            🗒️NOTES
                ❕Use ngAfterViewInit hook to ensure your directive's logic runs after the DOM is fully ready.
                    This makes sure that any DOM manipulations or changes you want to make to the element happen after it has been rendered by Angular.

                ❕If your directive’s logic doesn’t require waiting for the view initialization, you could skip ngAfterViewInit hook and use ngOnInit hook or even the constructor.


        🗒️Passing data from component to directive? 
            @Directive({
                selector: 'a[appSafeLink]',
            })
            export class SafeLinkDirective {
                queryParam = input<string>('myapp', { alias: 'appSafeLink' });
                ❕We provide (an alias name OR naming the input property) exactly like the directive attribute name, So we can pass the input value directly via the directive instead of binding on the input
            }

            <a appSafeLink="docs" href="https://angular.dev">Angular Documentation</a>

            ❕If the input property has a different name of the the directive attribute name
                queryParam = input<string>('');
                <a appSafeLink queryParam="docs" href="https://angular.dev">Angular Documentation</a>

        

    🗒️Custom Structural Directive
        @Directive({
            selector: '[appAuth]',
            standalone: true,
        })

        export class AuthDirective {
        
            [1] Inject TemplateRef Service
                templateRef = inject(TemplateRef);
                    ❕To access <ng-template> content.
                        <ng-template appAuth="admin">
                            <p> Content </p>
                            ‼️We know that <ng-template /> won't be rendered automatically.
                        </ng-template>
                        
                        Equivalent shorthand
                            <p *appAuth="'admin'">
                                Content
                                ‼️(*) is syntactic sugar for <ng-template />
                            </p>
                        
            [2] Inject ViewContainerRef Service
                viewContainerRef = inject(ViewContainerRef);
                    ❕It provides a methods to manipulate the DOM dynamically
                        1. createEmbeddedView()
                            Allows you to create and insert a view from an ng-template.
                            It takes a TemplateRef and renders its content inside the component dynamically.

                        2. clear()
                            Remove all embedded views from the container.
        }

    🗒️ Host Directives
        @Component({
            hostDirectives: [
                AuthDirective,
                {
                    directive: LogDirective,
                    inputs: ["input:AliasName", "anotherInputWithoutAlias"],
                    outputs: [],
                }
            ],
            ...
        })

*/

// * Renderer2 VS ElementRef
/*
    Renderer2
        Safe, Angular-recommended approach for DOM manipulation.
        Provides an abstraction over direct DOM access, which helps in maintaining cross-platform compatibility (e.g., Server-side rendering, Web Workers).
        More secure as Angular can handle sanitization and prevent XSS attacks.
        Useful for dynamically adding/removing elements, classes, attributes, and styles.

     ElementRef
        Directly accesses the native DOM element.
        Not recommended as it can lead to security vulnerabilities (e.g., XSS attacks).
        Tightly coupled with browser APIs, making it non-portable for server-side rendering.
        Should only be used when absolutely necessary.

    ? One Problem with Renderer2
        Renderer2: can't be directly injected into a service because it depends on the view context of a component or directive.

        ? What if we have to use Renderer2 in a service (Running Renderer2 in the service constructor)?
            We need to use the RendererFactory2 service to create a Renderer2 instance.
            RendererFactory2:
                -> Is independent of any component or view context, making it injectable in a service.
                -> It provides a method to create a Renderer2 instance: createRenderer
                -> By passing null as arguments to createRenderer, you create a global Renderer2 instance that is not tied to any specific component or template.
                    First null: No specific element is targeted.
                    Second null: No specific data or style encapsulation is needed.

                Example:
                    constructor(private rendererFactory: RendererFactory2) {
                        Create an instance of Renderer2
                            this.renderer = this.rendererFactory.createRenderer(null, null);
                    }
            

*/

// * View Encapsulation
/*
    Every component has a view encapsulation setting that determines how styles are applied and scoped.
    @Component({
        encapsulation:
            ViewEncapsulation.Emulated
            ViewEncapsulation.None
            ViewEncapsulation.ShadowDom

        ...
    })

    [1] ViewEncapsulation.Emulated
        (Default) Scoped styles using attribute selectors

        ❕How does Angular scope the styles?
            [1] Generates a unique attribute for each component instance.
                <app-home _nghost-ng-c2378992897> </app-home>

            [2] Adds that attribute to elements inside the component's template.
                <p _ngcontent-ng-c2378992897> Content </p>

            [3] Modifies CSS selectors to apply styles only inside this component.
                p[_ngcontent-ng-c2378992897] {
                    color: #09c;
                }

            🗒️Notes
                1. The styles are only applied inside the component and don’t leak to other components.
                2. Global styles may still affect elements inside a component.


    [2] ViewEncapsulation.None
        Styles are applied globally (no isolation, all components can be affected by this component's styles).
            p {
                color: #09c;
            }
            The style affects all <p> elements across the application.

    [3] ViewEncapsulation.ShadowDom
        Uses the native Shadow DOM API for real style isolation.
        Styles do not leak in (Global style has no effect) or out of the component.

*/

// * Host Element
/*
    ❕Every Angular component has a host element.
    ❕The elements targeted by the component selector DOESN'T act as a placeholders, they will be rendered into the real DOM.
        A component with the selector "app-home" targets <app-home /> element an angular template and will be rendered into the real DOM as <app-home> </app-home>

    🗒️How the Host Element Appears in the DOM?
        Depends on the View Encapsulation mode:
                1. Incase of ViewEncapsulation.Emulated (Default)
                    <app-home _nghost-ng-c2378992897> </app-home> ‼️Angular adds a unique _nghost attribute for style scoping

                2. Incase of ViewEncapsulation.None or ViewEncapsulation.ShadowDom
                    <app-home> </app-home> ‼️ No special attributes are added.

    🗒️Styling the Host Element
        Can target the host element using :host.
        :host {
            CSS styles
        }

        ✅ This works only with ViewEncapsulation.Emulated.
        ❌ It won’t work with ViewEncapsulation.None or ViewEncapsulation.ShadowDom.
            cause the host element won't have this special attribute (_nghost) in the DOM.


    🗒️Setting configuration for the host element (Angular Recommendation)
        @Component({
            host: {
                class: 'active',
                '(click)': 'onClick($event)',
            }
            
            ...
        })

        (host): Allows you to bind attributes, classes, and styles directly to the host element of a component.
        This ensures whenever <app-home> is used, it will automatically have the active class.

    🗒️HostBinding Decorator
        export class HomeComponent {
            ❕Static Binding
                @HostBinding('class') className = "active";
                    ‼️Actually Angular understands that className refers to class, so it will add the class "active" to the element classList, So in this case no need to explicitly pass hostPropertyName to HostBinding decorator.

            ❕Dynamic Binding
                @HostBinding('class.active') isActive = true;
                    ‼️This will add the active class to the host element classList if isActive is true.

        }

    🗒️HostListener Decorator
        Method decorator listens for DOM events on the host element
        When the event occurs, the decorated method is executed.

        @HostListener('eventName', ['$event'])
        handler(event: Event) {
            // LOGIC
        }

        ❕Listening For Global Events related to window OR document like (keyboardEvents, scroll)
            @HostListener('window:scroll', ['$event'])
            handler(event: Event) {
                // LOGIC
            }
            @HostListener('document:keyup', ['$event'])
            handler(event: Event) {
                // LOGIC
            }

    🗒️Accessing The Host Element Programmatically
        Angular provides ElementRef service to access the host element.
        hostElement = inject(ElementRef);

        
*/

// * Forms

// 🗒️Template-driven form
/*
    Is a way to handle form inputs using directives in the template (HTML) rather than in the component class. 

    We need to import FormsModule so we can have access on
        directives like ngModel, ngForm
        

    🗒️We you import FormsModule
        Angular automatically applies the NgForm directive to the form element in the template
            @Directive({
                selector: 'form:not([ngNoForm])', // important!
                ...
            })
            export class NgForm implements Form {
                ...
            }

        ❕what does NgForm do?
            1. It creates a top-level form group behind the scenes.
            2. It registers all ngModel inputs inside the form.
            3. It gives you access to properties like:
                form.valid
                form.value
                form.controls

            4. It lets you use template reference to reference the ngForm directive instance that angular created:
                <form #myForm="ngForm">
                    #myForm now refers to the Angular NgForm directive instance NOT the raw HTML element.

        ❕If you don't want Angular to process the form
            <form ngNoForm>
                this form is not managed by Angular
            </form>



    🗒️When you use ngModel in a template-driven form, Angular automatically:
        1. Registers the control with the parent form (ngForm)
        2. Creates a FormControl instance behind the scenes
        3. Starts tracking changes, validation, and state

        ❕If ngModel is used within a form tag, either the name attribute must be set or the form control must be defined as 'standalone' in ngModelOptions.
            <input ngModel id="email" type="email" />
            <input
                ngModel
                id="email"
                type="email"
                [ngModelOptions]="{ standalone: true }"
            />


    🗒️Validation
        When using the Forms Module, Angular provides you with directives like:
        (required, minlength, maxlength, min, max, pattern, email).

        Angular overrides the browser's default validation behavior, including built-in attributes like required.

        These directives do not prevent form submission by themselves.

        To track validation state, we use a template reference variable like #ref="ngModel":
            This tells Angular not to access the native DOM element, but instead the NgModel instance that Angular creates behind the scenes.

        When using template-driven from with ngModel, Angular adds some useful classes to the inputs:
            (ng-pristine - ng-dirty)
            (ng-invalid - ng-valid)
            (ng-untouched - ng-touched)

        ❕Form & Form Control States
            pristine: The input has never been changed (no user interaction).
            dirty: The input has been changed by the user.

            untouched: The input has not lost focus yet (no blur event).	
            touched: The input has been focused and then blurred (lost focus).

            valid: The input is valid based on validation rules.
            invalid: The input is invalid (fails validation).

    🗒️Updating the form data programmatically
        afterNextRender(() => {
            const savedLoginForm = localStorage.getItem('saved-login-form');
            if (savedLoginForm) {
                const timeOut = setTimeout(() =>
                this.form().form.patchValue(JSON.parse(savedLoginForm))
                );

                this._destroyRef.onDestroy(() => clearTimeout(timeOut));
            }
        });

        afterNextRender(): defers the execution of the function until the DOM is rendered in browser.

        Even with using afterNextRender, the form object might not be fully initialized immediately at that point.

        setTimeout() gives Angular time to finish initializing the form controls.




*/

// 🗒️Reactive Form
/*
    Provides a robust and scalable way to manage form data.

    Implementation:
        Using FormGroup and FormControl.
            userForm = new FormGroup(
                ❕First Param -> Obj to configure the form controls
                {
                    name: new FormControl(initialValue, [Validator, ..., ...]),

                    password: new FormControl(initialValue, {
                        validators: [Validator, ..., ...]
                    })
                },

                ❕Second Param -> Obj to configure the global form validations
                { validators: [Custom Validation]}
            );

        Using FormBuilder Service
            private readonly _formBuilder: FormBuilder = inject(FormBuilder);
            FormGroup this._formBuilder.group({},{})
                -> First Param: Controls
                    name: this._formBuilder.control(initialValue, [Validators])
                    OR
                    name: [initialValue, [Validators,]]
                -> Second Param: Custom Validations
                    { validators: [custom validation] }
            Example
                registerForm: FormGroup = this._formBuilder.group({
                    name: this._formBuilder.control(null, [
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(20),
                    ]),

                    email: [null, [Validators.required, Validators.email]]
                });

        At Template:
            To be able to bind the formGroup & formControlName, import ReactiveFormsModule from '@angular/forms'

            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
                <input type="email" [formControl]="form.controls.email" />
                Or use formControlName
                <input type="password" formControlName="password" />
            </form>

        ❕Angular also added those special classes to the inputs using Reactive Forms:
            (ng-pristine - ng-dirty)
            (ng-invalid - ng-valid)
            (ng-untouched - ng-touched)


    🗒️Custom Validator Function
        A validator function must return either:
            null -> if the value is valid.
            obj like { 'errorKey': true } (ValidationErrors) -> if the value is invalid 

        mustContainSpecialChar(control: AbstractControl): ValidationErrors | null {
            return BooleanExpression
            ? null (Valid)
            : {descriptiveErrorKey: true}  (Invalid)
        }

        password: new FormControl(initialValue, {
            validators: [mustContainSpecialChar]
        })

    🗒️Custom Async Validator Function
        An async validator object returns Observable<ValidationErrors | null>

        export function emailIsUnique(control: AbstractControl) {
            return BooleanExpression 
            ? of(null)
            : of({ notUniqueEmail: true })
        }

        email: new FormControl(initialValue, {
            asyncValidators: [emailIsUnique]
        })

    🗒️Factory Validator Function
        Is a function that returns a custom validator, often used to compare multiple form controls.
        Example
            function equalValues(ctrl1: string, ctrl2: string): ValidatorFn  {
                return (control: AbstractControl): ValidationErrors | null => {
                    const val1 = control.get(ctrl1)?.value;
                    const val2 = control.get(ctrl2)?.value;

                    return val1 === val2 ? null : { notEqual: true };
                };
            }

            signupForm = new FormGroup({
                email: new FormControl(''),
                passwords: new FormGroup(
                {
                    password: new FormControl(''),
                    confirmPassword: new FormControl(''),
                },
                {
                    validators: [equalValues('password', 'confirmPassword')],
                }
                )
            })
                
            FormGroup also has its config obj where you can set up custom validators.
            Angular generated classes will be added to HTML element that bound to this form group. 


    🗒️Nested Form Groups
        It's totally fine and often recommended to use nested FormGroups in Angular to organize complex forms.

        You MUST refer to it in the template using FormGroup/FromGroupName

        Example
            signupForm = new FormGroup({
                email: new FormControl(''),

                address: new FormGroup({
                    street: new FormControl(''),
                    number: new FormControl(''),
                    postalCode: new FormControl(''),
                    city: new FormControl(''),
                }),
            })
            
            <form [formGroup]="signupForm" 
                <input formControlName="email" />

                <fieldset formGroupName="address">
                    <legend>Your Address</legend>

                    <input formControlName="street" />
                    <input formControlName="number" />
                    <input formControlName="postalCode" />
                    <input formControlName="city" />
                </fieldset>
            </form>

    🗒️FormArray
        Is a way to manage a collection of form controls, such as a dynamic list of items like checkboxes, input fields, or groups of controls.
        
        Example
            signupForm = new FormGroup({
                source: new FormArray([
                    new FormControl(false),
                    new FormControl(false),
                    new FormControl(false),
                ]),
            })

            <form [formGroup]="signupForm" 
                <fieldset formArrayName="source">
                
                    <legend>How did you find us?</legend>

                    <input formControlName="0" type="checkbox" value="google"/>
                    <input formControlName="1" type="checkbox" value="friend"/>
                    <input formControlName="2" type="checkbox" value="other"/>

                </fieldset>
            </ form>

        Each checkbox is bound to a boolean value

*/

// * Pipes
/*
    Pipes are used to transform data in the template.
    You can chain pipes.
        {{ scheduledOn | date | uppercase }}

    🗒️Built-in Pipes
        -> DatePipe
            Example
                {{ currentDate | date : "medium" }}
                    
        -> DecimalPipe
            Format: {minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}
            Example:
                {{ value | number : "2.2-2" }}

            If the formatted value is truncated it will be rounded
                {{ value | number : "1.0-0" }}

    🗒️Custom Pipes
        -> Allows you to create your own pipes for custom transformations.
        @Pipe({
            name: 'customPipe'
            standalone: true, [Default]
            pure: true [Default]
        })
        export class CustomPipe implements PipeTransform {
            transform(value: any, ...args: any[]): any {
                return value;
            }
            ❕ Any pipe must have the transform method, that's why implementing PipeTransform interface is recommended.
        }

    🗒️Types of Pipes
        [1] Pure Pipes (Default)
            @Pipe({
                pure: true,
                ...
            })
                
        Triggered only when:
            A primitive value (string, number, boolean, etc.) changes.
            The reference of an object or array changes.


        [2] Impure Pipes
            @Pipe({
                pure: false,
                ...
            })

        Runs on every change detection cycle, that's why not recommended.


    🗒️Change detection with pipes
        By default, all pipes are considered pure.

        Pure pipes offer a performance advantage because Angular can avoid calling the transformation function if the passed value has not changed.

        This means that mutations to object properties or array items are not detected unless the entire object or array reference is replaced with a different instance.

        
*/

// * Interceptors
/*
    Service to inspect, modify, or handle HTTP requests and responses globally.
    Middleware between the client and the server.
    
    Use Cases:
        1. Authentication: Attach authorization headers (e.g., JWT tokens) to requests.
        2. Error Handling: Catch and process errors globally.
        3. Loading: Show and hide loaders based on request state.

    Example
        export const headersInterceptor: HttpInterceptorFn = (req, next) => {
            const tokenService = inject(TokenService);
            const request = req.clone({
                headers: req.headers.set("token", tokenService.token)
            })
            return next(req).pipe(
                tap((event) => {
                    if (event.type === HttpEventType.Response){
                        LOGIC
                    }
                })
            );
        };

    ❕Notes
        [1] We must provide the application with the interceptor.
            provideHttpClient(
                withFetch(),
                withInterceptors([headersInterceptor, errorsInterceptor]),
            )

        [2] We can't mutate the request directly, we need to clone it first.
            req.clone() creates a new request with the same properties as the original request, we can mutate the cloned request by passing an object with the properties to change.

        [3] next(req) passes the request to the next interceptor in the chain and returns an Observable of the response.

*/

// * Change Detection
/*
    Angular uses Zone.js to monkey-patch asynchronous APIs like setTimeout, Promise, addEventListener, and others, so it can detect when asynchronous operations start and finish. This allows Angular to know when to run change detection automatically.

    ❕What is Zone.js?
        Zone.js is a library that creates an execution context called a zone.
        It's essentially a wrapper around all async operations, allowing it to intercept and track when tasks are scheduled and completed.

    How does Angular use it?
        1. When Angular bootstraps the app, it runs the entire application inside a special zone created by Zone.js, called NgZone.
        It patches async APIs to notify Angular when an async operation starts and finishes.

        2. Zone.js patches common async APIs like:
            -> setTimeout, setInterval
            -> Promise.then
            -> addEventListener
            -> XMLHttpRequest, fetch
        This means it can intercept and track when these operations are scheduled and when they complete.

        3. Once an async operation completes, Zone.js notifies Angular that something might have changed.

        4. Angular responds by running change detection, which checks your app’s data for changes and updates the DOM if needed.


    Types of Change Detection Strategies:
        [1] Default Strategy (ChangeDetectionStrategy.Default)
            Angular runs change detection on every component in the component tree whenever an event occurs, even if a component is not directly affected.

            It checks all bindings (DataInterpolation, Property Binding, Event Binding, ...) for changes.
                1. It evaluates expressions inside the template.
                2. It compares previous and current values to see if anything has changed.
                3. If a value has changed, it updates the DOM.

            What Triggers Change Detection?
                Change detection does NOT run for arbitrary browser events.
                It only runs when Angular is aware of a change, such as:
                    1. User Interactions such as click, input,... (when there's an event listener)
                    2. Asynchronous Events
                        HTTP responses 
                        Timers (setTimeout(), setInterval())
                        Observables (when using async pipe or subscribe())

            If the component tree is large, this can lead to performance issues.

            ❕Best Practices to Optimize Change Detection:
                1. Avoid Expensive Operations in the Template
                    Calling a function inside the template causes repeated executions during change detection.

                2. Avoid Zone Pollution
                    Inject NgZone service and run the code outside Angular's zone using runOutsideAngular() method.
                        ngZone.runOutsideAngular(() => {
                            Code that doesn't need change detection
                        }

                3. Use OnPush Strategy 


        [2] OnPush Strategy (ChangeDetectionStrategy.OnPush)
            @Component({
                changeDetection: ChangeDetectionStrategy.OnPush,
                ...
            })

            Angular checks the component ONLY if:
                1. Input property reference changes (Angular performs a shallow reference check, not deep comparison)
                2. An event originates within the component (click, input, ...)
                3. An observable used in the template emits a new value (using async pipe)
                4. A signal used in the template changes.
                5. Manual change detection (markForCheck(), detectChanges())
                    First we need to inject ChangeDetectorRef service and use:
                        -> markForCheck() marks the component and its ancestors for change detection.
                        -> detectChanges() triggers change detection for the current component only.

            ❕This strategy improves performance by reducing unnecessary checks.
            ❕Changes inside this component can affect the parent — OnPush doesn't block propagation up the component tree.

    🗒️ Change detection with signals
        [1] If you use a signal inside the template, Angular automatically tracks it. So when the signal changes:
            Angular marks the component for check.
            Angular runs change detection for the component and its ancestors even if the component is using OnPush strategy.

        [2] If the signal is not used in the template,
            Angular doesn’t know about it, It won’t trigger change detection automatically



    🗒️ Change Detection during development mode
        Angular runs change detection twice in development mode to help catch errors and ensure that the UI is consistent. This is called "double change detection".

        If the UI is inconsistent after the second run, Angular will throw an error "ExpressionChangedAfterChecked" to help you identify the issue.

        In production mode, Angular runs change detection only once for performance reasons.


    🗒️ Going Zoneless
        [1] Migrating to Signals
            Signals are a new way to manage state and reactivity in Angular applications.

        [2] Remove Zone.js from the application bundle
            angular.json -> projects -> architect -> build -> options -> polyfills = [];
            
        [3] Remove Zone.js from the application startup
            main.ts
            bootstrapApplication(AppComponent, {
                providers: [provideExperimentalZonelessChangeDetection()],
            })
*/

// * Signals
/*
    A signal is a wrapper around a value that notifies interested consumers when that value changes. Signals can contain any value, from primitives to complex data structures.

    Applying Fine-grained reactivity
        is about precisely tracking what parts of your UI depend on what specific pieces of data — and only updating those parts when that data changes.

    🗒️ Types of Signals

        [1] Writable Signal
            A wrapper around a value that notifies consumers when that value changes.

            Creating a writable signal
                const count: WritableSignal<number> = signal(0); ❗MUST be given an initial value.

            Updating its value
                count.set(5);

            Updating based on previous value
                count.update(value => value + 1);

            Accessing its value
                count();

        [2] Computed Signal
            Tracks all signals that are accessed during the execution of its callback function.
            Whenever the value of any tracked signal changes, the computed signal will automatically re-execute its callback function to calculate its new value.

            ❕Creating a computed signal
                const count: WritableSignal<number> = signal(1);
                const doubleCount: Signal<number> = computed(() => count() * 2);

            ❕Whenever count changes, doubleCount will update automatically
                onClick(): void {
                    count.set(10);
                }
                This results in doubleCount updating to 20


        [3] Readonly Signal
            Is used to create an immutable version of a signal.

            ❕Creating a readonly signal
                test: Signal<number> = signal(10).asReadonly();
                
        

    🗒️Side Effects (effect() function)
        Is used to perform side effect that depend on signal state like:
            1. Making HTTP requests
            2. Updating local storage
            3. Logging
         
        ❕When Does effect() Run?
            Initially: It runs once immediately after it's created, establishing its dependencies.
            On Dependency Changes: It re-runs automatically whenever any of the signals (read inside its callback) change.

        ❕Example
            count = signal(1);
            constructor() {
                effect(() => {
                    localStorage.setItem('count', count());
                });
            }
            Notes:
                The effect() function will initially be called once to establish its dependencies.
                When the count signal changes, the effect() function will automatically re-run.

        ❕Cleaning Up
            It is executed as part of effect function to define what should happen before the effect code runs the next time:

            constructor() {
                effect((onCleanup) => {
                    const timer = setTimeout(() => {
                        LOGIC
                    }, 1000);

                    onCleanup(() => {
                        clearTimeout(timer);
                    });
                });
            }


    🗒️Misunderstanding
        price: number = 10; 
        quantity: number = 1; 
        totalPrice: number = this.price * this.quantity;

        changeQuantity(): void { 
            this.price = this.price + 10; 
        }

        Why when invoking changeQuantity() by async event like click the total price doesn't change?
            -> Async events (like button clicks) trigger change detection
            -> Angular checks component properties for changes
            -> If changes are found, Angular updates the DOM
            However, change detection doesn't automatically understand relationships between properties. It only compares current values with previous values for each property individually.
                Sees that price changed from 10 to 20 → updates the DOM
                Sees that quantity is still 1 → no update needed
                Sees that totalPrice is still 10 → no update needed

*/

// * DestroyRef
/*
    DestroyRef is a part of Angular's dependency injection system, allowing you to register cleanup tasks when an instance (such as a component, directive, or service) is destroyed.

    🛠️ Key Features
        1. Lets you set cleanup callbacks to run upon destruction.
        2. The scope of destruction depends on where DestroyRef is injected:
            In a Component or Directive → Cleanup occurs when the component/directive is destroyed.
            
            In a Service → Cleanup occurs when the injector that created the service is destroyed.
                If a service is provided globally (providedIn: 'root'), it gets destroyed when the whole Angular app is terminated (e.g., page reload, tab closed).

                If a service is provided in a component or module, it gets destroyed when that component or module is removed.

    ❕Example
        private destroyRef = inject(DestroyRef);
          ngOnInit(): void {
            const interval = setInterval(() => {
                // Logic
            }, 5000);

            this.destroyRef.onDestroy(() => clearInterval(interval));
                ‼️onDestroy() -> Returns a cleanup function that can be invoked to unregister the callback.
        }
*/
