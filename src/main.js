import wasm from 'wasm';
import './app.css';
import App from './App.svelte';
const init = async () => {
    const startTime = performance.now();
    await wasm();
    const endTime = performance.now();
    console.log(`Call to wasm init took ${endTime - startTime} milliseconds`);
    return new App({
        target: document.getElementById('app')
    });
};
export default init();
//# sourceMappingURL=main.js.map