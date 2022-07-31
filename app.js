function randomVal(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0
        }
    },
    computed: {
        playerBarStyles() {
            return { width: this.playerHealth + '%' };
        },

        monsterBarStyles() {
            return { width: this.monsterHealth + '%' };
        },
        
        specialAttackAvailable() {
            return this.currentRound % 3 !== 0;
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            const damage = randomVal(5, 12);
            this.monsterHealth -= damage;
            this.attackPlayer();
        },
        
        attackPlayer() {
            const damage = randomVal(8, 15);
            this.playerHealth -= damage;
            console.log({player: this.playerHealth, monster: this.monsterHealth});
        },
        
        specialAttackMonster() {
            this.currentRound++;
            const damage = randomVal(10, 25);
            this.monsterHealth -= damage;
            this.attackPlayer();
        }
    }
});

app.mount('#game');