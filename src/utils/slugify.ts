// Função para criar slug amigável para URL a partir do título do produto
export function createProductSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .trim()
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens múltiplos
    .replace(/^-|-$/g, '') // Remove hífens do início e fim
}

// Função slugify para compatibilidade com importações existentes
export function slugify(text: string): string {
  return createProductSlug(text);
}
