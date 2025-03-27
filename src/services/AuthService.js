import api from '@utils/api';

export const fetchAuthStatus = async (setIsLoading, isAuthenticated, setIsAuthenticated, setMessage, isMounted, navigate) => {
    setIsLoading(true);
    console.log('Fetching auth status...');
    try {
        const result = await api.get('/api/auth/session');

        console.log('Parsed JSON:', result);
        setIsAuthenticated(result.isAuthenticated || false);

        if (!isAuthenticated) {
            setMessage('Unauthorized, please login');
            setTimeout(() => {
                if (isMounted.current) {
                    navigate('/login');
                }
            }, 2000);
        }
    } catch (error) {
        if (api.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Failed to fetch authentication status');
        }
        throw error;
    }
};