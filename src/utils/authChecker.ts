import { AuthChecker } from "type-graphql";
import Context from "../types/Context";

const authChecker: AuthChecker<Context> = ({ context }) => {
    return !!context.user;
};

export default authChecker;
