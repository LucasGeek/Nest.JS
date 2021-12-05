import { Post } from '../../post/entities/post.entity'

export class CreateCategoryDto {
    id: number
    name: string
    posts: Post[]
}
