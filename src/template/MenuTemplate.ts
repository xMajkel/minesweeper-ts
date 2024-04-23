interface DOMMenu{
    form: HTMLFormElement,
    clear(): void,
    render(size: number, mines: number): void,
}

export default class MenuTemplate implements DOMMenu{

    form: HTMLFormElement;

    static instance: MenuTemplate = new MenuTemplate();

    private constructor(
    ){
        this.form = document.getElementById("menu") as HTMLFormElement
    }

    render(size: number, mines: number): void {
        this.clear()

        const l1 = document.createElement("label") as HTMLLabelElement;
        l1.htmlFor = "menu-size";
        l1.innerText = "Size: ";
        this.form.append(l1);

        const sizeInput = document.createElement("input") as HTMLInputElement;
        sizeInput.type = "number";
        sizeInput.name = "size";
        sizeInput.id = "menu-size";
        sizeInput.value = size.toString();
        this.form.append(sizeInput);

        const l2 = document.createElement("label") as HTMLLabelElement;
        l2.htmlFor = "menu-mines";
        l2.innerText = "Mines: ";
        this.form.append(l2);

        const minesInput = document.createElement("input") as HTMLInputElement;
        minesInput.type = "number";
        minesInput.name = "mines";
        minesInput.id = "menu-mines";
        minesInput.value = mines.toString();
        this.form.append(minesInput);

        const inputSubmit = document.createElement("input") as HTMLInputElement;
        inputSubmit.type = "submit";
        inputSubmit.value = "START"
        this.form.append(inputSubmit);
    }

    clear(): void {
        this.form.innerHTML = ""
    }
}