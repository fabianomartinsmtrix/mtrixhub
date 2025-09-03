
import React, { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { Card, DataTable, IndicatorCard, Modal, SimpleSelect, CardActions } from '../../components/ui';
import { baseChartOptions } from '../common';
import { mockBehavior, formatNumberBR } from '../../services/mockData';
import { Heart, ArrowUp, ArrowDown } from 'lucide-react';

const detailedMockTableData = [
    { cod: 728347, name: 'Mercado Bom Preço Ltda', segmento: 'Mercados > 10 CHK', sellThrough: 475563.01, variacao: 15, ticket: 39630.25, data: '18/04/2025', dias: 6, freq: 82, score: 555, cluster: 'Campeões', subCluster: 'Campeões' },
    { cod: 169432, name: 'Super Varejão Central', segmento: 'Outros Varejos', sellThrough: 377372.46, variacao: -2, ticket: 31447.71, data: '18/04/2025', dias: 5, freq: 77, score: 555, cluster: 'Fiéis', subCluster: 'Fiéis' },
    { cod: 725143, name: 'Atacado Forte S.A.', segmento: 'Outros Varejos', sellThrough: 337071.43, variacao: -15, ticket: 28089.29, data: '31/03/2025', dias: 23, freq: 55, score: 555, cluster: 'Fiéis', subCluster: 'Potenciais Fiéis' },
    { cod: 927210, name: 'Hipermercado da Família', segmento: 'Outros', sellThrough: 152791.57, variacao: 21, ticket: 12732.63, data: '29/03/2025', dias: 25, freq: 41, score: 555, cluster: 'Fiéis', subCluster: 'Não Posso Perdê-los' },
    { cod: 112233, name: 'Padaria Doce Pão', segmento: 'Padaria', sellThrough: 50210.00, variacao: -10, ticket: 4184.17, data: '15/03/2025', dias: 40, freq: 30, score: 434, cluster: 'Potenciais', subCluster: 'Precisam de Atenção' },
    { cod: 445566, name: 'Conveniência 24h', segmento: 'Conveniência', sellThrough: 89345.50, variacao: -5, ticket: 7445.46, data: '01/04/2025', dias: 22, freq: 35, score: 444, cluster: 'Potenciais', subCluster: 'Promissores' },
    { cod: 778899, name: 'Bar do Zé', segmento: 'Bar', sellThrough: 12345.00, variacao: 150, ticket: 1028.75, data: '01/09/2025', dias: 1, freq: 10, score: 512, cluster: 'Potenciais', subCluster: 'Novos' },
    { cod: 998877, name: 'Restaurante Sabor Caseiro', segmento: 'Restaurante', sellThrough: 33210.80, variacao: -25, ticket: 2767.57, data: '10/02/2025', dias: 80, freq: 20, score: 223, cluster: 'Em Risco', subCluster: 'Vulneráveis' },
    { cod: 665544, name: 'Lanchonete da Praça', segmento: 'Lanchonete', sellThrough: 20111.00, variacao: -30, ticket: 1675.92, data: '05/01/2025', dias: 150, freq: 15, score: 112, cluster: 'Em Risco', subCluster: 'Hibernando' },
];

const RaioXPDVModalContent: React.FC = () => {
    const { raioX } = mockBehavior;
    const h = raioX.header;
    const [produtosView, setProdutosView] = useState<'chart' | 'table'>('chart');

    const renderChange = (current: number, previous: number) => {
        const change = ((current - previous) / previous) * 100;
        const isPositive = change >= 0;
        const color = isPositive ? 'text-green-600' : 'text-red-600';
        const Icon = isPositive ? ArrowUp : ArrowDown;
        return <span className={`flex items-center text-xs font-bold ${color}`}><Icon className="h-3 w-3 mr-1" />{change.toFixed(0)}%</span>;
    };

    const kiviatOption = {
        ...baseChartOptions,
        radar: {
            indicator: [
                { name: 'Recência', max: 5 },
                { name: 'Frequência', max: 5 },
                { name: 'Ticket Médio', max: 5 }
            ]
        },
        series: [{
            type: 'radar',
            data: [
                { value: raioX.kiviatRFV.atual, name: 'YTD/25' },
                { value: raioX.kiviatRFV.anterior, name: 'YTD/24' }
            ]
        }]
    };
    
    const produtosOption = {
        ...baseChartOptions,
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: '20%' },
        xAxis: { type: 'value' },
        yAxis: { type: 'category', data: raioX.analiseProdutos.produtos.map(p => p.nome), inverse: true },
        series: [{
            name: 'Valor',
            type: 'bar',
            data: raioX.analiseProdutos.produtos.map(p => p.valor),
            label: {
                show: true,
                position: 'right',
                formatter: (p: any) => `${raioX.analiseProdutos.produtos[p.dataIndex].variacao}%`,
                color: (p: any) => raioX.analiseProdutos.produtos[p.dataIndex].variacao >= 0 ? '#00a06d' : '#dc3545',
            }
        }]
    };

    const produtosTableData = {
        columns: ['Produto', 'Valor (R$)', 'Variação %'],
        data: raioX.analiseProdutos.produtos.map(p => [p.nome, formatNumberBR(p.valor), `${p.variacao}%`])
    };

    return (
        <div className="space-y-6">
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-4">
                    {/* Coluna 1 */}
                    <div className="flex flex-col items-center justify-center space-y-2 border-r pr-4">
                       <h3 className="font-bold text-lg">{h.nome}</h3>
                       <p className="text-xs text-gray-500">{h.segmento}</p>
                       <div className="p-4 rounded-full bg-lime"><Heart className="h-8 w-8 text-primary" /></div>
                       <p className="font-bold text-sm text-secondary mt-2">Perfil do PDV: {h.perfil}</p>
                    </div>
                    {/* Coluna 2 */}
                    <div className="space-y-4">
                        <div className="text-center"><p className="text-sm font-bold text-secondary">Classificação RFV</p><p className="text-2xl font-bold">{h.classificacaoRFV}</p><p className="text-xs text-gray-500">YTD-1: {h.classificacaoRFVAnterior}</p></div>
                         <div className="text-center"><p className="text-sm font-bold text-secondary">Dias da Última Compra</p><p className="text-2xl font-bold">{h.diasUltimaCompra}</p><p className="text-xs text-gray-500">{h.dataUltimaCompra}</p></div>
                    </div>
                    {/* Coluna 3 */}
                    <div className="space-y-4">
                        <div className="text-center"><p className="text-sm font-bold text-secondary">Sell-through (R$)</p><p className="text-xl font-bold">R$ {formatNumberBR(h.sellThroughRS)}</p>{renderChange(h.sellThroughRS, h.sellThroughRSAnterior)}<p className="text-xs text-gray-500">YTD-1: R$ {formatNumberBR(h.sellThroughRSAnterior)}</p></div>
                         <div className="text-center"><p className="text-sm font-bold text-secondary">Tempo Médio Compras</p><p className="text-xl font-bold">{h.tempoMedioCompras}</p></div>
                    </div>
                    {/* Coluna 4 */}
                    <div className="space-y-4">
                        <div className="text-center"><p className="text-sm font-bold text-secondary">Sell-through (Und)</p><p className="text-xl font-bold">{formatNumberBR(h.sellThroughUnd)}</p>{renderChange(h.sellThroughUnd, h.sellThroughUndAnterior)}<p className="text-xs text-gray-500">YTD-1: {formatNumberBR(h.sellThroughUndAnterior)}</p></div>
                         <div className="text-center"><p className="text-sm font-bold text-secondary">Frequência</p><p className="text-xl font-bold">{h.frequencia}</p><p className="text-xs text-gray-500">% Recompra: {h.recompra}</p></div>
                    </div>
                    {/* Coluna 5 */}
                     <div className="space-y-4">
                        <div className="text-center"><p className="text-sm font-bold text-secondary">Ticket Médio PDV</p><p className="text-xl font-bold">R$ {formatNumberBR(h.ticketMedio)}</p>{renderChange(h.ticketMedio, h.ticketMedioAnterior)}<p className="text-xs text-gray-500">YTD-1: R$ {formatNumberBR(h.ticketMedioAnterior)}</p></div>
                        <div className="text-center"><p className="text-sm font-bold text-secondary">Mix Médio / Part. Categoria</p><p className="text-xl font-bold">{h.mixMedio} / {h.participacaoCategoria}</p><p className="text-xs text-gray-500">YTD-1: {h.mixMedioAnterior} / {h.participacaoCategoriaAnterior}</p></div>
                    </div>
                </div>
            </Card>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Diagrama Kiviat RFV" actions={<CardActions />}>
                    <p className="text-center text-xs text-gray-500 mb-2">Código do Vendedor mais recente: 77</p>
                    <ReactECharts option={kiviatOption} style={{ height: 350 }} />
                </Card>
                <Card title="Análise de Produtos" actions={<CardActions showViewToggle currentView={produtosView} onToggleView={() => setProdutosView(v => v === 'chart' ? 'table' : 'chart')} />} footerContent={<SimpleSelect options={['Sell-through em R$', 'Sell-through (Qtde.)']} />}>
                    <div className="text-xs space-y-1 mb-4">
                        <p><strong>SKUs Recorrentes:</strong> {raioX.analiseProdutos.recorrentes}</p>
                        <p><strong>SKUs Comprados somente no período atual:</strong> {raioX.analiseProdutos.atuais}</p>
                        <p><strong>SKUs Comprados somente no período anterior:</strong> {raioX.analiseProdutos.anteriores}</p>
                    </div>
                    {produtosView === 'chart' ? (
                        <ReactECharts option={produtosOption} style={{ height: 300 }} />
                    ) : (
                        <DataTable columns={produtosTableData.columns} data={produtosTableData.data} />
                    )}
                </Card>
            </div>
        </div>
    );
};

interface TabelaDetalhadaProps {
    title: string;
    showPDVLink?: boolean;
    selectedClusters: string[];
}

export const TabelaDetalhadaComportamento: React.FC<TabelaDetalhadaProps> = ({ title, showPDVLink = false, selectedClusters }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const tableData = useMemo(() => {
        const filteredData = detailedMockTableData.filter(row => selectedClusters.includes(row.cluster) || selectedClusters.includes(row.subCluster));

        const data = filteredData.map(row => [
            row.cod,
            showPDVLink ? (
                <button onClick={() => setIsModalOpen(true)} className="text-accent hover:underline text-left">
                    {row.name}
                </button>
            ) : row.name,
            row.segmento,
            `R$ ${formatNumberBR(row.sellThrough)}`,
            `${row.variacao}%`,
            `R$ ${formatNumberBR(row.ticket)}`,
            row.data,
            row.dias,
            `${row.freq}%`,
            row.score
        ]);

        return {
            columns: ['Cód. PDV', 'Razão Social PDV', 'Segmento', 'Sell-through (R$) YTD 25', 'Var %', 'Ticket Médio', 'Data Última Compra', 'Dias Sem Compra', 'Frequência', 'Score RFV'],
            data
        };
    }, [selectedClusters, showPDVLink]);
    
    return (
         <>
            <Card title={title} actions={<CardActions />}>
                <DataTable columns={tableData.columns as readonly string[]} data={tableData.data as readonly (React.ReactNode)[][]} />
            </Card>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Raio-X do PDV"
            >
                <RaioXPDVModalContent />
            </Modal>
         </>
    );
};

interface AnaliseComplementarProps {
    selectedClusters: string[];
}

export const AnaliseComplementarCluster: React.FC<AnaliseComplementarProps> = ({ selectedClusters }) => {
    const { visaoOperacional } = mockBehavior.visaoTatica;

    if (selectedClusters.length === 0) return null;

    const title = `Análise Complementar: ${selectedClusters.slice(0, 2).join(', ')}${selectedClusters.length > 2 ? '...' : ''}`;

    return (
         <Card title={title} actions={<CardActions />}>
            <p className="text-sm text-gray-600 mb-4">
                Visão operacional com as principais movimentações de PDVs e variações de indicadores de performance dentro do(s) cluster(s) selecionado(s) no período.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {visaoOperacional.map(item => (
                    <IndicatorCard
                        key={item.title}
                        title={item.title}
                        value={String(item.value)}
                        change={String(item.change)}
                        changeType={item.changeType}
                        comparisonText=""
                        wide={false}
                    />
                ))}
            </div>
        </Card>
    );
};

interface PerformanceComportamentoProps {
    selectedClusters: string[];
}

export const PerformanceComportamentoCluster: React.FC<PerformanceComportamentoProps> = ({ selectedClusters }) => {
    const { visaoTatica } = mockBehavior;
    const [view, setView] = useState<'chart' | 'table'>('chart');

    if (selectedClusters.length === 0) return null;

    const treemapOption = {
        ...baseChartOptions,
        color: ['#f5b01c', '#f07c33', '#8a8d91', '#4a90e2', '#50e3c2', '#b8e986', '#7ed321'],
        tooltip: {
            formatter: (params: any) => {
                 if (!params.data) return '';
                return `${params.data.name}<br/>PDVs: ${params.data.value}`;
            }
        },
        series: [{
            type: 'treemap',
            roam: false,
            label: {
                show: true,
                formatter: '{b}',
                color: '#fff',
                textShadowColor: 'rgba(0, 0, 0, 0.7)',
                textShadowBlur: 2,
            },
            itemStyle: {
                borderColor: '#fff'
            },
            data: visaoTatica.performanceComportamento.treeData
        }]
    };

    const footerFilters = (
        <div className="flex items-end flex-wrap gap-4">
            <SimpleSelect label="Segmento, Geografia, AD e FDV" options={['Todos', 'Segmento do PDV', 'Geografia']} />
            <SimpleSelect label="Positivação" options={['Sell-through (Qtde.)', 'Sell-through em R$', 'Ticket Médio PDV', 'Mix Médio de Produto']} />
        </div>
    );
    
    const title = `Performance de Comportamento: ${selectedClusters.slice(0, 2).join(', ')}${selectedClusters.length > 2 ? '...' : ''}`;

    return (
        <Card
            title={title}
            actions={<CardActions showViewToggle currentView={view} onToggleView={() => setView(v => v === 'chart' ? 'table' : 'chart')} />}
            footerContent={footerFilters}
        >
            {view === 'chart' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                    <ReactECharts option={treemapOption} style={{ height: 400 }} />
                    <div className="max-h-[400px] overflow-y-auto">
                        <DataTable
                            columns={visaoTatica.performanceComportamento.tableColumns as readonly string[]}
                            data={visaoTatica.performanceComportamento.tableData as readonly (string | number)[][]}
                        />
                    </div>
                </div>
            ) : (
                 <DataTable
                    columns={visaoTatica.performanceComportamento.tableColumns as readonly string[]}
                    data={visaoTatica.performanceComportamento.tableData as readonly (string | number)[][]}
                />
            )}
        </Card>
    );
};