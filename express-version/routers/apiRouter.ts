import express from "express";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";

const apiRouter: express.Router = express.Router();

/**
 * @implements test url
 * @host http://localhost:5010/api/
 * @field no-fields
 * @method POST
 * @access PUBLIC
 */

apiRouter.get("/", (request: express.Request, response: express.Response) => {
  response.status(202).send(`
        <h1>Welcome to your own API</h1>
    `);
});

apiRouter.post(
  "/user",
  (_request: express.Request, _response: express.Response) => {
    const { user, email, country } = _request.body;
    _response.status(200).json({
      user,
      email,
      country,
    });
  }
);

/**
 * @implements test url
 * @host http://localhost:5010/api/login
 * @field {user, password, gmail}
 * @method POST
 * @access PUBLIC
 * @summary password encrption using bcryptjs library being saved on Database [ MongoDB preferablly ]
 */

apiRouter.post(
  "/login",
  async (request: express.Request, response: express.Response) => {
    const { user: u, password: p, email: e } = await request.body;
    try {
      await bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(p, salt, (error, hashed) => {
          response.status(200).json({
            user: u,
            password: p,
            email: e,
            hashedPassword: hashed,
          });
        });
      });
    } catch (error) {
      console.error({ error });
    }

    /**
     * BetterComment installation required to be working much more effectively
     * ! hashed password comparison test
     */

    // const passGenerated =
    //   "$2a$10$lDO1XO/Fw2YkPfYBq7CUqup5VU083gFW1HPhUfnjb1NDg5NEDt0L6";
    // try {
    //   await bcrypt.compare(p, passGenerated, (err, result) => {
    //     response.status(200).json({
    //       user: u,
    //       password: p,
    //       email: e,
    //       result,
    //     });
    //   });
    // } catch (error) {
    //   response.sendStatus(400);
    // }
  }
);

apiRouter.post(
  "/user/login",
  body("user").not().isEmpty().withMessage("Name is required to be filled"),
  body("email", "Email field has to be filled")
    .exists({ checkNull: true })
    .isEmail()
    .normalizeEmail({
      gmail_remove_dots: true,
      gmail_lowercase: true,
    }),
  body("password").isLength({ min: 5, max: 50 }).withMessage({
    min: "Min: 5",
    max: "Max: 50",
  }),
  (request: express.Request, response: express.Response) => {
    const { user, password, email } = request.body;
    const errorResult = validationResult(request);
    if (!errorResult.isEmpty()) {
      response.status(400).json({ Error: errorResult.array() });
    } else {
      response.status(200).json({
        user,
        password,
        email,
      });
    }
  }
);

export default apiRouter;
