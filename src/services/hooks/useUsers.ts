import { useQuery } from "react-query";
import { api } from "../api";

type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

type GetUsersResponse = {
    totalCount: number;
    users: User[];
}

export const getUsers = async (page: number): Promise<GetUsersResponse> => {
    const { data, headers } = await api.get('/users', {
        params: {
            page,
        }
    }).then(response => response);

    const totalCount = Number(headers['x-total-count']);

    const users = data?.users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.created_at).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }));

    return {
        users,
        totalCount,
     };
    
}

export function useUsers(page: number) {
    return useQuery(
        ['users', page], () => getUsers(page),
        {
            staleTime: 1000 * 30
        }
    );
}