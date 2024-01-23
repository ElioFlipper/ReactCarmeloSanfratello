import { useState } from "react"

export function Form() {

    const [input, setInput] = useState({
        username: "",
        password: ""
    })

    const [array, setArray] = useState([])

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

    }

    function handleReset(event) {
        event.preventDefault()
        setInput({
            username: "",
            password: ""
        })
    }


    return (
        <div>
            <form>
                <input type="text" name="username" placeholder="Username" value={input.username} onChange={handleInputChange} />
                <input type="password" name="password" placeholder="Password" value={input.password} onChange={handleInputChange} />
                <button onClick={handleLogin}>Login</button>
                <button onClick={handleReset}>Reset</button>
            </form>

            <ul>
                {array.map((el, index) => (
                    <li key={index}>
                        <h3>{el.username}</h3>
                        <h3>{el.password}</h3>
                    </li>
                ))}
            </ul>
        </div>
    )
}