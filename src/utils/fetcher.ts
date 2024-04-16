export const fetchWithToken = (url: string, token: string) => fetch(`${process.env.NEXT_PUBLIC_API_URI}${url}`, {
    headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + token
    }
}).then(res => res.json())

export const fetchWithoutToken = (url: string) => fetch(url).then(res => res.json())