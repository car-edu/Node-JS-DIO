// Importando os módulos necessários
import { player1, player2, player3, player4, player5, player6 } from "./players.js";  // Importa os jogadores
import { playRaceEngine } from "./gameEngine.js";  // Importa a função que executa o motor da corrida
import { declareWinner } from "./gameResult.js";  // Importa a função que declara o vencedor da corrida

// Lista de jogadores
const players = [player1, player2, player3, player4, player5, player6];

// Função para sortear dois jogadores aleatórios
function getRandomPlayers(players) {
    let shuffled = [...players].sort(() => Math.random() - 0.5); // Embaralha a lista de jogadores
    return [shuffled[0], shuffled[1]]; // Retorna os dois primeiros jogadores da lista embaralhada
}

// Função principal que executa o jogo
(async function main() {
    // Sorteia dois jogadores aleatórios da lista
    const [competitor1, competitor2] = getRandomPlayers(players);

    // Informa no console qual é a corrida que está começando
    console.log(`🏁🚨 Corrida entre ${competitor1.NOME} e ${competitor2.NOME} começando...\n`);

    // Executa a corrida entre os dois competidores
    await playRaceEngine(competitor1, competitor2);

    // Declara o vencedor da corrida
    await declareWinner(competitor1, competitor2);
})();
