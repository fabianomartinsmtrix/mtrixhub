import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { useOutletContext } from 'react-router-dom';

import { Card, IndicatorCard, DataTable, IndicatorSelectorCard, CardActions } from '../components/ui';
import * as mockData from '../services/mockData';
import { PageHeader } from './PageHeader';
import type { SecondaryMenuContextProps } from '../components/layout/SecondaryMenuLayout';

const IndicadoresChavePageComponent: React.FC = () => {
  const data = mockData.visaoGeralIndicadoresChave;
  const context = useOutletContext<SecondaryMenuContextProps | undefined>();

  const [representacaoView, setRepresentacaoView] = useState<'chart' | 'table'>('chart');
  const [temporalView, setTemporalView] = useState<'chart' | 'table'>('chart');

  const initialIndicatorKeys = [
    'Sell-in', 
    'Sell-through (R$)', 
    'Estoque', 
    'Positivação Geral', 
    'Dias de Estoque'
  ];

  const representacaoTable = {
    columns: ['Distribuidor', 'Valor'],
    data: mockData.representationChartOption.series[0].data.map(d => [d.name, d.value]),
  };

  const temporalTable = {
    columns: ['Mês/Ano', 'Sell-in', 'Sell-through'],
    data: mockData.linhaTemporalOption.xAxis.data.map((month, i) => [
      month,
      `R$ ${mockData.formatNumberBR(mockData.linhaTemporalOption.series[0].data[i])}`,
      `R$ ${mockData.formatNumberBR(mockData.linhaTemporalOption.series[1].data[i])}`,
    ]),
  };


  return (
    <>
      <PageHeader title="Indicadores Chave" breadcrumbs={['Desempenho Comercial', 'Visão Geral', 'Indicadores Chave']} onToggleSecondaryMenu={context?.toggleSecondaryMenu} />
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
        <h3 className="text-lg font-bold text-secondary pt-4">Configuração</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.configuracao.map(item => <IndicatorCard key={item.title} {...item} />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 pt-4">
          <Card 
            title="Representação" 
            className="lg:col-span-3"
            actions={<CardActions showViewToggle currentView={representacaoView} onToggleView={() => setRepresentacaoView(v => v === 'chart' ? 'table' : 'chart')} />}
          >
            {representacaoView === 'chart' ? (
                <ReactECharts option={mockData.representationChartOption} style={{ height: 400 }} />
            ) : (
                <DataTable columns={representacaoTable.columns} data={representacaoTable.data} />
            )}
          </Card>
          <Card 
            title="Linha Temporal" 
            className="lg:col-span-2"
            actions={<CardActions showViewToggle currentView={temporalView} onToggleView={() => setTemporalView(v => v === 'chart' ? 'table' : 'chart')} />}
          >
             {temporalView === 'chart' ? (
                <ReactECharts option={mockData.linhaTemporalOption} style={{ height: 400 }} />
             ) : (
                <DataTable columns={temporalTable.columns} data={temporalTable.data} />
             )}
          </Card>
        </div>
        <Card title="Desempenho" actions={<CardActions />}><DataTable columns={data.desempenhoParceiro.columns} data={data.desempenhoParceiro.data} /></Card>
        <Card title="Por Produto" actions={<CardActions />}><DataTable columns={data.desempenhoProduto.columns} data={data.desempenhoProduto.data} /></Card>
      </div>
    </>
  );
};

export const IndicadoresChavePage = React.memo(IndicadoresChavePageComponent);
