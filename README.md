# LCNC Design Tool
## Demo:
Please check the demo [here](https://drive.google.com/file/d/17A8Mxu23htaJgEA6BTeN3ACFrGv3_Nvp/view?usp=sharing).
## Overview
LCNC Design Tool is a low-code / no-code platform tool used to build simple web pages using pre-defined widgets in the beginning as a POC and can be extended and continued later as a complete low-code / no-code platform to build full web or mobile apps.

Low-code / no-code tools help users create web pages using simple methods that don't require developer skills and knowledge of coding.
## How to run
- First, run `cd .\itworx\` or `cd .\landing-page\` depending on which one you'd like to run first.
- Then, run `npm install`
- Afterwards, make sure you have all the needed environment variables in the .env files. Check in [Used Techniques](#used-techniques) below for more details.
- Finally run  `npm run start:development` or `start:production`.
## System Design
- Easy and comfortable UI/UX.
- Easily Scalable project.
- Usage of Api link as environment variable instead of being hard coded.
- Fast Performance.
- Persitant state through use of local storage.
- Easily Maintained code. 

## Architecture & File Structure
│   App.css
│   App.jsx
│   index.css
│   index.jsx
│   
├───apis
│       globalapi.js
│       
├───components
│   ├───block
│   │       block-controller.js
│   │       block.jsx
│   │       
│   ├───blocks
│   │       general-code-block.jsx
│   │       
│   ├───code-block
│   │       code-block.jsx
│   │       
│   ├───color-picker
│   │       color-picker.jsx
│   │       ColorPickerTool.md
│   │       
│   ├───font-picker
│   │       font-picker.jsx
│   │       
│   ├───layers
│   │       layers-controller..js
│   │       layers.jsx
│   │       
│   ├───modal
│   │       modal.jsx
│   │       
│   ├───navbar
│   │       navbar.jsx
│   │       
│   ├───style-block
│   │       style-block-controller.js
│   │       style-block.jsx
│   │       upload-image-service.js
│   │       
│   ├───tabs
│   │       tabs.jsx
│   │       
│   ├───tree
│   │       tree.jsx
│   │       
│   └───tree-node
│           tree-node-controller.js
│           tree-node.jsx
│           
├───helper
│       BlocksList.js
│       blocksType.js
│       generate-css.js
│       generate-html.js
│       generate-id.js
│       InitialCSS.js
│       
├───pages
│   ├───landing
│   │   │   Landing.jsx
│   │   │   
│   │   ├───assets
│   │   │   ├───fonts
│   │   │   │       Khula-ExtraBold.ttf
│   │   │   │       Khula-Regular.ttf
│   │   │   │       Khula-SemiBold.ttf
│   │   │   │       
│   │   │   ├───img
│   │   │   │   │   contact-1.png
│   │   │   │   │   contact-2.png
│   │   │   │   │   contact-3.png
│   │   │   │   │   header-img.png
│   │   │   │   │   
│   │   │   │   ├───add
│   │   │   │   │       1.png
│   │   │   │   │       2.png
│   │   │   │   │       3.png
│   │   │   │   │       4.png
│   │   │   │   │       add2.png
│   │   │   │   │       
│   │   │   │   ├───clients
│   │   │   │   │       logo01.svg
│   │   │   │   │       logo02.svg
│   │   │   │   │       logo03.svg
│   │   │   │   │       logo04.svg
│   │   │   │   │       logo05.svg
│   │   │   │   │       logo06.svg
│   │   │   │   │       
│   │   │   │   └───projects
│   │   │   │           1.png
│   │   │   │           2.png
│   │   │   │           3.png
│   │   │   │           4.png
│   │   │   │           5.png
│   │   │   │           6.png
│   │   │   │           
│   │   │   └───svg
│   │   │       │   BurgerIcon.jsx
│   │   │       │   Checkmark.jsx
│   │   │       │   CloseIcon.jsx
│   │   │       │   Dots.jsx
│   │   │       │   Logo.jsx
│   │   │       │   Quotes.jsx
│   │   │       │   
│   │   │       └───Services
│   │   │               BrowserIcon.jsx
│   │   │               MonitorIcon.jsx
│   │   │               PrinterIcon.jsx
│   │   │               RollerIcon.jsx
│   │   │               
│   │   ├───components
│   │   │   ├───Buttons
│   │   │   │       FullButton.jsx
│   │   │   │       
│   │   │   ├───Elements
│   │   │   │       Backdrop.jsx
│   │   │   │       ClientSlider.jsx
│   │   │   │       ServiceBox.jsx
│   │   │   │       TestimonialBox.jsx
│   │   │   │       UserPrompt.jsx
│   │   │   │       
│   │   │   ├───Nav
│   │   │   │       Sidebar.jsx
│   │   │   │       TopNavbar.jsx
│   │   │   │       
│   │   │   └───Sections
│   │   │           Contact.jsx
│   │   │           Footer.jsx
│   │   │           Header.jsx
│   │   │           Services.jsx
│   │   │           
│   │   └───style
│   │           flexboxgrid.min.css
│   │           index.css
│   │           
│   ├───preview
│   │       Preview.jsx
│   │       
│   ├───projects
│   │       add-project-service.js
│   │       get-user-projects-service.js
│   │       projects.jsx
│   │       
│   ├───redirectPage
│   │       RedirectPage.jsx
│   │       
│   └───workspace
│           blocks-list-service.js
│           board-service.js
│           default-css-service.js
│           save-board-service.js
│           worksapce.jsx
│           workspace-controller.js
│           
└───states
    │   store.js
    │   
    ├───blocks-list-slice
    │       blocks-list-slice.js
    │       
    ├───board-slice
    │       board-slice.js
    │       
    ├───default-css-slice
    │       default-css-slice.js
    │       
    ├───generated-code-slice
    │       generated-code-slice.js
    │          
    ├───user-slice
    │       user-slice.js
    │       
    ├───widget-css-slice
    │       widget-css-slice.js
    │       
    └───widget-list-slice
            widget-list-slice.js
            

## Used Techniques
- State Manegement using Redux and Redux ToolKit. 
- Responsive UI Uusing BootStrap 5.
- Usage of Environment variables as follow:
    - REACT_APP_FONT_PICKER_API_KEY: Contains the API key used in the Font Picker.
    - REACT_APP_BASE_URL: Used as the api link to the backend. (`https://abdullahadel-001-site1.etempurl.com/api in our case`).
    - REACT_APP_APP_URL: Contains the domain of the main app or program. Used in the Landing Page React App only.
    - REACT_APP_LANDING_URL: Contains the domain of the landing page. Used in the itorx React ApP only.
    - REACT_APP_SPLIT: If its value is equal to *true* then, it will use the REACT_APP_APP_URL & REACT_APP_LANDING_URL domains when redirecting. Otherwise, it will use the domain name of the landing page as the main domain while the application will be on the *app* subdomain. 
        * ex: REACT_APP_SPLIT!==true, if host on the landing page = https://itworx.com, then the host of the app page will be https://app.itworx.com
- Also, note there should be two .env files in the root folder of each project called .env.development & .env.production for development and production respectively. 
- Usage of Local Storage to store Authentication Token to preserve log in state for as long as the token is still valid.
## Deployment Guide
- Run `npm run build:production`
- Then take the build file and upload it on Netlify.
-Deployed on 2 separate domains on Netlify:
* https://lcnc-design-tool.netlify.app/ for the Landing Page.
* https://lcnc-design-app.netlify.app/ for the App Page.
