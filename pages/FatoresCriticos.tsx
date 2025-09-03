import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { useOutletContext } from 'react-router-dom';

import { Card, ActionCard, IndicatorSelectorCard, CardActions, DataTable } from '../components/ui';
import * as mockData from '../services/mockData';
import { PageHeader } from './PageHeader';
import type { SecondaryMenuContextProps } from '../components/layout/SecondaryMenuLayout';


const FatoresCriticosPageComponent: React.FC = () => {
    const data = mockData.visaoGeralFatoresCriticos;
    const context = useOutletContext<SecondaryMenuContextProps | undefined>();
    const [oportunidadesView, setOportunidadesView] = useState<'chart' | 'table'>('chart');

    const initialIndicatorKeys = [
        'Ruptura', 
        'Superestoque', 
        'Oportunidade R$', 
        'Aderência MSL', 
        'Aderência Preço'
    ];

    const oportunidadesTable = {
        columns: ['Oportunidade', 'Valor (R$)'],
        data: data.oportunidadesChartOption.yAxis.data.map((oportunidade, i) => [
            oportunidade,
            `R$ ${mockData.formatNumberBR(data.oportunidadesChartOption.series[0].data[i])}`
        ]).reverse()
    };

    return (
        <>
            <PageHeader title="Fatores Críticos" breadcrumbs={['Desempenho Comercial', 'Visão Geral', 'Fatores Críticos']} onToggleSecondaryMenu={context?.toggleSecondaryMenu} />
            <div className="space-y-6 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {initialIndicatorKeys.map(key => (
                        <IndicatorSelectorCard
                            key={key}
                            initialIndicatorKey={key}
                            allIndicatorsData={mockData.allIndicatorsData}
                            indicatorOptions={mockData.indicatorOptions}
                        />
                    ))}
                </div>
                <Card 
                    title="Minhas Oportunidades" 
                    actions={<CardActions showViewToggle currentView={oportunidadesView} onToggleView={() => setOportunidadesView(v => v === 'chart' ? 'table' : 'chart')} />}
                >
                    {oportunidadesView === 'chart' ? (
                        <ReactECharts option={data.oportunidadesChartOption} style={{ height: 400 }} />
                    ) : (
                        <DataTable columns={oportunidadesTable.columns} data={oportunidadesTable.data} />
                    )}
                </Card>
                <h3 className="text-lg font-bold text-secondary pt-4">Ações por Parceiros</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {data.acoesParceiros.map(item => <ActionCard key={item.title} {...item} />)}
                </div>
            </div>
        </>
    );
};

export const FatoresCriticosPage = React.memo(FatoresCriticosPageComponent);
