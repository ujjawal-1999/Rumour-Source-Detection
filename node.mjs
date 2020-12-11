export default class node{
	constructor(i,nodesCount){
		const div=document.createElement('div');
		const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
		svg.setAttribute('width',100);
		svg.setAttribute('height',100);
		document.querySelector('body').appendChild(div);
		const circle=document.createElementNS('http://www.w3.org/2000/svg','circle');
		// <circle cx="50" cy="50" r="50"/>
		circle.setAttribute('cx',50);
		circle.setAttribute('cy',50);
		const diameter=2*Math.PI*300/nodesCount-15;
		circle.setAttribute('r',diameter/2);
		svg.setAttribute('fill', '#09d3ac');
		svg.appendChild(circle);

		svg.style.position='absolute';
		svg.style.zIndex='2';
		div.appendChild(svg);
		this.svg=svg;
		this.value=i;
		this.timeStamp=0;
	}
	setPosition(x,y){
		//probably need to change this to position it 
		//wrt the center of the circle
		this.svg.style.top=y;
		this.svg.style.left=x;
	}
	setColor(color){
		this.svg.setAttribute('fill', color);
	}
	findPosition(i,nodesCount){
		const cx=window.innerWidth/2-50;
		const cy=window.innerHeight/2-50;
		const r=300;
		// i=i-1;
		const theta=i*(2*Math.PI/nodesCount);
		// console.log(Math.cos(theta));
		const x=cx+r*Math.cos(theta);
		const y=cy-r*Math.sin(theta);
		this.setPosition(x,y);
	}
	
}