import initializeFirebase from "../pages/Login/firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [admin, setAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const auth = getAuth();


    const googleProvider = new GoogleAuthProvider();


    const registerUser = (name, email, password, location, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                setUser(result.user);
                addUserName(name);
                saveUser(name, email);
                const destination = location?.state?.from || '/';
                history.push(destination);
                setError('');
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false))
    }

    const addUserName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
            .then(() => { })
            .catch(error => {
                setError(error.message);
            })
    };


    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                setUser(result.user);
                const destination = location?.state?.from || '/';
                history.push(destination);
                setError('');
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false))
    }

    const loginWithGoogle = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;
                setUser(user);
                saveGoogleUser(user.displayName, user.email);
                const destination = location?.state?.from || '/';
                history.push(destination);
                setError('');
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false))
    };

    const handleLogout = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => {
                setUser({});
            })
            .catch(error => {
                setError(error.message)
            })
            .finally(() => setIsLoading(false))
    }


    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            }
            else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [auth]);

    useEffect(() => {
        fetch(`https://alpha-tracks-server-site-g2v8.vercel.app/users/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setAdmin(data.admin);
            })
    })


    const saveUser = (displayName, email) => {
        const user = { displayName, email };
        console.log(user);
        fetch('https://alpha-tracks-server-site-g2v8.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
    }

    const saveGoogleUser = (displayName, email) => {
        const user = { displayName, email };
        fetch('https://alpha-tracks-server-site-g2v8.vercel.app/users', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {

            })
    }


    return {
        user,
        admin,
        error,
        isLoading,
        registerUser,
        loginUser,
        loginWithGoogle,
        handleLogout,
    };
};

export default useFirebase;