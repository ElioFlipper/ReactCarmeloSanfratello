import { useEffect, useRef, useState } from "react"

export function Form() {

    const [input, setInput] = useState({
        username: "",
        password: ""
    })

    const [array, setArray] = useState([])
    const [enable, setEnable] = useState(true)

    function handleInputChange(event) {
        const { name, type, value, checked } = event.target
        setInput({
            ...input,
            [name]: type === "checkbox" ? checked : value
        })
    }

    function handleLogin(event) {
        event.preventDefault()
        const prevValues = {
            username: input.username,
            password: input.password
        }
        setArray((datas) => [...datas, prevValues])
        setInput({
            username: "",
            password: ""
        })

    }

    function handleReset(event) {
        event.preventDefault()
        setInput({
            username: "",
            password: ""
        })
        setArray([])
        inputRef.current?.focus()
    }

    function handleDisableButton(event) {
        event.preventDefault()
        setEnable((p) => !p)
    }

    const [darkMode, setDarkMode] = useState(true)

    function handleToggleBlack(event) {
        event.preventDefault()
        setDarkMode((p) => !p)
    }

    const inputRef = useRef(null)
    useEffect(() => {
        inputRef.current?.focus()
    }, [])


    return (
        <div style={{ backgroundColor: darkMode ? "white" : "black" }}>
            <form onSubmit={handleLogin}>
                <button onClick={handleDisableButton}>Disable Input</button>
                <input type="text" name="username" placeholder="Username" value={input.username} onChange={handleInputChange} disabled={!enable} ref={inputRef} />
                <input style={input.password.length > 0 && input.password.length < 12 ? { borderColor: "red" } : {}}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={input.password}
                    onChange={handleInputChange}
                    disabled={input.username.length <= 3} />
                <span style={{ color: "red" }} hidden={input.password.length > 0 && input.password.length > 12}> Il campo password deve avere almeno 12 caratteri</span>
                <button type="submit" disabled={input.username === "" || input.password === ""}>Login</button>
                <button onClick={handleReset} disabled={input.username === "" && input.password === "" }>Reset</button>
            </form>

            <ul>    
                {array.map((el, index) => (
                    <li key={index}>
                        <h3>{el.username}</h3>
                        <h3>{el.password}</h3>
                    </li>
                ))}
            </ul>
            <button onClick={handleToggleBlack}>Dark Mode</button>
        </div>
    )
}