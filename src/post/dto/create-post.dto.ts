import { Category } from '../../category/entities/category.entity'
import { User } from '../../user/entities/user.entity'

export class CreatePostDto {
    title: string
    content: string
    author: User
    categories: Category[]
}
