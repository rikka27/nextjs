import { APT_URL } from "constant"

export const Post = {
    get: async <T>(query: string = ''): Promise<T[]> => await (await fetch(`${APT_URL}?${query}`)).json()
}

export const QueryAPI = { Post }