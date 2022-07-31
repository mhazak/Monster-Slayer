function randomVal(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null
        }
    },
    computed: {
        playerBarStyles() {
            if (this.playerHealth < 0)
                return { width: '0%' };
            return { width: this.playerHealth + '%' };
        },

        monsterBarStyles() {
            if (this.monsterHealth < 0)
                return { width: '0%' };
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
            this.getResult();
        },
        
        specialAttackMonster() {
            this.currentRound++;
            const damage = randomVal(10, 25);
            this.monsterHealth -= damage;
            this.attackPlayer();
        },

        healPlayer() {
            this.currentRound++;
            const heal = randomVal(8, 20);
            if (this.playerHealth + heal > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += heal;
            }
            this.attackPlayer();
        },

        getResult() {
        
            if (this.playerHealth <= 0 || this.monsterHealth <= 0) {
                if (this.playerHealth <= 0 && this.monsterHealth > 0) {
                    this.winner = 'Monster wins!';
                } else if (this.playerHealth > 0 && this.monsterHealth <= 0) {
                    this.winner = 'Player wins!';
                } else if (this.playerHealth <= 0 && this.monsterHealth <= 0) {
                    this.winner = 'Tie!';
                }
                gameRunning = false;
                // this.reset();
            }
        },

        reset() {
            gameRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        }
    }
});

app.mount('#game');