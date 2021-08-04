import { Component } from "./base-component";
import { Validatable, validate } from "../utils/validation";
import { projectState } from "../state/project-state";
import { AutoBind } from "../decorators/autobind";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    titleElm: HTMLInputElement;
    descElm: HTMLInputElement;
    mandayElm: HTMLInputElement;

    constructor () {
        super("project-input", "app", true, "user-input");

        this.titleElm = this.element.querySelector("#title") as HTMLInputElement;
        this.descElm = this.element.querySelector("#description") as HTMLInputElement;
        this.mandayElm = this.element.querySelector("#manday") as HTMLInputElement;

        this.configure();
        this.renderContent();
    }

    configure () {
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent () {}

    private clearUserInput() {
        this.titleElm.value = '';
        this.descElm.value = '';
        this.mandayElm.value = '';
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleElm.value;
        const enteredDesc = this.descElm.value;
        const enteredManday = this.mandayElm.value;

        const v1: Validatable = {
            value: enteredTitle,
            required: true,
        }
        const v2: Validatable = {
            value: enteredDesc,
            required: true,
            minLength: 5,
        }
        const v3: Validatable = {
            value: +enteredManday,
            required: true,
            min: 1,
            max: 1000,
        }

        if ( !validate(v1) || !validate(v2) || !validate(v3) ) {
            alert("Invalid values!!!");
            return;
        } else {
            return [enteredTitle, enteredDesc, +enteredManday];
        }
    }

    @AutoBind
    private submitHandler(e: Event){
        e.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, manday] = userInput;
            projectState.addProject(title, desc, manday);
            this.clearUserInput();
        }
    }
}