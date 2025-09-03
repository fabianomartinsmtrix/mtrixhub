import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';

import { Card, BigNumberCard, CardActions, DataTable } from '../components/ui';
import * as mockData from '../services/mockData';
import { baseChartOptions } from './common';

const DiagnosticoMSLScreenComponent: React.FC = () => {
    const [bubbleView, setBubbleView] = useState<'chart' | 'table'>('chart');
    const [heatmapView, setHeatmapView] = useState<'chart' | 'table'>('chart');
    const [penetrationView, setPenetrationView] = useState<'chart' | 'table'>('chart');
    const [dependenciaView, setDependenciaView] = useState<'chart' | 'table'>('chart');
    const [mixView, setMixView] = useState<'chart' | 'table'>('chart');

    const bubbleChartOption = {
        ...baseChartOptions,
        tooltip: { ...baseChartOptions.tooltip, trigger: 'item', formatter: (params: any) => `${params.data.name}<br/>PDVs: ${mockData.formatNumberBR(params.data.pdvs)}<br/>Vendas: R$ ${mockData.formatNumberBR(params.data.vendas)}<br/>Cobertura: ${params.data.cobertura}%` },
        xAxis: { ...baseChartOptions.xAxis, type: 'value', name: 'Quantidade de PDVs', nameLocation: 'middle', nameGap: 30, axisLabel: { ...baseChartOptions.xAxis.axisLabel, formatter: (val: number) => mockData.formatNumberBR(val) } },
        yAxis: { ...baseChartOptions.yAxis, type: 'value', name: 'Vendas (R$)', nameLocation: 'middle', nameGap: 50, axisLabel: { ...baseChartOptions.yAxis.axisLabel, formatter: (val: number) => `R$${mockData.formatNumberBR(val/1000)}k` } },
        visualMap: { show: false, min: 0, max: 100, dimension: 2, seriesIndex: 0, inRange: { symbolSize: [10, 60] } },
        series: [{ name: 'Produtos', type: 'scatter', data: mockData.bubbleChartData.map(d => ({...d, value: [d.pdvs, d.vendas, d.cobertura]})) }],
    };
    const heatmapChartOption = {
        ...baseChartOptions,
        tooltip: { ...baseChartOptions.tooltip, trigger: 'item', formatter: (params: any) => `${params.data[1]}<br/>${params.data[0]}<br/>Penetração: ${params.data[2]}%` },
        xAxis: { type: 'category', data: [...new Set(mockData.heatmapData.map(d => d.sku))], splitArea: { show: true } },
        yAxis: { type: 'category', data: [...new Set(mockData.heatmapData.map(d => d.segmento))], splitArea: { show: true } },
        visualMap: { min: 0, max: 100, calculable: true, orient: 'horizontal', left: 'center', bottom: '0%', inRange: { color: ['#d9ef96', '#00a06d'] } },
        series: [{ name: 'Penetração', type: 'heatmap', data: mockData.heatmapData.map(d => [d.sku, d.segmento, d.value]), label: { show: true, color: '#002e31', formatter: '{@[2]}%' }, emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' } } }],
    };
    const scatterPlotOption = {
        ...baseChartOptions,
        xAxis: { ...baseChartOptions.xAxis, type: 'value', name: 'Penetração (%)', nameLocation: 'middle', nameGap: 30 },
        yAxis: { ...baseChartOptions.yAxis, type: 'value', name: 'Cobertura (%)', nameLocation: 'middle', nameGap: 30 },
        series: [{ name: 'SKUs', type: 'scatter', data: mockData.scatterPlotData.map(d => [d.x, d.y]), symbolSize: 15, label: { show: true, formatter: (param: any) => mockData.scatterPlotData[param.dataIndex].name, position: 'top', color: '#373531' } }],
    };
    const composedChartOption = {
        ...baseChartOptions,
        tooltip: { ...baseChartOptions.tooltip, trigger: 'axis' },
        xAxis: { ...baseChartOptions.xAxis, type: 'category', data: mockData.barChartData.map(d => d.name) },
        yAxis: [ { ...baseChartOptions.yAxis, type: 'value', name: 'Giro Médio', position: 'left' }, { ...baseChartOptions.yAxis, type: 'value', name: 'Peso no Ticket (%)', position: 'right' } ],
        series: [ { name: 'Giro Médio', type: 'bar', data: mockData.barChartData.map(d => d.giro), yAxisIndex: 0, barWidth: '30%' }, { name: 'Peso no Ticket (%)', type: 'line', data: mockData.barChartData.map(d => d.peso), yAxisIndex: 1, smooth: true, symbol: 'circle', symbolSize: 8 } ],
    };
    const quadrantChartOption = { ...scatterPlotOption, xAxis: { ...scatterPlotOption.xAxis, name: 'Cobertura (%)' }, yAxis: { ...scatterPlotOption.yAxis, name: 'Frequência (%)' }, series: [{...scatterPlotOption.series[0], data: mockData.quadrantChartData.map(d=> [d.cobertura, d.frequencia]), label: { show: true, formatter: (param: any) => mockData.quadrantChartData[param.dataIndex].name, position: 'top', color: '#373531' } }], visualMap: { show: false, dimension: 0, pieces: [{gte: 50, color: '#002e31'}, {lt: 50, color: '#00a06d'}] } };
    
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockData.bigNumbersDiagnostico.slice(0, 3).map(item => <BigNumberCard key={item.title} {...item} />)}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockData.bigNumbersDiagnostico.slice(3, 5).map(item => <BigNumberCard key={item.title} {...item} />)}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Participação dos meus produtos" tooltipText="Análise de vendas vs. quantidade de PDVs, onde o tamanho da bolha representa a cobertura do produto." actions={<CardActions showViewToggle currentView={bubbleView} onToggleView={() => setBubbleView(v => v === 'chart' ? 'table' : 'chart')} />}>
                    {bubbleView === 'chart' ? <ReactECharts option={bubbleChartOption} style={{ height: 350 }} notMerge={true} lazyUpdate={true} /> : <DataTable columns={['Produto', 'PDVs', 'Vendas (R$)', 'Cobertura (%)']} data={mockData.bubbleChartData.map(d => [d.name, d.pdvs, mockData.formatNumberBR(d.vendas), d.cobertura])} />}
                </Card>
                <Card title="Penetração de SKUs por Segmento de PDVs" tooltipText="Mapa de calor mostrando a porcentagem de penetração de cada SKU nos diferentes segmentos de PDV." actions={<CardActions showViewToggle currentView={heatmapView} onToggleView={() => setHeatmapView(v => v === 'chart' ? 'table' : 'chart')} />}>
                     {heatmapView === 'chart' ? <ReactECharts option={heatmapChartOption} style={{ height: 350 }} notMerge={true} lazyUpdate={true} /> : <DataTable columns={['SKU', 'Segmento', 'Penetração (%)']} data={mockData.heatmapData.map(d => [d.sku, d.segmento, d.value])} />}
                </Card>
                <Card title="Matriz de Penetração do SKU" tooltipText="Quadrantes: alta cobertura, baixa cobertura, oportunidades, sobreposição." actions={<CardActions showViewToggle currentView={penetrationView} onToggleView={() => setPenetrationView(v => v === 'chart' ? 'table' : 'chart')} />}>
                    {penetrationView === 'chart' ? <ReactECharts option={scatterPlotOption} style={{ height: 350 }} notMerge={true} lazyUpdate={true} /> : <DataTable columns={['SKU', 'Penetração (%)', 'Cobertura (%)']} data={mockData.scatterPlotData.map(d => [d.name, d.x, d.y])} />}
                </Card>
                <Card title="Dependência comercial do SKU no PDV" tooltipText="Análise do giro médio versus o peso do SKU no ticket médio do PDV." actions={<CardActions showViewToggle currentView={dependenciaView} onToggleView={() => setDependenciaView(v => v === 'chart' ? 'table' : 'chart')} />}>
                     {dependenciaView === 'chart' ? <ReactECharts option={composedChartOption} style={{ height: 350 }} notMerge={true} lazyUpdate={true} /> : <DataTable columns={['Produto', 'Giro Médio', 'Peso no Ticket (%)']} data={mockData.barChartData.map(d => [d.name, d.giro, d.peso])} />}
                </Card>
                <Card className="lg:col-span-2" title="Matriz de Mix – Cobertura e Frequência" tooltipText="Quadrantes: Essenciais, Oportunidades de Expansão, Baixa Relevância, Baixo Giro." actions={<CardActions showViewToggle currentView={mixView} onToggleView={() => setMixView(v => v === 'chart' ? 'table' : 'chart')} />}>
                    {mixView === 'chart' ? <ReactECharts option={quadrantChartOption} style={{ height: 350 }} notMerge={true} lazyUpdate={true} /> : <DataTable columns={['Produto', 'Cobertura (%)', 'Frequência (%)']} data={mockData.quadrantChartData.map(d => [d.name, d.cobertura, d.frequencia])} />}
                </Card>
            </div>
        </div>
    );
};
export const DiagnosticoMSLScreen = React.memo(DiagnosticoMSLScreenComponent);
