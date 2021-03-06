import CrudRepository from "crud-repository";

export default class ProgramRepository extends CrudRepository {
  constructor({ $axios }) {
    super({ $axios, resource: "/programs", excludes: ["reorderAll"] });
  }
}
