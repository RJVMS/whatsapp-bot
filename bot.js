// Importa as dependências necessárias
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Cria o cliente do WhatsApp com autenticação local
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,  // Roda sem interface gráfica
        args: ['--no-sandbox', '--disable-setuid-sandbox']  // Argumentos para garantir que o Puppeteer funcione corretamente em alguns servidores
    }
});

// Gera o QR Code para login
client.on('qr', (qr) => {
    console.log('Escaneie este QR Code no WhatsApp Web:');
    qrcode.generate(qr, { small: true });  // Exibe o QR code no terminal
});

// Quando o bot estiver pronto
client.on('ready', () => {
    console.log('Bot está pronto para usar!');
});

// Recebe uma mensagem e responde com uma saudação
client.on('message', message => {
    if (message.body === 'Oi') {
        message.reply('Olá! Como posso ajudar?');
    }
});

// Inicializa o cliente
client.initialize();
