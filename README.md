# ngx-heyl-snackbar

This package allows you to use a snackbar element in AngularX (2+) projects.
This package is designed to define the snackbar only on the `app.component` template and use a component to define all bodies you'll need.

## Installation

1. Install npm module : 

   `npm install --save ngx-heyl-snackbar

2. Import the module :

   Open your `app.module.ts` file and import the module like this :
   
   ```typescript
   import { SnackbarModule } from "ngx-heyl-snackbar";
   @NgModule({
      imports: [ 
         ...,
         SnackbarModule
      ]
   })
   ```
 
3. Use `<snackbar>` component and `SnackbarService` service :

   Open your `app.component.html` and use the component
   ```html
   <div>App component html here</div>
   <div>Another content in your app component</div>
   <snackbar></snackbar>
   ```
   And use the service to open the snackbar dialog and set the configuration / content. You can use it in
    a sharedService used all along your app :
   
   ```typescript
   import {SnackbarService, SnackbarConfig, SnackbarFade} from "ngx-heyl-snackbar";

   export var snackbarOneConfig: SnackbarConfig =  new SnackbarConfig().setFade(SnackbarFade.RIGHT).setSize("70%").setTitle("Snackbar One");
   export var snackbarTwoConfig: SnackbarConfig =  new SnackbarConfig().setFade(SnackbarFade.LEFT).setSize("50%").setTitle("Snackbar Two");

   @Injectable()
   export class SharedService {
   
      constructor(private snackbarService: SnackbarService) {}
             
      openSnackbarOne() {
           this.snackbarService.openSnackbar(this.snackbarOneConfig, SnackbarBodyOneComponent)
       }

      openSnackbarTwo() {
           this.snackbarService.openSnackbar(this.snackbarTwoConfig, SnackbarBodyTwoComponent)
       }

      openSnackbarThree() {
           this.snackbarService.openSnackbar(this.snackbarTwoConfig, "Some text on the third snackbar")
       }
   }
   ```
   
   Then, you'll have to declare your snackbar bodies components in the NgModule like this :
      ```typescript
      import { SnackbarModule } from "ngx-heyl-snackbar";
      @NgModule({
         imports: [ 
            ...,
            SnackbarModule
         ],
         declarations: [
            SnackbarBodyOneComponent,
            SnackbarBodyTwoComponent
         ],
         entryComponents: [
            SnackbarBodyOneComponent,
            SnackbarBodyTwoComponent
         ]
      })
      ```
      
4. Styling snackbar component

   If you want to change background colors and text-color, you can do it using scss !
   
   ```scss
   @import "../[ .... ]../node_modules/ngx-heyl-snackbar/lib/snackbar.mixin";
   // snackbarColor(header_background, background, text_color, [max-height = 120px]);
   @include snackbarColor(rgba(237, 84, 0, 0.57), rgba(43, 49, 53, 0.9), #fff);
   ```
