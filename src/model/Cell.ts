const colors = ["blue", "green", "yellow", "magenta", "red", "cyan", "black", "gray"];

export default class BoardCell {

    private _position: [number, number];
    private _isFlagged: boolean = false;
    private _isRevealed: boolean = false;
    private _htmlElement: HTMLTableCellElement;
    private _neighbouringMines: number;
    leftClick: (position: [number, number],flags: number) => void;
    rightClick: (positon: [number,number],flags: number) => void;

    constructor(
        position: [number, number],
        htmlElement: HTMLTableCellElement,
        neighbouringMines: number,
        callbackLeftClick: (position: [number, number],flags: number) => void,
        callbackRightClick: (positon: [number,number],flags: number) => void,
    ) {
        this._position = position;
        this._htmlElement = htmlElement;
        this._neighbouringMines = neighbouringMines;
        this.leftClick = callbackLeftClick;
        this.rightClick = callbackRightClick;

        this._htmlElement.addEventListener("click", () => {
            this.reveal()
        })
        this._htmlElement.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            if (!this._isRevealed) {
                this._htmlElement.innerHTML = this._isFlagged ? "" : "🚩";
                this.rightClick(this.position,(this._isFlagged?-1:1));
                this._isFlagged = !this._isFlagged
            }else{
                this.rightClick(this.position,0);
            }
        }
        );
    }

    public reveal(): void {
        if (this._isRevealed) return;

        if (this._neighbouringMines === -1) {
            this.showAsBomb()
        } else {
            if (this._neighbouringMines === 0) {
                this._htmlElement.innerHTML = " ";
            } else {
                this._htmlElement.innerHTML = this._neighbouringMines.toString();
                this._htmlElement.style.color = colors[this._neighbouringMines-1];
            }
            this._htmlElement.className = "cell-revealed";

        }
        this._isRevealed = true;
        const f = (this._isFlagged?-1:0)
        this._isFlagged = false;
        this.leftClick(this._position,f);
    }

    public showAsBomb(): void{
        this._htmlElement.innerHTML = "💣";
        this._htmlElement.className = "cell-red";
    }

    get position(): [number, number] {
        return this._position;
    }

    get neighbouringMines(): number {
        return this._neighbouringMines;
    }

    get isRevealed(): boolean {
        return this._isRevealed;
    }

    get isFlagged(): boolean{
        return this._isFlagged;
    }
}