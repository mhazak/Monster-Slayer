function randomVal(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
        }
    },
    computed: {
        playerBarStyles() {
            return { width: this.playerHealth + '%' };
        },
        monsterBarStyles() {
            return { width: this.monsterHealth + '%' };
        }
    },
    methods: {
        attackMonster() {
            const damage = randomVal(5, 12);
            this.monsterHealth -= damage;
            this.attackPlayer();
        },
        attackPlayer() {
            const damage = randomVal(8, 15);
            this.playerHealth -= damage;
            console.log({player: this.playerHealth, monster: this.monsterHealth});
        }
    }
});

app.mount('#game');