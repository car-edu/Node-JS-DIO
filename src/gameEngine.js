import { rollDice } from "./dice.js";
import { getRandomBlock } from "./blocks.js";
import { getRandomItem } from "./items.js";
import { logRollResult } from "./logger.js";

// Função para lidar com a reta, onde a velocidade é testada
async function handleReta(character1, character2) {
  let diceResult1 = await rollDice();
  let diceResult2 = await rollDice();
  
  let totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
  let totalTestSkill2 = diceResult2 + character2.VELOCIDADE;
  
  await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
  await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
  
  return { totalTestSkill1, totalTestSkill2 };
}

// Função para lidar com a curva, onde a manobrabilidade é testada
async function handleCurva(character1, character2) {
  let diceResult1 = await rollDice();
  let diceResult2 = await rollDice();
  
  let totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
  let totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;
  
  await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
  await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
  
  return { totalTestSkill1, totalTestSkill2 };
}

// Função para lidar com o confronto direto entre os personagens
async function handleConfronto(character1, character2) {
  let diceResult1 = await rollDice();
  let diceResult2 = await rollDice();
  
  let powerResult1 = diceResult1 + character1.PODER;
  let powerResult2 = diceResult2 + character2.PODER;
  
  console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);
  
  await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
  await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

  // Determina o vencedor do confronto
  if (powerResult1 > powerResult2) {
    console.log(`${character1.NOME} venceu o confronto!`);
    await applyItemEffect(character1, character2);
  } else if (powerResult2 > powerResult1) {
    console.log(`${character2.NOME} venceu o confronto!`);
    await applyItemEffect(character2, character1);
  } else {
    console.log("Confronto empatado! Nenhum ponto foi perdido.");
  }
}

// Aplica os efeitos dos itens após um confronto
async function applyItemEffect(winner, loser) {
  let item = await getRandomItem();
  let turbo = Math.random() < 0.5 ? 1 : 0;
  let perda = item === "CASCO" ? 1 : 2;
  
  if (loser.PONTOS > 0) {
    let pontosPerdidos = Math.min(perda, loser.PONTOS);
    console.log(`${loser.NOME} foi atingido por um ${item} e perdeu ${pontosPerdidos} ponto(s)!`);
    loser.PONTOS -= pontosPerdidos;
  }
  
  if (turbo) {
    console.log(`${winner.NOME} recebeu um TURBO! (+1 ponto)`);
    winner.PONTOS++;
  }
}

// Função principal que executa a corrida
export async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);
    let block = await getRandomBlock(); // Obtém um tipo de bloco aleatório
    console.log(`Bloco: ${block}`);

    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    // Chama a função correspondente ao tipo de bloco
    if (block === "RETA") {
      ({ totalTestSkill1, totalTestSkill2 } = await handleReta(character1, character2));
    } else if (block === "CURVA") {
      ({ totalTestSkill1, totalTestSkill2 } = await handleCurva(character1, character2));
    } else {
      await handleConfronto(character1, character2);
    }
    
    // Verifica quem marcou ponto na rodada
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.NOME} marcou um ponto!`);
      character1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.NOME} marcou um ponto!`);
      character2.PONTOS++;
    }

    // Exibe a pontuação atual dos personagens
    console.log(`🔹 ${character1.NOME}: ${character1.PONTOS} pontos`);
    console.log(`🔹 ${character2.NOME}: ${character2.PONTOS} pontos`);
    console.log("---------------------------------------------------");
  }
}
