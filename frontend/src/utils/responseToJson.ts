const responseToJson = async (response: Response): Promise<any> => {
  const responseBody = await response.text()

  if (response.status < 200 || response.status > 299) {
    try {
      return Promise.reject(JSON.parse(responseBody))
    } catch {
      return Promise.reject(responseBody)
    }
  }

  return Promise.resolve(JSON.parse(responseBody))
}

export default responseToJson
