function randomVal(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            log: []
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
            this.addLogMessage('Player', 'Attack', damage);
            this.attackPlayer();
        },
        
        attackPlayer() {
            const damage = randomVal(8, 15);
            this.playerHealth -= damage;
            this.addLogMessage('Monster', 'Attack', damage);
            this.getResult();
        },
        
        specialAttackMonster() {
            this.currentRound++;
            const damage = randomVal(10, 25);
            this.monsterHealth -= damage;
            this.addLogMessage('Player', 'Special-attack', damage);
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
            this.addLogMessage('Player', 'Heal', heal);
        },

        getResult() {
        
            if (this.playerHealth <= 0 || this.monsterHealth <= 0) {
                if (this.playerHealth <= 0 && this.monsterHealth > 0) {
                    this.winner = 'Monster wins!';
                } else if (this.playerHealth > 0 && this.monsterHealth <= 0) {
                    this.winner = 'You win!';
                } else if (this.playerHealth <= 0 && this.monsterHealth <= 0) {
                    this.winner = 'Tie!';
                }
            }
        },

        reset() {
            this.winner = null;
            this.currentRound = 0;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },

        surrender() {
            this.winner = 'Monster wins!';
        },

        addLogMessage(who, action, value) {
            this.log.unshift({
                attacker: who,
                action: action,
                value: value
            });
        }
    }
});

app.mount('#game');