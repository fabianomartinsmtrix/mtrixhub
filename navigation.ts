

import React from 'react';
import { 
  LayoutDashboard, ShoppingCart, Truck, Archive, FileText,
  AppWindow, Map, Award, Users, BarChart, SlidersHorizontal, Target,
  Presentation, HandCoins, LineChart, Search, ShoppingBasket, FileClock, Star, MessageSquareHeart,
  PieChart, PenTool,
  type LucideIcon
} from 'lucide-react';

import { PlaceholderScreen } from './pages/Placeholder';
import { MSLPage } from './pages/MSLPage';
import { IndicadoresChavePage } from './pages/IndicadoresChave';
import { RentabilidadePage } from './pages/Rentabilidade';
import { FatoresCriticosPage } from './pages/FatoresCriticos';

import { FidelizacaoPage } from './pages/behavior/FidelizacaoPage';
import { FidelizacaoBkpPage } from './pages/behavior/FidelizacaoBkpPage';
import { FrequenciaPage } from './pages/behavior/FrequenciaPage';
import { CoberturaPage } from './pages/behavior/CoberturaPage';
import { MixDeProdutosPage } from './pages/behavior/MixDeProdutosPage';
import { MonitoramentoRiscoPage } from './pages/behavior/MonitoramentoRiscoPage';


// ===================================================================================
// TYPES
// ===================================================================================

export interface SecondaryNavItem {
  label: string;
  path: string;
  component: React.FC<any>;
}

export interface SecondaryNavCategory {
  title: string;
  items: SecondaryNavItem[];
}

export interface MainNavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  component?: React.FC<any>;
  secondaryMenu?: (SecondaryNavCategory | SecondaryNavItem)[];
  disabled?: boolean;
  notification?: boolean;
  isLayout?: boolean; // Flag to indicate a full page layout component
}

export interface MainNavCategory {
  title: string;
  items: MainNavItem[];
}


// ===================================================================================
// NAVIGATION DATA
// ===================================================================================

export const navigationData: MainNavCategory[] = [
    {
        title: "DESEMPENHO COMERCIAL",
        items: [
            {
                label: "Visão Geral",
                path: "/visao-geral",
                icon: LayoutDashboard,
                secondaryMenu: [
                    { label: "Indicadores-Chave", path: "indicadores-chave", component: IndicadoresChavePage },
                    { label: "Rentabilidade", path: "rentabilidade", component: RentabilidadePage },
                    { label: "Fatores Críticos", path: "fatores-criticos", component: FatoresCriticosPage },
                ],
            },
            {
                label: "Sell-in",
                path: "/sell-in",
                icon: ShoppingCart,
                secondaryMenu: [
                    {
                        title: "Resumo Executivo",
                        items: [
                            { label: "Visão Geral", path: "resumo/visao-geral", component: PlaceholderScreen },
                            { label: "Produto", path: "resumo/produto", component: PlaceholderScreen },
                            { label: "Distribuidores", path: "resumo/distribuidores", component: PlaceholderScreen },
                            { label: "Equipe de Vendas", path: "resumo/equipe-de-vendas", component: PlaceholderScreen },
                            { label: "Geografia", path: "resumo/geografia", component: PlaceholderScreen },
                            { label: "Positivação", path: "resumo/positivacao", component: PlaceholderScreen },
                        ],
                    },
                    {
                        title: "Análises",
                        items: [
                            { label: "Desempenho", path: "analises/desempenho", component: PlaceholderScreen },
                            { label: "Curva ABC", path: "analises/curva-abc", component: PlaceholderScreen },
                            { label: "Ranking", path: "analises/ranking", component: PlaceholderScreen },
                            { label: "Compare", path: "analises/compare", component: PlaceholderScreen },
                            { label: "Correlacione", path: "analises/correlacione", component: PlaceholderScreen },
                            { label: "Preço", path: "analises/preco", component: PlaceholderScreen },
                            { label: "Equipe de Vendas", path: "analises/equipe-de-vendas", component: PlaceholderScreen },
                            { label: "Compras", path: "analises/compras", component: PlaceholderScreen },
                            { label: "Pontos de Venda", path: "analises/pontos-de-venda", component: PlaceholderScreen },
                        ],
                    },
                    {
                        title: "Comportamento",
                        items: [
                            { label: "Fidelização", path: "comportamento/fidelizacao", component: PlaceholderScreen },
                            { label: "Frequência", path: "comportamento/frequencia", component: PlaceholderScreen },
                            { label: "Cobertura", path: "comportamento/cobertura", component: PlaceholderScreen },
                            { label: "Mix de Produtos", path: "comportamento/mix-de-produtos", component: PlaceholderScreen },
                            { label: "Monitoramento de Risco", path: "comportamento/monitoramento-de-risco", component: PlaceholderScreen },
                        ],
                    },
                    {
                        title: "Cesta",
                        items: [
                           { label: "Análise de Cesta", path: "cesta/analise-de-cesta", component: PlaceholderScreen },
                        ]
                    }
                ],
            },
            {
                label: "Sell-through",
                path: "/sell-through",
                icon: Truck,
                secondaryMenu: [ // Same as Sell-in for this example
                     {
                        title: "Resumo Executivo",
                        items: [
                            { label: "Visão Geral", path: "resumo/visao-geral", component: PlaceholderScreen },
                            { label: "Produto", path: "resumo/produto", component: PlaceholderScreen },
                            { label: "Distribuidores", path: "resumo/distribuidores", component: PlaceholderScreen },
                            { label: "Equipe de Vendas", path: "resumo/equipe-de-vendas", component: PlaceholderScreen },
                            { label: "Geografia", path: "resumo/geografia", component: PlaceholderScreen },
                            { label: "Positivação", path: "resumo/positivacao", component: PlaceholderScreen },
                        ],
                    },
                    {
                        title: "Análises",
                        items: [
                            { label: "Desempenho", path: "analises/desempenho", component: PlaceholderScreen },
                            { label: "Curva ABC", path: "analises/curva-abc", component: PlaceholderScreen },
                            { label: "Ranking", path: "analises/ranking", component: PlaceholderScreen },
                            { label: "Compare", path: "analises/compare", component: PlaceholderScreen },
                            { label: "Correlacione", path: "analises/correlacione", component: PlaceholderScreen },
                            { label: "Preço", path: "analises/preco", component: PlaceholderScreen },
                            { label: "Equipe de Vendas", path: "analises/equipe-de-vendas", component: PlaceholderScreen },
                            { label: "Compras", path: "analises/compras", component: PlaceholderScreen },
                            { label: "Pontos de Venda", path: "analises/pontos-de-venda", component: PlaceholderScreen },
                        ],
                    },
                    {
                        title: "Comportamento",
                        items: [
                            { label: "Fidelização", path: "comportamento/fidelizacao", component: FidelizacaoPage },
                            { label: "Fidelização BKP", path: "comportamento/fidelizacao-bkp", component: FidelizacaoBkpPage },
                            { label: "Frequência", path: "comportamento/frequencia", component: FrequenciaPage },
                            { label: "Cobertura", path: "comportamento/cobertura", component: CoberturaPage },
                            { label: "Mix de Produtos", path: "comportamento/mix-de-produtos", component: MixDeProdutosPage },
                            { label: "Monitoramento de Risco", path: "comportamento/monitoramento-de-risco", component: MonitoramentoRiscoPage },
                        ],
                    },
                    {
                        title: "Cesta",
                        items: [
                           { label: "Análise de Cesta", path: "cesta/analise-de-cesta", component: PlaceholderScreen },
                        ]
                    }
                ],
            },
            {
                label: "Estoque",
                path: "/estoque",
                icon: Archive,
                secondaryMenu: [
                     {
                        title: "Resumo Executivo",
                        items: [
                             { label: "Dias de Estoque", path: "resumo/dias-de-estoque", component: PlaceholderScreen },
                        ]
                     },
                     {
                        title: "Análises",
                        items: [
                             { label: "Posição de Estoque", path: "analises/posicao-de-estoque", component: PlaceholderScreen },
                             { label: "Ranking", path: "analises/ranking", component: PlaceholderScreen },
                        ]
                     }
                ]
            },
            { 
                label: "MSL", 
                path: "/msl", 
                icon: FileText, 
                component: MSLPage,
                isLayout: true,
            },
            { label: "Metas", path: "/metas", icon: Target, secondaryMenu: [
                 { label: "Definição", path: "definicao", component: PlaceholderScreen },
                 { label: "Desempenho", path: "desempenho", component: PlaceholderScreen },
                 { label: "Oportunidades", path: "oportunidades", component: PlaceholderScreen },
            ]},
            { label: "Materiais Promocionais", path: "/materiais-promocionais", icon: Presentation, secondaryMenu: [
                 { label: "Resumo Executivo", path: "resumo-executivo", component: PlaceholderScreen },
                 { label: "Análises", path: "analises", component: PlaceholderScreen },
            ]},
            { label: "Comodato e Consignação", path: "/comodato-consignacao", icon: HandCoins, secondaryMenu: [
                {
                    title: "Resumo Executivo",
                    items: [{ label: "Visão Geral", path: "resumo/visao-geral", component: PlaceholderScreen }]
                },
                {
                    title: "Análises",
                    items: [
                        { label: "Desempenho", path: "analises/desempenho", component: PlaceholderScreen },
                        { label: "Atratividade", path: "analises/atratividade", component: PlaceholderScreen },
                    ]
                }
            ]},
            { label: "Dashboards Personalizados", path: "/dashboards-personalizados", icon: SlidersHorizontal, component: PlaceholderScreen },
        ],
    },
    {
        title: "SELF-SERVICE",
        items: [
            { label: "Minha Área de Trabalho", path: "/minha-area-de-trabalho", icon: AppWindow, component: PlaceholderScreen },
            { label: "Construtor de Tabelas", path: "/construtor-tabelas", icon: BarChart, component: PlaceholderScreen },
            { label: "Construtor de Gráficos", path: "/construtor-graficos", icon: PieChart, component: PlaceholderScreen },
            { label: "Construtor de Dashboards", path: "/construtor-dashboards", icon: PenTool, component: PlaceholderScreen },
        ],
    },
    {
        title: "ESTUDOS DE MERCADO",
        items: [
            { label: "Rota de Mercado", path: "/rota-de-mercado", icon: Map, secondaryMenu: [
                { label: "Contratados", path: "contratados", component: PlaceholderScreen },
                { label: "Contrate", path: "contrate", component: PlaceholderScreen },
            ]},
            { label: "Distribuição Numérica Light", path: "/distribuicao-numerica-light", icon: Map, secondaryMenu: [
                { label: "Visão Geral", path: "visao-geral", component: PlaceholderScreen },
                { label: "Oportunidades", path: "oportunidades", component: PlaceholderScreen },
                { label: "Detalhes", path: "detalhes", component: PlaceholderScreen },
            ]},
             { label: "Distribuição Numérica Completa", path: "/distribuicao-numerica-completa", icon: Map, secondaryMenu: [
                { label: "Visão Geral", path: "visao-geral", component: PlaceholderScreen },
                { label: "Oportunidades", path: "oportunidades", component: PlaceholderScreen },
                { label: "Detalhes", path: "detalhes", component: PlaceholderScreen },
                { label: "Contrate", path: "contrate", component: PlaceholderScreen },
            ]},
        ],
    },
    {
        title: "INCENTIVOS",
        items: [
            { label: "Campanhas e Programas", path: "/campanhas-e-programas", icon: Award, secondaryMenu: [
                { label: "Contratados", path: "contratados", component: PlaceholderScreen },
                { label: "Contrate", path: "contrate", component: PlaceholderScreen },
            ]},
        ],
    },
     {
        title: "INSIGHTS E RECOMENDAÇÕES",
        items: [
            { label: "Análise de Preços", path: "/analise-precos", icon: LineChart, component: PlaceholderScreen },
            { label: "Análise de Ruptura", path: "/analise-ruptura", icon: Search, component: PlaceholderScreen },
            { label: "Sortimento", path: "/sortimento", icon: ShoppingBasket, component: PlaceholderScreen },
        ],
    },
    {
        title: "DEMANDA",
        items: [
            { label: "Planejamento", path: "/planejamento", icon: FileClock, component: PlaceholderScreen },
        ],
    },
    {
        title: "GESTÃO DE INVESTIMENTOS",
        items: [
            { label: "Trade Marketing", path: "/trade-marketing", icon: Star, component: PlaceholderScreen },
            { label: "Mídia", path: "/midia", icon: MessageSquareHeart, component: PlaceholderScreen },
        ],
    },
];


// ===================================================================================
// EXPORTED HELPERS
// ===================================================================================
export const findSecondaryMenu = (path: string) => {
    for (const category of navigationData) {
        const item = category.items.find(i => i.path === path);
        if (item && item.secondaryMenu) {
            return item.secondaryMenu;
        }
    }
    return null;
};

export const findInitialPagePath = (basePath: string): string | null => {
    if (basePath === '/') {
       basePath = navigationData[0]?.items[0]?.path ?? '/';
    }
    
    // Find the main nav item to determine its structure
    const mainNavItem = navigationData.flatMap(cat => cat.items).find(item => item.path === basePath);

    if (mainNavItem?.isLayout) {
        // Special handling for layout components like MSL page
        return `${mainNavItem.path}/definicao`;
    }

    if (mainNavItem?.secondaryMenu) {
        const menu = mainNavItem.secondaryMenu;
        const firstItem = menu[0];
        if ('title' in firstItem) { // Category
            return `${basePath}/${firstItem.items[0].path}`;
        } else { // Flat item
            return `${basePath}/${firstItem.path}`;
        }
    } else if (mainNavItem?.component) {
        // This is a direct page link, not a category with a secondary menu
        return mainNavItem.path;
    }

    return null;
}