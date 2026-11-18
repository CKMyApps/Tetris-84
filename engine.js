/* Tetris 84 — independent falling-block engine; no third-party code. */
(function(root){'use strict';
const WIDTH=10, HEIGHT=20;
const SHAPES={I:[[0,1],[1,1],[2,1],[3,1]],O:[[1,0],[2,0],[1,1],[2,1]],T:[[1,0],[0,1],[1,1],[2,1]],S:[[1,0],[2,0],[0,1],[1,1]],Z:[[0,0],[1,0],[1,1],[2,1]],J:[[0,0],[0,1],[1,1],[2,1]],L:[[2,0],[0,1],[1,1],[2,1]]};
const TYPES=Object.keys(SHAPES),empty=()=>Array.from({length:HEIGHT},()=>Array(WIDTH).fill(0));
const copy=p=>p.map(([x,y])=>[x,y]);
const speed=level=>Math.max(85,Math.round(940*Math.pow(.80,level)));
function create(start=0,random=Math.random){const g={version:2,grid:empty(),active:null,next:null,score:0,lines:0,level:Math.max(0,Math.min(9,start|0)),startLevel:Math.max(0,Math.min(9,start|0)),pieces:0,preview:true,legend:true,status:'ready',gravitySteps:0};g.next=choose(random);spawn(g,random);g.status='playing';return g}
function choose(random){return TYPES[Math.min(TYPES.length-1,Math.floor(random()*TYPES.length))]}
function fits(g,cells,x,y){return cells.every(([dx,dy])=>{const xx=x+dx,yy=y+dy;return xx>=0&&xx<WIDTH&&yy<HEIGHT&&(yy<0||!g.grid[yy][xx])})}
function spawn(g,random=Math.random){const type=g.next||choose(random);g.next=choose(random);g.active={type,cells:copy(SHAPES[type]),x:3,y:0};g.gravitySteps=0;if(!fits(g,g.active.cells,3,0)){g.status='over';g.active=null;return false}return true}
function shift(g,dx,dy){if(g.status!=='playing'||!g.active)return false;let a=g.active;if(fits(g,a.cells,a.x+dx,a.y+dy)){a.x+=dx;a.y+=dy;return true}return false}
function rotate(g){if(g.status!=='playing'||!g.active)return false;const a=g.active;if(a.type==='O')return true; // clockwise screen coords maps (x,y) -> (y,-x) for CCW
 const transformed=a.cells.map(([x,y])=>[y,3-x]);let minx=Math.min(...transformed.map(p=>p[0])),miny=Math.min(...transformed.map(p=>p[1]));const cells=transformed.map(([x,y])=>[x-minx,y-miny]);for(const dx of [0,-1,1,-2,2]){if(fits(g,cells,a.x+dx,a.y)){a.cells=cells;a.x+=dx;return true}}return false}
function lock(g,random=Math.random){const a=g.active;if(!a)return {locked:false};for(const [dx,dy] of a.cells){const x=a.x+dx,y=a.y+dy;if(y<0){g.status='over';return {locked:true,over:true,cleared:0,points:0}}g.grid[y][x]=1}let removed=0;for(let y=HEIGHT-1;y>=0;y--){if(g.grid[y].every(Boolean)){g.grid.splice(y,1);g.grid.unshift(Array(WIDTH).fill(0));removed++;y++}}g.lines+=removed;const earned=Math.max(0,19-g.gravitySteps)+3*g.level+(g.preview?0:5);g.score+=earned;g.pieces++;const ok=spawn(g,random);return {locked:true,over:!ok,cleared:removed,points:earned}}
function gravity(g,random=Math.random){if(g.status!=='playing')return {locked:false};if(shift(g,0,1)){g.gravitySteps++;return {locked:false,moved:true}}return lock(g,random)}
function soft(g,random=Math.random){if(g.status!=='playing')return {locked:false};if(shift(g,0,1))return {locked:false,moved:true};return lock(g,random)}
function drop(g,random=Math.random){if(g.status!=='playing')return {locked:false};let cells=0;while(shift(g,0,1))cells++;return {...lock(g,random),dropped:cells}}
function snapshot(g){return JSON.parse(JSON.stringify(g))}
function restore(data){if(!data||data.version!==2||!Array.isArray(data.grid)||data.grid.length!==20||!data.grid.every(r=>Array.isArray(r)&&r.length===10&&r.every(n=>n===0||n===1))||!Number.isSafeInteger(data.score)||data.score<0||!Number.isSafeInteger(data.lines)||data.lines<0||!Number.isInteger(data.level)||data.level<0||data.level>30||!Number.isInteger(data.pieces)||data.pieces<0||!['playing','paused'].includes(data.status)||!data.active||!TYPES.includes(data.active.type)||!Array.isArray(data.active.cells)||data.active.cells.length!==4||!data.active.cells.every(c=>Array.isArray(c)&&c.length===2&&c.every(Number.isInteger))||!Number.isInteger(data.active.x)||!Number.isInteger(data.active.y)||!TYPES.includes(data.next)||!fits(data,data.active.cells,data.active.x,data.active.y))return null;const g=snapshot(data);g.status='paused';return g}
root.TetrisEngine={WIDTH,HEIGHT,SHAPES,TYPES,create,shift,rotate,gravity,soft,drop,lock,speed,snapshot,restore,fits};
})(typeof globalThis!=='undefined'?globalThis:this);
