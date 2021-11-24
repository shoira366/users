import './Users.scss'
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import useLang from '../../Hook/useLang'
import context from '../../Components/Information/Information'


function Users() {

    let [users, setUsers] = useState([])
    let [lang] = useLang()

    let [id, setId] = useState('')
    let [name, setName] = useState('')
    let [surname, setSurname] = useState('')
    let [email, setEmail] = useState('')
    let [address, setAddress] = useState('')

    useEffect(() => {
        fetch('https://backendsss.herokuapp.com/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data)
            })
    }, [users])

    //METHOD POST

    function PostUsers(e) {
        e.preventDefault()
        fetch('https://backendsss.herokuapp.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, surname, email, address
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

    //METHOD UPDATE

    function UpdateUsers(e) {
        e.preventDefault()
        fetch('https://backendsss.herokuapp.com/users', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id, name, surname, email, address
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

    //METHOD DELETE

    function DeleteUsers(e) {
        e.preventDefault()
        fetch(`https://backendsss.herokuapp.com/users/${e.target.dataset.id}`, {
            method: 'DELETE'
        })
    }

    return (

        <section>
            <h2 style={{textAlign:'center', marginTop:20, marginBottom:20, fontSize:30}}>Users</h2>
            <div className="container">
               
                <div className="form_div">
                    <div className="create_user">
                        <h2>CREATE YOUR USER</h2>
                        <p>{context[lang].create}</p>
                        <form onSubmit={PostUsers} className="userForm">
                            <input onChange={(e) => {
                                setName(e.target.value)
                            }} type="text" placeholder="User name" required />
                            <input onChange={(e) => {
                                setSurname(e.target.value)
                            }} type="text" placeholder="User surname" required />
                            <input onChange={(e) => {
                                setEmail(e.target.value)
                            }} type="text" placeholder="User email" required />
                            <input onChange={(e) => {
                                setAddress(e.target.value)
                            }} type="text" placeholder="User address" required />
                            <button>Create</button>
                        </form>
                    </div>
                    <div className="update_user">
                        <h2>UPDATE USER</h2>
                        <p>{context[lang].update}</p>
                        <form onSubmit={UpdateUsers} className="updateForm">
                            <input onChange={(e) => {
                                setId(e.target.value)
                            }} type="text" placeholder="User id" required />
                            <input onChange={(e) => {
                                setName(e.target.value)
                            }} type="text" placeholder="User name" required />
                            <input onChange={(e) => {
                                setSurname(e.target.value)
                            }} type="text" placeholder="User surname" required />
                            <input onChange={(e) => {
                                setEmail(e.target.value)
                            }} type="text" placeholder="User email" required />
                            <input onChange={(e) => {
                                setAddress(e.target.value)
                            }} type="text" placeholder="User address" required />
                            <button>Update</button>
                        </form>
                    </div>
                </div>
                <ul className="users">
                    {
                        users.map(user => {
                            return (
                                <li className='box' key={user.id}>
                                    <span>{`id: ${user.id}`}</span>
                                    <h3>{user.name}</h3>
                                    <h2>{user.surname}</h2>
                                    <a className="box_email" href={'mailto:' + user.email}>{user.email}</a>
                                    <p>{user.address}</p>
                                    <button onClick={DeleteUsers} data-id={user.id}>&times;</button>
                                    <Link className="box_post" to={`/posts/${user.id}`}>Posts</Link>
                                </li>
                            )
                        })
                    }
                </ul>

            </div>

        </section>
    )
}

export default Users