import CrudRepository from "crud-repository";

export default class ProjectRepository extends CrudRepository {
  constructor({ $axios }) {
    super({ $axios, resource: "/projects", excludes: ["reorderAll"] });
  }
}
