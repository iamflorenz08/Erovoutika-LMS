export const fetchWithToken = (url: string, token: number) => fetch(url, {
    headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + token
    }
}).then(res => res.json())

export const fetchWithoutToken = (url: string) => fetch(url).then(res => res.json())