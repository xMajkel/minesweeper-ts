import './css/style.css';
import Menu from './model/Menu';

const initApp = (): void => {
    Menu.instance.start()
}

document.addEventListener("DOMContentLoaded", initApp)