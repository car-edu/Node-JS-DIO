// Função para obter um bloco aleatório de "RETA", "CURVA" ou "CONFRONTO"
export async function getRandomBlock() {
    let random = Math.random(); // Gera um número aleatório entre 0 e 1
    
    // Se o número aleatório for menor que 0.33, retorna "RETA"
    if (random < 0.33) return "RETA";
    
    // Se o número aleatório for menor que 0.66, retorna "CURVA"
    if (random < 0.66) return "CURVA";
    
    // Caso contrário, retorna "CONFRONTO"
    return "CONFRONTO";
}
