
class ActiveUserManager {
    constructor(ttl=36) {
        this.userPool = [];
        this.ttl = ttl; //time to stay logged in, default is 1 hour aka 3600seconds
        // setInterval(this.updatedUserPool, ttl);
        // this.interval = setInterval(function() {
        //     console.log("test interval");
        // }, 100);
    }

    addUser(name) {
        this.userPool.add({name : name, ttl : ttl})
    }

    removeUser(name) {
        for(i = 0; i < this.userPool.length; i++) {
            if (this.userPool[i].name === name) {
                this.userPool.splice(i, 1);
                break;
            }
        }
    }
    
    updateUserPool() {
        console.log("updating user pool");
        console.log(this.userPool);
        let updatedUserPool = [];
        this.userPool.forEach((user, i) => {
            if (user.ttl > 0) {
                updatedUserPool.add(user)
            }
        });
        this.userPool = updatedUserPool;
    }

    startUpdating() {
        setInterval(this.updateUserPool, this.ttl)
    }
}

module.exports = {ActiveUserManager}