function Login(props: any) {
    const user = {
        username: "",
        email: "",
    };
    const setUserName = (e: any) => {
        user.username = e.target.value;
    };
    const setEmail = (e: any) => {
        user.email = e.target.value;
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.handleLogin(user);
    };
    return (
        <section>
            <h2>Login section</h2>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" onChange={setUserName} />
                </fieldset>
                <fieldset>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={setEmail} />
                </fieldset>
                <button>Login</button>
            </form>
        </section>
    );
}

export default Login;
