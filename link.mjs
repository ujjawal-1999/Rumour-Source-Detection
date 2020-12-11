export default class link{
	constructor(edge,nodes,select){
		const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
		document.querySelector('body').appendChild(svg);
		const line=document.createElementNS('http://www.w3.org/2000/svg','line');
		let source=edge.source;
		let destination=edge.destination;
		if(select!=='dolphin'){
			source--;
			destination--;
		}
		let x1=50+parseInt(nodes[source].svg.style.left);
		let x2=50+parseInt(nodes[destination].svg.style.left);
		let y1=50+parseInt(nodes[source].svg.style.top);
		let y2=50+parseInt(nodes[destination].svg.style.top);
		svg.setAttribute('width',1200);
		svg.setAttribute('height',1200);
		svg.setAttribute('viewBox','0 0 1200 1200');
		line.setAttribute('x1',x1);
		line.setAttribute('y1',y1);
		line.setAttribute('x2',x2);
		line.setAttribute('y2',y2);
		line.setAttribute('stroke','#09d3ac');
		line.setAttribute('stroke-width','3');
		svg.style.position='absolute';
		svg.style.zIndex='0';
		svg.appendChild(line);
		this.svg=svg;
		this.source=nodes[source];
		this.destination=nodes[destination];
	}	
}