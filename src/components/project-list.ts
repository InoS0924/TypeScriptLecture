import { Component } from "./base-component";
import { DragTarget } from "../models/drag-drop";
import { Project } from "../models/project";
import { AutoBind } from "../decorators/autobind";
import { projectState } from "../state/project-state";
import { ProjectStatus } from "../models/project";
import { ProjectItem } from "./project-item";

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    assignedProjects: Project[] = [];

    constructor (private type: 'active' | 'finished') {
        super("project-list", "app", false, `${type}-projects`);

        this.configure();
        this.renderContent();
    }

    @AutoBind
    dragOverHandler (e: DragEvent) {
        if (e.dataTransfer && e.dataTransfer.types[0] === "text/plain") {
            e.preventDefault();
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add("droppable");
        }
    }

    @AutoBind
    dropHandler (e: DragEvent) {
        const prjId = e.dataTransfer!.getData("text/plain");
        projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
    }

    @AutoBind
    dragLeaveHandler (_: DragEvent) {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove("droppable");
    }

    configure () {
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("drop", this.dropHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);

        projectState.addListener((projects: Project[]) => {
            const relProjects = projects.filter(prj => {
                if (this.type === "active") {
                    return prj.status === ProjectStatus.Active;
                }
                return prj.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relProjects;
            this.renderProjects();
        });
    }

    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type === 'active' ? "実行中Prj" : "完了Prj";
    }

    private renderProjects () {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const prjItem of this.assignedProjects) {
            new ProjectItem(listEl.id, prjItem);
        }
    }
}