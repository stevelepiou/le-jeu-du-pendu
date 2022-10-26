class Pendu{

    constructor({parent_element,listeMots}) {
        this.parentElement = parent_element;
        this.listeMots = listeMots;
        this.tentatives = 0;
        this.erreurs = 0;
        this.lettreAtrouvee = 0;
        this.motAleatoire ;
        this.lettreMasquee;
        this.init();
    }

    init() {
        this.motAleatoire = this.getRandomword(this.listeMots);
        console.log(this.motAleatoire);
        
        const motSection = document.createElement('section')
        motSection.id = 'motAtrouver';

        motSection.innerHTML = `
        <figure>
            <img src="./assets/img/debut.png" alt='début du pendu'>
            <figcaption>
                Nombre de lettre à trouver : ${this.motAleatoire.length}<hr>Lettres trouvées : ${this.lettreAtrouvee}<hr>tentatives : ${this.tentatives}<hr>Erreurs : ${this.erreurs}/5
            </figcaption>
        </figure>
        `;

        const sectionlettres = document.createElement('section');
        sectionlettres.id = 'lesLettres';

        this.generateLetterButtons(sectionlettres);

        this.parentElement.appendChild(motSection);
        this.parentElement.appendChild(sectionlettres);

        this.lettreMasquee = this.displayLettreMasquee(this.motAleatoire);
        console.log(this.lettreMasquee);
    }

    getRandomword(array) {

        for(let i=array.length - 1;i>0;i--){
            const j = Math.floor(Math.random()*(i+1));
            [array[i], array[j]] = [array[j],array[i]];
        }
        return array[0];

    }

    generateLetterButtons(sectionlettres){
        const ulSection = document.createElement('ul');

        const lettres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').forEach (lettre => {
            
            const liSection = document.createElement('li');
            liSection.textContent = lettre;

            liSection.addEventListener('click', () => this.checkIfLetterIsInTheWord(event), {once: true});

            ulSection.appendChild(liSection);
        });

        sectionlettres.appendChild(ulSection);
    }

    displayLettreMasquee(){
        const motCache = this.motAleatoire.slice().replace(/[A-Z]/g, '_');
        const paragraphElement =document.createElement('p');

        paragraphElement.textContent = motCache;

        document.body.querySelector('section[id="lesLettres"]').appendChild(paragraphElement);

        return motCache.split('');


    }

    checkIfLetterIsInTheWord(event) {
        this.attemps++;

        const selectionLettre = event.target.textContent

        if(this.motAleatoire.includes(selectionLettre)){

            event.target.classList.add('good');
            this.motAleatoire.split('').forEach((lettre, index) => {

                if(lettre === selectionLettre){
                    this.lettreAtrouvee++;
                    this.lettreMasquee[index]=selectionLettre;
                }
            });

            document.body.querySelector('section[id="lesLettres"] > p').textContent = this.lettreMasquee.join('');

        }else{
            this.erreurs++;
            event.target.classList.add('wrong');
            document.body.querySelector('img').src = `./assets/img/erreur${this.erreurs}.png`;
            
        }
        document.body.querySelector('figcaption').innerHTML=`Nombre de lettre à trouver : ${this.motAleatoire.length}<hr>Lettres trouvées : ${this.lettreAtrouvee}<hr>tentatives : ${this.tentatives}<hr>Erreurs : ${this.erreurs}/5`

        this.checkGgorLoose();
    }

    checkGgorLoose(){
        const paragraphMot = document.body.querySelector('section[id=lesLettres] >p');

        if(this.erreurs === 5){
            this.gameOver(paragraphMot);
            paragraphMot.classList.add('loser');
            paragraphMot.textContent = this.motAleatoire;

        }

        if(this.lettreAtrouvee === this.motAleatoire.length){
            this.gameOver(paragraphMot);
            paragraphMot.classList.add('winner')
        }

    }

    gameOver(paragraphMot) {
        paragraphMot.classList.add('gameover');
        
        document.body.querySelectorAll('li').forEach(lettre => lettre.className = 'disable');

        const button_element = document.createElement('button');
        button_element.textContent ="Relancer le jeu";

        button_element.addEventListener('click',() => window.location.reload(false));

        document.body.querySelector('section[id="lesLettres"]').appendChild(button_element);
    }

}