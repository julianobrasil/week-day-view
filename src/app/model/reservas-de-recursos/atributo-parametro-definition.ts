import {AtributoParametroType, TipoDeUnidadeDeMedidaType} from '../geral/definicoes-tipos.type';

export interface AtributoParametroDefinition {
  /** string que identifica o parâmetro no Atributo */
  codigo: string;

  /** string que aparecerá no formulário */
  label: string;

  /** tipo de dados que o parâmetro carregará */
  tipo: AtributoParametroType;

  /** string que descreve exatamente este parâmetro */
  descricao: string;

  /** indica se o tipo de unidade é TEMPO, PESO OU DISTANCIA */
  tipoDeUnidadeMedida: TipoDeUnidadeDeMedidaType;

  /** string que descreve exatamente este parâmetro, porém aceita texto html */
  descricaoHtml?: string;
}
