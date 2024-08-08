const { useEffect, useState } = require("react");
const { useStore, actions } = require("~/store");
const { get } = require("~/utils");



export function useLoadProfile() {
    const [state, dispatch] = useStore();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let timeoutId;
        const loadProfile = async () => {
            try {
                const resp = await get('user/auth');
                if (!resp.ok) {
                    console.log(resp);
                    return;
                }
                const user = resp.result.data;
                dispatch(actions.setProfileUser(user));
            } catch (err) {
                console.log(err);
            } finally {
                timeoutId = setTimeout(() => setIsLoading(false), 1000);
            }
        }
        loadProfile();

        return clearTimeout(timeoutId);
    }, [dispatch]);

    return {
        isLoading,
    }
}