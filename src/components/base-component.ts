export abstract class Component <T extends HTMLElement, U extends HTMLElement> {
    templateElm: HTMLTemplateElement;
    hostElm: T;
    element: U;

    constructor (templateId: string, hostId: string, insertAtStart: boolean, newElementId?: string) {
        this.templateElm = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElm = document.getElementById(hostId)! as T;

        const importNode = document.importNode(this.templateElm.content, true);
        this.element = importNode.firstElementChild as U;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }

    abstract configure(): void;
    abstract renderContent(): void;

    private attach (insertAtStart: boolean) {
        this.hostElm.insertAdjacentElement(insertAtStart ? "afterbegin" : "beforeend", this.element);
    }
}