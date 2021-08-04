import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";
import _ from "lodash";
console.log(_.shuffle([1, 2, 3]));
const prjInput = new ProjectInput();
const activePrj = new ProjectList('active');
const finishedPrj = new ProjectList('finished');
//# sourceMappingURL=app.js.map