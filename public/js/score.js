//alert(games);

let root = document.getElementById('app');

class Board{
    constructor(root){
        this.root = root;
        this.game_list = JSON.parse(game_list);
        this.games = this.game_list;
        this.debug_title = 'Debugger';
        this.debug = '';
        this.show_debug = false;
        this.admin = false;
        this.status = [];
        this.template = '';
        this.mount();
    }
    mount() {
        //alert('Mount: ' + JSON.stringify(this.game_list));
        this.debug_title = 'Game List JSON';
        this.debug = JSON.stringify(this.game_list);
        //this.loadJson();
        //this.root.innerHTML = '<h2>Test</h2>';
        this.update();
    }
    update(){
        //let temp = this.template;
        let games = this.games;
        //alert(games[1].name);
        let me = this;
        let temp = `
            <div class="container">
                <div class="row">
                    
                </div>
                <div class="row">
                    <div class="board-cont">
                        <!-- Score Board --> `;
        games.forEach(function(game){
            temp += `
                        <div class="scoreboard">
                            <div class="row top">
                                <h4 class="score-title"> ${game.name}</h4>
                            </div>
                            <div class="players row">
                                <div class="player">
                                    <div class="player__icon">
                                        <span class="fas fa-crown fa-2x"></span>
                                    </div>
                                    <div class="player__date">
                                        <span class="date-cont"> ${new Date(game.highestScoreEver.date).toLocaleDateString()}</span>
                                    </div>
                                    <div class="player__name">
                                        ${game.highestScoreEver.name}
                                    </div>
                                    <div class="player__total">
                                        ${game.highestScoreEver.score}
                                    </div>
                                </div>
                                <div class="player loser">
                                    <div class="player__icon">
                                        <span class="fas fa-thumbs-down fa-2x"></span>
                                    </div>
                                    <div class="player__date">
                                        ${new Date(game.lowestScoreEver.date).toLocaleDateString()}
                                    </div>
                                    <div class="player__name">
                                        ${game.lowestScoreEver.name}
                                    </div>
                                    <div class="player__total">
                                        ${game.lowestScoreEver.score}
                                    </div>
                                </div> 
                            </div>
                            <div class="row bottom">            
                                <div class="note col-md-12">
                                    ${game.description}
                                </div>
                            </div>
                        </div>
                    `;
        });
           
        temp += `  </div>
                </div>`;
        if(me.show_debug == true){
            temp += `
                <div class="row">
                    <div class="debug">
                        <h3>Debugger: ${me.debug_title}</h3>
                        <textarea class="form-control">${JSON.stringify(me.debug)}</textarea>
                    </div>
                </div>
            `;
        }
               
        temp += `</div>`;
                      
        this.root.innerHTML = temp;
        this.setHandlers('.expand-card');
        
        /*document.addEventListener('change', function(){
            let chk = event.target;
            if(me.admin == 'checked'){
                me.admin = '';
            }
            else{
                me.admin = 'checked';
            }
            me.update();
        });*/
    }
    checkAdmin(ele, player){
        let str = '';
        if(this.admin == true){
            switch(ele){
                case 'actions':
                    str = `<div class="player__actions">
                                <a data-id="${player.name}" class="fas fa-times delete-player"></a>
                            </div>`;
                    break;
            }

        }
        
        return str;
    }
    setHandlers(els){
        let me = this;
        let ctrls = root.querySelectorAll(els);
        ctrls.forEach(function(ctrl){
            ctrl.addEventListener('click', function(event){
                me.showGameBoard(event);
            });
        });

    }
    loadOptions(list, selected){
        let options = '';
        list.forEach(function(option){
            if(option == selected){
                options += `<option selected value="${option}">${option.charAt(0).toUpperCase() + option.slice(1)}</option>`;
            }
            else{
                options += `<option value="${option}">${option.charAt(0).toUpperCase() + option.slice(1)}</option>`;
            }
            
        });
        return options;
    }
    loadJson(){
        let list = this.game_list;
        let me = this;
        let games = this.games;
        let status = this.status;
        
        let people = [];
        list.forEach(function(item){
            let game = item;
            // Generate random date
           
            
           /* let rand = me.genRandomInt(20);
            if(rand == 0){
                rand += 2;
            }
            else if(rand == 1){
                rand += 1;
            }
            for(let i = 0; i < rand; i++){
                let person = {};
                person.date = new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).toLocaleDateString();
                person.name = me.fetchName();
                person.score = me.genRandomInt(200);
                game.players.push(person);
            }
            
            // sort by value
            game.players.sort(function (a, b) {
                return b.score - a.score;
            });
            games.push(game);
            */
        });
        this.debug = JSON.stringify(this.games);
    }
    createHandler(game){

    }
    genRandomInt(max) {
        return Math.floor(Math.random() * max) + 1;
    }
    showGameBoard(){
        //alert('hello');
        event.preventDefault();
        
        let lnk = event.target;
        let players = lnk.closest('.scoreboard');
        if(lnk.classList.contains('fa-chevron-down')){
            lnk.classList.remove('fa-chevron-down');
            lnk.classList.add('fa-chevron-up');
            let hiden = players.querySelectorAll('.player.hide');
            hiden.forEach(function(player){
                player.classList.remove('hide');
            });
        }
        else{
            lnk.classList.remove('fa-chevron-up');
            lnk.classList.add('fa-chevron-down');
            let hiden = players.querySelectorAll('.player.middle');
            hiden.forEach(function(player){
                player.classList.add('hide');
            });
        }  
    }
    fetchName() {
        let first_names = ['Berthefried', 'Tatiana', 'Hildeburg', 'Jennifer', 'Amy', 'Tina', 'Robin', 'Sherry', 'Jessica', 'Betty','Bilbo', 'Frodo', 'Theodulph', 'Carter', 'James', 'Alejo', 'Aaron', 'Hunter', 'Matt', 'John'];
        let last_names = ['Baggins', 'Lightfoot', 'Boulderhill', 'Smith', 'Johnson', 'Billings', 'Jackson', 'Swanson', 'Miller', 'Clemment', 'Carlson', 'Ingrahm', 'Turley', 'Limbaugh', 'Stombaugh', 'Strait', 'Lancaster', 'Dunkle', 'Hoffman', 'Lee'];
        let rand_1 = this.genRandomInt(20);
        let rand_2 = this.genRandomInt(20);
        let name = first_names[rand_1] + ' ' + last_names[rand_2];
          
        return name;
    }
}

  const app = new Board(root);

 