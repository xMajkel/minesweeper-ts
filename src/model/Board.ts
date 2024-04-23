import * as utility from "../utility/utility";
import BoardCell from "./Cell";

export default class GameBoard{

    private _revealed: number = 0;
    private _flagged: number = 0;
    private board: HTMLTableElement;
    private minesPositions: Set<string> = new Set<string>();
    public boardCells: BoardCell[][] = [];
    endGame: (won: boolean) => void;

    constructor(
        public mines: number,
        public size: number,
        endGame: (won: boolean) => void,
    ) {
        const board = document.getElementById("board") as HTMLTableElement | null

        if (board === null) {
            throw new Error("No board in the DOM")
        }
        this.board = board;
        this.endGame = endGame;
    }

    public rightClicked(position: [number, number], flags: number): void {
        this._flagged += flags;

        if (flags !== 0) {
            return
        }

        let cell = this.boardCells[position[0]][position[1]];

        let possiblePositions = utility.surroundingPostions(cell.position[0], cell.position[1],this.size)
        possiblePositions.forEach(position => {
            const cell = this.boardCells[position[0]][position[1]]
            if (!cell.isFlagged) {
                cell.reveal();
            }
        });
    }

    public reveal(position: [number, number]): void {
        let cell = this.boardCells[position[0]][position[1]];

        if (cell.neighbouringMines === -1) {
            this.endGame(false);
            return
        }

        if (++this._revealed >= (this.size * this.size - this.mines)) {
            this.endGame(true);
            return
        }

        if (cell.neighbouringMines !== 0 || cell.isFlagged) {
            return;
        }

        let possiblePositions = utility.surroundingPostions(cell.position[0], cell.position[1],this.size)
        possiblePositions.forEach(position => {
            if (!this.boardCells[position[0]][position[1]].isFlagged) {
                this.boardCells[position[0]][position[1]].reveal();
            }
        });
    }

    public generate(): void {
        this.clear()

        this.boardCells = [];

        this.layMines()

        for (let i = 0; i < this.size; i++) {
            const row = this.board.appendChild(document.createElement("tr"))
            this.boardCells[i] = [];
            for (let j = 0; j < this.size; j++) {
                let neighbouringMines = 0;

                if (this.minesPositions.has([i, j].join(","))) {
                    neighbouringMines = -1;
                } else {
                    neighbouringMines = this.countMines(i, j)
                }

                const cell = document.createElement("td")
                cell.className = "cell"
                row.appendChild(cell)

                const callback = (position: [number, number]) => this.reveal(position);
                const rightClick = (position: [number, number], flags: number) => this.rightClicked(position, flags)
                const boardCell = new BoardCell([i, j], cell, neighbouringMines, callback, rightClick)

                this.boardCells[i][j] = boardCell
            }
        }
    }

    private layMines() {
        this.minesPositions = new Set<string>;
        while (this.minesPositions.size < this.mines) {
            const i = utility.randomInt(0, this.size - 1)
            const j = utility.randomInt(0, this.size - 1)

            this.minesPositions.add([i, j].join(","))
        }
    }

    private countMines(x: number, y: number): number {
        let mineCount = 0;
        const possiblePositions = utility.surroundingPostions(x, y,this.size);
        possiblePositions.forEach(position => {
            if (this.minesPositions.has(position.join(","))) mineCount++
        });
        return mineCount;
    }

    public clear(): void {
        this.board.innerHTML = ""
    }

    get flagged(){
        return this._flagged;
    }
}