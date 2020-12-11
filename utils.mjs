import {adjacencyList} from '/adjacencyList.mjs';


export const beautify=function(jsonObj){
	jsonObj=jsonObj.map(function(edge){
		const source=parseInt(edge.Source);
		const destination=parseInt(edge.Target);
		return {source,destination};
	});
	return jsonObj;
}

export const findMax=function(ar){
	let max=0;
	for(let i=0;i<ar.length;i++){
		if(ar[i].source>max)
			max=ar[i].source;
		if(ar[i].destination>max)
			max=ar[i].destination;
	}
	return max;
}


function style(table){
	// table.style.position="fixed";
	table.style.width='8vw';
	table.style.backgroundColor='white';
	table.style.left='84vw';
	table.style.top = '2vh';
	table.style.padding='2vw';
	table.style.fontSize = '18px';
}

function animate(node,instant){
	const anim=document.createElementNS('http://www.w3.org/2000/svg','animate');
	anim.setAttribute('attributeName','r');
	const circle=node.svg.lastElementChild;
	const radius=parseFloat(circle.getAttribute('r'))+10;
	circle.setAttribute('r',radius);
	anim.setAttribute('values',radius+';40;'+radius);
	anim.setAttribute('keyTimes', '0; 0.5; 1');
	anim.setAttribute('dur','2s');
	const date=new Date();
	const delay=((date.getTime()-instant)/1000)+'s';
	anim.setAttribute('begin',delay);
	circle.appendChild(anim);
}
function bfsTimeStamp(nodes,links,rumourSource){
	const v=adjacencyList(links,nodes.length);
	const q=[];
	const vis=[];
	let t=0;
	for(let i=0;i<nodes.length;i++)
		vis.push(0);
	q.push(rumourSource.value);   rumourSource.timeStamp=t++;
	vis[rumourSource.value]=1;
	while(q.length>0){
		let x=q[0];
		q.shift();
		for(let i=0;i<v[x].length;i++){
			if(!vis[v[x][i]]){
				vis[v[x][i]]=1;
				q.push(v[x][i]);  nodes[v[x][i]].timeStamp=t++;
			}
		}
	}
}
function decorateLinks(nodes,links,rumourSource){
	bfsTimeStamp(nodes,links,rumourSource);
	links.sort(function(a,b){
		if(a.source.timeStamp<b.source.timeStamp)
			return -1;
		else if(a.source.timeStamp===b.source.timeStamp){
			if(a.destination.timeStamp<b.destination.timeStamp)
				return -1;
			else if(a.destination.timeStamp===b.destination.timeStamp)
				return 0;
			else
				return 1;
		}
		else return 1;
	});
	let i=0;
	const t=setInterval(()=>{
    	if(i>=links.length)
    		clearInterval(t);
    	else{
    		links[i].svg.lastElementChild.setAttribute('stroke','#e87a0c');
    		i++;
    	}
	},30000/links.length);
}

export const decorateNode=function(links,rumourSource,instant,select,nodes){
	rumourSource.setColor('#e87a0c');
	animate(rumourSource,instant);
	const table=document.querySelector('#table');
	style(table);
	let max=rumourSource.value;
	if(select!=='dolphin')
		max+=1;
	table.lastElementChild.textContent="Rumour Source: "+ max;
	decorateLinks(nodes,links,rumourSource);
	// bfsTimeStamp(nodes,links);

}
