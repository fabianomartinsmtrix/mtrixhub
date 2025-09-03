import React from 'react';
import ReactECharts from 'echarts-for-react';
import { PageHeader } from '../PageHeader';
import { Card, SimpleSelect, CardActions } from '../../components/ui';
import { mockBehavior, formatNumberBR } from '../../services/mockData';
import { baseChartOptions } from '../common';
import { Heart, ArrowUp, ArrowDown } from 'lucide-react';

const RaioXPDVPageComponent: React.FC<{ title: string; breadcrumbs: string[] }> = ({ title, breadcrumbs }) => {
    const { raioX } = mockBehavior;
    const h = raioX.header;

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

    return (
        <>
            <PageHeader title={title} breadcrumbs={breadcrumbs} showFilters={false} />
            <div className="space-y-6 p-6">
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
                    <Card title="Análise de Produtos" actions={<CardActions />} footerContent={<SimpleSelect options={['Sell-through em R$', 'Sell-through (Qtde.)']} />}>
                        <div className="text-xs space-y-1 mb-4">
                            <p><strong>SKUs Recorrentes:</strong> {raioX.analiseProdutos.recorrentes}</p>
                            <p><strong>SKUs Comprados somente no período atual:</strong> {raioX.analiseProdutos.atuais}</p>
                            <p><strong>SKUs Comprados somente no período anterior:</strong> {raioX.analiseProdutos.anteriores}</p>
                        </div>
                        <ReactECharts option={produtosOption} style={{ height: 300 }} />
                    </Card>
                </div>
            </div>
        </>
    );
};

export const RaioXPDVPage = React.memo(RaioXPDVPageComponent);
