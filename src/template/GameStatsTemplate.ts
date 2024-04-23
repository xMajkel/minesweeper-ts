import GameBoard from "../model/Board";
import { formatTime } from "../utility/utility";

interface DOMStats{
    form: HTMLFormElement,
    clear(): void,
    render(size: number, mines: number): void,
    update(board: GameBoard): number
}

export default class StatsTemplate implements DOMStats{

    form: HTMLFormElement;
    stats: HTMLDivElement;
    timer: HTMLSpanElement;
    mines: HTMLSpanElement;
    gameTime: number = 0;

    static instance: StatsTemplate = new StatsTemplate();

    private constructor(
    ){
        const d = document.createElement("div") as HTMLDivElement;
        d.id="stats";
        this.stats = d

        this.form = document.getElementById("menu") as HTMLFormElement;

        this.timer = document.createElement("span") as HTMLSpanElement;
        this.timer.id = "stats-time";
        this.timer.innerText = "00:00";

        this.mines = document.createElement("span") as HTMLSpanElement;
        this.mines.id = "stats-mines";
        this.mines.innerText = "00/00";

        this.gameTime=0;

        const a1 = document.createElement("a") as HTMLAnchorElement;
        a1.id="stats-label";
        a1.innerText = "TIME";
        this.stats.append(a1);
        
        const a2 = document.createElement("a") as HTMLAnchorElement;
        a2.innerText = "MINES";
        a2.id="stats-label";
        this.stats.append(a2);

        this.timer.innerText = "00:00";
        this.stats.append(this.timer);

        this.mines.innerText = "00/00";
        this.stats.append(this.mines);
    }

    render(): void {
        this.clear()
        this.form.append(this.stats);
       
    }

    update(board: GameBoard): number{
        this.gameTime = 0;
        this.timer.innerText = formatTime(this.gameTime++)
        this.mines.innerText = `${board.flagged}/${board.mines}`
        let intervalId = setInterval(() => {
            this.timer.innerText = formatTime(this.gameTime++)
            this.mines.innerText = `${board.flagged}/${board.mines}`
        }, 1000);
        return intervalId
    }

    clear(): void {
        this.form.innerHTML = ""
    }
}