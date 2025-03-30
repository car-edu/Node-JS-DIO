// Função para rolar um dado de 6 lados e retornar um valor aleatório entre 1 e 6
export async function rollDice() {
    // Gera um número aleatório entre 0 e 1, multiplica por 6 (para o intervalo de 0 a 5), arredonda para baixo e adiciona 1
    return Math.floor(Math.random() * 6) + 1;
}
