export async function errorChecker(res) {
    const errorCode = res.ok ? false : res.status
    const errorMessage = res.ok ? false : res.statusText
    const data = await res.json()

    return {
        data,
        error: {errorCode, errorMessage}, 
      }
};
export async function errorSlugChecker(res, division) {
  let errorCode = res.ok ? false : res.status
  let errorMessage = res.ok ? false : res.statusText
  let data = {}
  const response = await res.json()
  //CHECK DIVISION AND SLUG
  if (Array.isArray(response) && 
    response.length && 
    division && 
    division===response[0].division.slug) {
      data = response[0]
  } else {
    errorCode = 404;
    errorMessage = "No such restaurant"
  }
  
  return {
      data,
      error: {errorCode, errorMessage}, 
    }
};

export async function errorSlugRestChecker(res, slug) {
  let errorCode = res.ok ? false : res.status
  let errorMessage = res.ok ? false : res.statusText
  let data = {}
  const response = await res.json()

  //CHECK SLUG WITHOUT DIVISION :(
  if (Array.isArray(response) && 
    response.length && 
    slug && 
    slug===response[0].restaurant.slug) {
      data = response[0]
  } else {
    errorCode = 404;
    errorMessage = "No such restaurant"
  }
  
  return {
      data,
      error: {errorCode, errorMessage}, 
    }
};