// Função para registrar o resultado do lançamento do dado
export async function logRollResult(characterName, block, diceResult, attribute) {
    // Exibe no console o resultado do dado, incluindo o nome do personagem, o tipo de bloco, o valor do dado,
    // o valor do atributo, e o total (soma do dado e do atributo)
    console.log(
      `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
        diceResult + attribute
      }`
    );
}
