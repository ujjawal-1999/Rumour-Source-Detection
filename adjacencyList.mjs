export const adjacencyList=function(links,nodesCount){
	const v=[];
	for(let i=0;i<nodesCount;i++)
		v.push([]);

	for(let i=0;i<links.length;i++){
	    v[links[i].source.value].push(links[i].destination.value);
	    v[links[i].destination.value].push(links[i].source.value);
	}
	return v;
}