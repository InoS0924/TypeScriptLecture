import { Component } from "./base-component";
import { Draggable } from "../models/drag-drop";
import { AutoBind } from "../decorators/autobind";
import { Project } from "../models/project";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable{
    private project: Project;

    get manday () {
        if (this.project.manday < 20) {
            return this.project.manday.toString() + '人日';
        } else {
            return (this.project.manday / 20).toString() + '人月';
        }
    }

    constructor (hostId: string, project: Project) {
        super("single-project", hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    @AutoBind
    dragStartHandler (e: DragEvent) {
        e.dataTransfer!.setData("text/plain", this.project.id);
        e.dataTransfer!.effectAllowed = "move";
    }

    dragEndHandler (_: DragEvent) {
        console.log("Drag End");
    }

    configure () {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    }


    renderContent () {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.manday;
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}