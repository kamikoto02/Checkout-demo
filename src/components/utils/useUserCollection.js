import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export function useUserCollection(path) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, path),
            (snapshot) => {
                const items = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setData(items);
        
            }
        );

        return () => unsubscribe();
    }, [path]);

    return { data};
}
