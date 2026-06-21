import { auth } from '../firebase-config'
import { signOut,updateProfile } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import { useState } from 'react';


function getInitials(name = ''){
    return name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();
}

export default function Profile(){
    const navigate = useNavigate();
    const { user, userData } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [bio, setBio] = useState('Lover of movies. Add a short bio in your profile.');

    async function logout(){
        try{
            await signOut(auth)
            console.log('logging out...')
            navigate('/login')
        }
        catch(error){
            console.log(error.code)
            console.log(error.message)
        }
    }

    async function updateProfileInfo(){
        setEditMode(false)
        await updateProfile(user, {
            bio: bio
        });
    }

    if(editMode){
        return(
            <main className="profile-page">
            <section className="profile-card">
                <div className="profile-avatar">
                    {userData?.photoURL ? (
                        <img src={userData.photoURL} alt={`${userData?.name || 'User'} avatar`} />
                    ) : (
                        <div className="avatar-fallback">{getInitials(userData?.name || user?.email || 'U')}</div>
                    )}
                </div>
                <div className="profile-info">
                    <h1 className="profile-name">{userData?.name || user?.email}</h1>
                    <p className="profile-email">{user?.email}</p>
                    <input 
                    className='profile-bio' 
                    type="text" name="bio" 
                    value={bio} onChange={(e)=>setBio(e.target.value)} />
                    {/* <p className="profile-bio">
                        {userData?.bio || 'Lover of movies. Add a short bio in your profile.'}
                    </p> */}
                    <div className="profile-actions">
                        <button className="btn btn-primary" type="button" 
                        onClick={updateProfileInfo}>Save changes</button>
                    </div>
                </div>
            </section>
        </main>
        )
    }

    return (
        <main className="profile-page">
            <section className="profile-card">
                <div className="profile-avatar">
                    {userData?.photoURL ? (
                        <img src={userData.photoURL} alt={`${userData?.name || 'User'} avatar`} />
                    ) : (
                        <div className="avatar-fallback">{getInitials(userData?.name || user?.email || 'U')}</div>
                    )}
                </div>
                <div className="profile-info">
                    <h1 className="profile-name">{userData?.name || user?.email}</h1>
                    <p className="profile-email">{user?.email}</p>
                    <p className="profile-bio">
                        {bio}
                    </p>
                    <div className="profile-actions">
                        <button className="btn btn-primary" type="button" onClick={logout}>Log out</button>
                        <button className="btn btn-ghost" type="button" onClick={() => navigate('/favorites')}>Favorites</button>
                        <button className="btn btn-ghost" type="button" onClick={() => setEditMode(true)}>Edit Profile</button>
                    </div>
                </div>
            </section>
        </main>
    )
}