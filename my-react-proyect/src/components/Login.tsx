function Login(props:any) {
    const user = {
        username: "Adrian",
        email: "adrian@email.com"
    }
    const handleClick = () => {
        props.handleLogin(user)
    }
  return (
    <section>
        <h2>Login section</h2>
        <button onClick={handleClick}>Login</button>
    </section>
  )
}

export default Login