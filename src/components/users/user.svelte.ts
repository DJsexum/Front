interface User
{
    id: number;
    fullName: string;
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
        const res = await fetch (`${import.meta.env.PUBLIC_API_URL}/users`);
        const data = await res.json();
        this.users = data;
    }

    async deleteUser(id: number)
    {
        await fetch 
        (`${import.meta.env.PUBLIC_API_URL}/users/${id}`,
            {
                method: 'DELETE'
            }
        );
        this.getUsers();
        this.deleteDialog = false;
    }

    async editUser(id: number, e: Event)
    {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        await fetch 
        (`${import.meta.env.PUBLIC_API_URL}/users/${id}`,
            {
                method: 'PATCH',
                body: JSON.stringify
                (
                    {
                        ...data
                    }
                ),
                headers: 
                {
                    'Content-Type': 'application/json'
                }
            }
        );
        this.getUsers();
        this.editDialog = false;
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