import axios from 'axios'

export async function fetchData<T>(endpoint: string ): Promise<T> { //, cacheKey: string): Promise<T> {
   try {
    const response = await axios.get<T>(endpoint)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
