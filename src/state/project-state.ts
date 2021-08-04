import { Project, ProjectStatus } from "../models/project";

type listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: listener<T>[] = [];

    addListener (listenerFn: listener<T>) {
        this.listeners.push(listenerFn);
    }
}

// Prj Management State
export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor () {
        super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }


    addProject(title: string, desc: string, manday: number) {
        const new_project = new Project(
            Math.random().toString(),
            title,
            desc,
            manday,
            ProjectStatus.Active,
        );
        this.projects.push(new_project);
        this.updateListeners();
    }

    moveProject (prjId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(prj => prj.id === prjId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners () {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}

export const projectState = ProjectState.getInstance();