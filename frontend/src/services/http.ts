
export const request = (baseURL: string) => ({
    get: async (route: string) => {
        return await fetch(parseURL(baseURL, route), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            return res.json()
        })
    },
    post: async (route: string, body: object) => {
        return await fetch(parseURL(baseURL, route), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then((res) => {
            return res.json()
        })
    }
})


const parseURL = (base: string, route: string) => {
    return `${base.replace(/\/+$/, '')}/${route.replace(/^\/+/, '')}`
}

export const http = request(import.meta.env.VITE_API_URL || 'http://localhost:8090')
