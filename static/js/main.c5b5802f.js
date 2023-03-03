/*! For license information please see main.c5b5802f.js.LICENSE.txt */
  z-index: -1;
  pointer-events: auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: var(--width);
  top: 64px;
  color: #fff;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  background: var(--ck-body-color-danger);
  border-radius: 20px;
  padding: 24px 46px 82px 24px;
  transition: width var(--duration) var(--ease);
  a {
    font-weight: 700;
    text-decoration: underline;
  }
  code {
    font-size: 0.9em;
    display: inline-block;
    font-family: monospace;
    margin: 1px;
    padding: 0 4px;
    border-radius: 8px;
    font-weight: bold;
    background: rgba(255, 255, 255, 0.1);
  }
`,fb=by`
from { opacity: 0; }
  to { opacity: 1; }
`,db=by`
from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
`,hb=by`
from { opacity: 0; transform: scale(1.1); }
  to { opacity: 1; transform: scale(1); }
`,pb=by`
from { opacity: 1; }
  to { opacity: 0; }
`,mb=by`
from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(1.1); }
`,gb=by`
from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.85); }
`,vb=ub(Mg.div)`
  max-width: 100%;
  width: 295px;
  padding-top: 48px;
`,yb=ub(Mg.div)`
  user-select: none;
  position: relative;
  display: block;
  text-align: center;
  color: var(--ck-body-color-muted);
  font-size: 15px;
  font-weight: 400;
  line-height: 21px;
  span {
    z-index: 2;
    position: relative;
    display: inline-block;
    user-select: none;
    pointer-events: none;
    padding: 0 14px;
    background: var(--ck-body-background);
    transition: background-color 200ms ease;
  }
  &:before {
    z-index: 2;
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    transform: translateY(-1px);
    background: var(--ck-body-divider);
    box-shadow: var(--ck-body-divider-box-shadow);
  }
`,bb=ub(Mg.div)`
  z-index: 3;
  pointer-events: none;
  user-select: none;
  position: absolute;
  top: 25px;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  transform: translateX(-50%);
  width: var(--width);
  text-align: center;
  font-size: 17px;
  line-height: 20px;
  font-weight: var(--ck-modal-heading-font-weight, 600);
  color: var(--ck-body-color);
  span {
    display: inline-block;
  }
`,wb=ub(Mg.div)`
  position: relative;
  padding: 0;
`,xb=ub(Mg.div)`
  left: 0;
  right: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 0 16px;

  @media only screen and (max-width: ${cb}px) {
    display: block;
  }
`,kb=ub(Mg.h1)`
  margin: 0;
  padding: 0;
  line-height: ${e=>e.$small?20:22}px;
  font-size: ${e=>e.$small?17:19}px;
  font-weight: var(--ck-modal-h1-font-weight, 600);
  color: ${e=>e.$error?"var(--ck-body-color-danger)":e.$valid?"var(--ck-body-color-valid)":"var(--ck-body-color)"};
  > svg {
    position: relative;
    top: -2px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 6px;
  }
  @media only screen and (max-width: ${cb}px) {
    margin-bottom: 6px;
    font-size: 17px;
  }
`,Eb=ub.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  color: var(--ck-body-color-muted);
  strong {
    font-weight: 500;
    color: var(--ck-body-color);
  }
`,Ab=ub(Mg.div)`
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--ck-overlay-background, rgba(71, 88, 107, 0.24));
  backdrop-filter: var(--ck-overlay-backdrop-filter, none);
  opacity: 0;
  animation: ${e=>e.$active?fb:pb} 150ms ease-out
    both;
`,Sb=by`
  from{ opacity: 0; transform: scale(0.97); }
  to{ opacity: 1; transform: scale(1); }
`,Mb=by`
  from{ opacity: 1; transform: scale(1); }
  to{ opacity: 0; transform: scale(0.97); }
`,Cb=by`
  from { transform: translate3d(0, 100%, 0); }
  to { transform: translate3d(0, 0%, 0); }
`,_b=by`
  from { opacity: 1; }
  to { opacity: 0; }
`,Pb=ub(Mg.div)`
  z-index: 2;
  position: relative;
  color: var(--ck-body-color);

  animation: 150ms ease both;
  animation-name: ${Mb};
  &.active {
    animation-name: ${Sb};
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: var(--width);
    height: var(--height);
    transform: translateX(-50%);
    backface-visibility: hidden;
    transition: all 200ms ease;
    border-radius: var(--ck-border-radius, 20px);
    background: var(--ck-body-background);
    box-shadow: var(--ck-modal-box-shadow);
  }

  @media only screen and (max-width: ${cb}px) {
    animation-name: ${_b};
    animation-duration: 130ms;
    animation-timing-function: ease;

    &.active {
      animation-name: ${Cb};
      animation-duration: 300ms;
      animation-delay: 32ms;
      animation-timing-function: cubic-bezier(0.15, 1.15, 0.6, 1);
    }

    &:before {
      width: 100%;
      transition: 0ms height cubic-bezier(0.15, 1.15, 0.6, 1);
      will-change: height;
    }
  }
`,Tb=ub(Mg.div)`
  z-index: 3;
  position: absolute;
  top: 0;
  left: 50%;
  height: 64px;
  transform: translateX(-50%);
  backface-visibility: hidden;
  width: var(--width);
  transition: 0.2s ease width;
  pointer-events: auto;
  //border-bottom: 1px solid var(--ck-body-divider);
`,Ob=ub(Mg.div)`
  position: relative;
  overflow: hidden;
  height: var(--height);
  transition: 0.2s ease height;
  @media only screen and (max-width: ${cb}px) {
    transition: 0ms height cubic-bezier(0.15, 1.15, 0.6, 1);
    /* animation-delay: 34ms; */
  }
`,Ib=ub(Mg.div)`
  z-index: 2;
  position: relative;
  top: 0;
  left: 50%;
  margin-left: calc(var(--width) / -2);
  width: var(--width);
  /* left: 0; */
  /* width: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: center center;
  animation: 200ms ease both;

  &.active {
    animation-name: ${hb};
  }
  &.active-scale-up {
    animation-name: ${db};
  }
  &.exit-scale-down {
    z-index: 1;
    pointer-events: none;
    position: absolute;
    /* top: 0; */
    /* left: 0; */
    animation-name: ${gb};
  }
  &.exit {
    z-index: 1;
    pointer-events: none;
    position: absolute;
    /* top: 0; */
    /* left: 0; */
    /* left: 50%; */
    /* transform: translateX(-50%); */
    animation-name: ${mb};
    animation-delay: 16.6667ms;
  }
  @media only screen and (max-width: ${cb}px) {
    /* animation: 0ms ease both; */
    /* animation-delay: 35ms; */
    animation: 0ms cubic-bezier(0.15, 1.15, 0.6, 1) both;

    &.active {
      animation-name: ${fb};
    }
    &.active-scale-up {
      animation-name: ${fb};
    }
    &.exit-scale-down {
      z-index: 3;
      animation-name: ${pb};
    }
    &.exit {
      z-index: 3;
      animation-name: ${pb};
      animation-delay: 0ms;
    }
  }
`,Rb=ub(Mg.div)`
  margin: 0 auto;
  width: fit-content;
  padding: 29px 24px 24px;
  backface-visibility: hidden;
`,jb=ub.div`
  z-index: 2147483646; // z-index set one below max (2147483647) for if we wish to layer things ontop of the modal in a seperate Portal
  position: fixed;
  inset: 0;
`,Bb=ub(Mg.button)`
  z-index: 3;
  cursor: pointer;
  position: absolute;
  top: 22px;
  right: 17px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  padding: 0;
  margin: 0;
  color: var(--ck-body-action-color);
  background: var(--ck-body-background);
  transition: background-color 200ms ease, transform 100ms ease;
  /* will-change: transform; */
  svg {
    display: block;
  }

  &:hover {
    background: var(--ck-body-background-secondary);
  }
  &:active {
    transform: scale(0.9);
  }
`,Nb=ub(Mg.button)`
  z-index: 3;
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  padding: 0;
  margin: 0;
  color: var(--ck-body-action-color);
  background: var(--ck-body-background);
  transition: background-color 200ms ease, transform 100ms ease;
  /* will-change: transform; */
  svg {
    display: block;
    position: relative;
    left: -1px;
  }

  &:enabled {
    cursor: pointer;
    &:hover {
      background: var(--ck-body-background-secondary);
    }
    &:active {
      transform: scale(0.9);
    }
  }
`,Fb=ub(Mg.button)`
  z-index: 3;
  position: absolute;
  inset: 0;
  transform: translateX(-1px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  padding: 0;
  margin: 0;
  color: var(--ck-body-action-color);
  background: var(--ck-body-background);
  transition: background-color 200ms ease, transform 100ms ease;
  /* will-change: transform; */
  svg {
    display: block;
    position: relative;
  }
  &:enabled {
    cursor: pointer;
    &:hover {
      background: var(--ck-body-background-secondary);
    }
    &:active {
      transform: scale(0.9);
    }
  }
`,Db=ub(Mg.div)`
  --ease: cubic-bezier(0.25, 0.1, 0.25, 1);
  --duration: 200ms;
  --transition: height var(--duration) var(--ease),
    width var(--duration) var(--ease);
  z-index: 3;
  display: block;
  pointer-events: none;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate3d(-50%, -50%, 0);
  backface-visibility: hidden;
  @media only screen and (max-width: ${cb}px) {
    pointer-events: auto;
    left: 0;
    top: auto;
    bottom: -5px;
    transform: none;
    ${Pb} {
      max-width: 448px;
      margin: 0 auto;
      &:before {
        width: 100%;
        border-radius: var(--ck-border-radius, 30px)
          var(--ck-border-radius, 30px) 0 0;
      }
    }
    ${Ib} {
      left: 0;
      right: 0;
      margin: 0 auto;
      width: auto;
    }
    ${vb} {
      margin: 0 auto;
      width: 100% !important;
    }
    ${bb} {
      top: 29px;
    }
    ${xb} {
      gap: 12px;
    }
    ${Eb} {
      margin: 0 auto;
      max-width: 295px;
    }
    ${Rb} {
      width: 100%;
      padding: 31px 24px;
    }
    ${Tb} {
      width: 100%;
      top: 4px;
      border-bottom: 0;
    }
    ${Bb} {
      right: 22px;
    }
    ${Nb} {
      top: -1px;
      left: -3px;
    }
    ${Fb} {
      top: -1px;
      left: -3px;
      svg {
        width: 65%;
        height: auto;
      }
    }
    ${Bb},
    ${Nb},
    ${Fb} {
      // Quick hack for bigger tappable area on mobile
      transform: scale(1.4) !important;
      background: transparent !important;
      svg {
        transform: scale(0.8) !important;
      }
    }
  }
`;function Lb(e){const r=function(){const e=(0,t.useRef)(null);function r(t){if(e.current){var r=e.current.querySelectorAll('\n        a[href]:not(:disabled),\n        button:not(:disabled),\n        textarea:not(:disabled),\n        input[type="text"]:not(:disabled),\n        input[type="radio"]:not(:disabled),\n        input[type="checkbox"]:not(:disabled),\n        select:not(:disabled)\n      '),n=r[0],i=r[r.length-1];("Tab"===t.key||9===t.keyCode)&&(t.shiftKey?document.activeElement===n&&(i.focus(),t.preventDefault()):document.activeElement===i&&(n.focus(),t.preventDefault()))}}return(0,t.useEffect)((()=>(e.current&&(e.current.addEventListener("keydown",r),e.current.focus({preventScroll:!0})),()=>{e.current&&e.current.removeEventListener("keydown",r)})),[]),e}();return(0,t.useEffect)((()=>{r.current&&r.current.focus({preventScroll:!0})}),[]),(0,un.jsx)("div",{ref:r,tabIndex:0,children:e.children})}const Ub={debug:10,info:20,warn:30,error:40,none:100},zb="undefined"!==typeof window&&window.document&&void 0!==window.document.createElement?t.useLayoutEffect:t.useEffect,Hb=t.forwardRef(((e,r)=>{let{children:n}=e;const[i,o]=t.useState(!1),{fontSize:a,ref:s}=function(){let{logLevel:e="info",maxFontSize:r=100,minFontSize:n=20,onFinish:i,onStart:o,resolution:a=5}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const s=Ub[e],u=(0,t.useCallback)((()=>({calcKey:0,fontSize:r,fontSizePrev:n,fontSizeMax:r,fontSizeMin:n})),[r,n]),c=(0,t.useRef)(null),l=(0,t.useRef)(),f=(0,t.useRef)(!1),[d,h]=(0,t.useState)(u),{calcKey:p,fontSize:m,fontSizeMax:g,fontSizeMin:v,fontSizePrev:y}=d;let b=null;const[w]=(0,t.useState)((()=>new Wy((()=>{b=window.requestAnimationFrame((()=>{f.current||(o&&o(),f.current=!0,h({...u(),calcKey:p+1}))}))}))));(0,t.useEffect)((()=>(c.current&&w.observe(c.current),()=>{b&&window.cancelAnimationFrame(b),w.disconnect()})),[b,w]);const x=c.current&&c.current.innerHTML;return(0,t.useEffect)((()=>{0===p||f.current||(x!==l.current&&(o&&o(),h({...u(),calcKey:p+1})),l.current=x)}),[p,u,x,o]),zb((()=>{if(0===p)return;const e=Math.abs(m-y)<=a,t=!!c.current&&(c.current.scrollHeight>c.current.offsetHeight||c.current.scrollWidth>c.current.offsetWidth),r=m>y;if(e)return void(t&&m===y?(f.current=!1,s<=Ub.info&&console.info(`[use-fit-text] reached \`minFontSize = ${n}\` without fitting text`)):t?h({fontSize:r?y:v,fontSizeMax:g,fontSizeMin:v,fontSizePrev:y,calcKey:p}):(f.current=!1,i&&i(m)));let o,u=g,l=v;t?(o=r?y-m:v-m,u=Math.min(g,m)):(o=r?g-m:y-m,l=Math.max(v,m)),h({calcKey:p,fontSize:m+o/2,fontSizeMax:u,fontSizeMin:l,fontSizePrev:m})}),[p,m,g,v,y,i,c,a]),{fontSize:m,ref:c}}({logLevel:"none",maxFontSize:100,minFontSize:70,onStart:()=>o(!0),onFinish:()=>o(!0)});return(0,un.jsx)("div",{ref:s,style:{visibility:i?"visible":"hidden",fontSize:`${a}%`,maxHeight:"100%",maxWidth:"100%",display:"flex",justifyContent:"center",alignItems:"center"},children:n})}));Hb.displayName="FitText";var Zb={base:{light:{"--ck-connectbutton-font-size":"15px","--ck-connectbutton-color":"#373737","--ck-connectbutton-background":"#F6F7F9","--ck-connectbutton-background-secondary":"#FFFFFF","--ck-connectbutton-hover-color":"#373737","--ck-connectbutton-hover-background":"#F0F2F5","--ck-connectbutton-active-color":"#373737","--ck-connectbutton-active-background":"#EAECF1","--ck-connectbutton-balance-color":"#373737","--ck-connectbutton-balance-background":"#fff","--ck-connectbutton-balance-box-shadow":"inset 0 0 0 1px var(--ck-connectbutton-background)","--ck-connectbutton-balance-hover-background":"#F6F7F9","--ck-connectbutton-balance-hover-box-shadow":"inset 0 0 0 1px var(--ck-connectbutton-hover-background)","--ck-connectbutton-balance-active-background":"#F0F2F5","--ck-connectbutton-balance-active-box-shadow":"inset 0 0 0 1px var(--ck-connectbutton-active-background)","--ck-primary-button-border-radius":"16px","--ck-primary-button-color":"#373737","--ck-primary-button-background":"#F6F7F9","--ck-primary-button-font-weight":"600","--ck-primary-button-hover-color":"#373737","--ck-primary-button-hover-background":"#F0F2F5","--ck-secondary-button-border-radius":"16px","--ck-secondary-button-color":"#373737","--ck-secondary-button-background":"#F6F7F9","--ck-tertiary-button-background":"#FFFFFF","--ck-secondary-button-hover-background":"#e0e4eb","--ck-modal-box-shadow":"0px 2px 4px rgba(0, 0, 0, 0.02)","--ck-overlay-background":"rgba(71, 88, 107, 0.24)","--ck-body-color":"#373737","--ck-body-color-muted":"#999999","--ck-body-color-muted-hover":"#111111","--ck-body-background":"#ffffff","--ck-body-background-transparent":"rgba(255,255,255,0)","--ck-body-background-secondary":"#f6f7f9","--ck-body-background-secondary-hover-background":"#e0e4eb","--ck-body-background-secondary-hover-outline":"#4282FF","--ck-body-background-tertiary":"#F3F4F7","--ck-body-action-color":"#999999","--ck-body-divider":"#f7f6f8","--ck-body-color-danger":"#FF4E4E","--ck-body-color-valid":"#32D74B","--ck-siwe-border":"#F0F0F0","--ck-body-disclaimer-color":"#AAAAAB","--ck-body-disclaimer-link-color":"#838485","--ck-body-disclaimer-link-hover-color":"#000000","--ck-tooltip-background":"#ffffff","--ck-tooltip-background-secondary":"#ffffff","--ck-tooltip-color":"#999999","--ck-tooltip-shadow":"0px 2px 10px rgba(0, 0, 0, 0.08)","--ck-dropdown-button-color":"#999999","--ck-dropdown-button-box-shadow":"0 0 0 1px rgba(0,0,0,0.01), 0px 0px 7px rgba(0, 0, 0, 0.05)","--ck-dropdown-button-background":"#fff","--ck-dropdown-button-hover-color":"#8B8B8B","--ck-dropdown-button-hover-background":"#F5F7F9","--ck-qr-dot-color":"#000000","--ck-qr-border-color":"#f7f6f8","--ck-focus-color":"#1A88F8","--ck-spinner-color":"var(--ck-focus-color)","--ck-copytoclipboard-stroke":"#CCCCCC"},dark:{"--ck-connectbutton-font-size":"15px","--ck-connectbutton-color":"#ffffff","--ck-connectbutton-background":"#383838","--ck-connectbutton-background-secondary":"#282828","--ck-connectbutton-hover-background":"#404040","--ck-connectbutton-active-background":"#4D4D4D","--ck-connectbutton-balance-color":"#fff","--ck-connectbutton-balance-background":"#282828","--ck-connectbutton-balance-box-shadow":"inset 0 0 0 1px var(--ck-connectbutton-background)","--ck-connectbutton-balance-hover-background":"#383838","--ck-connectbutton-balance-hover-box-shadow":"inset 0 0 0 1px var(--ck-connectbutton-hover-background)","--ck-connectbutton-balance-active-background":"#404040","--ck-connectbutton-balance-active-box-shadow":"inset 0 0 0 1px var(--ck-connectbutton-active-background)","--ck-primary-button-color":"#ffffff","--ck-primary-button-background":"#383838","--ck-primary-button-border-radius":"16px","--ck-primary-button-font-weight":"600","--ck-primary-button-hover-background":"#404040","--ck-primary-button-active-border-radius":"16px","--ck-secondary-button-color":"#ffffff","--ck-secondary-button-background":"#333333","--ck-secondary-button-hover-background":"#4D4D4D","--ck-tertiary-button-background":"#424242","--ck-focus-color":"#1A88F8","--ck-overlay-background":"rgba(0,0,0,0.4)","--ck-body-color":"#ffffff","--ck-body-color-muted":"rgba(255, 255, 255, 0.4)","--ck-body-color-muted-hover":"rgba(255, 255, 255, 0.8)","--ck-body-background":"#2B2B2B","--ck-body-background-transparent":"rgba(0,0,0,0)","--ck-body-background-secondary":"#333333","--ck-body-background-secondary-hover-background":"#4D4D4D","--ck-body-background-secondary-hover-outline":"#ffffff","--ck-body-background-tertiary":"#333333","--ck-body-action-color":"#808080","--ck-body-divider":"#383838","--ck-body-color-danger":"#FF4E4E","--ck-body-disclaimer-color":"#858585","--ck-body-disclaimer-link-color":"#ADADAD","--ck-body-disclaimer-link-hover-color":"#FFFFFF","--ck-modal-box-shadow":"0px 2px 4px rgba(0, 0, 0, 0.02)","--ck-copytoclipboard-stroke":"#555555","--ck-tooltip-background":"#2B2B2B","--ck-tooltip-background-secondary":"#333333","--ck-tooltip-color":"#999999","--ck-tooltip-shadow":"0px 2px 10px rgba(0, 0, 0, 0.08)","--ck-dropdown-button-color":"#6C7381","--ck-spinner-color":"var(--ck-focus-color)","--ck-qr-dot-color":"#ffffff","--ck-qr-border-color":"#3d3d3d"}},web95:{"--ck-font-family":"Lato","--ck-border-radius":"0px","--ck-connectbutton-color":"#373737","--ck-connectbutton-background":"linear-gradient(180deg, #F0F0EA 0%, #FFFFFF 50%, #F0F0EA 100%) 100% 100% / 200% 200%, #F5F5F1","--ck-connectbutton-box-shadow":" 0 0 0 1px #003C74, 2px 2px 0px rgba(255, 255, 255, 0.75), -2px -2px 0px rgba(0, 0, 0, 0.05), inset 0px 0px 0px 0px #97B9EC, inset -1px -2px 2px rgba(0, 0, 0, 0.2)","--ck-connectbutton-border-radius":"4.5px","--ck-connectbutton-hover-color":"#373737","--ck-connectbutton-hover-background":"linear-gradient(180deg, #F0F0EA 0%, #FFFFFF 50%, #F0F0EA 100%) 100% 0% / 200% 200%, #F5F5F1","--ck-connectbutton-active-background":"linear-gradient(180deg, #F0F0EA 0%, #FFFFFF 50%, #F0F0EA 100%) 100% 100% / 200% 200%, #F5F5F1","--ck-connectbutton-balance-color":"#373737","--ck-connectbutton-balance-background":"#fff","--ck-connectbutton-balance-box-shadow":"0 0 0 1px #E4E7E7","--ck-connectbutton-balance-hover-box-shadow":"0 0 0 1px #d7dbdb","--ck-connectbutton-balance-active-box-shadow":"0 0 0 1px #bbc0c0","--ck-focus-color":"#1A88F8","--ck-overlay-background":"rgba(0, 127,  128, 0.8)","--ck-body-color":"#373737","--ck-body-color-muted":"#808080","--ck-body-color-muted-hover":"#111111","--ck-body-background":"#F0EDE2","--ck-body-background-transparent":"rgba(255,255,255,0)","--ck-body-background-secondary-hover-background":"#FAFAFA","--ck-body-background-secondary-hover-outline":"#4282FF","--ck-body-action-color":"#373737","--ck-body-color-danger":"#FC6464","--ck-body-color-valid":"#32D74B","--ck-body-divider":"#919B9C","--ck-body-divider-box-shadow":"0px 1px 0px #FBFBF8","--ck-primary-button-background":"linear-gradient(180deg, #FFFFFF 0%, #F0F0EA 100%), #F5F5F1","--ck-primary-button-box-shadow":"inset 0 0 0 1px #003C74, 1px 1px 0px rgba(255, 255, 255, 0.75), -1px -1px 0px rgba(0, 0, 0, 0.05), inset 0px 0px 0px 0px #97B9EC, inset -1px -2px 2px rgba(0, 0, 0, 0.2)","--ck-primary-button-border-radius":"6px","--ck-primary-button-hover-box-shadow":"inset 0 0 0 1px #003C74, 1px 1px 0px rgba(255, 255, 255, 0.75), -1px -1px 0px rgba(0, 0, 0, 0.05), inset 0px 0px 0px 5px #97B9EC, inset -1px -2px 2px rgba(0, 0, 0, 0.2)","--ck-primary-button-hover-border-radius":"6px","--ck-modal-heading-font-weight":400,"--ck-modal-box-shadow":"\n    inset 0px -3px 0px #0F37A9,\n    inset -2px 0px 0px #0F37A9,\n    inset 0px -4px 0px #0D5DDF,\n    inset -4px 0px 0px #0D5DDF,\n    inset 2px 0px 0px #0453DD,\n    inset 0px 2px 0px #044FD1,\n    inset 4px 0px 0px #4283EB,\n    inset 0px 4px 0px #4283EB\n  ","--ck-modal-h1-font-weight":400,"--ck-secondary-button-color":"#373737","--ck-secondary-button-border-radius":"6px","--ck-secondary-button-box-shadow":"inset 0 0 0 1px #003C74, 1px 1px 0px rgba(255, 255, 255, 0.75), -1px -1px 0px rgba(0, 0, 0, 0.05), inset 0px 0px 0px 0px #97B9EC, inset -1px -2px 2px rgba(0, 0, 0, 0.2)","--ck-secondary-button-background":"linear-gradient(180deg, #FFFFFF 0%, #F0F0EA 100%), #F5F5F1","--ck-secondary-button-hover-box-shadow":"inset 0 0 0 1px #003C74, 1px 1px 0px rgba(255, 255, 255, 0.75), -1px -1px 0px rgba(0, 0, 0, 0.05), inset 0px 0px 0px 4px #97B9EC, inset -1px -2px 2px rgba(0, 0, 0, 0.2)","--ck-body-background-secondary":"rgba(0, 0, 0, 0.1)","--ck-body-background-tertiary":"linear-gradient(180deg, #FBFBFB 0%, #EFEFEE 100%)","--ck-tertiary-border-radius":"0px","--ck-tertiary-box-shadow":"inset 0 0 0 1px #919B9C, 1px 1px 2px rgba(0, 0, 0, 0.15), inset -2px -2px 0px #FFFFFF","--ck-body-button-text-align":"left","--ck-body-button-box-shadow":"0 2px 4px rgba(0, 0, 0, 0.05 )","--ck-body-disclaimer-background":"linear-gradient(180deg, #FBFBFB 0%, #EFEFEE 100%)","--ck-body-disclaimer-box-shadow":"\n    inset 0px -3px 0px #0F37A9,\n    inset -2px 0px 0px #0F37A9,\n    inset 0px -4px 0px #0D5DDF,\n    inset -4px 0px 0px #0D5DDF,\n    inset 2px 0px 0px #0453DD,\n    inset 4px 0px 0px #4283EB,\n    inset 0 1px 0 0 #919B9C","--ck-body-disclaimer-font-size":"14px","--ck-body-disclaimer-color":"#959594","--ck-body-disclaimer-link-color":"#626262","--ck-body-disclaimer-link-hover-color":"#000000","--ck-qr-dot-color":"#000000","--ck-qr-border-color":"#919B9C","--ck-qr-border-radius":"0","--ck-qr-background":"#FFFFFF","--ck-copytoclipboard-stroke":"rgba(55, 55, 55, 0.4)","--ck-tooltip-background":"linear-gradient(270deg, #F7F3E6 7.69%, #F5F7DA 100%)","--ck-tooltip-background-secondary":"#f6f7f9","--ck-tooltip-color":"#000000","--ck-tooltip-shadow":" 0 0 0 1.5px #2b2622, 0px 2px 10px rgba(0, 0, 0, 0.08)","--ck-spinner-color":"var(--ck-focus-color)","--ck-dropdown-button-color":"#999999","--ck-dropdown-button-box-shadow":"0 0 0 1px #A0A0A0, 1px 1px 0px rgba(255, 255, 255, 0.75), -1px -1px 0px rgba(0, 0, 0, 0.05), inset -1px -2px 2px rgba(0, 0, 0, 0.2)","--ck-dropdown-button-background":"linear-gradient(180deg, #FFFFFF 0%, #F0F0EA 100%), #F5F5F1","--ck-dropdown-button-hover-background":"linear-gradient(0deg, #FFFFFF 0%, #F0F0EA 100%), #F5F5F1","--ck-dropdown-pending-color":"#ACA899","--ck-dropdown-active-color":"#FFFFFF","--ck-dropdown-active-static-color":"#ACA899","--ck-dropdown-active-background":"#3F69BF","--ck-dropdown-active-border-radius":"0","--ck-dropdown-active-inset":"-12px","--ck-dropdown-color":"#ACA899","--ck-dropdown-background":"#FFFFFF","--ck-dropdown-box-shadow":"inset 0 0 0 1px #ACA899, 2px 2px 7px rgba(0, 0, 0, 0.15)","--ck-dropdown-border-radius":"0","--ck-alert-color":"#ACA899","--ck-alert-background":"linear-gradient(180deg, #FBFBFB 0%, #EFEFEE 100%)","--ck-alert-box-shadow":"inset 0 0 0 1px #919B9C, 1px 1px 2px rgba(0, 0, 0, 0.15), inset -2px -2px 0px #FFFFFF","--ck-alert-border-radius":"0","--ck-graphic-primary-color":"#333333","--ck-graphic-primary-background":"#FFFFFF","--ck-graphic-compass-background":"#FFFFFF","--ck-siwe-border":"#919B9C"},retro:{"--ck-font-family":'"SF Pro Rounded",ui-rounded,"Nunito",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol"',"--ck-border-radius":"8px","--ck-connectbutton-font-size":"17px","--ck-connectbutton-color":"#000000","--ck-connectbutton-background":"#ffffff","--ck-connectbutton-box-shadow":"-4px 4px 0px #000000, inset 0 0 0 2px #000000","--ck-connectbutton-border-radius":"8px","--ck-connectbutton-hover-background":"#F3EDE8","--ck-connectbutton-active-box-shadow":"0 0 0 0 #000000, inset 0 0 0 2px #000000","--ck-connectbutton-balance-color":"#000000","--ck-connectbutton-balance-background":"#F3EDE8","--ck-connectbutton-balance-box-shadow":"-4px 4px 0px #000000, inset 0 0 0 2px #000000","--ck-connectbutton-balance-hover-background":"#eee5dd","--ck-connectbutton-balance-connectbutton-box-shadow":"-4px 8px 0px -4px #000000, inset 0 0 0 2px #000000","--ck-connectbutton-balance-connectbutton-border-radius":"0px 8px 8px 0","--ck-primary-button-color":"#373737","--ck-primary-button-background":"#ffffff","--ck-primary-button-box-shadow":"inset 0 0 0 2px #000000, -4px 4px 0 0 #000000","--ck-primary-button-border-radius":"8px","--ck-primary-button-hover-background":"#F3EDE8","--ck-primary-button-hover-box-shadow":"inset 0 0 0 2px #000000, -0px 0px 0 0 #000000","--ck-secondary-button-border-radius":"8px","--ck-secondary-button-color":"#373737","--ck-secondary-button-background":"#ffffff","--ck-secondary-button-box-shadow":"-4px 4px 0 0 #000000, inset 0 0 0 2px #000000","--ck-secondary-button-hover-background":"#F3EDE8","--ck-secondary-button-hover-box-shadow":"0 0 0 0 #000000, inset 0 0 0 2px #000000","--ck-focus-color":"#3B99FC","--ck-overlay-background":"rgba(133, 120, 122, 0.8)","--ck-body-color":"#373737","--ck-body-color-muted":"rgba(0, 0, 0, 0.5)","--ck-body-color-muted-hover":"#000000","--ck-body-background":"#EBE1D8","--ck-body-background-transparent":"rgba(255,255,255,0)","--ck-body-background-secondary":"rgba(0,0,0,0.1)","--ck-body-background-secondary-hover-background":"#4D4D4D","--ck-body-background-secondary-hover-outline":"#373737","--ck-body-background-tertiary":"#ffffff","--ck-tertiary-border-radius":"8px","--ck-tertiary-box-shadow":"-4px 4px 0 0 #000000, inset 0 0 0 2px #000000","--ck-body-action-color":"#373737","--ck-body-divider":"#373737","--ck-body-color-danger":"#FF4E4E","--ck-body-disclaimer-background":"#E3D6C9","--ck-body-disclaimer-box-shadow":"-4px 4px 0 0 #000000, inset 2px 0 0 0 #000000, inset -2px 0 0 0 #000000, inset 0 -2px 0 0 #000000","--ck-body-disclaimer-font-weight":"500","--ck-body-disclaimer-color":"#888079","--ck-body-disclaimer-link-color":"#5B5650","--ck-body-disclaimer-link-hover-color":"#000000","--ck-modal-box-shadow":"-10px 10px 0px #000000, inset 0 0 0 2px #000000","--ck-copytoclipboard-stroke":"#555555","--ck-tooltip-border-radius":"8px","--ck-tooltip-color":"#373737","--ck-tooltip-background":"#ffffff","--ck-tooltip-background-secondary":"#EBE1D8","--ck-tooltip-shadow":"-6px 6px 0 0 #000000, 0 0 0 2px #000000","--ck-spinner-color":"#1A88F8","--ck-dropdown-button-color":"#000","--ck-dropdown-button-box-shadow":"-2px 2px 0 2px #000000,  0 0 0 2px #000000","--ck-dropdown-button-background":"#ffffff","--ck-dropdown-button-hover-background":"#F3EDE8","--ck-dropdown-button-hover-box-shadow":"-2px 2px 0 0 #000000,  0 0 0 2px #000000","--ck-dropdown-pending-color":"rgba(0, 0, 0, 0.5)","--ck-dropdown-active-color":"#FFFFFF","--ck-dropdown-active-static-color":"rgba(0, 0, 0, 0.5)","--ck-dropdown-active-background":"#3B99FC","--ck-dropdown-active-box-shadow":"inset 0 0 0 2px #000000","--ck-dropdown-active-border-radius":"8px","--ck-dropdown-color":"rgba(0, 0, 0, 0.5)","--ck-dropdown-background":"#FFFFFF","--ck-dropdown-box-shadow":"-4px 4px 0 0 #000000, inset 0 0 0 2px #000000","--ck-dropdown-border-radius":"8px","--ck-alert-color":"rgba(0, 0, 0, 0.5)","--ck-alert-background":" #F5F5F5","--ck-alert-border-radius":"8px","--ck-qr-border-radius":"8px","--ck-qr-dot-color":"#000000","--ck-qr-border-color":"#000000","--ck-qr-background":"#ffffff","--ck-graphic-primary-color":"#000000","--ck-graphic-primary-background":"#ffffff","--ck-graphic-compass-background":"#FFFFFF","--ck-siwe-border":"#8E8985"},soft:{"--ck-border-radius":"12px","--ck-connectbutton-font-size":"17px","--ck-connectbutton-border-radius":"12px","--ck-connectbutton-color":"#414451","--ck-connectbutton-background":"#ffffff","--ck-connectbutton-box-shadow":"inset 0 0 0 1px #E9EAEC, 0px 2px 4px rgba(0, 0, 0, 0.02)","--ck-connectbutton-hover-background":"#F6F7F9","--ck-connectbutton-hover-box-shadow":"inset 0 0 0 1px #E9EAEC, 0px 2px 4px rgba(0, 0, 0, 0.02)","--ck-connectbutton-balance-color":"#373737","--ck-connectbutton-balance-background":"#F6F7F9","--ck-connectbutton-balance-box-shadow":"none","--ck-connectbutton-balance-hover-background":"#f1f1f3","--ck-primary-button-border-radius":"12px","--ck-primary-button-color":"#414451","--ck-primary-button-background":"#ffffff","--ck-primary-button-box-shadow":"0 0 0 1px #E9EAEC, 0px 2px 4px rgba(0, 0, 0, 0.02)","--ck-primary-button-hover-background":"#F6F7F9","--ck-primary-button-hover-box-shadow":"0 0 0 1px #D9DBDD, 0px 0 0 rgba(0, 0, 0, 0.02)","--ck-secondary-button-border-radius":"12px","--ck-secondary-button-color":"#414451","--ck-secondary-button-background":"#ffffff","--ck-secondary-button-box-shadow":"0 0 0 1px #E9EAEC, 0px 2px 4px rgba(0, 0, 0, 0.02)","--ck-secondary-button-hover-background":"#F6F7F9","--ck-secondary-button-hover-box-shadow":"0 0 0 1px #D9DBDD, 0px 0 0 rgba(0, 0, 0, 0.02)","--ck-focus-color":"#1A88F8","--ck-modal-box-shadow":"0px 3px 16px rgba(0, 0, 0, 0.08)","--ck-body-color":"#414451","--ck-body-color-muted":"#9196A1","--ck-body-color-muted-hover":"#000000","--ck-body-background":"#ffffff","--ck-body-background-transparent":"rgba(255,255,255,0)","--ck-body-background-secondary":"#f6f7f9","--ck-body-background-secondary-hover-background":"#e0e4eb","--ck-body-background-secondary-hover-outline":"#4282FF","--ck-body-background-tertiary":"#F6F8FA","--ck-tertiary-border-radius":"13px","--ck-tertiary-box-shadow":"inset 0 0 0 1px rgba(0, 0, 0, 0.04)","--ck-body-action-color":"#999999","--ck-body-divider":"#f7f6f8","--ck-body-color-danger":"#FF4E4E","--ck-body-color-valid":"#32D74B","--ck-body-disclaimer-background":"#F9FAFA","--ck-body-disclaimer-color":"#AFB1B6","--ck-body-disclaimer-link-color":"#787B84","--ck-body-disclaimer-link-hover-color":"#000000","--ck-copytoclipboard-stroke":"#CCCCCC","--ck-tooltip-background":"#ffffff","--ck-tooltip-background-secondary":"#ffffff","--ck-tooltip-color":"#999999","--ck-tooltip-shadow":"0px 2px 10px rgba(0, 0, 0, 0.08)","--ck-spinner-color":"var(--ck-focus-color)","--ck-dropdown-button-color":"#999999","--ck-dropdown-button-box-shadow":"0 0 0 1px rgba(0, 0, 0, 0.01), 0px 0px 7px rgba(0, 0, 0, 0.05)","--ck-dropdown-button-background":"#fff","--ck-dropdown-button-hover-color":"#8B8B8B","--ck-dropdown-button-hover-background":"#E7E7E7","--ck-dropdown-color":"rgba(55, 55, 55, 0.4)","--ck-dropdown-box-shadow":"0px 2px 15px rgba(0, 0, 0, 0.15)","--ck-alert-color":"#9196A1","--ck-alert-background":"#F6F8FA","--ck-alert-box-shadow":"inset 0 0 0 1px rgba(0, 0, 0, 0.04)","--ck-alert-border-radius":"8px","--ck-qr-border-radius":"12px","--ck-qr-dot-color":"#2E3138","--ck-qr-border-color":"#E9EAEC","--ck-siwe-border":"#EAEBED"},midnight:{"--ck-font-family":'"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol"',"--ck-border-radius":"10px","--ck-connectbutton-font-size":"17px","--ck-connectbutton-border-radius":"8px","--ck-connectbutton-color":"#ffffff","--ck-connectbutton-background":"#313235","--ck-connectbutton-box-shadow":"inset 0 0 0 1px rgba(255, 255, 255, 0.05)","--ck-connectbutton-hover-background":"#414144","--ck-connectbutton-active-background":"#4C4D4F","--ck-connectbutton-balance-color":"#ffffff","--ck-connectbutton-balance-background":"#1F2023","--ck-connectbutton-balance-box-shadow":"inset 0 0 0 1px #313235","--ck-connectbutton-balance-hover-background":"#313235","--ck-connectbutton-balance-active-background":"#414144","--ck-primary-button-border-radius":"8px","--ck-primary-button-color":"#ffffff","--ck-primary-button-background":"rgba(255, 255, 255, 0.08)","--ck-primary-button-box-shadow":"inset 0 0 0 1px rgba(255, 255, 255, 0.05)","--ck-primary-button-hover-background":"rgba(255, 255, 255, 0.2)","--ck-secondary-button-border-radius":"8px","--ck-secondary-button-color":"#ffffff","--ck-secondary-button-background":"#363638","--ck-secondary-button-box-shadow":"inset 0 0 0 1px rgba(255, 255, 255, 0.05)","--ck-secondary-button-hover-background":"#3c3c3e","--ck-overlay-background":"rgba(0,0,0,0.4)","--ck-modal-box-shadow":"inset 0 0 0 1px #38393C, 0px 2px 4px rgba(0, 0, 0, 0.02)","--ck-focus-color":"#1A88F8","--ck-body-color":"#ffffff","--ck-body-color-muted":"#8B8F97","--ck-body-color-muted-hover":"#ffffff","--ck-body-background":"#1F2023","--ck-body-background-transparent":"rgba(31, 32, 35, 0)","--ck-body-background-secondary":"#313235","--ck-body-background-secondary-hover-background":"#e0e4eb","--ck-body-background-secondary-hover-outline":"rgba(255, 255, 255, 0.02)","--ck-body-background-tertiary":"#313235","--ck-tertiary-border-radius":"12px","--ck-tertiary-box-shadow":"inset 0 0 0 1px rgba(255, 255, 255, 0.02)","--ck-body-action-color":"#8B8F97","--ck-body-divider":"rgba(255,255,255,0.1)","--ck-body-color-danger":"#FF4E4E","--ck-body-color-valid":"#32D74B","--ck-body-disclaimer-background":"#2B2D31","--ck-body-disclaimer-box-shadow":"none","--ck-body-disclaimer-color":"#808183","--ck-body-disclaimer-link-color":"#AAABAD","--ck-body-disclaimer-link-hover-color":"#ffffff","--ck-copytoclipboard-stroke":"#CCCCCC","--ck-tooltip-background":"#1F2023","--ck-tooltip-background-secondary":"#1F2023","--ck-tooltip-color":"#ffffff","--ck-tooltip-shadow":" 0 0 0 1px rgba(255, 255, 255, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.02)","--ck-spinner-color":"var(--ck-focus-color)","--ck-dropdown-button-color":"#6C7381","--ck-dropdown-button-box-shadow":"inset 0 0 0 1px rgba(255, 255, 255, 0.05)","--ck-dropdown-button-background":"#313235","--ck-dropdown-pending-color":"#8B8F97","--ck-dropdown-active-color":"#FFF","--ck-dropdown-active-static-color":"#FFF","--ck-dropdown-active-background":"rgba(255, 255, 255, 0.07)","--ck-dropdown-color":"#8B8F97","--ck-dropdown-background":"#313235","--ck-dropdown-box-shadow":"inset 0 0 0 1px rgba(255, 255, 255, 0.03)","--ck-dropdown-border-radius":"8px","--ck-alert-color":"#8B8F97","--ck-alert-background":"#404145","--ck-alert-box-shadow":"inset 0 0 0 1px rgba(255, 255, 255, 0.02)","--ck-qr-border-radius":"12px","--ck-qr-dot-color":"#ffffff","--ck-qr-border-color":"rgba(255,255,255,0.1)"},minimal:{"--ck-font-family":'"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol"',"--ck-border-radius":"0px","--ck-connectbutton-font-size":"17px","--ck-connectbutton-border-radius":"0px","--ck-connectbutton-color":"#414451","--ck-connectbutton-background":"#ffffff","--ck-connectbutton-box-shadow":"inset 0 0 0 1px #EBEBEB","--ck-connectbutton-hover-color":"#111","--ck-connectbutton-hover-box-shadow":"inset 0 0 0 1px #111","--ck-connectbutton-balance-color":"#111111","--ck-connectbutton-balance-background":"#F7F7F7","--ck-connectbutton-balance-box-shadow":"inset 0 0 0 1px #F7F7F7","--ck-connectbutton-balance-hover-background":"#f1f1f3","--ck-connectbutton-balance-hover-box-shadow":"inset 0 0 0 1px #111","--ck-primary-button-border-radius":"0px","--ck-primary-button-color":"#111111","--ck-primary-button-background":"#ffffff","--ck-primary-button-box-shadow":"inset 0 0 0 1px #EBEBEB","--ck-primary-button-hover-box-shadow":"inset 0 0 0 1px #111111","--ck-secondary-button-border-radius":"0px","--ck-secondary-button-color":"#111111","--ck-secondary-button-background":"#ffffff","--ck-secondary-button-box-shadow":"inset 0 0 0 1px #EBEBEB","--ck-secondary-button-hover-box-shadow":"inset 0 0 0 1px #111111","--ck-dropdown-button-color":"#999999","--ck-dropdown-button-box-shadow":"0 0 0 1px rgba(0, 0, 0, 0.01), 0px 0px 7px rgba(0, 0, 0, 0.05)","--ck-dropdown-button-background":"#fff","--ck-dropdown-button-hover-color":"#8B8B8B","--ck-dropdown-button-hover-background":"#E7E7E7","--ck-focus-color":"#1A88F8","--ck-modal-box-shadow":"0px 3px 16px rgba(0, 0, 0, 0.08)","--ck-body-color":"#111111","--ck-body-color-muted":"#A0A0A0","--ck-body-color-muted-hover":"#000000","--ck-body-background":"#ffffff","--ck-body-background-transparent":"rgba(255,255,255,0)","--ck-body-background-secondary":"#f6f7f9","--ck-body-background-secondary-hover-background":"#e0e4eb","--ck-body-background-secondary-hover-outline":"#4282FF","--ck-body-background-tertiary":"#ffffff","--ck-tertiary-border-radius":"0px","--ck-tertiary-box-shadow":"inset 0 0 0 1px rgba(0, 0, 0, 0.04)","--ck-body-action-color":"#A0A0A0","--ck-body-divider":"#EBEBEB","--ck-body-color-danger":"#FF4E4E","--ck-body-color-valid":"#32D74B","--ck-body-disclaimer-background":"#FAFAFA","--ck-body-disclaimer-box-shadow":"inset 0 1px 0 0 #ECECEC","--ck-body-disclaimer-color":"#9D9D9D","--ck-body-disclaimer-link-color":"#6E6E6E","--ck-body-disclaimer-link-hover-color":"#000000","--ck-copytoclipboard-stroke":"#CCCCCC","--ck-tooltip-border-radius":"0px","--ck-tooltip-background":"#ffffff","--ck-tooltip-background-secondary":"#ffffff","--ck-tooltip-color":"#999999","--ck-tooltip-shadow":"0px 2px 10px rgba(0, 0, 0, 0.08)","--ck-spinner-color":"var(--ck-focus-color)","--ck-dropdown-active-border-radius":"0","--ck-dropdown-box-shadow":"0px 2px 15px rgba(0, 0, 0, 0.15)","--ck-dropdown-border-radius":"0","--ck-alert-color":"rgba(17, 17, 17, 0.4)","--ck-alert-background":"#fff","--ck-alert-box-shadow":"inset 0 0 0 1px #EBEBEB","--ck-alert-border-radius":"0","--ck-qr-border-radius":"0px","--ck-qr-dot-color":"#111111","--ck-qr-border-color":"#EBEBEB","--ck-modal-h1-font-weight":"400","--ck-modal-heading-font-weight":"400","--ck-primary-button-font-weight":"400","--ck-siwe-border":"#EBEBEB"},rounded:{"--ck-font-family":'"Nunito",ui-rounded,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol"',"--ck-border-radius":"24px","--ck-connectbutton-font-size":"17px","--ck-connectbutton-font-weight":"700","--ck-connectbutton-border-radius":"14px","--ck-connectbutton-color":"#000000","--ck-connectbutton-background":"#ffffff","--ck-connectbutton-box-shadow":"inset 0 0 0 2px #DFE4EC, 0 2px 0 0 #DFE4EC, 0px 2px 4px rgba(0, 0, 0, 0.02)","--ck-connectbutton-hover-background":"#F9FAFB","--ck-connectbutton-balance-color":"#414451","--ck-connectbutton-balance-background":"#F9FAFB","--ck-connectbutton-balance-box-shadow":"0 2px 0 0 #DFE4EC, 0px 2px 4px rgba(0, 0, 0, 0.02)","--ck-connectbutton-balance-hover-background":"#F5F7F9","--ck-connectbutton-balance-hover-box-shadow":"0 2px 0 0 #DFE4EC, 0px 2px 4px rgba(0, 0, 0, 0.02)","--ck-connectbutton-balance-active-box-shadow":"0 0 0 0 #DFE4EC, 0px 2px 4px rgba(0, 0, 0, 0.02)","--ck-connectbutton-active-background":"#F5F7F9","--ck-connectbutton-active-box-shadow":"inset 0 0 0 2px #CFD7E2, 0 0px 0 0 #CFD7E2, 0px 2px 4px rgba(0, 0, 0, 0.02)","--ck-primary-button-border-radius":"18px","--ck-primary-button-color":"#000000","--ck-primary-button-background":"#ffffff","--ck-primary-button-box-shadow":"inset 0 0 0 2px #DFE4EC, inset  0 -4px 0 0 #DFE4EC, 0px 2px 4px rgba(0, 0, 0, 0.02)","--ck-primary-button-hover-background":"#F5F7F9","--ck-primary-button-hover-box-shadow":"inset 0 0 0 2px #DFE4EC, inset  0 -2px 0 0 #DFE4EC, 0px 2px 4px rgba(0, 0, 0, 0.02)","--ck-secondary-button-border-radius":"16px","--ck-secondary-button-color":"#000000","--ck-secondary-button-background":"#ffffff","--ck-secondary-button-box-shadow":"inset 0 0 0 2px #DFE4EC, inset  0 -4px 0 0 #DFE4EC, 0px 2px 4px rgba(0, 0, 0, 0.02)","--ck-secondary-button-hover-background":"#F5F7F9","--ck-secondary-button-hover-box-shadow":"inset 0 0 0 2px #DFE4EC, inset  0 -2px 0 0 #DFE4EC, 0px 2px 4px rgba(0, 0, 0, 0.02)","--ck-focus-color":"#1A88F8","--ck-modal-box-shadow":"0px 3px 16px rgba(0, 0, 0, 0.08)","--ck-body-color":"#000000","--ck-body-color-muted":"#93989F","--ck-body-color-muted-hover":"#000000","--ck-body-background":"#ffffff","--ck-body-background-transparent":"rgba(255,255,255,0)","--ck-body-background-secondary":"#f6f7f9","--ck-body-background-secondary-hover-background":"#e0e4eb","--ck-body-background-secondary-hover-outline":"#4282FF","--ck-body-background-tertiary":"#ffffff","--ck-tertiary-border-radius":"22px","--ck-tertiary-box-shadow":"inset 0 0 0 2px #DFE4EC, 0px 2px 4px rgba(0, 0, 0, 0.02)","--ck-body-action-color":"#93989F","--ck-body-divider":"#DFE4EC","--ck-body-color-danger":"#FF4E4E","--ck-body-color-valid":"#32D74B","--ck-body-disclaimer-background":"#F9FAFB","--ck-body-disclaimer-font-size":"14px","--ck-body-disclaimer-font-weight":"700","--ck-body-disclaimer-color":"#959697","--ck-body-disclaimer-link-color":"#646464","--ck-body-disclaimer-link-hover-color":"#000000","--ck-copytoclipboard-stroke":"#CCCCCC","--ck-tooltip-background":"#ffffff","--ck-tooltip-background-secondary":"#ffffff","--ck-tooltip-color":"#999999","--ck-tooltip-shadow":" 0 0 0 2px #DFE4EC, 0px 2px 4px rgba(0, 0, 0, 0.02)","--ck-spinner-color":"var(--ck-focus-color)","--ck-dropdown-button-color":"#999999","--ck-dropdown-button-box-shadow":"0 0 0 2px #DFE4EC,  0 2px 0 2px #DFE4EC, 0px 2px 4px rgba(0, 0, 0, 0.02)","--ck-dropdown-button-background":"#fff","--ck-dropdown-button-hover-color":"#8B8B8B","--ck-dropdown-button-hover-background":"#F5F7F9","--ck-dropdown-pending-color":"#848D9A","--ck-dropdown-active-color":"#000000","--ck-dropdown-active-static-color":"#848D9A","--ck-dropdown-active-background":"#F5F7F9","--ck-dropdown-color":"#848D9A","--ck-dropdown-background":"#FFFFFF","--ck-dropdown-box-shadow":"0px 2px 15px rgba(0, 0, 0, 0.15)","--ck-dropdown-border-radius":"16px","--ck-alert-color":"#848D9A","--ck-alert-background":"#F5F7F9","--ck-qr-border-radius":"24px","--ck-qr-dot-color":"#111111","--ck-qr-border-color":"#DFE4EC","--ck-modal-h1-font-weight":"700","--ck-modal-heading-font-weight":"700","--ck-primary-button-font-weight":"700","--ck-siwe-border":"#DFE4EC"},nouns:{"--ck-font-family":'"PT Root UI",ui-rounded,"Nunito",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol"',"--ck-border-radius":"24px","--ck-connectbutton-font-size":"16px","--ck-connectbutton-font-weight":"700","--ck-connectbutton-border-radius":"10px","--ck-connectbutton-color":"#151C3B","--ck-connectbutton-background":"#ffffff","--ck-connectbutton-box-shadow":"inset 0 0 0 1px #D6D8E1","--ck-connectbutton-hover-background":"#E9EBF3","--ck-connectbutton-hover-box-shadow":"inset 0 0 0 1px #D4D8E8","--ck-connectbutton-active-background":"#D4D8E8","--ck-connectbutton-active-box-shadow":"inset 0 0 0 1px #D4D8E8","--ck-connectbutton-balance-color":"#373737","--ck-connectbutton-balance-background":"#F6F7F9","--ck-connectbutton-balance-box-shadow":"none","--ck-connectbutton-balance-hover-background":"#f1f1f3","--ck-primary-button-border-radius":"16px","--ck-primary-button-color":"#151C3B","--ck-primary-button-background":"#ffffff","--ck-primary-button-font-weight":"700","--ck-primary-button-hover-background":"#DEE1ED","--ck-secondary-button-border-radius":"16px","--ck-secondary-button-color":"#151C3B","--ck-secondary-button-background":"#ffffff","--ck-secondary-button-font-weight":"700","--ck-secondary-button-hover-background":"#DEE1ED","--ck-focus-color":"#1A88F8","--ck-modal-box-shadow":"0px 2px 4px rgba(0, 0, 0, 0.02)","--ck-overlay-background":"rgba(213, 215, 225, 0.8)","--ck-overlay-backdrop-filter":"blur(6px)","--ck-body-color":"#151C3B","--ck-body-color-muted":"#757A8E","--ck-body-color-muted-hover":"#000000","--ck-body-background":"#F4F4F8","--ck-body-background-transparent":"rgba(255,255,255,0)","--ck-body-background-secondary":"#E9E9F1","--ck-body-background-secondary-hover-background":"#e0e4eb","--ck-body-background-tertiary":"#E9E9F1","--ck-tertiary-border-radius":"24px","--ck-body-action-color":"#79809C","--ck-body-divider":"#D9DBE3","--ck-body-color-danger":"#FF4E4E","--ck-body-color-valid":"#32D74B","--ck-body-disclaimer-background":"#F9FAFA","--ck-body-disclaimer-color":"#AFB1B6","--ck-body-disclaimer-link-color":"#787B84","--ck-body-disclaimer-link-hover-color":"#000000","--ck-copytoclipboard-stroke":"#79809C","--ck-tooltip-background":"#ffffff","--ck-tooltip-background-secondary":"#ffffff","--ck-tooltip-color":"#999999","--ck-tooltip-shadow":"0px 2px 10px rgba(0, 0, 0, 0.08)","--ck-spinner-color":"var(--ck-focus-color)","--ck-dropdown-button-color":"#999999","--ck-dropdown-button-box-shadow":"0 0 0 1px rgba(0, 0, 0, 0.01), 0px 0px 7px rgba(0, 0, 0, 0.05)","--ck-dropdown-button-background":"#fff","--ck-dropdown-button-hover-color":"#8B8B8B","--ck-dropdown-button-hover-background":"#DEE1ED","--ck-dropdown-button-hover-box-shadow":"0px 0px 7px rgba(0, 0, 0, 0.05)","--ck-dropdown-color":"#757A8E","--ck-dropdown-box-shadow":"0 0 0 1px rgba(0, 0, 0, 0.01), 0px 0px 7px rgba(0, 0, 0, 0.05)","--ck-alert-color":"#9196A1","--ck-alert-background":"#F6F8FA","--ck-alert-box-shadow":"inset 0 0 0 1px rgba(0, 0, 0, 0.04)","--ck-alert-border-radius":"8px","--ck-qr-border-radius":"24px","--ck-qr-dot-color":"#000000","--ck-qr-background":"#ffffff","--ck-siwe-border":"#DFE4EC","--ck-graphic-primary-background":"#fff","--ck-graphic-compass-background":"#fff","--ck-graphic-primary-box-shadow":"0px 2.94737px 14.7368px rgba(0, 0, 0, 0.1)","--ck-graphic-compass-box-shadow":"0px 2px 9px rgba(0, 0, 0, 0.15)"}};const qb={default:{"--ck-font-family":"-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,\n    'Apple Color Emoji', Arial, sans-serif, 'Segoe UI Emoji',\n    'Segoe UI Symbol'","--ck-border-radius":"20px","--ck-secondary-button-border-radius":"16px"},graphics:{light:{"--ck-graphic-wave-stop-01":"#E8F17D","--ck-graphic-wave-stop-02":"#A8ECDE","--ck-graphic-wave-stop-03":"#7AA1F2","--ck-graphic-wave-stop-04":"#DEA1E8","--ck-graphic-wave-stop-05":"#F46D98","--ck-graphic-scaniconwithlogos-01":"#4E4E4E","--ck-graphic-scaniconwithlogos-02":"#272727","--ck-graphic-scaniconwithlogos-03":"#F8D74A","--ck-graphic-scaniconwithlogos-04":"#F6F7F9","--ck-chain-ethereum-01":"#25292E","--ck-chain-ethereum-02":"#fff","--ck-chain-ethereum-03":"#DFE0E0"},dark:{"--ck-graphic-wave-stop-01":"#E8F17D","--ck-graphic-wave-stop-02":"#A8ECDE","--ck-graphic-wave-stop-03":"#7AA1F2","--ck-graphic-wave-stop-04":"#DEA1E8","--ck-graphic-wave-stop-05":"#F46D98","--ck-graphic-scaniconwithlogos-01":"#AFAFAF","--ck-graphic-scaniconwithlogos-02":"#696969","--ck-graphic-scaniconwithlogos-03":"#F8D74A","--ck-graphic-scaniconwithlogos-04":"#3D3D3D"}},ens:{light:{"--ck-ens-01-start":"#FF3B30","--ck-ens-01-stop":"#FF9500","--ck-ens-02-start":"#FF9500","--ck-ens-02-stop":"#FFCC00","--ck-ens-03-start":"#FFCC00","--ck-ens-03-stop":"#34C759","--ck-ens-04-start":"#5856D6","--ck-ens-04-stop":"#AF52DE","--ck-ens-05-start":"#5AC8FA","--ck-ens-05-stop":"#007AFF","--ck-ens-06-start":"#007AFF","--ck-ens-06-stop":"#5856D6","--ck-ens-07-start":"#5856D6","--ck-ens-07-stop":"#AF52DE","--ck-ens-08-start":"#AF52DE","--ck-ens-08-stop":"#FF2D55"},dark:{"--ck-ens-01-start":"#FF453A","--ck-ens-01-stop":"#FF9F0A","--ck-ens-02-start":"#FF9F0A","--ck-ens-02-stop":"#FFD60A","--ck-ens-03-start":"#FFD60A","--ck-ens-03-stop":"#32D74B","--ck-ens-04-start":"#32D74B","--ck-ens-04-stop":"#64D2FF","--ck-ens-05-start":"#64D2FF","--ck-ens-05-stop":"#0A84FF","--ck-ens-06-start":"#0A84FF","--ck-ens-06-stop":"#5E5CE6","--ck-ens-07-start":"#5E5CE6","--ck-ens-07-stop":"#BF5AF2","--ck-ens-08-start":"#BF5AF2","--ck-ens-08-stop":"#FF2D55"}},brand:{"--ck-family-brand":"#1A88F8","--ck-brand-walletConnect":"#3B99FC","--ck-brand-coinbaseWallet":"#0052FF","--ck-brand-metamask":"#f6851b","--ck-brand-metamask-01":"#F6851B","--ck-brand-metamask-02":"#E2761B","--ck-brand-metamask-03":"#CD6116","--ck-brand-metamask-04":"#161616","--ck-brand-metamask-05":"#763D16","--ck-brand-metamask-06":"#D7C1B3","--ck-brand-metamask-07":"#C0AD9E","--ck-brand-metamask-08":"#E4761B","--ck-brand-metamask-09":"#233447","--ck-brand-metamask-10":"#E4751F","--ck-brand-metamask-11":"#FEF5E7","--ck-brand-metamask-12":"#E3C8AB","--ck-brand-trust-01":"#3375BB","--ck-brand-trust-02":"#ffffff","--ck-brand-trust-01b":"#ffffff","--ck-brand-trust-02b":"#3375BB","--ck-brand-argent":"#f36a3d","--ck-brand-imtoken-01":"#11C4D1","--ck-brand-imtoken-02":"#0062AD"}},Vb=(e,t)=>ny`
    ${Object.keys(e).map((t=>{const r=e[t];return r&&`${t}:${r};`}))}
  `,Wb={light:Zb.base.light,dark:Zb.base.dark,web95:Zb.web95,retro:Zb.retro,soft:Zb.soft,midnight:Zb.midnight,minimal:Zb.minimal,rounded:Zb.rounded,nouns:Zb.nouns},$b=(e,t)=>{const r=t?" !important":"";return ny`
    ${Object.keys(e).map((t=>{const n=e[t];return n&&`${t}:${n}${r};`}))}
    @supports (color: color(display-p3 1 1 1)) {
      ${Object.keys(e).map((t=>`${t}:${(e=>{const t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return null==t?e:`color(display-p3 ${parseInt(t[1],16)/255} ${parseInt(t[2],16)/255} ${parseInt(t[3],16)/255})`})(e[t])}${r};`))}
    }
  `},Kb={default:Vb(qb.default),light:$b(Wb.light),dark:$b(Wb.dark),web95:$b(Wb.web95),retro:$b(Wb.retro),soft:$b(Wb.soft),midnight:$b(Wb.midnight),minimal:$b(Wb.minimal),rounded:$b(Wb.rounded),nouns:$b(Wb.nouns)},Gb=Vb(qb.brand),Jb=Vb(qb.ens.light),Yb=Vb(qb.ens.dark),Xb=Vb(qb.graphics.light),Qb=Vb(qb.graphics.dark),ew=ny`
  ${Gb}
  ${Jb}
  ${Xb}
`,tw=ny`
  ${Gb}
  ${Yb}
  ${Qb}
`;let rw="auto";const nw=ub(Mg.div)`
  ${Kb.default}

  ${e=>{switch(e.$useTheme){case"web95":return rw="light",Kb.web95;case"retro":return rw="light",Kb.retro;case"soft":return rw="light",Kb.soft;case"midnight":return rw="dark",Kb.midnight;case"minimal":return rw="light",Kb.minimal;case"rounded":return rw="light",Kb.rounded;case"nouns":return rw="light",Kb.nouns;default:return"light"===e.$useMode?(rw="light",Kb.light):"dark"===e.$useMode?(rw="dark",Kb.dark):ny`
            @media (prefers-color-scheme: light) {
              ${Kb.light}
            }
            @media (prefers-color-scheme: dark) {
              ${Kb.dark}
            }
          `}}}

  ${e=>{switch(rw){case"light":return ew;case"dark":return tw;default:return ny`
          ${ew}
          @media (prefers-color-scheme: dark) {
            ${tw}
          }
        `}}}


  ${e=>{if(e.$customTheme)return $b(e.$customTheme,!0)}}

  all: initial;
  text-align: left;
  text-direction: ltr;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-text-stroke: 0.001px transparent;
  text-size-adjust: none;
  font-size: 16px;

  button {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-text-stroke: 0.001px transparent;
  }

  &,
  * {
    font-family: var(--ck-font-family);
    box-sizing: border-box;
    outline: none;
    border: none;
  }
  /*
  @media (prefers-reduced-motion) {
    * {
      animation-duration: 60ms !important;
      transition-duration: 60ms !important;
    }
  }
  */
  img,
  svg {
    max-width: 100%;
  }
  strong {
    font-weight: 600;
  }
  a:focus-visible,
  button:focus-visible {
    outline: 2px solid var(--ck-focus-color);
  }
`,iw=e=>{let{...t}=e;return(0,un.jsx)("svg",{"aria-hidden":"true",width:"22",height:"22",viewBox:"0 0 22 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",...t,children:(0,un.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11ZM22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11ZM11.6445 12.7051C11.6445 13.1348 11.3223 13.4678 10.7744 13.4678C10.2266 13.4678 9.92578 13.1885 9.92578 12.6191V12.4795C9.92578 11.4268 10.4951 10.8574 11.2686 10.3203C12.2031 9.67578 12.665 9.32129 12.665 8.59082C12.665 7.76367 12.0205 7.21582 11.043 7.21582C10.3232 7.21582 9.80762 7.57031 9.45312 8.16113C9.38282 8.24242 9.32286 8.32101 9.2667 8.39461C9.04826 8.68087 8.88747 8.8916 8.40039 8.8916C8.0459 8.8916 7.66992 8.62305 7.66992 8.15039C7.66992 7.96777 7.70215 7.7959 7.75586 7.61328C8.05664 6.625 9.27051 5.75488 11.1182 5.75488C12.9336 5.75488 14.5234 6.71094 14.5234 8.50488C14.5234 9.7832 13.7822 10.417 12.7402 11.1045C11.999 11.5986 11.6445 11.9746 11.6445 12.5762V12.7051ZM11.9131 15.5625C11.9131 16.1855 11.376 16.6797 10.7529 16.6797C10.1299 16.6797 9.59277 16.1748 9.59277 15.5625C9.59277 14.9395 10.1191 14.4453 10.7529 14.4453C11.3867 14.4453 11.9131 14.9287 11.9131 15.5625Z",fill:"currentColor"})})},ow=e=>{let{...t}=e;return(0,un.jsxs)(Mg.svg,{width:14,height:14,viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",...t,children:[(0,un.jsx)("path",{d:"M1 13L13 1",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,un.jsx)("path",{d:"M1 0.999999L13 13",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})},aw=e=>{let{...t}=e;return(0,un.jsx)(Mg.svg,{width:9,height:16,viewBox:"0 0 9 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",...t,children:(0,un.jsx)("path",{d:"M8 1L1 8L8 15",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})},sw=.22,uw={initial:{zIndex:2,opacity:0},animate:{opacity:1,scale:1,transition:{duration:.165,delay:.055,ease:[.26,.08,.25,1]}},exit:{zIndex:1,opacity:0,pointerEvents:"none",position:"absolute",left:["50%","50%"],x:["-50%","-50%"],transition:{duration:sw,ease:[.26,.08,.25,1]}}},cw=e=>{let{open:r,pages:n,pageId:i,positionInside:o,inline:a,onClose:s,onBack:u,onInfo:c}=e;const l=Wx(),f=ob(),[d,h]=Ay({timeout:160,preEnter:!0,mountOnEnter:!0,unmountOnExit:!0}),p=!("exited"===d||"unmounted"===d),m="preEnter"===d||"exiting"!==d,g=l.route===qx.CONNECTORS?0:1,v=function(e,r){const n=(0,t.useRef)({target:e,previous:r});return n.current.target!==e&&(n.current.previous=n.current.target,n.current.target=e),n.current.previous}(g,g);(0,t.useEffect)((()=>{h(r),r&&x(void 0)}),[r]);const[y,b]=(0,t.useState)({width:void 0,height:void 0}),[w,x]=(0,t.useState)(void 0),k=e=>{const t={width:null===e||void 0===e?void 0:e.offsetWidth,height:null===e||void 0===e?void 0:e.offsetHeight};b({width:`${null===t||void 0===t?void 0:t.width}px`,height:`${null===t||void 0===t?void 0:t.height}px`})};let E;const A=(0,t.useCallback)((e=>{e&&(S.current=e,x(void 0!==w),clearTimeout(E),E=setTimeout((()=>x(!1)),360),k(e))}),[r,w]),S=(0,t.useRef)(null);(0,t.useEffect)((()=>{S.current&&k(S.current)}),[f]),(0,t.useEffect)((()=>{if(!p)return void b({width:void 0,height:void 0});const e=e=>{"Escape"===e.key&&s&&s()};return document.addEventListener("keydown",e),()=>{document.removeEventListener("keydown",e)}}),[p,s]);const M={"--height":y.height,"--width":y.width};const C=(0,un.jsx)(nw,{$useTheme:l.theme,$useMode:l.mode,$customTheme:l.customTheme,children:(0,un.jsxs)(jb,{role:"dialog",style:{pointerEvents:m?"auto":"none",position:o?"absolute":void 0},children:[!a&&(0,un.jsx)(Ab,{$active:m,onClick:s}),(0,un.jsxs)(Db,{style:M,initial:!1,children:[(0,un.jsx)("div",{style:{pointerEvents:w?"all":"none",position:"absolute",top:0,bottom:0,left:"50%",transform:"translateX(-50%)",width:"var(--width)",zIndex:9,transition:"width 200ms ease"}}),(0,un.jsxs)(Pb,{className:`${m&&"active"}`,children:[(0,un.jsx)(Og,{initial:!1,children:l.errorMessage&&(0,un.jsxs)(lb,{initial:{y:"10%",x:"-50%"},animate:{y:"-100%"},exit:{y:"100%"},transition:{duration:.2,ease:"easeInOut"},children:[(0,un.jsx)("span",{children:l.errorMessage}),(0,un.jsx)("div",{onClick:()=>console.log("click"),style:{position:"absolute",right:24,top:24},children:(0,un.jsx)(ow,{})})]})}),(0,un.jsxs)(Tb,{children:[s&&(0,un.jsx)(Bb,{"aria-label":"close",onClick:s,children:(0,un.jsx)(ow,{})}),(0,un.jsx)("div",{style:{position:"absolute",top:23,left:20,width:32,height:32},children:(0,un.jsx)(Og,{children:u?(0,un.jsx)(Nb,{disabled:w,"aria-label":"back",onClick:u,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:f?0:.1,delay:f?.01:0},children:(0,un.jsx)(aw,{})},"backButton"):l.route===qx.PROFILE&&c&&(0,un.jsx)(Fb,{disabled:w,"aria-label":"more info",onClick:c,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:f?0:.1,delay:f?.01:0},children:(0,un.jsx)(iw,{})},"infoButton")})})]}),(0,un.jsx)(bb,{children:(0,un.jsx)(Og,{children:(0,un.jsx)(Mg.div,{style:{position:"absolute",top:0,bottom:0,left:52,right:52,display:"flex",justifyContent:"center"},initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:f?0:.17,delay:f?.01:0},children:(0,un.jsx)(Hb,{children:function(){switch(l.route){case qx.CONNECTORS:return"Connectors";case qx.PROFILE:return"Profile";default:return""}}()})},`${l.route}-''}`)})}),(0,un.jsx)(Ob,{children:Object.keys(n).map((e=>{const t=n[e];return(0,un.jsx)(lw,{open:e===i,initial:!o&&"entered"!==d,enterAnim:e===i?g>v?"active-scale-up":"active":"",exitAnim:e!==i?g<v?"exit-scale-down":"exit":"",children:(0,un.jsx)(Rb,{ref:A,style:{pointerEvents:e===i&&m?"auto":"none"},children:t},`inner-${e}`)},e)}))})]})]})]})});return(0,un.jsx)(un.Fragment,{children:p&&(0,un.jsx)(un.Fragment,{children:o?C:(0,un.jsx)(un.Fragment,{children:(0,un.jsx)(rb,{children:(0,un.jsx)(Lb,{children:C})})})})})},lw=e=>{let{children:r,open:n,initial:i,enterAnim:o,exitAnim:a}=e;const[s,u]=Ay({timeout:400,preEnter:!0,initialEntered:n,mountOnEnter:!0,unmountOnExit:!0}),c=!("exited"===s||"unmounted"===s),l="preEnter"===s||"exiting"!==s;return(0,t.useEffect)((()=>{u(n)}),[n]),c?(0,un.jsx)(Ib,{className:`${l?o:a}`,style:{animationDuration:i?"0ms":void 0,animationDelay:i?"0ms":void 0},children:r}):null},fw=e=>{let{children:t}=e;return(0,un.jsx)(yb,{children:(0,un.jsx)("span",{children:null!==t&&void 0!==t?t:"or"})})};var dw=e=>{let{...t}=e;return(0,un.jsx)("svg",{...t,version:"1.0",xmlns:"http://www.w3.org/2000/svg",width:"36.000000pt",height:"36.000000pt",viewBox:"0 0 108.000000 108.000000",preserveAspectRatio:"xMidYMid meet",children:(0,un.jsxs)("g",{transform:"translate(0.000000,108.000000) scale(0.100000,-0.100000)",fill:"#000000",stroke:"none",children:[(0,un.jsx)("path",{d:"M655 871 l-30 -6 -3 -108 -3 -109 31 6 c16 3 44 9 60 12 l30 6 0 104\n0 104 -27 -1 c-16 -1 -41 -4 -58 -8z"}),(0,un.jsx)("path",{d:"M381 831 c-19 -3 -36 -10 -37 -16 -2 -5 54 -136 124 -290 l128 -280\n64 3 c35 1 68 6 73 11 5 5 -48 133 -120 292 l-129 284 -34 1 c-19 1 -50 -1\n-69 -5z"}),(0,un.jsx)("path",{d:"M390 426 l-55 -11 -3 -114 -3 -114 52 7 c90 12 90 12 87 133 -2 60\n-7 107 -13 109 -5 1 -35 -3 -65 -10z"})]})})},hw=e=>{let{background:t=!1,...r}=e;return(0,un.jsx)("svg",{...r,"aria-hidden":"true",width:"32",height:"32",viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:t?{background:"var(--ck-brand-walletConnect)"}:void 0,children:(0,un.jsx)("path",{d:"M9.58818 11.8556C13.1293 8.31442 18.8706 8.31442 22.4117 11.8556L22.8379 12.2818C23.015 12.4588 23.015 12.7459 22.8379 12.9229L21.3801 14.3808C21.2915 14.4693 21.148 14.4693 21.0595 14.3808L20.473 13.7943C18.0026 11.3239 13.9973 11.3239 11.5269 13.7943L10.8989 14.4223C10.8104 14.5109 10.6668 14.5109 10.5783 14.4223L9.12041 12.9645C8.94336 12.7875 8.94336 12.5004 9.12041 12.3234L9.58818 11.8556ZM25.4268 14.8706L26.7243 16.1682C26.9013 16.3452 26.9013 16.6323 26.7243 16.8093L20.8737 22.6599C20.6966 22.8371 20.4096 22.8371 20.2325 22.6599L16.0802 18.5076C16.0359 18.4634 15.9641 18.4634 15.9199 18.5076L11.7675 22.6599C11.5905 22.8371 11.3034 22.8371 11.1264 22.66C11.1264 22.66 11.1264 22.6599 11.1264 22.6599L5.27561 16.8092C5.09856 16.6322 5.09856 16.3451 5.27561 16.168L6.57313 14.8706C6.75019 14.6934 7.03726 14.6934 7.21431 14.8706L11.3668 19.023C11.411 19.0672 11.4828 19.0672 11.5271 19.023L15.6793 14.8706C15.8563 14.6934 16.1434 14.6934 16.3205 14.8706L20.473 19.023C20.5172 19.0672 20.589 19.0672 20.6332 19.023L24.7856 14.8706C24.9627 14.6935 25.2498 14.6935 25.4268 14.8706Z",fill:t?"white":"var(--ck-brand-walletConnect)"})})};let pw=[];"undefined"!=typeof window&&(pw=[{id:"injected",name:"Extension Wallet",shortName:"Browser",logos:{default:(0,un.jsx)(dw,{}),mobile:(0,un.jsx)("div",{style:{padding:5,background:"var(--ck-body-background-tertiary)",borderRadius:"27%",boxShadow:"inset 0 0 0 1px rgba(0, 0, 0, 0.02)"},children:(0,un.jsx)("div",{style:{transform:"scale(0.75)",position:"relative",width:"100%"},children:(0,un.jsx)(dw,{})})}),transparent:(0,un.jsx)(dw,{})},scannable:!1,extensionIsInstalled:()=>Boolean(window.alephiumProviders)},{id:"walletConnect",name:"WalletConnect",shortName:"WalletConnect",logos:{default:(0,un.jsx)(hw,{}),mobile:(0,un.jsx)("div",{style:{padding:5,background:"var(--ck-body-background-secondary)",borderRadius:"21%",boxShadow:"inset 0 0 0 1px rgba(0, 0, 0, 0.02)"},children:(0,un.jsx)(hw,{})}),transparent:(0,un.jsx)(hw,{background:!1}),connectorButton:(0,un.jsx)(hw,{}),qrCode:(0,un.jsx)(hw,{background:!0})},logoBackground:"var(--ck-brand-walletConnect)",scannable:!0,defaultConnect:()=>{}}]);var mw=pw;const gw=ub(Mg.div)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 0 16px;
`,vw=ub(Mg.button)`
  cursor: pointer;
  user-select: none;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 64px;
  font-size: 17px;
  font-weight: var(--ck-primary-button-font-weight, 500);
  line-height: 20px;
  text-align: var(--ck-body-button-text-align, left);
  transition: 180ms ease;
  transition-property: background, color, box-shadow, transform;
  will-change: transform, box-shadow, background-color, color;

  --fallback-color: var(--ck-primary-button-color);
  --fallback-background: var(--ck-primary-button-background);
  --fallback-box-shadow: var(--ck-primary-button-box-shadow);
  --fallback-border-radius: var(--ck-primary-button-border-radius);

  --color: var(--ck-primary-button-color, var(--fallback-color));
  --background: var(--ck-primary-button-background, var(--fallback-background));
  --box-shadow: var(--ck-primary-button-box-shadow, var(--fallback-box-shadow));
  --border-radius: var(
    --ck-primary-button-border-radius,
    var(--fallback-border-radius)
  );

  --hover-color: var(--ck-primary-button-hover-color, var(--color));
  --hover-background: var(
    --ck-primary-button-hover-background,
    var(--background)
  );
  --hover-box-shadow: var(
    --ck-primary-button-hover-box-shadow,
    var(--box-shadow)
  );
  --hover-border-radius: var(
    --ck-primary-button-hover-border-radius,
    var(--border-radius)
  );

  --active-color: var(--ck-primary-button-active-color, var(--hover-color));
  --active-background: var(
    --ck-primary-button-active-background,
    var(--hover-background)
  );
  --active-box-shadow: var(
    --ck-primary-button-active-box-shadow,
    var(--hover-box-shadow)
  );
  --active-border-radius: var(
    --ck-primary-button-active-border-radius,
    var(--hover-border-radius)
  );

  color: var(--color);
  background: var(--background);
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);

  &:disabled {
    transition: 180ms ease;
  }

  &:not(:disabled) {
    &:hover {
      color: var(--hover-color);
      background: var(--hover-background);
      box-shadow: var(--hover-box-shadow);
      border-radius: var(--hover-border-radius);
    }
    &:focus-visible {
      transition-duration: 100ms;
      color: var(--hover-color);
      background: var(--hover-background);
      box-shadow: var(--hover-box-shadow);
      border-radius: var(--hover-border-radius);
    }
    &:active {
      color: var(--active-color);
      background: var(--active-background);
      box-shadow: var(--active-box-shadow);
      border-radius: var(--active-border-radius);
    }
  }
`,yw=ub(Mg.span)`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 38px;
`,bw=ub(Mg.div)`
  position: absolute;
  right: 20px;
  width: 32px;
  height: 32px;
  overflow: hidden;
  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`,ww=ub(Mg.div)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 14px 0 28px;
  margin: 0 0;
`,xw=ub(Mg.button)`
  --background: var(--ck-body-background-secondary);
  cursor: pointer;
  user-select: none;
  position: relative;
  padding: 0;
  width: 100%;
  min-width: 25%;
  font-size: 13px;
  font-weight: 500;
  line-height: 13px;
  text-align: center;
  transition: transform 100ms ease;

  background: none;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  &:not(:disabled) {
    &:active {
      transform: scale(0.97);
    }
  }
`,kw=ub(Mg.span)`
  display: block;
  padding: 10px 0 0;
  color: var(--ck-body-color);
  opacity: 0.75;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`,Ew=ub(Mg.div)`
  margin: 0 auto;
  width: 60px;
  height: 60px;
  overflow: hidden;
  svg {
    border-radius: inherit;
    display: block;
    position: relative;
    transform: translate3d(0, 0, 0);
    width: 100%;
    height: 100%;
  }
`,Aw=e=>{const t="undefined"!==typeof window,r=ob()&&!t;return{id:"injected",name:"Extension Wallet",shortName:"browser",scannable:!1,logos:{default:(0,un.jsx)(dw,{})},installed:Boolean(!r&&t)}};function Sw(){return(e=>{let{}=e;return[Aw(),{id:"walletConnect",name:"Other Wallets",logos:{default:(0,un.jsx)(hw,{}),mobile:(0,un.jsx)(hw,{}),transparent:(0,un.jsx)(hw,{background:!1}),connectorButton:(0,un.jsx)(hw,{}),qrCode:(0,un.jsx)(hw,{background:!0})},logoBackground:"var(--ck-brand-walletConnect)",scannable:!0}]})({})}const Mw=()=>{const e=Wx(),t=ob(),r=Sw(),n=e=>{let t=e.split(/[(),]+/);t.shift(),t=t.map((e=>e.trim()));const n=t.filter((e=>r.map((e=>e.name)).includes(e)?e:null));if(0===n.length)return null;return r.filter((e=>e.installed&&e.name===n[0]))[0]};return(0,un.jsx)(vb,{style:{width:312},children:t?(0,un.jsx)(un.Fragment,{children:(0,un.jsx)(ww,{children:mw.map((t=>{var r,i,o,a,s,u;const c=mw.filter((e=>e.id===t.id))[0];if(!c)return null;let l=c.logos,f=null!==(i=null!==(r=c.shortName)&&void 0!==r?r:c.name)&&void 0!==i?i:t.name;if("injected"===c.id){const e=n(null!==(o=t.name)&&void 0!==o?o:"");e&&(l=e.logos,f=e.name.replace(" Wallet",""))}return"walletConnect"===c.id&&(f="Wallet Connect"),(0,un.jsxs)(xw,{onClick:()=>{e.setRoute(qx.CONNECT),e.setConnector(t.id)},children:[(0,un.jsx)(Ew,{children:null!==(u=null!==(s=null!==(a=l.mobile)&&void 0!==a?a:l.appIcon)&&void 0!==s?s:l.connectorButton)&&void 0!==u?u:l.default}),(0,un.jsx)(kw,{children:f})]},`m-${t.id}`)}))})}):(0,un.jsx)(un.Fragment,{children:(0,un.jsx)(gw,{children:mw.map((t=>{var r,i,o;const a=mw.filter((e=>e.id===t.id))[0];if(!a)return null;let s=a.logos,u=null!==(r=a.name)&&void 0!==r?r:t.name;if("walletConnect"===a.id&&(u="Wallet Connect"),"injected"===a.id){const e=n(null!==(i=t.name)&&void 0!==i?i:"");e&&(s=e.logos,u=e.name)}let c=null!==(o=s.connectorButton)&&void 0!==o?o:s.default;return a.extensionIsInstalled&&s.appIcon&&a.extensionIsInstalled()&&(c=s.appIcon),(0,un.jsxs)(vw,{disabled:e.route!==qx.CONNECTORS,onClick:()=>{e.setRoute(qx.CONNECT),e.setConnector(t.id)},children:[(0,un.jsx)(bw,{children:c}),(0,un.jsx)(yw,{children:u})]},t.id)}))})})})},Cw=ub(Mg.div)`
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  left: 0;
  right: 0;
  ${xb} {
    padding: 0 8px 32px;
    gap: 12px;
  }
`,_w=by`
  0%{ transform:none; }
  25%{ transform:translateX(${2}px); }
  50%{ transform:translateX(-${2}px); }
  75%{ transform:translateX(${2}px); }
  100%{ transform:none; }
`,Pw=by`
  0%{ opacity:1; }
  100%{ opacity:0; }
`,Tw=ub(Mg.div)`
  /*
  background: var(
    --ck-body-background
  ); // To stop the overlay issue during transition for the squircle spinner
  */
`,Ow=ub(Mg.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto 16px;
  height: 120px;
  //transform: scale(1.001); // fixes shifting issue between states
`,Iw=ub(Mg.div)`
  user-select: none;
  position: relative;
  --spinner-error-opacity: 0;
  &:before {
    content: '';
    position: absolute;
    inset: -5px;
    opacity: 0;
    background: var(--ck-body-color-danger);
    ${e=>e.$circle&&ny`
        border-radius: 50%;
        background: none;
        box-shadow: inset 0 0 0 3.5px var(--ck-body-color-danger);
      `}
  }
  ${e=>e.$shake&&ny`
      animation: ${_w} 220ms ease-out both;
      &:before {
        animation: ${Pw} 220ms ease-out 750ms both;
      }
    `}
`,Rw=ub(Mg.button)`
  z-index: 5;
  appearance: none;
  position: absolute;
  right: 2px;
  bottom: 2px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  cursor: pointer;
  overflow: hidden;
  background: none;

  color: var(--ck-body-background);
  transition: color 200ms ease;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);

  &:before {
    z-index: 3;
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 200ms ease;
    background: var(--ck-body-color);
  }

  &:hover:before {
    opacity: 0.1;
  }
`,jw=ub(Mg.div)`
  position: absolute;
  inset: 0;

  &:before {
    z-index: 1;
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 16px;
    background: conic-gradient(
      from 90deg,
      currentColor 10%,
      var(--ck-body-color) 80%
    );
  }

  svg {
    z-index: 2;
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
  }
`,Bw=by`
  0%{ transform: rotate(0deg); }
  100%{ transform: rotate(360deg); }
`,Nw=ub(Mg.div)`
  position: absolute;
  right: 16px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${Bw} 1s linear infinite;
  svg {
    display: block;
    position: relative;
    animation: ${Bw} 1s ease-in-out infinite;
  }
`,Fw=ub.svg`
  --x: -3px;
  --stroke-width: 2;
  position: relative;
  top: 1px;
  left: -0.5px;
  display: inline-block;
  vertical-align: middle;
  margin-left: 9px;
  margin-right: 1px;
  transition: all 100ms ease;
  transform: translateX(var(--x, -3px));
  color: var(--ck-secondary-button-color, var(--ck-body-color));
  opacity: 0.4;
`,Dw=ub.path``,Lw=ub.line`
  transition: inherit;
  transition-property: transform;
  transform-origin: 90% 50%;
  transform: scaleX(0.1);
`,Uw=ub.div`
  display: inline-block;
  vertical-align: middle;
  position: relative;
  margin-right: 6px;
  color: var(--ck-secondary-button-color, var(--ck-body-color));
`,zw=ub.div`
  transform: rotate(90deg);
  ${Fw} {
    margin: 0 auto;
  }
`,Hw=ub(Mg.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  inset: 0;
  height: 100%;
`,Zw=ub.button`

  ${e=>{let{disabled:t}=e;return t&&ny`
      cursor: not-allowed;
      pointer-events: none;
    `}}

  ${e=>{let{$variant:t}=e;return"primary"===t?ny`
        --color: var(--ck-primary-button-color, var(--ck-body-color));
        --background: var(
          --ck-primary-button-background,
          var(--ck-body-background-primary)
        );
        --box-shadow: var(--ck-primary-button-box-shadow);
        --border-radius: var(--ck-primary-button-border-radius);
        --font-weight: var(--ck-primary-button-font-weight, 500);

        --hover-color: var(--ck-button-primary-hover-color, var(--color));
        --hover-background: var(
          --ck-primary-button-hover-background,
          var(--background)
        );
        --hover-box-shadow: var(
          --ck-primary-button-hover-box-shadow,
          var(--box-shadow)
        );
        --hover-border-radius: var(
          --ck-primary-button-hover-border-radius,
          var(--border-radius)
        );
        --hover-font-weight: var(
          --ck-primary-button-font-weight,
          var(--font-weight)
        );
      `:"secondary"===t?ny`
        --color: var(--ck-secondary-button-color, var(--ck-body-color));
        --background: var(
          --ck-secondary-button-background,
          var(--ck-body-background-secondary)
        );
        --box-shadow: var(--ck-secondary-button-box-shadow);
        --border-radius: var(--ck-secondary-button-border-radius);
        --font-weight: var(--ck-secondary-button-font-weight, 500);

        --hover-color: var(--ck-secondary-button-hover-color, var(--color));
        --hover-background: var(
          --ck-secondary-button-hover-background,
          var(--background)
        );
        --hover-box-shadow: var(
          --ck-secondary-button-hover-box-shadow,
          var(--box-shadow)
        );
        --hover-border-radius: var(
          --ck-secondary-button-hover-border-radius,
          var(--border-radius)
        );
        --hover-font-weight: var(
          --ck-secondary-button-font-weight,
          var(--font-weight)
        );
      `:"tertiary"===t?ny`
        --color: var(
          --ck-tertiary-button-color,
          var(--ck-secondary-button-color)
        );
        --background: var(
          --ck-tertiary-button-background,
          var(--ck-secondary-button-background)
        );
        --box-shadow: var(
          --ck-tertiary-button-box-shadow,
          var(--ck-secondary-button-box-shadow)
        );
        --border-radius: var(
          --ck-tertiary-button-border-radius,
          var(--ck-secondary-button-border-radius)
        );
        --font-weight: var(
          --ck-tertiary-button-font-weight,
          var(--ck-secondary-button-font-weight)
        );

        --hover-color: var(
          --button-tertiary-hover-color,
          var(--ck-tertiary-button-color)
        );
        --hover-background: var(
          --ck-tertiary-button-hover-background,
          var(--ck-tertiary-button-background)
        );
        --hover-box-shadow: var(
          --ck-tertiary-button-hover-box-shadow,
          var(--ck-tertiary-button-box-shadow)
        );
        --hover-border-radius: var(
          --ck-tertiary-button-hover-border-radius,
          var(--ck-tertiary-button-border-radius, var(--border-radius))
        );
        --hover-font-weight: var(
          --ck-tertiary-button-font-weight,
          var(--ck-secondary-button-font-weight)
        );
      `:void 0}}

  appearance: none;
  cursor: pointer;
  user-select: none;
  min-width: fit-content;
  width: 100%;
  display:block;
  text-align: center;
  height: 48px;
  margin: 12px 0 0;
  line-height: 48px;
  padding: 0 4px;
  font-size: 16px;
  font-weight: var(--font-weight,500);
  text-decoration: none;
  white-space: nowrap;
  transition: 100ms ease;
  transition-property: box-shadow, background-color;
  color: var(--color);
  background: var(--background);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  will-change: transform, box-shadow, background-color, color;

  ${Uw} {
    ${Fw} {
      transform: translateX(0);
      ${Lw} {
        transform: none;
      }
      ${Dw} {
      }
    }
  }
}

  @media only screen and (min-width: ${cb+1}px) {
    &:hover,
    &:focus-visible {
      color: var(--ck-accent-text-color, var(--hover-color));
      background: var(--ck-accent-color, var(--hover-background));
      border-radius: var(--hover-border-radius);
      box-shadow: var(--hover-box-shadow);

      ${Fw} {
        transform: translateX(0);
        ${Lw} {
          transform: none;
        }
        ${Dw} {
        }
      }
      ${Uw} {
        ${Fw} {
          transform: translateX(var(--x));
          ${Lw} {
            transform: scaleX(0.1);
          }
          ${Dw} {
          }
        }
      }
    }
    &:active {
      box-shadow: var(--ck-secondary-button-active-box-shadow, var(--hover-box-shadow));
    }
  }
  @media only screen and (max-width: ${cb}px) {
    transition: transform 100ms ease;
    transform: scale(1);
    font-size: 17px;
    &:active {
    }
  }
`,qw=ub.div`
  transform: translateZ(0); // Shifting fix
  position: relative;
  display: inline-block;
  vertical-align: middle;
  max-width: calc(100% - 42px);
  /*
  overflow: hidden;
  text-overflow: ellipsis;
  */
`,Vw=ub(Mg.div)`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  max-width: 20px;
  max-height: 20px;
  margin: 0 10px;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  ${e=>e.$rounded&&ny`
        overflow: hidden;
        border-radius: 5px;
      `}
  svg {
    display: block;
    position: relative;
    max-width: 100%;
    height: auto;
  }
`,Ww={duration:.4,ease:[.175,.885,.32,.98]},$w=()=>(0,un.jsx)(Nw,{initial:{opacity:0,rotate:180},animate:{opacity:1,rotate:0},exit:{position:"absolute",opacity:0,rotate:-180,transition:{...Ww}},transition:{...Ww,delay:.2},children:(0,un.jsxs)("svg",{width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,un.jsx)("circle",{cx:"9",cy:"9",r:"7",stroke:"currentColor",strokeOpacity:"0.1",strokeWidth:"2.5"}),(0,un.jsx)("path",{d:"M16 9C16 5.13401 12.866 2 9 2",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round"})]})}),Kw=e=>{let{children:t,variant:r="secondary",disabled:n,icon:i,iconPosition:o="left",roundedIcon:a,waiting:s,arrow:u,download:c,href:l,style:f,onClick:d}=e;const h="string"===typeof t?t:ab(t).join(""),p="string"===typeof l?l:ab(l).join("");return(0,un.jsx)(Zw,{as:l?"a":void 0,onClick:e=>{!n&&d&&d(e)},href:p,target:l&&"_blank",rel:l&&"noopener noreferrer",disabled:n,$variant:r,style:f,children:(0,un.jsxs)(Og,{initial:!1,children:[(0,un.jsxs)(Hw,{initial:{opacity:0,y:-10},animate:{opacity:1,y:-1},exit:{position:"absolute",opacity:0,y:10,transition:{...Ww}},transition:{...Ww,delay:.2},children:[i&&"left"===o&&(0,un.jsx)(Vw,{$rounded:a,children:i}),c&&(0,un.jsx)(Uw,{children:(0,un.jsx)(zw,{children:(0,un.jsxs)(Fw,{width:"13",height:"12",viewBox:"0 0 13 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,un.jsx)(Lw,{stroke:"currentColor",x1:"1",y1:"6",x2:"12",y2:"6",strokeWidth:"var(--stroke-width)",strokeLinecap:"round"}),(0,un.jsx)(Dw,{stroke:"currentColor",d:"M7.51431 1.5L11.757 5.74264M7.5 10.4858L11.7426 6.24314",strokeWidth:"var(--stroke-width)",strokeLinecap:"round"})]})})}),(0,un.jsx)(qw,{style:{paddingLeft:u?6:0},children:(0,un.jsx)(Hb,{children:t})}),i&&"right"===o&&(0,un.jsx)(Vw,{$rounded:a,children:i}),u&&(0,un.jsxs)(Fw,{width:"13",height:"12",viewBox:"0 0 13 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,un.jsx)(Lw,{stroke:"currentColor",x1:"1",y1:"6",x2:"12",y2:"6",strokeWidth:"2",strokeLinecap:"round"}),(0,un.jsx)(Dw,{stroke:"currentColor",d:"M7.51431 1.5L11.757 5.74264M7.5 10.4858L11.7426 6.24314",strokeWidth:"2",strokeLinecap:"round"})]})]},h),s&&(0,un.jsx)($w,{})]})})},Gw=ub(Mg.div)`
  z-index: 2147483647;
  position: fixed;
  inset: 0;
  pointer-events: none;
`,Jw=ub(Mg.div)`
  --shadow: var(--ck-tooltip-shadow);
  z-index: 2147483647;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  gap: 8px;
  width: fit-content;
  align-items: center;
  justify-content: center;
  border-radius: var(
    --ck-tooltip-border-radius,
    ${e=>"small"===e.$size?11:14}px
  );
  border-radius: ;
  padding: 10px 16px 10px 12px;
  font-size: 14px;
  line-height: 19px;
  font-weight: 500;
  letter-spacing: -0.1px;
  color: var(--ck-tooltip-color);
  background: var(--ck-tooltip-background);
  box-shadow: var(--shadow);
  > span {
    z-index: 3;
    position: relative;
  }
  > div {
    margin: -4px 0; // offset for icon
  }
  strong {
    color: var(--ck-spinner-color);
  }

  .ck-tt-logo {
    display: inline-block;
    vertical-align: text-bottom;
    height: 1em;
    width: 1.25em;
    svg {
      display: block;
      height: 100%;
      transform: translate(0.5px, -1px) scale(1.75);
    }
  }
`,Yw=ub(Mg.div)`
  z-index: 2;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${e=>"small"===e.$size?14:18}px;
  right: 100%;
  top: 0;
  bottom: 0;
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    box-shadow: var(--shadow);
    width: ${e=>"small"===e.$size?14:18}px;
    height: ${e=>"small"===e.$size?14:18}px;
    transform: translate(75%, 0) rotate(45deg);
    background: var(--ck-tooltip-background);
    border-radius: ${e=>"small"===e.$size?2:3}px 0 0 0;
  }
`,Xw=e=>{let{children:r,message:n,open:i,xOffset:o=0,yOffset:a=0,delay:s}=e;const u=Wx(),[c,l]=(0,t.useState)(!1),[f,d]=(0,t.useState)(!1),[h,p]=(0,t.useState)("small"),[m,g]=(0,t.useState)(!1),[v]=(0,t.useState)(u.route),y=(0,t.useRef)(null),[b,w]=Gy({debounce:m?0:220,offsetSize:!0,scroll:!0});return("undefined"!==typeof window?t.useLayoutEffect:t.useEffect)((()=>{if(!y.current||w.top+w.bottom+w.left+w.right+w.height+w.width===0)return;const e=o+w.left+w.width,t=a+w.top+.5*w.height;m||0===e||0===t||g(!0),y.current.style.left=`${e}px`,y.current.style.top=`${t}px`,p(y.current.offsetHeight<=40?"small":"large"),d((()=>{let e=!1;const t=o+w.left+w.width,r=a+w.top+.5*w.height;return(t>window.innerWidth||t<0||r>window.innerHeight||r<0)&&(e=!0),e})())}),[w,i,c]),(0,t.useEffect)((()=>{u.open||l(!1)}),[u.open]),(0,t.useEffect)((()=>{l(!!i)}),[i]),(0,un.jsxs)(un.Fragment,{children:[(0,un.jsx)(Mg.div,{ref:b,style:void 0===i?{cursor:"help"}:{},onHoverStart:()=>l(!0),onHoverEnd:()=>l(!1),onClick:()=>l(!1),children:r}),(0,un.jsx)(rb,{children:(0,un.jsx)(Og,{children:v===u.route&&!f&&c&&(0,un.jsx)(nw,{$useTheme:u.theme,$useMode:u.mode,$customTheme:u.customTheme,children:(0,un.jsx)(Gw,{children:(0,un.jsxs)(Jw,{role:"tooltip",$size:h,ref:y,initial:"collapsed",animate:m?"open":{},exit:"collapsed",variants:{collapsed:{transformOrigin:"20px 50%",opacity:0,scale:.9,z:.01,y:"-50%",x:20,transition:{duration:.1}},open:{willChange:"opacity,transform",opacity:1,scale:1,z:.01,y:"-50%",x:20,transition:{ease:[.76,0,.24,1],duration:.15,delay:s||.5}}},children:[n,(0,un.jsx)(Yw,{$size:h})]})})})})})]})},Qw=ub(Mg.div)`
  display: flex;
  gap: 8px;
  position: relative;
  border-radius: 9px;
  margin: 0 auto;
  padding: 10px;
  text-align: left;
  font-size: 14px;
  line-height: 17px;
  font-weight: 400;
  max-width: 260px;
  min-width: 100%;

  border-radius: var(--ck-alert-border-radius, 12px);
  color: var(--ck-alert-color, var(--ck-body-color-muted));
  background: var(--ck-alert-background, var(--ck-body-background-secondary));
  box-shadow: var(--ck-alert-box-shadow, var(--ck-body-box-shadow));

  @media only screen and (max-width: ${cb}px) {
    padding: 16px;
    font-size: 16px;
    line-height: 21px;
    border-radius: 24px;
    text-align: center;
  }
`,ex=ub(Mg.div)`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`,tx=t.forwardRef(((e,t)=>{let{children:r,icon:n}=e;return(0,un.jsxs)(Qw,{children:[n&&(0,un.jsx)(ex,{children:n}),(0,un.jsx)("div",{children:r})]})}));tx.displayName="Alert";const rx=ub(Mg.div)`
  z-index: 4;
  position: relative;
  width: 100px;
  height: 100px;
  svg {
    z-index: 3;
    position: relative;
    display: block;
  }
`,nx=ub(Mg.div)`
  z-index: 2;
  position: absolute;
  //overflow: hidden;
  inset: 6px;
  border-radius: 50px;
  background: var(--ck-body-background);
  display: flex;
  align-items: center;
  justify-content: center;
  svg,
  img {
    pointer-events: none;
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    ${e=>e.$small&&ny`
        width: 60%;
        height: 60%;
      `}
  }
`,ix=ub(Mg.div)`
  position: absolute;
  inset: -5px;
`,ox=ub(Mg.div)`
  pointer-events: none;
  user-select: none;
  z-index: 1;
  position: absolute;
  inset: -25%;
  background: var(--ck-body-background);
  div:first-child {
    position: absolute;
    left: 50%;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    &:before {
      position: absolute;
      content: '';
      inset: 0;
      background: var(--ck-spinner-color);
      transform-origin: 0% 50%;
      animation: rotateExpiringSpinner 5000ms ease-in both;
    }
  }
  div:last-child {
    position: absolute;
    left: 0;
    right: 50%;
    top: 0;
    bottom: 0;
    overflow: hidden;
    &:before {
      position: absolute;
      content: '';
      inset: 0;
      background: var(--ck-spinner-color);
      transform-origin: 100% 50%;
      animation: rotateExpiringSpinner 5000ms ease-out 5000ms both;
    }
  }
  @keyframes rotateExpiringSpinner {
    0% {
      transform: rotate(-180deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`,ax=ub(Mg.div)`
  pointer-events: none;
  user-select: none;
  z-index: 1;
  position: absolute;
  inset: 0;
  svg {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    animation: rotateSpinner 1200ms linear infinite;
  }
  @keyframes rotateSpinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`,sx=e=>{let{logo:t,smallLogo:r,connecting:n=!0,unavailable:i=!1,countdown:o=!1}=e;return(0,un.jsxs)(rx,{transition:{duration:.5,ease:[.175,.885,.32,.98]},children:[(0,un.jsx)(nx,{$small:!i&&r,style:i?{borderRadius:0}:void 0,children:t}),(0,un.jsx)(ix,{children:(0,un.jsxs)(Og,{children:[n&&(0,un.jsx)(ax,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,transition:{duration:o?1:0}},children:(0,un.jsxs)("svg",{"aria-hidden":"true",width:"102",height:"102",viewBox:"0 0 102 102",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,un.jsx)("path",{d:"M52 100C24.3858 100 2 77.6142 2 50",stroke:"url(#paint0_linear_1943_4139)",strokeWidth:"3.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,un.jsx)("defs",{children:(0,un.jsxs)("linearGradient",{id:"paint0_linear_1943_4139",x1:"2",y1:"48.5",x2:"53",y2:"100",gradientUnits:"userSpaceOnUse",children:[(0,un.jsx)("stop",{stopColor:"var(--ck-spinner-color)"}),(0,un.jsx)("stop",{offset:"1",stopColor:"var(--ck-spinner-color)",stopOpacity:"0"})]})})]})},"Spinner"),o&&(0,un.jsxs)(ox,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.25},children:[(0,un.jsx)("div",{}),(0,un.jsx)("div",{})]},"ExpiringSpinner")]})})]})},ux=e=>{let{...t}=e;return(0,un.jsx)("svg",{"aria-hidden":"true",width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,un.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M0 2.82561C0 1.26507 1.26507 0 2.82561 0H4.59161C6.15215 0 7.41722 1.26507 7.41722 2.82561V4.59161C7.41722 6.15215 6.15215 7.41722 4.59161 7.41722H2.82561C1.26507 7.41722 0 6.15215 0 4.59161V2.82561ZM2.82561 1.69536C2.20139 1.69536 1.69536 2.20139 1.69536 2.82561V4.59161C1.69536 5.21583 2.20139 5.72185 2.82561 5.72185H4.59161C5.21583 5.72185 5.72185 5.21583 5.72185 4.59161V2.82561C5.72185 2.20139 5.21583 1.69536 4.59161 1.69536H2.82561ZM0 11.4084C0 9.84791 1.26507 8.58284 2.82561 8.58284H4.59161C6.15215 8.58284 7.41722 9.8479 7.41722 11.4084V13.1744C7.41722 14.735 6.15215 16.0001 4.59161 16.0001H2.82561C1.26507 16.0001 0 14.735 0 13.1744V11.4084ZM2.82561 10.2782C2.20139 10.2782 1.69536 10.7842 1.69536 11.4084V13.1744C1.69536 13.7987 2.20139 14.3047 2.82561 14.3047H4.59161C5.21583 14.3047 5.72185 13.7987 5.72185 13.1744V11.4084C5.72185 10.7842 5.21583 10.2782 4.59161 10.2782H2.82561ZM11.4083 0C9.84779 0 8.58272 1.26507 8.58272 2.82561V4.59161C8.58272 6.15215 9.84779 7.41722 11.4083 7.41722H13.1743C14.7349 7.41722 15.9999 6.15215 15.9999 4.59161V2.82561C15.9999 1.26507 14.7349 0 13.1743 0H11.4083ZM10.2781 2.82561C10.2781 2.20139 10.7841 1.69536 11.4083 1.69536H13.1743C13.7985 1.69536 14.3046 2.20139 14.3046 2.82561V4.59161C14.3046 5.21583 13.7985 5.72185 13.1743 5.72185H11.4083C10.7841 5.72185 10.2781 5.21583 10.2781 4.59161V2.82561ZM15.7351 9.96026C15.7351 10.7795 15.0709 11.4437 14.2516 11.4437C13.4323 11.4437 12.7682 10.7795 12.7682 9.96026C12.7682 9.14098 13.4323 8.47682 14.2516 8.47682C15.0709 8.47682 15.7351 9.14098 15.7351 9.96026ZM9.96026 11.4437C10.7795 11.4437 11.4437 10.7795 11.4437 9.96026C11.4437 9.14098 10.7795 8.47682 9.96026 8.47682C9.14098 8.47682 8.47682 9.14098 8.47682 9.96026C8.47682 10.7795 9.14098 11.4437 9.96026 11.4437ZM15.7351 14.2517C15.7351 15.071 15.0709 15.7352 14.2516 15.7352C13.4323 15.7352 12.7682 15.071 12.7682 14.2517C12.7682 13.4325 13.4323 12.7683 14.2516 12.7683C15.0709 12.7683 15.7351 13.4325 15.7351 14.2517ZM9.96026 15.7352C10.7795 15.7352 11.4437 15.071 11.4437 14.2517C11.4437 13.4325 10.7795 12.7683 9.96026 12.7683C9.14098 12.7683 8.47682 13.4325 8.47682 14.2517C8.47682 15.071 9.14098 15.7352 9.96026 15.7352Z",fill:"currentColor",fillOpacity:"0.3"})})},cx=e=>{let{...t}=e;return(0,un.jsxs)("svg",{"aria-hidden":"true",width:"19",height:"18",viewBox:"0 0 19 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",...t,children:[(0,un.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M6.81753 1.60122C7.39283 0.530035 8.46953 0 9.50409 0C10.5507 0 11.6022 0.539558 12.1805 1.59767L18.6047 13.3334C18.882 13.8283 19 14.3568 19 14.8622C19 16.5296 17.7949 18 15.9149 18H3.08514C1.20508 18 0 16.5296 0 14.8622C0 14.3454 0.131445 13.8172 0.405555 13.3379L6.81753 1.60122ZM9.50409 2C9.13355 2 8.77256 2.18675 8.57866 2.54907L8.57458 2.5567L2.14992 14.3166L2.144 14.3268C2.04638 14.4959 2 14.6817 2 14.8622C2 15.5497 2.43032 16 3.08514 16H15.9149C16.5697 16 17 15.5497 17 14.8622C17 14.6681 16.9554 14.4805 16.8588 14.309L16.8529 14.2986L10.4259 2.55741C10.2191 2.1792 9.86395 2 9.50409 2Z",fill:"currentColor"}),(0,un.jsx)("path",{d:"M9.5 11.2297C9.01639 11.2297 8.7459 10.9419 8.72951 10.4186L8.60656 6.4157C8.59016 5.88372 8.95902 5.5 9.4918 5.5C10.0164 5.5 10.4016 5.89244 10.3852 6.42442L10.2623 10.4099C10.2377 10.9419 9.96721 11.2297 9.5 11.2297ZM9.5 14.5C8.95082 14.5 8.5 14.0901 8.5 13.5058C8.5 12.9215 8.95082 12.5116 9.5 12.5116C10.0492 12.5116 10.5 12.9128 10.5 13.5058C10.5 14.0988 10.041 14.5 9.5 14.5Z",fill:"currentColor"})]})},lx=e=>{let{...t}=e;return(0,un.jsx)("svg",{"aria-hidden":"true",width:"15",height:"14",viewBox:"0 0 15 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{left:0,top:0},...t,children:(0,un.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M4 0C1.79086 0 0 1.79086 0 4V10C0 12.2091 1.79086 14 4 14H6C6.55228 14 7 13.5523 7 13C7 12.4477 6.55228 12 6 12H4C2.89543 12 2 11.1046 2 10V4C2 2.89543 2.89543 2 4 2H6C6.55228 2 7 1.55228 7 1C7 0.447715 6.55228 0 6 0H4ZM11.7071 3.29289C11.3166 2.90237 10.6834 2.90237 10.2929 3.29289C9.90237 3.68342 9.90237 4.31658 10.2929 4.70711L11.5858 6H9.5H6C5.44772 6 5 6.44772 5 7C5 7.55228 5.44772 8 6 8H9.5H11.5858L10.2929 9.29289C9.90237 9.68342 9.90237 10.3166 10.2929 10.7071C10.6834 11.0976 11.3166 11.0976 11.7071 10.7071L14.7071 7.70711C15.0976 7.31658 15.0976 6.68342 14.7071 6.29289L11.7071 3.29289Z",fill:"currentColor",fillOpacity:"0.4"})})},fx=e=>{let{...t}=e;return(0,un.jsx)("svg",{"aria-hidden":"true",width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",...t,children:(0,un.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM13.274 7.13324C13.6237 6.70579 13.5607 6.07577 13.1332 5.72604C12.7058 5.37632 12.0758 5.43932 11.726 5.86676L7.92576 10.5115L6.20711 8.79289C5.81658 8.40237 5.18342 8.40237 4.79289 8.79289C4.40237 9.18342 4.40237 9.81658 4.79289 10.2071L7.29289 12.7071C7.49267 12.9069 7.76764 13.0128 8.04981 12.9988C8.33199 12.9847 8.59505 12.8519 8.77396 12.6332L13.274 7.13324Z",fill:"currentColor"})})},dx=e=>{let{...t}=e;return(0,un.jsx)("svg",{"aria-hidden":"true",width:"32",height:"32",viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg",...t,children:(0,un.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16ZM24.5001 8.74263C25.0834 8.74263 25.5563 9.21551 25.5563 9.79883V14.5997C25.5563 15.183 25.0834 15.6559 24.5001 15.6559H19.6992C19.1159 15.6559 18.643 15.183 18.643 14.5997C18.643 14.0164 19.1159 13.5435 19.6992 13.5435H21.8378L20.071 11.8798C20.0632 11.8724 20.0555 11.865 20.048 11.8574C19.1061 10.915 17.8835 10.3042 16.5643 10.1171C15.2452 9.92999 13.9009 10.1767 12.7341 10.82C11.5674 11.4634 10.6413 12.4685 10.0955 13.684C9.54968 14.8994 9.41368 16.2593 9.70801 17.5588C10.0023 18.8583 10.711 20.0269 11.7273 20.8885C12.7436 21.7502 14.0124 22.2582 15.3425 22.336C16.6726 22.4138 17.9919 22.0572 19.1017 21.3199C19.5088 21.0495 19.8795 20.7333 20.2078 20.3793C20.6043 19.9515 21.2726 19.9262 21.7004 20.3228C22.1282 20.7194 22.1534 21.3876 21.7569 21.8154C21.3158 22.2912 20.8176 22.7161 20.2706 23.0795C18.7793 24.0702 17.0064 24.5493 15.2191 24.4448C13.4318 24.3402 11.7268 23.6576 10.3612 22.4998C8.9956 21.3419 8.0433 19.7716 7.6478 18.0254C7.2523 16.2793 7.43504 14.4519 8.16848 12.8186C8.90192 11.1854 10.1463 9.83471 11.7142 8.97021C13.282 8.10572 15.0884 7.77421 16.861 8.02565C18.6282 8.27631 20.2664 9.09278 21.5304 10.3525L23.4439 12.1544V9.79883C23.4439 9.21551 23.9168 8.74263 24.5001 8.74263Z",fill:"currentColor"})})},hx=e=>{let{...t}=e;return(0,un.jsxs)("svg",{"aria-hidden":"true",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...t,children:[(0,un.jsx)("path",{d:"M14 9.5V7C14 5.89543 13.1046 5 12 5H7C5.89543 5 5 5.89543 5 7V12C5 13.1046 5.89543 14 7 14H9.5",stroke:"var(--ck-body-color-muted)",strokeWidth:"2"}),(0,un.jsx)("rect",{x:"10",y:"10",width:"9",height:"9",rx:"2",stroke:"var(--ck-body-color-muted)",strokeWidth:"2"}),(0,un.jsx)("path",{d:"M1 3L3 5L7 1",stroke:"var(--ck-body-color)",strokeWidth:"1.75",strokeLinecap:"round",strokeLinejoin:"round"})]})},px=ub(Mg.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 32px;
  max-height: 32px;
  width: 100%;
  height: 100%;
  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;var mx={Chrome:(0,un.jsxs)("svg",{"aria-hidden":"true",width:20,height:20,viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,un.jsx)("g",{filter:"url(#filter0_ii_927_5781)",children:(0,un.jsxs)("g",{clipPath:"url(#clip0_927_5781)",children:[(0,un.jsx)("path",{d:"M1.58771 0V12.2727H6.06498L10.0002 5.45455H20.0002V0H1.58771Z",fill:"#DB4437"}),(0,un.jsx)("path",{d:"M1.58771 0V12.2727H6.06498L10.0002 5.45455H20.0002V0H1.58771Z",fill:"url(#paint0_linear_927_5781)"}),(0,un.jsx)("path",{d:"M6.17038 12.2272L1.64538 4.46582L1.57947 4.57946L6.07265 12.284L6.17038 12.2272Z",fill:"black",fillOpacity:"0.15"}),(0,un.jsx)("path",{d:"M0 20.0003H9.51932L13.9375 15.5821V12.273H6.0625L0 1.87305V20.0003Z",fill:"#0F9D58"}),(0,un.jsx)("path",{d:"M0 20.0003H9.51932L13.9375 15.5821V12.273H6.0625L0 1.87305V20.0003Z",fill:"url(#paint1_linear_927_5781)"}),(0,un.jsx)("path",{d:"M13.8412 12.4208L13.7469 12.3662L9.38324 19.9969H9.51392L13.8435 12.4242L13.8412 12.4208Z",fill:"#263238",fillOpacity:"0.15"}),(0,un.jsx)("path",{d:"M10.0006 5.45459L13.9381 12.2728L9.51996 20H20.0006V5.45459H10.0006Z",fill:"#FFCD40"}),(0,un.jsx)("path",{d:"M10.0006 5.45459L13.9381 12.2728L9.51996 20H20.0006V5.45459H10.0006Z",fill:"url(#paint2_linear_927_5781)"}),(0,un.jsx)("path",{d:"M9.9996 5.45459L13.9371 12.2728L9.51892 20H19.9996V5.45459H9.9996Z",fill:"#FFCD40"}),(0,un.jsx)("path",{d:"M9.9996 5.45459L13.9371 12.2728L9.51892 20H19.9996V5.45459H9.9996Z",fill:"url(#paint3_linear_927_5781)"}),(0,un.jsx)("path",{d:"M1.58691 0V12.2727H6.06419L9.99941 5.45455H19.9994V0H1.58691Z",fill:"#DB4437"}),(0,un.jsx)("path",{d:"M1.58691 0V12.2727H6.06419L9.99941 5.45455H19.9994V0H1.58691Z",fill:"url(#paint4_linear_927_5781)"}),(0,un.jsx)("path",{d:"M10 5.45459V7.83527L18.9091 5.45459H10Z",fill:"url(#paint5_radial_927_5781)"}),(0,un.jsx)("path",{d:"M0 19.9998H9.51932L11.9318 15.9089L13.9375 12.2726H6.0625L0 1.87256V19.9998Z",fill:"#0F9D58"}),(0,un.jsx)("path",{d:"M0 19.9998H9.51932L12.1023 15.5112L13.9375 12.2726H6.0625L0 1.87256V19.9998Z",fill:"url(#paint6_linear_927_5781)"}),(0,un.jsx)("path",{d:"M1.58771 4.59668L8.09339 11.1012L6.06384 12.2728L1.58771 4.59668Z",fill:"url(#paint7_radial_927_5781)"}),(0,un.jsx)("path",{d:"M9.52661 19.9884L11.9084 11.1021L13.938 12.2725L9.52661 19.9884Z",fill:"url(#paint8_radial_927_5781)"}),(0,un.jsx)("path",{d:"M10.0003 14.5455C12.5107 14.5455 14.5458 12.5104 14.5458 10C14.5458 7.48966 12.5107 5.45459 10.0003 5.45459C7.48996 5.45459 5.4549 7.48966 5.4549 10C5.4549 12.5104 7.48996 14.5455 10.0003 14.5455Z",fill:"#F1F1F1"}),(0,un.jsx)("path",{d:"M9.99995 13.6365C12.0083 13.6365 13.6363 12.0084 13.6363 10.0001C13.6363 7.99183 12.0083 6.36377 9.99995 6.36377C7.99164 6.36377 6.36359 7.99183 6.36359 10.0001C6.36359 12.0084 7.99164 13.6365 9.99995 13.6365Z",fill:"#4285F4"}),(0,un.jsx)("path",{d:"M10.0003 5.34082C7.48899 5.34082 5.4549 7.37491 5.4549 9.88628V9.99991C5.4549 7.48855 7.48899 5.45446 10.0003 5.45446H20.0003V5.34082H10.0003Z",fill:"black",fillOpacity:"0.2"}),(0,un.jsx)("path",{d:"M13.9318 12.273C13.1455 13.6299 11.6818 14.5458 10 14.5458C8.31818 14.5458 6.85227 13.6299 6.06818 12.273H6.06364L0 1.87305V1.98668L6.06818 12.3867C6.85455 13.7435 8.31818 14.6594 10 14.6594C11.6818 14.6594 13.1455 13.7446 13.9318 12.3867H13.9375V12.273H13.9307H13.9318Z",fill:"white",fillOpacity:"0.1"}),(0,un.jsx)("path",{opacity:"0.1",d:"M10.1133 5.45459C10.094 5.45459 10.0758 5.45686 10.0565 5.458C12.5406 5.48868 14.5452 7.50913 14.5452 10C14.5452 12.491 12.5406 14.5114 10.0565 14.5421C10.0758 14.5421 10.094 14.5455 10.1133 14.5455C12.6247 14.5455 14.6588 12.5114 14.6588 10C14.6588 7.48868 12.6247 5.45459 10.1133 5.45459Z",fill:"black"}),(0,un.jsx)("path",{d:"M13.9769 12.4204C14.3632 11.7522 14.5871 10.9795 14.5871 10.1522C14.5874 9.68602 14.5157 9.22262 14.3746 8.77832C14.4826 9.16696 14.5451 9.57377 14.5451 9.99764C14.5451 10.8249 14.3212 11.5976 13.9348 12.2658L13.9371 12.2704L9.51892 19.9976H9.65074L13.9769 12.4204Z",fill:"white",fillOpacity:"0.2"}),(0,un.jsx)("path",{d:"M10 0.113636C15.5034 0.113636 19.9682 4.56023 20 10.0568C20 10.0375 20.0011 10.0193 20.0011 10C20.0011 4.47727 15.5239 0 10.0011 0C4.47841 0 0 4.47727 0 10C0 10.0193 0.00113639 10.0375 0.00113639 10.0568C0.0318182 4.56023 4.49659 0.113636 10 0.113636Z",fill:"white",fillOpacity:"0.2"}),(0,un.jsx)("path",{d:"M10 19.8865C15.5034 19.8865 19.9682 15.4399 20 9.94336C20 9.96268 20.0011 9.98086 20.0011 10.0002C20.0011 15.5229 15.5239 20.0002 10.0011 20.0002C4.47841 20.0002 0 15.5229 0 10.0002C0 9.98086 0.00113639 9.96268 0.00113639 9.94336C0.0318182 15.4399 4.49659 19.8865 10.0011 19.8865H10Z",fill:"black",fillOpacity:"0.15"})]})}),(0,un.jsxs)("defs",{children:[(0,un.jsxs)("filter",{id:"filter0_ii_927_5781",x:0,y:"-0.235294",width:20,height:"20.4706",filterUnits:"userSpaceOnUse",colorInterpolationFilters:"sRGB",children:[(0,un.jsx)("feFlood",{floodOpacity:0,result:"BackgroundImageFix"}),(0,un.jsx)("feBlend",{mode:"normal",in:"SourceGraphic",in2:"BackgroundImageFix",result:"shape"}),(0,un.jsx)("feColorMatrix",{in:"SourceAlpha",type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",result:"hardAlpha"}),(0,un.jsx)("feOffset",{dy:"0.235294"}),(0,un.jsx)("feGaussianBlur",{stdDeviation:"0.235294"}),(0,un.jsx)("feComposite",{in2:"hardAlpha",operator:"arithmetic",k2:-1,k3:1}),(0,un.jsx)("feColorMatrix",{type:"matrix",values:"0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"}),(0,un.jsx)("feBlend",{mode:"normal",in2:"shape",result:"effect1_innerShadow_927_5781"}),(0,un.jsx)("feColorMatrix",{in:"SourceAlpha",type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",result:"hardAlpha"}),(0,un.jsx)("feOffset",{dy:"-0.235294"}),(0,un.jsx)("feGaussianBlur",{stdDeviation:"0.235294"}),(0,un.jsx)("feComposite",{in2:"hardAlpha",operator:"arithmetic",k2:-1,k3:1}),(0,un.jsx)("feColorMatrix",{type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"}),(0,un.jsx)("feBlend",{mode:"normal",in2:"effect1_innerShadow_927_5781",result:"effect2_innerShadow_927_5781"})]}),(0,un.jsxs)("linearGradient",{id:"paint0_linear_927_5781",x1:"2.42521",y1:"7.61591",x2:"8.39112",y2:"4.13068",gradientUnits:"userSpaceOnUse",children:[(0,un.jsx)("stop",{stopColor:"#A52714",stopOpacity:"0.6"}),(0,un.jsx)("stop",{offset:"0.66",stopColor:"#A52714",stopOpacity:0})]}),(0,un.jsxs)("linearGradient",{id:"paint1_linear_927_5781",x1:"11.6932",y1:"17.7844",x2:"5.06136",y2:"13.8981",gradientUnits:"userSpaceOnUse",children:[(0,un.jsx)("stop",{stopColor:"#055524",stopOpacity:"0.4"}),(0,un.jsx)("stop",{offset:"0.33",stopColor:"#055524",stopOpacity:0})]}),(0,un.jsxs)("linearGradient",{id:"paint2_linear_927_5781",x1:"12.9438",y1:"4.75004",x2:"14.6143",y2:"12.0569",gradientUnits:"userSpaceOnUse",children:[(0,un.jsx)("stop",{stopColor:"#EA6100",stopOpacity:"0.3"}),(0,un.jsx)("stop",{offset:"0.66",stopColor:"#EA6100",stopOpacity:0})]}),(0,un.jsxs)("linearGradient",{id:"paint3_linear_927_5781",x1:"12.9428",y1:"4.75004",x2:"14.6132",y2:"12.0569",gradientUnits:"userSpaceOnUse",children:[(0,un.jsx)("stop",{stopColor:"#EA6100",stopOpacity:"0.3"}),(0,un.jsx)("stop",{offset:"0.66",stopColor:"#EA6100",stopOpacity:0})]}),(0,un.jsxs)("linearGradient",{id:"paint4_linear_927_5781",x1:"2.42441",y1:"7.61591",x2:"8.39032",y2:"4.13068",gradientUnits:"userSpaceOnUse",children:[(0,un.jsx)("stop",{stopColor:"#A52714",stopOpacity:"0.6"}),(0,un.jsx)("stop",{offset:"0.66",stopColor:"#A52714",stopOpacity:0})]}),(0,un.jsxs)("radialGradient",{id:"paint5_radial_927_5781",cx:0,cy:0,r:1,gradientUnits:"userSpaceOnUse",gradientTransform:"translate(9.56818 5.44891) scale(9.55455)",children:[(0,un.jsx)("stop",{stopColor:"#3E2723",stopOpacity:"0.2"}),(0,un.jsx)("stop",{offset:1,stopColor:"#3E2723",stopOpacity:0})]}),(0,un.jsxs)("linearGradient",{id:"paint6_linear_927_5781",x1:"11.6932",y1:"17.7839",x2:"5.06136",y2:"13.8976",gradientUnits:"userSpaceOnUse",children:[(0,un.jsx)("stop",{stopColor:"#055524",stopOpacity:"0.4"}),(0,un.jsx)("stop",{offset:"0.33",stopColor:"#055524",stopOpacity:0})]}),(0,un.jsxs)("radialGradient",{id:"paint7_radial_927_5781",cx:0,cy:0,r:1,gradientUnits:"userSpaceOnUse",gradientTransform:"translate(1.57975 4.60463) scale(8.86818)",children:[(0,un.jsx)("stop",{stopColor:"#3E2723",stopOpacity:"0.2"}),(0,un.jsx)("stop",{offset:1,stopColor:"#3E2723",stopOpacity:0})]}),(0,un.jsxs)("radialGradient",{id:"paint8_radial_927_5781",cx:0,cy:0,r:1,gradientUnits:"userSpaceOnUse",gradientTransform:"translate(9.97775 10.0157) scale(9.98523)",children:[(0,un.jsx)("stop",{stopColor:"#263238",stopOpacity:"0.2"}),(0,un.jsx)("stop",{offset:1,stopColor:"#263238",stopOpacity:0})]}),(0,un.jsx)("clipPath",{id:"clip0_927_5781",children:(0,un.jsx)("rect",{width:20,height:20,rx:10,fill:"white"})})]})]}),FireFox:(0,un.jsxs)("svg",{"aria-hidden":"true",width:20,height:20,viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,un.jsxs)("g",{clipPath:"url(#clip0_927_5847)",children:[(0,un.jsx)("path",{d:"M19.011 6.71023C18.5898 5.69685 17.7355 4.60269 17.0665 4.25681C17.5436 5.18063 17.8747 6.17276 18.0481 7.19792L18.0499 7.21417C16.954 4.48315 15.0963 3.38023 13.5782 0.981835C13.5014 0.860539 13.4246 0.738994 13.3498 0.610696C13.3071 0.537418 13.2728 0.471393 13.2431 0.410621C13.1801 0.288713 13.1316 0.159878 13.0985 0.0267267C13.0985 0.0205825 13.0963 0.0146369 13.0923 0.0100242C13.0882 0.00541151 13.0826 0.00245454 13.0765 0.00171737C13.0705 7.85858e-05 13.0642 7.85858e-05 13.0582 0.00171737C13.057 0.00171737 13.055 0.00396821 13.0535 0.0044684C13.052 0.00496859 13.0487 0.00721943 13.0465 0.00821981L13.0502 0.00171737C10.6156 1.42725 9.78901 4.06574 9.71399 5.38624C8.74136 5.45292 7.81141 5.81121 7.04549 6.41437C6.96561 6.34671 6.88212 6.28343 6.79539 6.2248C6.57456 5.45174 6.56514 4.6336 6.76813 3.85566C5.87401 4.28877 5.07954 4.90279 4.43501 5.65884H4.43051C4.04636 5.17191 4.07337 3.5663 4.09538 3.23093C3.98174 3.2766 3.87326 3.33419 3.77176 3.40274C3.43264 3.64477 3.11562 3.91635 2.8244 4.2143C2.49255 4.55075 2.18946 4.91441 1.91831 5.30146V5.30296V5.3012C1.29521 6.18444 0.853213 7.18234 0.617826 8.23731L0.604821 8.30133C0.586564 8.38661 0.52079 8.81377 0.509535 8.90656C0.509535 8.91381 0.508035 8.92056 0.507285 8.92781C0.42244 9.36882 0.369864 9.81542 0.349976 10.2641V10.3141C0.354259 12.7396 1.26772 15.0754 2.91002 16.8604C4.55233 18.6454 6.80415 19.7498 9.22094 19.9556C11.6377 20.1615 14.0439 19.4538 15.9644 17.9723C17.8849 16.4908 19.1803 14.3431 19.5947 11.9532C19.6109 11.8282 19.6242 11.7044 19.6387 11.5781C19.8384 9.92791 19.6222 8.25404 19.01 6.70873L19.011 6.71023ZM7.83928 14.2981C7.88455 14.3198 7.92707 14.3433 7.97358 14.3641L7.98034 14.3684C7.93332 14.3458 7.8863 14.3224 7.83928 14.2981ZM18.0501 7.21692V7.20767L18.0519 7.21792L18.0501 7.21692Z",fill:"url(#paint0_linear_927_5847)"}),(0,un.jsx)("path",{d:"M19.0109 6.71026C18.5898 5.69688 17.7354 4.60272 17.0664 4.25684C17.5435 5.18066 17.8746 6.17278 18.0481 7.19794V7.20719L18.0498 7.21745C18.797 9.35551 18.689 11.6997 17.7482 13.7599C16.6373 16.1435 13.9493 18.5867 9.7402 18.4667C5.19349 18.3379 1.18699 14.9629 0.439211 10.5437C0.30291 9.84668 0.439211 9.4933 0.507737 8.92684C0.414265 9.36685 0.362102 9.81463 0.351929 10.2643V10.3144C0.356212 12.7399 1.26967 15.0757 2.91198 16.8607C4.55429 18.6456 6.8061 19.7501 9.2229 19.9559C11.6397 20.1617 14.0458 19.4541 15.9664 17.9725C17.8869 16.491 19.1822 14.3434 19.5966 11.9535C19.6129 11.8284 19.6262 11.7046 19.6407 11.5783C19.8403 9.92819 19.6242 8.25431 19.0119 6.70901L19.0109 6.71026Z",fill:"url(#paint1_radial_927_5847)"}),(0,un.jsx)("path",{d:"M19.0109 6.71026C18.5898 5.69688 17.7354 4.60272 17.0664 4.25684C17.5435 5.18066 17.8746 6.17278 18.0481 7.19794V7.20719L18.0498 7.21745C18.797 9.35551 18.689 11.6997 17.7482 13.7599C16.6373 16.1435 13.9493 18.5867 9.7402 18.4667C5.19349 18.3379 1.18699 14.9629 0.439211 10.5437C0.30291 9.84668 0.439211 9.4933 0.507737 8.92684C0.414265 9.36685 0.362102 9.81463 0.351929 10.2643V10.3144C0.356212 12.7399 1.26967 15.0757 2.91198 16.8607C4.55429 18.6456 6.8061 19.7501 9.2229 19.9559C11.6397 20.1617 14.0458 19.4541 15.9664 17.9725C17.8869 16.491 19.1822 14.3434 19.5966 11.9535C19.6129 11.8284 19.6262 11.7046 19.6407 11.5783C19.8403 9.92819 19.6242 8.25431 19.0119 6.70901L19.0109 6.71026Z",fill:"url(#paint2_radial_927_5847)"}),(0,un.jsx)("path",{d:"M14.2993 7.84794C14.3203 7.8627 14.3398 7.87745 14.3595 7.89221C14.1161 7.46047 13.813 7.06519 13.4592 6.71802C10.4456 3.70439 12.6696 0.18557 13.0445 0.00550206L13.0483 0C10.6136 1.42553 9.78706 4.06402 9.71204 5.38452C9.82508 5.37677 9.93712 5.36726 10.0527 5.36726C10.9164 5.36893 11.7644 5.59929 12.5103 6.03492C13.2562 6.47055 13.8734 7.09592 14.2993 7.84744V7.84794Z",fill:"url(#paint3_radial_927_5847)"}),(0,un.jsx)("path",{d:"M10.0577 8.45061C10.0417 8.6917 9.18992 9.52326 8.89206 9.52326C6.13602 9.52326 5.68835 11.1906 5.68835 11.1906C5.8104 12.5947 6.78877 13.7516 7.97146 14.3618C8.02548 14.3898 8.08025 14.4151 8.13502 14.4399C8.22989 14.4819 8.32476 14.5207 8.41963 14.5564C8.82553 14.7 9.25065 14.7821 9.68085 14.7997C14.5127 15.0263 15.448 9.02257 11.9615 7.27942C12.7839 7.1724 13.6168 7.37463 14.2986 7.84688C13.8727 7.09536 13.2555 6.46999 12.5096 6.03436C11.7637 5.59873 10.9158 5.36837 10.052 5.3667C9.93695 5.3667 9.82441 5.3762 9.71136 5.38396C8.73874 5.45064 7.80879 5.80893 7.04286 6.41209C7.19067 6.53714 7.35748 6.7042 7.70886 7.05058C8.36661 7.69857 10.0535 8.36983 10.0572 8.44861L10.0577 8.45061Z",fill:"url(#paint4_radial_927_5847)"}),(0,un.jsx)("path",{d:"M10.0577 8.45061C10.0417 8.6917 9.18992 9.52326 8.89206 9.52326C6.13602 9.52326 5.68835 11.1906 5.68835 11.1906C5.8104 12.5947 6.78877 13.7516 7.97146 14.3618C8.02548 14.3898 8.08025 14.4151 8.13502 14.4399C8.22989 14.4819 8.32476 14.5207 8.41963 14.5564C8.82553 14.7 9.25065 14.7821 9.68085 14.7997C14.5127 15.0263 15.448 9.02257 11.9615 7.27942C12.7839 7.1724 13.6168 7.37463 14.2986 7.84688C13.8727 7.09536 13.2555 6.46999 12.5096 6.03436C11.7637 5.59873 10.9158 5.36837 10.052 5.3667C9.93695 5.3667 9.82441 5.3762 9.71136 5.38396C8.73874 5.45064 7.80879 5.80893 7.04286 6.41209C7.19067 6.53714 7.35748 6.7042 7.70886 7.05058C8.36661 7.69857 10.0535 8.36983 10.0572 8.44861L10.0577 8.45061Z",fill:"url(#paint5_radial_927_5847)"}),(0,un.jsx)("path",{d:"M6.59134 6.0923C6.66987 6.14231 6.73464 6.18583 6.79141 6.2251C6.57058 5.45204 6.56117 4.63389 6.76415 3.85596C5.87003 4.28907 5.07556 4.90308 4.43103 5.65913C4.4783 5.65788 5.88432 5.63262 6.59134 6.0923Z",fill:"url(#paint6_radial_927_5847)"}),(0,un.jsx)("path",{d:"M0.437567 10.5439C1.1856 14.963 5.19185 18.3393 9.73855 18.4668C13.9476 18.5859 16.6361 16.1425 17.7466 13.7601C18.6873 11.6998 18.7954 9.35569 18.0482 7.21762V7.20837C18.0482 7.20111 18.0467 7.19686 18.0482 7.19911L18.0499 7.21537C18.3938 9.46046 17.2519 11.6345 15.4665 13.1076L15.4609 13.1201C11.9821 15.9536 8.6534 14.8292 7.98064 14.3706C7.93363 14.348 7.88661 14.3246 7.83959 14.3003C5.81158 13.3309 4.97352 11.4842 5.15358 9.89862C4.67218 9.90573 4.19905 9.77307 3.79151 9.51672C3.38397 9.26038 3.05952 8.89134 2.85747 8.45433C3.38987 8.1282 3.99692 7.94382 4.62077 7.91878C5.24461 7.89374 5.86448 8.02887 6.42131 8.31128C7.56906 8.83225 8.87507 8.8836 10.0602 8.45433C10.0564 8.37555 8.36954 7.70405 7.71179 7.05631C7.36041 6.70993 7.1936 6.54312 7.04579 6.41782C6.96591 6.35016 6.88243 6.28688 6.7957 6.22825C6.73818 6.18898 6.6734 6.14647 6.59562 6.09545C5.88861 5.63578 4.48258 5.66104 4.43607 5.66229H4.43156C4.04742 5.17535 4.07443 3.56975 4.09644 3.23438C3.9828 3.28005 3.87431 3.33764 3.77282 3.40619C3.4337 3.64822 3.11667 3.91979 2.82546 4.21774C2.49242 4.55325 2.18808 4.91607 1.91562 5.3024V5.3039V5.30215C1.29252 6.18539 0.850521 7.18329 0.615133 8.23825C0.610381 8.25801 0.266002 9.76357 0.435816 10.5444L0.437567 10.5439Z",fill:"url(#paint7_radial_927_5847)"}),(0,un.jsx)("path",{d:"M13.459 6.71761C13.8128 7.06516 14.1159 7.46087 14.3593 7.89305C14.4126 7.93331 14.4624 7.97333 14.5046 8.01209C16.7022 10.0378 15.5508 12.9014 15.465 13.104C17.2502 11.6332 18.3911 9.45763 18.0485 7.21179C16.952 4.47826 15.0923 3.37535 13.5768 0.976952C13.5 0.855657 13.4232 0.734111 13.3484 0.605813C13.3057 0.532535 13.2714 0.466511 13.2417 0.405738C13.1787 0.283831 13.1302 0.154995 13.0971 0.0218439C13.0971 0.0156997 13.0949 0.0097541 13.0909 0.0051414C13.0868 0.000528701 13.0812 -0.00242828 13.0751 -0.00316545C13.0691 -0.00480423 13.0628 -0.00480423 13.0568 -0.00316545C13.0556 -0.00316545 13.0536 -0.000914601 13.0521 -0.000414413C13.0506 8.57743e-05 13.0473 0.00233662 13.0451 0.00333699C12.6702 0.181154 10.4466 3.70222 13.4602 6.71335L13.459 6.71761Z",fill:"url(#paint8_radial_927_5847)"}),(0,un.jsx)("path",{d:"M14.5043 8.01315C14.462 7.97439 14.4122 7.93437 14.359 7.8941C14.3392 7.87935 14.3197 7.86459 14.2987 7.84984C13.6169 7.37759 12.784 7.17536 11.9616 7.28238C15.4479 9.02553 14.5125 15.0278 9.68095 14.8027C9.25075 14.785 8.82562 14.703 8.41973 14.5594C8.32486 14.5238 8.22999 14.485 8.13512 14.4428C8.08035 14.4178 8.02558 14.3928 7.97156 14.3648L7.97831 14.369C8.65206 14.829 11.9798 15.9526 15.4586 13.1186L15.4641 13.1061C15.5509 12.9035 16.7023 10.0399 14.5038 8.01415L14.5043 8.01315Z",fill:"url(#paint9_radial_927_5847)"}),(0,un.jsx)("path",{d:"M5.68842 11.1892C5.68842 11.1892 6.13583 9.52179 8.89212 9.52179C9.18998 9.52179 10.0425 8.69023 10.0578 8.44914C8.8727 8.8784 7.56669 8.82706 6.41894 8.30608C5.86211 8.02367 5.24224 7.88855 4.61839 7.91359C3.99455 7.93863 3.3875 8.123 2.8551 8.44914C3.05715 8.88615 3.3816 9.25518 3.78914 9.51153C4.19668 9.76787 4.66981 9.90053 5.15121 9.89343C4.97165 11.4783 5.80946 13.3247 7.83722 14.2951C7.88249 14.3168 7.925 14.3403 7.97152 14.3611C6.78783 13.7496 5.81046 12.5932 5.68842 11.1899V11.1892Z",fill:"url(#paint10_radial_927_5847)"}),(0,un.jsx)("path",{d:"M19.0112 6.71023C18.59 5.69685 17.7357 4.60269 17.0667 4.25681C17.5438 5.18063 17.8749 6.17276 18.0483 7.19792L18.0501 7.21417C16.9542 4.48315 15.0965 3.38023 13.5784 0.981835C13.5016 0.860539 13.4249 0.738994 13.3501 0.610696C13.3073 0.537418 13.2731 0.471393 13.2433 0.410621C13.1803 0.288713 13.1318 0.159878 13.0987 0.0267267C13.0988 0.0205825 13.0966 0.0146369 13.0925 0.0100242C13.0884 0.00541151 13.0828 0.00245454 13.0767 0.00171737C13.0708 7.85859e-05 13.0644 7.85859e-05 13.0585 0.00171737C13.0572 0.00171737 13.0552 0.00396821 13.0537 0.0044684C13.0522 0.00496859 13.049 0.00721943 13.0467 0.00821981L13.0505 0.00171737C10.6158 1.42725 9.78925 4.06574 9.71422 5.38624C9.82726 5.37848 9.9393 5.36898 10.0548 5.36898C10.9186 5.37065 11.7666 5.60101 12.5125 6.03664C13.2584 6.47227 13.8756 7.09764 14.3014 7.84916C13.6196 7.37691 12.7868 7.17468 11.9643 7.2817C15.4506 9.02485 14.5153 15.0271 9.68371 14.802C9.25351 14.7843 8.82838 14.7023 8.42248 14.5587C8.32761 14.5232 8.23275 14.4843 8.13788 14.4421C8.08311 14.4171 8.02834 14.3921 7.97432 14.3641L7.98107 14.3684C7.93405 14.3458 7.88703 14.3224 7.84002 14.2981C7.88528 14.3198 7.9278 14.3433 7.97432 14.3641C6.79062 13.7524 5.81326 12.5959 5.69121 11.1929C5.69121 11.1929 6.13863 9.52554 8.89491 9.52554C9.19277 9.52554 10.0453 8.69398 10.0606 8.45289C10.0568 8.37411 8.36996 7.7026 7.71222 7.05486C7.36084 6.70848 7.19402 6.54167 7.04622 6.41637C6.96634 6.34871 6.88285 6.28543 6.79612 6.2268C6.57529 5.45374 6.56588 4.6356 6.76886 3.85766C5.87474 4.29077 5.08027 4.90479 4.43574 5.66084H4.43124C4.04709 5.17391 4.0741 3.5683 4.09611 3.23293C3.98247 3.2786 3.87399 3.33619 3.77249 3.40474C3.43337 3.64677 3.11635 3.91835 2.82514 4.2163C2.49328 4.55275 2.19019 4.91641 1.91905 5.30345V5.30496V5.30321C1.29595 6.18644 0.853946 7.18434 0.618558 8.23931L0.605554 8.30333C0.587297 8.38861 0.505516 8.82177 0.493762 8.91481C0.418959 9.36194 0.371188 9.81318 0.350708 10.2661V10.3161C0.354992 12.7416 1.26845 15.0774 2.91076 16.8624C4.55307 18.6474 6.80488 19.7518 9.22168 19.9576C11.6385 20.1635 14.0446 19.4558 15.9652 17.9743C17.8857 16.4928 19.181 14.3451 19.5954 11.9552C19.6117 11.8302 19.6249 11.7064 19.6394 11.5801C19.8391 9.92991 19.623 8.25604 19.0107 6.71073L19.0112 6.71023ZM18.0496 7.20817L18.0513 7.21842L18.0496 7.20817Z",fill:"url(#paint11_linear_927_5847)"})]}),(0,un.jsxs)("defs",{children:[(0,un.jsxs)("linearGradient",{id:"paint0_linear_927_5847",x1:"17.728",y1:"3.09786",x2:"1.63621",y2:"18.6237",gradientUnits:"userSpaceOnUse",children:[(0,un.jsx)("stop",{offset:"0.048",stopColor:"#FFF44F"}),(0,un.jsx)("stop",{offset:"0.111",stopColor:"#FFE847"}),(0,un.jsx)("stop",{offset:"0.225",stopColor:"#FFC830"}),(0,un.jsx)("stop",{offset:"0.368",stopColor:"#FF980E"}),(0,un.jsx)("stop",{offset:"0.401",stopColor:"#FF8B16"}),(0,un.jsx)("stop",{offset:"0.462",stopColor:"#FF672A"}),(0,un.jsx)("stop",{offset:"0.534",stopColor:"#FF3647"}),(0,un.jsx)("stop",{offset:"0.705",stopColor:"#E31587"})]}),(0,un.jsxs)("radialGradient",{id:"paint1_radial_927_5847",cx:0,cy:0,r:1,gradientUnits:"userSpaceOnUse",gradientTransform:"translate(17.1052 2.25108) scale(20.2076)",children:[(0,un.jsx)("stop",{offset:"0.129",stopColor:"#FFBD4F"}),(0,un.jsx)("stop",{offset:"0.186",stopColor:"#FFAC31"}),(0,un.jsx)("stop",{offset:"0.247",stopColor:"#FF9D17"}),(0,un.jsx)("stop",{offset:"0.283",stopColor:"#FF980E"}),(0,un.jsx)("stop",{offset:"0.403",stopColor:"#FF563B"}),(0,un.jsx)("stop",{offset:"0.467",stopColor:"#FF3750"}),(0,un.jsx)("stop",{offset:"0.71",stopColor:"#F5156C"}),(0,un.jsx)("stop",{offset:"0.782",stopColor:"#EB0878"}),(0,un.jsx)("stop",{offset:"0.86",stopColor:"#E50080"})]}),(0,un.jsxs)("radialGradient",{id:"paint2_radial_927_5847",cx:0,cy:0,r:1,gradientUnits:"userSpaceOnUse",gradientTransform:"translate(9.6024 10.5042) scale(20.2076)",children:[(0,un.jsx)("stop",{offset:"0.3",stopColor:"#960E18"}),(0,un.jsx)("stop",{offset:"0.351",stopColor:"#B11927",stopOpacity:"0.74"}),(0,un.jsx)("stop",{offset:"0.435",stopColor:"#DB293D",stopOpacity:"0.343"}),(0,un.jsx)("stop",{offset:"0.497",stopColor:"#F5334B",stopOpacity:"0.094"}),(0,un.jsx)("stop",{offset:"0.53",stopColor:"#FF3750",stopOpacity:0})]}),(0,un.jsxs)("radialGradient",{id:"paint3_radial_927_5847",cx:0,cy:0,r:1,gradientUnits:"userSpaceOnUse",gradientTransform:"translate(12.1034 -2.25084) scale(14.638)",children:[(0,un.jsx)("stop",{offset:"0.132",stopColor:"#FFF44F"}),(0,un.jsx)("stop",{offset:"0.252",stopColor:"#FFDC3E"}),(0,un.jsx)("stop",{offset:"0.506",stopColor:"#FF9D12"}),(0,un.jsx)("stop",{offset:"0.526",stopColor:"#FF980E"})]}),(0,un.jsxs)("radialGradient",{id:"paint4_radial_927_5847",cx:0,cy:0,r:1,gradientUnits:"userSpaceOnUse",gradientTransform:"translate(7.35173 15.7558) scale(9.62111)",children:[(0,un.jsx)("stop",{offset:"0.353",stopColor:"#3A8EE6"}),(0,un.jsx)("stop",{offset:"0.472",stopColor:"#5C79F0"}),(0,un.jsx)("stop",{offset:"0.669",stopColor:"#9059FF"}),(0,un.jsx)("stop",{offset:1,stopColor:"#C139E6"})]}),(0,un.jsxs)("radialGradient",{id:"paint5_radial_927_5847",cx:0,cy:0,r:1,gradientUnits:"userSpaceOnUse",gradientTransform:"translate(10.5799 8.76923) rotate(-13.5916) scale(5.10194 5.97309)",children:[(0,un.jsx)("stop",{offset:"0.206",stopColor:"#9059FF",stopOpacity:0}),(0,un.jsx)("stop",{offset:"0.278",stopColor:"#8C4FF3",stopOpacity:"0.064"}),(0,un.jsx)("stop",{offset:"0.747",stopColor:"#7716A8",stopOpacity:"0.45"}),(0,un.jsx)("stop",{offset:"0.975",stopColor:"#6E008B",stopOpacity:"0.6"})]}),(0,un.jsxs)("radialGradient",{id:"paint6_radial_927_5847",cx:0,cy:0,r:1,gradientUnits:"userSpaceOnUse",gradientTransform:"translate(9.35238 1.50057) scale(6.9226)",children:[(0,un.jsx)("stop",{stopColor:"#FFE226"}),(0,un.jsx)("stop",{offset:"0.121",stopColor:"#FFDB27"}),(0,un.jsx)("stop",{offset:"0.295",stopColor:"#FFC82A"}),(0,un.jsx)("stop",{offset:"0.502",stopColor:"#FFA930"}),(0,un.jsx)("stop",{offset:"0.732",stopColor:"#FF7E37"}),(0,un.jsx)("stop",{offset:"0.792",stopColor:"#FF7139"})]}),(0,un.jsxs)("radialGradient",{id:"paint7_radial_927_5847",cx:0,cy:0,r:1,gradientUnits:"userSpaceOnUse",gradientTransform:"translate(14.8545 -3.00121) scale(29.5361)",children:[(0,un.jsx)("stop",{offset:"0.113",stopColor:"#FFF44F"}),(0,un.jsx)("stop",{offset:"0.456",stopColor:"#FF980E"}),(0,un.jsx)("stop",{offset:"0.622",stopColor:"#FF5634"}),(0,un.jsx)("stop",{offset:"0.716",stopColor:"#FF3647"}),(0,un.jsx)("stop",{offset:"0.904",stopColor:"#E31587"})]}),(0,un.jsxs)("radialGradient",{id:"paint8_radial_927_5847",cx:0,cy:0,r:1,gradientUnits:"userSpaceOnUse",gradientTransform:"translate(12.3996 -1.36343) rotate(83.976) scale(21.6445 14.2051)",children:[(0,un.jsx)("stop",{stopColor:"#FFF44F"}),(0,un.jsx)("stop",{offset:"0.06",stopColor:"#FFE847"}),(0,un.jsx)("stop",{offset:"0.168",stopColor:"#FFC830"}),(0,un.jsx)("stop",{offset:"0.304",stopColor:"#FF980E"}),(0,un.jsx)("stop",{offset:"0.356",stopColor:"#FF8B16"}),(0,un.jsx)("stop",{offset:"0.455",stopColor:"#FF672A"}),(0,un.jsx)("stop",{offset:"0.57",stopColor:"#FF3647"}),(0,un.jsx)("stop",{offset:"0.737",stopColor:"#E31587"})]}),(0,un.jsxs)("radialGradient",{id:"paint9_radial_927_5847",cx:0,cy:0,r:1,gradientUnits:"userSpaceOnUse",gradientTransform:"translate(9.35233 4.00165) scale(18.4369)",children:[(0,un.jsx)("stop",{offset:"0.137",stopColor:"#FFF44F"}),(0,un.jsx)("stop",{offset:"0.48",stopColor:"#FF980E"}),(0,un.jsx)("stop",{offset:"0.592",stopColor:"#FF5634"}),(0,un.jsx)("stop",{offset:"0.655",stopColor:"#FF3647"}),(0,un.jsx)("stop",{offset:"0.904",stopColor:"#E31587"})]}),(0,un.jsxs)("radialGradient",{id:"paint10_radial_927_5847",cx:0,cy:0,r:1,gradientUnits:"userSpaceOnUse",gradientTransform:"translate(14.1041 5.00184) scale(20.1801)",children:[(0,un.jsx)("stop",{offset:"0.094",stopColor:"#FFF44F"}),(0,un.jsx)("stop",{offset:"0.231",stopColor:"#FFE141"}),(0,un.jsx)("stop",{offset:"0.509",stopColor:"#FFAF1E"}),(0,un.jsx)("stop",{offset:"0.626",stopColor:"#FF980E"})]}),(0,un.jsxs)("linearGradient",{id:"paint11_linear_927_5847",x1:"17.5331",y1:"3.01533",x2:"3.84302",y2:"16.708",gradientUnits:"userSpaceOnUse",children:[(0,un.jsx)("stop",{offset:"0.167",stopColor:"#FFF44F",stopOpacity:"0.8"}),(0,un.jsx)("stop",{offset:"0.266",stopColor:"#FFF44F",stopOpacity:"0.634"}),(0,un.jsx)("stop",{offset:"0.489",stopColor:"#FFF44F",stopOpacity:"0.217"}),(0,un.jsx)("stop",{offset:"0.6",stopColor:"#FFF44F",stopOpacity:0})]}),(0,un.jsx)("clipPath",{id:"clip0_927_5847",children:(0,un.jsx)("rect",{width:20,height:20,fill:"white"})})]})]}),Brave:(0,un.jsxs)("svg",{"aria-hidden":"true",width:20,height:20,viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,un.jsx)("path",{d:"M17.2924 5.22043L17.7256 4.15905L16.4982 2.8883C15.8339 2.22404 14.4187 2.61393 14.4187 2.61393L12.8158 0.794434H7.16242L5.55231 2.62115C5.55231 2.62115 4.13715 2.23848 3.47289 2.8883L2.24545 4.15183L2.67866 5.21321L2.13715 6.78721L3.9422 13.6681C4.31765 15.141 4.57036 15.7114 5.63173 16.4623L8.93137 18.7006C9.24906 18.8955 9.63895 19.2349 9.99274 19.2349C10.3465 19.2349 10.7364 18.8955 11.0541 18.7006L14.3538 16.4623C15.4151 15.7114 15.6678 15.141 16.0433 13.6681L17.8483 6.78721L17.2924 5.22043Z",fill:"url(#paint0_linear_927_5861)"}),(0,un.jsx)("path",{d:"M13.9711 3.78343C13.9711 3.78343 16.0433 6.28884 16.0433 6.81592C16.0433 7.35744 15.7834 7.49462 15.5234 7.77621L13.9711 9.43686C13.8267 9.58126 13.5162 9.82675 13.6967 10.2527C13.8772 10.686 14.1299 11.2203 13.8411 11.769C13.5523 12.3249 13.0469 12.6932 12.722 12.6354C12.2387 12.4786 11.7777 12.2602 11.3502 11.9856C11.0758 11.8051 10.1949 11.0758 10.1949 10.7943C10.1949 10.5127 11.1047 10 11.278 9.89895C11.444 9.78343 12.2166 9.33577 12.231 9.16249C12.2455 8.9892 12.2455 8.94588 12.0144 8.51267C11.7834 8.07946 11.379 7.50184 11.4368 7.12639C11.509 6.75094 12.1588 6.54877 12.6426 6.36827L14.1372 5.80509C14.2527 5.74733 14.2238 5.69679 13.8772 5.66068C13.5307 5.6318 12.5559 5.50184 12.1155 5.62458C11.6751 5.74733 10.9386 5.93505 10.8664 6.03614C10.8086 6.13722 10.7509 6.13722 10.8159 6.48379L11.2346 8.75816C11.2635 9.04697 11.3213 9.24191 11.018 9.31411C10.7003 9.38632 10.1733 9.50906 9.99276 9.50906C9.81225 9.50906 9.27796 9.38632 8.96749 9.31411C8.65702 9.24191 8.71478 9.04697 8.75088 8.75816C8.77976 8.46935 9.09745 6.82314 9.16243 6.48379C9.23464 6.13722 9.16965 6.13722 9.11189 6.03614C9.03969 5.93505 8.29601 5.74733 7.85558 5.62458C7.42236 5.50184 6.44041 5.6318 6.09384 5.66791C5.74727 5.69679 5.71839 5.74011 5.83391 5.81231L7.3285 6.36827C7.80503 6.54877 8.46929 6.75094 8.53428 7.12639C8.60648 7.50906 8.19493 8.07946 7.95666 8.51267C7.71839 8.94588 7.72561 8.9892 7.74005 9.16249C7.75449 9.33577 8.53428 9.78343 8.69312 9.89895C8.86641 10.0073 9.77615 10.5127 9.77615 10.7943C9.77615 11.0758 8.91695 11.8051 8.62814 11.9856C8.20063 12.2602 7.73957 12.4786 7.2563 12.6354C6.93139 12.6932 6.42597 12.3249 6.12994 11.769C5.84113 11.2203 6.10106 10.686 6.27435 10.2527C6.45485 9.81953 6.1516 9.58848 5.99998 9.43686L4.44763 7.77621C4.19493 7.50906 3.935 7.36466 3.935 6.83036C3.935 6.29606 6.0072 3.79787 6.0072 3.79787L7.97832 4.11556C8.20937 4.11556 8.722 3.92061 9.19132 3.75455C9.66063 3.61014 9.98554 3.5957 9.98554 3.5957C9.98554 3.5957 10.3032 3.5957 10.7798 3.75455C11.2563 3.91339 11.7617 4.11556 11.9928 4.11556C12.231 4.11556 13.9783 3.77621 13.9783 3.77621L13.9711 3.78343ZM12.4188 13.3719C12.5487 13.4441 12.4693 13.6029 12.3465 13.6896L10.5126 15.1192C10.3682 15.2636 10.1372 15.4802 9.98554 15.4802C9.83391 15.4802 9.61009 15.2636 9.45846 15.1192C8.8506 14.6351 8.23683 14.1586 7.61731 13.6896C7.50178 13.6029 7.42236 13.4513 7.54511 13.3719L8.62814 12.7943C9.05864 12.5665 9.51417 12.3897 9.98554 12.2672C10.0938 12.2672 10.7798 12.5127 11.3357 12.7943L12.4188 13.3719Z",fill:"white"}),(0,un.jsx)("path",{d:"M14.4332 2.62115L12.8159 0.794434H7.16243L5.55232 2.62115C5.55232 2.62115 4.13716 2.23848 3.4729 2.8883C3.4729 2.8883 5.35016 2.72223 5.99998 3.77638L7.99276 4.11573C8.2238 4.11573 8.73644 3.92079 9.20575 3.75472C9.67507 3.61032 9.99998 3.59588 9.99998 3.59588C9.99998 3.59588 10.3177 3.59588 10.7942 3.75472C11.2707 3.91357 11.7761 4.11573 12.0072 4.11573C12.2455 4.11573 13.9928 3.77638 13.9928 3.77638C14.6426 2.72223 16.5198 2.8883 16.5198 2.8883C15.8556 2.22404 14.4404 2.61393 14.4404 2.61393",fill:"url(#paint1_linear_927_5861)"}),(0,un.jsxs)("defs",{children:[(0,un.jsxs)("linearGradient",{id:"paint0_linear_927_5861",x1:"2.13715",y1:"10.1991",x2:"17.8483",y2:"10.1991",gradientUnits:"userSpaceOnUse",children:[(0,un.jsx)("stop",{offset:"0.4",stopColor:"#FF5500"}),(0,un.jsx)("stop",{offset:"0.6",stopColor:"#FF2000"})]}),(0,un.jsxs)("linearGradient",{id:"paint1_linear_927_5861",x1:"3.73384",y1:"2.4883",x2:"16.5198",y2:"2.4883",gradientUnits:"userSpaceOnUse",children:[(0,un.jsx)("stop",{stopColor:"#FF452A"}),(0,un.jsx)("stop",{offset:1,stopColor:"#FF2000"})]})]})]}),Edge:(0,un.jsxs)("svg",{"aria-hidden":"true",width:20,height:20,viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,un.jsxs)("g",{clipPath:"url(#clip0_927_5865)",children:[(0,un.jsx)("path",{d:"M18.0547 14.8828C17.7865 15.0222 17.5099 15.1448 17.2266 15.25C16.3293 15.584 15.3792 15.7533 14.4219 15.75C10.7266 15.75 7.50781 13.2109 7.50781 9.94531C7.51262 9.50803 7.63385 9.07993 7.85905 8.70506C8.08424 8.33019 8.40526 8.0221 8.78906 7.8125C5.44531 7.95312 4.58594 11.4375 4.58594 13.4766C4.58594 19.2578 9.90625 19.8359 11.0547 19.8359C11.6719 19.8359 12.6016 19.6562 13.1641 19.4766L13.2656 19.4453C15.4183 18.7014 17.2534 17.2465 18.4688 15.3203C18.5041 15.2618 18.5192 15.1933 18.5119 15.1253C18.5046 15.0574 18.4752 14.9937 18.4282 14.944C18.3812 14.8944 18.3192 14.8615 18.2518 14.8505C18.1843 14.8394 18.1151 14.8508 18.0547 14.8828Z",fill:"url(#paint0_linear_927_5865)"}),(0,un.jsx)("path",{opacity:"0.35",d:"M18.0547 14.8828C17.7865 15.0222 17.5099 15.1448 17.2266 15.25C16.3293 15.584 15.3792 15.7533 14.4219 15.75C10.7266 15.75 7.50781 13.2109 7.50781 9.94531C7.51262 9.50803 7.63385 9.07993 7.85905 8.70506C8.08424 8.33019 8.40526 8.0221 8.78906 7.8125C5.44531 7.95312 4.58594 11.4375 4.58594 13.4766C4.58594 19.2578 9.90625 19.8359 11.0547 19.8359C11.6719 19.8359 12.6016 19.6562 13.1641 19.4766L13.2656 19.4453C15.4183 18.7014 17.2534 17.2465 18.4688 15.3203C18.5041 15.2618 18.5192 15.1933 18.5119 15.1253C18.5046 15.0574 18.4752 14.9937 18.4282 14.944C18.3812 14.8944 18.3192 14.8615 18.2518 14.8505C18.1843 14.8394 18.1151 14.8508 18.0547 14.8828Z",fill:"url(#paint1_radial_927_5865)"}),(0,un.jsx)("path",{d:"M8.2578 18.8516C7.56239 18.4196 6.95961 17.854 6.48436 17.1875C5.94166 16.4447 5.56809 15.5921 5.38987 14.6896C5.21165 13.787 5.23311 12.8565 5.45272 11.9631C5.67234 11.0697 6.08479 10.2353 6.66115 9.51826C7.23751 8.80123 7.96379 8.21903 8.78905 7.8125C9.03905 7.69531 9.45311 7.49219 10.0078 7.5C10.3981 7.50302 10.7824 7.59627 11.1308 7.77245C11.4791 7.94864 11.7819 8.20299 12.0156 8.51562C12.3299 8.93835 12.5023 9.4498 12.5078 9.97656C12.5078 9.96094 14.4219 3.75781 6.2578 3.75781C2.82811 3.75781 0.00780015 7.00781 0.00780015 9.86719C-0.00584162 11.3776 0.317079 12.8721 0.953112 14.2422C1.99473 16.4602 3.81447 18.2185 6.06689 19.1834C8.3193 20.1483 10.8476 20.2526 13.1719 19.4766C12.3576 19.7337 11.4972 19.811 10.6501 19.7031C9.80297 19.5952 8.98941 19.3047 8.26561 18.8516H8.2578Z",fill:"url(#paint2_linear_927_5865)"}),(0,un.jsx)("path",{opacity:"0.41",d:"M8.2578 18.8516C7.56239 18.4196 6.95961 17.854 6.48436 17.1875C5.94166 16.4447 5.56809 15.5921 5.38987 14.6896C5.21165 13.787 5.23311 12.8565 5.45272 11.9631C5.67234 11.0697 6.08479 10.2353 6.66115 9.51826C7.23751 8.80123 7.96379 8.21903 8.78905 7.8125C9.03905 7.69531 9.45311 7.49219 10.0078 7.5C10.3981 7.50302 10.7824 7.59627 11.1308 7.77245C11.4791 7.94864 11.7819 8.20299 12.0156 8.51562C12.3299 8.93835 12.5023 9.4498 12.5078 9.97656C12.5078 9.96094 14.4219 3.75781 6.2578 3.75781C2.82811 3.75781 0.00780015 7.00781 0.00780015 9.86719C-0.00584162 11.3776 0.317079 12.8721 0.953112 14.2422C1.99473 16.4602 3.81447 18.2185 6.06689 19.1834C8.3193 20.1483 10.8476 20.2526 13.1719 19.4766C12.3576 19.7337 11.4972 19.811 10.6501 19.7031C9.80297 19.5952 8.98941 19.3047 8.26561 18.8516H8.2578Z",fill:"url(#paint3_radial_927_5865)"}),(0,un.jsx)("path",{d:"M11.9062 11.625C11.8359 11.7031 11.6406 11.8203 11.6406 12.0625C11.6406 12.2656 11.7734 12.4688 12.0156 12.6328C13.1328 13.4141 15.25 13.3047 15.2578 13.3047C16.0907 13.3041 16.9081 13.0802 17.625 12.6562C18.3467 12.2341 18.9456 11.6307 19.3622 10.9057C19.7788 10.1808 19.9986 9.35955 20 8.52344C20.0234 6.77344 19.375 5.60937 19.1172 5.09375C17.4531 1.85937 13.8828 4.89564e-08 10 4.89564e-08C7.37202 -0.00025981 4.84956 1.03398 2.97819 2.87904C1.10682 4.7241 0.0369559 7.23166 0 9.85938C0.0390625 7.00781 2.875 4.70312 6.25 4.70312C6.52344 4.70312 8.08594 4.72656 9.53125 5.48438C10.5466 5.98895 11.3875 6.78627 11.9453 7.77344C12.4219 8.60156 12.5078 9.65625 12.5078 10.0781C12.5078 10.5 12.2969 11.1172 11.8984 11.6328L11.9062 11.625Z",fill:"url(#paint4_radial_927_5865)"}),(0,un.jsx)("path",{d:"M11.9062 11.625C11.8359 11.7031 11.6406 11.8203 11.6406 12.0625C11.6406 12.2656 11.7734 12.4688 12.0156 12.6328C13.1328 13.4141 15.25 13.3047 15.2578 13.3047C16.0907 13.3041 16.9081 13.0802 17.625 12.6562C18.3467 12.2341 18.9456 11.6307 19.3622 10.9057C19.7788 10.1808 19.9986 9.35955 20 8.52344C20.0234 6.77344 19.375 5.60937 19.1172 5.09375C17.4531 1.85937 13.8828 4.89564e-08 10 4.89564e-08C7.37202 -0.00025981 4.84956 1.03398 2.97819 2.87904C1.10682 4.7241 0.0369559 7.23166 0 9.85938C0.0390625 7.00781 2.875 4.70312 6.25 4.70312C6.52344 4.70312 8.08594 4.72656 9.53125 5.48438C10.5466 5.98895 11.3875 6.78627 11.9453 7.77344C12.4219 8.60156 12.5078 9.65625 12.5078 10.0781C12.5078 10.5 12.2969 11.1172 11.8984 11.6328L11.9062 11.625Z",fill:"url(#paint5_radial_927_5865)"})]}),(0,un.jsxs)("defs",{children:[(0,un.jsxs)("linearGradient",{id:"paint0_linear_927_5865",x1:"4.58594",y1:"13.8281",x2:"18.5234",y2:"13.8281",gradientUnits:"userSpaceOnUse",children:[(0,un.jsx)("stop",{stopColor:"#0C59A4"}),(0,un.jsx)("stop",{offset:1,stopColor:"#114A8B"})]}),(0,un.jsxs)("radialGradient",{id:"paint1_radial_927_5865",cx:0,cy:0,r:1,gradientUnits:"userSpaceOnUse",gradientTransform:"translate(12.2813 13.9332) scale(7.45313 7.08047)",children:[(0,un.jsx)("stop",{offset:"0.7",stopOpacity:0}),(0,un.jsx)("stop",{offset:"0.9",stopOpacity:"0.5"}),(0,un.jsx)("stop",{offset:1})]}),(0,un.jsxs)("linearGradient",{id:"paint2_linear_927_5865",x1:"11.9297",y1:"7.78125",x2:"3.23436",y2:"17.2578",gradientUnits:"userSpaceOnUse",children:[(0,un.jsx)("stop",{stopColor:"#1B9DE2"}),(0,un.jsx)("stop",{offset:"0.2",stopColor:"#1595DF"}),(0,un.jsx)("stop",{offset:"0.7",stopColor:"#0680D7"}),(0,un.jsx)("stop",{offset:1,stopColor:"#0078D4"})]}),(0,un.jsxs)("radialGradient",{id:"paint3_radial_927_5865",cx:0,cy:0,r:1,gradientUnits:"userSpaceOnUse",gradientTransform:"translate(5.51209 15.5419) rotate(-81.3844) scale(11.202 9.05011)",children:[(0,un.jsx)("stop",{offset:"0.8",stopOpacity:0}),(0,un.jsx)("stop",{offset:"0.9",stopOpacity:"0.5"}),(0,un.jsx)("stop",{offset:1})]}),(0,un.jsxs)("radialGradient",{id:"paint4_radial_927_5865",cx:0,cy:0,r:1,gradientUnits:"userSpaceOnUse",gradientTransform:"translate(2.02266 3.69656) rotate(92.2906) scale(15.8251 33.7043)",children:[(0,un.jsx)("stop",{stopColor:"#35C1F1"}),(0,un.jsx)("stop",{offset:"0.1",stopColor:"#34C1ED"}),(0,un.jsx)("stop",{offset:"0.2",stopColor:"#2FC2DF"}),(0,un.jsx)("stop",{offset:"0.3",stopColor:"#2BC3D2"}),(0,un.jsx)("stop",{offset:"0.7",stopColor:"#36C752"})]}),(0,un.jsxs)("radialGradient",{id:"paint5_radial_927_5865",cx:0,cy:0,r:1,gradientUnits:"userSpaceOnUse",gradientTransform:"translate(18.7547 6.03906) rotate(73.7398) scale(7.60156 6.18159)",children:[(0,un.jsx)("stop",{stopColor:"#66EB6E"}),(0,un.jsx)("stop",{offset:1,stopColor:"#66EB6E",stopOpacity:0})]}),(0,un.jsx)("clipPath",{id:"clip0_927_5865",children:(0,un.jsx)("rect",{width:20,height:20,fill:"white"})})]})]})};const gx=t.forwardRef(((e,t)=>{let{browser:r}=e;let n;switch(null!==r&&void 0!==r?r:nb()){case"chrome":n=mx.Chrome;break;case"firefox":n=mx.FireFox;break;case"edge":n=mx.Edge}return n?(0,un.jsx)(px,{children:n}):(0,un.jsx)(un.Fragment,{})}));function vx(e){const r=Wx(),n=(0,t.useCallback)((()=>{(0,Qy.Ul)().then((e=>{e&&(e.disconnect(),r.setAccount(void 0),r.setSignerProvider(void 0),r.setNetwork(void 0))})).catch((e=>{console.error(e)}))}),[r]);return{connect:(0,t.useCallback)((async()=>{const t=await(0,Qy.Ul)();if(void 0===t)return;const i=await t.enable({...e,onDisconnected:n}).catch((()=>{}));return i&&(r.setSignerProvider(t),t.connectedNetworkId&&r.setNetwork(t.connectedNetworkId),r.setAccount(i)),i}),[r]),disconnect:n}}gx.displayName="BrowserIcon";const yx="connected",bx="connecting",wx="expiring",xx="failed",kx="rejected",Ex="notconnected",Ax="unavailable",Sx={initial:{willChange:"transform,opacity",position:"relative",opacity:0,scale:.95},animate:{position:"relative",opacity:1,scale:1,transition:{ease:[.16,1,.3,1],duration:.4,delay:.05,position:{delay:0}}},exit:{position:"absolute",opacity:0,scale:.95,transition:{ease:[.16,1,.3,1],duration:.3}}},Mx=e=>{let{connectorId:r,switchConnectMethod:n,forceState:i}=e;var o,a;const s=Wx(),{connect:u}=vx({chainGroup:s.chainGroup,keyType:s.keyType,networkId:s.network}),[c,l]=(0,t.useState)(r),[f,d]=(0,t.useState)(!1),h=mw.filter((e=>e.id===c))[0];(0,t.useState)(9);const p=h.extensionIsInstalled&&h.extensionIsInstalled(),m=nb(),g=h.extensions?h.extensions[m]:void 0,v=h.extensions?{name:Object.keys(h.extensions)[0],label:Object.keys(h.extensions)[0].charAt(0).toUpperCase()+Object.keys(h.extensions)[0].slice(1),url:h.extensions[Object.keys(h.extensions)[0]]}:void 0,[y,b]=(0,t.useState)(i||(p?bx:Ax)),w=()=>{p&&u().then((e=>{e&&(b(yx),s.setOpen(!1))}))};let x;return(0,t.useEffect)((()=>{if(y!==Ax)return x=setTimeout(w,600),()=>{clearTimeout(x)}}),[]),h?"walletConnect"===h.id?(0,un.jsx)(vb,{children:(0,un.jsxs)(Tw,{children:[(0,un.jsx)(bb,{children:"Invalid State"}),(0,un.jsx)(xb,{children:(0,un.jsx)(tx,{children:"WalletConnect does not have an injection flow. This state should never happen."})})]})}):(0,un.jsx)(vb,{children:(0,un.jsxs)(Tw,{children:[(0,un.jsx)(Ow,{children:(0,un.jsxs)(Iw,{$shake:y===xx||y===kx,$circle:!0,children:[(0,un.jsx)(Og,{children:(y===xx||y===kx)&&(0,un.jsx)(Rw,{"aria-label":"Retry",initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},whileTap:{scale:.9},transition:{duration:.1},onClick:w,children:(0,un.jsx)(jw,{children:(0,un.jsx)(Xw,{open:f&&(y===xx||y===kx),message:"try again",xOffset:-6,children:(0,un.jsx)(dx,{})})})})}),(0,un.jsx)(sx,{logo:y===Ax?(0,un.jsx)("div",{style:{transform:"scale(1.14)",position:"relative",width:"100%"},children:null!==(o=h.logos.transparent)&&void 0!==o?o:h.logos.default}):(0,un.jsx)(un.Fragment,{children:null!==(a=h.logos.transparent)&&void 0!==a?a:h.logos.default}),smallLogo:"injected"===h.id,connecting:y===bx,unavailable:y===Ax,countdown:y===wx})]})}),(0,un.jsx)(wb,{children:(0,un.jsxs)(Og,{initial:!1,children:[y===xx&&(0,un.jsxs)(Cw,{initial:"initial",animate:"animate",exit:"exit",variants:Sx,children:[(0,un.jsxs)(xb,{children:[(0,un.jsxs)(kb,{$error:!0,children:[(0,un.jsx)(cx,{}),"failed"]}),(0,un.jsx)(Eb,{children:"failed"})]}),h.scannable&&"coinbaseWallet"!==h.id&&(0,un.jsxs)(un.Fragment,{children:[(0,un.jsx)(fw,{}),(0,un.jsx)(Kw,{icon:(0,un.jsx)(ux,{}),onClick:()=>n(c),children:"scan qr code"})]})]},xx),y===kx&&(0,un.jsxs)(Cw,{initial:"initial",animate:"animate",exit:"exit",variants:Sx,children:[(0,un.jsxs)(xb,{style:{paddingBottom:28},children:[(0,un.jsx)(kb,{children:"rejected"}),(0,un.jsx)(Eb,{children:"rejected"})]}),h.scannable&&"coinbaseWallet"!==h.id&&(0,un.jsxs)(un.Fragment,{children:[(0,un.jsx)(fw,{}),(0,un.jsx)(Kw,{icon:(0,un.jsx)(ux,{}),onClick:()=>n(c),children:"scan the qr code"})]})]},kx),(y===bx||y===wx)&&(0,un.jsx)(Cw,{initial:"initial",animate:"animate",exit:"exit",variants:Sx,children:(0,un.jsx)(xb,{style:{paddingBottom:28},children:(0,un.jsx)(kb,{children:"injected"===h.id?"connecting":"rejected"})})},bx),y===yx&&(0,un.jsx)(Cw,{initial:"initial",animate:"animate",exit:"exit",variants:Sx,children:(0,un.jsx)(xb,{children:(0,un.jsxs)(kb,{$valid:!0,children:[(0,un.jsx)(fx,{})," ","Connected"]})})},yx),y===Ex&&(0,un.jsx)(Cw,{initial:"initial",animate:"animate",exit:"exit",variants:Sx,children:(0,un.jsx)(xb,{children:(0,un.jsx)(kb,{children:"Not Connected"})})},Ex),y===Ax&&(0,un.jsx)(Cw,{initial:"initial",animate:"animate",exit:"exit",variants:Sx,children:g?(0,un.jsxs)(un.Fragment,{children:[(0,un.jsx)(xb,{style:{paddingBottom:18},children:(0,un.jsx)(kb,{children:"Install"})}),!p&&g&&(0,un.jsx)(Kw,{href:g,icon:(0,un.jsx)(gx,{}),children:"Install the extension"})]}):(0,un.jsxs)(un.Fragment,{children:[(0,un.jsx)(xb,{style:{paddingBottom:12},children:(0,un.jsx)(kb,{children:"Not Available"})}),!p&&v&&(0,un.jsxs)(Kw,{href:null===v||void 0===v?void 0:v.url,icon:(0,un.jsx)(gx,{browser:null===v||void 0===v?void 0:v.name}),children:["Install on ",null===v||void 0===v?void 0:v.label]})]})},Ax)]})})]})}):(0,un.jsx)(vb,{children:(0,un.jsxs)(Tw,{children:[(0,un.jsx)(bb,{children:"Invalid State"}),(0,un.jsx)(xb,{children:(0,un.jsx)(tx,{children:"No connectors match the id given. This state should never happen."})})]})})},Cx="qrcode",_x="injector",Px=e=>{let{connectorId:r}=e;const[n,i]=(0,t.useState)(r),o=mw.filter((e=>e.id===n))[0],a=o.extensionIsInstalled&&o.extensionIsInstalled(),s=!o.scannable||a,[u,c]=(0,t.useState)(s?_x:Cx);return o?u===Cx?(0,un.jsx)(tx,{children:"WalletConnect soon!"}):(0,un.jsx)(Og,{children:u===_x&&(0,un.jsx)(Mg.div,{initial:"initial",animate:"animate",exit:"exit",variants:uw,children:(0,un.jsx)(Mx,{connectorId:n,switchConnectMethod:e=>{e&&i(e),c(Cx)}})},_x)}):(0,un.jsx)(tx,{children:"Connector not found"})},Tx=ub(Mg.div)`
  transition: all 220ms cubic-bezier(0.175, 0.885, 0.32, 1.1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  svg {
    display: block;
  }
  svg,
  svg path,
  svg rect {
    transition: inherit;
  }
  svg path:first-child {
    transform-origin: 50% 50%;
    fill: var(--bg);
    stroke: var(--color);
  }
  svg rect {
    transform-origin: 53% 63%;
    fill: var(--bg);
    stroke: var(--color);
  }
  svg path:last-child {
    opacity: 0;
    stroke: var(--bg);
    transform: translate(11.75px, 10px) rotate(90deg) scale(0.6);
  }
  ${e=>e.$clipboard?ny`
          --color: var(--ck-focus-color) !important;
          --bg: var(--ck-body-background);
          svg {
            transition-delay: 0ms;
            path:first-child {
              opacity: 0;
              transform: rotate(-90deg) scale(0.2);
            }
            rect {
              rx: 10px;
              fill: var(--color);
              transform: rotate(-90deg) scale(1.45);
            }
            path:last-child {
              transition-delay: 100ms;
              opacity: 1;
              transform: translate(7.75px, 9.5px);
            }
          }
        `:ny`
          &:hover {
          }
          &:hover:active {
          }
        `}
`,Ox=e=>{let{copied:t,small:r}=e;return(0,un.jsx)(Tx,{$clipboard:t,children:(0,un.jsx)(hx,{style:{transform:r?"scale(1)":"translateX(3px) scale(1.5)",opacity:r||t?1:.3}})})},Ix=ub.div`
  --color: var(--ck-copytoclipboard-stroke);
  --bg: var(--ck-body-background);
  transition: all 220ms cubic-bezier(0.175, 0.885, 0.32, 1.1);

  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${e=>e.$disabled?ny`
          cursor: not-allowed;
          opacity: 0.4;
        `:ny`
          &:hover {
            --color: var(--ck-body-color-muted);
          }
        `}
`,Rx=ub.div`
  display: block;
  position: relative;
  transition: inherit;
  svg {
    position: absolute;
    left: 100%;
    display: block;
    top: -1px;
    margin: 0;
    margin-left: 4px;
  }
`,jx=e=>{let{string:r,children:n,variant:i}=e;const[o,a]=(0,t.useState)(!1);let s;const u=()=>{if(!r)return;const e=r.trim();navigator.clipboard&&navigator.clipboard.writeText(e),a(!0),clearTimeout(s),s=setTimeout((()=>a(!1)),1e3)};return"button"===i?(0,un.jsx)(Kw,{disabled:!r,onClick:u,icon:(0,un.jsx)(Ox,{copied:o}),children:n}):(0,un.jsx)(Ix,{onClick:u,$disabled:!r,children:(0,un.jsxs)(Rx,{children:[n,(0,un.jsx)(Ox,{copied:o,small:!0})]})})};function Bx(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:()=>Promise.resolve();const r=Wx();return(0,t.useEffect)((()=>{(async()=>{const t=await(0,Qy.Ul)(),n=await(null===t||void 0===t?void 0:t.enableIfConnected({onDisconnected:e,networkId:r.network}));t&&(r.setSignerProvider(t),t.connectedNetworkId&&r.setNetwork(t.connectedNetworkId)),n&&r.setAccount(n)})()}),[]),{account:r.account,isConnected:!!r.account}}function Nx(){const e=Wx(),[r,n]=(0,t.useState)();return(0,t.useEffect)((()=>{(async()=>{var t;const r=null===(t=e.signerProvider)||void 0===t?void 0:t.nodeProvider;if(r&&e.account){const t=await r.addresses.getAddressesAddressBalance(e.account.address);n(t)}})()}),[]),{balance:r}}const Fx=ub(Mg.div)`
  position: relative;
`,Dx=ub(Mg.div)`
  position: relative;
`,Lx=by`
  0%{ background-position: 100% 0; }
  100%{ background-position: -100% 0; }
`,Ux=ub(Mg.div)`
  width: 25%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  background: var(--ck-body-background-secondary);
  inset: 0;
  &:before {
    z-index: 4;
    content: '';
    position: absolute;
    inset: 0;
    background-image: linear-gradient(
      90deg,
      var(--ck-body-background-transparent) 50%,
      var(--ck-body-background),
      var(--ck-body-background-transparent)
    );
    opacity: 0.75;
    background-size: 200% 100%;
    animation: ${Lx} 1000ms linear infinite both;
  }
`,zx=e=>{let{closeModal:r}=e;const n=Wx(),{account:i}=Bx(),{balance:o}=Nx(),{disconnect:a}=vx({chainGroup:n.chainGroup,keyType:n.keyType,networkId:n.network}),[s,u]=(0,t.useState)(!1),c=i?n.displayAccount?n.displayAccount(i):i.address:void 0;return(0,t.useEffect)((()=>{if(s)return r?r():n.setOpen(!1),()=>{a(),n.setOpen(!1)}}),[s]),(0,un.jsxs)(vb,{children:[(0,un.jsxs)(xb,{style:{paddingBottom:22,gap:6},children:[(0,un.jsx)(kb,{children:(0,un.jsx)(jx,{string:c,children:c&&sb(c)})}),(0,un.jsx)(Eb,{children:(0,un.jsx)(Fx,{children:(0,un.jsxs)(Og,{exitBeforeEnter:!0,initial:!1,children:[o&&(0,un.jsxs)(Dx,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:[(0,sa.prettifyAttoAlphAmount)(BigInt(o.balance))," ALPH"]},"alephium"),!o&&(0,un.jsx)(Ux,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:"\xa0"})]})})})]}),(0,un.jsx)(Kw,{onClick:()=>u(!0),icon:(0,un.jsx)(lx,{}),children:"Disconnect"})]})},Hx={},Zx=e=>{let{mode:r="auto",theme:n="auto",customTheme:i=Hx}=e;const o=Wx(),{isConnected:a}=Bx(),s=o.route!==qx.CONNECTORS&&o.route!==qx.PROFILE,u={connectors:(0,un.jsx)(Mw,{}),connect:(0,un.jsx)(Px,{connectorId:o.connector}),profile:(0,un.jsx)(zx,{})};function c(){o.setOpen(!1)}return(0,t.useEffect)((()=>{a?o.route!==qx.PROFILE&&c():c()}),[a]),(0,t.useEffect)((()=>o.setMode(r)),[r]),(0,t.useEffect)((()=>o.setTheme(n)),[n]),(0,t.useEffect)((()=>o.setCustomTheme(i)),[i]),(0,t.useEffect)((()=>{if(!o.open)return;const e=document.createElement("meta");return e.setAttribute("property","og:title"),e.setAttribute("content","alephium"),document.head.prepend(e),()=>{document.head.removeChild(e)}}),[o.open]),(0,un.jsx)(cw,{open:o.open,pages:u,pageId:o.route,onClose:c,onInfo:void 0,onBack:s?()=>{o.setRoute(qx.CONNECTORS)}:void 0})},qx={CONNECTORS:"connectors",PROFILE:"profile",CONNECT:"connect"},Vx=(0,t.createContext)(null),Wx=()=>{const e=t.useContext(Vx);if(!e)throw Error("AlephiumConnect Hook must be inside a Provider.");return e},$x=e=>{let{useTheme:r="auto",useMode:n="auto",useCustomTheme:i,children:o}=e;if(t.useContext(Vx))throw new Error("Multiple, nested usages of AlephiumConnectProvider detected. Please use only one.");const[a,s]=(0,t.useState)(r),[u,c]=(0,t.useState)(n),[l,f]=(0,t.useState)(null!==i&&void 0!==i?i:{}),[d,h]=(0,t.useState)(!1),[p,m]=(0,t.useState)(""),[g,v]=(0,t.useState)(qx.CONNECTORS),[y,b]=(0,t.useState)(),[w,x]=(0,t.useState)(""),[k,E]=(0,t.useState)(),[A,S]=(0,t.useState)(void 0);(0,t.useEffect)((()=>s(a)),[a]),(0,t.useEffect)((()=>x(null)),[g,d]);const M={open:d,setOpen:h,route:g,setRoute:v,connector:p,setConnector:m,account:y,setAccount:b,signerProvider:k,setSignerProvider:E,network:A,setNetwork:S,theme:a,setTheme:s,mode:u,setMode:c,customTheme:l,setCustomTheme:f,errorMessage:w};return(0,t.createElement)(Vx.Provider,{value:M},(0,un.jsx)(un.Fragment,{children:(0,un.jsxs)(my,{theme:tb,children:[o,(0,un.jsx)(Zx,{theme:a,mode:u,customTheme:l})]})}))};function Kx(){const[e,r]=(0,t.useState)(!1);return(0,t.useEffect)((()=>r(!0)),[]),e}const Gx=ub(Mg.div)`
  top: 0;
  bottom: 0;
  left: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
`,Jx=ub(Mg.div)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  height: 40px;
  padding: 0;
  line-height: 0;
  letter-spacing: -0.2px;
  font-size: var(--ck-connectbutton-font-size, 16px);
  font-weight: var(--ck-connectbutton-font-weight, 500);
  text-align: center;
  transition: 100ms ease;
  transition-property: color, background, box-shadow, border-radius;

  color: var(--color);
  background: var(--background);
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);

  &.primary {
    --color: var(--ck-connectbutton-color);
    --background: var(--ck-connectbutton-background);
    --box-shadow: var(--ck-connectbutton-box-shadow);
    --border-radius: var(--ck-connectbutton-border-radius, 12px);

    --hover-color: var(--ck-connectbutton-hover-color, var(--color));
    --hover-background: var(
      --ck-connectbutton-hover-background,
      var(--background)
    );
    --hover-box-shadow: var(
      --ck-connectbutton-hover-box-shadow,
      var(--box-shadow)
    );
    --hover-border-radius: var(
      --ck-connectbutton-hover-border-radius,
      var(--border-radius)
    );

    --active-color: var(--ck-connectbutton-active-color, var(--hover-color));
    --active-background: var(
      --ck-connectbutton-active-background,
      var(--hover-background)
    );
    --active-box-shadow: var(
      --ck-connectbutton-active-box-shadow,
      var(--hover-box-shadow)
    );
    --active-border-radius: var(
      --ck-connectbutton-active-border-radius,
      var(--hover-border-radius)
    );
  }
  &.secondary {
    --color: var(--ck-connectbutton-balance-color);
    --background: var(--ck-connectbutton-balance-background);
    --box-shadow: var(--ck-connectbutton-balance-box-shadow);
    --border-radius: var(
      --ck-connectbutton-balance-border-radius,
      var(--ck-connectbutton-border-radius, 12px)
    );

    --hover-color: var(--ck-connectbutton-balance-hover-color, var(--color));
    --hover-background: var(
      --ck-connectbutton-balance-hover-background,
      var(--background)
    );
    --hover-box-shadow: var(
      --ck-connectbutton-balance-hover-box-shadow,
      var(--box-shadow)
    );
    --hover-border-radius: var(
      --ck-connectbutton-balance-hover-border-radius,
      var(--border-radius)
    );

    --active-color: var(
      --ck-connectbutton-balance-active-color,
      var(--hover-color)
    );
    --active-background: var(
      --ck-connectbutton-balance-active-background,
      var(--hover-background)
    );
    --active-box-shadow: var(
      --ck-connectbutton-balance-active-box-shadow,
      var(--hover-box-shadow)
    );
    --active-border-radius: var(
      --ck-connectbutton-balance-active-border-radius,
      var(--hover-border-radius)
    );
  }
`,Yx=ub.button`
  all: initial;
  appearance: none;
  user-select: none;
  position: relative;
  padding: 0;
  margin: 0;
  background: none;
  border-radius: var(--ck-border-radius);

  &:disabled {
    pointer-events: none;
    opacity: 0.3;
  }

  display: flex;
  flex-wrap: nowrap;
  background: none;
  cursor: pointer;
  * {
    cursor: pointer;
  }
  &:hover {
    ${Jx} {
      color: var(--hover-color, var(--color));
      background: var(--hover-background, var(--background));
      box-shadow: var(--hover-box-shadow, var(--box-shadow));
      border-radius: var(--hover-border-radius, var(--border-radius));
    }
  }
  &:active {
    ${Jx} {
      color: var(--active-color, var(--hover-color, var(--color)));
      background: var(
        --active-background,
        var(--hover-background, var(--background))
      );
      box-shadow: var(
        --active-box-shadow,
        var(--hover-box-shadow, var(--box-shadow))
      );
      border-radius: var(
        --active-border-radius,
        var(--hover-border-radius, var(--border-radius))
      );
    }
  }
  &:focus-visible {
    outline: 2px solid var(--ck-family-brand);
  }
`,Xx=e=>{let{children:t,variant:r="primary",autoSize:n=!0,duration:i=.3,style:o}=e;const[a,s]=Gy();return(0,un.jsx)(Jx,{className:r,initial:!1,animate:n?{width:s.width>10?s.width:"auto"}:void 0,transition:{duration:i,ease:[.25,1,.5,1],delay:.01},style:o,children:(0,un.jsx)("div",{ref:a,style:{whiteSpace:"nowrap",width:"fit-content",position:"relative",padding:"0 12px"},children:t})})},Qx={initial:{zIndex:2,opacity:0,x:"-100%"},animate:{opacity:1,x:.1,transition:{duration:.4,ease:[.25,1,.5,1]}},exit:{zIndex:1,opacity:0,x:"-100%",pointerEvents:"none",position:"absolute",transition:{duration:.4,ease:[.25,1,.5,1]}}},ek={initial:{zIndex:2,opacity:0,x:"100%"},animate:{x:.2,opacity:1,transition:{duration:.4,ease:[.25,1,.5,1]}},exit:{zIndex:1,x:"100%",opacity:0,pointerEvents:"none",position:"absolute",transition:{duration:.4,ease:[.25,1,.5,1]}}},tk={initial:{opacity:0},animate:{opacity:1,transition:{duration:.3,ease:[.25,1,.5,1]}},exit:{position:"absolute",opacity:0,transition:{duration:.3,ease:[.25,1,.5,1]}}},rk=e=>{let{displayAccount:t,children:r}=e;const n=Kx(),i=Wx(),{account:o}=Bx();if(!r)return null;if(!n)return null;const a=o?t(o):void 0;return(0,un.jsx)(un.Fragment,{children:r({show:function(){i.setOpen(!0),i.setRoute(qx.CONNECTORS)},hide:function(){i.setOpen(!1)},isConnected:!!o,isConnecting:!1,address:a,truncatedAddress:a?sb(a):void 0})})};function nk(e){let{label:t,displayAccount:r}=e;Wx();const{account:n}=Bx();return(0,un.jsx)(Og,{initial:!1,children:n?(0,un.jsx)(Gx,{initial:"initial",animate:"animate",exit:"exit",variants:ek,style:{height:40},children:(0,un.jsx)("div",{style:{position:"relative",paddingRight:0},children:(0,un.jsx)(Og,{initial:!1,children:(0,un.jsx)(Gx,{initial:"initial",animate:"animate",exit:"exit",variants:tk,style:{position:"relative"},children:sb(r(n))},"ckTruncatedAddress")})})},"connectedText"):(0,un.jsx)(Gx,{initial:"initial",animate:"animate",exit:"exit",variants:Qx,style:{height:40},children:t||"Connect Alephium"},"connectWalletText")})}function ik(e){let{label:t,onClick:r,displayAccount:n}=e;const i=Kx(),o=Wx(),{isConnected:a}=Bx();function s(){o.setOpen(!0),o.setRoute(a?qx.PROFILE:qx.CONNECTORS)}return i?(0,un.jsx)(nw,{$useTheme:o.theme,$useMode:o.mode,$customTheme:o.customTheme,children:(0,un.jsx)(Yx,{onClick:()=>{r?r(s):s()},children:(0,un.jsx)(Xx,{style:{overflow:"hidden"},children:(0,un.jsx)(nk,{label:t,displayAccount:null!==n&&void 0!==n?n:e=>e.address})})})}):null}rk.displayName="AlephiumConnectButton.Custom",ik.Custom=rk;class ok{constructor(e,t,r,n){this.signer=void 0,this.address=void 0,this.group=void 0,this.balances=void 0,this.nodeProvider=void 0,this.signer=e,this.address=t,this.group=(0,sa.groupOfAddress)(t),this.balances=r,this.nodeProvider=n}}function ak(){const e=Nx(),r=Wx(),{account:n,isConnected:i}=Bx();return(0,t.useMemo)((()=>{var t;if(void 0!==(null===(t=r.signerProvider)||void 0===t?void 0:t.nodeProvider)&&(sa.web3.setCurrentNodeProvider(r.signerProvider.nodeProvider),i&&void 0!==n)){const t=function(e){var t;if(void 0===e)return new Map;const r=new Map,n=BigInt(e.balance)-BigInt(e.lockedBalance);r.set(sa.ALPH_TOKEN_ID,n);const i=null!==(t=e.tokenBalances)&&void 0!==t?t:[];for(const u of i){var o,a,s;const t=BigInt(null!==(o=null===(a=e.lockedTokenBalances)||void 0===a||null===(s=a.find((e=>e.id===u.id)))||void 0===s?void 0:s.amount)&&void 0!==o?o:"0"),n=BigInt(u.amount)-t;r.set(u.id,n)}return r}(e.balance);return new ok(r.signerProvider,n.address,t,r.signerProvider.nodeProvider)}}),[n,i,r,e])}var sk=t.createContext(null);var uk=function(e){e()},ck=function(){return uk};var lk={notify:function(){},get:function(){return[]}};function fk(e,t){var r,n=lk;function i(){a.onStateChange&&a.onStateChange()}function o(){r||(r=t?t.addNestedSub(i):e.subscribe(i),n=function(){var e=ck(),t=null,r=null;return{clear:function(){t=null,r=null},notify:function(){e((function(){for(var e=t;e;)e.callback(),e=e.next}))},get:function(){for(var e=[],r=t;r;)e.push(r),r=r.next;return e},subscribe:function(e){var n=!0,i=r={callback:e,next:null,prev:r};return i.prev?i.prev.next=i:t=i,function(){n&&null!==t&&(n=!1,i.next?i.next.prev=i.prev:r=i.prev,i.prev?i.prev.next=i.next:t=i.next)}}}}())}var a={addNestedSub:function(e){return o(),n.subscribe(e)},notifyNestedSubs:function(){n.notify()},handleChangeWrapper:i,isSubscribed:function(){return Boolean(r)},trySubscribe:o,tryUnsubscribe:function(){r&&(r(),r=void 0,n.clear(),n=lk)},getListeners:function(){return n}};return a}var dk="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement?t.useLayoutEffect:t.useEffect;const hk=function(e){var r=e.store,n=e.context,i=e.children,o=(0,t.useMemo)((function(){var e=fk(r);return{store:r,subscription:e}}),[r]),a=(0,t.useMemo)((function(){return r.getState()}),[r]);dk((function(){var e=o.subscription;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),a!==r.getState()&&e.notifyNestedSubs(),function(){e.tryUnsubscribe(),e.onStateChange=null}}),[o,a]);var s=n||sk;return t.createElement(s.Provider,{value:o},i)};function pk(){return(0,t.useContext)(sk)}function mk(e){void 0===e&&(e=sk);var r=e===sk?pk:function(){return(0,t.useContext)(e)};return function(){return r().store}}var gk=mk();function vk(e){void 0===e&&(e=sk);var t=e===sk?gk:mk(e);return function(){return t().dispatch}}var yk=vk(),bk=function(e,t){return e===t};function wk(e){void 0===e&&(e=sk);var r=e===sk?pk:function(){return(0,t.useContext)(e)};return function(e,n){void 0===n&&(n=bk);var i=r(),o=function(e,r,n,i){var o,a=(0,t.useReducer)((function(e){return e+1}),0)[1],s=(0,t.useMemo)((function(){return fk(n,i)}),[n,i]),u=(0,t.useRef)(),c=(0,t.useRef)(),l=(0,t.useRef)(),f=(0,t.useRef)(),d=n.getState();try{if(e!==c.current||d!==l.current||u.current){var h=e(d);o=void 0!==f.current&&r(h,f.current)?f.current:h}else o=f.current}catch(p){throw u.current&&(p.message+="\nThe error may be correlated with this previous error:\n"+u.current.stack+"\n\n"),p}return dk((function(){c.current=e,l.current=d,f.current=o,u.current=void 0})),dk((function(){function e(){try{var e=n.getState();if(e===l.current)return;var t=c.current(e);if(r(t,f.current))return;f.current=t,l.current=e}catch(p){u.current=p}a()}return s.onStateChange=e,s.trySubscribe(),e(),function(){return s.tryUnsubscribe()}}),[n,s]),o}(e,n,i.store,i.subscription);return(0,t.useDebugValue)(o),o}}var xk,kk=wk();xk=f.unstable_batchedUpdates,uk=xk;const Ek=e=>e.settings.slippageTolerance,Ak=e=>e.settings.deadline;function Sk(e){for(var t=arguments.length,r=Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];throw Error("[Immer] minified error nr: "+e+(r.length?" "+r.map((function(e){return"'"+e+"'"})).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function Mk(e){return!!e&&!!e[mE]}function Ck(e){var t;return!!e&&(function(e){if(!e||"object"!=typeof e)return!1;var t=Object.getPrototypeOf(e);if(null===t)return!0;var r=Object.hasOwnProperty.call(t,"constructor")&&t.constructor;return r===Object||"function"==typeof r&&Function.toString.call(r)===gE}(e)||Array.isArray(e)||!!e[pE]||!!(null===(t=e.constructor)||void 0===t?void 0:t[pE])||jk(e)||Bk(e))}function _k(e,t,r){void 0===r&&(r=!1),0===Pk(e)?(r?Object.keys:vE)(e).forEach((function(n){r&&"symbol"==typeof n||t(n,e[n],e)})):e.forEach((function(r,n){return t(n,r,e)}))}function Pk(e){var t=e[mE];return t?t.i>3?t.i-4:t.i:Array.isArray(e)?1:jk(e)?2:Bk(e)?3:0}function Tk(e,t){return 2===Pk(e)?e.has(t):Object.prototype.hasOwnProperty.call(e,t)}function Ok(e,t){return 2===Pk(e)?e.get(t):e[t]}function Ik(e,t,r){var n=Pk(e);2===n?e.set(t,r):3===n?(e.delete(t),e.add(r)):e[t]=r}function Rk(e,t){return e===t?0!==e||1/e==1/t:e!=e&&t!=t}function jk(e){return lE&&e instanceof Map}function Bk(e){return fE&&e instanceof Set}function Nk(e){return e.o||e.t}function Fk(e){if(Array.isArray(e))return Array.prototype.slice.call(e);var t=yE(e);delete t[mE];for(var r=vE(t),n=0;n<r.length;n++){var i=r[n],o=t[i];!1===o.writable&&(o.writable=!0,o.configurable=!0),(o.get||o.set)&&(t[i]={configurable:!0,writable:!0,enumerable:o.enumerable,value:e[i]})}return Object.create(Object.getPrototypeOf(e),t)}function Dk(e,t){return void 0===t&&(t=!1),Uk(e)||Mk(e)||!Ck(e)||(Pk(e)>1&&(e.set=e.add=e.clear=e.delete=Lk),Object.freeze(e),t&&_k(e,(function(e,t){return Dk(t,!0)}),!0)),e}function Lk(){Sk(2)}function Uk(e){return null==e||"object"!=typeof e||Object.isFrozen(e)}function zk(e){var t=bE[e];return t||Sk(18,e),t}function Hk(e,t){bE[e]||(bE[e]=t)}function Zk(){return uE}function qk(e,t){t&&(zk("Patches"),e.u=[],e.s=[],e.v=t)}function Vk(e){Wk(e),e.p.forEach(Kk),e.p=null}function Wk(e){e===uE&&(uE=e.l)}function $k(e){return uE={p:[],l:uE,h:e,m:!0,_:0}}function Kk(e){var t=e[mE];0===t.i||1===t.i?t.j():t.O=!0}function Gk(e,t){t._=t.p.length;var r=t.p[0],n=void 0!==e&&e!==r;return t.h.g||zk("ES5").S(t,e,n),n?(r[mE].P&&(Vk(t),Sk(4)),Ck(e)&&(e=Jk(t,e),t.l||Xk(t,e)),t.u&&zk("Patches").M(r[mE].t,e,t.u,t.s)):e=Jk(t,r,[]),Vk(t),t.u&&t.v(t.u,t.s),e!==hE?e:void 0}function Jk(e,t,r){if(Uk(t))return t;var n=t[mE];if(!n)return _k(t,(function(i,o){return Yk(e,n,t,i,o,r)}),!0),t;if(n.A!==e)return t;if(!n.P)return Xk(e,n.t,!0),n.t;if(!n.I){n.I=!0,n.A._--;var i=4===n.i||5===n.i?n.o=Fk(n.k):n.o;_k(3===n.i?new Set(i):i,(function(t,o){return Yk(e,n,i,t,o,r)})),Xk(e,i,!1),r&&e.u&&zk("Patches").R(n,r,e.u,e.s)}return n.o}function Yk(e,t,r,n,i,o){if(Mk(i)){var a=Jk(e,i,o&&t&&3!==t.i&&!Tk(t.D,n)?o.concat(n):void 0);if(Ik(r,n,a),!Mk(a))return;e.m=!1}if(Ck(i)&&!Uk(i)){if(!e.h.F&&e._<1)return;Jk(e,i),t&&t.A.l||Xk(e,i)}}function Xk(e,t,r){void 0===r&&(r=!1),e.h.F&&e.m&&Dk(t,r)}function Qk(e,t){var r=e[mE];return(r?Nk(r):e)[t]}function eE(e,t){if(t in e)for(var r=Object.getPrototypeOf(e);r;){var n=Object.getOwnPropertyDescriptor(r,t);if(n)return n;r=Object.getPrototypeOf(r)}}function tE(e){e.P||(e.P=!0,e.l&&tE(e.l))}function rE(e){e.o||(e.o=Fk(e.t))}function nE(e,t,r){var n=jk(t)?zk("MapSet").N(t,r):Bk(t)?zk("MapSet").T(t,r):e.g?function(e,t){var r=Array.isArray(e),n={i:r?1:0,A:t?t.A:Zk(),P:!1,I:!1,D:{},l:t,t:e,k:null,o:null,j:null,C:!1},i=n,o=wE;r&&(i=[n],o=xE);var a=Proxy.revocable(i,o),s=a.revoke,u=a.proxy;return n.k=u,n.j=s,u}(t,r):zk("ES5").J(t,r);return(r?r.A:Zk()).p.push(n),n}function iE(e){return Mk(e)||Sk(22,e),function e(t){if(!Ck(t))return t;var r,n=t[mE],i=Pk(t);if(n){if(!n.P&&(n.i<4||!zk("ES5").K(n)))return n.t;n.I=!0,r=oE(t,i),n.I=!1}else r=oE(t,i);return _k(r,(function(t,i){n&&Ok(n.t,t)===i||Ik(r,t,e(i))})),3===i?new Set(r):r}(e)}function oE(e,t){switch(t){case 2:return new Map(e);case 3:return Array.from(e)}return Fk(e)}function aE(){function e(e,t){var r=i[e];return r?r.enumerable=t:i[e]=r={configurable:!0,enumerable:t,get:function(){var t=this[mE];return wE.get(t,e)},set:function(t){var r=this[mE];wE.set(r,e,t)}},r}function t(e){for(var t=e.length-1;t>=0;t--){var i=e[t][mE];if(!i.P)switch(i.i){case 5:n(i)&&tE(i);break;case 4:r(i)&&tE(i)}}}function r(e){for(var t=e.t,r=e.k,n=vE(r),i=n.length-1;i>=0;i--){var o=n[i];if(o!==mE){var a=t[o];if(void 0===a&&!Tk(t,o))return!0;var s=r[o],u=s&&s[mE];if(u?u.t!==a:!Rk(s,a))return!0}}var c=!!t[mE];return n.length!==vE(t).length+(c?0:1)}function n(e){var t=e.k;if(t.length!==e.t.length)return!0;var r=Object.getOwnPropertyDescriptor(t,t.length-1);if(r&&!r.get)return!0;for(var n=0;n<t.length;n++)if(!t.hasOwnProperty(n))return!0;return!1}var i={};Hk("ES5",{J:function(t,r){var n=Array.isArray(t),i=function(t,r){if(t){for(var n=Array(r.length),i=0;i<r.length;i++)Object.defineProperty(n,""+i,e(i,!0));return n}var o=yE(r);delete o[mE];for(var a=vE(o),s=0;s<a.length;s++){var u=a[s];o[u]=e(u,t||!!o[u].enumerable)}return Object.create(Object.getPrototypeOf(r),o)}(n,t),o={i:n?5:4,A:r?r.A:Zk(),P:!1,I:!1,D:{},l:r,t:t,k:i,o:null,O:!1,C:!1};return Object.defineProperty(i,mE,{value:o,writable:!0}),i},S:function(e,r,i){i?Mk(r)&&r[mE].A===e&&t(e.p):(e.u&&function e(t){if(t&&"object"==typeof t){var r=t[mE];if(r){var i=r.t,o=r.k,a=r.D,s=r.i;if(4===s)_k(o,(function(t){t!==mE&&(void 0!==i[t]||Tk(i,t)?a[t]||e(o[t]):(a[t]=!0,tE(r)))})),_k(i,(function(e){void 0!==o[e]||Tk(o,e)||(a[e]=!1,tE(r))}));else if(5===s){if(n(r)&&(tE(r),a.length=!0),o.length<i.length)for(var u=o.length;u<i.length;u++)a[u]=!1;else for(var c=i.length;c<o.length;c++)a[c]=!0;for(var l=Math.min(o.length,i.length),f=0;f<l;f++)o.hasOwnProperty(f)||(a[f]=!0),void 0===a[f]&&e(o[f])}}}}(e.p[0]),t(e.p))},K:function(e){return 4===e.i?r(e):n(e)}})}var sE,uE,cE="undefined"!=typeof Symbol&&"symbol"==typeof Symbol("x"),lE="undefined"!=typeof Map,fE="undefined"!=typeof Set,dE="undefined"!=typeof Proxy&&void 0!==Proxy.revocable&&"undefined"!=typeof Reflect,hE=cE?Symbol.for("immer-nothing"):((sE={})["immer-nothing"]=!0,sE),pE=cE?Symbol.for("immer-draftable"):"__$immer_draftable",mE=cE?Symbol.for("immer-state"):"__$immer_state",gE=("undefined"!=typeof Symbol&&Symbol.iterator,""+Object.prototype.constructor),vE="undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:void 0!==Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:Object.getOwnPropertyNames,yE=Object.getOwnPropertyDescriptors||function(e){var t={};return vE(e).forEach((function(r){t[r]=Object.getOwnPropertyDescriptor(e,r)})),t},bE={},wE={get:function(e,t){if(t===mE)return e;var r=Nk(e);if(!Tk(r,t))return function(e,t,r){var n,i=eE(t,r);return i?"value"in i?i.value:null===(n=i.get)||void 0===n?void 0:n.call(e.k):void 0}(e,r,t);var n=r[t];return e.I||!Ck(n)?n:n===Qk(e.t,t)?(rE(e),e.o[t]=nE(e.A.h,n,e)):n},has:function(e,t){return t in Nk(e)},ownKeys:function(e){return Reflect.ownKeys(Nk(e))},set:function(e,t,r){var n=eE(Nk(e),t);if(null==n?void 0:n.set)return n.set.call(e.k,r),!0;if(!e.P){var i=Qk(Nk(e),t),o=null==i?void 0:i[mE];if(o&&o.t===r)return e.o[t]=r,e.D[t]=!1,!0;if(Rk(r,i)&&(void 0!==r||Tk(e.t,t)))return!0;rE(e),tE(e)}return e.o[t]===r&&"number"!=typeof r&&(void 0!==r||t in e.o)||(e.o[t]=r,e.D[t]=!0,!0)},deleteProperty:function(e,t){return void 0!==Qk(e.t,t)||t in e.t?(e.D[t]=!1,rE(e),tE(e)):delete e.D[t],e.o&&delete e.o[t],!0},getOwnPropertyDescriptor:function(e,t){var r=Nk(e),n=Reflect.getOwnPropertyDescriptor(r,t);return n?{writable:!0,configurable:1!==e.i||"length"!==t,enumerable:n.enumerable,value:r[t]}:n},defineProperty:function(){Sk(11)},getPrototypeOf:function(e){return Object.getPrototypeOf(e.t)},setPrototypeOf:function(){Sk(12)}},xE={};_k(wE,(function(e,t){xE[e]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)}})),xE.deleteProperty=function(e,t){return xE.set.call(this,e,t,void 0)},xE.set=function(e,t,r){return wE.set.call(this,e[0],t,r,e[0])};var kE=function(){function e(e){var t=this;this.g=dE,this.F=!0,this.produce=function(e,r,n){if("function"==typeof e&&"function"!=typeof r){var i=r;r=e;var o=t;return function(e){var t=this;void 0===e&&(e=i);for(var n=arguments.length,a=Array(n>1?n-1:0),s=1;s<n;s++)a[s-1]=arguments[s];return o.produce(e,(function(e){var n;return(n=r).call.apply(n,[t,e].concat(a))}))}}var a;if("function"!=typeof r&&Sk(6),void 0!==n&&"function"!=typeof n&&Sk(7),Ck(e)){var s=$k(t),u=nE(t,e,void 0),c=!0;try{a=r(u),c=!1}finally{c?Vk(s):Wk(s)}return"undefined"!=typeof Promise&&a instanceof Promise?a.then((function(e){return qk(s,n),Gk(e,s)}),(function(e){throw Vk(s),e})):(qk(s,n),Gk(a,s))}if(!e||"object"!=typeof e){if(void 0===(a=r(e))&&(a=e),a===hE&&(a=void 0),t.F&&Dk(a,!0),n){var l=[],f=[];zk("Patches").M(e,a,l,f),n(l,f)}return a}Sk(21,e)},this.produceWithPatches=function(e,r){if("function"==typeof e)return function(r){for(var n=arguments.length,i=Array(n>1?n-1:0),o=1;o<n;o++)i[o-1]=arguments[o];return t.produceWithPatches(r,(function(t){return e.apply(void 0,[t].concat(i))}))};var n,i,o=t.produce(e,r,(function(e,t){n=e,i=t}));return"undefined"!=typeof Promise&&o instanceof Promise?o.then((function(e){return[e,n,i]})):[o,n,i]},"boolean"==typeof(null==e?void 0:e.useProxies)&&this.setUseProxies(e.useProxies),"boolean"==typeof(null==e?void 0:e.autoFreeze)&&this.setAutoFreeze(e.autoFreeze)}var t=e.prototype;return t.createDraft=function(e){Ck(e)||Sk(8),Mk(e)&&(e=iE(e));var t=$k(this),r=nE(this,e,void 0);return r[mE].C=!0,Wk(t),r},t.finishDraft=function(e,t){var r=(e&&e[mE]).A;return qk(r,t),Gk(void 0,r)},t.setAutoFreeze=function(e){this.F=e},t.setUseProxies=function(e){e&&!dE&&Sk(20),this.g=e},t.applyPatches=function(e,t){var r;for(r=t.length-1;r>=0;r--){var n=t[r];if(0===n.path.length&&"replace"===n.op){e=n.value;break}}r>-1&&(t=t.slice(r+1));var i=zk("Patches").$;return Mk(e)?i(e,t):this.produce(e,(function(e){return i(e,t)}))},e}(),EE=new kE,AE=EE.produce;EE.produceWithPatches.bind(EE),EE.setAutoFreeze.bind(EE),EE.setUseProxies.bind(EE),EE.applyPatches.bind(EE),EE.createDraft.bind(EE),EE.finishDraft.bind(EE);const SE=AE;function ME(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function CE(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ME(Object(r),!0).forEach((function(t){(0,er.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ME(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function _E(e){return"Minified Redux error #"+e+"; visit https://redux.js.org/Errors?code="+e+" for the full message or use the non-minified dev environment for full errors. "}var PE="function"===typeof Symbol&&Symbol.observable||"@@observable",TE=function(){return Math.random().toString(36).substring(7).split("").join(".")},OE={INIT:"@@redux/INIT"+TE(),REPLACE:"@@redux/REPLACE"+TE(),PROBE_UNKNOWN_ACTION:function(){return"@@redux/PROBE_UNKNOWN_ACTION"+TE()}};function IE(e){if("object"!==typeof e||null===e)return!1;for(var t=e;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}function RE(e,t,r){var n;if("function"===typeof t&&"function"===typeof r||"function"===typeof r&&"function"===typeof arguments[3])throw new Error(_E(0));if("function"===typeof t&&"undefined"===typeof r&&(r=t,t=void 0),"undefined"!==typeof r){if("function"!==typeof r)throw new Error(_E(1));return r(RE)(e,t)}if("function"!==typeof e)throw new Error(_E(2));var i=e,o=t,a=[],s=a,u=!1;function c(){s===a&&(s=a.slice())}function l(){if(u)throw new Error(_E(3));return o}function f(e){if("function"!==typeof e)throw new Error(_E(4));if(u)throw new Error(_E(5));var t=!0;return c(),s.push(e),function(){if(t){if(u)throw new Error(_E(6));t=!1,c();var r=s.indexOf(e);s.splice(r,1),a=null}}}function d(e){if(!IE(e))throw new Error(_E(7));if("undefined"===typeof e.type)throw new Error(_E(8));if(u)throw new Error(_E(9));try{u=!0,o=i(o,e)}finally{u=!1}for(var t=a=s,r=0;r<t.length;r++){(0,t[r])()}return e}function h(e){if("function"!==typeof e)throw new Error(_E(10));i=e,d({type:OE.REPLACE})}function p(){var e,t=f;return(e={subscribe:function(e){if("object"!==typeof e||null===e)throw new Error(_E(11));function r(){e.next&&e.next(l())}return r(),{unsubscribe:t(r)}}})[PE]=function(){return this},e}return d({type:OE.INIT}),(n={dispatch:d,subscribe:f,getState:l,replaceReducer:h})[PE]=p,n}function jE(e){for(var t=Object.keys(e),r={},n=0;n<t.length;n++){var i=t[n];0,"function"===typeof e[i]&&(r[i]=e[i])}var o,a=Object.keys(r);try{!function(e){Object.keys(e).forEach((function(t){var r=e[t];if("undefined"===typeof r(void 0,{type:OE.INIT}))throw new Error(_E(12));if("undefined"===typeof r(void 0,{type:OE.PROBE_UNKNOWN_ACTION()}))throw new Error(_E(13))}))}(r)}catch(s){o=s}return function(e,t){if(void 0===e&&(e={}),o)throw o;for(var n=!1,i={},s=0;s<a.length;s++){var u=a[s],c=r[u],l=e[u],f=c(l,t);if("undefined"===typeof f){t&&t.type;throw new Error(_E(14))}i[u]=f,n=n||f!==l}return(n=n||a.length!==Object.keys(e).length)?i:e}}function BE(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return 0===t.length?function(e){return e}:1===t.length?t[0]:t.reduce((function(e,t){return function(){return e(t.apply(void 0,arguments))}}))}function NE(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){return function(){var r=e.apply(void 0,arguments),n=function(){throw new Error(_E(15))},i={getState:r.getState,dispatch:function(){return n.apply(void 0,arguments)}},o=t.map((function(e){return e(i)}));return n=BE.apply(void 0,o)(r.dispatch),CE(CE({},r),{},{dispatch:n})}}}function FE(e){return function(t){var r=t.dispatch,n=t.getState;return function(t){return function(i){return"function"===typeof i?i(r,n,e):t(i)}}}}var DE=FE();DE.withExtraArgument=FE;const LE=DE;r(4501);var UE=function(){var e=function(t,r){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},e(t,r)};return function(t,r){if("function"!==typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),zE=function(e,t){var r,n,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"===typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,n=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=(i=a.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(e,a)}catch(s){o=[6,s],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}},HE=function(e,t){for(var r=0,n=t.length,i=e.length;r<n;r++,i++)e[i]=t[r];return e},ZE=Object.defineProperty,qE=Object.defineProperties,VE=Object.getOwnPropertyDescriptors,WE=Object.getOwnPropertySymbols,$E=Object.prototype.hasOwnProperty,KE=Object.prototype.propertyIsEnumerable,GE=function(e,t,r){return t in e?ZE(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r},JE=function(e,t){for(var r in t||(t={}))$E.call(t,r)&&GE(e,r,t[r]);if(WE)for(var n=0,i=WE(t);n<i.length;n++){r=i[n];KE.call(t,r)&&GE(e,r,t[r])}return e},YE=function(e,t){return qE(e,VE(t))},XE=function(e,t,r){return new Promise((function(n,i){var o=function(e){try{s(r.next(e))}catch(t){i(t)}},a=function(e){try{s(r.throw(e))}catch(t){i(t)}},s=function(e){return e.done?n(e.value):Promise.resolve(e.value).then(o,a)};s((r=r.apply(e,t)).next())}))},QE="undefined"!==typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(0!==arguments.length)return"object"===typeof arguments[0]?BE:BE.apply(null,arguments)};"undefined"!==typeof window&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;function eA(e){if("object"!==typeof e||null===e)return!1;var t=Object.getPrototypeOf(e);if(null===t)return!0;for(var r=t;null!==Object.getPrototypeOf(r);)r=Object.getPrototypeOf(r);return t===r}var tA=function(e){function t(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];var i=e.apply(this,r)||this;return Object.setPrototypeOf(i,t.prototype),i}return UE(t,e),Object.defineProperty(t,Symbol.species,{get:function(){return t},enumerable:!1,configurable:!0}),t.prototype.concat=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return e.prototype.concat.apply(this,t)},t.prototype.prepend=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return 1===e.length&&Array.isArray(e[0])?new(t.bind.apply(t,HE([void 0],e[0].concat(this)))):new(t.bind.apply(t,HE([void 0],e.concat(this))))},t}(Array);function rA(e){return Ck(e)?SE(e,(function(){})):e}function nA(){return function(e){return function(e){void 0===e&&(e={});var t=e.thunk,r=void 0===t||t,n=(e.immutableCheck,e.serializableCheck,new tA);r&&(!function(e){return"boolean"===typeof e}(r)?n.push(LE.withExtraArgument(r.extraArgument)):n.push(LE));0;return n}(e)}}function iA(e,t){function r(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];if(t){var i=t.apply(void 0,r);if(!i)throw new Error("prepareAction did not return an object");return JE(JE({type:e,payload:i.payload},"meta"in i&&{meta:i.meta}),"error"in i&&{error:i.error})}return{type:e,payload:r[0]}}return r.toString=function(){return""+e},r.type=e,r.match=function(t){return t.type===e},r}function oA(e){var t,r={},n=[],i={addCase:function(e,t){var n="string"===typeof e?e:e.type;if(n in r)throw new Error("addCase cannot be called with two reducers for the same action type");return r[n]=t,i},addMatcher:function(e,t){return n.push({matcher:e,reducer:t}),i},addDefaultCase:function(e){return t=e,i}};return e(i),[r,n,t]}function aA(e,t,r,n){void 0===r&&(r=[]);var i,o="function"===typeof t?oA(t):[t,r,n],a=o[0],s=o[1],u=o[2];if(function(e){return"function"===typeof e}(e))i=function(){return rA(e())};else{var c=rA(e);i=function(){return c}}function l(e,t){void 0===e&&(e=i());var r=HE([a[t.type]],s.filter((function(e){return(0,e.matcher)(t)})).map((function(e){return e.reducer})));return 0===r.filter((function(e){return!!e})).length&&(r=[u]),r.reduce((function(e,r){if(r){var n;if(Mk(e))return void 0===(n=r(e,t))?e:n;if(Ck(e))return SE(e,(function(e){return r(e,t)}));if(void 0===(n=r(e,t))){if(null===e)return e;throw Error("A case reducer on a non-draftable value must not return undefined")}return n}return e}),e)}return l.getInitialState=i,l}var sA=function(e){void 0===e&&(e=21);for(var t="",r=e;r--;)t+="ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW"[64*Math.random()|0];return t},uA=["name","message","stack","code"],cA=function(e,t){this.payload=e,this.meta=t},lA=function(e,t){this.payload=e,this.meta=t},fA=function(e){if("object"===typeof e&&null!==e){for(var t={},r=0,n=uA;r<n.length;r++){var i=n[r];"string"===typeof e[i]&&(t[i]=e[i])}return t}return{message:String(e)}};!function(){function e(e,t,r){var n=iA(e+"/fulfilled",(function(e,t,r,n){return{payload:e,meta:YE(JE({},n||{}),{arg:r,requestId:t,requestStatus:"fulfilled"})}})),i=iA(e+"/pending",(function(e,t,r){return{payload:void 0,meta:YE(JE({},r||{}),{arg:t,requestId:e,requestStatus:"pending"})}})),o=iA(e+"/rejected",(function(e,t,n,i,o){return{payload:i,error:(r&&r.serializeError||fA)(e||"Rejected"),meta:YE(JE({},o||{}),{arg:n,requestId:t,rejectedWithValue:!!i,requestStatus:"rejected",aborted:"AbortError"===(null==e?void 0:e.name),condition:"ConditionError"===(null==e?void 0:e.name)})}})),a="undefined"!==typeof AbortController?AbortController:function(){function e(){this.signal={aborted:!1,addEventListener:function(){},dispatchEvent:function(){return!1},onabort:function(){},removeEventListener:function(){},reason:void 0,throwIfAborted:function(){}}}return e.prototype.abort=function(){0},e}();return Object.assign((function(e){return function(s,u,c){var l,f=(null==r?void 0:r.idGenerator)?r.idGenerator(e):sA(),d=new a;function h(e){l=e,d.abort()}var p=function(){return XE(this,null,(function(){var a,p,m,g,v,y;return zE(this,(function(b){switch(b.label){case 0:return b.trys.push([0,4,,5]),g=null==(a=null==r?void 0:r.condition)?void 0:a.call(r,e,{getState:u,extra:c}),null===(w=g)||"object"!==typeof w||"function"!==typeof w.then?[3,2]:[4,g];case 1:g=b.sent(),b.label=2;case 2:if(!1===g||d.signal.aborted)throw{name:"ConditionError",message:"Aborted due to condition callback returning false."};return!0,v=new Promise((function(e,t){return d.signal.addEventListener("abort",(function(){return t({name:"AbortError",message:l||"Aborted"})}))})),s(i(f,e,null==(p=null==r?void 0:r.getPendingMeta)?void 0:p.call(r,{requestId:f,arg:e},{getState:u,extra:c}))),[4,Promise.race([v,Promise.resolve(t(e,{dispatch:s,getState:u,extra:c,requestId:f,signal:d.signal,abort:h,rejectWithValue:function(e,t){return new cA(e,t)},fulfillWithValue:function(e,t){return new lA(e,t)}})).then((function(t){if(t instanceof cA)throw t;return t instanceof lA?n(t.payload,f,e,t.meta):n(t,f,e)}))])];case 3:return m=b.sent(),[3,5];case 4:return y=b.sent(),m=y instanceof cA?o(null,f,e,y.payload,y.meta):o(y,f,e),[3,5];case 5:return r&&!r.dispatchConditionRejection&&o.match(m)&&m.meta.condition||s(m),[2,m]}var w}))}))}();return Object.assign(p,{abort:h,requestId:f,arg:e,unwrap:function(){return p.then(dA)}})}}),{pending:i,rejected:o,fulfilled:n,typePrefix:e})}e.withTypes=function(){return e}}();function dA(e){if(e.meta&&e.meta.rejectedWithValue)throw e.payload;if(e.error)throw e.error;return e.payload}Object.assign;var hA="listenerMiddleware";iA(hA+"/add"),iA(hA+"/removeAll"),iA(hA+"/remove");"function"===typeof queueMicrotask&&queueMicrotask.bind("undefined"!==typeof window?window:"undefined"!==typeof r.g?r.g:globalThis);var pA,mA=function(e){return function(t){setTimeout(t,e)}};"undefined"!==typeof window&&window.requestAnimationFrame?window.requestAnimationFrame:mA(10);aE();const gA=3600,vA=.5,yA=function(e){var t=e.name;if(!t)throw new Error("`name` is a required option for createSlice");var r,n="function"==typeof e.initialState?e.initialState:rA(e.initialState),i=e.reducers||{},o=Object.keys(i),a={},s={},u={};function c(){var t="function"===typeof e.extraReducers?oA(e.extraReducers):[e.extraReducers],r=t[0],i=void 0===r?{}:r,o=t[1],a=void 0===o?[]:o,u=t[2],c=void 0===u?void 0:u,l=JE(JE({},i),s);return aA(n,(function(e){for(var t in l)e.addCase(t,l[t]);for(var r=0,n=a;r<n.length;r++){var i=n[r];e.addMatcher(i.matcher,i.reducer)}c&&e.addDefaultCase(c)}))}return o.forEach((function(e){var r,n,o=i[e],c=t+"/"+e;"reducer"in o?(r=o.reducer,n=o.prepare):r=o,a[e]=r,s[c]=r,u[e]=n?iA(c,n):iA(c)})),{name:t,reducer:function(e,t){return r||(r=c()),r(e,t)},actions:u,caseReducers:a,getInitialState:function(){return r||(r=c()),r.getInitialState()}}}({name:"state",initialState:{slippageTolerance:"auto",deadline:gA},reducers:{updateSlippageTolerance(e,t){e.slippageTolerance=t.payload.slippageTolerance},updateDeadline(e,t){e.deadline=t.payload.deadline}}}),{updateSlippageTolerance:bA,updateDeadline:wA}=yA.actions,xA=yA.reducer;function kA(){const e=yk(),r=kk(Ak),n=(0,t.useCallback)((t=>{e(wA({deadline:t}))}),[e]);return[r,n]}function EA(){const e=kk(Ek),r=yk(),n=(0,t.useCallback)((e=>{r(bA({slippageTolerance:e}))}),[r]);return(0,t.useMemo)((()=>[e,n]),[e,n])}const AA=iA("swap/selectTokenIn"),SA=iA("swap/selectTokenOut"),MA=iA("swap/switchTokens"),CA=iA("swap/typeInput"),_A=iA("swap/reset"),PA=e=>e.swap;function TA(e,r,n){const[i,o]=(0,t.useState)(void 0);return(0,t.useEffect)((()=>{void 0!==e&&void 0!==r&&ju(e,r).then((e=>o(e))).catch((e=>n(e)))}),[e,r,n]),i}function OA(e){const{lastInput:r,inputValue:n,tokenInInfo:i,tokenOutInfo:o}=kk(PA),a=TA(i,o,e),[s,u]=(0,t.useMemo)((()=>{const t="TokenIn"===r?i:o;try{return e(void 0),[$u(n,null===t||void 0===t?void 0:t.decimals),t]}catch(a){return console.log(`Invalid input: ${n}, ${null===t||void 0===t?void 0:t.decimals}`),e(`${a}`),[void 0,void 0]}}),[r,i,o,n,e]),c=(0,t.useMemo)((()=>void 0===r?void 0:"TokenIn"===r?"ExactIn":"ExactOut"),[r]),l=(0,t.useMemo)((()=>{try{if(0n===(null===a||void 0===a?void 0:a.reserve0))throw new Error("This pool has no liquidity yet, please add liquidity to this pool first");return s&&u&&a&&c?function(e,t,r,n){return"ExactIn"===t?function(e,t,r){return t===e.token0Info.tokenId?Nu(r,e.reserve0,e.reserve1):Nu(r,e.reserve1,e.reserve0)}(e,n,r):Bu(e,n,r)}(a,c,s,u.tokenId):void 0}catch(t){return console.log(`${t}`),void e(`${t}`)}}),[a,s,u,e,c]),[f,d,h,p]=(0,t.useMemo)((()=>{try{const e="TokenIn"===r?n:Gu(l,null===i||void 0===i?void 0:i.decimals),t="TokenOut"===r?n:Gu(l,null===o||void 0===o?void 0:o.decimals);return[e,t,"TokenIn"===r?s:l,"TokenOut"===r?s:l]}catch(t){return console.log(`${t}`),e(`${t}`),[void 0,void 0,void 0,void 0]}}),[r,l,s,n,i,o,e]);return{tokenInInput:f,tokenOutInput:d,tokenInAmount:h,tokenOutAmount:p,tokenPairState:a,swapType:c}}const IA=L((e=>({numberField:{flexGrow:1,"& > * > .MuiInputBase-input":{textAlign:"right",height:"100%",flexGrow:"1",fontSize:"1.5rem",fontFamily:"Roboto Mono, monospace",caretShape:"block",width:"0","&::-webkit-outer-spin-button, &::-webkit-inner-spin-button":{"-webkit-appearance":"none","-moz-appearance":"none",margin:0}},"& > * > input::-webkit-inner-spin-button":{webkitAppearance:"none",margin:"0"}},tokenContainerWithBalance:{minHeight:"44px",padding:".2rem .8rem",border:"3px solid #333333",borderRadius:"10px",width:"initial",height:"80px"},balance:{display:"flex",padding:"0.1rem"},inputRow:{display:"flex",flexFlow:"row nowrap",alignItems:"center",justifyContent:"space-between"},tokenContainer:{display:"flex",justifyContent:"space-between",alignItems:"center",border:"3px solid #333333",padding:".6rem",borderRadius:"10px","& > *":{margin:".1rem"},margin:".5rem 0rem .5rem 0rem",height:"60px"},centeredContainer:{textAlign:"center",width:"100%"},spacer:{height:"1rem"},mainPaper:{padding:"2rem",backgroundColor:Nr},titleBar:{marginTop:"10rem","& > *":{margin:".5rem",alignSelf:"flex-end"}},gradientButton:{backgroundImage:`linear-gradient(45deg, ${_r} 0%, ${Br}20 50%,  ${_r}30 62%, ${Br}50  120%)`,transition:"0.75s",backgroundSize:"200% auto",boxShadow:"0 0 20px #222","&:hover":{backgroundPosition:"right center"},width:"100%",height:"3rem",marginTop:"1rem"},disabled:{background:Tr},loaderHolder:{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"},successIcon:{color:Or,fontSize:"200px"},error:{marginTop:e.spacing(1),textAlign:"center"},notification:{display:"flex",justifyContent:"space-between"},leftAlign:{textAlign:"left",fontSize:"15px",fontFamily:"monospace"},rightAlign:{textAlign:"right",fontSize:"15px",fontFamily:"monospace"},tokenPairContainer:{display:"flex",justifyContent:"space-between",margin:".5rem 0rem .5rem 0rem",height:"30px"}})));const RA=function(e){let{dexTokens:r}=e;const n=IA(),[i,o]=(0,t.useState)(!1),[a,s]=(0,t.useState)(!1),u=yk(),[c,l]=(0,t.useState)(void 0),[f]=EA(),[d]=kA(),h=ak(),p=(0,t.useCallback)((e=>{u(AA(e))}),[u]),m=(0,t.useCallback)((e=>{u(SA(e))}),[u]),{tokenInInfo:g,tokenOutInfo:v}=kk(PA),{tokenInInput:y,tokenOutInput:b,tokenInAmount:w,tokenOutAmount:x,tokenPairState:k,swapType:E}=OA(l),A=(0,t.useCallback)((e=>{u(CA({type:"TokenIn",value:e.target.value}))}),[u]),S=(0,t.useCallback)((e=>{u(CA({type:"TokenOut",value:e.target.value}))}),[u]),M=(0,t.useCallback)((()=>{u(MA())}),[u]),C=(0,t.useCallback)((()=>{u(_A()),o(!1),s(!1),l(void 0)}),[u]),_=(0,t.useMemo)((()=>Yu(null===h||void 0===h?void 0:h.balances,g)),[h,g]),P=(0,t.useMemo)((()=>Yu(null===h||void 0===h?void 0:h.balances,v)),[h,v]),T=(0,un.jsxs)("div",{className:n.tokenContainerWithBalance,children:[(0,un.jsxs)("div",{className:n.inputRow,children:[(0,un.jsx)(Ni,{dexTokens:r,tokenAddress:null===g||void 0===g?void 0:g.tokenAddress,counterpart:null===v||void 0===v?void 0:v.tokenAddress,onChange:p,style2:!0}),(0,un.jsx)(Xu,{className:n.numberField,value:void 0!==y?y:"",onChange:A,autoFocus:!0,InputProps:{disableUnderline:!0},disabled:!!a||!!i})]}),_?(0,un.jsxs)(vr,{className:n.balance,children:["Balance: ",_]}):null]}),O=(0,un.jsx)(Ui,{onClick:M}),I=(0,un.jsxs)("div",{className:n.tokenContainerWithBalance,children:[(0,un.jsxs)("div",{className:n.inputRow,children:[(0,un.jsx)(Ni,{dexTokens:r,tokenAddress:null===v||void 0===v?void 0:v.tokenAddress,counterpart:null===g||void 0===g?void 0:g.tokenAddress,onChange:m}),(0,un.jsx)(Xu,{className:n.numberField,value:void 0!==b?b:"",onChange:S,InputProps:{disableUnderline:!0},disabled:!!a||!!i})]}),P?(0,un.jsxs)(vr,{className:n.balance,children:["Balance: ",P]}):null]}),R=(0,t.useCallback)((async()=>{try{if(s(!0),void 0!==E&&void 0!==h&&void 0!==k&&void 0!==g&&void 0!==w&&void 0!==x){if(0n===w)throw new Error("the input amount must be greater than 0");const e=await Du(E,h.balances,h.signer,h.nodeProvider,h.address,k.tokenPairId,g,w,x,"auto"===f?vA:f,d);console.log(`swap succeed, tx id: ${e.txId}`),o(!0),s(!1)}}catch(c){l(`${c}`),s(!1),console.error(`failed to swap, error: ${c}`)}}),[h,k,g,w,x,f,d,E]),j=void 0!==h&&void 0!==g&&void 0!==v&&void 0!==w&&void 0!==x&&void 0!==E&&!a&&!i&&void 0===c,B=(0,un.jsx)(ln,{disabled:!j,onClick:R,className:n.gradientButton+(j?"":" "+n.disabled),children:"Swap"});return(0,un.jsxs)(Ur,{className:n.centeredContainer,maxWidth:"sm",children:[(0,un.jsx)("div",{className:n.titleBar}),(0,un.jsx)(vr,{variant:"h4",color:"textSecondary",children:"Swap"}),(0,un.jsx)("div",{className:n.spacer}),(0,un.jsxs)(Yt,{className:n.mainPaper,children:[(0,un.jsx)(H,{in:!!i,children:(0,un.jsxs)(un.Fragment,{children:[(0,un.jsx)(nn.Z,{fontSize:"inherit",className:n.successIcon}),(0,un.jsx)(vr,{children:"Swap succeed!"}),(0,un.jsx)("div",{className:n.spacer}),(0,un.jsx)("div",{className:n.spacer}),(0,un.jsx)(rn,{onClick:C,variant:"contained",color:"primary",children:"Swap More Coins"})]})}),(0,un.jsx)("div",{className:n.loaderHolder,children:(0,un.jsx)(H,{in:!!a&&!i,children:(0,un.jsxs)("div",{className:n.loaderHolder,children:[(0,un.jsx)(Fi,{}),(0,un.jsx)("div",{className:n.spacer}),(0,un.jsx)("div",{className:n.spacer}),(0,un.jsx)(vr,{variant:"h5",children:"Swapping..."}),(0,un.jsx)("div",{className:n.spacer})]})})}),(0,un.jsx)("div",{children:(0,un.jsxs)(H,{in:!a&&!i,children:[(0,un.jsxs)(un.Fragment,{children:[T,O,I,c?(0,un.jsx)(vr,{variant:"body2",color:"error",className:n.error,children:c}):null,(0,un.jsx)("div",{className:n.spacer})]}),B]})})]}),(0,un.jsx)("div",{className:n.spacer})]})},jA=iA("mint/selectTokenA"),BA=iA("mint/selectTokenB"),NA=iA("mint/typeInput"),FA=iA("mint/reset"),DA=e=>e.mint;function LA(e){const{lastInput:r,inputValue:n,otherInputValue:i,tokenAInfo:o,tokenBInfo:a}=kk(DA),s=TA(o,a,e),u=(0,t.useMemo)((()=>{const t="TokenA"===r?o:a;try{return e(void 0),$u(n,null===t||void 0===t?void 0:t.decimals)}catch(i){return console.log(`Invalid input: ${n}, ${null===t||void 0===t?void 0:t.decimals}`),void e(`${i}`)}}),[r,o,a,n,e]),c=(0,t.useMemo)((()=>{const t="TokenA"===r?a:o;try{return $u(i,null===t||void 0===t?void 0:t.decimals)}catch(n){return console.log(`Invalid input: ${i}, ${null===t||void 0===t?void 0:t.decimals}`),void e(`${n}`)}}),[i,r,o,a,e]),l=(0,t.useMemo)((()=>{try{if(void 0!==s&&0n===s.reserve0)return u&&c?function(e,t){const r=function(e){if(e>3){let t=e,r=e/2n+1n;for(;r<t;)t=r,r=(e/r+r)/2n;return t}return 1n}(e*t);if(r<=Pu)throw new Error("insufficient initial liquidity");return{amountA:e,amountB:t,shareAmount:r-Pu,sharePercentage:100}}(u,c):void 0;const e="TokenA"===r?o:a;return e&&u&&s&&r?function(e,t,r,n){const[i,o]=t===e.token0Info.tokenId?[e.reserve0,e.reserve1]:[e.reserve1,e.reserve0],a=r*o/i,s=r*e.totalSupply/i,u=a*e.totalSupply/o,c=s<u?s:u,l=e.totalSupply+c,f=Ia((100n*c).toString()).div(Ia(l.toString())).toFixed(5);return{amountA:"TokenA"===n?r:a,amountB:"TokenA"===n?a:r,shareAmount:c,sharePercentage:parseFloat(f)}}(s,e.tokenId,u,r):void 0}catch(t){return console.log(`${t}`),void e(`${t}`)}}),[s,r,o,a,u,c,e]);return(0,t.useMemo)((()=>{if(void 0===s||0n===s.reserve0){const[e,t,o,a]="TokenA"===r?[n,i,u,c]:[i,n,c,u];return{tokenAInput:e,tokenBInput:t,tokenAAmount:o,tokenBAmount:a,tokenPairState:s,addLiquidityResult:l}}try{const e="TokenA"===r?n:Gu(null===l||void 0===l?void 0:l.amountA,null===o||void 0===o?void 0:o.decimals),t="TokenB"===r?n:Gu(null===l||void 0===l?void 0:l.amountB,null===a||void 0===a?void 0:a.decimals),i="TokenA"===r?u:null===l||void 0===l?void 0:l.amountA;return{tokenAInput:e,tokenBInput:t,tokenAAmount:i,tokenBAmount:"TokenB"===r?u:null===l||void 0===l?void 0:l.amountB,tokenPairState:s,addLiquidityResult:l}}catch(t){return console.log(`${t}`),e(`${t}`),{tokenAInput:void 0,tokenBInput:void 0,tokenAAmount:void 0,tokenBAmount:void 0,tokenPairState:s,addLiquidityResult:l}}}),[s,r,n,i,u,c,l,o,a,e])}const UA=function(e){let{dexTokens:r}=e;const n=IA(),[i,o]=(0,t.useState)(!1),[a,s]=(0,t.useState)(!1),[u]=EA(),[c]=kA(),l=yk(),[f,d]=(0,t.useState)(void 0),h=ak(),p=(0,t.useCallback)((e=>{l(jA(e))}),[l]),m=(0,t.useCallback)((e=>{l(BA(e))}),[l]),{tokenAInfo:g,tokenBInfo:v}=kk(DA),{tokenAInput:y,tokenBInput:b,tokenAAmount:w,tokenBAmount:x,tokenPairState:k,addLiquidityResult:E}=LA(d),A=(0,t.useCallback)((e=>{const t=void 0!==k&&k.reserve0>0n;l(NA({type:"TokenA",value:e.target.value,hasLiquidity:t}))}),[l,k]),S=(0,t.useCallback)((e=>{const t=void 0!==k&&k.reserve0>0n;l(NA({type:"TokenB",value:e.target.value,hasLiquidity:t}))}),[l,k]),M=(0,t.useCallback)((()=>{l(FA()),o(!1),s(!1),d(void 0)}),[l]),C=(0,t.useMemo)((()=>Yu(null===h||void 0===h?void 0:h.balances,g)),[h,g]),_=(0,t.useMemo)((()=>Yu(null===h||void 0===h?void 0:h.balances,v)),[h,v]),P=(0,un.jsxs)("div",{className:n.tokenContainerWithBalance,children:[(0,un.jsxs)("div",{className:n.inputRow,children:[(0,un.jsx)(Ni,{dexTokens:r,tokenAddress:null===g||void 0===g?void 0:g.tokenAddress,counterpart:null===v||void 0===v?void 0:v.tokenAddress,onChange:p,style2:!0}),(0,un.jsx)(Xu,{className:n.numberField,value:void 0!==y?y:"",onChange:A,autoFocus:!0,InputProps:{disableUnderline:!0},disabled:!!a||!!i})]}),C?(0,un.jsxs)(vr,{className:n.balance,children:["Balance: ",C]}):null]}),T=(0,un.jsxs)("div",{className:n.tokenContainerWithBalance,children:[(0,un.jsxs)("div",{className:n.inputRow,children:[(0,un.jsx)(Ni,{dexTokens:r,tokenAddress:null===v||void 0===v?void 0:v.tokenAddress,counterpart:null===g||void 0===g?void 0:g.tokenAddress,onChange:m}),(0,un.jsx)(Xu,{className:n.numberField,value:void 0!==b?b:"",onChange:S,InputProps:{disableUnderline:!0},disabled:!!a||!!i})]}),_?(0,un.jsxs)(vr,{className:n.balance,children:["Balance: ",_]}):null]}),O=(0,t.useCallback)((async()=>{try{if(s(!0),void 0!==h&&void 0!==k&&void 0!==g&&void 0!==v&&void 0!==w&&void 0!==x){if(0n===w||0n===x)throw new Error("the input amount must be greater than 0");const e=await Hu(h.balances,h.signer,h.nodeProvider,h.address,k,g,v,w,x,"auto"===u?vA:u,c);console.log(`add liquidity succeed, tx id: ${e.txId}`),o(!0),s(!1)}}catch(f){d(`${f}`),s(!1),console.error(`failed to add liquidity, error: ${f}`)}}),[h,k,g,v,w,x,u,c]),I=void 0!==h&&void 0!==g&&void 0!==v&&void 0!==w&&void 0!==x&&!a&&!i&&void 0===f,R=(0,un.jsx)(ln,{disabled:!I,onClick:O,className:n.gradientButton+(I?"":" "+n.disabled),children:"Add Liquidity"});return(0,un.jsxs)(Ur,{className:n.centeredContainer,maxWidth:"sm",children:[(0,un.jsx)("div",{className:n.titleBar}),(0,un.jsx)(vr,{variant:"h4",color:"textSecondary",children:"Add Liquidity"}),(0,un.jsx)("div",{className:n.spacer}),(0,un.jsxs)(Yt,{className:n.mainPaper,children:[(0,un.jsx)(H,{in:!!i,children:(0,un.jsxs)(un.Fragment,{children:[(0,un.jsx)(nn.Z,{fontSize:"inherit",className:n.successIcon}),(0,un.jsx)(vr,{children:"Add liquidity succeed!"}),(0,un.jsx)("div",{className:n.spacer}),(0,un.jsx)("div",{className:n.spacer}),(0,un.jsx)(rn,{onClick:M,variant:"contained",color:"primary",children:"Add More Liquidity!"})]})}),(0,un.jsx)("div",{className:n.loaderHolder,children:(0,un.jsx)(H,{in:!!a&&!i,children:(0,un.jsxs)("div",{className:n.loaderHolder,children:[(0,un.jsx)(Fi,{}),(0,un.jsx)("div",{className:n.spacer}),(0,un.jsx)("div",{className:n.spacer}),(0,un.jsx)(vr,{variant:"h5",children:"Adding liquidity..."}),(0,un.jsx)("div",{className:n.spacer})]})})}),(0,un.jsx)("div",{children:(0,un.jsxs)(H,{in:!a&&!i,children:[(0,un.jsxs)(un.Fragment,{children:[P,(0,un.jsx)("div",{className:n.spacer}),T,f?(0,un.jsx)(vr,{variant:"body2",color:"error",className:n.error,children:f}):null,(0,un.jsx)("div",{className:n.spacer})]}),E&&k&&!f?((e,t,r)=>{const i="auto"===r?vA:r;return(0,un.jsxs)(un.Fragment,{children:[(0,un.jsxs)("div",{className:n.notification,children:[(0,un.jsx)("p",{className:n.leftAlign,children:"Share amount:"}),(0,un.jsx)("p",{className:n.rightAlign,children:Ku(t.shareAmount,Tu)})]}),(0,un.jsxs)("div",{className:n.notification,children:[(0,un.jsx)("p",{className:n.leftAlign,children:"Share percentage:"}),(0,un.jsxs)("p",{className:n.rightAlign,children:[t.sharePercentage,"%"]})]}),e.reserve0>0n?(0,un.jsxs)(un.Fragment,{children:[(0,un.jsxs)("div",{className:n.notification,children:[(0,un.jsxs)("p",{className:n.leftAlign,children:["Minimal amount of token ",e.token0Info.symbol,":"]}),(0,un.jsx)("p",{className:n.rightAlign,children:Ku(zu(t.amountA,i),e.token0Info.decimals)})]}),(0,un.jsxs)("div",{className:n.notification,children:[(0,un.jsxs)("p",{className:n.leftAlign,children:["Minimal amount of token ",e.token1Info.symbol,":"]}),(0,un.jsx)("p",{className:n.rightAlign,children:Ku(zu(t.amountB,i),e.token1Info.decimals)})]})]}):null]})})(k,E,u):null,R]})})]}),(0,un.jsx)("div",{className:n.spacer})]})};const zA=function(e){let{dexTokens:r}=e;const n=IA(),[i,o]=(0,t.useState)(void 0),[a,s]=(0,t.useState)(void 0),[u,c]=(0,t.useState)(void 0),[l,f]=(0,t.useState)(void 0),[d,h]=(0,t.useState)(void 0),[p,m]=(0,t.useState)(void 0),[g,v]=(0,t.useState)(!1),[y,b]=(0,t.useState)(!1),[w]=EA(),[x]=kA(),[k,E]=(0,t.useState)(void 0),A=ak(),S=(0,t.useCallback)((e=>{c(e)}),[]),M=(0,t.useCallback)((e=>{f(e)}),[]),C=TA(u,l,E);(0,t.useEffect)((()=>{if(h(void 0),void 0!==C&&void 0!==A){const e=A.balances.get(C.tokenPairId);h(void 0===e?0n:e)}}),[C,A]),(0,t.useEffect)((()=>{m(void 0);try{if(void 0!==C&&void 0!==u&&void 0!==l&&void 0!==a&&void 0!==d){const e=function(e,t){if(t>e.totalLiquidityAmount)throw new Error("liquidity exceed total liquidity amount");const r=t*e.reserve0/e.totalSupply,n=t*e.reserve1/e.totalSupply,i=e.totalLiquidityAmount-t,o=e.totalSupply-t,a=Ia((100n*i).toString()).div(Ia(o.toString())).toFixed(5);return{token0Id:e.token0Info.tokenId,amount0:r,token1Id:e.token1Info.tokenId,amount1:n,remainShareAmount:i,remainSharePercentage:parseFloat(a)}}({...C,totalLiquidityAmount:d},a);m(e)}}catch(k){E(`${k}`),console.error(`failed to update token amounts: ${k}`)}}),[C,u,l,a,d]);const _=(0,t.useCallback)((e=>{if(E(void 0),m(void 0),""===e.target.value)return s(void 0),void o(void 0);o(e.target.value);try{s(Wu(e.target.value,Tu))}catch(k){console.log(`Invalid input: ${e.target.value}, error: ${k}`),E(`${k}`)}}),[]),P=(0,t.useCallback)((()=>{c(void 0),f(void 0),s(void 0),o(void 0),h(void 0),v(!1),b(!1),m(void 0),E(void 0)}),[]),T=(0,un.jsxs)("div",{className:n.tokenPairContainer,children:[(0,un.jsx)(Ni,{dexTokens:r,tokenAddress:null===u||void 0===u?void 0:u.tokenAddress,counterpart:null===l||void 0===l?void 0:l.tokenAddress,onChange:S,mediumSize:!0}),(0,un.jsx)(Ni,{dexTokens:r,tokenAddress:null===l||void 0===l?void 0:l.tokenAddress,counterpart:null===u||void 0===u?void 0:u.tokenAddress,onChange:M,mediumSize:!0})]}),O=(0,un.jsx)("div",{className:n.tokenContainer,children:(0,un.jsx)(Xu,{className:n.numberField,value:void 0!==i?i:"",onChange:_,autoFocus:!0,InputProps:{disableUnderline:!0},disabled:!!y||!!g})}),I=(0,t.useCallback)((async()=>{try{if(b(!0),void 0!==A&&void 0!==C&&void 0!==p&&void 0!==u&&void 0!==l&&void 0!==a){if(0n===a)throw new Error("the input amount must be greater than 0");const e=await Zu(A.signer,A.nodeProvider,A.address,C.tokenPairId,a,p.amount0,p.amount1,"auto"===w?vA:w,x);console.log(`remove liquidity succeed, tx id: ${e.txId}`),v(!0),b(!1)}}catch(k){E(`${k}`),b(!1),console.error(`failed to remove liquidity, error: ${k}`)}}),[A,C,u,l,a,p,w,x]),R=void 0!==A&&void 0!==u&&void 0!==l&&void 0!==a&&void 0!==d&&void 0!==p&&!y&&!g&&void 0===k,j=(0,un.jsx)(ln,{disabled:!R,onClick:I,className:n.gradientButton+(R?"":" "+n.disabled),children:"Remove Liquidity"}),B=(e,t)=>{const r=t.tokenId===e.token0Id?e.amount0:e.amount1;return(0,Ra.formatUnits)(r,t.decimals)};return(0,un.jsxs)(Ur,{className:n.centeredContainer,maxWidth:"sm",children:[(0,un.jsx)("div",{className:n.titleBar}),(0,un.jsx)(vr,{variant:"h4",color:"textSecondary",children:"Remove Liquidity"}),(0,un.jsx)("div",{className:n.spacer}),(0,un.jsxs)(Yt,{className:n.mainPaper,children:[(0,un.jsx)(H,{in:!!g,children:(0,un.jsxs)(un.Fragment,{children:[(0,un.jsx)(nn.Z,{fontSize:"inherit",className:n.successIcon}),(0,un.jsx)(vr,{children:"Remove liquidity succeed!"}),(0,un.jsx)("div",{className:n.spacer}),(0,un.jsx)("div",{className:n.spacer}),(0,un.jsx)(rn,{onClick:P,variant:"contained",color:"primary",children:"Remove More Liquidity!"})]})}),(0,un.jsx)("div",{className:n.loaderHolder,children:(0,un.jsx)(H,{in:!!y&&!g,children:(0,un.jsxs)("div",{className:n.loaderHolder,children:[(0,un.jsx)(Fi,{}),(0,un.jsx)("div",{className:n.spacer}),(0,un.jsx)("div",{className:n.spacer}),(0,un.jsx)(vr,{variant:"h5",children:"Removing liquidity..."}),(0,un.jsx)("div",{className:n.spacer})]})})}),(0,un.jsx)("div",{children:(0,un.jsx)(H,{in:!y&&!g,children:(0,un.jsxs)(un.Fragment,{children:[T,(0,un.jsx)("div",{className:n.spacer}),void 0!==d?(0,un.jsx)(un.Fragment,{children:(0,un.jsxs)("div",{className:n.notification,children:[(0,un.jsx)("p",{className:n.leftAlign,children:"Total share amount:"}),(0,un.jsx)("p",{className:n.rightAlign,children:(0,Ra.formatUnits)(d,Tu)})]})}):null,O,void 0!==A?(0,un.jsxs)(un.Fragment,{children:[p&&a&&!k?((e,t)=>(0,un.jsxs)(un.Fragment,{children:[(0,un.jsxs)("div",{className:n.notification,children:[(0,un.jsx)("p",{className:n.leftAlign,children:"Remove share amount:"}),(0,un.jsx)("p",{className:n.rightAlign,children:Ku(t,Tu)})]}),(0,un.jsxs)("div",{className:n.notification,children:[(0,un.jsxs)("p",{className:n.leftAlign,children:["Token ",u.name,":"]}),(0,un.jsx)("p",{className:n.rightAlign,children:B(e,u)})]}),(0,un.jsxs)("div",{className:n.notification,children:[(0,un.jsxs)("p",{className:n.leftAlign,children:["Token ",l.name,":"]}),(0,un.jsx)("p",{className:n.rightAlign,children:B(e,l).toString()})]}),(0,un.jsxs)("div",{className:n.notification,children:[(0,un.jsx)("p",{className:n.leftAlign,children:"Remain share amount:"}),(0,un.jsx)("p",{className:n.rightAlign,children:(0,Ra.formatUnits)(e.remainShareAmount,Tu)})]}),(0,un.jsxs)("div",{className:n.notification,children:[(0,un.jsx)("p",{className:n.leftAlign,children:"Remain share percentage:"}),(0,un.jsxs)("p",{className:n.rightAlign,children:[e.remainSharePercentage,"%"]})]})]}))(p,a):null,k?(0,un.jsx)(vr,{variant:"body2",color:"error",className:n.error,children:k}):null]}):(0,un.jsx)(un.Fragment,{}),(0,un.jsx)("div",{className:n.spacer}),j]})})})]}),(0,un.jsx)("div",{className:n.spacer})]})};const HA=function(){const[e,r]=(0,t.useState)(new Iu),[,n]=(0,t.useState)(void 0),[i,o]=(0,t.useState)(void 0),[a,s]=(0,t.useState)(void 0),u=ak();return(0,t.useEffect)((()=>o(null===u||void 0===u?void 0:u.signer.nodeProvider)),[u]),(0,t.useEffect)((()=>{if(void 0===i)return;const e={pollingInterval:15e3,messageCallback:async e=>{const t=e.fields.token0,n=e.fields.token1,o=(0,sa.addressFromContractId)(t),a=(0,sa.addressFromContractId)(n),s=e.fields.pair,u=await Vu(i,t);if(void 0===u)return void console.log(`Ignore invalid token info, token id: ${t}`);const c=await Vu(i,n);void 0!==c?r((e=>{const r=[{token0Id:t,token1Id:n,token0Address:o,token1Address:a,tokenPairId:s}];return e.addTokenInfos([u,c]).addTokenPairs(r).addMappings([[o,[a]],[a,[o]]])})):console.log(`Ignore invalid token info, token id: ${n}`)},errorCallback:(e,t)=>(t.unsubscribe(),n(void 0),s(`${e}`),console.error(`Subscription error: ${e}`),Promise.resolve())};n((t=>{if(void 0!==t)return t;console.log("Subscribe token pair created events");const r=(0,sa.addressFromContractId)(da.factoryId);return $a.at(r).subscribePairCreatedEvent(e)}))}),[i,a]),(0,t.useMemo)((()=>e),[e])},ZA=L((()=>({textField:{flexGrow:1,"& > * > .MuiInputBase-input":{textAlign:"right",height:"100%",flexGrow:"1",fontSize:"1.2rem",fontFamily:"Roboto Mono, monospace",caretShape:"block",width:"0","&::-webkit-outer-spin-button, &::-webkit-inner-spin-button":{"-webkit-appearance":"none","-moz-appearance":"none",margin:0}},"& > * > input::-webkit-inner-spin-button":{webkitAppearance:"none",margin:"0"}}})));const qA=function(){const e=IA(),r=ZA(),[n,i]=(0,t.useState)(void 0),[o,a]=(0,t.useState)(void 0),[s,u]=(0,t.useState)(!1),[c,l]=(0,t.useState)(!1),[f,d]=(0,t.useState)(void 0),h=ak();(0,t.useEffect)((()=>{if(void 0!==n&&void 0!==o&&void 0!==h){if(n===o)return void d("identical token ids");(async function(e,t,r){const n=da.factoryId,i=da.groupIndex,[o,a]=Ru(t,r),s=o+a,u=(0,sa.subContractId)(n,s,i),c=(0,sa.addressFromContractId)(u);return e.addresses.getAddressesAddressGroup(c).then((e=>!0)).catch((e=>{if(e instanceof Error&&-1!==e.message.indexOf("Group not found"))return!1;throw e}))})(h.nodeProvider,n,o).then((e=>{e&&d("token pair already exist")})).catch((e=>d(e)))}}),[n,o,h]);const p=(0,t.useCallback)((e=>{if(d(void 0),""!==e.target.value){i(e.target.value);try{Ju(e.target.value)}catch(f){d(`${f}`),console.log(`handleTokenAChange error: ${f}`)}}else i(void 0)}),[]),m=(0,t.useCallback)((e=>{if(d(void 0),""!==e.target.value){a(e.target.value);try{Ju(e.target.value)}catch(f){d(`${f}`),console.log(`handleTokenBChange error: ${f}`)}}else a(void 0)}),[]),g=(0,t.useCallback)((()=>{i(void 0),a(void 0),u(!1),l(!1),d(void 0)}),[]),v=(0,un.jsx)("div",{className:e.tokenContainer,children:(0,un.jsx)(aa,{multiline:!0,className:r.textField,style:{fontSize:"1.2 rem"},value:void 0!==n?n:"",onChange:p,autoFocus:!0,InputProps:{disableUnderline:!0},disabled:!!c||!!s})}),y=(0,un.jsx)("div",{className:e.tokenContainer,children:(0,un.jsx)(aa,{multiline:!0,className:r.textField,style:{fontSize:"1.2 rem"},value:void 0!==o?o:"",onChange:m,InputProps:{disableUnderline:!0},disabled:!!c||!!s})}),b=(0,t.useCallback)((async()=>{try{if(l(!0),void 0!==h&&void 0!==n&&void 0!==o){const e=await async function(e,t,r,n,i){const o=da.groupIndex,[a,s]=Ru(n,i),u=a+s,c=(0,sa.subContractId)(da.factoryId,u,o),l=await hs.execute(e,{initialFields:{payer:r,factory:da.factoryId,alphAmount:10n**18n,tokenAId:n,tokenBId:i},attoAlphAmount:10n**18n,tokens:[{id:n,amount:1n},{id:i,amount:1n}]});return await Lu(t,l.txId,1),{...l,tokenPairId:c}}(h.signer,h.nodeProvider,h.address,n,o);console.log(`add pool succeed, tx id: ${e.txId}, token pair id: ${e.tokenPairId}`),u(!0),l(!1)}}catch(f){d(`${f}`),l(!1),console.error(`failed to add pool, error: ${f}`)}}),[h,n,o]),w=void 0!==h&&void 0!==n&&void 0!==o&&!c&&!s&&void 0===f,x=(0,un.jsx)(ln,{disabled:!w,onClick:b,className:e.gradientButton+(w?"":" "+e.disabled),children:"Add Pool"});return(0,un.jsxs)(Ur,{className:e.centeredContainer,maxWidth:"sm",children:[(0,un.jsx)("div",{className:e.titleBar}),(0,un.jsx)(vr,{variant:"h4",color:"textSecondary",children:"Add Pool"}),(0,un.jsx)("div",{className:e.spacer}),(0,un.jsxs)(Yt,{className:e.mainPaper,children:[(0,un.jsx)(H,{in:!!s,children:(0,un.jsxs)(un.Fragment,{children:[(0,un.jsx)(nn.Z,{fontSize:"inherit",className:e.successIcon}),(0,un.jsx)(vr,{children:"Add pool succeed!"}),(0,un.jsx)("div",{className:e.spacer}),(0,un.jsx)("div",{className:e.spacer}),(0,un.jsx)(rn,{onClick:g,variant:"contained",color:"primary",children:"Add More Pools!"})]})}),(0,un.jsx)("div",{className:e.loaderHolder,children:(0,un.jsx)(H,{in:!!c&&!s,children:(0,un.jsxs)("div",{className:e.loaderHolder,children:[(0,un.jsx)(Fi,{}),(0,un.jsx)("div",{className:e.spacer}),(0,un.jsx)("div",{className:e.spacer}),(0,un.jsx)(vr,{variant:"h5",children:"Adding pool..."}),(0,un.jsx)("div",{className:e.spacer})]})})}),(0,un.jsx)("div",{children:(0,un.jsxs)(H,{in:!c&&!s,children:[(0,un.jsxs)(un.Fragment,{children:[v,(0,un.jsx)("div",{className:e.spacer}),y,f?(0,un.jsx)(vr,{variant:"body2",color:"error",className:e.error,children:f}):null,(0,un.jsx)("div",{className:e.spacer})]}),x]})})]}),(0,un.jsx)("div",{className:e.spacer})]})},VA=(0,$o.Z)(t.createElement("path",{d:"M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"}),"ExpandLess"),WA=(0,$o.Z)(t.createElement("path",{d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"}),"ExpandMore"),$A=L((()=>({text:{fontFamily:"monospace",whiteSpace:"pre",fontSize:"15px"},list:{width:"100%"}})));function KA(e){let{tokenPair:r,onError:n,dexTokens:i}=e;const o=IA(),a=$A(),[s,u]=(0,t.useState)(!1),[c,l]=(0,t.useState)(void 0),f=i.tokenInfos.find((e=>e.tokenId===r.token0Id)),d=i.tokenInfos.find((e=>e.tokenId===r.token1Id)),h=(0,t.useCallback)((()=>{void 0!==f&&void 0!==d&&(u(!s),ju(f,d).then((e=>{l(e)})).catch((e=>n(e))))}),[f,d,n,s]);return(0,un.jsxs)(un.Fragment,{children:[(0,un.jsxs)(mn,{button:!0,onClick:h,children:[(0,un.jsx)(bn,{children:(0,un.jsx)(Gn,{className:a.text,children:r.tokenPairId.slice(0,8)})}),s?(0,un.jsx)(VA,{}):(0,un.jsx)(WA,{})]},r.tokenPairId),(0,un.jsx)(H,{in:s,children:c&&f&&d?(0,un.jsxs)(un.Fragment,{children:[(0,un.jsxs)("div",{className:o.notification,children:[(0,un.jsx)("p",{className:o.leftAlign,children:"Token Pair Id:"}),(0,un.jsx)("p",{className:o.rightAlign,children:r.tokenPairId})]}),(0,un.jsxs)("div",{className:o.notification,children:[(0,un.jsx)("p",{className:o.leftAlign,children:f.name}),(0,un.jsx)("p",{className:o.rightAlign,children:r.token0Id})]}),(0,un.jsxs)("div",{className:o.notification,children:[(0,un.jsx)("p",{className:o.leftAlign,children:d.name}),(0,un.jsx)("p",{className:o.rightAlign,children:r.token1Id})]}),(0,un.jsxs)("div",{className:o.notification,children:[(0,un.jsxs)("p",{className:o.leftAlign,children:[f.name," Reserve:"]}),(0,un.jsx)("p",{className:o.rightAlign,children:Ku(c.reserve0,f.decimals)})]}),(0,un.jsxs)("div",{className:o.notification,children:[(0,un.jsxs)("p",{className:o.leftAlign,children:[d.name," Reserve:"]}),(0,un.jsx)("p",{className:o.rightAlign,children:Ku(c.reserve1,d.decimals)})]}),(0,un.jsxs)("div",{className:o.notification,children:[(0,un.jsx)("p",{className:o.leftAlign,children:"Total Supply:"}),(0,un.jsx)("p",{className:o.rightAlign,children:Ku(c.totalSupply,Tu)})]})]}):null})]})}const GA=function(e){let{dexTokens:r}=e;const n=IA(),i=$A(),[o,a]=(0,t.useState)(void 0),s=r.tokenPairs.map((e=>(0,un.jsx)(KA,{tokenPair:e,onError:e=>a(e),dexTokens:r},e.tokenPairId)));return(0,un.jsxs)(Ur,{className:n.centeredContainer,children:[(0,un.jsx)("div",{className:n.titleBar}),(0,un.jsx)(vr,{variant:"h4",color:"textSecondary",children:"Pools"}),(0,un.jsx)("div",{className:n.spacer}),(0,un.jsx)(Yt,{className:n.mainPaper,children:(0,un.jsx)("div",{children:(0,un.jsxs)(H,{in:!0,children:[void 0===o?(0,un.jsx)(Ii,{component:"nav",className:i.list,style:{maxHeight:500,overflow:"auto"},children:s}):null,o?(0,un.jsx)(vr,{variant:"body2",color:"error",className:n.error,children:o}):null]})})}),(0,un.jsx)("div",{className:n.spacer})]})};var JA=r(6221),YA=t.forwardRef((function(r,n){var i=r.classes,o=r.className,a=r.dividers,s=void 0!==a&&a,u=(0,h.Z)(r,["classes","className","dividers"]);return t.createElement("div",(0,e.Z)({className:(0,d.Z)(i.root,o,s&&i.dividers),ref:n},u))}));const XA=(0,n.Z)((function(e){return{root:{flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"8px 24px","&:first-child":{paddingTop:20}},dividers:{padding:"16px 24px",borderTop:"1px solid ".concat(e.palette.divider),borderBottom:"1px solid ".concat(e.palette.divider)}}}),{name:"MuiDialogContent"})(YA);var QA=r(9998),eS="undefined"!==typeof window&&"undefined"!==typeof document&&"undefined"!==typeof navigator,tS=function(){for(var e=["Edge","Trident","Firefox"],t=0;t<e.length;t+=1)if(eS&&navigator.userAgent.indexOf(e[t])>=0)return 1;return 0}();var rS=eS&&window.Promise?function(e){var t=!1;return function(){t||(t=!0,window.Promise.resolve().then((function(){t=!1,e()})))}}:function(e){var t=!1;return function(){t||(t=!0,setTimeout((function(){t=!1,e()}),tS))}};function nS(e){return e&&"[object Function]"==={}.toString.call(e)}function iS(e,t){if(1!==e.nodeType)return[];var r=e.ownerDocument.defaultView.getComputedStyle(e,null);return t?r[t]:r}function oS(e){return"HTML"===e.nodeName?e:e.parentNode||e.host}function aS(e){if(!e)return document.body;switch(e.nodeName){case"HTML":case"BODY":return e.ownerDocument.body;case"#document":return e.body}var t=iS(e),r=t.overflow,n=t.overflowX,i=t.overflowY;return/(auto|scroll|overlay)/.test(r+i+n)?e:aS(oS(e))}function sS(e){return e&&e.referenceNode?e.referenceNode:e}var uS=eS&&!(!window.MSInputMethodContext||!document.documentMode),cS=eS&&/MSIE 10/.test(navigator.userAgent);function lS(e){return 11===e?uS:10===e?cS:uS||cS}function fS(e){if(!e)return document.documentElement;for(var t=lS(10)?document.body:null,r=e.offsetParent||null;r===t&&e.nextElementSibling;)r=(e=e.nextElementSibling).offsetParent;var n=r&&r.nodeName;return n&&"BODY"!==n&&"HTML"!==n?-1!==["TH","TD","TABLE"].indexOf(r.nodeName)&&"static"===iS(r,"position")?fS(r):r:e?e.ownerDocument.documentElement:document.documentElement}function dS(e){return null!==e.parentNode?dS(e.parentNode):e}function hS(e,t){if(!e||!e.nodeType||!t||!t.nodeType)return document.documentElement;var r=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,n=r?e:t,i=r?t:e,o=document.createRange();o.setStart(n,0),o.setEnd(i,0);var a=o.commonAncestorContainer;if(e!==a&&t!==a||n.contains(i))return function(e){var t=e.nodeName;return"BODY"!==t&&("HTML"===t||fS(e.firstElementChild)===e)}(a)?a:fS(a);var s=dS(e);return s.host?hS(s.host,t):hS(e,dS(t).host)}function pS(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top",r="top"===t?"scrollTop":"scrollLeft",n=e.nodeName;if("BODY"===n||"HTML"===n){var i=e.ownerDocument.documentElement,o=e.ownerDocument.scrollingElement||i;return o[r]}return e[r]}function mS(e,t){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=pS(t,"top"),i=pS(t,"left"),o=r?-1:1;return e.top+=n*o,e.bottom+=n*o,e.left+=i*o,e.right+=i*o,e}function gS(e,t){var r="x"===t?"Left":"Top",n="Left"===r?"Right":"Bottom";return parseFloat(e["border"+r+"Width"])+parseFloat(e["border"+n+"Width"])}function vS(e,t,r,n){return Math.max(t["offset"+e],t["scroll"+e],r["client"+e],r["offset"+e],r["scroll"+e],lS(10)?parseInt(r["offset"+e])+parseInt(n["margin"+("Height"===e?"Top":"Left")])+parseInt(n["margin"+("Height"===e?"Bottom":"Right")]):0)}function yS(e){var t=e.body,r=e.documentElement,n=lS(10)&&getComputedStyle(r);return{height:vS("Height",t,r,n),width:vS("Width",t,r,n)}}var bS=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},wS=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),xS=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e},kS=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};function ES(e){return kS({},e,{right:e.left+e.width,bottom:e.top+e.height})}function AS(e){var t={};try{if(lS(10)){t=e.getBoundingClientRect();var r=pS(e,"top"),n=pS(e,"left");t.top+=r,t.left+=n,t.bottom+=r,t.right+=n}else t=e.getBoundingClientRect()}catch(f){}var i={left:t.left,top:t.top,width:t.right-t.left,height:t.bottom-t.top},o="HTML"===e.nodeName?yS(e.ownerDocument):{},a=o.width||e.clientWidth||i.width,s=o.height||e.clientHeight||i.height,u=e.offsetWidth-a,c=e.offsetHeight-s;if(u||c){var l=iS(e);u-=gS(l,"x"),c-=gS(l,"y"),i.width-=u,i.height-=c}return ES(i)}function SS(e,t){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=lS(10),i="HTML"===t.nodeName,o=AS(e),a=AS(t),s=aS(e),u=iS(t),c=parseFloat(u.borderTopWidth),l=parseFloat(u.borderLeftWidth);r&&i&&(a.top=Math.max(a.top,0),a.left=Math.max(a.left,0));var f=ES({top:o.top-a.top-c,left:o.left-a.left-l,width:o.width,height:o.height});if(f.marginTop=0,f.marginLeft=0,!n&&i){var d=parseFloat(u.marginTop),h=parseFloat(u.marginLeft);f.top-=c-d,f.bottom-=c-d,f.left-=l-h,f.right-=l-h,f.marginTop=d,f.marginLeft=h}return(n&&!r?t.contains(s):t===s&&"BODY"!==s.nodeName)&&(f=mS(f,t)),f}function MS(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=e.ownerDocument.documentElement,n=SS(e,r),i=Math.max(r.clientWidth,window.innerWidth||0),o=Math.max(r.clientHeight,window.innerHeight||0),a=t?0:pS(r),s=t?0:pS(r,"left"),u={top:a-n.top+n.marginTop,left:s-n.left+n.marginLeft,width:i,height:o};return ES(u)}function CS(e){var t=e.nodeName;if("BODY"===t||"HTML"===t)return!1;if("fixed"===iS(e,"position"))return!0;var r=oS(e);return!!r&&CS(r)}function _S(e){if(!e||!e.parentElement||lS())return document.documentElement;for(var t=e.parentElement;t&&"none"===iS(t,"transform");)t=t.parentElement;return t||document.documentElement}function PS(e,t,r,n){var i=arguments.length>4&&void 0!==arguments[4]&&arguments[4],o={top:0,left:0},a=i?_S(e):hS(e,sS(t));if("viewport"===n)o=MS(a,i);else{var s=void 0;"scrollParent"===n?"BODY"===(s=aS(oS(t))).nodeName&&(s=e.ownerDocument.documentElement):s="window"===n?e.ownerDocument.documentElement:n;var u=SS(s,a,i);if("HTML"!==s.nodeName||CS(a))o=u;else{var c=yS(e.ownerDocument),l=c.height,f=c.width;o.top+=u.top-u.marginTop,o.bottom=l+u.top,o.left+=u.left-u.marginLeft,o.right=f+u.left}}var d="number"===typeof(r=r||0);return o.left+=d?r:r.left||0,o.top+=d?r:r.top||0,o.right-=d?r:r.right||0,o.bottom-=d?r:r.bottom||0,o}function TS(e){return e.width*e.height}function OS(e,t,r,n,i){var o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;if(-1===e.indexOf("auto"))return e;var a=PS(r,n,o,i),s={top:{width:a.width,height:t.top-a.top},right:{width:a.right-t.right,height:a.height},bottom:{width:a.width,height:a.bottom-t.bottom},left:{width:t.left-a.left,height:a.height}},u=Object.keys(s).map((function(e){return kS({key:e},s[e],{area:TS(s[e])})})).sort((function(e,t){return t.area-e.area})),c=u.filter((function(e){var t=e.width,n=e.height;return t>=r.clientWidth&&n>=r.clientHeight})),l=c.length>0?c[0].key:u[0].key,f=e.split("-")[1];return l+(f?"-"+f:"")}function IS(e,t,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,i=n?_S(t):hS(t,sS(r));return SS(r,i,n)}function RS(e){var t=e.ownerDocument.defaultView.getComputedStyle(e),r=parseFloat(t.marginTop||0)+parseFloat(t.marginBottom||0),n=parseFloat(t.marginLeft||0)+parseFloat(t.marginRight||0);return{width:e.offsetWidth+n,height:e.offsetHeight+r}}function jS(e){var t={left:"right",right:"left",bottom:"top",top:"bottom"};return e.replace(/left|right|bottom|top/g,(function(e){return t[e]}))}function BS(e,t,r){r=r.split("-")[0];var n=RS(e),i={width:n.width,height:n.height},o=-1!==["right","left"].indexOf(r),a=o?"top":"left",s=o?"left":"top",u=o?"height":"width",c=o?"width":"height";return i[a]=t[a]+t[u]/2-n[u]/2,i[s]=r===s?t[s]-n[c]:t[jS(s)],i}function NS(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function FS(e,t,r){var n=void 0===r?e:e.slice(0,function(e,t,r){if(Array.prototype.findIndex)return e.findIndex((function(e){return e[t]===r}));var n=NS(e,(function(e){return e[t]===r}));return e.indexOf(n)}(e,"name",r));return n.forEach((function(e){e.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var r=e.function||e.fn;e.enabled&&nS(r)&&(t.offsets.popper=ES(t.offsets.popper),t.offsets.reference=ES(t.offsets.reference),t=r(t,e))})),t}function DS(){if(!this.state.isDestroyed){var e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=IS(this.state,this.popper,this.reference,this.options.positionFixed),e.placement=OS(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.positionFixed=this.options.positionFixed,e.offsets.popper=BS(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position=this.options.positionFixed?"fixed":"absolute",e=FS(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}function LS(e,t){return e.some((function(e){var r=e.name;return e.enabled&&r===t}))}function US(e){for(var t=[!1,"ms","Webkit","Moz","O"],r=e.charAt(0).toUpperCase()+e.slice(1),n=0;n<t.length;n++){var i=t[n],o=i?""+i+r:e;if("undefined"!==typeof document.body.style[o])return o}return null}function zS(){return this.state.isDestroyed=!0,LS(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.position="",this.popper.style.top="",this.popper.style.left="",this.popper.style.right="",this.popper.style.bottom="",this.popper.style.willChange="",this.popper.style[US("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function HS(e){var t=e.ownerDocument;return t?t.defaultView:window}function ZS(e,t,r,n){var i="BODY"===e.nodeName,o=i?e.ownerDocument.defaultView:e;o.addEventListener(t,r,{passive:!0}),i||ZS(aS(o.parentNode),t,r,n),n.push(o)}function qS(e,t,r,n){r.updateBound=n,HS(e).addEventListener("resize",r.updateBound,{passive:!0});var i=aS(e);return ZS(i,"scroll",r.updateBound,r.scrollParents),r.scrollElement=i,r.eventsEnabled=!0,r}function VS(){this.state.eventsEnabled||(this.state=qS(this.reference,this.options,this.state,this.scheduleUpdate))}function WS(){var e,t;this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=(e=this.reference,t=this.state,HS(e).removeEventListener("resize",t.updateBound),t.scrollParents.forEach((function(e){e.removeEventListener("scroll",t.updateBound)})),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t))}function $S(e){return""!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function KS(e,t){Object.keys(t).forEach((function(r){var n="";-1!==["width","height","top","right","bottom","left"].indexOf(r)&&$S(t[r])&&(n="px"),e.style[r]=t[r]+n}))}var GS=eS&&/Firefox/i.test(navigator.userAgent);function JS(e,t,r){var n=NS(e,(function(e){return e.name===t})),i=!!n&&e.some((function(e){return e.name===r&&e.enabled&&e.order<n.order}));if(!i){var o="`"+t+"`",a="`"+r+"`";console.warn(a+" modifier is required by "+o+" modifier in order to work, be sure to include it before "+o+"!")}return i}var YS=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],XS=YS.slice(3);function QS(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=XS.indexOf(e),n=XS.slice(r+1).concat(XS.slice(0,r));return t?n.reverse():n}var eM="flip",tM="clockwise",rM="counterclockwise";function nM(e,t,r,n){var i=[0,0],o=-1!==["right","left"].indexOf(n),a=e.split(/(\+|\-)/).map((function(e){return e.trim()})),s=a.indexOf(NS(a,(function(e){return-1!==e.search(/,|\s/)})));a[s]&&-1===a[s].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");var u=/\s*,\s*|\s+/,c=-1!==s?[a.slice(0,s).concat([a[s].split(u)[0]]),[a[s].split(u)[1]].concat(a.slice(s+1))]:[a];return c=c.map((function(e,n){var i=(1===n?!o:o)?"height":"width",a=!1;return e.reduce((function(e,t){return""===e[e.length-1]&&-1!==["+","-"].indexOf(t)?(e[e.length-1]=t,a=!0,e):a?(e[e.length-1]+=t,a=!1,e):e.concat(t)}),[]).map((function(e){return function(e,t,r,n){var i=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),o=+i[1],a=i[2];if(!o)return e;if(0===a.indexOf("%")){return ES("%p"===a?r:n)[t]/100*o}if("vh"===a||"vw"===a)return("vh"===a?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0))/100*o;return o}(e,i,t,r)}))})),c.forEach((function(e,t){e.forEach((function(r,n){$S(r)&&(i[t]+=r*("-"===e[n-1]?-1:1))}))})),i}var iM={shift:{order:100,enabled:!0,fn:function(e){var t=e.placement,r=t.split("-")[0],n=t.split("-")[1];if(n){var i=e.offsets,o=i.reference,a=i.popper,s=-1!==["bottom","top"].indexOf(r),u=s?"left":"top",c=s?"width":"height",l={start:xS({},u,o[u]),end:xS({},u,o[u]+o[c]-a[c])};e.offsets.popper=kS({},a,l[n])}return e}},offset:{order:200,enabled:!0,fn:function(e,t){var r=t.offset,n=e.placement,i=e.offsets,o=i.popper,a=i.reference,s=n.split("-")[0],u=void 0;return u=$S(+r)?[+r,0]:nM(r,o,a,s),"left"===s?(o.top+=u[0],o.left-=u[1]):"right"===s?(o.top+=u[0],o.left+=u[1]):"top"===s?(o.left+=u[0],o.top-=u[1]):"bottom"===s&&(o.left+=u[0],o.top+=u[1]),e.popper=o,e},offset:0},preventOverflow:{order:300,enabled:!0,fn:function(e,t){var r=t.boundariesElement||fS(e.instance.popper);e.instance.reference===r&&(r=fS(r));var n=US("transform"),i=e.instance.popper.style,o=i.top,a=i.left,s=i[n];i.top="",i.left="",i[n]="";var u=PS(e.instance.popper,e.instance.reference,t.padding,r,e.positionFixed);i.top=o,i.left=a,i[n]=s,t.boundaries=u;var c=t.priority,l=e.offsets.popper,f={primary:function(e){var r=l[e];return l[e]<u[e]&&!t.escapeWithReference&&(r=Math.max(l[e],u[e])),xS({},e,r)},secondary:function(e){var r="right"===e?"left":"top",n=l[r];return l[e]>u[e]&&!t.escapeWithReference&&(n=Math.min(l[r],u[e]-("right"===e?l.width:l.height))),xS({},r,n)}};return c.forEach((function(e){var t=-1!==["left","top"].indexOf(e)?"primary":"secondary";l=kS({},l,f[t](e))})),e.offsets.popper=l,e},priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:function(e){var t=e.offsets,r=t.popper,n=t.reference,i=e.placement.split("-")[0],o=Math.floor,a=-1!==["top","bottom"].indexOf(i),s=a?"right":"bottom",u=a?"left":"top",c=a?"width":"height";return r[s]<o(n[u])&&(e.offsets.popper[u]=o(n[u])-r[c]),r[u]>o(n[s])&&(e.offsets.popper[u]=o(n[s])),e}},arrow:{order:500,enabled:!0,fn:function(e,t){var r;if(!JS(e.instance.modifiers,"arrow","keepTogether"))return e;var n=t.element;if("string"===typeof n){if(!(n=e.instance.popper.querySelector(n)))return e}else if(!e.instance.popper.contains(n))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),e;var i=e.placement.split("-")[0],o=e.offsets,a=o.popper,s=o.reference,u=-1!==["left","right"].indexOf(i),c=u?"height":"width",l=u?"Top":"Left",f=l.toLowerCase(),d=u?"left":"top",h=u?"bottom":"right",p=RS(n)[c];s[h]-p<a[f]&&(e.offsets.popper[f]-=a[f]-(s[h]-p)),s[f]+p>a[h]&&(e.offsets.popper[f]+=s[f]+p-a[h]),e.offsets.popper=ES(e.offsets.popper);var m=s[f]+s[c]/2-p/2,g=iS(e.instance.popper),v=parseFloat(g["margin"+l]),y=parseFloat(g["border"+l+"Width"]),b=m-e.offsets.popper[f]-v-y;return b=Math.max(Math.min(a[c]-p,b),0),e.arrowElement=n,e.offsets.arrow=(xS(r={},f,Math.round(b)),xS(r,d,""),r),e},element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:function(e,t){if(LS(e.instance.modifiers,"inner"))return e;if(e.flipped&&e.placement===e.originalPlacement)return e;var r=PS(e.instance.popper,e.instance.reference,t.padding,t.boundariesElement,e.positionFixed),n=e.placement.split("-")[0],i=jS(n),o=e.placement.split("-")[1]||"",a=[];switch(t.behavior){case eM:a=[n,i];break;case tM:a=QS(n);break;case rM:a=QS(n,!0);break;default:a=t.behavior}return a.forEach((function(s,u){if(n!==s||a.length===u+1)return e;n=e.placement.split("-")[0],i=jS(n);var c=e.offsets.popper,l=e.offsets.reference,f=Math.floor,d="left"===n&&f(c.right)>f(l.left)||"right"===n&&f(c.left)<f(l.right)||"top"===n&&f(c.bottom)>f(l.top)||"bottom"===n&&f(c.top)<f(l.bottom),h=f(c.left)<f(r.left),p=f(c.right)>f(r.right),m=f(c.top)<f(r.top),g=f(c.bottom)>f(r.bottom),v="left"===n&&h||"right"===n&&p||"top"===n&&m||"bottom"===n&&g,y=-1!==["top","bottom"].indexOf(n),b=!!t.flipVariations&&(y&&"start"===o&&h||y&&"end"===o&&p||!y&&"start"===o&&m||!y&&"end"===o&&g),w=!!t.flipVariationsByContent&&(y&&"start"===o&&p||y&&"end"===o&&h||!y&&"start"===o&&g||!y&&"end"===o&&m),x=b||w;(d||v||x)&&(e.flipped=!0,(d||v)&&(n=a[u+1]),x&&(o=function(e){return"end"===e?"start":"start"===e?"end":e}(o)),e.placement=n+(o?"-"+o:""),e.offsets.popper=kS({},e.offsets.popper,BS(e.instance.popper,e.offsets.reference,e.placement)),e=FS(e.instance.modifiers,e,"flip"))})),e},behavior:"flip",padding:5,boundariesElement:"viewport",flipVariations:!1,flipVariationsByContent:!1},inner:{order:700,enabled:!1,fn:function(e){var t=e.placement,r=t.split("-")[0],n=e.offsets,i=n.popper,o=n.reference,a=-1!==["left","right"].indexOf(r),s=-1===["top","left"].indexOf(r);return i[a?"left":"top"]=o[r]-(s?i[a?"width":"height"]:0),e.placement=jS(t),e.offsets.popper=ES(i),e}},hide:{order:800,enabled:!0,fn:function(e){if(!JS(e.instance.modifiers,"hide","preventOverflow"))return e;var t=e.offsets.reference,r=NS(e.instance.modifiers,(function(e){return"preventOverflow"===e.name})).boundaries;if(t.bottom<r.top||t.left>r.right||t.top>r.bottom||t.right<r.left){if(!0===e.hide)return e;e.hide=!0,e.attributes["x-out-of-boundaries"]=""}else{if(!1===e.hide)return e;e.hide=!1,e.attributes["x-out-of-boundaries"]=!1}return e}},computeStyle:{order:850,enabled:!0,fn:function(e,t){var r=t.x,n=t.y,i=e.offsets.popper,o=NS(e.instance.modifiers,(function(e){return"applyStyle"===e.name})).gpuAcceleration;void 0!==o&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var a=void 0!==o?o:t.gpuAcceleration,s=fS(e.instance.popper),u=AS(s),c={position:i.position},l=function(e,t){var r=e.offsets,n=r.popper,i=r.reference,o=Math.round,a=Math.floor,s=function(e){return e},u=o(i.width),c=o(n.width),l=-1!==["left","right"].indexOf(e.placement),f=-1!==e.placement.indexOf("-"),d=t?l||f||u%2===c%2?o:a:s,h=t?o:s;return{left:d(u%2===1&&c%2===1&&!f&&t?n.left-1:n.left),top:h(n.top),bottom:h(n.bottom),right:d(n.right)}}(e,window.devicePixelRatio<2||!GS),f="bottom"===r?"top":"bottom",d="right"===n?"left":"right",h=US("transform"),p=void 0,m=void 0;if(m="bottom"===f?"HTML"===s.nodeName?-s.clientHeight+l.bottom:-u.height+l.bottom:l.top,p="right"===d?"HTML"===s.nodeName?-s.clientWidth+l.right:-u.width+l.right:l.left,a&&h)c[h]="translate3d("+p+"px, "+m+"px, 0)",c[f]=0,c[d]=0,c.willChange="transform";else{var g="bottom"===f?-1:1,v="right"===d?-1:1;c[f]=m*g,c[d]=p*v,c.willChange=f+", "+d}var y={"x-placement":e.placement};return e.attributes=kS({},y,e.attributes),e.styles=kS({},c,e.styles),e.arrowStyles=kS({},e.offsets.arrow,e.arrowStyles),e},gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:function(e){var t,r;return KS(e.instance.popper,e.styles),t=e.instance.popper,r=e.attributes,Object.keys(r).forEach((function(e){!1!==r[e]?t.setAttribute(e,r[e]):t.removeAttribute(e)})),e.arrowElement&&Object.keys(e.arrowStyles).length&&KS(e.arrowElement,e.arrowStyles),e},onLoad:function(e,t,r,n,i){var o=IS(i,t,e,r.positionFixed),a=OS(r.placement,o,t,e,r.modifiers.flip.boundariesElement,r.modifiers.flip.padding);return t.setAttribute("x-placement",a),KS(t,{position:r.positionFixed?"fixed":"absolute"}),r},gpuAcceleration:void 0}},oM={placement:"bottom",positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:iM},aM=function(){function e(t,r){var n=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};bS(this,e),this.scheduleUpdate=function(){return requestAnimationFrame(n.update)},this.update=rS(this.update.bind(this)),this.options=kS({},e.Defaults,i),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=t&&t.jquery?t[0]:t,this.popper=r&&r.jquery?r[0]:r,this.options.modifiers={},Object.keys(kS({},e.Defaults.modifiers,i.modifiers)).forEach((function(t){n.options.modifiers[t]=kS({},e.Defaults.modifiers[t]||{},i.modifiers?i.modifiers[t]:{})})),this.modifiers=Object.keys(this.options.modifiers).map((function(e){return kS({name:e},n.options.modifiers[e])})).sort((function(e,t){return e.order-t.order})),this.modifiers.forEach((function(e){e.enabled&&nS(e.onLoad)&&e.onLoad(n.reference,n.popper,n.options,e,n.state)})),this.update();var o=this.options.eventsEnabled;o&&this.enableEventListeners(),this.state.eventsEnabled=o}return wS(e,[{key:"update",value:function(){return DS.call(this)}},{key:"destroy",value:function(){return zS.call(this)}},{key:"enableEventListeners",value:function(){return VS.call(this)}},{key:"disableEventListeners",value:function(){return WS.call(this)}}]),e}();aM.Utils=("undefined"!==typeof window?window:r.g).PopperUtils,aM.placements=YS,aM.Defaults=oM;const sM=aM;function uM(e){return"function"===typeof e?e():e}var cM="undefined"!==typeof window?t.useLayoutEffect:t.useEffect,lM={},fM=t.forwardRef((function(r,n){var i=r.anchorEl,o=r.children,a=r.container,s=r.disablePortal,c=void 0!==s&&s,l=r.keepMounted,f=void 0!==l&&l,d=r.modifiers,p=r.open,m=r.placement,g=void 0===m?"bottom":m,v=r.popperOptions,y=void 0===v?lM:v,b=r.popperRef,w=r.style,x=r.transition,k=void 0!==x&&x,E=(0,h.Z)(r,["anchorEl","children","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition"]),A=t.useRef(null),S=(0,C.Z)(A,n),M=t.useRef(null),_=(0,C.Z)(M,b),P=t.useRef(_);cM((function(){P.current=_}),[_]),t.useImperativeHandle(b,(function(){return M.current}),[]);var T=t.useState(!0),O=T[0],I=T[1],R=function(e,t){if("ltr"===(t&&t.direction||"ltr"))return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}(g,(0,u.Z)()),j=t.useState(R),B=j[0],N=j[1];t.useEffect((function(){M.current&&M.current.update()}));var F=t.useCallback((function(){if(A.current&&i&&p){M.current&&(M.current.destroy(),P.current(null));var t=function(e){N(e.placement)},r=(uM(i),new sM(uM(i),A.current,(0,e.Z)({placement:R},y,{modifiers:(0,e.Z)({},c?{}:{preventOverflow:{boundariesElement:"window"}},d,y.modifiers),onCreate:(0,ti.Z)(t,y.onCreate),onUpdate:(0,ti.Z)(t,y.onUpdate)})));P.current(r)}}),[i,c,d,p,R,y]),D=t.useCallback((function(e){(0,Xn.Z)(S,e),F()}),[S,F]),L=function(){M.current&&(M.current.destroy(),P.current(null))};if(t.useEffect((function(){return function(){L()}}),[]),t.useEffect((function(){p||k||L()}),[p,k]),!f&&!p&&(!k||O))return null;var U={placement:B};return k&&(U.TransitionProps={in:p,onEnter:function(){I(!1)},onExited:function(){I(!0),L()}}),t.createElement(ei,{disablePortal:c,container:a},t.createElement("div",(0,e.Z)({ref:D,role:"tooltip"},E,{style:(0,e.Z)({position:"fixed",top:0,left:0,display:p||!f||k?null:"none"},w)}),"function"===typeof o?o(U):o))}));const dM=fM;var hM=r(8162);function pM(e){return Math.round(1e5*e)/1e5}var mM=!1,gM=null;var vM=t.forwardRef((function(r,n){var i=r.arrow,o=void 0!==i&&i,a=r.children,s=r.classes,u=r.disableFocusListener,c=void 0!==u&&u,l=r.disableHoverListener,p=void 0!==l&&l,m=r.disableTouchListener,g=void 0!==m&&m,v=r.enterDelay,y=void 0===v?100:v,b=r.enterNextDelay,w=void 0===b?0:b,x=r.enterTouchDelay,k=void 0===x?700:x,E=r.id,A=r.interactive,S=void 0!==A&&A,M=r.leaveDelay,_=void 0===M?0:M,T=r.leaveTouchDelay,O=void 0===T?1500:T,I=r.onClose,R=r.onOpen,j=r.open,B=r.placement,N=void 0===B?"bottom":B,F=r.PopperComponent,D=void 0===F?dM:F,L=r.PopperProps,z=r.title,H=r.TransitionComponent,Z=void 0===H?So:H,q=r.TransitionProps,V=(0,h.Z)(r,["arrow","children","classes","disableFocusListener","disableHoverListener","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","id","interactive","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","title","TransitionComponent","TransitionProps"]),W=P(),$=t.useState(),K=$[0],G=$[1],J=t.useState(null),Y=J[0],X=J[1],Q=t.useRef(!1),ee=t.useRef(),te=t.useRef(),re=t.useRef(),ne=t.useRef(),ie=(0,Zo.Z)({controlled:j,default:!1,name:"Tooltip",state:"open"}),oe=(0,U.Z)(ie,2),ae=oe[0],se=oe[1],ue=ae,ce=(0,hM.Z)(E);t.useEffect((function(){return function(){clearTimeout(ee.current),clearTimeout(te.current),clearTimeout(re.current),clearTimeout(ne.current)}}),[]);var le=function(e){clearTimeout(gM),mM=!0,se(!0),R&&R(e)},fe=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return function(t){var r=a.props;"mouseover"===t.type&&r.onMouseOver&&e&&r.onMouseOver(t),Q.current&&"touchstart"!==t.type||(K&&K.removeAttribute("title"),clearTimeout(te.current),clearTimeout(re.current),y||mM&&w?(t.persist(),te.current=setTimeout((function(){le(t)}),mM?w:y)):le(t))}},de=(0,pr.Z)(),he=de.isFocusVisible,pe=de.onBlurVisible,me=de.ref,ge=t.useState(!1),ve=ge[0],ye=ge[1],be=function(){ve&&(ye(!1),pe())},we=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return function(t){K||G(t.currentTarget),he(t)&&(ye(!0),fe()(t));var r=a.props;r.onFocus&&e&&r.onFocus(t)}},xe=function(e){clearTimeout(gM),gM=setTimeout((function(){mM=!1}),800+_),se(!1),I&&I(e),clearTimeout(ee.current),ee.current=setTimeout((function(){Q.current=!1}),W.transitions.duration.shortest)},ke=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return function(t){var r=a.props;"blur"===t.type&&(r.onBlur&&e&&r.onBlur(t),be()),"mouseleave"===t.type&&r.onMouseLeave&&t.currentTarget===K&&r.onMouseLeave(t),clearTimeout(te.current),clearTimeout(re.current),t.persist(),re.current=setTimeout((function(){xe(t)}),_)}},Ee=function(e){Q.current=!0;var t=a.props;t.onTouchStart&&t.onTouchStart(e)},Ae=(0,C.Z)(G,n),Se=(0,C.Z)(me,Ae),Me=t.useCallback((function(e){(0,Xn.Z)(Se,f.findDOMNode(e))}),[Se]),Ce=(0,C.Z)(a.ref,Me);""===z&&(ue=!1);var _e=!ue&&!p,Pe=(0,e.Z)({"aria-describedby":ue?ce:null,title:_e&&"string"===typeof z?z:null},V,a.props,{className:(0,d.Z)(V.className,a.props.className),onTouchStart:Ee,ref:Ce}),Te={};g||(Pe.onTouchStart=function(e){Ee(e),clearTimeout(re.current),clearTimeout(ee.current),clearTimeout(ne.current),e.persist(),ne.current=setTimeout((function(){fe()(e)}),k)},Pe.onTouchEnd=function(e){a.props.onTouchEnd&&a.props.onTouchEnd(e),clearTimeout(ne.current),clearTimeout(re.current),e.persist(),re.current=setTimeout((function(){xe(e)}),O)}),p||(Pe.onMouseOver=fe(),Pe.onMouseLeave=ke(),S&&(Te.onMouseOver=fe(!1),Te.onMouseLeave=ke(!1))),c||(Pe.onFocus=we(),Pe.onBlur=ke(),S&&(Te.onFocus=we(!1),Te.onBlur=ke(!1)));var Oe=t.useMemo((function(){return(0,QA.Z)({popperOptions:{modifiers:{arrow:{enabled:Boolean(Y),element:Y}}}},L)}),[Y,L]);return t.createElement(t.Fragment,null,t.cloneElement(a,Pe),t.createElement(D,(0,e.Z)({className:(0,d.Z)(s.popper,S&&s.popperInteractive,o&&s.popperArrow),placement:N,anchorEl:K,open:!!K&&ue,id:Pe["aria-describedby"],transition:!0},Te,Oe),(function(r){var n=r.placement,i=r.TransitionProps;return t.createElement(Z,(0,e.Z)({timeout:W.transitions.duration.shorter},i,q),t.createElement("div",{className:(0,d.Z)(s.tooltip,s["tooltipPlacement".concat((0,Gt.Z)(n.split("-")[0]))],Q.current&&s.touch,o&&s.tooltipArrow)},z,o?t.createElement("span",{className:s.arrow,ref:X}):null))})))}));const yM=(0,n.Z)((function(e){return{popper:{zIndex:e.zIndex.tooltip,pointerEvents:"none"},popperInteractive:{pointerEvents:"auto"},popperArrow:{'&[x-placement*="bottom"] $arrow':{top:0,left:0,marginTop:"-0.71em",marginLeft:4,marginRight:4,"&::before":{transformOrigin:"0 100%"}},'&[x-placement*="top"] $arrow':{bottom:0,left:0,marginBottom:"-0.71em",marginLeft:4,marginRight:4,"&::before":{transformOrigin:"100% 0"}},'&[x-placement*="right"] $arrow':{left:0,marginLeft:"-0.71em",height:"1em",width:"0.71em",marginTop:4,marginBottom:4,"&::before":{transformOrigin:"100% 100%"}},'&[x-placement*="left"] $arrow':{right:0,marginRight:"-0.71em",height:"1em",width:"0.71em",marginTop:4,marginBottom:4,"&::before":{transformOrigin:"0 0"}}},tooltip:{backgroundColor:(0,F.Fq)(e.palette.grey[700],.9),borderRadius:e.shape.borderRadius,color:e.palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(10),lineHeight:"".concat(pM(1.4),"em"),maxWidth:300,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},tooltipArrow:{position:"relative",margin:"0"},arrow:{overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:(0,F.Fq)(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}},touch:{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:"".concat(pM(16/14),"em"),fontWeight:e.typography.fontWeightRegular},tooltipPlacementLeft:(0,er.Z)({transformOrigin:"right center",margin:"0 24px "},e.breakpoints.up("sm"),{margin:"0 14px"}),tooltipPlacementRight:(0,er.Z)({transformOrigin:"left center",margin:"0 24px"},e.breakpoints.up("sm"),{margin:"0 14px"}),tooltipPlacementTop:(0,er.Z)({transformOrigin:"center bottom",margin:"24px 0"},e.breakpoints.up("sm"),{margin:"14px 0"}),tooltipPlacementBottom:(0,er.Z)({transformOrigin:"center top",margin:"24px 0"},e.breakpoints.up("sm"),{margin:"14px 0"})}}),{name:"MuiTooltip",flip:!1})(vM);var bM=t.forwardRef((function(r,n){var i=r.children,o=r.classes,a=r.className,s=r.component,u=void 0===s?"div":s,c=r.disablePointerEvents,l=void 0!==c&&c,f=r.disableTypography,p=void 0!==f&&f,m=r.position,g=r.variant,v=(0,h.Z)(r,["children","classes","className","component","disablePointerEvents","disableTypography","position","variant"]),y=Zi()||{},b=g;return g&&y.variant,y&&!b&&(b=y.variant),t.createElement(qi.Provider,{value:null},t.createElement(u,(0,e.Z)({className:(0,d.Z)(o.root,a,"end"===m?o.positionEnd:o.positionStart,l&&o.disablePointerEvents,y.hiddenLabel&&o.hiddenLabel,"filled"===b&&o.filled,"dense"===y.margin&&o.marginDense),ref:n},v),"string"!==typeof i||p?i:t.createElement(vr,{color:"textSecondary"},i)))}));const wM=(0,n.Z)({root:{display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap"},filled:{"&$positionStart:not($hiddenLabel)":{marginTop:16}},positionStart:{marginRight:8},positionEnd:{marginLeft:8},disablePointerEvents:{pointerEvents:"none"},hiddenLabel:{},marginDense:{}},{name:"MuiInputAdornment"})(bM),xM=L((e=>({container:{width:380,height:60,display:"flex",alignItems:"center"},error:{marginTop:e.spacing(1),textAlign:"center"}})));function kM(){const e=xM(),[r,n]=EA(),[i,o]=kA(),[a,s]=(0,t.useState)(""),[u,c]=(0,t.useState)(!1),[l,f]=(0,t.useState)(""),[d,h]=(0,t.useState)(!1);const p=(0,un.jsx)(un.Fragment,{children:(0,un.jsxs)(XA,{children:[(0,un.jsxs)(Gn,{display:"flex",className:e.container,children:[(0,un.jsx)(yM,{title:"Your transaction will revert if the price changes unfavorably by more than this percentage.. The default is 0.5%.",children:(0,un.jsx)(vr,{variant:"subtitle2",style:{marginLeft:"30px"},children:"Slippage tolerance"})}),(0,un.jsx)(Xu,{variant:"outlined",size:"small",style:{left:"30px",width:140},inputProps:{style:{height:"20px",color:u?"red":""}},InputProps:{startAdornment:(0,un.jsx)(wM,{position:"start",children:"%"})},placeholder:vA.toString(),value:a.length>0?a:"auto"===r?"":`${r}`,onChange:e=>function(e){if(s(e),c(!1),0!==e.length)try{const t=Number.parseFloat(e);if(0===t)throw new Error("The slipplage cannot be 0");if(t>50)throw new Error("The slippage cannot large than 50%");n(t)}catch(t){console.log(`Invalid slippage input ${e}`),c(`${t}`),n("auto")}else n("auto")}(e.target.value)})]}),(0,un.jsxs)(Gn,{display:"flex",className:e.container,children:[(0,un.jsx)(yM,{title:"Your transaction will revert if it is pending for more than this period of time.",children:(0,un.jsx)(vr,{variant:"subtitle2",style:{marginLeft:"80px"},children:"Deadline"})}),(0,un.jsx)(Xu,{variant:"outlined",size:"small",style:{left:"50px",width:140},inputProps:{style:{height:"20px",color:d?"red":""}},placeholder:"60 minutes",value:l.length>0?l:i===gA?"":(i/60).toString(),onChange:e=>function(e){if(f(e),h(!1),0!==e.length)try{const t=Math.floor(60*Number.parseFloat(e));if(t<60)throw new Error("The deadline cannot less than 1 minutes");if(t>EM)throw new Error("The deadline cannot large than 3 days");o(t)}catch(t){console.log(`Invalid deadline input ${e}`),o(gA),h(`${t}`)}else o(gA)}(e.target.value)})]}),u?(0,un.jsx)(vr,{variant:"body2",color:"error",className:e.error,children:u}):null,d?(0,un.jsx)(vr,{variant:"body2",color:"error",className:e.error,children:d}):null]})});return p}const EM=259200;function AM(){const[e,r]=(0,t.useState)(!1);return(0,un.jsxs)(un.Fragment,{children:[(0,un.jsx)(Ti,{"aria-label":"settings",onClick:()=>r(!0),children:(0,un.jsx)(JA.Z,{})}),(0,un.jsx)(Mi,{open:e,onClose:()=>r(!1),children:(0,un.jsx)(kM,{})})]})}const SM=L((e=>({spacer:{height:"1rem"},appBar:{background:Nr,"& > .MuiToolbar-root":{margin:".5rem 0rem 0rem 1rem",width:"100%"}},link:{...e.typography.body1,color:e.palette.text.primary,marginLeft:e.spacing(6),[e.breakpoints.down("sm")]:{marginLeft:e.spacing(2.5)},[e.breakpoints.down("xs")]:{marginLeft:e.spacing(1)},"&.active":{color:e.palette.primary.light}},bg:{background:"linear-gradient(160deg, rgba(69,74,117,.1) 0%, rgba(138,146,178,.1) 33%, rgba(69,74,117,.1) 66%, rgba(98,104,143,.1) 100%), linear-gradient(45deg, rgba(153,69,255,.1) 0%, rgba(121,98,231,.1) 20%, rgba(0,209,140,.1) 100%)",display:"flex",flexDirection:"column",minHeight:"100vh"}})));const MM=function(){const e=SM(),t=HA(),r=yk();return(0,un.jsxs)("div",{className:e.bg,children:[(0,un.jsx)(Qt,{position:"static",color:"inherit",className:e.appBar,elevation:0,children:(0,un.jsxs)(rr,{children:[(0,un.jsx)("div",{className:e.spacer}),(0,un.jsx)(hr,{implementation:"css",xsDown:!0,children:(0,un.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,un.jsx)(br,{component:Kt,to:"/swap",color:"inherit",className:e.link,onClick:()=>{r(_A())},children:"Swap"}),(0,un.jsx)(br,{component:Kt,to:"/add-liquidity",color:"inherit",className:e.link,onClick:()=>{r(FA())},children:"Add Liquidity"}),(0,un.jsx)(br,{component:Kt,to:"/remove-liquidity",color:"inherit",className:e.link,children:"Remove Liquidity"}),(0,un.jsx)(br,{component:Kt,to:"/add-pool",color:"inherit",className:e.link,children:"Add Pool"}),(0,un.jsx)(br,{component:Kt,to:"/pools",color:"inherit",className:e.link,children:"Pools"})]})}),(0,un.jsx)("div",{style:{position:"absolute",top:"6px",right:"30px"},children:(0,un.jsx)(AM,{})}),(0,un.jsx)("div",{style:{position:"absolute",top:"10px",right:"80px"},children:(0,un.jsx)(ik,{})})]})}),(0,un.jsxs)(Dt,{children:[(0,un.jsx)(It,{exact:!0,path:"/swap",children:(0,un.jsx)(RA,{dexTokens:t})}),(0,un.jsx)(It,{exact:!0,path:"/add-liquidity",children:(0,un.jsx)(UA,{dexTokens:t})}),(0,un.jsx)(It,{exact:!0,path:"/remove-liquidity",children:(0,un.jsx)(zA,{dexTokens:t})}),(0,un.jsx)(It,{exact:!0,path:"/add-pool",children:(0,un.jsx)(qA,{})}),(0,un.jsx)(It,{exact:!0,path:"/pools",children:(0,un.jsx)(GA,{dexTokens:t})}),(0,un.jsx)(It,{children:(0,un.jsx)(_t,{to:"/swap"})})]})]})};const CM=function(){return(0,un.jsx)(MM,{})};class _M extends t.Component{constructor(e){super(e),this.state={hasError:!1}}static getDerivedStateFromError(e){return{hasError:!0}}componentDidCatch(e,t){console.error(e,t)}render(){return this.state.hasError?(0,un.jsx)(vr,{variant:"h5",style:{textAlign:"center",marginTop:24},children:"An unexpected error has occurred. Please refresh the page."}):this.props.children}}const PM={lastInput:void 0,inputValue:void 0,tokenInInfo:void 0,tokenOutInfo:void 0},TM=aA(PM,(e=>e.addCase(AA,((e,t)=>({...e,tokenInInfo:t.payload}))).addCase(SA,((e,t)=>({...e,tokenOutInfo:t.payload}))).addCase(MA,(e=>({...e,lastInput:void 0===e.lastInput?void 0:"TokenIn"===e.lastInput?"TokenOut":"TokenIn",tokenInInfo:e.tokenOutInfo,tokenOutInfo:e.tokenInInfo}))).addCase(CA,((e,t)=>{const r=t.payload.value;return{...e,lastInput:t.payload.type,inputValue:""===r?void 0:r}})).addCase(_A,(()=>PM)))),OM={lastInput:void 0,inputValue:void 0,otherInputValue:void 0,tokenAInfo:void 0,tokenBInfo:void 0},IM=function(e){var t,r=nA(),n=e||{},i=n.reducer,o=void 0===i?void 0:i,a=n.middleware,s=void 0===a?r():a,u=n.devTools,c=void 0===u||u,l=n.preloadedState,f=void 0===l?void 0:l,d=n.enhancers,h=void 0===d?void 0:d;if("function"===typeof o)t=o;else{if(!eA(o))throw new Error('"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers');t=jE(o)}var p=s;"function"===typeof p&&(p=p(r));var m=NE.apply(void 0,p),g=BE;c&&(g=QE(JE({trace:!1},"object"===typeof c&&c)));var v=[m];return Array.isArray(h)?v=HE([m],h):"function"===typeof h&&(v=h(v)),RE(t,f,g.apply(void 0,v))}({reducer:{settings:xA,swap:TM,mint:aA(OM,(e=>e.addCase(jA,((e,t)=>({...e,tokenAInfo:t.payload}))).addCase(BA,((e,t)=>({...e,tokenBInfo:t.payload}))).addCase(NA,((e,t)=>{const r=""===t.payload.value?void 0:t.payload.value;return t.payload.hasLiquidity?{...e,lastInput:t.payload.type,inputValue:r,otherInputValue:void 0}:void 0===e.lastInput||e.lastInput===t.payload.type?{...e,inputValue:r,lastInput:t.payload.type}:{...e,lastInput:t.payload.type,inputValue:r,otherInputValue:e.inputValue}})).addCase(FA,(()=>OM))))}});f.render((0,un.jsx)(_M,{children:(0,un.jsx)(hk,{store:IM,children:(0,un.jsxs)(l,{theme:Dr,children:[(0,un.jsx)(a,{}),(0,un.jsx)($x,{children:(0,un.jsx)(Fe,{maxSnack:3,children:(0,un.jsx)(Lt,{children:(0,un.jsx)(CM,{})})})})]})})}),document.getElementById("root"))})()})();
//# sourceMappingURL=main.c5b5802f.js.map