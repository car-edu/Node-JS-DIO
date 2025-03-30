// Função para retornar um item aleatório, que pode ser "CASCO" ou "BOMBA"
export async function getRandomItem() {
    // Gera um número aleatório entre 0 e 1. Se for menor que 0.5, retorna "CASCO", caso contrário, retorna "BOMBA"
    return Math.random() < 0.5 ? "CASCO" : "BOMBA";
}
