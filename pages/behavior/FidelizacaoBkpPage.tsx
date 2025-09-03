

import React, { useState, useRef, useEffect, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useOutletContext } from 'react-router-dom';
import { Heart, Star, Rocket, AlertTriangle, ShoppingCart, XSquare } from 'lucide-react';
import { PageHeader } from '../PageHeader';
import { Card, DataCard, SimpleSelect, IndicatorSelectorCard, CardActions, DataTable, CompactDataCard } from '../../components/ui';
import { mockBehavior, allIndicatorsData, indicatorOptions, subClusterData } from '../../services/mockData';
import { baseChartOptions } from '../common';
import type { SecondaryMenuContextProps } from '../../components/layout/SecondaryMenuLayout';
import { TabelaDetalhadaComportamento, AnaliseComplementarCluster, PerformanceComportamentoCluster } from './common';

const FidelizacaoBkpPageComponent: React.FC<{ title: string; breadcrumbs: string[] }> = ({ title, breadcrumbs }) => {
    const { fidelizacao } = mockBehavior;
    const context = useOutletContext<SecondaryMenuContextProps | undefined>();
    const [selectedCluster, setSelectedCluster] = useState<string | null>(null);
    const analysisRef = useRef<HTMLDivElement>(null);

    const [variacaoView, setVariacaoView] = useState<'chart' | 'table'>('chart');
    const [classificacaoView, setClassificacaoView] = useState<'chart' | 'table'>('chart');

    const handleCardClick = (cluster: string) => {
        setSelectedCluster(prev => (prev === cluster ? null : cluster));
    };

    useEffect(() => {
        if (selectedCluster && analysisRef.current) {
            setTimeout(() => {
                analysisRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [selectedCluster]);


    const waterfallOption = {
        ...baseChartOptions,
        grid: { ...baseChartOptions.grid, bottom: '12%' },
        xAxis: { type: 'category', data: fidelizacao.variacaoPerfil.data.categories, axisLabel: { ...baseChartOptions.xAxis.axisLabel, interval: 0 } },
        yAxis: { type: 'value' },
        series: [{
            type: 'bar',
            stack: 'total',
            itemStyle: { borderColor: 'transparent', color: 'transparent' },
            emphasis: { itemStyle: { borderColor: 'transparent', color: 'transparent' } },
            data: fidelizacao.variacaoPerfil.data.base,
        }, {
            type: 'bar',
            stack: 'total',
            label: { show: true, position: 'top' },
            data: fidelizacao.variacaoPerfil.data.values,
            itemStyle: {
                color: (params: any) => {
                    if (params.name === 'Perdidos') return '#d9534f';
                    if (params.name === 'Novos') return '#5cb85c';
                    return '#5a6268';
                }
            }
        }]
    };

    const chartData = useMemo(() => {
        if (!selectedCluster) {
            return {
                categories: fidelizacao.classificacaoPDVs.map(c => c.cluster),
                ytd25: fidelizacao.classificacaoPDVs.map(c => c.pdvs),
                variacao: fidelizacao.classificacaoPDVs.map(c => c.variacao),
                representatividade: fidelizacao.classificacaoPDVs.map(c => c.representatividade),
            };
        }

        const subData = subClusterData[selectedCluster as keyof typeof subClusterData];
        if (!subData) { // Fallback to main clusters if something goes wrong
             return {
                categories: fidelizacao.classificacaoPDVs.map(c => c.cluster),
                ytd25: fidelizacao.classificacaoPDVs.map(c => c.pdvs),
                variacao: fidelizacao.classificacaoPDVs.map(c => c.variacao),
                representatividade: fidelizacao.classificacaoPDVs.map(c => c.representatividade),
            };
        }
        
        return {
            categories: subData.map(d => d.cluster),
            ytd25: subData.map(d => d.ytd25),
            variacao: subData.map(d => d.variacao),
            representatividade: subData.map(d => d.representatividade),
        };

    }, [selectedCluster, fidelizacao]);
    
    const classificacaoOption = {
        ...baseChartOptions,
        color: ['#002e31', '#00a06d', '#373531'],
        tooltip: { trigger: 'axis' },
        legend: { ...baseChartOptions.legend, data: ['YTD 25', '% Variação', '% Representatividade'] },
        xAxis: { type: 'category', data: chartData.categories },
        yAxis: [{ type: 'value', name: 'Qtd. PDVs' }, { type: 'value', name: 'Percentual (%)', axisLabel: { formatter: '{value}%' } }],
        series: [
            { name: 'YTD 25', type: 'bar', data: chartData.ytd25 },
            { name: '% Variação', type: 'line', yAxisIndex: 1, data: chartData.variacao, symbol: 'circle', symbolSize: 8 },
            { name: '% Representatividade', type: 'line', yAxisIndex: 1, data: chartData.representatividade, symbol: 'circle', symbolSize: 8 }
        ]
    };
    
    const variacaoTableData = {
        columns: ['Perfil', 'Valor'],
        data: fidelizacao.variacaoPerfil.data.categories.map((cat, i) => [cat, fidelizacao.variacaoPerfil.data.values[i]])
    };

    const classificacaoTableData = {
        columns: ['Cluster', 'PDVs', 'Variação %', 'Representatividade %'],
        data: chartData.categories.map((cat, i) => [
            cat, 
            chartData.ytd25[i], 
            `${chartData.variacao[i]}%`, 
            `${chartData.representatividade}%`
        ])
    };

    const clusterIcons: { [key: string]: React.ElementType } = {
        'Campeões': Heart,
        'Fiéis': Star,
        'Potenciais': Rocket,
        'Em Risco': AlertTriangle,
    };

    const cardTitle = selectedCluster 
        ? `Classificação de PDVs > ${selectedCluster}` 
        : "Classificação de PDVs Recorrentes";

    return (
        <>
            <PageHeader title={title} breadcrumbs={breadcrumbs} onToggleSecondaryMenu={context?.toggleSecondaryMenu} />
            <div className="space-y-6 p-6">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    {fidelizacao.indicadores.map(indicatorKey => (
                        <IndicatorSelectorCard
                            key={indicatorKey}
                            initialIndicatorKey={indicatorKey}
                            allIndicatorsData={allIndicatorsData}
                            indicatorOptions={indicatorOptions}
                        />
                    ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="md:col-span-1 flex flex-col gap-6">
                        <CompactDataCard
                            icon={ShoppingCart}
                            title="Novos"
                            value={376}
                            change={12}
                            representatividade="35%"
                        />
                        <CompactDataCard
                            icon={XSquare}
                            title="Perdidos"
                            value={376}
                            change={12} 
                            representatividade="12%"
                        />
                    </div>
                    <Card 
                        title="PDVs com Variação de Perfil" 
                        className="md:col-span-2"
                        actions={<CardActions showViewToggle currentView={variacaoView} onToggleView={() => setVariacaoView(v => v === 'chart' ? 'table' : 'chart')} />}
                        footerContent={<SimpleSelect options={['Positivação', 'Sell-through (Qtde.)', 'Sell-through em R$']} />}
                    >
                         <div className="h-full min-h-[360px]">
                            {variacaoView === 'chart' ? (
                                <ReactECharts option={waterfallOption} style={{ height: '100%'}} />
                            ) : (
                                <DataTable columns={variacaoTableData.columns} data={variacaoTableData.data} />
                            )}
                        </div>
                    </Card>
                </div>


                <Card 
                    title={cardTitle}
                    actions={<CardActions showViewToggle currentView={classificacaoView} onToggleView={() => setClassificacaoView(v => v === 'chart' ? 'table' : 'chart')} />}
                    footerContent={<SimpleSelect options={['Positivação', 'Sell-through (Qtde.)', 'Sell-through em R$']} />}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {fidelizacao.classificacaoPDVs.map(item => (
                            <div key={item.cluster} onClick={() => handleCardClick(item.cluster)}>
                                <DataCard
                                    cluster={item.cluster}
                                    icon={clusterIcons[item.cluster]}
                                    pdvs={item.pdvs}
                                    variacao={item.variacao}
                                    rfv={String(item.value)}
                                    representatividade={item.representatividade}
                                    isActive={selectedCluster === item.cluster}
                                />
                            </div>
                        ))}
                    </div>
                    {classificacaoView === 'chart' ? (
                        <ReactECharts option={classificacaoOption} style={{ height: 400 }} />
                    ) : (
                        <DataTable columns={classificacaoTableData.columns} data={classificacaoTableData.data} />
                    )}
                </Card>

                {selectedCluster && (
                    <div ref={analysisRef} className="space-y-6">
                        <AnaliseComplementarCluster selectedClusters={[selectedCluster]} />
                        <PerformanceComportamentoCluster selectedClusters={[selectedCluster]} />
                        <TabelaDetalhadaComportamento 
                            title={`Detalhes - PDVs ${selectedCluster}`}
                            selectedClusters={[selectedCluster]}
                            showPDVLink={true}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export const FidelizacaoBkpPage = React.memo(FidelizacaoBkpPageComponent);