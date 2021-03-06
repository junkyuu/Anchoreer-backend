import { AuthToken } from "../entity/AuthToken";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { Comment } from "../entity/Comment";

export interface UserRepository {
    existsByEmail(email: string): Promise<boolean>;
    save(user: User): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findById(id: number): Promise<User>;
}

export interface AuthTokenRepository {
    save(authToken: AuthToken): Promise<AuthToken>;
    findById(token: string): Promise<AuthToken>;
}

export interface PostRepository {
    save(post: Post): Promise<Post>;
    findById(id: number): Promise<Post>;
    findAll(): Promise<Post[]>;
    findAllOrderBy(orderByOption: any): Promise<Post[]>;
    findAllPageableOrderby(page: number, size: number, orderByOption: any): Promise<Post[]>;
    findByUserName(userName: string, orderByOption: any): Promise<Post[]>;
    findByTitle(title: string, orderByOption: any): Promise<Post[]>;
    deleteById(id: number): Promise<void>;
}

export interface CommentRepository {
    save(comment: Comment): Promise<Comment>;
    findById(id: number): Promise<Comment>;
    deleteById(id: number): Promise<void>;
    findByPostId(postId: number): Promise<Comment[]>;
}