// Adicione isso no início do arquivo myContent.js
(function() {
    // Verifica se estamos em um ambiente de extensão do navegador
    const isExtensionEnvironment = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id;

    // Define o objeto 'browser' baseado no ambiente
    const browser = isExtensionEnvironment ? (window.browser || window.chrome) : {};

    // Se não estiver em um ambiente de extensão, cria um objeto vazio para evitar erros
    if (!isExtensionEnvironment) {
        window.browser = {};
    }

    // Resto do código original de myContent.js aqui...
    // ...

})();