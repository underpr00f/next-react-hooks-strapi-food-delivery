const apiUrl = () => {
    console.log('process.env',process.env.NODE_ENV, process.env.NEXT_PUBLIC_API_URL)
    // if (process.env.NODE_ENV&&process.env.NODE_ENV!=='development'&&process.env.NEXT_PUBLIC_API_URL) {
    //     return process.env.NEXT_PUBLIC_API_URL
    // }
    if (process.env.NODE_ENV&&process.env.NODE_ENV!=='development'&&process.env.NEXT_PUBLIC_API_URL) {
        return process.env.NEXT_PUBLIC_API_URL
    }
    return "http://localhost:1337"
};

export const API_URL = apiUrl();