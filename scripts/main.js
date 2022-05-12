'use strict';
const CDN_URL = '<Enter CDN URL Here>';

const e = React.createElement;

// Simple React Component
function Hello () {
    return 'Hello!';
}

// Simple Portal Wrapper
function ReactPortal({ children, wrapperId }) {
    return ReactDOM.createPortal(children, document.getElementById(wrapperId));
  }

// Simple Portal Component
function HelloPortal () {
    const portalId = 'portal';
    let portalComponent = document.getElementById(portalId);
    const portal = ReactDOM.createPortal(Hello, portalComponent);

    if (!portalComponent) {
      portalComponent = document.createElement('div');
      portalComponent.setAttribute("id", wrapperId);
      document.body.appendChild(portalComponent);  
    }

    // Uncomment to see window.CCEverywhere get initialized
    // window.define.amd = false;
    // ((document, url) => {
    //   const script = document.createElement("script");
    //   script.src = url;
    //   script.onload = () => {
    //     if (!window.CCEverywhere) {
    //         console.log('No ccEverywhere');
    //         return;
    //       }
    //       const ccEverywhere = window.CCEverywhere.default.initialize();
    //       console.log(ccEverywhere);
    //   };
    //   document.body.appendChild(script);
    // })(document, CDN_URL);

    // use CCE with requirejs
    requirejs.config({
      paths: {
          CCEverywhere: CDN_URL,
      }
    });

    require(['CCEverywhere'], function(CCEverywhere) {
      if (!CCEverywhere) {
        console.log('No ccEverywhere');
        return;
      }
      console.log(CCEverywhere);
      const ccEverywhere = CCEverywhere.default.initialize();
    });
    
    return /*#__PURE__*/React.createElement(ReactPortal, {
      wrapperId: portalId
    }, /*#__PURE__*/React.createElement("div", null, "Hello Portal!"));
}

const domContainer = document.querySelector('#app-root');
const portalContainer = document.querySelector('#portal-root');
const root = ReactDOM.createRoot(domContainer);
const rootPortal = ReactDOM.createRoot(portalContainer);

// Render components in DOM
root.render(e(Hello));
rootPortal.render(e(HelloPortal));
