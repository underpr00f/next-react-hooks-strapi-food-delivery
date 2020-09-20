export async function errorChecker(res) {
    const errorCode = res.ok ? false : res.status
    const errorMessage = res.ok ? false : res.statusText
    const data = await res.json()

    return {
        data,
        error: {errorCode, errorMessage}, 
      }
};
