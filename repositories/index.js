import AuthRepository from "@/repositories/auth";
import CommandRepository from "@/repositories/command";
import ProgramRepository from "@/repositories/program";
import ProjectRepository from "@/repositories/project";
import UserRepository from "@/repositories/user";

export default $axios => ({
  auth: new AuthRepository({ $axios }),
  command: new CommandRepository({ $axios }),
  program: new ProgramRepository({ $axios }),
  project: new ProjectRepository({ $axios }),
  user: new UserRepository({ $axios })
});
