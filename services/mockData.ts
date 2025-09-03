import { BubbleChartData } from '../types';

export const formatNumberBR = (num: number, options?: Intl.NumberFormatOptions): string => {
  const defaultOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  };
  return new Intl.NumberFormat('pt-BR', defaultOptions).format(num);
};

// ===================================================================================
// CENTRALIZED INDICATOR DATA
// ===================================================================================

export const indicatorOptions = [
    '% Positivação', 'Carteira', 'Cidades com Vendas', 'Distribuidores', 'Drop Size (Und)',
    'Penetração Categorias', 'Penetração Marcas', 'Positivação', 'Preço Médio (Cx)',
    'Preço Médio (Ton)', 'Preço Médio (Und)', 'Qtde. Categorias', 'Qtde. Marcas', 'Qtde. SKUs',
    'Sell-through (R$)', 'Sell-through (Cx)', 'Sell-through (Ton)', 'Sell-through (Und)',
    'Sell-through offline', 'Sell-through online', 'Ticket Médio (PDV)',
    'Sell-in', 'Estoque', 'Dias de Estoque', 'Preço médio sell-in', 'Preço médio sell-through',
    'Média Mark-up', 'Ruptura', 'Superestoque', 'Oportunidade R$', 'Aderência MSL', 'Aderência Preço'
];

export const allIndicatorsData: { [key: string]: { title: string; value: string; change?: string; changeType?: 'positive' | 'negative' | 'neutral'; tooltip: string; } } = {
    '% Positivação': { title: '% Positivação', value: '85.4%', change: '+1.2%', changeType: 'positive', tooltip: 'Percentual de PDVs que compraram no período.' },
    'Carteira': { title: 'Carteira', value: '24.127', change: '+190', changeType: 'positive', tooltip: 'Tamanho total da carteira de clientes ativos.' },
    'Cidades com Vendas': { title: 'Cidades com Vendas', value: '1.250', change: '+30', changeType: 'positive', tooltip: 'Número de cidades distintas com pelo menos uma venda.' },
    'Distribuidores': { title: 'Distribuidores', value: '1.849', change: '+25%', changeType: 'positive', tooltip: 'Quantidade de distribuidores ativos no período.' },
    'Drop Size (Und)': { title: 'Drop Size (Und)', value: '15.8', change: '-5%', changeType: 'negative', tooltip: 'Média de unidades por entrega.' },
    'Penetração Categorias': { title: 'Penetração Categorias', value: '4/11', change: '+1', changeType: 'positive', tooltip: 'Média de categorias de produtos compradas por PDV.' },
    'Penetração Marcas': { title: 'Penetração Marcas', value: '3/5', change: '+2%', changeType: 'positive', tooltip: 'Média de marcas compradas por PDV.' },
    'Positivação': { title: 'Positivação', value: '1.84Bi', change: '+15%', changeType: 'positive', tooltip: 'Quantidade de PDVs comprando no período.' },
    'Preço Médio (Cx)': { title: 'Preço Médio (Cx)', value: 'R$ 85,50', change: '+3%', changeType: 'positive', tooltip: 'Preço médio de venda por caixa.' },
    'Preço Médio (Ton)': { title: 'Preço Médio (Ton)', value: 'R$ 5.2k', change: '+2.5%', changeType: 'positive', tooltip: 'Preço médio de venda por tonelada.' },
    'Preço Médio (Und)': { title: 'Preço Médio (Und)', value: 'R$ 7,12', change: '+1.5%', changeType: 'positive', tooltip: 'Preço médio de venda por unidade.' },
    'Qtde. Categorias': { title: 'Qtde. Categorias', value: '11', tooltip: 'Número total de categorias de produtos disponíveis.' },
    'Qtde. Marcas': { title: 'Qtde. Marcas', value: '5', tooltip: 'Número total de marcas disponíveis.' },
    'Qtde. SKUs': { title: 'Qtde. SKUs', value: '22', tooltip: 'Número total de SKUs disponíveis.' },
    'Sell-through (R$)': { title: 'Sell-through (R$)', value: '1.56Bi', change: '-2%', changeType: 'negative', tooltip: 'Valor financeiro total vendido no período.' },
    'Sell-through (Cx)': { title: 'Sell-through (Cx)', value: '1.2M', change: '+8%', changeType: 'positive', tooltip: 'Total de caixas vendidas no período.' },
    'Sell-through (Ton)': { title: 'Sell-through (Ton)', value: '300k', change: '+5%', changeType: 'positive', tooltip: 'Total de toneladas vendidas no período.' },
    'Sell-through (Und)': { title: 'Sell-through (Und)', value: '15.2M', change: '+10%', changeType: 'positive', tooltip: 'Total de unidades vendidas no período.' },
    'Sell-through offline': { title: 'Sell-through offline', value: '1.40Bi', change: '-3%', changeType: 'negative', tooltip: 'Valor financeiro vendido em canais offline.' },
    'Sell-through online': { title: 'Sell-through online', value: '160M', change: '+12%', changeType: 'positive', tooltip: 'Valor financeiro vendido em canais online.' },
    'Ticket Médio PDV': { title: 'Ticket Médio PDV', value: 'R$ 1.23k', change: '+5%', changeType: 'positive', tooltip: 'Média de valor por PDV ativo no período.' },
    'Penetração SKU': { title: 'Penetração SKU', value: '39', change: '-1%', changeType: 'negative', tooltip: 'Contagem distinta de SKUs diferentes comprados por PDV no período.' },
    'PDVs em Risco': { title: 'PDVs em Risco', value: '1.235', tooltip: 'Quantidade total de PDVs classificados com risco no período.' },
    'Segmento mais afetado': { title: 'Segmento mais afetado', value: 'Padaria', tooltip: 'Dentre os PDVs que apresentaram queda, qual o segmento que possuí a maior quantidade.' },
    // Visão Geral - Indicadores Chave
    'Sell-in': { title: 'Sell-in', value: '1.84Bi', change: '+25%', changeType: 'positive', tooltip: 'Valor total de produtos vendidos pela indústria para os distribuidores.' },
    'Estoque': { title: 'Estoque', value: '1.84Bi', change: '+25%', changeType: 'positive', tooltip: 'Valor total de produtos em estoque nos distribuidores.' },
    'Dias de Estoque': { title: 'Dias de Estoque', value: '39', change: '-25%', changeType: 'negative', tooltip: 'Número de dias que o estoque atual pode cobrir as vendas.' },
    'Positivação Geral': { title: 'Positivação', value: '1.23Bi', change: '+25%', changeType: 'positive', tooltip: 'Quantidade de PDVs comprando no período (Visão Geral).' },
    // Visão Geral - Rentabilidade
    'Preço médio sell-in': { title: 'Preço médio sell-in', value: 'R$ 2.849', change: '+25%', changeType: 'positive', tooltip: 'Preço médio de venda do produto da indústria para o distribuidor.' },
    'Preço médio sell-through': { title: 'Preço médio sell-through', value: 'R$ 3.681', change: '-25%', changeType: 'negative', tooltip: 'Preço médio de venda do produto do distribuidor para o PDV.' },
    'Média Mark-up': { title: 'Média Mark-up', value: '29.5%', change: '+2.1%', changeType: 'positive', tooltip: 'Diferença percentual entre o preço de venda e o custo do produto.' },
    // Visão Geral - Fatores Críticos
    'Ruptura': { title: 'Ruptura', value: '12%', change: '-1.5%', changeType: 'negative', tooltip: 'Percentual de PDVs onde um produto esteve em falta.' },
    'Superestoque': { title: 'Superestoque', value: '8%', change: '-0.5%', changeType: 'negative', tooltip: 'Percentual de produtos com estoque acima do ideal.' },
    'Oportunidade R$': { title: 'Oportunidade R$', value: '1.2Mi', change: '+100k', changeType: 'positive', tooltip: 'Valor de venda perdido devido a ruptura ou outras ineficiências.' },
    'Aderência MSL': { title: 'Aderência MSL', value: '78%', change: '+5%', changeType: 'positive', tooltip: 'Percentual de conformidade com a lista de SKUs sugerida.' },
    'Aderência Preço': { title: 'Aderência Preço', value: '92%', change: '-1%', changeType: 'negative', tooltip: 'Percentual de conformidade com a política de preços sugerida.' },
};

// ===================================================================================
// FICTIONAL BEVERAGE COMPANY UNIVERSE: "VitaSuco"
// ===================================================================================

const fictionalSKUs = [
  { id: 'SKU78901', name: 'Sabor Tropical Uva 1L', participation: 12.5, potential: 150000 },
  { id: 'SKU78902', name: 'Frescor Citrus Limão 350ml', participation: 8.2, potential: 95000 },
  { id: 'SKU78903', name: 'Pura Leveza com Gás 500ml', participation: 15.1, potential: 210000 },
  { id: 'SKU78904', name: 'GuaraPower Zero Açúcar 2L', participation: 5.6, potential: 60000 },
  { id: 'SKU78905', name: 'BioNectar Laranja Orgânico 1L', participation: 9.8, potential: 110000 },
];

const fictionalBubbleData: BubbleChartData[] = [
  { name: 'Sabor Tropical', pdvs: 1500, vendas: 250000, cobertura: 80 },
  { name: 'Frescor Citrus', pdvs: 1200, vendas: 180000, cobertura: 65 },
  { name: 'Pura Leveza', pdvs: 1800, vendas: 320000, cobertura: 90 },
  { name: 'GuaraPower', pdvs: 800, vendas: 90000, cobertura: 40 },
  { name: 'BioNectar', pdvs: 950, vendas: 120000, cobertura: 55 },
];

// ===================================================================================
// MSL MOCK DATA
// ===================================================================================

export const mockSelectedSKUs = fictionalSKUs;

export const bigNumbersDiagnostico = [
  { title: '% de PDVs com ao menos 1 SKU do MSL', value: '82,5%', tooltip: 'Percentual de pontos de venda que compraram pelo menos um item do MSL no período.' },
  { title: '% de PDVs com MSL completo', value: '35,7%', tooltip: 'Percentual de pontos de venda que compraram todos os itens obrigatórios do MSL no período.' },
  { title: 'Sell-through total (R$)', value: `R$ ${formatNumberBR(12345678.90)}`, tooltip: 'Valor total de vendas (sell-through) dos produtos do MSL no período selecionado.' },
  { title: 'SKUs com ruptura', value: '12', tooltip: 'Quantidade de SKUs do MSL que apresentaram ruptura em algum PDV no período.' },
  { title: 'Oportunidade (R$)', value: `R$ ${formatNumberBR(1250000.00)}`, tooltip: 'Valor de venda incremental estimado ao corrigir as falhas de MSL.' },
];

export const bubbleChartData: BubbleChartData[] = fictionalBubbleData;

export const heatmapData = [
  { sku: 'Sabor Tropical', segmento: 'Hiper', value: 95 },
  { sku: 'Sabor Tropical', segmento: 'Super', value: 88 },
  { sku: 'Sabor Tropical', segmento: 'Varejo', value: 72 },
  { sku: 'Frescor Citrus', segmento: 'Hiper', value: 78 },
  { sku: 'Frescor Citrus', segmento: 'Super', value: 91 },
  { sku: 'Frescor Citrus', segmento: 'Varejo', value: 65 },
  { sku: 'Pura Leveza', segmento: 'Hiper', value: 92 },
  { sku: 'Pura Leveza', segmento: 'Super', value: 94 },
  { sku: 'Pura Leveza', segmento: 'Varejo', value: 81 },
];

export const scatterPlotData = fictionalBubbleData.map(d => ({ name: d.name, x: d.cobertura, y: d.cobertura - 5 }));

export const barChartData = [
    { name: 'Sabor Tropical', giro: 4.5, peso: 15 },
    { name: 'Frescor Citrus', giro: 3.2, peso: 8 },
    { name: 'Pura Leveza', giro: 5.1, peso: 18 },
    { name: 'GuaraPower', giro: 2.1, peso: 5 },
    { name: 'BioNectar', giro: 2.8, peso: 7 },
];

export const quadrantChartData = [
    { name: 'Sabor Tropical Essencial', cobertura: 85, frequencia: 90 },
    { name: 'Pura Leveza Essencial', cobertura: 90, frequencia: 88 },
    { name: 'Frescor Citrus Oportunidade', cobertura: 40, frequencia: 75 },
    { name: 'GuaraPower Baixo Giro', cobertura: 70, frequencia: 30 },
    { name: 'BioNectar Baixa Relevância', cobertura: 30, frequencia: 25 },
];

export const bigNumbersConformidade = [
  { title: 'PDVs com MSL', value: '4.250', tooltip: 'Total de PDVs que possuem uma estratégia de MSL definida.' },
  { title: 'MSL Completo', value: '35,7%', tooltip: 'Percentual de PDVs que compraram todos os itens obrigatórios do MSL.' },
  { title: 'MSL Parcial', value: '46,8%', tooltip: 'Percentual de PDVs que compraram alguns, mas não todos, os itens obrigatórios do MSL.' },
  { title: 'Sem Compras', value: '17,5%', tooltip: 'Percentual de PDVs que não compraram nenhum item do MSL no período.' },
];

export const stackedBarData = [
    { name: 'Prioridade Alta', total: 1200, parcial: 800, semCompras: 300 },
    { name: 'Prioridade Média', total: 1800, parcial: 1100, semCompras: 500 },
    { name: 'Prioridade Baixa', total: 900, parcial: 600, semCompras: 250 },
];

export const lineBarData = [
    { name: 'Jan', total: 3800, percentual: 32 },
    { name: 'Fev', total: 3850, percentual: 34 },
    { name: 'Mar', total: 3900, percentual: 35 },
    { name: 'Abr', total: 4000, percentual: 38 },
    { name: 'Mai', total: 4100, percentual: 36 },
    { name: 'Jun', total: 4250, percentual: 35.7 },
];

export const pieChartData = [
    { value: 1020, name: 'PDVs sem compras' },
    { value: 850, name: 'Falta +3 SKUs' },
    { value: 1300, name: 'Falta 2 SKUs' },
    { value: 1600, name: 'Falta 1 SKU' },
];

// ===================================================================================
// BEHAVIOR MOCK DATA
// ===================================================================================

const commonHeaderIndicatorKeys = ['Distribuidores', 'Sell-through (R$)', 'Positivação', 'Ticket Médio PDV', 'Penetração SKU'];

export const subClusterData = {
  'Campeões': [
    { cluster: 'Campeões', ytd25: 788, variacao: 12, representatividade: 100 }
  ],
  'Fiéis': [
    { cluster: 'Fiéis', ytd25: 11771, variacao: 2, representatividade: 70 },
    { cluster: 'Potenciais Fiéis', ytd25: 4500, variacao: -2, representatividade: 27 },
    { cluster: 'Não Posso Perdê-los', ytd25: 600, variacao: 9, representatividade: 3 }
  ],
  'Potenciais': [
    { cluster: 'Precisam de Atenção', ytd25: 3200, variacao: -9, representatividade: 56 },
    { cluster: 'Promissores', ytd25: 2297, variacao: -8, representatividade: 40 },
    { cluster: 'Novos', ytd25: 190, variacao: 4, representatividade: 4 },
  ],
  'Em Risco': [
    { cluster: 'Vulneráveis', ytd25: 150, variacao: -6, representatividade: 70 },
    { cluster: 'Hibernando', ytd25: 65, variacao: 8, representatividade: 30 },
  ]
};


export const mockBehavior = {
    fidelizacao: {
        indicadores: commonHeaderIndicatorKeys,
        variacaoPerfil: {
            perdidos: { value: 376, representatividade: '2%' },
            novos: { value: 190, representatividade: '1%' },
            data: {
                base: [0, 24313, 0, 23937, 0],
                values: [24313, -376, 23937, 190, 24127],
                categories: ['Last YTD', 'Perdidos', 'Recorrentes', 'Novos', 'YTD'],
            }
        },
        classificacaoPDVs: [
            { cluster: 'Campeões', pdvs: 788, variacao: 12, value: 15, representatividade: 3, tooltip: 'PDVs com performance máxima: ticket médio, frequência e recência.' },
            { cluster: 'Fiéis', pdvs: 16871, variacao: 3, value: '11 a 14', representatividade: 72, tooltip: 'Compram bem, mas ainda têm espaço para crescer.' },
            { cluster: 'Potenciais', pdvs: 5687, variacao: -8, value: '06 a 10', representatividade: 24, tooltip: 'Oscilantes, com sinais de queda de frequência, ticket ou tempo sem compra.' },
            { cluster: 'Em Risco', pdvs: 215, variacao: -2, value: '01 a 05', representatividade: 1, tooltip: 'À beira do churn: presença mínima, engajamento muito baixo.' },
        ],
    },
    visaoTatica: {
        rfvMatrix: [
            { name: 'Campeões', x: 4.5, y: 4.5, value: 788 },
            { name: 'Fiéis', x: 4, y: 4, value: 16871 },
            { name: 'Potenciais Fiéis', x: 4, y: 3, value: 4500 },
            { name: 'Precisam de Atenção', x: 3, y: 3, value: 3200 },
            { name: 'Vulneráveis', x: 2, y: 3, value: 1500 },
            { name: 'Não Posso Perdê-los', x: 2, y: 5, value: 600 },
            { name: 'Hibernando', x: 3, y: 2, value: 900 },
            { name: 'Perdidos', x: 1, y: 2, value: 450 },
            { name: 'Novos', x: 5, y: 1, value: 190 },
            { name: 'Promissores', x: 4.5, y: 1.5, value: 1200 },
        ],
        performanceComportamento: {
            treeData: [
                { name: 'Mercados de 1 a 4 CHK', value: 12990 },
                { name: 'Mercados de 5 a 9 CHK', value: 3416 },
                { name: 'Outros Varejos', value: 1403 },
                { name: 'Restaurante', value: 1183 },
                { name: 'Lojas de Conveniencias', value: 1139 },
                { name: 'Mercados acima de 10 CHK', value: 1108 },
                { name: 'Outros', value: 962 + 700 + 405 + 227 + 140 + 78 },
            ],
            tableData: [
                ['Mercados de 1 a 4 CHK', 12990, 'R$ 104,42', '4/18', '8', '67%', 10, 4, 20, 10543, 2419, 4],
                ['Mercados de 5 a 9 CHK', 3416, 'R$ 505,00', '7/18', '12', '100%', 29, 41, 194, 2071, 1069, 41],
                ['Outros Varejos', 1403, 'R$ 2.591,91', '9/18', '12', '100%', 142, 51, 48, 1183, 100, 21],
                ['Atacados', 700, 'R$ 938,00', '4/18', '6', '50%', 0, 0, 0, 395, 305, 0]
            ],
            tableColumns: ['Segmento do PDV', 'Qtd. de PDVs', 'Ticket Médio PDV', 'Mix Médio', 'Freq. Compra', '% Recompra', 'Perdidos', 'Novos', 'Campeões', 'Fiéis', 'Potenciais', 'Em Risco'],
        },
        visaoOperacional: [
            { title: 'PDVs migrados de outro cluster', value: 98, change: 5, changeType: 'positive' as const },
            { title: 'PDVs migrados para outro cluster', value: 120, change: -10, changeType: 'negative' as const },
            { title: 'PDVs com queda em recência', value: 35, change: 2, changeType: 'positive' as const },
            { title: 'PDVs com queda em Ticket Médio', value: 15, change: 8, changeType: 'positive' as const },
            { title: 'PDVs com queda em Frequência', value: 9, change: -5, changeType: 'negative' as const },
            { title: 'PDVs com queda em Mix Médio', value: 11, change: 1, changeType: 'positive' as const },
        ]
    },
    raioX: {
        header: {
            nome: 'Mercado Bom Preço Ltda.',
            segmento: 'Mercados acima de 10 CHK',
            perfil: 'Campeão',
            classificacaoRFV: '555',
            classificacaoRFVAnterior: '545',
            sellThroughRS: 475563,
            sellThroughRSAnterior: 414393,
            sellThroughUnd: 285770,
            sellThroughUndAnterior: 293337,
            ticketMedio: 39630,
            ticketMedioAnterior: 38131,
            diasUltimaCompra: 6,
            dataUltimaCompra: '27/08/2025',
            tempoMedioCompras: '32 Dias',
            frequencia: '12/12',
            recompra: '100%',
            mixMedio: '18/22',
            mixMedioAnterior: '20/22',
            participacaoCategoria: '3/11',
            participacaoCategoriaAnterior: '2.68/11',
        },
        kiviatRFV: {
            atual: [5, 5, 5],
            anterior: [5, 4, 5],
        },
        analiseProdutos: {
            recorrentes: 9,
            atuais: 9,
            anteriores: 1,
            produtos: [
                { nome: 'Sabor Tropical Uva 1L', valor: 7096.43, variacao: -89 },
                { nome: 'Frescor Citrus Limão 350ml', valor: 6179.36, variacao: 186 },
                { nome: 'Pura Leveza com Gás 500ml', valor: 4364.96, variacao: 132 },
                { nome: 'GuaraPower Zero Açúcar 2L', valor: 3513.46, variacao: 61 },
                { nome: 'BioNectar Laranja Orgânico 1L', valor: 2585.20, variacao: 95 },
                { nome: 'Sabor Tropical Manga 1L', valor: 2185.38, variacao: 190 },
            ]
        }
    },
    frequencia: {
        indicadores: commonHeaderIndicatorKeys,
        cohortData: [
            [100, 99.9, 88.2, 79.9, 68.4, 56.8, 58.9, 49.3, 42.9, 38.6, 32.9, 32.1],
            [100, 99.8, 81.5, 72.3, 65.3, 57.2, 51.9, 49.3, 46.3, 38.7, 42.9, null],
            [100, 99.7, 84.7, 75.6, 67.1, 55.4, 55.3, 51.3, 41.2, 38.7, null, null],
            [100, 99.6, 82.3, 73.8, 66.8, 54.9, 53.7, 56.8, 42.1, null, null, null],
            [100, 99.5, 87.4, 78.1, 64.2, 56.1, 52.4, 55.9, null, null, null, null],
            [100, 99.4, 80.9, 71.9, 69.0, 52.3, 58.0, null, null, null, null, null],
            [100, 99.3, 86.1, 74.5, 63.5, 53.7, null, null, null, null, null, null],
            [100, 99.2, 83.8, 77.2, 62.9, null, null, null, null, null, null, null],
            [100, 99.1, 80.5, 72.7, null, null, null, null, null, null, null, null],
            [100, 99.0, 85.0, null, null, null, null, null, null, null, null, null],
            [100, 98.9, null, null, null, null, null, null, null, null, null, null],
            [100, null, null, null, null, null, null, null, null, null, null, null],
        ],
        ticketsMedio: {
            categories: ['2', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            values: [124, 186, 196, 200, 272, 300, 374, 400, 411, 423],
        },
        recorrencia: {
            categories: ['1 mês', '2', '3', '4', 'Maior'],
            values: [18000, 25000, 19000, 15000, 12000]
        }
    },
    cobertura: {
        periodoTotal: '01/07/2024 até 02/09/2025 (14 meses)',
        periodoEstavel: '01/07/2024 até 02/09/2025 (14 meses)',
        semComprasVsEstaveis: {
            semCompra: 1450,
            estavel: 1040,
        },
        porAgente: {
            categories: ['AGENTE A', 'AGENTE B', 'AGENTE C', 'AGENTE D', 'AGENTE E', 'AGENTE F'],
            semCompra: [320, 302, 301, 334, 390, 330],
            estavel: [220, 182, 191, 234, 290, 310],
        },
        tabelaCobertura: {
            columns: ['Agente de distribuição', 'Total Geral PDVs', 'Cobertura total', 'Cobertura estável'],
            data: [
                ['Distribuidora Horizonte', 190535, 44544, 45657],
                ['Logisul Atacadista', 45645, 34675, 4588],
                ['Central Bebidas', 34999, 32646, 53000],
                ['Rede Rápida Log', 34544, 13989, 43089],
                ['NorteSul Distribuição', 15786, 8000, 7978],
            ]
        }
    },
    mixDeProdutos: {
        indicadores: commonHeaderIndicatorKeys,
        cohortData: [
            [1.0, 1.8, 1.3, 1.8, 1.2, 1.3, 1.6, 1.5, 1.4, 1.0, 1.3, 1.8],
            [1.3, 1.2, 1.5, 1.2, 1.5, 2.0, 1.0, 1.3, 1.6, 1.0, 1.2, null],
            [1.5, 1.6, 1.9, 1.6, 1.8, 2.0, 1.6, 1.3, 1.9, 1.0, null, null],
            [1.7, 1.9, 1.4, 1.3, 1.4, 1.6, 1.4, 1.4, 1.3, null, null, null],
            [1.9, 1.3, 1.8, 1.5, 1.3, 1.8, 1.0, 1.2, null, null, null, null],
        ],
        ranking: [
            { categoria: 'Sucos', valor: 423, variacao: 22 },
            { categoria: 'Refrigerantes', valor: 411, variacao: -21 },
            { categoria: 'Águas', valor: 400, variacao: 20 },
            { categoria: 'Isotônicos', valor: 374, variacao: 18 },
            { categoria: 'Chás', valor: 300, variacao: -9 },
        ],
        mixPorFrequencia: {
            categories: ['2', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            values: [0.6, 0.7, 0.9, 1.1, 1.4, 1.6, 3.2, 2.0, 2.2, 2.3],
        },
        mixPorPDV: {
            categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago'],
            anterior: [280, 250, 300, 320, 290, 310, 280, 260],
            atual: [300, 270, 340, 350, 310, 330, 300, 290],
        },
        top5presenca: {
            sets: [
                { sets: ['A'], size: 8078 }, { sets: ['B'], size: 5467 }, { sets: ['C'], size: 3869 }, { sets: ['D'], size: 8078 }, { sets: ['E'], size: 3467 },
                { sets: ['A', 'B'], size: 1000 }, { sets: ['A', 'C'], size: 800 }, { sets: ['B', 'C'], size: 600 },
                { sets: ['A', 'B', 'C'], size: 400 }
            ],
            tableData: [
                [true, false, false, false, false, 8078, 2000, 80000],
                [false, true, false, false, false, 5467, 2000, 40000],
                [false, false, true, false, false, 3869, 2000, 32000],
                [true, true, false, false, false, 1000, 1500, 20000],
            ]
        }
    },
    monitoramentoRisco: {
        indicadores: [
            'PDVs em Risco',
            'Segmento mais afetado',
            'Positivação',
            'Ticket Médio PDV',
            'Penetração SKU',
        ],
        gruposDeRisco: {
            categories: ['Queda Frequência', 'Queda Recência', 'Queda Ticket', 'Queda Sell-through (R$)', 'Queda Mix'],
            values: [32, 55, 48, 25, 23]
        },
        evolucaoGrupos: {
            categories: ['Mar/25', 'Abr/25', 'Mai/25', 'Jun/25', 'Jul/25', 'Ago/25'],
            baixo: [450, 480, 500, 460, 490, 520],
            medio: [600, 620, 610, 650, 630, 640],
            alto: [800, 780, 810, 850, 900, 920],
        },
        dispersaoRisco: Array.from({ length: 150 }, () => ({
            atual: Math.random() * 12 + 3,
            anterior: Math.random() * 12 + 3,
        })).map(d => ({ ...d, variacao: (d.atual - d.anterior) / d.anterior })),
    }
};

// ===================================================================================
// VISÃO GERAL MOCK DATA
// ===================================================================================

const baseIndicator = { comparisonText: "ano anterior", wide: true };
export const visaoGeralIndicadoresChave = {
  principaisIndicadores: [
    { title: "Sell-in", value: "1.84Bi", change: "25%", changeType: "positive", ...baseIndicator },
    { title: "Sell-through (R$)", value: "1.56Bi", change: "-2%", changeType: "negative", ...baseIndicator },
    { title: "Estoque", value: "1.84Bi", change: "25%", changeType: "positive", ...baseIndicator },
    { title: "Positivação Geral", value: "1.23Bi", change: "25%", changeType: "positive", ...baseIndicator },
    { title: "Dias de Estoque", value: "39", change: "25%", changeType: "negative", ...baseIndicator },
  ] as const,
  configuracao: [
    { title: "Limite Ruptura", value: "15", change: "", changeType: "neutral", comparisonText: ""},
    { title: "Limite Superestocagem", value: "15", change: "", changeType: "neutral", comparisonText: ""},
    { title: "Prazo de Entrega", value: "15d", change: "", changeType: "neutral", comparisonText: ""},
    { title: "Tendência Seg à Sex", value: "", change: "", changeType: "neutral", comparisonText: ""},
  ] as const,
  desempenhoParceiro: {
    columns: ["Distribuidor (00)", "Sell-in", "Rep", "Var", "Sell-through", "Rep", "Var", "Estoque", "Rep", "Var", "DOH", "Positivação", "Var"],
    data: [
        ["Distribuidora Horizonte", "R$ 1.573.903", "14%", "100%", "R$ 1.234.654", "15%", "27%", "R$ 354.875", "3%", "-49%", "8", "7.623", "11%"],
        ["Logisul Atacadista", "R$ 1.573.903", "14%", "100%", "R$ 1.234.654", "15%", "27%", "R$ 354.875", "3%", "-49%", "8", "7.623", "11%"],
        ["Central Bebidas", "R$ 1.573.903", "14%", "100%", "R$ 1.234.654", "15%", "27%", "R$ 354.875", "3%", "-49%", "8", "7.623", "11%"],
    ],
  } as const,
  desempenhoProduto: {
    columns: ["Marca (00)", "Sell-in", "Rep", "Var", "Sell-through", "Rep", "Var", "Estoque", "Rep", "Var", "DOH", "Positivação", "Var"],
    data: [
        ["Sabor Tropical", "R$ 1.573.903", "14%", "100%", "R$ 1.234.654", "15%", "27%", "R$ 354.875", "3%", "-49%", "8", "7.623", "11%"],
        ["Frescor Citrus", "R$ 1.573.903", "14%", "100%", "R$ 1.234.654", "15%", "27%", "R$ 354.875", "3%", "-49%", "8", "7.623", "11%"],
    ],
  } as const,
};

export const visaoGeralRentabilidade = {
  principaisIndicadores: [
    { title: "Preço médio sell-in", value: "R$ 2.849", change: "25%", changeType: "positive", ...baseIndicator },
    { title: "Preço médio sell-through", value: "R$ 3.681", change: "25%", changeType: "negative", ...baseIndicator },
    { title: "Média Mark-up", value: "29.5%", change: "2.1%", changeType: "positive", ...baseIndicator },
    { title: "Sell-through (R$)", value: "1.56Bi", change: "-2%", changeType: "negative", ...baseIndicator },
    { title: "Dias de Estoque", value: "39", change: "-25%", changeType: "negative", ...baseIndicator },
  ] as const,
   desempenhoParceiro: {
    columns: ["Distribuidor (00)", "Preço médio Sell-in", "Var", "Preço médio Sell-through", "Var", "Média Mark-up", "Var", "Positivação", "Var"],
    data: [
        ["Distribuidora Horizonte", "R$ 1.573.903", "100%", "R$ 1.234.654", "27%", "R$ 354.875", "-49%", "7.623", "11%"],
        ["Logisul Atacadista", "R$ 1.573.903", "100%", "R$ 1.234.654", "27%", "R$ 354.875", "-49%", "7.623", "11%"],
    ],
  } as const,
  desempenhoProduto: {
    columns: ["Marca (00)", "Preço médio Sell-in", "Var", "Preço médio Sell-through", "Var", "Média Mark-up", "Var"],
    data: [
       ["Sabor Tropical", "R$ 1.573.903", "100%", "R$ 1.234.654", "27%", "R$ 354.875", "-49%"],
       ["Frescor Citrus", "R$ 987.654", "95%", "R$ 876.543", "22%", "R$ 210.987", "-45%"]
    ],
  } as const,
};

export const representationChartOption = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: '5%',
    left: 'center',
  },
  series: [
    {
      name: 'Representação',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '20',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: 'Distribuidora Horizonte' },
        { value: 735, name: 'Logisul Atacadista' },
        { value: 580, name: 'Central Bebidas' },
        { value: 484, name: 'Rede Rápida Log' },
        { value: 300, name: 'Outros' },
      ],
    },
  ],
};

export const linhaTemporalOption = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Sell-in', 'Sell-through'],
    bottom: 10
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '15%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Jan/25', 'Fev/25', 'Mar/25', 'Abr/25', 'Mai/25', 'Jun/25', 'Jul/25', 'Ago/25'],
  },
  yAxis: {
    type: 'value',
    axisLabel: {
        formatter: (value: number) => `R$${formatNumberBR(value / 1000000)}M`
    }
  },
  series: [
    {
      name: 'Sell-in',
      type: 'line',
      smooth: true,
      data: [1200000, 1320000, 1010000, 1340000, 900000, 2300000, 2100000, 2200000],
    },
    {
      name: 'Sell-through',
      type: 'line',
      smooth: true,
      data: [1100000, 1220000, 910000, 1240000, 800000, 2200000, 2000000, 2100000],
    },
  ],
};

export const visaoGeralFatoresCriticos = {
  principaisIndicadores: [
    { title: "Ruptura", value: "12%", change: "1.5%", changeType: "negative", ...baseIndicator },
    { title: "Superestoque", value: "8%", change: "0.5%", changeType: "negative", ...baseIndicator },
    { title: "Oportunidade R$", value: "1.2Mi", change: "100k", changeType: "positive", ...baseIndicator },
    { title: "Aderência MSL", value: "78%", change: "5%", changeType: "positive", ...baseIndicator },
    { title: "Aderência Preço", value: "92%", change: "1%", changeType: "negative", ...baseIndicator },
  ] as const,
  oportunidadesChartOption: {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
         axisLabel: {
            formatter: (value: number) => `R$${formatNumberBR(value / 1000)}k`
        }
      },
      yAxis: {
        type: 'category',
        data: ['Oportunidade MSL', 'Ruptura', 'Superestoque', 'Aderência Preço']
      },
      series: [
        {
          name: 'Oportunidade (R$)',
          type: 'bar',
          data: [282030, 134890, 90340, 104970]
        }
      ]
  },
  acoesParceiros: [
    { title: "Distribuidora Horizonte", subtitle: "R$ 450.2k", buttonText: "Ver Ações" },
    { title: "Logisul Atacadista", subtitle: "R$ 312.8k", buttonText: "Ver Ações" },
    { title: "Central Bebidas", subtitle: "R$ 280.1k", buttonText: "Ver Ações" },
    { title: "Rede Rápida Log", subtitle: "R$ 150.9k", buttonText: "Ver Ações" },
  ] as const,
};