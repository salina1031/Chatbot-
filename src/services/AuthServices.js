const usersKey = "users"
const currentUserKey = "currentUser"

const AuthServices = {
    // naya user banauxa
    signup: (name, email, password) => {
        // localStorage bata users liyauxa, khali xa bhane []
        const users = JSON.parse(localStorage.getItem(usersKey)) || []

        // email already xa ki check
        const existingUser = users.find((user) => user.email === email)
        if (existingUser) {
            throw new Error("Email already exist!")
        }

        // naya user object banauxa
        const newUser = {
            id: Date.now().toString(), // unique id
            name,
            email,
            password,
            createdAt: new Date().toString()
        }

        // array ma add garera save garxa
        users.push(newUser)
        localStorage.setItem(usersKey, JSON.stringify(users))

        // password hatayera save garxa
        const userWithoutPassword = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
        }
        localStorage.setItem(currentUserKey, JSON.stringify(userWithoutPassword))

        return userWithoutPassword
    },

    // user verify garxa
    login: (email, password) => {
        // localStorage bata users liyauxa
        const users = JSON.parse(localStorage.getItem(usersKey)) || []

        // email + password match garxa
        const user = users.find((u) => u.email === email && u.password === password)
        if (!user) throw new Error("Invalid email or password")

        // password hatayera save garxa
        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
        }
        localStorage.setItem(currentUserKey, JSON.stringify(userWithoutPassword))

        return userWithoutPassword
    },

    // user hatauxa
    logout: () => localStorage.removeItem(currentUserKey),

    // aile logged in user liyauxa
    getCurrentUser: () => JSON.parse(localStorage.getItem(currentUserKey)) || null,

}

export default AuthServices
