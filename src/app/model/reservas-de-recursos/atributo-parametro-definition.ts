

export interface AtributoParametroDefinition {
  /** string que identifica o parâmetro no Atributo */
  codigo: string;

  /** string que aparecerá no formulário */
  label: string;

  /** tipo de dados que o parâmetro carregará */
  tipo: any;

  /** string que descreve exatamente este parâmetro */
  descricao: string;

  /** indica se o tipo de unidade é TEMPO, PESO OU DISTANCIA */
  tipoDeUnidadeMedida: any;

  /** string que descreve exatamente este parâmetro, porém aceita texto html */
  descricaoHtml?: string;
}
