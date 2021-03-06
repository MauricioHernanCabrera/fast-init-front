import CrudRepository from "crud-repository";

export default class CommandRepository extends CrudRepository {
  constructor({ $axios }) {
    super({ $axios, resource: "/commands", excludes: ["reorderAll"] });
  }
}
