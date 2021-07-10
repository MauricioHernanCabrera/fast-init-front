import AllRepository from "@/repositories/all";

export default $axios => ({
  all: new AllRepository({ $axios })
});
