interface User
{
    id: number;
    username: string;
    email: string;
}

class UserModel
{
    user = $state <User | null>(null)
    users = $state <User[]>([])
    deleteDialog = $state(false)
    editDialog = $state(false)

    async getUsers()
    {
        const res = await fetch ('https://dummyjson.com/users');
        const data = await res.json();
        this.users = data.users;
    }

    showEditModal(user: User)
    {
        this.user = user;
        this.editDialog = true;
    }

    showDeleteModal(user: User)
    {
        this.user = user;
        this.deleteDialog = true;
    }
}

export const userModel = new UserModel()