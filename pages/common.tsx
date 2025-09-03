

import React from 'react';

export const ECHART_FONT_FAMILY = 'Lato, sans-serif';
export const ECHART_COLORS = ['#002e31', '#00a06d', '#373531', '#d9ef96', '#dc3545'];

export const baseChartOptions = {
    fontFamily: ECHART_FONT_FAMILY,
    color: ECHART_COLORS,
    grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
    tooltip: {
        trigger: 'item',
        backgroundColor: '#373531',
        borderColor: '#373531',
        textStyle: { color: '#fff', fontFamily: ECHART_FONT_FAMILY },
    },
    legend: {
        textStyle: { color: '#373531', fontFamily: ECHART_FONT_FAMILY },
        bottom: 0,
        itemWidth: 14,
        itemHeight: 14,
    },
    xAxis: {
        axisLine: { lineStyle: { color: '#a0a0a0' } },
        axisLabel: { color: '#373531', fontFamily: ECHART_FONT_FAMILY },
        splitLine: { show: false },
    },
    yAxis: {
        axisLine: { lineStyle: { color: '#a0a0a0' } },
        axisLabel: { color: '#373531', fontFamily: ECHART_FONT_FAMILY },
        splitLine: { lineStyle: { color: '#e0e0e0' } },
    },
};

export const baseChartOptionsConformidade = { ...baseChartOptions, grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true }, tooltip: { ...baseChartOptions.tooltip, trigger: 'axis' } };
