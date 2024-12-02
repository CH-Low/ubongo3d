import { useEffect, useState } from "react";

export function useGetDoc(doc) {
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [isloading, setIsLoading] = useState(true);
    
    useEffect(() => {
        setIsLoading(true)
        const sendRequest = async () => {
            try {
                const querySnapshot = await doc
                const queryListings = {}
                querySnapshot.forEach((doc) => {
                    queryListings[doc.id] = doc.data();
                });
                setData(queryListings)
            } catch (error) {
                setError(error.message || 'Something went wrong!')
            }
            setIsLoading(false)
        }
        sendRequest();
    }, [])

    return {
        data,
        isloading,
        error,
    }
}
