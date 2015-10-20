var tabDesDiapos=new Array
var rainbow=new Array('violet','indigo','blue','green','yellow','orange','red');
var step=0
var nombreDeSlide
document.onkeypress = clavier
var numSlide=0
var sens=1
function clavier (event){
	var codeTouche = ('charCode' in event) ? event.charCode : event.keyCode;
	//alert ("Le code du la touche est : " + codeTouche);
	if (event.keyCode == 39) {sens=1;}
	if (event.keyCode == 37) {sens=-1;}
	if (codeTouche== 110) {
		if(document.getElementById('n'+numSlide).style.display=='none'){document.getElementById('n'+numSlide).style.display='block';}
		else{document.getElementById('n'+numSlide).style.display='none';}
		}

	if (codeTouche== 32) {
		document.getElementById('d'+numSlide).style.display='none';
		numSlide=numSlide+sens;
		if(numSlide==nombreDeSlide){numSlide=0;}
		if(numSlide==-1){numSlide=nombreDeSlide-1;}
		document.getElementById('d'+numSlide).style.display='block';
    }
}
function afficheDiapo(){
	
	}
function deroule(id1,id2) {
	derouleDiv(id1);
	derouleDiv(id2);
}

function derouleDiv(id_div) {
     if(document.getElementById(id_div).className=='afficheDiv')
       {document.getElementById(id_div).className='cacheDiv'}
      else if(document.getElementById(id_div).className=='cacheDiv')
       {document.getElementById(id_div).className='afficheDiv'}
    }
    
function initDiapo(tab) {
	var i=0
	for(var clef in tab){
		this[clef]=tab[clef]
		//console.log(tab[i]+'='+tabV[i])
		}
}

function listing(code){
	var str=code
	
	/*var strCode=''
	var tabDesLigne=code.split("\n")
	for(var i=0;i<tabDesLigne.length;i++){
		//Gestion des commentaires
		if(tabDesLigne[i].substring(0, 1) == '#'){strCode+='<div class="listingRouge">'+tabDesLigne[i]+'</div>'}
		
		
		}*/
	
	//Gestion des chaines de caractères
	var tab=str.split("\"")
	for(var i=1;i<tab.length;i=i+2){
			tab[i]='<div class="listingOrange">"'+tab[i]+'"</div>'
			}
	str=tab.join("")
		
	var tab=str.split("\'");
	for(var i=1;i<tab.length;i=i+2){
		tab[i]='<div class="listingOrange">"'+tab[i]+'"</div>'
		}
	str=tab.join("")
	
	/*var re = new RegExp("[0-9]","gi");
	var re = /[0-9]/gi
	while ((monTableau = re.exec(str)) !== null) {
		var nombre='<div class="listingVert">'+str.substring(re.lastIndex-1,re.lastIndex)+'</div>'
		str=str.substring(0,re.lastIndex)+nombre+str.substring(re.lastIndex+1,str.length)
		}*/
	for(var i= 0;i<10;i++){
		re = new RegExp(i,"gi");
		str=str.replace(re,'<div class="listingVert">'+i+'</div>')
		}
	
	//changement de ligne
	re = /\n/gi;
	str=str.replace(re,'<br>')
	//re = /:/gi;
	//str=str.replace(re,':<br>')
	
	//commentaire
	str = str.replace(/#([^;]+);/, '<div class="listingRouge">#$1;</div>');
	
	//mot bleu
	var tab=['do','def','else','elif','from','for','import','in','if','new','print','return','var','while'];
	for(var i=0;i<tab.length;i++){
		re = new RegExp("\\b"+tab[i]+"\\b","gi");
		str=str.replace(re,'<div class="listingBleu">'+tab[i]+'</div>')
		}
	
	//mot marron
	tab=['open','range','RegExp']
	for(var i=0;i<tab.length;i++){
		re = new RegExp("\\b"+tab[i]+"\\b","gi");
		str=str.replace(re,'<div class="listingMaron">'+tab[i]+'</div>')
		}
	
	//écriture en gris
	str='<div class="listing">'+str+'</div>'
	return str
	}
	
function affichePresentation(){
	nombreDeSlide=tabDesDiapos.length
	for(var i=0;i< nombreDeSlide;i++){
		var diapo=document.createElement('div')
		diapo.setAttribute('class',tabDesDiapos[i].classe)
		diapo.setAttribute('id','d'+i)
		
		if(tabDesDiapos[i].titre!=undefined){
			var titre=document.createElement('div')
			titre.setAttribute('class','titre')
			titre.innerHTML =tabDesDiapos[i].titre
			diapo.appendChild(titre)
			}
		
		if(tabDesDiapos[i].chapitre!=undefined){
			var chapitre=document.createElement('div')
			chapitre.setAttribute('class','chapitre')
			chapitre.innerHTML =tabDesDiapos[i].chapitre
			diapo.appendChild(chapitre)
			}
		if(tabDesDiapos[i].corps!=undefined){
			var corps=document.createElement('div')
			corps.setAttribute('class','corps')
			corps.innerHTML =tabDesDiapos[i].corps
			diapo.appendChild(corps)
			}
		if(tabDesDiapos[i].pieds!=undefined){
			var pieds=document.createElement('div')
			pieds.setAttribute('class','pieds')
			pieds.innerHTML =tabDesDiapos[i].pieds
			diapo.appendChild(pieds)
			}
		if(tabDesDiapos[i].note!=undefined){
			var note=document.createElement('div')
			note.setAttribute('class','note')
			note.innerHTML =tabDesDiapos[i].note
			diapo.appendChild(note)
			}
		document.body.appendChild(diapo) 
		}
	}

function arcEnCiel(chaine){
	tabchaine=chaine.split('')
	var arc=document.createElement('div')
	arc.setAttribute('class','diapo')

	arc.id=''
	var text
	for(var i=0;i<tabchaine.length;i++){
		var lettre=document.createElement('div')
		lettre.setAttribute('class','lettre')
		
		if(tabchaine[i]!=' '){
		text=document.createTextNode(tabchaine[i])}
		else{text=document.createTextNode(' ')}
		
		lettre.id='lettre'+(i)
		lettre.appendChild(text)
		arc.appendChild(lettre)
	}
	document.body.appendChild(arc)
	var irise=setInterval (function(){colorise(tabchaine.length)},500)
	
}
 
 
function colorise(){
	temp=step
 
	for (i=0;i<11; i++){
		couleur=(11+temp-i) % 7
		document.getElementById('l'+i).style.color=rainbow[couleur]
		}
	step++
	}
