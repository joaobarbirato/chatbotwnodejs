// node, importa pra mim essas bibliotecas:
var botbuilder = require("botbuilder");
var restify = require("restify");

// servidor web onde o bot vai rodar
var server = restify.createServer();
server.listen(3978, function () { // função anonima
    console.log("%s listening on %s", // escuta na porta e escreve pra mim o nome e o url do server
        server.name, server.url);
});

var connector = new botbuilder.ChatConnector({
    appID: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

server.post("/api/messages", connector.listen());

// inteligencia do bot
var bot = new botbuilder.UniversalBot(connector, function (session) {
    //    hello world mano
    //    session.send("Hello Bot World!");
    //    var receivedText = session.message.text;
    //    session.send("Vc mandou a mensagem %s", receivedText);
    //    var message = new botbuilder.Message(session)
    //        .text("Hello bot World 2");
    //
    //    session.send(message);
    session.beginDialog("showGifs");
});

bot.dialog("showGifs", [
    function (session) {
        botbuilder.Prompt.choice(session, "Oq ce quer hein", "Trending|Search", {} );
    }
]);