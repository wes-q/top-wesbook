import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

const ChartComponent = () => {
	// const {
	// 	data,
	// 	colors: {
	// 		backgroundColor = 'black',
	// 		lineColor = '#2962FF',
	// 		textColor = 'white',
	// 		areaTopColor = '#2962FF',
	// 		areaBottomColor = 'rgba(41, 98, 255, 0.28)',
	// 	} = {},
	// } = props;

	const chartContainerRef = useRef();

	useEffect(
		() => {
			// const handleResize = () => {
			// 	chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			// };

			// const chart = createChart(chartContainerRef.current, {
			// 	layout: {
			// 		background: { type: ColorType.Solid, color: backgroundColor },
			// 		textColor,
			// 	},
			// 	width: chartContainerRef.current.clientWidth,
			// 	height: 300,
			// });
			// chart.timeScale().fitContent();

			// const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
			// newSeries.setData(data);

			// window.addEventListener('resize', handleResize);

			const chart = createChart(chartContainerRef.current, {
				layout: {
					background: {type: ColorType.Solid, color: "white"},
				},
				width: 800,
				height: 300,

			})

			const newSeries = chart.addAreaSeries({
				lineColor: "#22d3ee",
				topColor: "#22d3ee",
				bottomColor: "rgba(41, 98, 255, 0.28)",
			})

			newSeries.setData(initialData)
			return () => {
				// window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},[]);

	return (
		<div
			ref={chartContainerRef}
		/>
	);
};

export default ChartComponent;

const initialData = [
	{ time: '2018-12-22', value: 32.51 },
	{ time: '2018-12-23', value: 31.11 },
	{ time: '2018-12-24', value: 27.02 },
	{ time: '2018-12-25', value: 27.32 },
	{ time: '2018-12-26', value: 25.17 },
	{ time: '2018-12-27', value: 28.89 },
	{ time: '2018-12-28', value: 25.46 },
	{ time: '2018-12-29', value: 23.92 },
	{ time: '2018-12-30', value: 22.68 },
	{ time: '2018-12-31', value: 22.67 },
];
