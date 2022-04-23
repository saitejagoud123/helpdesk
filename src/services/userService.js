import Roles from './../models/Roles';
export default class UserService {
    #currentUser = {};
    constructor() {
        if (UserService._instance) {
            return UserService._instance
        }
        this.#currentUser = this.#users[0];
        UserService._instance = this;
    }

    #roles = [
        {
            roleId: 1,
            roleName: Roles.Admin
        },
        {
            roleId: 2,
            roleName: Roles.User
        }
    ];
    #users = [
        {
            userId: 1,
            name: 'Sai Teja',
            roles: [1, 2]
        },
        {
            userId: 2,
            name: 'Sri Hari',
            roles: [2]
        },
        {
            userId: 3,
            name: 'Rocky',
            roles: [1]
        }
    ];

    setCurrentUser(userId) {
        this.#currentUser = this.#users.find(x => x.userId == userId);
        return { ...this.#currentUser };
    }
    getUser(userId) {
        let user = this.#users.find(x => x.userId == userId);
        return { ...(user || {}) };
    }
    getCurrentUser() {
        return { ...this.#currentUser };
    }
    getUsers() {
        return [...this.#users];
    }
    getRoles() {
        return [...this.#roles];
    }

    isAdmin = (userId) => {
        let user = this.#users.find(x => x.userId == userId);
        return user.roles.some(x => x == 1);
    }
    
    isUser = (userId) => {
        let user = this.#users.find(x => x.userId == userId);
        return user.roles.some(x => x == 2);
    }

}