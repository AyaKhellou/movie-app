import { useState, useEffect } from "react";
import { useAuth } from '../context/authContext'
import { getMovie } from '../services/tmbd'

export default function useFavorites(){
    const { userData } = useAuth()
    const [favMoviesList, setFavMoviesList] = useState([])
    const [loading , setLoading] = useState(true);
    const [err , setErr] = useState(null)


    useEffect(() => {
        Promise.all(
            userData?.favorites?.map(id => getMovie(id))
        )
        .then(movies => {
            setFavMoviesList(movies);
            setLoading(false)
        })
        .catch(setErr)
        .finally(()=>setLoading(false))
    }, [userData?.favorites]);

    return { favMoviesList, err, loading };
}