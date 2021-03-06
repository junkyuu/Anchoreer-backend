import * as express from 'express';
import { Request, Response } from 'express';
import container from '../../injector';
import { PostService, UserService } from '../../service';
import { RequestManager } from '../../util';
import { PostDto, UserDto } from '../dto';

class PostController {

    public router = express.Router();
    
    private requestManager: RequestManager;
    private postService: PostService;
    private userService: UserService;
 
    constructor(
        requestManager: RequestManager,
        postService: PostService,
        userService: UserService
    ) {
        this.requestManager = requestManager;
        this.postService = postService;
        this.userService = userService;

        this.router.post('', async (req: Request, res: Response, next) => {

            let post: PostDto = req.body;

            try {
                let token = await this.requestManager.getToken(req);
                let requester = await this.userService.getUserByToken(token);
                let savedPost = await this.postService.createPost(requester, post);

                res.status(201).send(savedPost);
            } catch (err) {
                next(err);
            }
        })

        this.router.get('/:postId', async (req: Request, res: Response, next) => {

            let postId: number = Number(req.params.postId);

            try {
                let post = await this.postService.getPostWithAllCommentsByPostId(postId);

                res.status(200).send(post);
            } catch (err) {
                next(err);
            }
        })

        this.router.get('', async (req: Request, res: Response, next) => {
            try {
                let page = Number(req.query.page);
                let size = Number(req.query.size);
                let sort = req.query.sort as string;

                let posts = await this.postService.getPosts(page, size, sort);

                res.status(200).send(posts);
            } catch (err) {
                next(err);
            }
        })

        this.router.get('/search/user-name/:userName', async (req: Request, res: Response, next) => {
            try {
                let userName = req.params.userName;
                let sort = req.query.sort as string;

                let posts = await this.postService.getPostsByUserName(userName, sort);

                res.status(200).send(posts);
            } catch (err) {
                next(err);
            }
        })

        this.router.get('/search/title/:title', async (req: Request, res: Response, next) => {
            try {
                let title = req.params.title;
                let sort = req.query.sort as string;

                let posts = await this.postService.getPostsByTitle(title, sort);

                res.status(200).send(posts);
            } catch (err) {
                next(err);
            }
        })

        this.router.put('', async (req: Request, res: Response, next) => {

            let post: PostDto = req.body;

            try {
                let savedPost = await this.postService.updatePost(post);

                res.status(201).send(savedPost);
            } catch (err) {
                next(err);
            }
        })

        this.router.delete('/:postId', async (req: Request, res: Response, next) => {

            try {
                let postId = Number(req.params.postId);
                await this.postService.deletePost(postId);
                res.status(204).send();
            } catch (err) {
                next(err);
            }
        })

        this.router.post('/:postId/comments', async (req: Request, res: Response, next) => {
            try {
                let comment = req.body;

                let postId: number = Number(req.params.postId);
                let token = await this.requestManager.getToken(req);
                let requester = await this.userService.getUserByToken(token);
                let savedComment = await this.postService.createComment(requester, postId, comment);

                res.status(201).send(savedComment);
            } catch (err) {
                next(err);
            }
        })

        this.router.put('/comments', async (req: Request, res: Response, next) => {
            try {
                let comment = req.body;
                let updatedComment = await this.postService.updateComment(comment);
                res.status(200).send(updatedComment);
            } catch (err) {
                next(err);
            }
        })

        this.router.delete('/comments/:commentId', async (req: Request, res: Response, next) => {
            try {
                let commentId = Number(req.params.commentId);
                await this.postService.deleteComment(commentId);
                res.status(204).send();
            } catch (err) {
                next(err);
            }
        })
    }
 }
 
 export const postController = new PostController(container.get("RequestManager"), container.get("PostService"), container.get("UserService")).router;