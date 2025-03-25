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
                    The client (browser) sends a request to the server.
                    The server responds with blank HTML (HTML page contains only <app-root/> element).
                    A large JavaScript bundle is sent along with the response.
                    The browser executes the JavaScript, which dynamically builds and renders the rest of the content.
                    The browser displays the fully-rendered HTML.

                    
                SSR (Server-side rendering)
                    The client sends a request to the server.
                    The server renders the HTML on the server-side.
                    The fully-rendered HTML is sent to the client.
                    The browser displays the fully-rendered HTML.

    Module
        Container for components, directives, pipes, and services.

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


        🗒️ Two-way Binding [()]
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

                ✅ Use Cases
                    1. else block for *ngIf directive
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
    Routing: Navigation between different components.
    Angular Router: Routes are defined in the app-routing.module.ts file.

    [1] Setting Configuring for Routes [app.routes.ts]
        Inside routes array (Array of Route (interface)), We define the routes of the application.
        Each route obj contains:
            [1] path: URL segment
            [2] component: Component to render when the URL matches the path
            [3] redirectTo: Redirects to another route.
            [4] pathMatch: Match the full URL or the prefix of the URL.
            [5] title: Title of the page
            [6] loadComponent: To apply lazy loading.


    [2] Where to render the component of the matching route?
        1. app.component.ts: 
            Importing RouterOutlet Directive.
            RouterOutlet: Directive acts as a placeholder where Angular will render the component of the matching route. 

        2. app.component.html:
            <router-outlet></router-outlet> (Directive)
            HERE right after the directive , Angular will render the component of the matching route.
        
    [3] Navigating
        [1] Using RouterLink Directive
            RouterLink: Allows to navigate to a specific route.
            Needs to be imported from @angular/router.
            Syntax: routerLink="path"
            Example:
                <a routerLink="home">
                    Home
                </a>

            RouterLinkActive: Adds a css class/classes when the routerLink is active (routerLink value matches the current URL).
            Needs to be imported from @angular/router.            
            Syntax: routerLinkActive="classOne classTwo"
            Example:
                <a routerLink="home" routerLinkActive="active" >
                    Home
                </a>

            RouterLinkActiveOptions: Interface used to configure the behavior of RouterLinkActive.
            Syntax: [routerLinkActiveOptions]="{exact: true}"
            Example:
                <a routerLink="home" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                    Home
                </a>

    * Relative Path VS Absolute Path
        [1] Relative Path
            Means: Current URL + path
            Better to use with child routes.

        [2] Absolute Path (/path)
            Means: Root of application + path
            Better to use with main navigation links.


    * provideRouter() (app.config.ts)
        Parameters:
            [1] Routes: The exported array of routes from the app.routes.ts file.
            [2] ...features:
                withInMemoryScrolling({
                    scrollPositionRestoration:
                        "disabled" -> Default
                        "enabled" -> Scroll to the top of the page when navigating via router links.
                        "top" -> Scroll to the top of the page when navigating via links OR browser back/forward.
                })

                withHashLocation()
                withViewTransition()

    * Dynamic Routing (Router Service)
        Router Service (@angular/router)
            To navigate (change routes) programmatically based on user actions, API responses, or other conditions.
            private readonly _router: Router = inject(Router);
            _router.navigate(["main/home", "id" ]) -> baseurl/main/home/XYZ

    * Sending Data Via Route:
        In app.routes the route is expecting data to be sent
            { path: 'details/:id', component: DetailsComponent }
                
        Via RouterLink Directive 
            <a [routerLink] = "['details', 'XYZ']">
                Details
            </a>

        Via Router Service
            private readonly _router:Router = inject(Router)
            _router.navigate(["details", "XYZ"])

    * Accessing Route Parameters (Router Service)
        private readonly _activatedRoute = inject(ActivatedRoute);
        id: string | null = null;
        ngOnInit() {
            this._paramMap.subscribe({
                next: (params) => this.id = params.get("id") 
            })
            OR
            this.id = this._activatedRoute.snapshot.paramMap.get('id'); 

            What is the difference between the 2 approaches?
                [1] Using the paramMap Observable
                    -> Listens for changes in the route parameters and updates the id property whenever the route changes.

                    -> Best for components that stay loaded while route parameters change.

                [2] Using snapshot.paramMap
                    -> Gets the route parameter only once when the component is initialized.

                    -> If the route parameter changes while the component remains loaded, the value does not update.

                    -> Best for cases where the component is destroyed and recreated for each navigation change.    
        }
 

*/

// * Lazy Loading
/*
    Technique to load resources only when they are needed.
    Can be applied on:
        [1] Module
        [2] Stand Alone Component
        [3] Specific part of a component (@defer)


    * Modules & Stand Alone Component
        Lazy loading is implemented using routes. Instead of importing a module or component eagerly, it is loaded dynamically when a user navigates to a specific route.

        Benefits:
            The application loads only the components required for the first render
                -> reduce the bundle size => (improve performance & reduce memory usage)

        Downsides:
            Every route navigation requires an additional network request to fetch the component.
                -> More http requests to the server => (may affect the performance for smaller apps)


        How to implement?
            export const routes: Routes = [
                {
                    path: 'home',
                    loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
                    title: 'home'
                }
            ];


    * Specific part of a component
        @defer
            The code for any components, directives, and pipes inside the @defer block is split into a separate JavaScript file and loaded only when necessary, results into a faster initial load.

        @defer Triggers:
        
            [1] Predefined Triggers (on + ACTION)

                    interaction
                        -> Triggers when the user interacts with specified element through (click or keydown) events.

                    hover
                        -> Triggers when the mouse hovers over specified area

                    viewport 
                        -> Triggers when specified content enters the viewport

                    !NOTE:
                        -> By default, @placeholder acts as the interaction element incase of (interaction & hover) or the intersection observed element incase of (viewport).

                        -> Placeholders used this way MUST have at least a single element.

                        -> You can specify a "template reference variable"(#ref), which is used as interaction element incase of (interaction & hover) or the intersection observed element incase of (viewport).

                    timer
                        -> Triggers after a specific duration

                    idle (Default)
                        -> Triggers when the browser is "idle" (It means not processing tasks, such as loading a page, running scripts, or handling user interactions).

                    immediate
                        -> Triggers immediately after non-deferred content has finished rendering


            [2] when + CONDITION


            !NOTE:
                -> @defer block does not revert back to the placeholder if the condition changes to a falsy value after becoming truthy.

                -> We can use more than one trigger separating them by semicolons (;)
                Example:
                    @defer (on hover ; on timer(60s) ; when truthyValue ) {
                        <app-recommendations>
                    }@placeholder {
                        <p>See more ...</p>
                    }
                    This means that <app-recommendations> will be shown when the user hovers over <p> See more... </p> OR
                    after 30 seconds OR when truthyValue is truthy.

        @placeholder
            -> By default, defer block doesn't render any content before they are triggered.
            
            -> @placeholder is an optional block that declares what content to show before the @defer block is triggered.

            -> Angular replaces placeholder content with the main content once loading is complete.

            -> You can use any content in the placeholder body including plain HTML, components, directives, and pipes.

            -> @placeholder(minimum 5s/5000ms): Accepts an optional parameter to specify the minimum amount of time that this placeholder should be shown after @defer is triggered.
                This minimum parameter is useful to prevent fast flickering of placeholder content in the case that the deferred dependencies are fetched quickly.

            -> @placeholder dependencies are eagerly loaded. 


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
                        alias: emailAddress ❗ To provide an alias for the property.
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
            email: InputSignal<string> = input.required<string>();
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

// * Services (@Injectable)
/* 
    What is a service ?
        -> Singleton object that is used to organize and share code across the application.

    Why using services?
        [1] Reusability
            -> Centralizing data and reusable logic

        [2] Separation of concern
            -> Moving logic into services, so components can focus on managing UI

        [3] Dependency Injection
            -> Can be injected as a dependencies into components and directives
        
        [4] Singleton Nature
            -> One instance of the service is shared across the application (Consistency)

    @Injectable({
        providedIn:
            'root' [RECOMMENDED]
                -> Service is SINGLETON and will be shared across the application.

            'any'
                -> Separate instances per lazy-loaded module.

            'platform'
                -> Service is SINGLETON and will be shared across multiple applications running on the same platform.

    })
        -> This is a decorator that marks a class as (available to be injected as a dependency).


    What is the difference between constructor injection & inject()?
        [1] Constructor Injection
                constructor(private someService: SomeService) {
                By default Angular DI System provides the required instances when the class is instantiated
            }

        [2] inject()
            -> Allows for dependency injection outside of the constructor.
            -> This function can be called within the class body but not inside a function.
                private readonly someService = inject(SomeService);
    
*/

// * Observables
/*
    RXJS Operators
        Transform, filter, manipulate emitted values of an Observable before they reach the subscriber.

        [1] of()
            Creates an observable from a sequence of values.
            It emits the values one by one synchronously, then completes.

            Example:
                const source$ = of(1, 2, 3);

        [2] from()
            Creates an observable from an iterable object.
            It iterates over the iterable and emits each value one by one.

            Example:
                const source$ = from([1, 2, 3]);

        [3] map()
            Transforms each emitted value before it reaches the subscriber.

            Example:
                const source$ = of(1, 2, 3);
                const mapped$ = source$.pipe(map(value => value * 2));

        [4] filter()
            Transforms each emitted value based on a condition before it reaches the subscriber.

            Example:
                const source$ = of(1, 2, 3);
                const filtered$ = source$.pipe(filter(value => value % 2 === 0));

        [5] tap()
            Executes a side effect (like logging) for each emitted value without modifying it.
            It has its own obj
            {
                next: (value) => {
                    Executes when the Observable emits a value.
                },
                error: (error) => {
                    Executes when an error occurs.
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
                this.details$ = router.paramMap.pipe(
                    switchMap(params => {
                        return this._detailsService.getData(params.get('id'));
                    })
                )    





    Behavior Subject
        Special type of Observable used to manage state and share data across different parts of the application.

        Key Features:
            [1] Stores the Current Value:
                It keeps the last emitted value in memory and emits it immediately to any new subscribers.
            [2] Requires an Initial Value:
                Needs an initial value upon creation.
            [3] Multiple Subscribers:
                Multiple components can subscribe to it and get the latest value.
            [4] Next Method:
                You can emit a new value using the .next() method

        Benefits:
            -> State management in Angular services.
            -> Sharing data between unrelated components.


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
        get<T>()
        post<T>()
        put<T>()
        delete<T>()
        All these methods returns Observable

    Setting up HttpClient
        [1] Create required service
        [2] Inject HttpClient service into the required service
            -> before, we MUST provide the application with HttpClient
                app.config.ts
                    appConfig: ApplicationConfig = {
                        providers: [
                            provideHttpClient(withFetch())

                            !NOTES
                                -> By default HttpClient uses XMLHttpRequest API to make request.
                                -> withFetch(): Switches the client to use fetch API instead (Modern).
                                -> It's strongly recommended to enable fetch for applications that use Server-Side Rendering for better performance and compatibility. 

                        ]
                    }

        [3] Create function into the required service to do API logic (get/post/put/delete), this function should return observable so it can be subscribed later.

    * Subscription
        subscribe({
            next: (value) => {
                Executes when the Observable emits a value.
            },
            error: (error) => {
                Executes when an error occurs.
            },
            complete: () => {
                Executes ONLY when an Observable has finished emitting ALL its values.
                Won't execute if an error occurs.
            }
        })
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
    Special markers in the DOM that allow you to extend HTML's functionality.

    Types Of Directives
        [1] Component Directives
            Component is special directive with a template.

        [2] Structural Directives
            Directives that modifies the structure of the DOM by adding or removing elements.
            -> *ngIf, *ngFor, *ngSwitch
            -> Not commonly used after flow control @If, @For, @Switch 

        [3] Attribute Directives
            Directives that changes the styles of an element
            ->
                [ngStyle]="{
                    'CSS property': 'value',
                }"
                [ngClass]="{
                    'className': condition,
                }"
                [NgModel] => Two way data binding

            -> Not commonly used after class binding & style binding

        [4] Custom Directive

            * Custom Attribute Directive
                @Directive({
                    selector: '[appCustom]',
                })

                export class CustomDirective {
                    constructor(private element: ElementRef) {}
                }

                !NOTES
                    -> Use ngAfterViewInit to ensure your directive's logic runs after the DOM is fully ready.
                    This makes sure that any DOM manipulations or changes you want to make to the element happen after it has been rendered by Angular.
                    -> If your directive’s logic doesn’t require waiting for the view initialization, you could skip ngAfterViewInit and use ngOnInit or even the constructor.

                    -> How @HostListener Works in a Directive ?
                        Angular attaches the event listener to the element where the directive is used
                        The directive doesn’t need to explicitly reference the host element, Angular does it behind the scenes.

                    -> How to pass data from component to directive? 
                        [1] Signal -> input<T>()
                        [2] @Input
                    
                Example:
                    Directive
                        export class HighlightDirective {
                            constructor(
                                private element: ElementRef,
                                private renderer: Renderer2,
                            ) {}

                            @Input()
                            onHover: string[] = [];

                            @HostListener('mouseenter')
                            onMouseEnter(): void {
                                this.onHover.forEach((className) => {
                                this.renderer.addClass(this.element.nativeElement, className);
                                });
                            }
                            @HostListener('mouseleave')
                            onMouseLeave(): void {
                                this.onHover.forEach((className) => {
                                this.renderer.removeClass(this.element.nativeElement, className);
                                });
                            }
                        }

                    Component Template
                        <p appHighlight [onHover]="['bg-slate-950', 'text-slate-50', 'rounded']">
                            Hover over me!
                        </p>

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

// * SSR & Global Objects
/*
    -> When using SSR
        Angular executes the components on (Node.js server environment) where the browser global objects like window, document, navigator, location are not defined.
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

            



*/

// * Reactive Form
/*
    Provides a robust and scalable way to manage form data, validation, and user interactions programmatically.

    Imports
        Import ReactiveFormsModule from "@angular/forms"

    Implementation:
        [1] Using FormGroup and FormControl.
            userForm = new FormGroup(
                {
                    name: new FormControl(initialValue, [Validators]),
                },
                { validators: [Custom Validation,]}
            );

        [2] Using FormBuilder Service
            private readonly _formBuilder: FormBuilder = inject(FormBuilder);
            FormGroup this._formBuilder.group({},{})
                -> First Param: Controls
                    name: this._formBuilder.control(initialValue, [Validators])
                    OR
                    name: [initialValue, [Validators,]]
                -> Second Param: Custom Validations
                    { validators: [custom validation,] }
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
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
                <input type="text" formControlName="name" />
                <input type="email" formControlName="email" />
            </form>
            
            * Why we use (ngSubmit) ?
                Angular recommendation to handle the form submission WITHOUT reloading the page.

    * What is the difference between touched & dirty?
        [1] Touched
            User focused on and then left the field regardless of whether the value was changed or not.

        [2] Dirty
            User changed the value of the field, regardless of focus.

*/

// * Guards
/*
    Guards are used to control navigation between routes.
    Types of Guards in Angular:
        [1] CanActivate
            Checks if a route can be accessed.
            Example: Authentication (allow access only if the user is logged in).

        [2] CanActivateChild
            Checks if child routes of a route can be accessed.
            Example: Restricting access to child routes based on user roles or permissions.

        [3] CanDeactivate
            Checks if it's safe to leave the current route.
            Example: Prevent losing unsaved changes when leaving a form.

        [4] CanMatch
            Checks if a route should be matched before the router activation.
            Example: Conditionally matching routes based on user roles or other criteria.

        * What is the difference between CanActivate & CanMAtch ?
            CanMatch 
                Evaluated before the router matches the route.
                If it returns false, the route is skipped during the matching process.

            canActivate
                Evaluated after the route is matched but before it's activated.
                If it returns false, the navigation is canceled, but the route was already considered a match.

*/

// * Pipes
/*
    Pipes are used to transform data in the template.
    Types of Pipes
        [1] Built-in Pipes
            -> uppercase, lowercase, titlecase, date, currency, percent, json, slice, async, decimal.

        [2] Custom Pipes
            -> Allows you to create your own pipes for custom transformations.

    Usage
        [1] Built-in Pipes
            <p>{{ title | slice: 0:5 }}</p>
                -> slice pipe takes 3 arguments:
                    1. title
                    2. start index
                    3. end index
                    # The first argument is always the value to be transformed.
            <p>{{ date | date: 'dd/MM/yyyy' }}</p>
            <p>{{ amount | currency: 'USD' }}</p>
            <p>{{ text | uppercase }}</p>

        [2] Custom Pipes
            @Pipe({
                name: 'customPipe'
            })
            export class CustomPipe implements PipeTransform {
                transform(value: any, ...args: any[]): any {
                    return value;
                }
            }

            <p>{{ text | customPipe }}</p>
*/

// * Interceptors
/*
    Service to inspect, modify, or handle HTTP requests and responses globally.
    Middleware between the client and the server.
    
    Use Cases:
        [1] Authentication
            Attach authorization headers (e.g., JWT tokens) to requests.

        [2] Error Handling
            Catch and process errors globally.

        [3] Loading
            Show and hide loaders based on request state.

    * Notes
        We must provide the application with the interceptor.
            provideHttpClient(
                withFetch(),
                withInterceptors([headersInterceptor, errorsInterceptor]),
            )

    Example:

        [1] Headers Interceptor
            export const headersInterceptor: HttpInterceptorFn = (req, next) => {
                if (localStorage.getItem('userToken')) {
                    req = req.clone({
                    setHeaders: {
                        token: localStorage.getItem('userToken') ?? '',
                    },
                    });
                }
                return next(req);
            };

            * Notes
                -> We can't modify the request directly, we need to clone it first. (Angular's HttpRequests are immutable)

                -> We use req.clone() creates a new request with the same properties as the original request, we can modify the cloned request by passing an object with the properties to change.

                -> next(req) passes the request to the next interceptor in the chain and returns an Observable of the response.
                
        [2] Errors Interceptor
            export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
                return next(req).pipe(
                    catchError((err) => {
                        ! Handle the error
                        return throwError(() => err);
                    }),
                );
            };

            * Notes
                pipe()
                    -> Allows us to chain multiple operators to the observable like catchError, filter, map

                catchError()
                    -> Catches errors and allows us to handle them.

                throwError()
                    -> Rethrows the error so the component using the HTTP request can also handle it if needed.
*/

// * Signals
/*
    Signal are trackable data container (object that can store any type of value).
    🗒️ The Problem That Signals Solve
        Change Detection Performance
            ❕ Change Detection is the mechanism that keeps the view (template) in sync with the component's data (state). In Angular, change detection is triggered on every asynchronous event, such as:
                1. Click events
                2. HTTP requests
                3. Timers (e.g., setTimeout)

            ❕ By default, Angular checks the entire component tree, starting from the root component (AppComponent) and traversing down to all child components, even if only one component's state has changed.

            ❕ During this process, Angular performs what's called "dirty checking"
                1. Angular checks every component in the component tree.
                2. For each component, it evaluates all bindings in the template, including:
                    - @Input() properties
                    - Property bindings like {{ propertyName }}
                    - Event bindings such as (click)="method()"
                    - Directive bindings like [ngClass], [style], etc.
                3. This involves comparing the current value of each property with its previous value. If a difference is found, Angular updates the view accordingly.

            
    🗒️ How Signals Solve This Problem
        ❕ Instead of checking the component tree, they create a direct relationship between your state and the parts of the UI that depend on that state.

        ❕By using signals, Angular knows exactly which parts of the template depend on a given state and updates only those parts, avoiding unnecessary checks.

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
            On Dependency Changes: It re-runs automatically whenever any of the signals (used inside its callback) change.

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
