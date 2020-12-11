import {adjacencyList} from '/adjacencyList.mjs';


export const detectRumourSource=function(nodes,links){
	const nodesCount=nodes.length;
	let sizeOfSubtree=[];
	let rumourCentrality=[];
	let visited=[];
	let visited1=[];
	let adjList=[];
	let adjList1=[];
	let queue=[];
	function dfs(x){
	    visited1[x]=1;
	    sizeOfSubtree[x]=1;
	    for(let i=0;i<adjList1[x].length;i++){
	        if(!visited1[adjList1[x][i]]){
	            dfs(adjList1[x][i]);
	            sizeOfSubtree[x]+=sizeOfSubtree[adjList1[x][i]];
	        }
	    }
	}
	function bfs(y){
		queue.push(y);
		visited[y]=1;
		while(queue.length>0){
			let x=queue[0];
			queue.shift();
			for(let i=0;i<adjList[x].length;i++){
				if(!visited[adjList[x][i]]){
					visited[adjList[x][i]]=1;
					queue.push(adjList[x][i]);
					adjList1[x].push(adjList[x][i]);
				}
			}
		}
	}
	for(let i=0;i<nodesCount;i++){
		adjList1.push([]);
		sizeOfSubtree.push(0);
		visited.push(0);
		visited1.push(0);
	}
		
	adjList=adjacencyList(links,nodesCount);
	let numerator=1,denominator=1;//5!=V!
	for(let i=1;i<=nodesCount-10;i++)numerator*=10;

	for(let j=0;j<nodesCount;j++){
	   bfs(j);   // running bfs on the main graph
	   dfs(j);   // running dfs on the tree obtained from the above step
	   adjList1=[];
	   for(let i=0;i<nodesCount;i++){
	   	if(sizeOfSubtree[i]!==0)
	       denominator*=sizeOfSubtree[i];
	       sizeOfSubtree[i]=0;
	       visited[i]=0;
	       visited1[i]=0;
	       adjList1.push([]);
	   }
	   if(denominator!==1)
	   rumourCentrality.push(numerator/denominator);
	   denominator=1;
	   
	}
	let max=0;
	for(let i=0;i<nodesCount;i++){
		if(rumourCentrality[i]>=rumourCentrality[max])
			max=i;
	}
	const arMax=[];
	for(let i=0;i<nodesCount;i++){
		if(rumourCentrality[i]===rumourCentrality[max])
			arMax.push(i);
	}
	max=arMax[Math.floor(Math.random()*arMax.length)];

	return max;
	
}