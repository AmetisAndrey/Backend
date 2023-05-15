import useSWR from 'swr'
import fetcher from '@/libs/fetcher';

function useUser () {
    const { data, error, isLoading } = useSWR('/api/user_session', fetcher)
    return {data, error, isLoading}
  }


export default useUser;