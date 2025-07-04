import familyMemberRouter from "@modules/FamilyMember/routes/familymember.routes";
import spentsRouter from "@modules/Spent/routes/spents.routes";
import passwordRouter from "@modules/Users/routes/password.routes";
import profileRouter from "@modules/Users/routes/profile.routes";
import sessionsRouter from "@modules/Users/routes/sessions.routes";
import usersRouter from "@modules/Users/routes/users.routes";
import { Router } from "express";

const routes = Router();

routes.use("/family-member", familyMemberRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/password", passwordRouter);
routes.use("/profiles", profileRouter);
routes.use("/spents", spentsRouter);

export default routes;
