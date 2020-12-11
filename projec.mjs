import node from '/node.mjs';
import link from '/link.mjs';
import {karate} from '/csv/karate.mjs';
import {football} from '/csv/football.mjs';
import {dolphin} from '/csv/dolphin.mjs'
import {beautify,findMax,decorateNode} from '/utils.mjs';
import {detectRumourSource} from '/detectRumourSource.mjs';
// var max_links;
let instant;
const nodes=[];
const links=[];
let select='';
let data='';
let nodesCount=5;
const makeLinks=function(edges){

	// for(let i=0;i<edges.length;i++){
	// 	const l=new link(edges[i],nodes,select);
	// 	// ind++;
	// 	links.push(l);
	// }
	let i=0;
    const t=setInterval(()=>{
    	if(i>=edges.length)
    		clearInterval(t);
    	else{
    		// console.log(ind);
	    	const l=new link(edges[i],nodes,select);
			i++;
			links.push(l);
    	}
	},15000/edges.length);
	// });
}

const startSimulation=function(){
	csv()
	.fromString(data)
	.then((jsonObj)=>{
		
	    jsonObj=beautify(jsonObj);
	     console.log(jsonObj);
	    nodesCount=findMax(jsonObj);
	    if(select==='dolphin')
	    	nodesCount++;
	    makeGraph();
	    instant=new Date();
	    instant=instant.getTime();
	    console.log(nodesCount,jsonObj.length);
	    makeLinks(jsonObj);
	
	});
}

const makeGraph=function(){
	for(let i=0;i<nodesCount;i++){
		const n=new node(i,nodesCount);
		n.findPosition(i,nodesCount);
		nodes.push(n);
	}
	// max_links=(nodesCount*(nodesCount-1))/2;

	// for(let i=0;i<nodesCount;i++){
	// 	nodes[i].svg.addEventListener('click',makeEndPoints);
	// }
}

const input=document.querySelector('select');
const submit=document.querySelector('#sub');
const detect=document.querySelector('#detect');

submit.addEventListener('click',function(){
	// select=input.value;
	if(input.value==='karate'){
		select='karate';
		data=karate;
	}
	else if(input.value==='dolphin'){
		select='dolphin';
		data=dolphin;
	}
	else if(input.value==='football'){
		select='football';
		data=football;
	}
	startSimulation();
	submit.disabled=true;
	// makeGraph();
});
detect.addEventListener('click',function(){
	const rumourSource=detectRumourSource(nodes,links);
	decorateNode(links,nodes[rumourSource],instant,select,nodes);
});
const div=document.querySelector('#div')
div.style.position='absolute';
div.style.zIndex='5';

