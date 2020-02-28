// Import controllers
import express from 'express';
import Magic from '../admin-sdk';
import { CommentsController } from './controllers/comments/comments';
import { LikesController } from './controllers/likes/likes';
import { UsersController } from './controllers/users/users';

const app = express();
const port = 3101;

/* Magic admin SDK instance */
const magic = new Magic('sk_test_23820E8B30001B59');

/* Entry point for middleWare */
app.use(magic.middlewares.express);

app.get('/', (req: any, res: any) => res.send('Hello World!'));

/*
 * List users
 */
app.get('/users', (req: any, res: any) => UsersController.GetUsers(req, res));

/*
 * Get user likes
 */
app.get('/comments', async (req: any, res: any) => {
  LikesController.GetLikesForUser(req, res);
  const DIDToken = req.headers.authorization.substring(7); // Grab authorization header by stripping bearer.
  const pubAddr = magic.token.getPublicAddress(DIDToken);
  console.log('pubAddr', pubAddr);
  try {
    await magic.users.logoutByPublicAddress(pubAddr);
  } catch (err) {
    console.error(err);
  }
});

/*
 * Get user comments
 */
app.get('/likes', (req: any, res: any) => CommentsController.GetCommentsForUser(req, res));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
