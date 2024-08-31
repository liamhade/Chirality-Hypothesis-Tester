import { useEffect, useState, useRef, useCallback } from "react";

export const Arrow = ({ startRef, endRef }) => {
	const [arrow, setArrow] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
	const svgRef = useRef(null);
  
	const updateArrow = useCallback(() => {
		if (startRef.current && endRef.current && svgRef.current) {
			const start = startRef.current.getBoundingClientRect();
			const end = endRef.current.getBoundingClientRect();
			const svg = svgRef.current.getBoundingClientRect();

			setArrow({
			x1: start.left + start.width / 2 - svg.left,
			y1: start.top + start.height / 2 - svg.top,
			x2: end.left + end.width / 2 - svg.left,
			y2: end.top + end.height / 2 - svg.top,
			});
		}
	}, [startRef, endRef]);

	useEffect(() => {
		updateArrow();
		window.addEventListener('resize', updateArrow);
		return () => window.removeEventListener('resize', updateArrow)
	}, [updateArrow]);
  
	// const angle = Math.atan2(arrow.y2 - arrow.y1, arrow.x2 - arrow.x1) * 180 / Math.PI;
  
	return (
		<svg ref={svgRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
		<defs>
			<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
			<polygon points="0 0, 10 3.5, 0 7" fill="black" />
			</marker>
		</defs>
		<line
			x1={arrow.x1}
			y1={arrow.y1}
			x2={arrow.x2}
			y2={arrow.y2}
			stroke="black"
			strokeWidth="2"
			markerEnd="url(#arrowhead)"
		/>
		</svg>
	);
  };