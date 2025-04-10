/**
 * Função global para tratar e logar erros com segurança.
 * @param error - O erro capturado.
 * @param logger - Instância de logger para registrar o erro.
 * @param contextMessage - Mensagem adicional para fornecer contexto do erro.
 */
export const handleAndLogError = (error: unknown, logger: any, contextMessage = ''): void => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  logger.error(`${contextMessage} - Erro: ${errorMessage}`);
  if (error instanceof Error && error.stack) {
    logger.error(`Stack trace: ${error.stack}`);
  }
};
