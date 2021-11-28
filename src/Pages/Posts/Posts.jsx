import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { useRef } from "react"
import './Posts.scss'

function Posts() {

    let [posts, setPosts] = useState([])
    let [comments, setComments] = useState([])

    let [title, setTitle] = useState('')
    let [body, setBody] = useState('')
    let [userId, setuserId] = useState('')

    let name = useRef('')
    let email = useRef('')
    let commentbody = useRef('')
    let postId = useRef('')


    let { id } = useParams()

    useEffect(() => {
        fetch('https://backendsss.herokuapp.com/posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data)
            })
    }, [posts])

    //METHOD POST

    function createPosts(e) {
        e.preventDefault()
        fetch('https://backendsss.herokuapp.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, body, userId
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
        setTitle(e.target.value = null)
        setBody = null
        setuserId = null
    }

    //METHOD DELETE

    function deletePosts(e) {
        e.preventDefault()
        fetch(`https://backendsss.herokuapp.com/posts/${e.target.dataset.id}`, {
            method: 'DELETE'
        })
    }

    //COMMENTS

    useEffect(() => {
        fetch('https://backendsss.herokuapp.com/comments')
            .then(res => res.json())
            .then(data => {
                setComments(data)
            })
    }, [comments])


    //METHOD POST

    function createComments(e) {
        e.preventDefault()
        fetch('https://backendsss.herokuapp.com/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name.current.value,
                email: email.current.value,
                body: commentbody.current.value,
                postid: postId.current.value
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
        name.current.value = null
        email.current.value = null
        commentbody.current.value = null
        postId.current.value = null
    }

    return (
        <>
            <section>
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginTop: 20, marginBottom: 20, fontSize: 30 }} className="posts">POSTS and COMMENTS</h2>
                    <div className="form_div">
                        <div className="create_post">
                            <h2>Create Post</h2>
                            <form className="post_form" onSubmit={createPosts}>
                                <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="title" />
                                <input onChange={(e) => setBody(e.target.value)} type="text" placeholder="body" />
                                <input onChange={(e) => setuserId(e.target.value)} type="text" placeholder="userId" />
                                <button>Click</button>
                            </form>
                        </div>
                        <div className="create_post">
                            <h2>Write Comments</h2>
                            <form className="post_form" onSubmit={createComments}>
                                <input ref={name} type="text" placeholder="name" />
                                <input ref={email} type="text" placeholder="email" />
                                <input ref={commentbody} type="text" placeholder="body" />
                                <input ref={postId} type="text" placeholder="postId" />
                                <button>Click</button>
                            </form>
                        </div>
                    </div>
                    <ul>
                        {
                            posts.filter(post => post.userid === Number(id)).map(post => {

                                return (
                                    <div key={post.id}>
                                        <div className="top_box">
                                            <h3>{`POST ${post.id}`}</h3><button className="deletebtn" onClick={deletePosts} data-id={post.id}>&times;</button>
                                        </div>
                                        <details key={post.id}>
                                            <summary>{post.body}</summary>
                                            <ol>
                                                {
                                                    comments.filter(comment => comment.postid === Number(post.id)).map(c => {
                                                        return (
                                                            <li key={c.id}>{c.body}</li>
                                                        )
                                                    })
                                                }
                                            </ol>
                                        </details>
                                    </div>
                                )
                            })
                        }
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Posts