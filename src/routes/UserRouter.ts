import { Router, Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { UserService } from "../services/UserService";

export class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * GET all users.
     */
    public getAll(req: Request, res: Response, next: NextFunction) {
        res.send(UserService.GetAll());
    }

    /**
     * GET one user by id
     */
    public getOne(req: Request, res: Response, next: NextFunction) {
        const query = parseInt(req.params.id);
        const user: User = UserService.FindById(query);

        if (user) {
            res.status(200)
                .send({
                    message: "Success",
                    status: res.status,
                    user
                });
        }
        else {
            res.status(404)
                .send({
                    message: "No user found with the given id.",
                    status: res.status
                });
        }
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get("/", this.getAll);
        this.router.get("/:id", this.getOne);
    }
}

// Create the HeroRouter, and export its configured Express.Router
const userRoutes: UserRouter = new UserRouter();
userRoutes.init();

export default userRoutes.router;
