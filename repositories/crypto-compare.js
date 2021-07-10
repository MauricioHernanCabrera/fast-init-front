import CrudRepository from "crud-repository";

export default class CryptoCompareRepository extends CrudRepository {
  constructor({ $axios }) {
    super({ $axios, resource: "/data", includes: [] });
  }

  getPrice = async (from, to) => {
    const result = await this.$axios.$get(
      `${this.resource}/price?fsym=${from}&tsyms=${to}`
    );

    return result;
  };
}
