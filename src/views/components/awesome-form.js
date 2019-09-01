/**
 * Custom Tag 생성
 * 미션에 여유가 있으면 시도해볼 예정.
 */

class AwesomeForm extends HTMLElement {
    constructor(formData) {
      super();
  
      // 엘리먼트의 기능들은 여기에 작성합니다.
    }

    static get observedAttributes() {
        // 모니터링 할 속성 이름
        // return ['locale'];
    }

    connectedCallback() {

    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        // 속성이 추가/제거/변경
    }

    disconnectedCallback() {
        
    }

    start() {

    }

    stop() {

    }
}


// export default class Component extends HTMLElement {
//     constructor(componentName: string) {
//         super()

//         const node: Node = new View(componentName).node
//         this.attachShadow({ mode: "open" }).appendChild(node)
//     }

//     getAttribute(qualifiedName: string): string {
//         return super.getAttribute(qualifiedName) || ""
//     }
// }

// export class buttonComponent extends Component {
//     constructor() {
//         super("customBtnComponent")
//         const text = this.getAttribute("text")
//         const btn = this.shadowRoot!.querySelector("button")!
//         btn.innerText = text

//         const goto = this.getAttribute("goto")

//         if (goto) {
//             btn.addEventListener("click", () => {
//                 mainController.goTo(goto)
//             })
//         }
//     }
// }


customElements.define('awesome-form', AwesomeForm, { extends: 'form' });