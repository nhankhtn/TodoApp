
// function useLoadProfile() {
//     const [profile, setProfile] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const loadProfile = async () => {
//             try {
//                 const resp = await get('user/auth');
//                 setProfile(resp);
//             } catch (err) {
//                 setError(err);
//             }
//         };
//         loadProfile();
//     }, []);

//     return { profile, error };
// }