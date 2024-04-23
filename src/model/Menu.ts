import StatsTemplate from "../template/GameStatsTemplate";
import MenuTemplate from "../template/MenuTemplate";
import GameBoard from "./Board";

export default class Menu {

    static instance: Menu = new Menu();
    private gameBoard: GameBoard = new GameBoard(0,0,(): void =>{})
    private statsInterval: number = 0;
    private mines: number = 10;
    private size: number = 10;

    constructor(){}

    start = (): void =>{
        MenuTemplate.instance.form.addEventListener("submit", (event: SubmitEvent): void => {
            event.preventDefault();
    
            const menuSize = document.getElementById("menu-size") as HTMLInputElement;
            this.size = parseInt(menuSize.value);
            if (this.size <= 0) return;
    
            const menuMines = document.getElementById("menu-mines") as HTMLInputElement;
            this.mines = parseInt(menuMines.value);
            if (this.mines < 0) return;
            if (this.mines > this.size * this.size) return;
    
            MenuTemplate.instance.clear();
    
            const callback = (won: boolean) => this.finishGame(won);
    
            this.gameBoard = new GameBoard(this.mines, this.size, callback);
            this.gameBoard.generate();
    
            StatsTemplate.instance.render();
            this.statsInterval = StatsTemplate.instance.update(this.gameBoard);
        })

        MenuTemplate.instance.render(this.size,this.mines);
    }

    finishGame = (won: boolean): void => {
        clearInterval(this.statsInterval);
    
        const summary = document.getElementById("summary") as HTMLDivElement;
        const board = document.getElementById("board") as HTMLElement;
    
        summary.style.width = board.offsetWidth + "px";
        summary.style.height = board.offsetHeight + "px";
    
        summary.innerHTML="";
    
        const h1 = document.createElement("h1") as HTMLElement;
        h1.innerText = won ? "YOU WIN" : "YOU LOOSE";
        summary.appendChild(h1);
    
        const restart = document.createElement("input") as HTMLInputElement;
        restart.type = "submit";
        restart.value = "RESTART";
    
        this.gameBoard.boardCells.forEach(row => {
            row.forEach(cell => {
                if(cell.neighbouringMines === -1){
                    cell.showAsBomb();
                }
            })
        });
    
        restart.addEventListener("click", () => {
            summary.innerHTML = "";
            summary.style.width = "0px";
            summary.style.height = "0px";
            MenuTemplate.instance.render(this.size, this.mines);
            this.gameBoard.clear();
        })
    
        summary.appendChild(restart);
    }



}